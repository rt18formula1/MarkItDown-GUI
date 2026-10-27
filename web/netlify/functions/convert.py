import json
import base64
from pathlib import Path
from tempfile import TemporaryDirectory

from markitdown import MarkItDown

engine = MarkItDown()


def parse_multipart(body, boundary):
    """Simple multipart form data parser"""
    parts = body.split(f'--{boundary}'.encode())
    file_data = None
    filename = 'upload'
    
    for part in parts:
        if b'Content-Disposition' in part and b'filename=' in part:
            headers_end = part.find(b'\r\n\r\n')
            if headers_end != -1:
                headers = part[:headers_end].decode('utf-8', errors='ignore')
                if 'filename=' in headers:
                    filename_start = headers.find('filename="') + 10
                    filename_end = headers.find('"', filename_start)
                    filename = headers[filename_start:filename_end] if filename_end > filename_start else 'upload'
                file_data = part[headers_end + 4:]
                if file_data.endswith(b'\r\n'):
                    file_data = file_data[:-2]
                break
    
    return file_data, filename


def handler(event, context):
    try:
        body = event.get('body', '')
        if event.get('isBase64Encoded', False):
            body = base64.b64decode(body)
        
        if not isinstance(body, bytes):
            body = body.encode('utf-8') if body else b''
        
        headers = event.get('headers', {})
        content_type = headers.get('content-type', headers.get('Content-Type', ''))
        
        if 'multipart/form-data' in content_type:
            boundary = content_type.split('boundary=')[1] if 'boundary=' in content_type else None
            if not boundary:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'No boundary found'})
                }
            
            file_data, filename = parse_multipart(body, boundary)
            
            if not file_data:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'No file found in request'})
                }
            
            with TemporaryDirectory(prefix="markitdown-") as temp:
                source = Path(temp) / filename
                source.write_bytes(file_data)
                try:
                    result = engine.convert(str(source))
                    markdown = result.text_content
                except Exception as exc:
                    return {
                        'statusCode': 422,
                        'body': json.dumps({'error': f"変換できませんでした: {exc}"})
                    }
            
            out_name = Path(filename).stem + ".md"
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    'Content-Disposition': f'attachment; filename="{out_name}"'
                },
                'body': markdown
            }
        
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Unsupported content type'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
