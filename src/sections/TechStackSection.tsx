import { Link } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { skillGroups } from '../data/cv';
import TechBadge from '../components/TechBadge';

export default function TechStackSection() {
  useEffect(() => {
    document.title = 'Full Tech Stack — Azel Villanueva';
    return () => {
      document.title = 'Azel Villanueva - Personal CV';
    };
  }, []);
  return (
    <main className="tech-stack-page" id="main-content">
      <Link className="text-link back-link" to="/#skills">
        <ArrowLeft size={15} /> Back to home
      </Link>
      <header className="tech-page-intro">
        <h1>Full Tech Stack</h1>
        <p>
          Tools and technologies I use to design, build, and develop projects.
        </p>
      </header>
      {skillGroups.map((group) => (
        <section
          className="tech-category"
          key={group.category}
          aria-label={group.category}
        >
          <h2>{group.category}</h2>
          <div className="technology-list">
            {group.skills.map((name) => (
              <TechBadge key={name} name={name} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
