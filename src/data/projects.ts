import skillbridge from '../assets/projects/skillbridge.webp';
import sakyan from '../assets/projects/sakyan.webp';
import verde from '../assets/projects/verde.webp';

export type Project = {
  name: string;
  category: string;
  description: string;
  image?: string;
  technologies: string[];
  repository: string;
  demo?: string;
};

// Links and descriptions verified against Zel-jpeg's public repositories and portfolio.
// Technology tags are limited to confirmed repository languages or local dependencies.
export const projects: Project[] = [
  {
    name: 'SkillBridge',
    category: 'Capstone project',
    description:
      'An OJT recommendation system connecting academic development with internship opportunities.',
    image: skillbridge,
    technologies: ['Python'],
    repository: 'https://github.com/Zel-jpeg/SkillBridge',
    demo: 'https://skill-bridge-six-psi.vercel.app/',
  },
  {
    name: 'Sakyan',
    category: 'Car rental platform',
    description:
      'A centralized car rental platform that brings vehicle discovery and rental journeys into one place.',
    image: sakyan,
    technologies: ['Dart'],
    repository: 'https://github.com/Zel-jpeg/lakbaytech-sakyan',
    demo: 'https://lakbaytech-sakyan.vercel.app/',
  },
  {
    name: 'Verde Café Kiosk',
    category: 'Interactive ordering',
    description:
      'A self-service café kiosk with menu browsing, order review, simulated payments, and digital receipts.',
    image: verde,
    technologies: ['TypeScript', 'React', 'Vite'],
    repository: 'https://github.com/Zel-jpeg/verde-cafe-kiosk',
    demo: 'https://verde-cafe-kiosk.vercel.app/',
  },
  {
    name: 'DoneeIt',
    category: 'Student productivity',
    description: 'A student task management app for organizing academic work.',
    technologies: ['Dart'],
    repository: 'https://github.com/Zel-jpeg/DoneeIt',
  },
  {
    name: 'Financify',
    category: 'Personal finance',
    description:
      'A budgeting application built as part of my development journey.',
    technologies: ['Dart'],
    repository: 'https://github.com/Zel-jpeg/Financify',
  },
];

// Featured order is independent of the complete project archive.
export const featuredProjects = ['Verde Café Kiosk', 'SkillBridge', 'Sakyan']
  .map((name) => projects.find((project) => project.name === name))
  .filter((project): project is Project => project !== undefined);
