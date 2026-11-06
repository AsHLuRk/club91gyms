import {chromium} from '@playwright/test';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
try {
await page.goto('http://127.0.0.1:3000');
await page.evaluate(()=>document.fonts.ready);
await page.waitForFunction(()=>document.querySelector('.hero-photo img').complete&&getComputedStyle(document.querySelector('.hero-line>span')).transform==='none');
await page.waitForFunction(()=>getComputedStyle(document.querySelector('.hero-copy').parentElement).opacity==='1');
console.log(await page.evaluate(()=>({font:getComputedStyle(document.querySelector('h1')).fontFamily,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),width:innerWidth})));
await page.screenshot({path:'test-results/desktop-hero.png'});
await page.locator('#facilities').evaluate(el=>el.scrollIntoView({behavior:'instant',block:'start'}));
await page.screenshot({path:'test-results/desktop-facilities.png'});
await page.setViewportSize({width:390,height:844});
await page.evaluate(()=>window.scrollTo(0,0));
await page.screenshot({path:'test-results/mobile-hero.png'});
await page.locator('#contact').evaluate(el=>el.scrollIntoView({behavior:'instant',block:'start'}));
await page.screenshot({path:'test-results/mobile-contact.png'});
} finally {await browser.close();}
