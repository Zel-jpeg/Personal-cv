export default function CertificationsSection() {
  return (
    <section
      className="cv-section reveal"
      id="certifications"
      aria-labelledby="certifications-title"
    >
      <div className="section-heading">
        <h2 id="certifications-title">Certifications</h2>
      </div>
      <article className="certificate">
        <span className="certificate-icon" aria-hidden="true">
          <svg className="icon" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="5" />
            <path d="m8 12-1 9 5-3 5 3-1-9" />
          </svg>
        </span>
        <div>
          <h3>CCNA: Switching, Routing, and Wireless Essentials</h3>
          <p>Cisco Networking Academy</p>
        </div>
      </article>
      <article className="certificate">
        <span className="certificate-icon" aria-hidden="true">
          <svg className="icon" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="5" />
            <path d="m8 12-1 9 5-3 5 3-1-9" />
          </svg>
        </span>
        <div>
          <h3>CCNA: Introduction to Networks</h3>
          <p>Cisco Networking Academy</p>
        </div>
      </article>
    </section>
  );
}
