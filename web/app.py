from pathlib import Path
from tempfile import TemporaryDirectory
import os

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from markitdown import MarkItDown

app = FastAPI(title="MarkItDown API")

# CORSを有効化
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = MarkItDown()


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


@app.get("/health")
def health():
    return {"status": "ok"}
