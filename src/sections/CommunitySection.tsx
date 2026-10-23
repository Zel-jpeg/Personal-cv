import { Link } from 'react-router';
import { ChevronRight, Images } from 'lucide-react';

export default function CommunitySection() {
  return (
    <section
      className="cv-section community-overview reveal"
      id="community"
      aria-labelledby="community-title"
    >
      <div className="section-heading">
        <h2 id="community-title">
          Community &amp; involvement<span className="heading-dot">.</span>
        </h2>
      </div>
      <div className="community-overview-row">
        <div>
          <h3>Presenting ideas and bringing projects to life</h3>
          <p>
            Presentation and pitching moments, including the Sakyan website and
            mobile app prototype.
          </p>
        </div>
        <div className="community-overview-links">
          <Link className="text-link" to="/events">
            <Images size={14} /> Event photos
          </Link>
          <Link className="text-link" to="/community">
            Explore <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
