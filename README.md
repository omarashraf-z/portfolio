# Portfolio

Personal portfolio for Omar Ashraf. Black, gray and white; a handful of
deliberate animations; every project shown as a screen recording plus a live
version clients can actually test.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the build
```

Node 20.11+.

## Adding work

Two steps, both described in **[ASSETS.md](./ASSETS.md)**:

1. Drop the media in `public/work/<slug>/`.
2. Add one object to `src/data/projects.ts`.

Nothing else changes. Media that is not there yet renders a placeholder naming
the file it expects, so projects can go in before the assets do.

## How it is put together

```
src/
  data/
    site.ts          name, headline, email, socials, bio
    projects.ts      every project — the file you edit
  components/
    SiteVideo.tsx    the site recording, looping when it is on screen
    DeviceFrame.tsx  the live site in a frame, click-to-load
    Media.tsx        <img> that falls back to a labelled placeholder
    AssetSlot.tsx    that placeholder
    Reveal.tsx       fade-up on scroll into view
    Nav / Footer / ScrollProgress / ProjectCard
  hooks/
    useReveal.ts     one-shot IntersectionObserver
  pages/
    Home / Work / ProjectPage / About / NotFound
  styles/
    tokens.css       the whole palette and type scale
    app.css          everything else
```

### The site video

A project page leads with a screen recording of the finished site, looping.
It starts when it scrolls into view and pauses when it leaves, so a page with
several of them is not decoding video nobody is watching. Click it to pause;
that choice sticks.

Under `prefers-reduced-motion` it renders with controls and does not autoplay.
A missing file falls back to a placeholder naming the path it wants.

### Live previews

`DeviceFrame` only mounts its iframe once the visitor clicks **Launch live
preview** — three third-party sites booting behind a page someone is scrolling
past is not worth the load. Sites that block embedding are handled by the
per-project `embed` flag; see ASSETS.md.

### Colour and themes

Everything comes from custom properties in `src/styles/tokens.css`: `--ink-*`
for the surfaces, `--gray-*` for secondary text, `--paper` for primary. No hue
anywhere in the chrome, so the screenshots are the only colour on the page.

Both themes define the same tokens by **role** — `--ink-050` is always the page
ground, `--paper` is always the primary text — so every rule in `app.css` works
in either without knowing which is on.

Night is the default for everyone, deliberately: it is the site's own look, so
a first visit shows it whatever the visitor's OS is set to. The toggle in the
nav switches to day, and only then is anything written to `localStorage` — so a
stored value always means somebody chose it. That choice wins on every later
visit.

The same rule runs in an inline script in `index.html` before first paint, so a
returning day-mode visitor sees no flash of the dark one. If you edit
`readTheme()`, edit that script to match — the comment in each points at the
other.

To follow the visitor's OS on a first visit instead, have `readTheme()` fall
back to `matchMedia('(prefers-color-scheme: light)')` when nothing is stored,
and make the inline script do the same.

The dimmest text token in each theme is set to clear 4.5:1 against its ground.

## Deploying

`.github/workflows/pages.yml` builds and publishes to GitHub Pages on every
push to `main`. It builds with `base: /portfolio/` to match the repo name, and
copies `index.html` to `404.html` so client-side routes survive a hard refresh.

For a custom domain, build with `BASE_PATH=/` and add a `CNAME` file to
`public/`.
