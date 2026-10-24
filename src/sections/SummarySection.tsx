import { introduction } from '../data/cv';

export default function SummarySection() {
  return (
    <section
      className="cv-section reveal"
      id="summary"
      aria-labelledby="summary-title"
    >
      <div className="section-heading">
        <h2 id="summary-title">Profile</h2>
      </div>
      {introduction.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="career-objective">
        <h3>Career objective</h3>
        <p>
          To contribute to a software development team by building reliable,
          user-focused applications, applying full-stack development, UI/UX
          design, and practical problem-solving skills.
        </p>
      </div>
    </section>
  );
}
