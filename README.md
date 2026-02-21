# AkomzyAi Consulting — Website

One-page marketing site for **AkomzyAi Consulting**.
Built with Next.js 16 (App Router), Tailwind CSS v4, and Framer Motion.

---

## Quick Start

```bash
# Install dependencies
npm install

# Development server with hot reload
npm run dev
# → http://localhost:3000

# Production build (type-check + static export)
npm run build

# Preview the production build locally
npm run start
```

> **Node 20+ required.** If you see a lockfile warning during install,
> delete any stray `package-lock.json` outside this project folder.

---

## Project Structure

```
akomzyai-website/
├── app/
│   ├── layout.tsx              ← Site-wide metadata, fonts, <html> wrapper
│   ├── page.tsx                ← Page composition + Organization JSON-LD
│   ├── globals.css             ← Brand tokens, keyframes, focus rings
│   ├── sitemap.ts              ← Auto-generates /sitemap.xml at build time
│   └── components/
│       ├── Navbar.tsx          ← Sticky nav, mobile overlay, active-section
│       ├── Hero.tsx            ← Full-viewport hero, parallax orbs
│       ├── ProblemSolution.tsx ← Pain points → bridge → outcomes
│       ├── Services.tsx        ← 6-pillar bento grid
│       ├── HowItWorks.tsx      ← 4-step timeline
│       ├── Results.tsx         ← Animated counters + testimonials
│       ├── TechMarquee.tsx     ← Infinite-scroll tech stack marquee
│       ├── CTASection.tsx      ← Calendly embed + contact form
│       ├── Footer.tsx          ← Links, socials, copyright
│       └── MotionProvider.tsx  ← Framer Motion reduced-motion config
└── public/
    ├── robots.txt
    └── images/                 ← Drop logo.png and og-image.png here
```

---

## Editing Copy

Every section's text lives in an **EDITABLE CONSTANTS** block at the top of
its component file. You never need to touch JSX layout to change words.

| Section | File | What to edit |
|---|---|---|
| Hero | `Hero.tsx` | `HEADLINE`, `SUBHEADLINE`, `TRUST` object |
| Pain points | `ProblemSolution.tsx` | `painPoints` array (4 items) |
| Bridge paragraph | `ProblemSolution.tsx` | `BRIDGE_HEADING`, `BRIDGE_BODY` |
| Outcome cards | `ProblemSolution.tsx` | `outcomes` array (3 items) |
| Services | `Services.tsx` | `services` array (6 items, title + description) |
| Process steps | `HowItWorks.tsx` | `steps` array (4 items, title + description + benefit) |
| Stats | `Results.tsx` | `stats` array (value, suffix, label, sub) |
| Testimonials | `Results.tsx` | `testimonials` array (quote, role, org) |
| Tech stack pills | `TechMarquee.tsx` | `tools` array |
| Nav links | `Navbar.tsx` | `navLinks` array |
| Footer one-liner | `Footer.tsx` | description paragraph |
| Site title & meta | `layout.tsx` | `metadata` export |
| Structured data | `page.tsx` | `orgJsonLd` object |

---

## Replace the Logo

The logo is currently a **text wordmark** (`Akomzy` + `Ai`).

To switch to an image:

1. Add your logo to `public/images/logo.png` (SVG works too).

2. In **`app/components/Navbar.tsx`**, replace the `<span>` wordmark block
   (~line 195) with:

   ```tsx
   import Image from 'next/image'

   <Image
     src="/images/logo.png"
     alt="AkomzyAi Consulting"
     width={140}
     height={36}
     priority
     className="h-9 w-auto"
   />
   ```

3. Repeat for **`app/components/Footer.tsx`** (the brand column),
   without `priority` (below the fold).

4. Update the `logo` field in `page.tsx` → `orgJsonLd`:
   ```ts
   logo: 'https://akomzyai.com/images/logo.png',
   ```

---

## Connect Calendly

Open `app/components/CTASection.tsx` and set the constant at the top:

