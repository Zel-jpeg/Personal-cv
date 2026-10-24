# Azel M. Villanueva — Personal CV Portfolio

A personal CV website showcasing my profile, education, technical and professional skills, academic development experience, and certifications. Created for IT 415 — Application Development and Emerging Technologies.

## Links

- **Live website:** [zeelll.vercel.app](https://zeelll.vercel.app/)
- **Source code:** [Personal-cv](https://github.com/Zel-jpeg/Personal-cv)
- **GitHub profile:** [Zel-jpeg](https://github.com/Zel-jpeg)

## Features

- Responsive layout for desktop, tablet, and mobile screens
- Burger navigation on mobile and tablet screens, with keyboard and Escape support
- Glass navbar on scroll, with a compact AV monogram, CV print control, and theme toggle
- Light and dark themes with saved preferences
- Section navigation with active section highlighting
- Hover effects and scroll animations with reduced-motion support
- Smooth internal page navigation with Back/Forward scroll restoration
- A floating Back to top button appears after 400px on home and detail pages, with smooth scrolling and reduced-motion support
- Optimized WebP images with asynchronous decoding and lazy loading
- Print-friendly CV layout
- Email and GitHub contact links
- Chat with Zel: first-person portfolio answers, optional Gemini → Groq fallback, and a separate email contact form with Formspree's hosted verification
- Expanding featured work panels and project cards with previews, code links, and demos
- Cursor-following project card spotlights in both themes, with image-only hover zoom
- Scrolling technology icons and a dedicated full tech stack page
- One Skills card with technology highlights above a professional skills paragraph covering problem solving, communication, teamwork, adaptability, and attention to detail
- Compact GitHub and email icon links beneath the profile name
- Dedicated projects archive with repository and live demo links
- Entire project cards open their preview or project destination, with independent Code and Visit site links
- Project cards show a single row of primary technology icons, including Supabase and SQLite where used
- DoneeIt mobile app preview at `/projects/doneeit`, with 13 expandable screenshots, a GitHub APK download, and a repository link
- Financify preview at `/projects/financify`, with four populated screens (dashboard, analytics, recipes, and currency conversion), a GitHub APK download, release details, and a repository link; both app pages reuse `src/sections/MobileProjectPreview.tsx`
- Community page featuring presentation/pitching and Sakyan prototype photos, with category filters, staggered gallery entrances, and full-screen photo browsing
- Lightweight gallery previews with larger WebP photos loaded when opened
- Certification overview and archive; supporting documents are available on request
- Diagonal light/dark theme transition in supported browsers
- Interactive Outside the IDE photo stack with the profile portrait and three presentation/pitching photos, keeping the photo sequence fixed while randomly choosing left/right motion with coordinated spring settling and no fading
- Public GitHub contribution grid with square cells and a 15-minute session cache with an unavailable-data fallback

## Outside the IDE photo plan

Saved for a future update: choose four or five real personal photos with variety:

- A relaxed, casual portrait.
- An everyday campus or student-life moment.
- An outdoor photo from a memorable trip, scenery, or a favorite place.
- A photo of a hobby the owner actually enjoys.
- An optional candid with friends.

Suggested sequence: portrait → campus → outdoors → hobby. Choose clear photos with the main subject near the center so they crop well in the stack. These are photo ideas, not confirmed hobbies or activities.

For now, at the owner's request, the stack uses the profile portrait plus three existing owner-supplied photos: the Pitch Deck team photo, a candid group selfie from pitching, and the Sakyan prototype team photo. Photos always cycle in this order: profile portrait → Pitch Deck team → pitching group selfie → Sakyan team → profile portrait. Only the left/right transition direction is random, allowing repeated or changing directions. The front photo grows to full size while photos receding behind it step down to 90%, 80%, and 70% scale. Transitions adapt to click cadence: 520ms for a normal click, accelerating toward 200ms for fast clicks. Clicks during a transition accelerate that same motion without queuing additional shuffles, so the stack stops after the active transition. Reduced motion changes the photo immediately. It reuses lightweight WebP previews and intentional focal points; the presentation photos remain available in Community. Replace these through `src/data/personal.ts` when personal photos are supplied. The four-to-five-photo plan above remains saved for that future update.

## Technologies

- React
- React Router
- TypeScript
- Vite
- Custom CSS
- Lucide React and React Icons

## Student

**Azel M. Villanueva**

4th Year · BSIT 4G

Davao del Norte State College

## Run locally

With Node.js 22.18+ (or Node.js 24 LTS) installed:

```sh
git clone https://github.com/Zel-jpeg/Personal-cv.git
cd Personal-cv
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Chat credentials, spam protection, and free usage

Store `GEMINI_API_KEY`, `GROQ_API_KEY`, and `FORMSPREE_LINK` in `.env.local` beside `package.json`. Use `.env.example` for the variable names. Local environment files are excluded from Git. Never prefix credentials with `VITE_`: Vite exposes those variables to the browser. For deployment, set private keys in Vercel's server environment variables.

`npm run security:check` checks environment naming, Git tracking, source files, and any existing production output for the configured credentials and common Gemini/Groq key formats. It prints presence only, never values, and makes no network requests. The check runs before `npm run dev` and `npm run build`, and production output is checked again after the build. `npm run security:test` verifies that accidental source, build, public-env, and browser-variable leaks are rejected. These checks are a guard against accidental disclosure, not a replacement for reviewing changes or rotating an exposed key.

The shared Vercel endpoint is `api/zel.ts`; request handling, provider calls, and production protection live under `server/`. Vite serves the same handler locally through `server/devPlugin.ts`. `ChatWidget` is mounted once in `main.tsx`, so navigation preserves the conversation and contact draft. Chat stays in memory rather than browser storage.

AI is off unless both `CHAT_AI_ENABLED=true` and `CHAT_FREE_TIER_CONFIRMED=true` are explicitly set. Prepared answers remain available without either flag. No provider calls are made by builds or automated tests. The server bounds requests, history, and output; validates origins; fixes provider/model choices; and checks Vercel BotID **Basic** and a shared firewall rule before public AI requests. Missing/failed protection never permits an unprotected AI call. Local-only rate limiting is used solely on loopback development URLs; deployed requests never use that bypass. Failed providers have per-instance cooldowns (an optimization, not a quota guarantee).

`npm run chat:knowledge` rebuilds `src/data/chatKnowledge.json` from the existing public portfolio modules. This runs before development and production builds. Only selected public text and project links enter the AI context; email fields, private certificate files, images, and contact drafts do not. Email/phone patterns in chat history are redacted before provider requests. AI instructions guide answers but cannot guarantee factual accuracy; responses are rendered as plain text and only locally verified links become buttons.

The contact form posts directly to the validated Formspree endpoint in a new tab to retain Formspree's hosted CAPTCHA. The visitor completes verification there. The widget keeps their draft and never claims a message was delivered just because a tab opened. Formspree receives the submitted email and message; AI providers do not. `FORMSPREE_LINK` is intentionally public, unlike the AI keys.

See [the implementation plan and deployment steps](docs/chat-with-zel.md). Run `npm run chat:test` for validation, fallback, privacy, and protection tests; run `npm run security:test` for credential-guard tests. `npm run dev` serves the local API. `npm run preview` serves static build output only and uses prepared answers if no API is available.

Account settings must also be checked before launch; a local API key cannot reveal or enforce the provider's billing plan:

- **Gemini:** use a project on the Free tier without a linked active paid billing account. A model with a free allowance can still incur charges when used through a paid project. [Billing documentation](https://ai.google.dev/gemini-api/docs/billing)
- **Groq:** remain on the Free tier; do not upgrade to the paid Developer tier. [Billing documentation](https://console.groq.com/docs/billing-faqs)
- **Formspree:** remain on Free (currently 50 submissions/month), keep spam protection/reCAPTCHA enabled, and restrict the form to the actual deployed domain. The form endpoint is a public submission address, not a secret: hiding it in an env file cannot prevent direct submissions. Domain restriction alone is not sufficient bot protection. [Plans](https://formspree.io/plans), [reCAPTCHA settings](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings), [domain restrictions](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain)
- **Vercel:** remain on Hobby for eligible personal, noncommercial use, with no paid add-ons. Exhausting free hosting limits can interrupt the feature. [Hobby plan](https://vercel.com/docs/plans/hobby)

Vercel's Basic BotID mode is explicitly selected on client and server; do not turn on paid Deep Analysis. Create the `zel-chat` firewall SDK rule before enabling public AI. Hobby currently includes one rate-limit rule. [BotID pricing](https://vercel.com/docs/botid#pricing), [rate-limit setup](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk)

The intended zero-cost behavior is to stop at free limits, never purchase capacity. Free allowances and terms can change. No public form can be guaranteed completely spam-free, and repository code cannot guarantee zero charges on accounts whose billing configuration has not been verified.

Private certificate files are excluded from Git and production builds. The owner's local development copy can display these files; a fresh clone shows certificate details with an available-on-request contact link.

To build and preview the production version:

```sh
npm run build
npm run preview
```
