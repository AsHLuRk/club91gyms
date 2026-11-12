import {test,expect} from '@playwright/test';
import {services} from '../lib/club-content';

test('poster services are complete and the opening announcement has no invented date or prices',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.opening-title')).toHaveText('OPENINGSOON.');
 await expect(page.locator('main')).not.toContainText('30 NOVEMBER');
 await expect(page.locator('main')).not.toContainText('SCO 91');
 await expect(page.locator('main')).not.toContainText('1,499');
 for(const service of services){
  await page.getByRole('button',{name:`Explore ${service.name}`,exact:true}).click();
  const dialog=page.getByRole('dialog',{name:service.name,exact:true});
  for(const detail of service.highlights)await expect(dialog).toContainText(detail);
  await page.keyboard.press('Escape');
 }
 await page.getByRole('button',{name:'04 HYROX race preparation'}).click();
 await expect(page.locator('.hyrox-caption')).toContainText('FIND YOUR FINISH LINE.');
 await page.getByRole('button',{name:'ASK ABOUT HYROX',exact:true}).click();
 await expect(page.locator('#branch')).toHaveValue('rajpura');
 await expect(page.locator('#enquiry-type')).toHaveValue('HYROX training');
});

test('hero CTAs and footer never overlap across short desktop and mobile viewports',async({page})=>{
 await page.goto('/');await page.evaluate(()=>document.fonts.ready);
 for(const [width,height] of [[1920,800],[1440,700],[1280,600],[1024,600],[768,1024],[390,844],[320,568]]){
  await page.setViewportSize({width,height});
  const bounds=await page.evaluate(()=>({actions:document.querySelector('.hero-actions')!.getBoundingClientRect().bottom,footer:document.querySelector('.hero-foot')!.getBoundingClientRect().top,hero:document.querySelector('.hero')!.getBoundingClientRect().bottom,footBottom:document.querySelector('.hero-foot')!.getBoundingClientRect().bottom,width:document.documentElement.scrollWidth}));
  expect(bounds.footer-bounds.actions,`CTA clearance at ${width}×${height}`).toBeGreaterThanOrEqual(32);
  expect(bounds.footBottom).toBeLessThanOrEqual(bounds.hero+1);expect(bounds.width).toBeLessThanOrEqual(width);
 }
 await page.setViewportSize({width:1280,height:600});
 await page.addStyleTag({content:'body { zoom: 1.25; }'});
 const gap=await page.evaluate(()=>document.querySelector('.hero-foot')!.getBoundingClientRect().top-document.querySelector('.hero-actions')!.getBoundingClientRect().bottom);
 expect(gap).toBeGreaterThan(32);
});

test('hero timing overlaps and red current follows section entries with reduced-motion support',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
 await expect(page.locator('.hero-title')).toHaveAttribute('data-ready','true');
 const timing=await page.evaluate(()=>{
  const sweep=document.querySelector('.hero-light')!.getAnimations()[0].effect!.getTiming();
  const glow=document.querySelector('.hero-ignite')!.getAnimations()[0].effect!.getTiming();
  return {sweepEnd:Number(sweep.delay)+Number(sweep.duration),glowStart:Number(glow.delay)};
 });
 expect(timing.sweepEnd-timing.glowStart).toBeGreaterThanOrEqual(300);
 for(const id of ['facilities','hyrox','branches','membership','trainers','gallery','journal','contact']){
  const graphic=page.locator(`#${id} .section-light`).first();
  await graphic.scrollIntoViewIfNeeded();await expect(graphic).toHaveClass(/light-active/);
  await expect(graphic.locator('.light-current')).toHaveCSS('animation-name','section-current');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('#contact .light-current')).toHaveCSS('animation-name','none');
 await expect(page.locator('.page-current')).not.toBeVisible();
});
