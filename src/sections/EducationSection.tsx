import { education } from '../data/cv';

export default function EducationSection() {
  return (
    <section
      className="cv-section reveal"
      id="education"
      aria-labelledby="education-title"
    >
      <div className="section-heading">
        <h2 id="education-title">Education</h2>
      </div>
      <div className="timeline">
        {education.map((entry) => (
          <article className="timeline-entry" key={entry.school}>
            <div className="entry-top">
              <h3>{entry.program}</h3>
              <span className="date-label">{entry.period}</span>
            </div>
            <p className="entry-subtitle">{entry.school}</p>
            {entry.detail && <p className="entry-detail">{entry.detail}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
