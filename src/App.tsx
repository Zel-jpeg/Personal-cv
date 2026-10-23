import profilePhoto from '../assets/profile-zel.webp';
import { navigation } from './navigation';
import { useCV } from './hooks/useCV';

function SummarySection() {
  return (<section className="cv-section reveal" id="summary" aria-labelledby="summary-title">
          <div className="section-heading"><h2 id="summary-title">Profile</h2></div>
          <p>A fourth-year Bachelor of Science in Information Technology student at Davao del Norte State College with academic and project-based experience in web systems, full-stack applications, and UI/UX prototyping.</p>
          <p>Interested in software development, web development, UI/UX, and emerging technologies. Since beginning my coding journey in 2022, I have worked on car rental platforms, budgeting applications, and point-of-sale systems, bringing together intuitive interfaces and practical backend logic.</p>
        </section>);
}

function EducationSection() {
  return (<section className="cv-section reveal" id="education" aria-labelledby="education-title">
          <div className="section-heading"><h2 id="education-title">Education</h2></div>
          <div className="timeline">
            <article className="timeline-entry"><div className="entry-top"><h3>Davao del Norte State College</h3><span className="date-label">4th Year / Present</span></div><p className="entry-subtitle">Bachelor of Science in Information Technology</p><p className="entry-detail">Section: BSIT 4G</p></article>
            <article className="timeline-entry"><div className="entry-top"><h3>A.L. Navarro National High School</h3><span className="date-label">Completed</span></div><p className="entry-subtitle">High School Education</p></article>
          </div>
        </section>);
}

function SkillsSection() {
  return (<section className="cv-section reveal" id="skills" aria-labelledby="skills-title">
          <div className="section-heading"><h2 id="skills-title">Technical skills</h2></div>
          
          <div className="skill-group"><h3>Frontend</h3><ul className="skill-tags"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>React</li><li>Bootstrap</li><li>Tailwind CSS</li></ul></div>
          <div className="skill-group"><h3>Backend</h3><ul className="skill-tags"><li>Node.js</li><li>Python</li><li>Java</li><li>PHP</li><li>Django</li><li>Django REST Framework</li><li>Laravel</li></ul></div>
          <div className="skill-group"><h3>Database</h3><ul className="skill-tags"><li>PostgreSQL</li><li>MySQL</li></ul></div>
          <div className="skill-group"><h3>Tools</h3><ul className="skill-tags"><li>Git</li><li>GitHub</li><li>VS Code</li><li>Figma</li><li>Prettier</li></ul></div>
          <div className="skill-group"><h3>Security / Auth</h3><ul className="skill-tags"><li>OAuth2</li><li>JWT</li></ul></div>
        </section>);
}

function ExperienceSection() {
  return (<section className="cv-section reveal" id="experience" aria-labelledby="experience-title">
          <div className="section-heading"><h2 id="experience-title">Development experience</h2></div>
          <p className="section-intro">Academic and project-based experience</p>
          
          <article className="experience-entry"><div className="entry-top"><h3>Web systems &amp; full-stack development</h3><span className="type-label">Project-based</span></div><ul className="experience-points"><li>Developed web-based applications for car rentals, budgeting, student task management, and point-of-sale workflows.</li><li>Worked on Sakyan, a centralized car rental platform, alongside Financify, DoneeIt, Golden Car Rental, and Verde POS.</li><li>Combined interface design with backend logic to address practical user needs.</li></ul></article>
          <article className="experience-entry"><div className="entry-top"><h3>Capstone development</h3><span className="type-label">Academic</span></div><ul className="experience-points"><li>Worked on SkillBridge, a capstone OJT recommendation system.</li><li>Applied software development concepts to a school project focused on internship recommendations.</li></ul></article>
          <article className="experience-entry"><div className="entry-top"><h3>UI/UX design &amp; prototyping</h3><span className="type-label">Academic / Project-based</span></div><ul className="experience-points"><li>Created a Figma UI/UX prototype for the Sakyan platform.</li><li>Designed a PhilHealth website redesign prototype for an HCI assignment, focusing on clear and intuitive interfaces.</li></ul></article>
        </section>);
}

