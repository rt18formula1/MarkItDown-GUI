import AppKit
import SwiftUI

@main
struct MarkItDownGUIApp: App {
    @StateObject private var model = AppModel()

    var body: some Scene {
        WindowGroup("MarkItDown", id: "drop") {
            DropView(model: model)
                .frame(minWidth: 620, minHeight: 540)
        }
        .defaultSize(width: 700, height: 620)

        MenuBarExtra("MarkItDown", systemImage: "doc.text") {
            MenuContent()
        }
        .menuBarExtraStyle(.menu)
    }
}

struct MenuContent: View {
    @Environment(\.openWindow) private var openWindow
    var body: some View {
        Button("変換画面を開く") { openWindow(id: "drop") }
        Divider()
        Button("終了") { NSApplication.shared.terminate(nil) }
    }
}

@MainActor
final class AppModel: ObservableObject {
    @Published var outputPath = UserDefaults.standard.string(forKey: "outputPath") ?? ""
    @Published var message = "準備完了"
    @Published var markdownOutput = ""
    @Published var downloadFileName = "converted.md"

    var outputURL: URL {
        if outputPath.isEmpty { return FileManager.default.urls(for: .downloadsDirectory, in: .userDomainMask)[0] }
        return URL(fileURLWithPath: outputPath, isDirectory: true)
    }

    func chooseFiles() {
        let panel = NSOpenPanel()
        panel.allowsMultipleSelection = true
        panel.canChooseDirectories = false
        panel.canChooseFiles = true
        panel.prompt = "変換"
        guard panel.runModal() == .OK else { return }
        convert(panel.urls)
    }

    func convert(_ files: [URL]) {
        guard let executable = findMarkItDown() else {
            message = "MarkItDownが見つかりません。設定画面の案内をご確認ください。"
            return
        }
        do { try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true) }
        catch { message = "出力フォルダーを作成できません: \(error.localizedDescription)"; return }

        let outputDirectory = outputURL
        Task.detached { [weak self] in
            var outcomes: [String] = []
            var convertedMarkdown: [String] = []
            var lastFilename = "converted.md"
            for input in files {
                let destination = outputDirectory.appendingPathComponent(input.deletingPathExtension().lastPathComponent + ".md")
                let process = Process()
                process.executableURL = URL(fileURLWithPath: executable)
                process.arguments = [input.path, "-o", destination.path]
                process.standardOutput = Pipe()
                process.standardError = Pipe()
                do {
                    try process.run(); process.waitUntilExit()
                    if process.terminationStatus == 0 {
                        outcomes.append("✓ \(input.lastPathComponent)")
                        lastFilename = destination.lastPathComponent
                        if let markdown = try? String(contentsOf: destination, encoding: .utf8) {
                            convertedMarkdown.append(markdown)
                        }
                    } else {
                        outcomes.append("失敗: \(input.lastPathComponent)（MarkItDownの出力を確認）")
                    }
                } catch { outcomes.append("失敗: \(input.lastPathComponent)（\(error.localizedDescription)）") }
            }
            await MainActor.run { [weak self] in
                guard let self else { return }
                self.message = outcomes.joined(separator: "\n")
                self.markdownOutput = convertedMarkdown.joined(separator: "\n\n---\n\n")
                self.downloadFileName = lastFilename
            }
        }
    }

    func copyMarkdown() {
        guard !markdownOutput.isEmpty else { return }
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(markdownOutput, forType: .string)
        message = "Markdownをクリップボードにコピーしました。"
    }

    func downloadMarkdown() {
        guard !markdownOutput.isEmpty else { return }
        let panel = NSSavePanel()
        panel.nameFieldStringValue = downloadFileName
        panel.canCreateDirectories = true
        guard panel.runModal() == .OK, let url = panel.url else { return }
        do {
            try markdownOutput.write(to: url, atomically: true, encoding: .utf8)
            message = "Markdownを保存しました: \(url.lastPathComponent)"
        } catch {
            message = "保存できませんでした: \(error.localizedDescription)"
        }
    }

    func saveOutputPath(_ path: String) {
        outputPath = path
        UserDefaults.standard.set(path, forKey: "outputPath")
    }

    func chooseOutputFolder() {
        let panel = NSOpenPanel(); panel.canChooseDirectories = true; panel.canChooseFiles = false
        if panel.runModal() == .OK, let url = panel.url { saveOutputPath(url.path) }
    }

    func openOutputFolder() { NSWorkspace.shared.open(outputURL) }

    private func findMarkItDown() -> String? {
        let candidates = ["/opt/homebrew/bin/markitdown", "/usr/local/bin/markitdown", "/usr/bin/markitdown", NSHomeDirectory() + "/.local/bin/markitdown", NSHomeDirectory() + "/Library/Python/3.13/bin/markitdown", NSHomeDirectory() + "/Library/Python/3.12/bin/markitdown", NSHomeDirectory() + "/Library/Python/3.11/bin/markitdown"]
        if let path = candidates.first(where: { FileManager.default.isExecutableFile(atPath: $0) }) { return path }
        // Login shells initialize Homebrew/uv paths that Finder-launched apps may not inherit.
        let shell = Process()
        shell.executableURL = URL(fileURLWithPath: "/bin/zsh")
        shell.arguments = ["-lc", "command -v markitdown"]
        let output = Pipe(); shell.standardOutput = output; shell.standardError = Pipe()
        do {
            try shell.run(); shell.waitUntilExit()
            let path = String(data: output.fileHandleForReading.readDataToEndOfFile(), encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines)
            if let path, !path.isEmpty, FileManager.default.isExecutableFile(atPath: path) { return path }
        } catch { }
        return nil
    }
}

