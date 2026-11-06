import fs from 'node:fs/promises';
const ua='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
for(const [family,name] of [['Bebas+Neue','bebas'],['Inter:wght@100..900','inter']]){
  const res=await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`,{headers:{'User-Agent':ua}});
  const css=await res.text();const latin=css.split('/* latin */').at(-1);const source=latin.match(/url\(([^)]+)\)/)?.[1];
  if(!source?.includes('.woff2'))throw new Error(`No latin WOFF2 for ${name}`);
  const font=await fetch(source);if(!font.ok)throw new Error('Font download failed');
  await fs.writeFile(`public/fonts/${name}.woff2`,Buffer.from(await font.arrayBuffer()));
  console.log(`${name}: WOFF2 ready`);
}
