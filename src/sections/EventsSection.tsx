import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import EventGallery from '../components/EventGallery';

export default function EventsSection() {
  useEffect(() => {
    document.title = 'Events — Azel M. Villanueva';
    return () => {
      document.title = 'Azel M. Villanueva - Personal CV';
    };
  }, []);
  return (
    <main className="tech-stack-page events-page" id="main-content">
      <a className="text-link back-link" href="/community">
        <ArrowLeft size={15} /> Back to community
      </a>
      <header className="tech-page-intro">
        <h1>
          Events<span className="heading-dot">.</span>
        </h1>
        <p>
          A collection of photos, shared experiences, and moments outside the
          IDE.
        </p>
      </header>
      <p className="sample-notice">
        Temporary gallery images · Your event photos will replace these samples.
      </p>
      <EventGallery />
    </main>
  );
}
