import { SiGithub } from 'react-icons/si';
import { ArrowUpRight, FolderCode } from 'lucide-react';
import type { Project } from '../data/projects';
import TechBadge from './TechBadge';
import { useCardSpotlight } from '../hooks/useCardSpotlight';

export default function ProjectCard({ project }: { project: Project }) {
  const spotlight = useCardSpotlight();
  return (
    <article className="project-card" {...spotlight}>
      <a
        className="project-preview"
        href={project.demo ?? project.repository}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name}`}
      >
        {project.image ? (
          <img
            decoding="async"
            src={project.image}
            alt={`${project.name} interface`}
            loading="lazy"
          />
        ) : (
          <span className="project-placeholder">
            <FolderCode size={38} />
            <span>{project.name}</span>
          </span>
        )}
        <span className="preview-arrow">
          <ArrowUpRight size={17} />
        </span>
      </a>
      <div className="project-card-body">
        <p className="small-label">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div
          className="project-technologies"
          role="group"
          aria-label="Repository languages"
        >
          {project.languages.map((name) => (
            <TechBadge key={name} name={name} compact />
          ))}
        </div>
        <div className="project-links">
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub size={14} /> Code
            <span className="sr-only"> for {project.name}</span>
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Visit site<span className="sr-only"> for {project.name}</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
