import { test, expect } from '@playwright/test';
test('desktop navigation, content, assets and responsive layout',async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('WHERE LIMITS');
  await expect(page.locator('.hero-line>span').first()).toHaveCSS('transform','none');
  await expect.poll(()=>page.locator('.hero-photo img').evaluate(img=>(img as HTMLImageElement).complete)).toBeTruthy();
  await page.screenshot({path:'test-results/desktop-hero.png'});
  for(const width of [1440,1024,768,390,320]){
    await page.setViewportSize({width,height:900});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),{message:`overflow at ${width}`}).toBeTruthy();
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await expect.poll(()=>page.locator('img').evaluateAll(images=>images.filter(img=>img.getAttribute('loading')!=='lazy'||img.getBoundingClientRect().top<innerHeight).every(img=>(img as HTMLImageElement).complete&&(img as HTMLImageElement).naturalWidth>0))).toBeTruthy();
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:'test-results/desktop.png',fullPage:true});
  expect(errors).toEqual([]);
});
test('branch controls and accessible gallery lightbox',async({page})=>{
  await page.goto('/');
  await page.getByRole('tab',{name:'03 Baltana II'}).click();
  await expect(page.getByRole('tabpanel')).toContainText('CLUB 91 BALTANA II');
  await page.getByRole('tab',{name:'03 Baltana II'}).press('ArrowRight');
  await expect(page.getByRole('tabpanel')).toContainText('CLUB 91 ZIRAKPUR');
  await page.getByRole('button',{name:'Recovery',exact:true}).click();
  await expect(page.locator('.gallery-item')).toHaveCount(2);
  await page.getByRole('button',{name:'Open Space to switch off'}).click();
  await expect(page.getByRole('dialog',{name:'Image gallery'})).toBeVisible();
  await page.getByRole('button',{name:'Next image'}).click();
  await expect(page.locator('.lightbox-bottom h3')).toContainText('Your post-session ritual');
  await page.keyboard.press('Escape');
  await expect(page.locator('.content-dialog')).not.toBeVisible();
});
test('enquiry validates and preserves branch in explicit WhatsApp handoff',async({page})=>{
  await page.goto('/');
  await page.getByRole('tab',{name:'04 Zirakpur'}).click();
  await page.getByRole('button',{name:'ENQUIRE NOW',exact:true}).click();
  await expect(page.locator('#branch')).toHaveValue('zirakpur');
  await page.getByRole('button',{name:'PREPARE MY ENQUIRY'}).click();
  await expect(page.locator('#name-error')).toBeVisible();
  await page.locator('#full-name').fill('Test Visitor');
  await page.locator('#phone').fill('9876543210');
  await page.locator('#email').fill('visitor@example.com');
  await page.locator('#message').fill('I would like to visit.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button',{name:'PREPARE MY ENQUIRY'}).click();
  await expect(page.getByRole('status')).toContainText('Your enquiry is ready.');
  const href=await page.getByRole('link',{name:'CONTINUE TO WHATSAPP'}).getAttribute('href');
  expect(href).toContain('https://wa.me/917035000071');
  expect(decodeURIComponent(href!)).toContain('Branch: Zirakpur');
  await page.locator('#branch').selectOption('rajpura');
  await expect(page.getByRole('status')).not.toBeVisible();
});
test('mobile menu, journal dialog and newsletter handoff',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  await page.getByRole('button',{name:'Open navigation menu'}).click();
  await expect(page.locator('.mobile-menu')).toBeVisible();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Gallery'}).click();
  await expect(page.locator('.mobile-menu')).not.toBeVisible();
  await page.getByRole('button',{name:'Read Rajpura. Something bigger is coming.'}).click();
  await expect(page.locator('.content-dialog')).toContainText('new flagship');
  await page.keyboard.press('Escape');
  await page.locator('#newsletter-email').fill('member@example.com');
  await page.getByRole('button',{name:'Prepare updates request'}).click();
  await expect(page.getByRole('link',{name:'SEND UPDATE REQUEST ON WHATSAPP'})).toHaveAttribute('href',/member%40example.com/);
  await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'test-results/mobile.png',fullPage:true});
});
