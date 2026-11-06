# Club 91 Gyms by Gagan Fitness

Premium responsive landing page built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Swiper and React Hook Form. Static export can be deployed on Sites or Vercel.

## Development

Run `npm install`, then `npm run dev`. Run `npm run build` to produce `out/`. Windows PowerShell users can use `npm.cmd`.

## Content and launch checklist

- Three operating gyms are confirmed: two in Baltana and one in Zirakpur. Rajpura is upcoming.
- Opening date **30 November 2026 at 10:00 IST**, street addresses, hours, plan prices and plan inclusions are illustrative, authorized for the design preview. These are visibly labeled and excluded from structured data.
- Supplied brand concept imagery is labeled. Editorial images are inspiration, not actual branch photographs. See `ASSETS.md`.
- The supplied artwork provides +91 70350 00071, +91 70878 78759 and Instagram `gagan_fitnesss`. Both phone links work; WhatsApp uses the first central number pending branch-specific routing confirmation.
- Enquiry forms validate client-side and prepare an explicit WhatsApp handoff. They do not silently store or send leads. The selected branch and enquiry type are included. Newsletter requests also use an explicit WhatsApp handoff.
- No invented customer reviews, ratings, transformations, trainer credentials or membership counts are published. Gagan is shown using the supplied promotional artwork. Replace with a dedicated portrait when available.
- Before public launch, replace sample content, confirm contact ownership and WhatsApp availability, exact maps, facilities, consent language and business policies. Add verified reviews and transformations with consent when available.
- This private preview is intentionally `noindex`; robots disallows crawling. On public launch, update `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` and the canonical origin for the final domain. Add verified street addresses and opening hours to branch JSON-LD then.
- Replace the date in `Countdown` in `app/page.tsx` when confirmed. Past dates clamp to zero. Do not show the preview launch date as a confirmed date.
- No analytics, ad pixels, payment service or form delivery backend has been configured. Add these only with real business settings. Images are locally optimized WebP; Next Image uses static-safe unoptimized mode so no runtime image server is needed.

## QA

`npm run typecheck` and `npm run build`. The browser smoke tests in `tests/landing.spec.ts` cover mobile layouts, branch tabs, enquiry validation and handoff, gallery dialogs, journal and navigation. Run with `npx playwright test` against the static preview server configured in `playwright.config.ts`.

## Hosting

Sites project identity is stored in `.openai/hosting.json`. The repository can alternatively be imported into Vercel as a Next.js project; no secrets are required for the current frontend. Sites publication remains private unless sharing is explicitly changed.
