import { Link } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function ProjectArchiveSection() {
  useEffect(() => {
    document.title = 'Projects — Azel M. Villanueva';
    return () => {
      document.title = 'Azel M. Villanueva - Personal CV';
    };
  }, []);
  return (
    <main className="tech-stack-page project-archive" id="main-content">
      <Link className="text-link back-link" to="/#projects">
        <ArrowLeft size={15} /> Back to home
      </Link>
      <header className="tech-page-intro">
        <p className="eyebrow">A COLLECTION OF THINGS I'VE BUILT</p>
        <h1>
          Projects<span className="heading-dot">.</span>
        </h1>
        <p>
          Academic and personal projects, from early ideas to working
          applications.
        </p>
      </header>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </main>
  );
}
