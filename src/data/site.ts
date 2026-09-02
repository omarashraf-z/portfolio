/**
 * Everything about you. Edit here, not in the components.
 */
export const site = {
  name: 'Omar Ashraf',
  role: 'Web Developer',
  /** The hero headline, one array entry per line. */
  headline: ['Building websites', 'that work as hard', 'as you do.'],
  lede:
    'Front-end developer working in the space between design and engineering. ' +
    'Every project below is live — watch it run, then click into the real thing.',
  email: 'omarelgendy.20062000@gmail.com',
  /** Digits only, with the country code — e.g. '201234567890'. Blank hides it. */
  whatsapp: '',
  /** Written the way you would say it. Blank hides it. */
  phone: '',
  location: 'Cairo, Egypt',
  available: true,
  availableNote: 'Taking on freelance work',
  /**
   * Anything without a href is left out rather than rendered as a link that
   * goes nowhere — fill one in and it appears by itself.
   */
  socials: [
    { label: 'LinkedIn', href: '' },
    { label: 'Instagram', href: '' },
    { label: 'GitHub', href: 'https://github.com/omarashraf-z' },
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

/** The ones with somewhere to go. */
export const socials = site.socials.filter((social) => social.href.length > 0)

export interface Channel {
  /** Names the link for screen readers and on hover — never drawn as text. */
  label: string
  href: string
  /** Which brand mark stands for it. See components/BrandIcon.tsx. */
  icon: string
}

/**
 * Every way to reach Omar, for the contact page. Built from the fields above
 * rather than repeated, so there is one place to edit and nothing can drift.
 * Anything without a value is left out.
 */
// `as const` above pins these to their literal types, which makes an empty
// one read as impossible rather than merely absent. Widen them first.
const whatsapp: string = site.whatsapp
const phone: string = site.phone

const allChannels: (Channel | null)[] = [
  { label: 'Email', href: `mailto:${site.email}`, icon: 'gmail' },
  whatsapp ? { label: 'WhatsApp', href: `https://wa.me/${whatsapp}`, icon: 'whatsapp' } : null,
  phone && !whatsapp
    ? { label: 'Phone', href: `tel:${phone.replace(/[^+\d]/g, '')}`, icon: 'gmail' }
    : null,
  ...site.socials.map((social) =>
    social.href ? { label: social.label, href: social.href, icon: social.label.toLowerCase() } : null,
  ),
]

export const channels: Channel[] = allChannels.filter(
  (channel): channel is Channel => channel !== null,
)
