# Personal CV website — new assignment

## Working copy

This folder is an independent copy of `../CV`. The original project is preserved. Existing Git history is retained, and the old GitHub remote is disconnected so this copy can use a dedicated repository.

Run `npm run dev` and open Vite's local URL to view the current React website. Continue editing files in this folder for the new assignment.

## Content checklist

- [x] Full name, professional title, profile photo, and introduction
- [x] Location, email, personal description, and career interests
- [x] Add an explicit career objective
- [x] Education, degree, current year level, and previous school
- [x] Technical skills
- [x] Add confirmed professional skills: problem solving, communication, teamwork, adaptability, and attention to detail
- [x] Add a dedicated Projects section with descriptions and confirmed technologies
- [x] Add project previews, repository links, and live demos where available
- [x] Personal GitHub profile
- [ ] Add LinkedIn and public social accounts if available and desired
- [x] Certifications
- [x] Academic and project-based experience

Only publish verified personal information. Phone numbers and social accounts are optional. Do not invent achievements, employment, project technologies, or URLs.

## Design and functionality checklist

- [x] Existing styled layout, navigation, light/dark mode, print action, hover effects, and scroll animations
- [ ] Review the updated design for professional presentation and readability
- [ ] Test desktop, laptop, tablet, and mobile layouts after changes
- [ ] Verify navigation, theme toggle, printing, animations, and reduced-motion behavior
- [ ] Verify all images, contact actions, project links, and profile links
- [ ] Check keyboard navigation and visible focus states

## Repository and deployment checklist

- [x] Create a dedicated GitHub repository for this copy: https://github.com/Zel-jpeg/Personal-cv
- [x] Connect this folder to the new repository
- [ ] Make meaningful commits as the new work progresses; retained history belongs to the original project
- [ ] Update README with the final title, description, technologies, student name, and live Vercel link
- [x] Remove the unused inherited `personal-info.txt` conflict exercise
- [ ] Push the latest source code
- [ ] Import the repository into Vercel using the Vite preset, `npm run build`, and `dist` output
- [ ] Open the public deployment and repeat link, image, desktop, and mobile checks
- [ ] Submit the accessible Vercel link and GitHub repository link in the LMS

The dedicated GitHub repository is `Zel-jpeg/Personal-cv`. Vercel deployment is still pending. Push the latest source again after each subsequent update.

## Reference-inspired presentation

- Featured-work panels expand on hover, focus, and click.
- Verde is the first and initially expanded featured panel; panels and Outside the IDE photos use 1px borders, with direct click/tap activation for featured panels on phones. The phone name/social links sit beside the profile photo, and Print CV moves into the home burger menu.
- Explore all projects navigates to `/projects`, which lists all verified projects and shares the detail-page navigation and theme toggle.
- Project cards use the owner's screenshots, verified code/demo URLs, and confirmed technology icons. A neutral cursor-following spotlight and small lift adapt to both themes; screenshots zoom only when their own image area is hovered. Touch and reduced-motion preferences are respected.
- Home sections begin with Profile, Development experience, Technologies, and Professional skills. Education follows Certifications, and both navigation menus follow the rendered section order.
- Technology rows loop and pause on hover; View all opens `/tech-stack` with the complete skills list. Vercel rewrites support direct page visits and refreshes.
- Each technology loop measures its content and repeats it to fill the row continuously. Only the hovered row pauses, while the hovered badge lifts and scales slightly.
- Header social links show GitHub and email only; LinkedIn is intentionally omitted at the owner's request. The blue name check is a decorative design element.
- Featured-work images keep a stable canvas and height while panels crop horizontally; collapsed titles sit at the bottom horizontally.
- A diagonal View Transition animates theme changes in supported browsers; reduced-motion and unsupported browsers switch directly.
- The personal photo stack uses the profile image temporarily as requested. Edit `src/data/personal.ts` when personal photos and hobbies are ready.
- GitHub activity loads public contributions for Zel-jpeg from the GitHub Contributions API by Jo Gruber. The section links to GitHub if the service fails or times out.
- React Router keeps internal navigation in the same application; a brief CSS fade and Back/Forward scroll restoration smooth page changes. GitHub results are cached in memory and sessionStorage for 15 minutes. Images use the browser's normal asset cache, not sessionStorage.
- Portfolio and local-only certificate images use WebP. The initial profile/project images total about 229 KB. The owner-supplied event photos use roughly 248 KB of gallery previews, with larger images loaded only when opened. Gallery entrances establish the hidden state before paint and wait for image readiness before staggered upward reveals.
- The activity section uses the shared card styling, with its heading inside and the January–December calendar centered beneath it. The total aligns with the calendar's left edge. Cells stay square at a fixed size, with horizontal scrolling inside the card on phones. It uses current-year data and weekday alignment. General UI accents are neutral; featured borders are black. Green intensity remains only in the GitHub grid.
- The desktop profile's existing name and CV/theme controls form one sticky row that condenses into a glass bar with AV branding. The same controls remain mounted throughout scrolling; mobile retains its burger navigation. The GitHub profile summary is removed, and calendar cells use 12px squares with 3px gaps to fill more of the card without distortion.
- Certifications use verified dates. The owner's local development copy shows PDF previews and supporting documents. The owner declined public upload of PDFs, previews, and badges: these stay in ignored `public/local-certificates/`, and production builds omit them. Public entries show an available-on-request email link. Duplicate SRWE PDFs are included only once. Local preview dialogs support close buttons, Escape, and backdrop dismissal.
- Home and detail pages use burger navigation at widths of 850px and below, with link-selection, outside-click, and Escape dismissal.
- The community overview opens `/community`, with filters for presentations/pitching and prototype demos, plus links to `/events`. Five unique owner-supplied photos show pitching and the Sakyan website/mobile app prototype presentation; the duplicate upload is omitted. At the owner's request, ten temporary nature photos fill the remaining slots for a total of 15 cards. Local WebP previews add about 245 KB; larger versions load only in the viewer. Stock photo credits and replacement metadata are recorded in `src/data/gallerySampleCredits.json` and `gallerySamples.ts`.
- The Events gallery adapts the reference's shortest-column masonry layout, varied card heights, narrow gaps, soft shadows, and rounded corners. Cards rise from below the viewport with a staggered fade and blur, including cached revisits; resizing smoothly reflows 5/4/3/2 columns. Stable outer reveal targets prevent the entrance transform from interfering with visibility detection. Reduced-motion preferences bypass entrance effects. The viewer retains previous/next wrapping, arrow keys, Escape/backdrop dismissal, scroll locking, and focus restoration. Event dates and formal names remain omitted because they have not been supplied.
- Desktop, 390px phone, and 768px tablet layouts have been visually reviewed locally. The public deployment still needs final verification.
