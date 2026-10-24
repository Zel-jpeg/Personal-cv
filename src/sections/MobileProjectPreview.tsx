import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight, Download, Expand } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import type {
  Project,
  ProjectRelease,
  ProjectScreenshot,
} from '../data/projects';
import PhotoLightbox from '../components/PhotoLightbox';

type MobileProjectPreviewProps = {
  project: Project;
  screenshots: ProjectScreenshot[];
  description: string;
  release?: ProjectRelease;
};

export default function MobileProjectPreview({
  project,
  screenshots,
  description,
  release,
}: MobileProjectPreviewProps) {
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    document.title = `${project.name} — Azel M. Villanueva`;
    return () => {
      document.title = 'Azel M. Villanueva - Personal CV';
    };
  }, [project.name]);

  return (
    <main className="tech-stack-page project-detail-page" id="main-content">
      <Link className="text-link back-link" to="/projects">
        <ArrowLeft size={15} /> Back to projects
      </Link>
      <header className="tech-page-intro">
        <div className="project-detail-identity">
          <span className="project-detail-logo-frame">
            <img
              src={project.image}
              alt=""
              width={64}
              height={64}
              decoding="async"
              style={
                project.logoScale ? { scale: project.logoScale } : undefined
              }
            />
          </span>
          <div>
            <p className="eyebrow">
              ANDROID APP · {project.category.toUpperCase()}
            </p>
            <h1>{project.name}</h1>
          </div>
        </div>
        <p>{description}</p>
        <div className="project-detail-actions">
          {release && (
            <a className="button button-primary" href={release.download}>
              <Download size={16} aria-hidden="true" /> Download APK
            </a>
          )}
          <a
            className="button project-repository-button"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub size={16} aria-hidden="true" /> View repository
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        {release && (
          <p className="project-release-note">
            Android · {release.version} · {release.size}
            <span aria-hidden="true"> · </span>
            <a href={release.url} target="_blank" rel="noopener noreferrer">
              GitHub release
            </a>
          </p>
        )}
      </header>
      <section
        className="project-screenshots"
        aria-labelledby="screenshots-title"
      >
        <div className="section-heading">
          <h2 id="screenshots-title">App preview</h2>
          <span className="small-label">{screenshots.length} SCREENS</span>
        </div>
        <p className="project-preview-hint">
          Select a screenshot to view it full size.
        </p>
        <div
          className={`project-screenshot-grid${screenshots.length <= 4 ? ' project-screenshot-grid-curated' : ''}`}
        >
          {screenshots.map((screen, position) => (
            <figure key={screen.id}>
              <button
                type="button"
                className="project-screenshot"
                onClick={() => setIndex(position)}
                aria-label={`Open screenshot ${position + 1}: ${screen.caption}`}
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  loading={position < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="project-screenshot-expand" aria-hidden="true">
                  <Expand size={16} />
                </span>
              </button>
              <figcaption>
                <span>{String(position + 1).padStart(2, '0')}</span>
                {screen.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <PhotoLightbox
        photos={screenshots}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
        label={`${project.name} screenshot viewer`}
      />
    </main>
  );
}
