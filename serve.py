#!/usr/bin/env python3
"""Read-only preview of this static site on loopback. Python 3, no dependencies."""
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit
import argparse
import mimetypes

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--port', type=int, default=8000)
args = parser.parse_args()
root = Path(__file__).resolve().parent
allowed = {'.html', '.css', '.js', '.jpg', '.jpeg', '.png', '.svg', '.ttf', '.woff', '.woff2', '.webp', '.ico'}
pages = {}
for file in root.rglob('*'):
    if file.is_file() and file.suffix.lower() in allowed and '.git' not in file.relative_to(root).parts:
        mime = mimetypes.guess_type(file.name)[0] or 'application/octet-stream'
        pages['/' + file.relative_to(root).as_posix()] = (file.read_bytes(), mime)
pages['/'] = pages['/index.html']

class Preview(BaseHTTPRequestHandler):
    def do_GET(self):
        item = pages.get(unquote(urlsplit(self.path).path))
        if item is None:
            self.send_error(404)
            return
        data, mime = item
        self.send_response(200)
        self.send_header('Content-Type', mime + ('; charset=utf-8' if mime.startswith('text/') or mime == 'application/javascript' else ''))
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(data)
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(('127.0.0.1', args.port), Preview)
print(f'Qraft: http://127.0.0.1:{args.port}/ — mantener esta ventana abierta.', flush=True)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('Vista previa detenida.')
finally:
    server.server_close()
