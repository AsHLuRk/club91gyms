import fs from 'node:fs/promises';
import sharp from 'sharp';
const root = new URL('../public/images/', import.meta.url);
async function saveRemote(name, url, width = 1200) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  await sharp(Buffer.from(await res.arrayBuffer())).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(new URL(`${name}.webp`, root).pathname.replace(/^\/(\w:)/, '$1'));
  console.log(`Prepared ${name}`);
}
const photo = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
await Promise.all([
  saveRemote('hero', photo('photo-1625151936268-e1ffba534f20', 2000), 1920),
  saveRemote('strength', photo('photo-1604233098531-90b71b1b17a6')),
  saveRemote('training', photo('photo-1709315948410-69a2a7db80d6')),
  saveRemote('recovery', photo('photo-1770573320171-9f21c3c1f8f5')),
  saveRemote('cafe', photo('photo-1654084982335-d404ccf9c6f5')),
  saveRemote('equipment', photo('photo-1603734220970-25a0b335ca01'))
]);
const input = name => new URL(name, root).pathname.replace(/^\/(\w:)/, '$1');
await sharp(input('logo-original.jpg')).resize(240).webp({quality:90}).toFile(input('logo.webp'));
await sharp(input('wordmark-original.jpg')).extract({left:0,top:170,width:1600,height:455}).resize(900).webp({quality:90}).toFile(input('wordmark.webp'));
await sharp(input('flagship-original.jpg')).resize(1500).webp({quality:86}).toFile(input('flagship.webp'));
await sharp(input('gagan-original.jpg')).extract({left:0,top:0,width:398,height:620}).webp({quality:90}).toFile(input('gagan.webp'));
const fontDir = new URL('../public/fonts/', import.meta.url);
await fs.mkdir(fontDir,{recursive:true});
for (const [family,name] of [['Bebas+Neue','bebas'],['Inter:wght@400;500;600;700','inter']]) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0'}})).text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)];
  if (!urls.length) throw new Error('Font unavailable');
  await fs.writeFile(new URL(`${name}.ttf`,fontDir),Buffer.from(await (await fetch(urls[0][1])).arrayBuffer()));
}
console.log('Local assets and fonts ready.');
for (const [name,path] of [['Bebas-Neue','ofl/bebasneue/OFL.txt'],['Inter','ofl/inter/OFL.txt']]) {
  const res=await fetch(`https://raw.githubusercontent.com/google/fonts/main/${path}`);
  if(!res.ok)throw new Error(`Font license: ${res.status}`);
  await fs.writeFile(new URL(`${name}-LICENSE.txt`,fontDir),await res.text());
}
