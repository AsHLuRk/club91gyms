import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base='https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/';
await fs.mkdir('vendor/vengeance-ui',{recursive:true});
await fs.mkdir('public/licenses',{recursive:true});
const sources=[];
for(const name of ['animated-button','expandable-bento-grid','glow-border-card','image-reveal-list','border-beam']){
  const url=`${base}public/r/${name}.json`;
  const response=await fetch(url);if(!response.ok)throw new Error(`${name}: ${response.status}`);
  const text=await response.text();JSON.parse(text);
  await fs.writeFile(`vendor/vengeance-ui/${name}.json`,text);
  sources.push({name,url,sha256:createHash('sha256').update(text).digest('hex')});
}
const license=await fetch(base+'LICENSE');if(!license.ok)throw new Error('License download failed');
await fs.writeFile('public/licenses/VengeanceUI-LICENSE.txt',await license.text());
await fs.writeFile('vendor/vengeance-ui/sources.json',JSON.stringify(sources,null,2)+'\n');
console.log('Archived the five upstream components and their MIT license.');
