# Thumbly AI — Landing Page

A single, premium landing page for an AI YouTube thumbnail generator. No login, no generator, no backend.

## Visual direction
- Palette: warm off-black ink background (`oklch ~0.16`), bone/paper text, one signal accent — hot "broadcast red-orange" (nods to YouTube without copying it), plus a muted chartreuse for small highlights. No purple gradients, no glassmorphism.
- Type: Instrument Serif (big editorial headlines, italic accents) + Geist / Inter Tight-alternative "Manrope" for UI, JetBrains Mono for small labels.
- Feel: editorial creative studio meets broadcast control room. Thin hairline rules, numbered section labels (01 / 02...), sharp 6px radius, restrained motion.

## Sections (one page, smooth-scroll anchors)
1. Nav — logo mark + "Thumbly AI", Features / How It Works / Examples, "Sign In" text link, "Get Started" button (scrolls to hero preview). Mobile menu sheet.
2. Hero — headline "Turn Your Ideas Into Thumbnails That Get Noticed." with serif italic emphasis, supporting copy, "Start Creating" + "Explore Examples", line "Made for creators. No design skills required."
3. Product preview mockup — app-window frame with description textarea (typeable), theme chips (Cinematic, Gaming, Tech, Minimal — selectable, changes which thumbnails are highlighted), "Generate" button that shows a "Preview only — coming soon" toast. Grid of 4 thumbnails on the right.
4. Examples gallery — category filter (All, Gaming, Technology, Education, Fitness, Travel, Business) with animated layout; 12 thumbnails in 16:9.
5. Features — asymmetric bento: one large feature with a visual, mixed sizes, list-style rows; not identical cards.
6. How It Works — three large numbered steps on a horizontal rule with small illustrative UI snippets.
7. Final CTA — "Your Next Thumbnail Starts With an Idea." + "Get Started" (scrolls to hero).
8. Footer — logo, section links, copyright.

No testimonials, user counts, or performance claims.

## Imagery
Generate ~12 art-directed 16:9 thumbnail images (bold composition, high contrast, YouTube-style, bold title text baked in with premium quality) across the six categories, saved under `src/assets/thumbs/`.

## Technical details
- Rewrite `src/routes/index.tsx` with head() metadata; update `__root.tsx` meta + font `<link>`s, add sonner `<Toaster />`.
- Components in `src/components/landing/` (Nav, Hero, ProductPreview, Gallery, Features, HowItWorks, FinalCta, Footer, ThumbnailCard, SectionLabel); thumbnail data in `src/data/thumbnails.ts` for easy later API swap.
- Tokens in `src/styles.css` (oklch), dark-by-default; `scroll-behavior: smooth` with scroll-margin for anchors.
- Install `framer-motion`, `lucide-react` (if missing); subtle fade/rise on scroll, layout animation in gallery.
- Record structure rule in AGENTS.md.
