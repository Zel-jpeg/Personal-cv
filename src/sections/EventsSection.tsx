import { Link } from 'react-router';
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
      <Link className="text-link back-link" to="/community">
        <ArrowLeft size={15} /> Back to community
      </Link>
      <header className="tech-page-intro">
        <h1>
          Events<span className="heading-dot">.</span>
        </h1>
        <p>
          Moments from presentations, pitching, and the Sakyan website and
          mobile app prototype showcase.
        </p>
      </header>
      <EventGallery comingSoon />
    </main>
  );
}
