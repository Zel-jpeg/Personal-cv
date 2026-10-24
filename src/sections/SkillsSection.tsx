import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { skillGroups } from '../data/cv';
import TechnologyRow from '../components/TechnologyRow';
import ProfessionalSkillsSection from './ProfessionalSkillsSection';

const highlights = [
  skillGroups[0],
  skillGroups[1],
  {
    category: 'Database and tools',
    skills: [...skillGroups[2].skills, ...skillGroups[3].skills],
  },
];

// Seamless, hover-paused rows inspired by React Bits Logo Loop.
export default function SkillsSection() {
  return (
    <section
      className="cv-section reveal"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <h2 id="skills-title">Skills</h2>
      </div>
      <div className="section-heading skills-technologies-heading">
        <h3>Technologies</h3>
        <Link className="text-link" to="/tech-stack">
          View all <ChevronRight size={14} />
        </Link>
      </div>
      <div className="technology-loops" aria-label="Technology highlights">
        {highlights.map((group) => (
          <TechnologyRow
            key={group.category}
            label={group.category}
            skills={group.skills}
          />
        ))}
      </div>
      <ProfessionalSkillsSection />
    </section>
  );
}
