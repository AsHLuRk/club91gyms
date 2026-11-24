import { expect, test } from '@playwright/test';

test('each club has the correct manager, map, phone and WhatsApp handoff', async ({ page }) => {
  await page.goto('/');
  const cases = [
    ['Gian Sager Medical College', 'Gian Sager Medical College', 'Gagan', '917035000071'],
    ['SVIET Campus', 'SVIET Campus', 'Gagan', '917035000071'],
    ['Zirakpur (Baltana)', 'Ram Lila Ground', 'Gurinder Singh', '917087878759'],
    ['Rajpura', 'Kanika Garden', 'Gagan', '917035000071'],
  ];
  await page.locator('#full-name').fill('Test Visitor');
  await page.locator('#phone').fill('9876543210');
  await page.getByRole('checkbox').check();

  for (const [index, [name, landmark, manager, phone]] of cases.entries()) {
    const tab = page.getByRole('tablist', { name: 'Gym branches' }).getByRole('tab').nth(index);
    await expect(tab).toContainText(name);
    await tab.click();
    const panel = page.getByRole('tabpanel');
    await expect(panel.getByRole('link', { name: `Call ${manager} about ${name}` })).toHaveAttribute('href', 'tel:+' + phone);
    const map = await panel.getByRole('link', { name: 'Explore the area' }).getAttribute('href');
    expect(new URL(map!).searchParams.get('query')).toContain(landmark);
    expect(new URL((await panel.getByRole('link', { name: /on WhatsApp/ }).getAttribute('href'))!).pathname).toBe('/' + phone);
    await page.getByRole('button', { name: 'PREPARE MY ENQUIRY' }).click();
    const handoff = new URL((await page.getByRole('link', { name: 'CONTINUE TO WHATSAPP' }).getAttribute('href'))!);
    expect(handoff.pathname).toBe('/' + phone);
    expect(handoff.searchParams.get('text')).toContain('Branch: ' + name);
  }
  const coaching = page.locator('#personal-training');
  await coaching.getByRole('button', {name:'Online'}).click();
  expect(new URL((await coaching.getByRole('link').getAttribute('href'))!).pathname).toBe('/917035000071');
});
