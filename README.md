# Al Hamra Business Tower — Official Website

Kuwait's most iconic commercial skyscraper — 412 metres, designed by SOM.

## Stack

- **React 18** + TypeScript
- **Tailwind CSS** — Al Hamra brand tokens
- **Framer Motion** — all animations
- **react-intersection-observer** — scroll triggers
- **React Router DOM** — routing
- **Vite** — build tool

## Brand System

| Token | Value | Usage |
|-------|-------|-------|
| `--ah-red` | `#CD1719` | Hero rule, marquee bg, logo |
| `--ah-black` | `#1D1D1B` | Text, buttons, borders |
| `--ah-grey` | `#B2B2B2` | Labels, secondary text |
| `--ah-muted` | `#6B6B6B` | Body paragraphs |
| `--ah-border` | `rgba(29,29,27,0.09)` | All dividers |

**Fonts:** Jost (all UI) + Cormorant Garamond italic (hero "Iconic" only)

## Structure

```
src/
  components/
    layout/     Navbar · Footer · Cursor
    home/       Hero · Stats · Marquee · Architecture · Sections
    shared/     ScrollReveal
  pages/
    Index.tsx   Homepage (all sections assembled)
  index.css     Global styles + design tokens
```

## Assets

Upload to `/public/assets/`:
- `logo.jpg` — Al Hamra logo
- `hero.mp4` — Hero animation video
- `arch-sketch.jpg` — Architecture line drawing

## Dev

```bash
npm install
npm run dev
```

## Sections

1. **Hero** — Split layout, video right, animated text left, red left rule
2. **Stats** — 412m / 74 floors / #23 World / 52 elevators
3. **Marquee** — Continuous awards strip (#1D1D1B bg)
4. **Architecture** — Animated sketch reveal (bottom→top, 3s) + sequential callouts (Grand Lobby → Sky L.30 → Sky L.55 → Crown)
5. **Perspectives** — Recognition / Business Value / Location
6. **Floor Configurations** — Executive Suite / Full Floor / Corporate HQ
7. **Leasing Band** — Dark CTA section (#1D1D1B)
8. **Contact Strip** — Phone / Email / Hours / Address
9. **Footer**
