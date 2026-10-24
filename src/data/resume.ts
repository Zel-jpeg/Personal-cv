import { education, introduction, professionalTitle, skillGroups } from './cv';
import { experiences } from './experience';
import { projects } from './projects';
import { certifications, certificateDate } from './certifications';
import { contactEmail, contactPhone } from './personal';

// The PDF generator reads only these approved public fields, never private files.
export const resume = {
  name: 'Azel M. Villanueva',
  title: professionalTitle,
  location: 'Davao City, Philippines',
  email: contactEmail,
  phone: contactPhone,
  website: 'https://zeelll.vercel.app',
  github: 'https://github.com/Zel-jpeg',
  summary: introduction.join(' '),
  experiences,
  education: education.map(({ school, program }) => ({ school, program })),
  projects: [
    'SkillBridge',
    'Sakyan',
    'Verde Café Kiosk',
    'Financify',
    'DoneeIt',
  ].map((name) => {
    const project = projects.find((entry) => entry.name === name);
    if (!project) throw new Error(`Missing resume project: ${name}`);
    return {
      name: project.name,
      category: project.category,
      description: project.description,
      technologies: project.technologies,
      repository: project.repository,
    };
  }),
  skillGroups,
  certifications: certifications.map(({ title, issuer, date }) => ({
    title,
    issuer,
    date: certificateDate(date),
  })),
};