function CertificationsSection() {
  return (<section className="cv-section reveal" id="certifications" aria-labelledby="certifications-title">
          <div className="section-heading"><h2 id="certifications-title">Certifications</h2></div>
          <article className="certificate"><span className="certificate-icon" aria-hidden="true"><svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="m8 12-1 9 5-3 5 3-1-9"/></svg></span><div><h3>CCNA: Switching, Routing, and Wireless Essentials</h3><p>Cisco Networking Academy</p></div></article>
          <article className="certificate"><span className="certificate-icon" aria-hidden="true"><svg className="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="m8 12-1 9 5-3 5 3-1-9"/></svg></span><div><h3>CCNA: Introduction to Networks</h3><p>Cisco Networking Academy</p></div></article>
        </section>);
}

function ContactSection() {
  return (<section className="cv-section contact-section reveal" id="contact" aria-labelledby="contact-title">
          <div className="section-heading"><h2 id="contact-title">Contact information</h2></div>
          <dl className="contact-list">
            <div><dt>Email</dt><dd><a href="mailto:villanueva.azel@dnsc.edu.ph">villanueva.azel@dnsc.edu.ph <span aria-hidden="true">↗</span></a></dd></div>
            <div><dt>Location</dt><dd>Davao City, Philippines</dd></div>
            <div><dt>GitHub</dt><dd><a href="https://github.com/Zel-jpeg" target="_blank" rel="noopener noreferrer">github.com/Zel-jpeg <span aria-hidden="true">↗</span></a></dd></div>
          </dl>
        </section>);
}

export default function App() {
  const { theme, toggleTheme, activeSection, setActiveSection } = useCV();
  return (<>
  <a className="skip-link" href="#main-content">Skip to CV content</a>
<main className="cv-shell" id="main-content">
    
    <section className="profile-header reveal" id="profile" aria-labelledby="name">
      <img className="profile-photo" src={profilePhoto} alt="Portrait of Azel M. Villanueva" width="144" height="144" />
      <div className="toolbar">
        <button className="button button-quiet" id="print-cv" type="button" onClick={() => window.print()}><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V3h10v5M7 17H4V8h16v9h-3M7 14h10v7H7zM17 11h.01"/></svg><span>Print CV</span></button>
        <button className="theme-toggle" id="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'dark'} onClick={toggleTheme}>
          <svg className="icon sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
          <svg className="icon moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z"/></svg>
        </button>
      </div>
      <div className="profile-heading">
        <p className="eyebrow">CURRICULUM VITAE</p>
        <h1 id="name">Azel M. Villanueva<span className="name-dot">.</span></h1>
        <p className="professional-title">Aspiring Software Engineer <span aria-hidden="true">/</span> Web Developer <span aria-hidden="true">/</span> BSIT Student</p>
        <p className="location"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Davao City, Philippines</p>
        <div className="profile-actions">
          <a className="button button-primary" href="mailto:villanueva.azel@dnsc.edu.ph"><svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>Email me</a>
          <a className="button button-outline" href="https://github.com/Zel-jpeg" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <span className="student-tag">4th Year · BSIT 4G</span>
        </div>
      </div>
    </section>

    
    <div className="resume-layout">
      <aside className="sidebar">
        <nav className="section-nav" aria-label="CV sections">
          <p className="eyebrow">ON THIS CV</p>
          {navigation.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : undefined} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setActiveSection(item.id)}>
              <span>{String(index + 1).padStart(2, '0')}</span> {item.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-note"><span className="note-mark" aria-hidden="true">&lt;/&gt;</span><p>Software development,<br />thoughtful interfaces,<br />continuous learning.</p><span className="small-label">CODING SINCE 2022</span></div>
      </aside>

      <div className="resume-content">
        <SummarySection />

        <EducationSection />

        <SkillsSection />

        <ExperienceSection />

        <CertificationsSection />

        <ContactSection />
      </div>
    </div>
  </main>
  <footer className="footer"><span>© 2026 Azel M. Villanueva</span><span>Personal CV <span aria-hidden="true">/</span> IT 415</span></footer>
</>);
}
