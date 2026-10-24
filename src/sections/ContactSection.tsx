import { SiGithub } from 'react-icons/si';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { contactEmail } from '../data/personal';

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
        <a
          className="contact-card contact-email-card"
          href={`mailto:${contactEmail}`}
        >
          <span className="contact-card-icon" aria-hidden="true">
            <Mail />
          </span>
          <span>
            <span className="small-label">EMAIL</span>
            <span className="contact-address">{contactEmail}</span>
          </span>
          <ArrowUpRight
            className="contact-card-arrow"
            size={18}
            aria-hidden="true"
          />
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
          <ArrowUpRight
            className="contact-card-arrow"
            size={18}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
