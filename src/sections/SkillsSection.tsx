import { skillGroups } from '../data/cv';

export default function SkillsSection() {
  return (
    <section
      className="cv-section reveal"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <h2 id="skills-title">Technical skills</h2>
      </div>
      {skillGroups.map((group) => (
        <div className="skill-group" key={group.category}>
          <h3>{group.category}</h3>
          <ul className="skill-tags">
            {group.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
