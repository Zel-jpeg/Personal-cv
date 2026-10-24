import { SiGithub } from 'react-icons/si';
import { ArrowUpRight, FolderCode } from 'lucide-react';
import type { Project } from '../data/projects';
import TechBadge from './TechBadge';
import { useCardSpotlight } from '../hooks/useCardSpotlight';
import { Link } from 'react-router';

export default function ProjectCard({ project }: { project: Project }) {
  const spotlight = useCardSpotlight();
  const previewClass = `project-preview${project.imageKind === 'logo' ? ' project-preview-logo' : ''}`;
  const image = project.image ? (
    <img
      decoding="async"
      src={project.image}
      alt={`${project.name} ${project.imageKind === 'logo' ? 'logo' : 'interface'}`}
      loading="lazy"
      style={project.logoScale ? { scale: project.logoScale } : undefined}
    />
  ) : (
    <span className="project-placeholder">
      <FolderCode size={38} />
      <span>{project.name}</span>
    </span>
  );
  const preview = (
    <>
      {project.imageKind === 'logo' ? (
        <span className="project-logo-frame">{image}</span>
      ) : (
        image
      )}
      <span className="preview-arrow">
        <ArrowUpRight size={17} />
      </span>
    </>
  );
  return (
    <article className="project-card" {...spotlight}>
      {project.details ? (
        <Link
          className={previewClass}
          to={project.details}
          aria-label={`Preview ${project.name}`}
        >
          {preview}
        </Link>
      ) : (
        <a
          className={previewClass}
          href={project.demo ?? project.repository}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name}`}
        >
          {preview}
        </a>
      )}
      <div className="project-card-body">
        <p className="small-label">{project.category}</p>
        <h3>
          {project.details ? (
            <Link className="project-card-link" to={project.details}>
              {project.name}
            </Link>
          ) : (
            <a
              className="project-card-link"
              href={project.demo ?? project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
          )}
        </h3>
        <p className="project-description">{project.description}</p>
        <div
          className="project-technologies"
          role="group"
          aria-label="Project technologies"
        >
          {project.technologies.map((name) => (
            <TechBadge key={name} name={name} compact />
          ))}
        </div>
        <div className="project-links">
          {project.details && (
            <Link to={project.details}>
              Preview app<span className="sr-only"> for {project.name}</span>
              <ArrowUpRight size={14} />
            </Link>
          )}
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
