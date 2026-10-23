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
          <h3>Learning, sharing, and building together</h3>
          <p>
            A growing collection of community activities and moments beyond the
            code.
          </p>
        </div>
        <div className="community-overview-links">
          <a className="text-link" href="/events">
            <Images size={14} /> Event photos
          </a>
          <a className="text-link" href="/community">
            Explore <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
