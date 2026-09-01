/**
 * Capture a project's media straight from its live site.
 *
 *   npm i -D playwright @ffmpeg-installer/ffmpeg     (once)
 *   node tools/capture.mjs --url https://example.com --slug acme-store
 *
 * Writes into public/work/<slug>/:
 *   cover.jpg      the hero, 1600×1000
 *   01..N.jpg      evenly spaced screens down the page, 1600×1000
 *   mobile.jpg     390×844 viewport, 900 wide
 *   scroll.mp4     one steady top-to-bottom pass, H.264
 *   scroll.webm    the same pass as VP9, for browsers that prefer it
 *
 * Then add the paths to src/data/projects.ts. See ASSETS.md.
 */
import { chromium } from 'playwright'
import ffmpeg from '@ffmpeg-installer/ffmpeg'
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, i, all) => {
    if (arg.startsWith('--')) pairs.push([arg.slice(2), all[i + 1]])
    return pairs
  }, []),
)

const url = args.url
const slug = args.slug
const shots = Number(args.shots ?? 4)
const seconds = Number(args.seconds ?? 14)

if (!url || !slug) {
  console.error('Usage: node tools/capture.mjs --url <live url> --slug <project-slug>')
  process.exit(1)
}

const dest = join('public', 'work', slug)
const tmp = join(dest, '.tmp')
mkdirSync(tmp, { recursive: true })

const run = (input, output, filters, extra) =>
  execFileSync(ffmpeg.path, ['-hide_banner', '-loglevel', 'error', '-i', input,
    '-vf', filters, ...extra, output, '-y'])

const browser = await chromium.launch()

/* The scroll-through. Linear, because the portfolio maps scroll position
   straight onto the playhead — easing here would read as a speed change. */
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: tmp, size: { width: 1440, height: 900 } },
})
const rec = await context.newPage()
await rec.goto(url, { waitUntil: 'networkidle' })
await rec.evaluate(() => document.fonts.ready)
await rec.waitForTimeout(1500)

const lead = Date.now()
await rec.evaluate(async (ms) => {
  document.documentElement.style.scrollBehavior = 'auto'
  const distance = document.documentElement.scrollHeight - window.innerHeight
  const start = performance.now()
  await new Promise((resolve) => {
    const step = (now) => {
      const t = Math.min((now - start) / ms, 1)
      window.scrollTo(0, distance * t)
      t < 1 ? requestAnimationFrame(step) : resolve()
    }
    requestAnimationFrame(step)
  })
}, seconds * 1000)
await rec.waitForTimeout(400)
const trim = (lead - Date.now()) / 1000
await context.close()

/* Stills: the hero, then evenly spaced screens down the page. */
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1500)

const height = await page.evaluate(() => document.documentElement.scrollHeight)
const travel = Math.max(0, height - 900)

await page.screenshot({ path: join(tmp, 'cover.png') })
for (let i = 0; i < shots; i++) {
  await page.evaluate((y) => {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, y)
  }, Math.round((travel * i) / Math.max(shots - 1, 1)))
  await page.waitForTimeout(700)
  await page.screenshot({ path: join(tmp, `${String(i + 1).padStart(2, '0')}.png`) })
}
await page.close()

const phone = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
})
await phone.goto(url, { waitUntil: 'networkidle' })
await phone.evaluate(() => document.fonts.ready)
await phone.waitForTimeout(1500)
await phone.screenshot({ path: join(tmp, 'mobile.png') })
await phone.close()
await browser.close()

/* Encode. Dense keyframes (-g 15) are what make the video cheap to scrub. */
const webm = readdirSync(tmp).find((f) => f.endsWith('.webm'))
run(join(tmp, webm), join(dest, 'scroll.mp4'), 'scale=1440:-2,fps=30', [
  '-ss', String(Math.abs(trim)), '-t', String(seconds + 0.2),
  '-c:v', 'libx264', '-crf', '26', '-preset', 'slow',
  '-g', '15', '-keyint_min', '15', '-sc_threshold', '0',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
])
run(join(dest, 'scroll.mp4'), join(dest, 'scroll.webm'), 'scale=1440:-2', [
  '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0',
  '-g', '15', '-keyint_min', '15', '-deadline', 'good', '-cpu-used', '4',
  '-row-mt', '1', '-pix_fmt', 'yuv420p', '-an',
])

for (const file of readdirSync(tmp)) {
  if (!file.endsWith('.png')) continue
  const name = file.replace('.png', '.jpg')
  const size = file === 'mobile.png' ? 'scale=900:-2' : 'scale=1600:1000'
  run(join(tmp, file), join(dest, name), size, ['-q:v', '3'])
}

rmSync(tmp, { recursive: true, force: true })
console.log(`Captured into ${dest}. Add the paths to src/data/projects.ts.`)
