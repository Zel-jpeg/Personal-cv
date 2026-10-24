# Azel M. Villanueva - Personal Portfolio

A responsive CV and portfolio website presenting my development experience, projects, technical and professional skills, education, and certifications. Built for **IT 415 — Application Development and Emerging Technologies** at Davao del Norte State College.

[Live website](https://zeelll.vercel.app/) · [GitHub](https://github.com/Zel-jpeg) · [LinkedIn](https://www.linkedin.com/in/azel-villanueva-b81773446)

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available commands](#available-commands)
- [Project structure](#project-structure)
- [Pages](#pages)
- [Updating content](#updating-content)
- [Optional chat and contact setup](#optional-chat-and-contact-setup)
- [Deployment](#deployment)
- [Accessibility and performance](#accessibility-and-performance)
- [Outside the IDE photo plan](#outside-the-ide-photo-plan)
- [Credits](#credits)

## Features

- **Responsive CV:** profile, development experience, skills, community involvement, projects, certifications, education, and contact information.
- **Adaptive navigation:** desktop section navigation, a mobile burger menu, and a glass header that condenses to an AV monogram while scrolling.
- **Project showcase:** expanding featured panels, project cards with repository and demo links, and dedicated DoneeIt and Financify preview pages with screenshot galleries and APK links.
- **Skills:** independently scrolling technology rows, a full tech stack page, and professional skills covering problem solving, communication, teamwork, adaptability, and attention to detail.
- **Community gallery:** presentation, pitching, and Sakyan prototype photos in an animated masonry layout with a keyboard-accessible photo viewer. The events page includes ten coming-soon spaces for future photos.
- **Credentials and resume:** certification previews, a resume PDF opened by View Resume, and a print-friendly CV layout.
- **Personal touches:** an interactive Outside the IDE photo stack and a GitHub contribution calendar using real public activity.
- **Light and dark themes:** saved theme preferences and animated transitions where supported.
- **Chat with Zel:** prepared portfolio answers, optional server-side AI replies, and an in-place contact form.
- **Recovery screens:** custom not-found, offline, and error views, plus a connection notice and React error boundary.

## Tech stack

| Area                  | Tools                                                                    |
| --------------------- | ------------------------------------------------------------------------ |
| Interface             | React, TypeScript, React Router                                          |
| Styling and animation | Custom CSS, browser animation APIs                                       |
| Icons                 | Lucide React, React Icons                                                |
| Development and build | Vite, npm, Prettier                                                      |
| API and hosting       | Vercel Functions, Vercel                                                 |
| Optional integrations | Gemini, Groq, Formspree, Cloudflare Turnstile, Vercel BotID and Firewall |
| Resume generation     | Python and ReportLab; required only when regenerating the PDF            |

## Getting started

### Requirements

- **Node.js 22.18 or later** on the Node 22 release line, or Node.js 24.
- **npm**, included with Node.js.
- **Git** to clone the repository.

Python is optional. Regular development and production builds use the saved resume PDF.

### Installation

```sh
git clone https://github.com/Zel-jpeg/Personal-cv.git
cd Personal-cv
npm ci
npm run dev
```

Open the local URL printed by Vite. The portfolio runs without API credentials; external AI replies and contact submission require the optional configuration below.

### Production preview

```sh
npm run build
npm run preview
```

`npm run preview` serves the compiled frontend. It does not run the Vercel API; use `npm run dev` for local API development. Prepared chat answers remain available when the API is unavailable.

## Available commands

| Command                  | Purpose                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `npm run dev`            | Start Vite and the local chat API handler.                                                             |
| `npm run build`          | Check credentials, refresh public chat knowledge, type-check, build into `dist/`, and scan the output. |
| `npm run preview`        | Preview the static production build.                                                                   |
| `npm run typecheck`      | Check TypeScript without generating output.                                                            |
| `npm run format:check`   | Check repository formatting with Prettier.                                                             |
| `npm run format`         | Format the repository with Prettier.                                                                   |
| `npm run chat:knowledge` | Refresh the chat snapshot from selected public portfolio content.                                      |
| `npm run chat:test`      | Run chat, fallback, language, session, and protection tests.                                           |
| `npm run security:check` | Check for accidentally tracked or exposed credentials.                                                 |
| `npm run security:test`  | Test the credential checks.                                                                            |
| `npm run resume:build`   | Regenerate the resume PDF from the typed resume data.                                                  |

Development startup also runs the credential check and refreshes the chat knowledge snapshot. Automated tests use mocked providers and do not send emails or make AI requests.

## Project structure

```text
Personal-cv/
├── api/                    # Vercel function entry point
├── docs/                   # Detailed integration and deployment guides
├── public/                 # Development-only local certificate files (ignored)
├── scripts/                # Resume, chat knowledge, and credential utilities
├── server/                 # Chat API, provider integrations, protection, and tests
├── src/
│   ├── assets/             # WebP images, fonts, and the resume PDF
│   ├── components/         # Shared UI, navigation, galleries, and chat
│   ├── data/               # Typed portfolio content and generated chat knowledge
│   ├── hooks/              # Theme, navigation, animation, and layout logic
│   ├── sections/           # Homepage sections and detail-page content
│   ├── styles/             # Global and component stylesheets
│   ├── App.tsx             # Page composition and route selection
│   └── main.tsx            # Application initialization
├── index.html
├── package.json
├── vercel.json             # API configuration and explicit page rewrites
└── vite.config.ts          # Build configuration and local API integration
```

## Pages

| Route                        | Content                                        |
| ---------------------------- | ---------------------------------------------- |
| `/`                          | Main CV and portfolio                          |
| `/experience`                | Development experience timeline                |
| `/projects`                  | Project archive                                |
| `/projects/doneeit`          | DoneeIt screenshots and release links          |
| `/projects/financify`        | Financify screenshots and release links        |
| `/tech-stack`                | Full technology list                           |
| `/certifications`            | Credentials, previews, and supporting material |
| `/community`                 | Community activities and gallery preview       |
| `/events`                    | Event photo gallery                            |
| `/404`, `/offline`, `/error` | Status and recovery views                      |

Unknown paths display the not-found page. The offline view uses the browser's connectivity signal; the site does not provide a service worker or guarantee offline access on a first visit or reload.

## Updating content

Edit the typed data modules rather than placing content directly in `App.tsx`.

| Content                                                     | File                             |
| ----------------------------------------------------------- | -------------------------------- |
| Profile summary, education, and technology groups           | `src/data/cv.ts`                 |
| Social links, contact details, and personal photo stack     | `src/data/personal.ts`           |
| Development experience                                      | `src/data/experience.ts`         |
| Project metadata, language icons, screenshots, and releases | `src/data/projects.ts`           |
| Professional skills                                         | `src/data/professionalSkills.ts` |
| Certifications and preview metadata                         | `src/data/certifications.ts`     |
| Community activities and event photos                       | `src/data/community.ts`          |
| Resume content selection                                    | `src/data/resume.ts`             |
| Section navigation                                          | `src/data/navigation.ts`         |

### Images and certificates

Keep portfolio photos and screenshots in `src/assets/` as optimized WebP files. Gallery entries use lightweight previews and load larger images when the viewer opens. Preserve image dimensions, aspect ratios, alt text, and focal points when replacing assets.

Approved certificate previews and badges live in `src/assets/certifications/` and are included in production. Original certificate PDFs remain in ignored `public/local-certificates/` for local development only. Production builds exclude that directory; deployed entries offer a preview and a Request PDF contact link.

### Resume PDF

The View Resume action opens `src/assets/resume/azel-villanueva-resume.pdf` in a new tab. After updating resume content, install ReportLab and regenerate the saved PDF:

```sh
python -m pip install reportlab
npm run resume:build
```

Set `RESUME_PYTHON` if the generator needs a specific Python executable. Visually review both pages after regeneration. Normal builds use the saved PDF and require no Python installation.

## Optional chat and contact setup

Create an ignored `.env.local` beside `package.json` only when configuring integrations. No environment file or real credential is committed to this repository.

| Variable                       | Purpose                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------- |
| `GEMINI_API_KEY`               | Server-only Gemini credential.                                                  |
| `GROQ_API_KEY`                 | Server-only fallback provider credential.                                       |
| `CHAT_AI_ENABLED`              | Enables external AI only when set to `true`.                                    |
| `CHAT_FREE_TIER_CONFIRMED`     | Additional required opt-in after checking provider billing settings.            |
| `CHAT_ALLOWED_ORIGIN`          | Allowed deployed site origin.                                                   |
| `CHAT_PERSONAL_PROFILE`        | Optional private JSON configuration for approved personal FAQ answers.          |
| `FORMSPREE_LINK`               | Public form submission endpoint, supplied through server configuration.         |
| `FORMSPREE_TURNSTILE_SITE_KEY` | Public Turnstile widget identifier. Configure its matching secret in Formspree. |

Keep credentials and personal profile configuration server-side; never prefix them with `VITE_`. The form endpoint and Turnstile site key are intentionally public identifiers.

AI is disabled unless both opt-in flags are `true`. Public AI requests also require successful BotID Basic validation and the `zel-chat` firewall rule. Prepared answers remain available when AI is disabled or unavailable. Contact submission requires a configured Formspree endpoint and matching Turnstile verification.

Chat history is bounded and stored in tab-scoped `sessionStorage`. Contact drafts stay in memory and are excluded from that storage and AI requests. Closing a panel preserves the conversation; browser session restoration can retain tab data after a tab is reopened.

See [Chat with Zel: configuration and deployment](docs/chat-with-zel.md) for the full environment setup, personal FAQ schema, CAPTCHA settings, protection rules, and live verification steps. Account billing, deployed protection, and inbox delivery require separate verification; a successful frontend build does not confirm them.

## Deployment

The portfolio is configured for the existing [zeelll.vercel.app](https://zeelll.vercel.app/) deployment.

1. Connect the repository to Vercel, using the directory containing `package.json` as the project root.
2. Use the **Vite** preset, `npm run build` as the build command, and `dist` as the output directory.
3. Add any optional integration variables through Vercel's environment settings. Keep AI disabled until the protection and provider settings in the [chat guide](docs/chat-with-zel.md) are verified.
4. Deploy and check direct navigation to the detail pages, a nonexistent URL, both themes, and mobile navigation.

`vercel.json` explicitly rewrites supported frontend routes while keeping `/api/zel` separate. Add matching rewrites when introducing a new detail page. Vite also emits `dist/404.html` for unknown paths. A static host can serve the portfolio frontend, but the chat API requires a compatible server environment.

## Accessibility and performance

- Keyboard navigation, skip links, visible focus states, and accessible labels for icon-only controls.
- Escape dismissal, focus restoration, and keyboard navigation in menus and photo viewers.
- Reduced-motion alternatives for transitions and animations.
- Optimized WebP assets, reserved image space, lazy loading below the fold, and full-size gallery images loaded on demand.
- Fixed square GitHub calendar cells with internal scrolling on small screens and a 15-minute activity cache.
- Scroll restoration between pages and a floating Back to top control.

Before submitting changes, run:

```sh
npm run format:check
npm run build
```

For chat or credential-handling changes, also run:

```sh
npm run chat:test
npm run security:test
```

Review layout changes at 320, 390, 768, 1024, and 1440 pixels, in both themes, with keyboard navigation and reduced motion enabled.

## Outside the IDE photo plan

The current stack cycles through the profile portrait, Pitch Deck team photo, pitching group selfie, and Sakyan prototype team photo. Only the transition direction is randomized; the photo order stays fixed. Replace these through `src/data/personal.ts` when new personal photos are available.

A future set can include four or five real personal photos: a casual portrait, a campus moment, an outdoor memory, an actual hobby, and an optional candid with friends. Suggested order: portrait → campus → outdoors → hobby. These are ideas for future photos, not claims about current hobbies or activities.

## Credits

Created by **Azel M. Villanueva** for IT 415 at Davao del Norte State College.

The portfolio uses custom components and CSS adapted to its own content and layout. Icons are provided by Lucide React and React Icons.
