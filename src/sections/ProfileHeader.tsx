import profilePhoto from '../assets/profile-zel.webp';

type ProfileHeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export default function ProfileHeader({
  theme,
  toggleTheme,
}: ProfileHeaderProps) {
  return (
    <section
      className="profile-header reveal"
      id="profile"
      aria-labelledby="name"
    >
      <img
        className="profile-photo"
        src={profilePhoto}
        alt="Portrait of Azel M. Villanueva"
        width="144"
        height="144"
      />
      <div className="toolbar">
        <button
          className="button button-quiet"
          id="print-cv"
          type="button"
          onClick={() => window.print()}
        >
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 8V3h10v5M7 17H4V8h16v9h-3M7 14h10v7H7zM17 11h.01" />
          </svg>
          <span>Print CV</span>
        </button>
        <button
          className="theme-toggle"
          id="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
          onClick={toggleTheme}
        >
          <svg className="icon sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </svg>
          <svg className="icon moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z" />
          </svg>
        </button>
      </div>
      <div className="profile-heading">
        <p className="eyebrow">CURRICULUM VITAE</p>
        <h1 id="name">
          Azel M. Villanueva<span className="name-dot">.</span>
        </h1>
        <p className="professional-title">
          Aspiring Software Engineer <span aria-hidden="true">/</span> Web
          Developer <span aria-hidden="true">/</span> BSIT Student
        </p>
        <p className="location">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          Davao City, Philippines
        </p>
        <div className="profile-actions">
          <a
            className="button button-primary"
            href="mailto:villanueva.azel@dnsc.edu.ph"
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 6 9 7 9-7" />
            </svg>
            Email me
          </a>
          <a
            className="button button-outline"
            href="https://github.com/Zel-jpeg"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <span className="student-tag">4th Year · BSIT 4G</span>
        </div>
      </div>
    </section>
  );
}
