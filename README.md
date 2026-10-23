# Azel M. Villanueva — Personal CV Portfolio

A responsive personal CV website for IT 415, built with React, TypeScript, Vite, and custom CSS. It presents my profile, education, technical skills, academic development experience, certifications, and contact information.

## Student

- Name: Azel M. Villanueva
- Year and section: 4th Year, BSIT 4G
- Course: IT 415 — Application Development and Emerging Technologies
- GitHub profile: https://github.com/Zel-jpeg
- Live Vercel link: Pending deployment
- Dedicated repository link: https://github.com/Zel-jpeg/Personal-cv

## Run locally

Use Node.js 22.12+ or a compatible newer release (Node.js 24 is used for this setup).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. This React project runs through Vite; opening index.html directly is no longer the development workflow.

```sh
npm run typecheck
npm run build
npm run preview
```

The build checks TypeScript before generating the production website in `dist/`.

## Structure

```text
CV-Portfolio/
  assets/profile-zel.webp   Original profile photo
  src/
    App.tsx                CV section components and page layout
    hooks/useCV.ts         Typed theme state, active navigation, reveal effects
    navigation.ts          Typed section navigation data
    main.tsx               React entry point
    styles.css             Responsive styles, themes, and print layout
  index.html               Document metadata and React mount point
  vite.config.ts           Vite React plugin
  tsconfig.json            Strict TypeScript configuration
  ASSIGNMENT.md            Remaining assignment requirements
```

## Design resources for future development

Use [React Bits](https://reactbits.dev) and [Origin Kit](https://originkit.dev) as the chosen references for components, design, animations, and interactions. Adapt selected components to this CV, checking their documentation and dependencies before integration. This preference is also recorded in `AGENTS.md` for future coding sessions.

## Current features

- Light and dark themes with optional browser persistence
- Responsive section navigation and active section tracking
- Hover and scroll reveal effects with reduced-motion support
- Print action and print-specific layout
- Keyboard focus styles and skip link
- Original CV content and profile photo

React manages rendering and theme state. TypeScript checks data and component usage during development. Vite serves development files and produces the deployment build. Existing CSS and browser APIs handle animations; Motion and an icon package can be added when the design needs them.

## Vercel deployment

Create a dedicated GitHub repository for this folder and push meaningful commits as development progresses. Import that repository into Vercel using the Vite framework preset, build command `npm run build`, and output directory `dist`. If this folder is nested in the repository, select it as the Vercel Root Directory.

After deployment, replace the pending links above and verify the public website on mobile and desktop.

## Project history

This is an independent copy of the original `../CV` project. Its existing Git history was retained, and the old GitHub remote was removed. All new development belongs in this folder. The original project is unchanged.

This migration preserves the existing content and design as a starting point. A dedicated Projects section, career objective, final content review, and deployment remain on the assignment checklist. The inherited `personal-info.txt` has been cleaned up and is not used by the website.
