/**
 * THE FILE YOU EDIT TO ADD WORK.
 *
 * One object per project. Drop the media in `public/work/<slug>/` using the
 * paths below and it appears everywhere — cards, the work page, the project
 * page. Anything left undefined renders a labelled placeholder instead of
 * breaking, so you can add projects before you have the assets.
 *
 * See ASSETS.md for what to record and at what size.
 */

export type Shot = {
  /** e.g. '/work/acme/01-home.jpg' — see ASSETS.md */
  src: string
  /** Optional line under the image: 'Checkout', 'Mobile menu', … */
  caption?: string
  /** Full-width instead of half. Use for the money shots. */
  wide?: boolean
  /** A phone screenshot — shown in a portrait frame instead of 16:10. */
  tall?: boolean
}

export type Project = {
  /** URL segment: /work/<slug> */
  slug: string
  title: string
  /** One line. Shows on cards. */
  summary: string
  year: string
  /** What the client actually is: 'Restaurant', 'Portfolio', … */
  kind: string
  role: string[]
  stack: string[]
  /** The real site. Omit while it is not public yet. */
  liveUrl?: string
  repoUrl?: string
  /**
   * Can the live site be embedded in an iframe?
   * Many sites send X-Frame-Options: DENY and refuse — those show a
   * screenshot and an "Open live site" button instead. Start false,
   * flip to true once you have checked the site loads in the frame.
   */
  embed: boolean
  /** Card image + the still shown before the scroll video loads. */
  cover?: string
  /**
   * A screen recording of the site, looping on the project page — the
   * centrepiece. Pass an array to offer several encodings; the browser takes
   * the first it can play, so put the most widely supported one first.
   */
  video?: string | string[]
  /** Page screenshots, in the order you want them read. */
  shots?: Shot[]
  /** A paragraph or two on the project page. */
  body?: string[]
  /** Show on the home page. Keep this to three. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'gummybears',
    title: 'TheGummyBears',
    summary:
      'An entertainment brand that throws one party at a time — so the home page is the party, ' +
      'with accounts, reservations and an admin approval queue behind it.',
    year: '2025',
    kind: 'Entertainment website',
    role: ['Structure', 'Design', 'Frontend', 'Backend'],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'GitHub Pages'],
    liveUrl: 'https://omarashraf-z.github.io/ClaudeCode-enviroment/',
    repoUrl: 'https://github.com/omarashraf-z/ClaudeCode-enviroment',
    // GitHub Pages does not block framing, so this should embed — if the frame
    // comes up blank, flip to false and the page falls back to the cover.
    embed: true,
    cover: '/work/gummybears/cover.jpg',
    video: ['/work/gummybears/scroll.mp4', '/work/gummybears/scroll.webm'],
    shots: [
      { src: '/work/gummybears/02-tickets.jpg', caption: 'Tickets, and what is left', wide: true },
      { src: '/work/gummybears/03-rules.jpg', caption: 'Where, and the house rules' },
      { src: '/work/gummybears/04-archive.jpg', caption: 'Everything already done' },
      { src: '/work/gummybears/05-login.jpg', caption: 'Accounts' },
      { src: '/work/gummybears/06-mobile.jpg', caption: 'Mobile', tall: true },
    ],
    body: [
      'The brand runs one party at a time, so the site refuses to behave like a listings page. ' +
        'The home page is the current party — poster, countdown, ticket tiers, rules — and when ' +
        'the party is over it is gone. Every detail on it is edited live from an admin panel ' +
        'rather than hard-coded, so the next party replaces this one without a deploy.',
      'Guests make an account, pick a ticket, pay by InstaPay and upload the transfer screenshot. ' +
        'That lands in an approval queue where each reservation is accepted or rejected, and both ' +
        'decisions send the guest an email. Confirmed tickets render as a real stub with a QR code.',
      'The whole thing is a static build on GitHub Pages with no server of my own: Supabase holds ' +
        'accounts, party data, reservations and receipt uploads, with row-level security doing the ' +
        'access control, and a small Google Apps Script sends the two guest emails.',
    ],
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug)

/** Wraps around, so the last project points back at the first. */
export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  const count = projects.length
  return {
    prev: count > 1 ? projects[(i - 1 + count) % count] : undefined,
    next: count > 1 ? projects[(i + 1) % count] : undefined,
  }
}
