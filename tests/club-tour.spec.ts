import { expect, test } from '@playwright/test';

test('the hero leads into the real gym tour and both films are playable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('link', { name: 'SEE INSIDE THE GYM' }).click();
  await expect(page).toHaveURL(/#inside$/);
  const tour = page.locator('#inside');
  await tour.getByRole('button', { name: 'Next gym view' }).click();
  await expect(tour.getByRole('button', { name: 'Free weights' })).toHaveAttribute('aria-pressed', 'true');
  await tour.getByRole('button', { name: 'The seating area' }).click();
  await expect(tour.locator('.swiper-slide-active img')).toHaveAttribute('alt', /glass table/);
  for (const video of await page.locator('.club-film video').all()) {
    await video.evaluate(async (element: HTMLVideoElement) => {
      element.muted = true;
      await element.play();
    });
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
    await video.evaluate((element: HTMLVideoElement) => element.pause());
  }
});
