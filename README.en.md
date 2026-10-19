# MarkItDown GUI

A minimal macOS application that invokes the existing Microsoft MarkItDown package, along with a standalone web version. The conversion engine is not reimplemented.

[日本語](README.md) | [English](README.en.md)

## macOS Menu Bar App

- Displays the conversion window on launch and converts files to `.md` using drag and drop or the file picker.
- Previews conversion results and copies Markdown to the clipboard.
- Provides access to the conversion window, file picker, and settings from the menu bar.
- Saves converted files to a configurable output folder (Downloads by default).
- Displays conversion status and opens the output folder in Finder.
- Searches for the existing `markitdown` command in locations such as `/opt/homebrew/bin`, `/usr/local/bin`, and `~/.local/bin`.

MarkItDown could not be confirmed as installed in the current development environment. If it is already installed elsewhere, a link to the executable may need to be placed in one of the locations listed above. If it is not installed, setup will be performed only with the user's permission. This project does not modify the environment automatically.

### Building and Distribution

Run `./package-app.sh` on a Mac with Xcode installed to create `MarkItDownGUI.app`.

The current application bundle is unsigned and intended for personal use. To launch the app at login, add it under **System Settings → General → Login Items**.

Distribution to the general public requires Developer ID code signing and notarization.

This development machine has Swift and the Xcode Command Line Tools installed, but not the full Xcode application. Therefore, packaging the application as a `.app` bundle and configuring it to launch at login have not yet been completed.

## Standalone Web Version

The web version allows users to paste text into a browser and save it as Markdown, or upload files for conversion using the same MarkItDown Python package.

### Setup and Launch

Run the following commands from the project directory:

```bash
cd web
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8000
