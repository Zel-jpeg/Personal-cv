import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Images } from 'lucide-react';
import { communityCategories, communityEntries } from '../data/community';
import type { CommunityCategory } from '../data/community';
import EventGallery from '../components/EventGallery';

export default function CommunityArchiveSection() {
  const [filter, setFilter] = useState<CommunityCategory>('All');
  useEffect(() => {
    document.title = 'Community — Azel M. Villanueva';
    return () => {
      document.title = 'Azel M. Villanueva - Personal CV';
    };
  }, []);
  const entries = communityEntries.filter(
    (entry) => filter === 'All' || entry.category === filter,
  );
  return (
    <main className="tech-stack-page community-page" id="main-content">
      <a className="text-link back-link" href="/#community">
        <ArrowLeft size={15} /> Back to home
      </a>
      <header className="tech-page-intro">
        <h1>Community &amp; Involvement</h1>
        <p>
          A space for the people, experiences, and ideas that connect my work
          with the wider community.
        </p>
        <a
          className="button button-outline community-gallery-link"
          href="/events"
        >
          <Images size={15} /> Browse event photos <ArrowUpRight size={14} />
        </a>
      </header>
      <p className="sample-notice">
        Sample content · Event details and photos will be added soon.
      </p>
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
            <img src={entry.image} alt={`Sample image for ${entry.title}`} />
            <div>
              <p className="eyebrow">{entry.category} · Sample entry</p>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
              <a className="text-link" href="/events">
                Browse gallery <ArrowUpRight size={13} />
              </a>
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
            <p>Room for the moments between the milestones.</p>
          </div>
          <a className="text-link" href="/events">
            View all <ArrowUpRight size={14} />
          </a>
        </div>
        <EventGallery preview />
      </section>
    </main>
  );
}
