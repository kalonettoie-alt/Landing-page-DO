// serve.mjs — aperçu local de dist/ avec des URL propres (comme Vercel cleanUrls).
//   npm run build && npm run preview   →   http://localhost:4321
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const PORT = Number(process.env.PORT) || 4321;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/\/$/, '') || '/';
  const tries = p === '/' ? ['index.html'] : [p.slice(1), p.slice(1) + '.html'];
  const file = tries.map(t => path.join(DIST, t)).find(f => f.startsWith(DIST) && fs.existsSync(f) && fs.statSync(f).isFile());
  if (!file) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Aperçu : http://localhost:${PORT}`));