```ts
const CALENDLY_URL = 'https://calendly.com/YOUR-USERNAME/discovery-call'
```

**Option A — Open in new tab (instant, no embed)**
Setting the URL above is enough. A button appears that opens Calendly externally.

**Option B — Full inline embed (recommended)**

1. Add `import Script from 'next/script'` at the top of `CTASection.tsx`.

2. Replace the placeholder `<div>` inside the Calendly card body with:
   ```tsx
   <div
     className="calendly-inline-widget"
     data-url={CALENDLY_URL}
     style={{ minWidth: '320px', height: '660px' }}
   />
   ```

3. Add just before the closing `</>` of the component return:
   ```tsx
   <Script
     src="https://assets.calendly.com/assets/external/widget.js"
     strategy="lazyOnload"
   />
   ```

---

## Connect the Contact Form

Uses **Formspree** (free tier: 50 submissions/month).

1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form → set the notification email to `hello@akomzyai.com`.
3. Copy the endpoint (e.g. `https://formspree.io/f/xrgjaklq`).
4. Open `app/components/CTASection.tsx` and paste it:
   ```ts
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
   ```

Built-in spam protection: honeypot field (`_gotcha`) checked both client-side
and by Formspree server-side. Success / error states with animated transitions.

---

## SEO Checklist Before Launch

- [ ] Confirm `metadataBase` URL in `layout.tsx` matches production domain
- [ ] Create `public/images/og-image.png` — 1200 × 630 px branded card
- [ ] Add `public/images/logo.png` and update Navbar + Footer (see above)
- [ ] Set `CALENDLY_URL` in `CTASection.tsx`
- [ ] Set `FORMSPREE_ENDPOINT` in `CTASection.tsx`
- [ ] Replace placeholder testimonials in `Results.tsx` with real quotes
- [ ] Update social `href="#"` links in `Footer.tsx` with real profile URLs
- [ ] Add Twitter handle to `layout.tsx` — uncomment `twitter.site` field
- [ ] Update `sameAs` in `page.tsx` → `orgJsonLd` with real social URLs
- [ ] Submit `https://akomzyai.com/sitemap.xml` to Google Search Console

---

## Deploy to Vercel

### One-click (recommended)

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import the repository — Vercel auto-detects Next.js. No config required.
4. Click **Deploy**.

Every subsequent `git push` to `main` triggers an automatic redeploy.

### Manual CLI

```bash
npm i -g vercel   # install once

vercel            # deploy to preview URL (follow prompts first time)
vercel --prod     # promote to production
```

### Custom Domain

1. Vercel Dashboard → Project → **Settings → Domains**
2. Add `akomzyai.com` and `www.akomzyai.com`
3. Point your DNS records as instructed (A record or CNAME at your registrar)
4. SSL is provisioned automatically

### Environment Variables

No env vars are required for the base site.
If you add server-side API routes later, set secrets in:
**Vercel Dashboard → Project → Settings → Environment Variables**

---

## Brand Token Reference

All colors are defined in `app/globals.css` under `:root` and `@theme inline`.
Do not introduce non-brand hex values anywhere in the codebase.

| Token | Hex | Used for |
|---|---|---|
| `--brand-teal` | `#276675` | Hero / section backgrounds |
| `--brand-teal-dark` | `#1B4F5C` | Services section bg |
| `--brand-teal-deeper` | `#0F3640` | Footer, CTA, nav on scroll |
| `--brand-mint` | `#96E6E5` | Buttons, icons, active links |
| `--brand-mint-bright` | `#A1F3ED` | Hover states, glows |
| `--brand-mint-muted` | `#6BC4C2` | Secondary labels, de-emphasis |
| `--brand-cream` | `#F5FEE3` | Headings on dark sections |
| `--brand-ivory` | `#FFFFFB` | Body text on dark sections |
| `--off-white` | `#F7F9F8` | Light section backgrounds |
| `--dark-text` | `#1A2E35` | Headings on light sections |
| `--muted-text` | `#5A7A82` | Body text on light sections |
