import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { experiences } from '../data/experience';
import ExperienceTimeline from '../components/ExperienceTimeline';

export default function ExperienceSection() {
  return (
    <section
      className="cv-section experience-section reveal"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <h2 id="experience-title">Experience</h2>
        <Link className="text-link experience-details-link" to="/experience">
          View details <ChevronRight size={14} />
        </Link>
      </div>
      <ul className="experience-overview" role="list">
        {experiences.map((experience) => (
          <li key={experience.id}>
            <div className="experience-overview-label">
              <span>{experience.category}</span>
              {experience.duration && <span>{experience.duration}</span>}
            </div>
            <div className="experience-overview-copy">
              <h3>{experience.title}</h3>
              <p className="experience-context">{experience.context}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="experience-print-details">
        <ExperienceTimeline headingLevel={3} />
      </div>
    </section>
  );
}
