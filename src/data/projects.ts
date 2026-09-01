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
  /** The scroll-through screen recording. The centrepiece of a project page. */
  scrollVideo?: string
  /** Page screenshots, in the order you want them read. */
  shots?: Shot[]
  /** A paragraph or two on the project page. */
  body?: string[]
  /** Show on the home page. Keep this to three. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    summary: 'Placeholder — replace with the first site you want clients to see.',
    year: '2025',
    kind: 'Placeholder',
    role: ['Design', 'Frontend'],
    stack: ['React', 'TypeScript', 'Vite'],
    liveUrl: 'https://example.com',
    embed: false,
    cover: '/work/project-one/cover.jpg',
    scrollVideo: '/work/project-one/scroll.mp4',
    shots: [
      { src: '/work/project-one/01-home.jpg', caption: 'Home', wide: true },
      { src: '/work/project-one/02-detail.jpg', caption: 'Product detail' },
      { src: '/work/project-one/03-mobile.jpg', caption: 'Mobile' },
    ],
    body: [
      'Two or three sentences on what the client needed and what you built. ' +
        'Keep it concrete — what was the problem, what did you decide, what changed.',
      'A second paragraph for anything worth calling out: a performance number, ' +
        'a tricky interaction, a constraint you worked around.',
    ],
    featured: true,
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    summary: 'Placeholder — a second piece of work.',
    year: '2025',
    kind: 'Placeholder',
    role: ['Frontend'],
    stack: ['Next.js', 'Tailwind'],
    liveUrl: 'https://example.com',
    embed: false,
    cover: '/work/project-two/cover.jpg',
    scrollVideo: '/work/project-two/scroll.mp4',
    shots: [
      { src: '/work/project-two/01-home.jpg', caption: 'Landing', wide: true },
      { src: '/work/project-two/02-about.jpg', caption: 'About' },
      { src: '/work/project-two/03-contact.jpg', caption: 'Contact' },
    ],
    body: ['What this project was and what you did on it.'],
    featured: true,
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    summary: 'Placeholder — a third piece of work.',
    year: '2024',
    kind: 'Placeholder',
    role: ['Design', 'Frontend', 'Deploy'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    embed: false,
    cover: '/work/project-three/cover.jpg',
    scrollVideo: '/work/project-three/scroll.mp4',
    shots: [{ src: '/work/project-three/01-home.jpg', caption: 'Home', wide: true }],
    body: ['What this project was and what you did on it.'],
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
