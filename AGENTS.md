# CV portfolio development preferences

- Work in this `CV-Portfolio` copy. Preserve the original sibling `CV` project.
- Use React, Vite, TypeScript, and custom CSS.
- The user has chosen these resources for future design and component development:
  - React Bits: https://reactbits.dev
  - Origin Kit: https://originkit.dev
- Consult these resources when planning and implementing the portfolio's design, components, animations, and interactions. Check current documentation, compatibility, and any component dependencies before integration.
- Adapt selected components to the user's personal design and assignment requirements. Keep the implementation understandable, responsive, accessible, and respectful of reduced-motion preferences.
- This preference does not require installing every library or using every effect. Choose components that serve the CV's content and usability.

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
