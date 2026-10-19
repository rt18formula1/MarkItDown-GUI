import AppKit
import Foundation

guard CommandLine.arguments.count == 2 else {
    fputs("Usage: GenerateAppIcon.swift output.png\n", stderr)
    exit(2)
}

let size = 1024
let canvas = NSImage(size: NSSize(width: size, height: size))
canvas.lockFocus()

NSColor(calibratedRed: 0.94, green: 0.95, blue: 0.98, alpha: 1).setFill()
NSBezierPath(roundedRect: NSRect(x: 16, y: 16, width: 992, height: 992), xRadius: 220, yRadius: 220).fill()

let symbol = NSImage(systemSymbolName: "doc.text", accessibilityDescription: "MarkItDown")!
let config = NSImage.SymbolConfiguration(pointSize: 590, weight: .regular)
    .applying(NSImage.SymbolConfiguration(hierarchicalColor: NSColor(calibratedRed: 0.18, green: 0.32, blue: 0.52, alpha: 1)))
let document = symbol.withSymbolConfiguration(config)!
let rect = NSRect(x: 110, y: 110, width: 804, height: 804)
document.draw(in: rect)
canvas.unlockFocus()

var proposed = NSRect(origin: .zero, size: NSSize(width: size, height: size))
guard let cgImage = canvas.cgImage(forProposedRect: &proposed, context: nil, hints: nil) else {
    fputs("Could not render app icon\n", stderr)
    exit(1)
}
let png = NSBitmapImageRep(cgImage: cgImage).representation(using: .png, properties: [:])!
try png.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
