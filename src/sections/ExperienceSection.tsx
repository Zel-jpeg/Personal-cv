export default function ExperienceSection() {
  return (
    <section
      className="cv-section reveal"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <h2 id="experience-title">Development experience</h2>
      </div>
      <p className="section-intro">Academic and project-based experience</p>

      <article className="experience-entry">
        <div className="entry-top">
          <h3>Web systems &amp; full-stack development</h3>
          <span className="type-label">Project-based</span>
        </div>
        <ul className="experience-points">
          <li>
            Developed web-based applications for car rentals, budgeting, student
            task management, and point-of-sale workflows.
          </li>
          <li>
            Worked on Sakyan, a centralized car rental platform, alongside
            Financify, DoneeIt, Golden Car Rental, and Verde POS.
          </li>
          <li>
            Combined interface design with backend logic to address practical
            user needs.
          </li>
        </ul>
      </article>
      <article className="experience-entry">
        <div className="entry-top">
          <h3>Capstone development</h3>
          <span className="type-label">Academic</span>
        </div>
        <ul className="experience-points">
          <li>Worked on SkillBridge, a capstone OJT recommendation system.</li>
          <li>
            Applied software development concepts to a school project focused on
            internship recommendations.
          </li>
        </ul>
      </article>
      <article className="experience-entry">
        <div className="entry-top">
          <h3>UI/UX design &amp; prototyping</h3>
          <span className="type-label">Academic / Project-based</span>
        </div>
        <ul className="experience-points">
          <li>Created a Figma UI/UX prototype for the Sakyan platform.</li>
          <li>
            Designed a PhilHealth website redesign prototype for an HCI
            assignment, focusing on clear and intuitive interfaces.
          </li>
        </ul>
      </article>
    </section>
  );
}
