from pathlib import Path
from tempfile import TemporaryDirectory

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import HTMLResponse, Response
from markitdown import MarkItDown

app = FastAPI(title="MarkItDown Web")
engine = MarkItDown()


@app.get("/", response_class=HTMLResponse)
def home():
    return """<!doctype html><html lang='ja'><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>MarkItDown Web</title><style>body{font:16px system-ui;max-width:760px;margin:40px auto;padding:0 18px;color:#202124}textarea{box-sizing:border-box;width:100%;min-height:220px;padding:12px;border:1px solid #aaa;border-radius:8px}input,button{margin:10px 0;padding:10px}button{background:#1769aa;color:white;border:0;border-radius:6px}section{margin:24px 0}h1{font-size:28px}</style>
    <h1>MarkItDown</h1><p>テキストをMarkdownとして保存するか、ファイルをMarkItDownで変換します。</p>
    <section><h2>テキスト</h2><form action='/text' method='post'><textarea name='text' placeholder='文章を貼り付けてください'></textarea><br><button>Markdownをダウンロード</button></form></section>
    <section><h2>ファイル</h2><form action='/file' method='post' enctype='multipart/form-data'><input type='file' name='file' required><br><button>変換してダウンロード</button></form></section></html>"""


@app.post("/text")
def text_to_markdown(text: str = Form(...)):
    if not text.strip():
        raise HTTPException(400, "テキストを入力してください")
    return Response(text, media_type="text/markdown; charset=utf-8",
                    headers={"Content-Disposition": 'attachment; filename="pasted-text.md"'})


@app.post("/file")
async def convert_file(file: UploadFile = File(...)):
    name = Path(file.filename or "upload").name
    with TemporaryDirectory(prefix="markitdown-") as temp:
        source = Path(temp) / name
        source.write_bytes(await file.read())
        try:
            markdown = engine.convert(str(source)).text_content
        except Exception as exc:
            raise HTTPException(422, f"変換できませんでした: {exc}") from exc
    out_name = Path(name).stem + ".md"
    return Response(markdown, media_type="text/markdown; charset=utf-8",
                    headers={"Content-Disposition": f'attachment; filename="{out_name}"'})
