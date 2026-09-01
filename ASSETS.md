# Sending me the pictures and videos

Nothing in the code changes when the media arrives. Every image and video on
the site is looked up by path, and anything missing renders a labelled
placeholder printing the exact filename it wants. Save the file to that name
and it appears.

## Where files go

One folder per project, named after its `slug` in `src/data/projects.ts`:

```
public/work/<slug>/
  cover.jpg        card image + the still behind the video
  scroll.mp4       the scroll-through recording
  01-home.jpg      page screenshots, numbered in reading order
  02-detail.jpg
  03-mobile.jpg
```

So for a project with `slug: 'acme-store'`, the cover lives at
`public/work/acme-store/cover.jpg` and is written in `projects.ts` as
`/work/acme-store/cover.jpg` — the `public/` part is dropped in the path.

## The scroll video

This is the one that carries a project page. Scrolling the portfolio scrubs
through it, so it should be a clean top-to-bottom pass over the finished site.

- **Record**: a browser window at 1440×900, no bookmarks bar, no extensions
  visible. Scroll from the very top to the very bottom in one steady take.
- **Length**: 10–20 seconds. Longer means more scrolling to get through it.
- **Speed**: even. Any pause in the recording becomes a dead patch where the
  page scrolls and nothing moves.
- **Format**: MP4, H.264, no audio (it is muted anyway).
- **Size**: 1440px wide, and keep the file under ~8 MB — it has to load before
  it can be scrubbed. Handbrake or `ffmpeg -crf 28` gets most recordings there.

```bash
ffmpeg -i raw.mov -vf scale=1440:-2 -c:v libx264 -crf 28 -preset slow -an scroll.mp4
```

## Screenshots

- **Cover**: 1600×1000 (16:10), JPG. This is the crop people judge the project
  by, so make it the best-looking screen, not necessarily the home page.
- **Page shots**: 1600×1000 for desktop, 900×1950 for phone screens. JPG at
  quality ~80.
- Mark the ones worth a full row with `wide: true` in `projects.ts`; the rest
  pair up two across.

## Adding the project

In `src/data/projects.ts`, add one object. Nothing else needs touching:

```ts
{
  slug: 'acme-store',
  title: 'Acme Store',
  summary: 'A one-line description for the card.',
  year: '2025',
  kind: 'E-commerce',
  role: ['Design', 'Frontend'],
  stack: ['React', 'TypeScript'],
  liveUrl: 'https://acme.com',
  embed: false,
  cover: '/work/acme-store/cover.jpg',
  scrollVideo: '/work/acme-store/scroll.mp4',
  shots: [
    { src: '/work/acme-store/01-home.jpg', caption: 'Home', wide: true },
    { src: '/work/acme-store/02-cart.jpg', caption: 'Cart' },
  ],
  body: ['What the client needed, what you built.'],
  featured: true,
}
```

## About `embed`

`embed: true` runs the real site in an iframe on the project page, so a client
can click through it without leaving the portfolio.

Plenty of sites refuse to be embedded — they send `X-Frame-Options: DENY` or a
`frame-ancestors` CSP, and the frame just comes up blank. The browser gives the
page no way to detect this, so it is a manual flag:

1. Leave `embed: false` when you add the project.
2. Open the project page, flip it to `true`, hit **Launch live preview**.
3. If the site loads, keep it. If the frame stays blank, set it back to `false`
   and the page shows the cover plus an **Open live site** button instead.

Sites you built and host yourself can usually be made embeddable by allowing
this domain in their `frame-ancestors` policy.
