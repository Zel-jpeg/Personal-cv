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
    </section>
  );
}
