import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight, Download, Expand } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { doneeitRelease, doneeitScreenshots, projects } from '../data/projects';
import PhotoLightbox from '../components/PhotoLightbox';

const project = projects.find((entry) => entry.name === 'DoneeIt')!;

export default function DoneeitProjectSection() {
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    document.title = 'DoneeIt — Azel M. Villanueva';
    return () => {
      document.title = 'Azel M. Villanueva - Personal CV';
    };
  }, []);

  return (
    <main className="tech-stack-page project-detail-page" id="main-content">
      <Link className="text-link back-link" to="/projects">
        <ArrowLeft size={15} /> Back to projects
      </Link>
      <header className="tech-page-intro">
        <div className="project-detail-identity">
          <img
            className="project-detail-logo"
            src={project.image}
            alt=""
            width={64}
            height={64}
            decoding="async"
          />
          <div>
            <p className="eyebrow">ANDROID APP · STUDENT PRODUCTIVITY</p>
            <h1>DoneeIt</h1>
          </div>
        </div>
        <p>
          A student productivity app for keeping academic life organized. Manage
          to-dos, organize courses, and personalize your student ID in one
          place.
        </p>
        <div className="project-detail-actions">
          <a className="button button-primary" href={doneeitRelease.download}>
            <Download size={16} aria-hidden="true" /> Download APK
          </a>
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
        <p className="project-release-note">
          Android · {doneeitRelease.version} · {doneeitRelease.size}
          <span aria-hidden="true"> · </span>
          <a
            href={doneeitRelease.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub release
          </a>
        </p>
      </header>
      <section
        className="project-screenshots"
        aria-labelledby="screenshots-title"
      >
        <div className="section-heading">
          <h2 id="screenshots-title">App preview</h2>
          <span className="small-label">
            {doneeitScreenshots.length} SCREENS
          </span>
        </div>
        <p className="project-preview-hint">
          Select a screenshot to view it full size.
        </p>
        <div className="project-screenshot-grid">
          {doneeitScreenshots.map((screen, position) => (
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
        photos={doneeitScreenshots}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
        label="DoneeIt screenshot viewer"
      />
    </main>
  );
}
