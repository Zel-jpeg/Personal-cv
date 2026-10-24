export default function ExperienceSection() {
  return (
    <section
      className="cv-section reveal"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <h2 id="experience-title">Experience</h2>
      </div>
      <p className="section-intro">
        Academic, project-based, and training experience
      </p>

      <article className="experience-entry">
        <div className="entry-top">
          <h3>Lead research &amp; website development</h3>
          <span className="type-label">Training</span>
        </div>
        <ul className="experience-points">
          <li>
            Completed nearly one month of training researching US-based
            companies and creating lead lists for website development services.
          </li>
          <li>
            Checked website availability, identified potential improvements, and
            recorded findings to support the team&apos;s cold-email outreach and
            follow-up conversations with prospective clients.
          </li>
          <li>
            Built BG Salon as a practical training project for a business
            needing a new or improved website, showcasing salon services and
            contact information.
          </li>
        </ul>
      </article>

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
