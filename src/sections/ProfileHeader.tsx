import { BadgeCheck } from 'lucide-react';
import { Link } from 'react-router';
import SocialLinks from '../components/SocialLinks';
import ThemeToggle from '../components/ThemeToggle';
import { useCondensedHeader } from '../hooks/useCondensedHeader';
import { useMobileLayout } from '../hooks/useMobileLayout';
import profilePhoto from '../assets/profile-zel.webp';

type ProfileHeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

function ProfileDetails() {
  return (
    <div className="profile-details">
      <p className="professional-title">
        Aspiring Software Engineer <span aria-hidden="true">/</span> Fullstack
        Developer
      </p>
      <p className="location">
        <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        Davao City, Philippines
      </p>
    </div>
  );
}

export default function ProfileHeader({
  theme,
  toggleTheme,
}: ProfileHeaderProps) {
  const mobile = useMobileLayout();
  const condensed = useCondensedHeader(!mobile);
  return (
    <>
      {!mobile && (
        <>
          <div
            id="profile-header-marker"
            className="profile-header-marker"
            aria-hidden="true"
          />
          <header
            className={`profile-identity-bar${condensed ? ' is-condensed' : ''}`}
            aria-label="Profile navigation"
          >
            <div className="profile-bar-brand">
              <h1 id="name" aria-label="Azel M. Villanueva">
                <Link to="/" aria-label="Azel Villanueva, back to profile">
                  <span className="profile-name-full" aria-hidden="true">
                    Azel M. Villanueva
                    <BadgeCheck className="name-check" />
                  </span>
                  <span className="profile-name-short" aria-hidden="true">
                    AV
                  </span>
                </Link>
              </h1>
            </div>
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
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </header>
        </>
      )}
      <section
        className={`profile-header reveal${mobile ? '' : ' profile-header-desktop'}`}
        id="profile"
        aria-labelledby="name"
      >
        <img
          decoding="async"
          className="profile-photo"
          src={profilePhoto}
          alt="Portrait of Azel M. Villanueva"
          fetchPriority="high"
          width="176"
          height="176"
        />
        <div className="profile-heading">
          {mobile ? (
            <div className="profile-identity">
              <h1 id="name">
                Azel M. Villanueva
                <BadgeCheck className="name-check" aria-hidden="true" />
              </h1>
              <SocialLinks />
            </div>
          ) : (
            <SocialLinks />
          )}
          <ProfileDetails />
        </div>
      </section>
    </>
  );
}
