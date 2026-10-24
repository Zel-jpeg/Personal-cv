import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import ExperienceTimeline from '../components/ExperienceTimeline';

export default function ExperienceArchiveSection() {
  useEffect(() => {
    document.title = 'Experience — Azel Villanueva';
    return () => {
      document.title = 'Azel Villanueva - Personal CV';
    };
  }, []);

  return (
    <main className="tech-stack-page experience-page" id="main-content">
      <Link className="text-link back-link" to="/#experience">
        <ArrowLeft size={15} /> Back to home
      </Link>
      <header className="tech-page-intro">
        <h1>Experience</h1>
        <p>Academic, project-based, and training experience.</p>
      </header>
      <ExperienceTimeline />
    </main>
  );
}
