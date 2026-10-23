import { SiGithub } from 'react-icons/si';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      className="cv-section contact-section reveal"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-intro">
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
        <h2 id="contact-title">
          Let's build something
          <br />
          <span>worth sharing.</span>
        </h2>
        <p>
          Interested in internship opportunities, software development, and
          collaborating on thoughtful web experiences.
        </p>
        <span className="contact-location">
          <MapPin size={14} /> Davao City, Philippines
        </span>
      </div>
      <div className="contact-actions">
        <a className="contact-card" href="mailto:villanueva.azel@dnsc.edu.ph">
          <span className="contact-card-icon">
            <Mail />
          </span>
          <span>
            <span className="small-label">START A CONVERSATION</span>
            <strong>Send me an email</strong>
            <span className="contact-address">villanueva.azel@dnsc.edu.ph</span>
          </span>
          <ArrowUpRight size={18} />
        </a>
        <a
          className="contact-card"
          href="https://github.com/Zel-jpeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="contact-card-icon">
            <SiGithub />
          </span>
          <span>
            <span className="small-label">FOLLOW THE WORK</span>
            <strong>Find me on GitHub</strong>
          </span>
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
