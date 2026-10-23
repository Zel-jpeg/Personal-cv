import { useState } from 'react';
import { skillGroups } from '../data/cv';
import TechBadge from '../components/TechBadge';

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
  const [expanded, setExpanded] = useState(false);
  return (
    <section
      className="cv-section reveal"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <h2 id="skills-title">
          Technologies<span className="heading-dot">.</span>
        </h2>
        <button
          className="text-link"
          type="button"
          aria-expanded={expanded}
          aria-controls="all-skills"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Show less −' : 'View all +'}
        </button>
      </div>
      <div className="technology-loops" aria-label="Technology highlights">
        {highlights.map((group) => (
          <div className="technology-window" key={group.category}>
            <div className="technology-track">
              <div>
                {group.skills.map((name) => (
                  <TechBadge key={name} name={name} />
                ))}
              </div>
              <div aria-hidden="true">
                {group.skills.map((name) => (
                  <TechBadge key={name} name={name} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="all-skills" hidden={!expanded} className="all-skills">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <div className="technology-list">
              {group.skills.map((name) => (
                <TechBadge key={name} name={name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
