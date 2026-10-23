import { BadgeCheck } from 'lucide-react';
import SocialLinks from '../components/SocialLinks';
import ThemeToggle from '../components/ThemeToggle';
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
        width="176"
        height="176"
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
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="profile-heading">
        <div className="profile-identity">
          <h1 id="name">
            Azel M. Villanueva
            <BadgeCheck className="name-check" aria-hidden="true" />
          </h1>
          <SocialLinks />
        </div>
        <div className="profile-details">
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
            <span className="student-tag">4th Year · BSIT 4G</span>
          </div>
        </div>
      </div>
    </section>
  );
}
