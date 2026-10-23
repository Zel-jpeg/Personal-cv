export default function ContactSection() {
  return (
    <section
      className="cv-section contact-section reveal"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section-heading">
        <h2 id="contact-title">Contact information</h2>
      </div>
      <dl className="contact-list">
        <div>
          <dt>Email</dt>
          <dd>
            <a href="mailto:villanueva.azel@dnsc.edu.ph">
              villanueva.azel@dnsc.edu.ph <span aria-hidden="true">↗</span>
            </a>
          </dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Davao City, Philippines</dd>
        </div>
        <div>
          <dt>GitHub</dt>
          <dd>
            <a
              href="https://github.com/Zel-jpeg"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Zel-jpeg <span aria-hidden="true">↗</span>
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
