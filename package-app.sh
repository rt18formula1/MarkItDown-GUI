#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
APP="$ROOT/MarkItDownGUI.app"
cd "$ROOT"
swift build -c release
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
cp .build/release/MarkItDownGUI "$APP/Contents/MacOS/MarkItDownGUI"
mkdir -p "$ROOT/.build/MarkItDownGUI.iconset"
swift "$ROOT/Scripts/GenerateAppIcon.swift" "$ROOT/.build/MarkItDownGUI-1024.png"
sips -z 16 16 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_16x16.png" >/dev/null
sips -z 32 32 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_16x16@2x.png" >/dev/null
sips -z 32 32 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_32x32.png" >/dev/null
sips -z 64 64 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_32x32@2x.png" >/dev/null
sips -z 128 128 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_128x128.png" >/dev/null
sips -z 256 256 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_128x128@2x.png" >/dev/null
sips -z 256 256 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_256x256.png" >/dev/null
sips -z 512 512 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_256x256@2x.png" >/dev/null
sips -z 512 512 "$ROOT/.build/MarkItDownGUI-1024.png" --out "$ROOT/.build/MarkItDownGUI.iconset/icon_512x512.png" >/dev/null
cp "$ROOT/.build/MarkItDownGUI-1024.png" "$ROOT/.build/MarkItDownGUI.iconset/icon_512x512@2x.png"
iconutil -c icns "$ROOT/.build/MarkItDownGUI.iconset" -o "$APP/Contents/Resources/MarkItDownGUI.icns"
cat > "$APP/Contents/Info.plist" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleExecutable</key><string>MarkItDownGUI</string>
  <key>CFBundleIdentifier</key><string>local.markitdown.gui.build</string>
  <key>CFBundleName</key><string>MarkItDown GUI</string>
  <key>CFBundleIconFile</key><string>MarkItDownGUI</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>LSUIElement</key><false/>
  <key>NSHighResolutionCapable</key><true/>
</dict></plist>
PLIST
echo "Created $APP (unsigned; add it to Login Items to launch at sign-in)."
