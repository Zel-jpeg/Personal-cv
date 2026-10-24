import skillbridge from '../assets/projects/skillbridge.webp';
import sakyan from '../assets/projects/sakyan.webp';
import verde from '../assets/projects/verde.webp';
import bgSalon from '../assets/projects/bg-salon.webp';

export type Project = {
  name: string;
  category: string;
  description: string;
  image?: string;
  languages: string[];
  repository: string;
  demo?: string;
};

// Links and descriptions verified against Zel-jpeg's public repositories and portfolio.
// Language icons match GitHub's public /repos/{owner}/{repo}/languages response,
// checked 2026-10-24. Preserve its order; never display byte counts or percentages.
export const projects: Project[] = [
  {
    name: 'SkillBridge',
    category: 'Capstone project',
    description:
      'An OJT recommendation system connecting academic development with internship opportunities.',
    image: skillbridge,
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
    languages: ['HTML', 'CSS', 'JavaScript'],
    repository: 'https://github.com/Zel-jpeg/BG_salon',
    demo: 'https://bg-salon-eta.vercel.app/',
  },
  {
    name: 'DoneeIt',
    category: 'Student productivity',
    description: 'A student task management app for organizing academic work.',
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
