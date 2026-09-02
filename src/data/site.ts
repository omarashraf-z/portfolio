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
  whatsapp: '201121937248',
  /** Written into the chat for them, so the first message is never a blank box. */
  whatsappMessage: "Hi Omar — I found your portfolio and I'd like to talk about a website.",
  /** Written the way you would say it. Blank hides it. */
  phone: '',
  location: 'Cairo, Egypt',
  available: true,
  availableNote: 'Taking on freelance work',
  /**
   * Anything without a href is left out rather than rendered as a link that
   * goes nowhere — fill one in and it appears by itself.
   *
   * `contact: false` keeps one out of the contact page's marks while leaving
   * it in the footer. GitHub is where the work lives rather than a way to
   * reach him, so it sits with the credits.
   */
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/omar-gendy-1024bb433/', contact: true },
    { label: 'Instagram', href: 'https://www.instagram.com/omar_ashraf_z/', contact: true },
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

export interface Social {
  label: string
  href: string
  /** Whether it belongs among the contact page's marks. */
  contact: boolean
}

/* `as const` above pins these to literal types, which makes a false flag read
   as impossible rather than merely off. Widen them once, here. */
const allSocials: Social[] = site.socials.map((social) => ({
  label: social.label,
  href: social.href,
  contact: social.contact,
}))

/** The ones with somewhere to go. */
export const socials = allSocials.filter((social) => social.href.length > 0)

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
  whatsapp
    ? {
        label: 'WhatsApp',
        // ?text= opens the chat with the message already typed, ready to send.
        href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`,
        icon: 'whatsapp',
      }
    : null,
  phone && !whatsapp
    ? { label: 'Phone', href: `tel:${phone.replace(/[^+\d]/g, '')}`, icon: 'gmail' }
    : null,
  ...allSocials.map((social) =>
    social.href && social.contact
      ? { label: social.label, href: social.href, icon: social.label.toLowerCase() }
      : null,
  ),
]

export const channels: Channel[] = allChannels.filter(
  (channel): channel is Channel => channel !== null,
)
