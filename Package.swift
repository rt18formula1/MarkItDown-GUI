// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "MarkItDownGUI",
    platforms: [.macOS(.v14)],
    products: [.executable(name: "MarkItDownGUI", targets: ["MarkItDownGUI"])],
    targets: [.executableTarget(name: "MarkItDownGUI")]
)
