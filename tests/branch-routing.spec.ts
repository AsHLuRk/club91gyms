import { expect, test } from '@playwright/test';

test('each club has the correct manager, map, phone and WhatsApp handoff', async ({ page }) => {
  await page.goto('/');
  const cases = [
    ['Gian Sager Medical College', '30.528797149658203,76.67266082763672', 'Gagan', '917035000071'],
    ['SVIET Campus', 'SVIET Campus', 'Gagan', '917035000071'],
    ['Zirakpur (Baltana)', '30.669780731201172,76.82810974121094', 'Gurinder Singh', '917087878759'],
    ['Rajpura', '30.478113174438477,76.5921859741211', 'Gagan', '917035000071'],
  ];
  await page.locator('#full-name').fill('Test Visitor');
  await page.locator('#phone').fill('9876543210');
  await page.getByRole('checkbox').check();

  for (const [index, [name, landmark, manager, phone]] of cases.entries()) {
    const tab = page.getByRole('tablist', { name: 'Gym branches' }).getByRole('tab').nth(index);
    await expect(tab).toContainText(name);
    await tab.scrollIntoViewIfNeeded();
    await tab.click();
    const panel = page.getByRole('tabpanel');
    await expect(panel.getByRole('link', { name: `Call ${manager} about ${name}` })).toHaveAttribute('href', 'tel:+' + phone);
    const map = await panel.getByRole('link', { name: /in Google Maps$/ }).getAttribute('href');
    const url = new URL(map!);
    expect(url.searchParams.get(index === 1 ? 'query' : 'q')).toContain(landmark);
    const preview = panel.locator('iframe');
    await preview.scrollIntoViewIfNeeded();
    expect(await preview.evaluate(frame => {
      const r = frame.getBoundingClientRect();
      return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2) === frame;
    })).toBe(true);
    if (index === 1) expect(new URL((await preview.getAttribute('src'))!).searchParams.get('q')).toContain(landmark);
    else await expect(preview).toHaveAttribute('src', map + '&output=embed');
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
