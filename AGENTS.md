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
- Keep the profile header free of the “CURRICULUM VITAE” eyebrow. Balance the larger profile photo, name, and proportional blue check. Social-link hover styling changes only icon color: GitHub dark in light mode (light in dark mode for contrast) and email red; no card background or movement.
- Every listed technology must have an appropriate icon mapping in `TechBadge.tsx`, including Java, VS Code, Django REST Framework, OAuth2, and JWT. Use the actual brand icon where available and a meaningful protocol symbol otherwise.
- Home-page “View all” and “Explore all projects” navigate to `/tech-stack` and `/projects`. Keep their full-content sections under `src/sections/`, reuse `DetailHeader`, and maintain the explicit Vercel rewrites when adding routes.
- Technology rows must loop seamlessly at all supported widths. Hovering a row pauses only that row; hovering a badge lifts and slightly enlarges it. Preserve reduced-motion behavior.
- Featured panels crop a fixed image canvas horizontally. Keep image height and scale steady while the panel widths animate; collapsed labels stay horizontal near the bottom.
- Use neutral black/gray UI accents in both themes; the owner explicitly rejected green navigation, tags, backgrounds, overlays, and borders. Featured panels must have black 1px borders, including the expanded panel. Keep Outside the IDE photo-stack borders at 1px too. Keep actual image/brand-logo colors; green is used only for GitHub contribution intensity.
- GitHub activity follows the reference's standalone heading and single dashed rounded card, Jan–Dec month labels, seven calendar-aligned rows, and a total below. Use real activity for the current calendar year (Asia/Manila), label the year accurately, and never copy the reference's counts.
- Verde Café Kiosk must be the first and initially expanded featured project on every device. Keep this order in `featuredProjects`, independent of the archive order. Featured panels have a 1px border and support direct click/tap, keyboard focus, and hover on mouse-capable devices.
- On phones, place the name and social icons beside the profile photo, with career details below. At burger-menu widths, hide the profile toolbar and put Print CV in the home burger menu; keep the desktop print control.
- Keep verified certificate metadata in `src/data/certifications.ts`. The owner explicitly chose to keep PDFs, rendered previews, and badges local: they live in ignored `public/local-certificates/`, are served only in local development, and must never enter Git history or production builds. Public certificate entries show “Available on request.” Do not publish these files without new explicit permission. The home overview links to `/certifications`; maintain its Vercel rewrite.
- List each distinct course once. Supplemental documents and badges belong to that course, and identical duplicate PDFs must not become extra credentials. Cisco Networking Academy course completion must not be presented as passing the separate CCNA certification exam.
- Certificate thumbnails open the shared native-dialog preview with keyboard dismissal; preserve original PDF links and verified completion dates. Add pagination only when enough distinct credentials warrant it.
- At widths of 850px and below, use the shared burger menu on home and detail pages; retain desktop sidebar/navigation above that breakpoint. Keep menu labels, expanded state, Escape dismissal, outside-click dismissal, link selection, and keyboard focus behavior accessible.
- Community navigation follows home overview → `/community` → `/events`. Keep community entries, categories, and gallery photo metadata in `src/data/community.ts`; replace the clearly labelled sample content only with owner-supplied details and photos. Do not invent attendance, speaking roles, event dates, or awards.
- Gallery imagery currently reuses existing profile and project assets as temporary samples. When real photos arrive, put them under `src/assets/community/` and update the data module. Do not publish private certificate files or use the reference site's personal photos as placeholders.
- Reuse `EventGallery`, `PhotoLightbox`, and `useScrollReveal`. Preserve staggered upward reveals, responsive masonry, reduced-motion support, click previews, previous/next wrapping, arrow-key navigation, Escape/backdrop dismissal, scroll locking, and focus restoration.
- Check home, projects, technologies, certifications, community, and events at 320px, 390px, 768px, 1024px, and 1440px when changing layouts. Keep page-wide overflow absent; contribution grids may scroll inside their own container.

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
