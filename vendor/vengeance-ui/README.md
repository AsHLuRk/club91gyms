# Vengeance UI adaptations

Three components are adapted from https://github.com/Ashutoshx7/VengeanceUI under its MIT license (copyright Ashutoshx7, 2025–2026).

The original registry JSON snapshots and SHA-256 hashes are retained here for provenance. The complete upstream license ships in `public/licenses/VengeanceUI-LICENSE.txt`. The `components/ui/` implementations are tailored source copies, not an unmodified package installation.

- Animated Button: preserves the shine/border treatment; replaces perpetual Motion masks with hover/focus CSS animation, adds typed native link/button support, and preserves readable labels.
- Expandable Bento Grid: preserves active-item expansion into a detail card; adds gym images, real CTA handlers, native dialog focus trapping and restoration, Escape/backdrop dismissal, scroll cleanup and reduced motion. No dummy `href="#"` action remains.
- Glow Border Card: retains rotating conic gradients and color variables; uses the existing membership layout with red/silver colors. Animation runs on hover/focus only and stops for reduced-motion preferences.

The manual installation leaves Club 91's global theme intact. `components.json` and the `@/*` alias support future registry additions. Review new upstream component styles and dependencies before adding them.
