// Verified CV content. Add new entries here instead of duplicating markup.
type SkillGroup = { category: string; skills: string[] };
type EducationEntry = {
  school: string;
  period: string;
  program: string;
  detail?: string;
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'Python',
      'Java',
      'PHP',
      'Django',
      'Django REST Framework',
      'Laravel',
    ],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MySQL'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Prettier'],
  },
  {
    category: 'Security / Auth',
    skills: ['OAuth2', 'JWT'],
  },
];

export const education: EducationEntry[] = [
  {
    school: 'Davao del Norte State College',
    period: '4th Year / Present',
    program: 'Bachelor of Science in Information Technology',
  },
];

export const introduction: string[] = [
  'A fourth-year Bachelor of Science in Information Technology student at Davao del Norte State College with academic and project-based experience in web systems, full-stack applications, and UI/UX prototyping.',
  'Interested in software development, web development, UI/UX, and emerging technologies. Since beginning my coding journey in 2022, I have worked on car rental platforms, budgeting applications, and point-of-sale systems, bringing together intuitive interfaces and practical backend logic.',
];
