# Club 91 Gyms by Gagan Fitness

Premium responsive landing page built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Swiper and React Hook Form. Static export can be deployed on Sites or Vercel.

## Development

Run `npm install`, then `npm run dev`. Run `npm run build` to produce `out/`. Windows PowerShell users can use `npm.cmd`.

## Content and launch details

- Service information is transcribed from the owner-supplied opening poster in `lib/club-content.ts`: Fitness & Training, Luxury Wellness, Premium Lifestyle and HYROX Training.
- The poster says **Opening Soon** and provides no opening date, exact address, hours or prices. The former illustrative countdown, street addresses, hours, package prices and inclusions have been removed. Membership cards now collect areas of interest; they do not represent fixed packages.
- Previously supplied context identifies two operating gyms in Baltana, one in Zirakpur and the upcoming Rajpura location. Announced services are scoped to the upcoming location; access and schedules should be confirmed with the team.
- Previously supplied contact details remain +91 70350 00071, +91 70878 78759 and Instagram `gagan_fitnesss`. WhatsApp uses the first central number.
- Enquiry and newsletter forms prepare explicit WhatsApp handoffs. No payment, website database, analytics or lead-delivery backend is configured.
- Images remain locally optimized WebP brand concepts and editorial inspiration, not actual facility photographs. See `ASSETS.md`.
- The preview remains `noindex`. Confirm business details, policies and canonical domain before public launch.

## QA

`npm run typecheck` and `npm run build`. The browser smoke tests in `tests/landing.spec.ts` cover mobile layouts, branch tabs, enquiry validation and handoff, gallery dialogs, journal and navigation. Run with `npx playwright test` against the static preview server configured in `playwright.config.ts`.

## Vengeance UI components

The buttons, expandable facilities grid and featured interest-card border use adapted Vengeance UI source. Components are in `components/ui/`, with scoped styling in `app/vengeance.css`. Original sources, hashes and adaptation notes are in `vendor/vengeance-ui/`; the MIT license ships at `/licenses/VengeanceUI-LICENSE.txt`.

Button shine and the Perform card border animate only on hover or keyboard focus. Reduced-motion preferences disable these effects. Facility cards open native accessible dialogs with Escape/backdrop dismissal, focus restoration and enquiry buttons that preselect the correct branch and topic. Spa and café enquiries select Rajpura.

No additional animation engine is installed. `clsx` and `tailwind-merge` supply the class utility. The existing Next.js/Tailwind theme is preserved. `components.json` declares the Vengeance registry and TypeScript supports the `@/*` alias for future components.

## Hosting

Sites project identity is stored in `.openai/hosting.json`. The repository can alternatively be imported into Vercel as a Next.js project; no secrets are required for the current frontend. Sites publication remains private unless sharing is explicitly changed.

## Editorial experience refresh

`app/experience.css` refines the original theme; `HeroTitle` plays a single red light sweep after local fonts are ready, then warms the second line into a steady red glow. Reduced-motion visitors get the settled, readable title immediately.

The journal uses an adapted Vengeance Image Reveal List, and the launch card uses its Border Beam. Source snapshots and hashes accompany the existing three components. The custom goal selector carries the selected goal and branch to the enquiry form. Branch tabs now update the form branch used by membership actions. Coaching notes expand using native details elements.

On mobile, facilities become full-width cards, form fields stack, article thumbnails remain visible, and the fixed join action hides while contact is in view. The location graphic links to the Rajpura area in Maps; it does not embed a map or claim an exact branch pin. Tests in `tests/experience.spec.ts` cover the light sequence, reduced motion, keyboard interactions, branch/goal handoff and mobile form clearance.

## Poster and light-flow follow-up

The hero footer now stays in layout flow, so short desktop viewports and larger text cannot collide with the CTA row. The second-line glow begins 0.4 seconds before the first-line sweep finishes. `SectionLight` draws lightweight SVG current paths as sections enter view. The HYROX feature, photo sweeps, journal edges and branch tabs extend the red-light treatment; reduced motion renders static accents. Tests in `tests/poster-followup.spec.ts` cover poster content, short-screen layout, the timing overlap and section motion.
