import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

export default function FeaturedWork() {
  const [active, setActive] = useState(0);
  return (
    <div className="featured-strip" aria-label="Featured work">
      {projects.slice(0, 3).map((project, index) => (
        <button
          type="button"
          key={project.name}
          className={`featured-panel ${active === index ? 'is-expanded' : ''}`}
          aria-expanded={active === index}
          onMouseEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
          onClick={() => setActive(index)}
          aria-label={`Feature ${project.name}`}
        >
          <img
            src={project.image}
            alt={`${project.name} project preview`}
            loading="lazy"
          />
          <span className="featured-overlay" />
          <span className="featured-copy">
            <span className="small-label">{project.category}</span>
            <strong>{project.name}</strong>
            <span className="featured-description">{project.description}</span>
            <ArrowUpRight size={20} />
          </span>
          <span className="featured-vertical" aria-hidden="true">
            {project.name}
          </span>
        </button>
      ))}
    </div>
  );
}
