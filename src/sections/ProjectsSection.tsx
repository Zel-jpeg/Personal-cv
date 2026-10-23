import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import FeaturedWork from '../components/FeaturedWork';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsSection() {
  return (
    <section
      className="cv-section projects-section reveal"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <h2 id="projects-title">
          Featured work<span className="heading-dot">.</span>
        </h2>
        <span className="small-label">IDEAS INTO INTERFACES</span>
      </div>
      <FeaturedWork />
      <div className="section-heading projects-heading">
        <h3>Selected projects</h3>
        <span className="small-label">01 — 0{projects.length}</span>
      </div>
      <div className="project-grid" id="project-list">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <Link className="button button-primary explore-projects" to="/projects">
        Explore all {projects.length} projects <ArrowUpRight size={15} />
      </Link>
    </section>
  );
}
