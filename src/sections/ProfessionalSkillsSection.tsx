import {
  Lightbulb,
  MessagesSquare,
  Users,
  RefreshCw,
  ScanSearch,
  type LucideIcon,
} from 'lucide-react';
import { professionalSkills } from '../data/professionalSkills';

const skillIcons: Record<(typeof professionalSkills)[number], LucideIcon> = {
  'Problem solving': Lightbulb,
  Communication: MessagesSquare,
  Teamwork: Users,
  Adaptability: RefreshCw,
  'Attention to detail': ScanSearch,
};

export default function ProfessionalSkillsSection() {
  return (
    <section
      className="cv-section reveal"
      id="professional-skills"
      aria-labelledby="professional-skills-title"
    >
      <div className="section-heading">
        <h2 id="professional-skills-title">Professional skills</h2>
      </div>
      <ul className="professional-skills">
        {professionalSkills.map((skill) => {
          const Icon = skillIcons[skill];
          return (
            <li key={skill}>
              <Icon size={18} aria-hidden="true" />
              <span>{skill}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
