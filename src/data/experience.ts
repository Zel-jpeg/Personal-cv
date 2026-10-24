export type Experience = {
  id: string;
  title: string;
  category: string;
  duration?: string;
  context: string;
  points: string[];
};

// Counts come from the named projects/prototypes below, not estimated impact.
// Only confirmed training and project work. Dates and employers are unknown.
export const experiences: Experience[] = [
  {
    id: 'lead-research',
    title: 'Lead research & website development',
    category: 'Training',
    duration: 'Nearly 1 month',
    context: '1 business website · US-based lead research · BG Salon',
    points: [
      'Completed nearly 1 month of training researching US-based companies and preparing lead lists for website development services.',
      "Checked website availability, identified potential improvements, and recorded findings to support the team's cold-email outreach and follow-up conversations with prospective clients.",
      'Built 1 business website, BG Salon, as a practical training project showcasing salon services and contact information.',
    ],
  },
  {
    id: 'full-stack',
    title: 'Web systems & full-stack development',
    category: 'Project-based',
    context:
      '5 applications · Car rentals, budgeting, task management & point of sale',
    points: [
      'Built and contributed to 5 applications across 4 workflow areas: car rentals, budgeting, task management, and point of sale.',
      'Projects include Sakyan, Financify, DoneeIt, Golden Car Rental, and Verde POS.',
      'Combined interface design with backend logic to address practical user needs.',
    ],
  },
  {
    id: 'capstone',
    title: 'Capstone development',
    category: 'Academic',
    context: '1 OJT recommendation system · SkillBridge',
    points: [
      'Contributed to 1 OJT recommendation system, SkillBridge, as a capstone project focused on internship opportunities.',
      'Applied software development concepts to internship recommendation workflows.',
    ],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX design & prototyping',
    category: 'Academic / Project-based',
    context: '2 UI/UX prototypes · Sakyan & PhilHealth',
    points: [
      'Created 2 UI/UX prototypes: the Sakyan platform in Figma and a PhilHealth website redesign for an HCI assignment.',
      'Focused both prototypes on clear, intuitive interfaces to communicate application concepts and support usability.',
    ],
  },
];
