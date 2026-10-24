import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import type {
  Project,
  ProjectRelease,
  ProjectScreenshot,
} from '../data/projects';
import EventGallery from '../components/EventGallery';

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
  useEffect(() => {
    document.title = `${project.name} — Azel Villanueva`;
    return () => {
      document.title = 'Azel Villanueva - Personal CV';
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
        <EventGallery
          key={project.name}
          photos={screenshots.map((screen) => ({
            ...screen,
            aspect: `${screen.width} / ${screen.height}`,
          }))}
          className={`project-screenshot-gallery${screenshots.length <= 4 ? ' project-screenshot-gallery-curated' : ''}`}
          label={`${project.name} app screenshots`}
          viewerLabel={`${project.name} screenshot viewer`}
        />
      </section>
    </main>
  );
}
