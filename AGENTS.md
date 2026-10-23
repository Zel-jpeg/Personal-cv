# CV portfolio development preferences

- Work in this `CV-Portfolio` copy. Preserve the original sibling `CV` project.
- Use React, Vite, TypeScript, and custom CSS.
- The user has chosen these resources for future design and component development:
  - React Bits: https://reactbits.dev
  - Origin Kit: https://originkit.dev
- Consult these resources when planning and implementing the portfolio's design, components, animations, and interactions. Check current documentation, compatibility, and any component dependencies before integration.
- Adapt selected components to the user's personal design and assignment requirements. Keep the implementation understandable, responsive, accessible, and respectful of reduced-motion preferences.
- This preference does not require installing every library or using every effect. Choose components that serve the CV's content and usability.
- Presentation reference chosen by the user: https://renlenon.vercel.app/. Adapt its project cards, expanding featured-work panels, technology rows, photo stack, contribution grid, and theme transition to this CV; retain the existing CV layout and folder organization.
- Project data and previews belong in `src/data/projects.ts` and `src/assets/projects/`. Never invent project technologies or destination URLs.
- `src/data/personal.ts` contains temporary profile photos for the personal photo stack at the user's request. Replace these when the user supplies hobby photos; do not invent hobbies.
- Interaction components currently use custom CSS and browser APIs inspired by the references. Do not claim that the reference site's exact implementation or a library's source was used without verification.
- Header social icons link to GitHub and email. Do not add LinkedIn until the user asks for it and supplies a URL. The blue name check is decorative and should not imply third-party verification.
- Home-page “View all” and “Explore all projects” navigate to `/tech-stack` and `/projects`. Keep their full-content sections under `src/sections/`, reuse `DetailHeader`, and maintain the explicit Vercel rewrites when adding routes.
- Technology rows must loop seamlessly at all supported widths. Hovering a row pauses only that row; hovering a badge lifts and slightly enlarges it. Preserve reduced-motion behavior.
- Featured panels crop a fixed image canvas horizontally. Keep image height and scale steady while the panel widths animate; collapsed labels stay horizontal near the bottom.

## Required folder and file organization

Follow this structure for all future changes. Place new files in the appropriate existing folder instead of accumulating components or content in `App.tsx` or the repository root.

```text
src/
  assets/       Imported images, fonts, and other bundled assets
  components/   Reusable UI and layout components
  sections/     Individual CV sections and the profile header
  data/         Typed CV content and navigation data
  hooks/        Reusable React hooks and interaction logic
  styles/       Global styles and any shared stylesheets
  App.tsx       Page composition only
  main.tsx      React initialization and global stylesheet import
```

- Keep build configuration, package files, `index.html`, and project documentation at the repository root.
- Use PascalCase `.tsx` filenames for components and sections (for example, `Sidebar.tsx` and `EducationSection.tsx`).
- Use `use`-prefixed camelCase `.ts` filenames for hooks (for example, `useCV.ts`), and descriptive camelCase `.ts` filenames for data modules.
- Keep repeating CV entries in typed modules under `src/data/`; render them from section components with stable keys.
- Place reusable React Bits or Origin Kit components under `src/components/`. Keep section-specific composition under `src/sections/` and their styles under `src/styles/`.
- Use `public/` only if a future asset requires an unchanged public URL; imported assets belong in `src/assets/`.
- Keep files focused and avoid empty placeholder folders or unnecessary abstractions. Add a Projects section when implementing its actual content.
- Do not commit `node_modules/`, `dist/`, `.vercel/`, or local environment files.
- Update the README when the structure or development commands change.
- Use the repository's Prettier configuration. Run `npm run format:check` and `npm run build` before finishing code changes; address any failures.
