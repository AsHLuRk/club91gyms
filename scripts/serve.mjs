import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
const root=path.resolve('out');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.jpg':'image/jpeg','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
http.createServer(async(req,res)=>{try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');let data=await fs.readFile(file);const ext=path.extname(file);const headers={'Content-Type':types[ext]||'application/octet-stream','Cache-Control':ext==='.html'?'no-cache':'public, max-age=31536000'};if(/gzip/.test(req.headers['accept-encoding']||'')&&['.html','.css','.js','.txt','.xml'].includes(ext)){data=gzipSync(data);headers['Content-Encoding']='gzip';headers.Vary='Accept-Encoding';}res.writeHead(200,headers);res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(3000,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:3000'));
