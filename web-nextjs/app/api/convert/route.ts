import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { MarkItDown } from 'markitdown';

const engine = new MarkItDown();

function parseMultipart(body: Buffer, boundary: string): { fileData: Buffer | null; filename: string } {
  const bodyStr = body.toString('binary');
  const parts = bodyStr.split(`--${boundary}`);
  let fileData: Buffer | null = null;
  let filename = 'upload';
  
  for (const part of parts) {
    if (part.includes('Content-Disposition') && part.includes('filename=')) {
      const headersEnd = part.indexOf('\r\n\r\n');
      if (headersEnd !== -1) {
        const headers = part.slice(0, headersEnd);
        if (headers.includes('filename=')) {
          const filenameStart = headers.indexOf('filename="') + 10;
          const filenameEnd = headers.indexOf('"', filenameStart);
          filename = filenameEnd > filenameStart ? headers.slice(filenameStart, filenameEnd) : 'upload';
        }
        const dataStr = part.slice(headersEnd + 4);
        if (dataStr.endsWith('\r\n')) {
          fileData = Buffer.from(dataStr.slice(0, -2), 'binary');
        } else {
          fileData = Buffer.from(dataStr, 'binary');
        }
        break;
      }
    }
  }
  
  return { fileData, filename };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.arrayBuffer();
    const buffer = Buffer.from(body);
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const boundary = contentType.includes('boundary=') 
        ? contentType.split('boundary=')[1] 
        : null;
      
      if (!boundary) {
        return NextResponse.json({ error: 'No boundary found' }, { status: 400 });
      }
      
      const { fileData, filename } = parseMultipart(buffer, boundary);
      
      if (!fileData) {
        return NextResponse.json({ error: 'No file found in request' }, { status: 400 });
      }
      
      const tempDir = require('os').tmpdir();
      const fs = require('fs');
      const path = require('path');
      
      const sourcePath = path.join(tempDir, filename);
      fs.writeFileSync(sourcePath, fileData);
      
      try {
        const result = await engine.convert(sourcePath);
        const markdown = result.text_content;
        
        fs.unlinkSync(sourcePath);
        
        const outName = path.basename(filename, path.extname(filename)) + '.md';
        
        return new NextResponse(markdown, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Content-Disposition': `attachment; filename="${outName}"`,
          },
        });
      } catch (exc) {
        fs.unlinkSync(sourcePath);
        return NextResponse.json(
          { error: `変換できませんでした: ${exc}` },
          { status: 422 }
        );
      }
    }
    
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
