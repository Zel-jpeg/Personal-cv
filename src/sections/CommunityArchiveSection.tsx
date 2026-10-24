import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Images } from 'lucide-react';
import { communityCategories, communityEntries } from '../data/community';
import type { CommunityCategory } from '../data/community';
import EventGallery from '../components/EventGallery';

export default function CommunityArchiveSection() {
  const [filter, setFilter] = useState<CommunityCategory>('All');
  useEffect(() => {
    document.title = 'Community — Azel Villanueva';
    return () => {
      document.title = 'Azel Villanueva - Personal CV';
    };
  }, []);
  const entries = communityEntries.filter(
    (entry) => filter === 'All' || entry.category === filter,
  );
  return (
    <main className="tech-stack-page community-page" id="main-content">
      <Link className="text-link back-link" to="/#community">
        <ArrowLeft size={15} /> Back to home
      </Link>
      <header className="tech-page-intro">
        <h1>Community &amp; Involvement</h1>
        <p>
          Presentations, project demonstrations, and experiences shared with the
          team.
        </p>
        <Link
          className="button button-outline community-gallery-link"
          to="/events"
        >
          <Images size={15} /> Browse event photos <ArrowUpRight size={14} />
        </Link>
      </header>
      <div
        className="community-filters"
        role="group"
        aria-label="Filter community entries"
      >
        {communityCategories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="community-entry-list" aria-live="polite">
        {entries.map((entry) => (
          <article className="community-entry" key={entry.id}>
            <img
              src={entry.image}
              alt={entry.imageAlt}
              style={{ objectPosition: entry.imagePosition }}
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="eyebrow">{entry.category}</p>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
              <Link className="text-link" to="/events">
                Browse gallery <ArrowUpRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section
        className="community-gallery-section"
        aria-labelledby="community-gallery-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="community-gallery-title">Event Gallery</h2>
            <p>Photos from pitching and the Sakyan prototype presentation.</p>
          </div>
          <Link className="text-link" to="/events">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>
        <EventGallery preview />
      </section>
    </main>
  );
}
