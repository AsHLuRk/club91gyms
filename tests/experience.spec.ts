import {test,expect} from '@playwright/test';

test('hero light sweeps first and finishes with a steady red title',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/');
 await expect(page.locator('.hero-title')).toHaveAttribute('data-ready','true');
 const frames=await page.evaluate(()=>{
   const sweep=document.querySelector('.hero-light')!,ignite=document.querySelector('.hero-ignite')!;
   const light=sweep.getAnimations().find(a=>(a as CSSAnimation).animationName==='club-light-pass')!;
   const glow=ignite.getAnimations().find(a=>(a as CSSAnimation).animationName==='club-ignite')!;
   light.pause();glow.pause();light.currentTime=1000;glow.currentTime=1000;
   const early={light:getComputedStyle(sweep).opacity,glow:getComputedStyle(ignite).color};
   light.currentTime=4000;glow.currentTime=4000;
   return {early,late:{light:getComputedStyle(sweep).opacity,glow:getComputedStyle(ignite).color},iterations:glow.effect?.getTiming().iterations};
 });
 expect(Number(frames.early.light)).toBeGreaterThan(.5);
 expect(frames.early.glow).toBe('rgba(0, 0, 0, 0)');
 expect(frames.late.light).toBe('0');expect(frames.late.glow).toBe('rgb(237, 40, 69)');expect(frames.iterations).toBe(1);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.hero-ignite')).toHaveCSS('animation-name','none');
 await expect(page.locator('.hero-ignite')).toHaveCSS('color','rgb(237, 40, 69)');
});

test('branch choice carries through plans and training goals',async({page})=>{
 await page.goto('/');
 await page.getByRole('tab',{name:'04 Zirakpur'}).click();
 await page.getByRole('button',{name:'EXPLORE PERFORM',exact:true}).click();
 await expect(page.locator('#branch')).toHaveValue('zirakpur');
 await page.getByRole('button',{name:'Train with a coach'}).click();
 await expect(page.getByRole('button',{name:'Train with a coach'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'START YOUR STORY'}).click();
 await expect(page.locator('#branch')).toHaveValue('zirakpur');
 await expect(page.locator('#enquiry-type')).toHaveValue('Personal training');
 await expect(page.locator('#message')).toHaveValue('My goal: train with a coach.');
});

test('journal and coaching are keyboard accessible and mobile join clears the form',async({page})=>{
 await page.goto('/');
 const article=page.locator('.journal-row').nth(1);
 await article.focus();await expect(article).toHaveClass(/is-active/);
 await expect(page.locator('.journal-preview img').nth(1)).toHaveClass(/is-active/);
 await article.press('Enter');await expect(page.getByRole('dialog',{name:'Club 91 journal'})).toBeVisible();
 await page.keyboard.press('Escape');await expect(article).toBeFocused();
 const note=page.locator('.coach-notes summary').first();await note.focus();await note.press('Enter');
 await expect(page.locator('.coach-notes details').first()).toHaveAttribute('open','');
 await page.setViewportSize({width:390,height:844});
 await page.locator('#facilities').scrollIntoViewIfNeeded();await expect(page.locator('.mobile-join')).toBeVisible();
 await page.locator('#contact').scrollIntoViewIfNeeded();await expect(page.locator('.mobile-join')).not.toBeVisible();
 const name=await page.locator('#full-name').boundingBox(),phone=await page.locator('#phone').boundingBox();
 expect(phone!.y).toBeGreaterThan(name!.y+name!.height);
 await expect(page.locator('.journal-mobile-image').first()).toBeVisible();
});
