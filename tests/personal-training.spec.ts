import { expect, test } from '@playwright/test';

test('the hero leads to Gagan’s coaching formats and the enquiry matches the selection', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Train with Gagan · Online or in person/ }).click();
  await expect(page).toHaveURL(/#personal-training$/);
  const section = page.getByRole('region', { name: /Train one-to-one with Gagan/i });
  for (const [format, heading, message] of [
    ['Online', 'Wherever you train', 'online personal training'],
    ['In person', 'On the gym floor', 'in-person personal training'],
  ]) {
    const choice = section.getByRole('button', { name: format, exact: true });
    await choice.focus();
    await choice.press('Enter');
    await expect(choice).toHaveAttribute('aria-pressed', 'true');
    await expect(section.getByRole('heading', { name: heading })).toBeVisible();
    const href = await section.getByRole('link').getAttribute('href');
    expect(new URL(href!).searchParams.get('text')).toContain(message);
  }
});
