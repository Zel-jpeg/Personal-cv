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

export const professionalTitle =
  'Aspiring Software Engineer / Full-Stack Developer';

export const introduction: string[] = [
  'Full-stack developer with hands-on experience building web applications, mobile apps, and UI/UX prototypes. Project experience spans car rental platforms, budgeting applications, task management, and point-of-sale systems, combining clear interfaces with practical backend logic.',
  'Skilled in React, Python, Django, databases, and Figma. Seeking a software development role where I can contribute practical problem solving, thoughtful interface design, and reliable application features to a collaborative team.',
];
