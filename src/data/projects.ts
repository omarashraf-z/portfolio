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
  /**
   * What a visitor on a phone sees instead. Captures of the site's own mobile
   * layout, so a phone shows a phone and a desktop shows a desktop. Anything
   * left out here falls back to the desktop media above.
   */
  mobile?: {
    video?: string | string[]
    shots?: Shot[]
  }
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
    video: '/work/gummybears/scroll.mp4',
    shots: [
      { src: '/work/gummybears/02-tickets.jpg', caption: 'Tickets, and what is left', wide: true },
      { src: '/work/gummybears/03-rules.jpg', caption: 'Where, and the house rules' },
      { src: '/work/gummybears/04-archive.jpg', caption: 'Everything already done' },
      { src: '/work/gummybears/05-login.jpg', caption: 'Accounts' },
      { src: '/work/gummybears/06-mobile.jpg', caption: 'Mobile', tall: true },
    ],
    mobile: {
      video: '/work/gummybears/mobile/scroll.mp4',
      shots: [
        { src: '/work/gummybears/mobile/02-tickets.jpg', caption: 'Tickets, and what is left', tall: true },
        { src: '/work/gummybears/mobile/03-rules.jpg', caption: 'Where, and the house rules', tall: true },
        { src: '/work/gummybears/mobile/04-archive.jpg', caption: 'Everything already done', tall: true },
        { src: '/work/gummybears/mobile/05-login.jpg', caption: 'Accounts', tall: true },
        // The mirror of the desktop set's phone shot: on a phone, the odd one
        // out is the desktop layout.
        { src: '/work/gummybears/cover.jpg', caption: 'Desktop' },
      ],
    },
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
  {
    slug: 'restless',
    title: 'Restless Coffee House & Bakery',
    summary:
      'A coffee house in Maadi, with its whole 254-item menu, an order builder that ' +
      'hands off to WhatsApp, and an English/Arabic toggle that flips the page.',
    year: '2026',
    kind: 'Coffee house website',
    role: ['Structure', 'Design', 'Frontend'],
    stack: ['HTML', 'CSS', 'JavaScript', 'JSON', 'GitHub Pages'],
    liveUrl: 'https://omarashraf-z.github.io/restless.claude/',
    repoUrl: 'https://github.com/omarashraf-z/restless.claude',
    embed: true,
    cover: '/work/restless/cover.jpg',
    video: '/work/restless/scroll.mp4',
    shots: [
      { src: '/work/restless/01-menu.jpg', caption: 'The menu, set with dotted leaders', wide: true },
      { src: '/work/restless/02-order.jpg', caption: 'Checkout, before WhatsApp' },
      { src: '/work/restless/04-arabic.jpg', caption: 'Arabic, right to left' },
      { src: '/work/restless/03-visit.jpg', caption: 'Hours and directions' },
      { src: '/work/restless/05-mobile.jpg', caption: 'Mobile', tall: true },
    ],
    mobile: {
      video: '/work/restless/mobile/scroll.mp4',
      shots: [
        { src: '/work/restless/mobile/01-menu.jpg', caption: 'The menu, set with dotted leaders', tall: true },
        { src: '/work/restless/mobile/02-order.jpg', caption: 'Checkout, before WhatsApp', tall: true },
        { src: '/work/restless/mobile/04-arabic.jpg', caption: 'Arabic, right to left', tall: true },
        { src: '/work/restless/mobile/03-visit.jpg', caption: 'Hours and directions', tall: true },
        { src: '/work/restless/cover.jpg', caption: 'Desktop' },
      ],
    },
    body: [
      'A coffee house and bakery in Degla, Maadi, whose customers nearly all arrive from ' +
        'a link in an Instagram bio, on mobile data. So the site is plain HTML, CSS and one ' +
        'JavaScript file — no framework, no build step, nothing to break a year from now, ' +
        'and hosted free on GitHub Pages with the domain as the only running cost.',
      'Nothing about the business is written into the code. The address, phone numbers, ' +
        'opening hours, all 254 menu items and every line of interface text live in three ' +
        'JSON files, so a price change is one edit and a commit. The open/closed badge on ' +
        'every page is computed from those hours in Cairo time, and shifts that run past ' +
        'midnight are handled rather than assumed away.',
      'Every priced item carries a quantity control, and what a visitor picks collects into ' +
        'a basket that survives moving between pages. Checkout takes their name, phone and ' +
        'address, then writes the whole order into a WhatsApp message — no server, no ' +
        'payment provider, no monthly cost. The basket stores each line with its own name ' +
        'and price rather than a pointer into the menu, so editing a price later can never ' +
        'silently rewrite somebody\'s open order.',
      'The English/Arabic toggle sets dir="rtl" and mirrors the whole layout, remembers the ' +
        'choice, and gives an Arabic browser Arabic on the first visit. Interface text, page ' +
        'copy and menu section names are translated; the 254 item names deliberately are not, ' +
        'since machine-translating them would put mistakes next to real prices.',
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
  if (count < 2) return { prev: undefined, next: undefined }

  const prev = projects[(i - 1 + count) % count]
  const next = projects[(i + 1) % count]

  // With exactly two projects both sides wrap to the same one, and offering
  // it twice reads as a mistake. Keep the forward link only.
  return prev.slug === next.slug ? { prev: undefined, next } : { prev, next }
}
