# Portfolio

Personal portfolio for Omar Ashraf. Black, gray and white; a handful of
deliberate animations; every project shown as a scroll-through recording plus a
live version clients can actually test.

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
    ScrollVideo.tsx  scroll position drives the video playhead
    DeviceFrame.tsx  the live site in a frame, click-to-load
    Media.tsx        <img> that falls back to a labelled placeholder
    AssetSlot.tsx    that placeholder
    Reveal.tsx       fade-up on scroll into view
    Nav / Footer / ScrollProgress / ProjectCard
  hooks/
    useScrollProgress.ts   element travel through the viewport, 0 → 1
    useReveal.ts           one-shot IntersectionObserver
  pages/
    Home / Work / ProjectPage / About / NotFound
  styles/
    tokens.css       the whole palette and type scale
    app.css          everything else
```

### The scroll video

A project page's hero is a tall track with a sticky frame inside it. As the
page scrolls the track, that progress maps onto `video.currentTime`, eased so
each wheel notch does not read as a jump. The video never plays on its own.

Falls back to the cover image under `prefers-reduced-motion`, and to a
placeholder when the file is missing.

### Live previews

`DeviceFrame` only mounts its iframe once the visitor clicks **Launch live
preview** — three third-party sites booting behind a page someone is scrolling
past is not worth the load. Sites that block embedding are handled by the
per-project `embed` flag; see ASSETS.md.

### Colour

Everything comes from custom properties in `src/styles/tokens.css`: `--ink-*`
for the black-to-gray surfaces, `--gray-*` for secondary text, `--paper` for
primary. No hue anywhere in the chrome, so the screenshots are the only colour
on the page.

## Deploying

`.github/workflows/pages.yml` builds and publishes to GitHub Pages on every
push to `main`. It builds with `base: /portfolio/` to match the repo name, and
copies `index.html` to `404.html` so client-side routes survive a hard refresh.

For a custom domain, build with `BASE_PATH=/` and add a `CNAME` file to
`public/`.