struct SettingsView: View {
    @ObservedObject var model: AppModel
    var body: some View {
        Form {
            Section("出力先") {
                HStack { Text(model.outputPath.isEmpty ? "ダウンロード" : model.outputPath).lineLimit(1); Spacer(); Button("変更…") { model.chooseOutputFolder() } }
                Text("変換した .md ファイルの保存先です。空欄の場合はダウンロードに保存します。")
                    .font(.caption).foregroundStyle(.secondary)
            }
            Section("MarkItDown") {
                Text("既存の `markitdown` コマンドを利用します。標準の場所（Homebrew、~/.local/bin など）を確認します。")
                    .font(.caption).foregroundStyle(.secondary)
            }
        }.padding(20)
    }
}

struct DropView: View {
    @ObservedObject var model: AppModel
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("ファイルをMarkdownに変換").font(.title2.bold())
            Button { model.chooseFiles() } label: {
                VStack(spacing: 10) {
                    Image(systemName: "doc.badge.arrow.down").font(.system(size: 34)).foregroundStyle(.tint)
                    Text("ここにファイルをドラッグ＆ドロップ")
                    Text("クリックしてFinderから選択").font(.caption).foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, minHeight: 150)
                .background(Color.secondary.opacity(0.07))
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(Color.accentColor.opacity(0.65), style: StrokeStyle(lineWidth: 1.5, dash: [7, 5])))
                .contentShape(RoundedRectangle(cornerRadius: 14))
            }
            .buttonStyle(.plain)
            .dropDestination(for: URL.self) { urls, _ in
                let files = urls.filter { !$0.hasDirectoryPath }
                guard !files.isEmpty else { return false }
                model.convert(files)
                return true
            }

            Text(model.message).font(.callout).foregroundStyle(.secondary)
            if !model.markdownOutput.isEmpty {
                Divider()
                Text("変換結果プレビュー").font(.headline)
                ScrollView {
                    Text(model.markdownOutput)
                        .font(.system(.body, design: .monospaced))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .textSelection(.enabled)
                        .padding(10)
                }
                .background(Color.secondary.opacity(0.06))
                .clipShape(RoundedRectangle(cornerRadius: 8))
                HStack {
                    Spacer()
                    Button("コピー") { model.copyMarkdown() }
                    Button("ダウンロード…") { model.downloadMarkdown() }
                }
            }
        }.padding(22)
    }
}
