/**
 * Everything about you. Edit here, not in the components.
 */
export const site = {
  name: 'Omar Ashraf',
  role: 'Web Developer',
  /** The hero headline, one array entry per line. */
  headline: ['I build websites', 'you can actually', 'open and use.'],
  lede:
    'Front-end developer working in the space between design and engineering. ' +
    'Every project below is live — scroll the recording, then click into the real thing.',
  email: 'omarelgendy.20062000@gmail.com',
  location: 'Cairo, Egypt',
  available: true,
  availableNote: 'Taking on freelance work',
  socials: [
    { label: 'GitHub', href: 'https://github.com/omarashraf-z' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
  about: {
    intro:
      'I design and build small, fast websites for people who need one that works. ' +
      'Most of my work is front-end — turning a design into a site that loads quickly, ' +
      'reads well on a phone and does not fall apart six months later.',
    detail:
      'I care about the parts users feel but never name: how fast the first screen paints, ' +
      'whether the type holds up at 320px, whether a form tells you what went wrong. ' +
      'I work solo or alongside a designer, and I hand over code someone else can pick up.',
  },
  /** Rendered as rows on the About page. */
  services: [
    { label: 'Design', items: 'Layout, type, design systems, responsive behaviour' },
    { label: 'Build', items: 'React, TypeScript, Vite, semantic HTML, modern CSS' },
    { label: 'Ship', items: 'Performance, accessibility, SEO basics, deploys and hosting' },
    { label: 'After', items: 'Maintenance, content updates, analytics, small features' },
  ],
} as const
