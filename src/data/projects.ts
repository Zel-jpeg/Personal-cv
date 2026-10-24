import skillbridge from '../assets/projects/skillbridge.webp';
import sakyan from '../assets/projects/sakyan.webp';
import verde from '../assets/projects/verde.webp';
import bgSalon from '../assets/projects/bg-salon.webp';
import doneeitLogo from '../assets/projects/doneeit-logo.webp';
import financifyLogo from '../assets/projects/financify-logo.webp';

const doneeitAssets = import.meta.glob<string>(
  '../assets/projects/doneeit/*.webp',
  { eager: true, query: '?url', import: 'default' },
);

export const doneeitScreenshots = [
  'Personalized ID card introduction',
  'Course folders introduction',
  'Edit your student ID',
  'Home and to-do overview',
  'Create a new to-do',
  'Customize a to-do',
  'Ongoing tasks',
  'Courses overview',
  'Add a course',
  'Organized course folders',
  'Student profile',
  'App settings',
  'Completed tasks',
].map((caption, index) => {
  const file = `../assets/projects/doneeit/screen-${String(index + 1).padStart(2, '0')}`;
  return {
    id: `doneeit-screen-${index + 1}`,
    src: doneeitAssets[`${file}-preview.webp`],
    fullSrc: doneeitAssets[`${file}.webp`],
    caption,
    alt: `DoneeIt mobile app: ${caption.toLowerCase()}`,
    width: 432,
    height: 984,
  };
});

// Verified against the repository's public release assets on 2026-10-24.
export const doneeitRelease = {
  version: 'v1.0.0',
  size: '50.2 MB',
  download:
    'https://github.com/Zel-jpeg/DoneeIt/releases/download/v1.0.0/app-release.apk',
  url: 'https://github.com/Zel-jpeg/DoneeIt/releases/tag/v1.0.0',
};

export type Project = {
  name: string;
  category: string;
  description: string;
  image?: string;
  imageKind?: 'logo';
  logoScale?: number;
  languages: string[];
  technologies: string[];
  repository: string;
  demo?: string;
  details?: string;
};

// Links and descriptions verified against Zel-jpeg's public repositories and portfolio.
// Full language snapshots match GitHub's public /repos/{owner}/{repo}/languages response,
// checked 2026-10-24. Preserve its order; never display byte counts or percentages.
// Cards show one row of primary languages, frameworks, databases, and hosting.
export const projects: Project[] = [
  {
    name: 'SkillBridge',
    category: 'Capstone project',
    description:
      'An OJT recommendation system connecting academic development with internship opportunities.',
    image: skillbridge,
    technologies: [
      'React',
      'Python',
      'JavaScript',
      'CSS',
      'Supabase',
      'Vercel',
    ],
    languages: [
      'Python',
      'JavaScript',
      'Jupyter Notebook',
      'HTML',
      'CSS',
      'Procfile',
    ],
    repository: 'https://github.com/Zel-jpeg/SkillBridge',
    demo: 'https://skill-bridge-six-psi.vercel.app/',
  },
  {
    name: 'Sakyan',
    category: 'Car rental platform',
    description:
      'A centralized car rental platform that brings vehicle discovery and rental journeys into one place.',
    image: sakyan,
    technologies: [
      'React',
      'Dart',
      'JavaScript',
      'Python',
      'Supabase',
      'Vercel',
    ],
    languages: [
      'Dart',
      'JavaScript',
      'Python',
      'CSS',
      'HTML',
      'Swift',
      'Kotlin',
      'Procfile',
      'Objective-C',
    ],
    repository: 'https://github.com/Zel-jpeg/lakbaytech-sakyan',
    demo: 'https://lakbaytech-sakyan.vercel.app/',
  },
  {
    name: 'Verde Café Kiosk',
    category: 'Interactive ordering',
    description:
      'A self-service café kiosk with menu browsing, order review, simulated payments, and digital receipts.',
    image: verde,
    technologies: [
      'TypeScript',
      'PLpgSQL',
      'Python',
      'JavaScript',
      'Supabase',
      'Vercel',
    ],
    languages: ['TypeScript', 'PLpgSQL', 'Python', 'JavaScript', 'HTML'],
    repository: 'https://github.com/Zel-jpeg/verde-cafe-kiosk',
    demo: 'https://verde-cafe-kiosk.vercel.app/',
  },
  {
    name: 'BG Salon',
    category: 'Salon website',
    description:
      'A salon website showcasing services, styling work, client testimonials, and appointment contact information.',
    image: bgSalon,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    languages: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/Zel-jpeg/BG_salon',
    demo: 'https://bg-salon-eta.vercel.app/',
  },
  {
    name: 'DoneeIt',
    category: 'Student productivity',
    description: 'A student task management app for organizing academic work.',
    image: doneeitLogo,
    imageKind: 'logo',
    details: '/projects/doneeit',
    technologies: ['Dart', 'SQLite'],
    languages: [
      'Dart',
      'C++',
      'CMake',
      'Swift',
      'C',
      'HTML',
      'Kotlin',
      'Objective-C',
    ],
    repository: 'https://github.com/Zel-jpeg/DoneeIt',
  },
  {
    name: 'Financify',
    category: 'Personal finance',
    description:
      'A budgeting application built as part of my development journey.',
    image: financifyLogo,
    imageKind: 'logo',
    // Fill the rounded frame without the source logo's transparent margins.
    logoScale: 1.2,
    technologies: ['Dart', 'SQLite'],
    languages: [
      'Dart',
      'C++',
      'CMake',
      'Swift',
      'C',
      'HTML',
      'Kotlin',
      'Objective-C',
    ],
    repository: 'https://github.com/Zel-jpeg/Financify',
  },
];

// Featured order is independent of the complete project archive.
export const featuredProjects = ['Verde Café Kiosk', 'SkillBridge', 'Sakyan']
  .map((name) => projects.find((project) => project.name === name))
  .filter((project): project is Project => project !== undefined);
