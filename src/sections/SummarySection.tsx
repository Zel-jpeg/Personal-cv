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
          To grow as a software developer through internship and professional
          opportunities, applying my web development and UI/UX skills to useful,
          accessible applications.
        </p>
      </div>
    </section>
  );
}
