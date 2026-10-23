import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProfileHeader from './sections/ProfileHeader';
import SummarySection from './sections/SummarySection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import CertificationsSection from './sections/CertificationsSection';
import ContactSection from './sections/ContactSection';
import { useCV } from './hooks/useCV';
import ProjectsSection from './sections/ProjectsSection';
import OutsideSection from './sections/OutsideSection';
import GitHubSection from './sections/GitHubSection';
import TechStackSection from './sections/TechStackSection';
import DetailHeader from './components/DetailHeader';
import ProjectArchiveSection from './sections/ProjectArchiveSection';
import CertificationArchiveSection from './sections/CertificationArchiveSection';

export default function App() {
  const { theme, toggleTheme, activeSection, setActiveSection } = useCV();
  const path = window.location.pathname.replace(/\/$/, '');
  if (
    path === '/tech-stack' ||
    path === '/projects' ||
    path === '/certifications'
  ) {
    return (
      <>
        <a className="skip-link" href="#main-content">
          Skip to page content
        </a>
        <DetailHeader theme={theme} toggleTheme={toggleTheme} />
        {path === '/certifications' ? (
          <CertificationArchiveSection />
        ) : path === '/projects' ? (
          <ProjectArchiveSection />
        ) : (
          <TechStackSection />
        )}
        <Footer />
      </>
    );
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to CV content
      </a>
      <div className="home-mobile-header">
        <DetailHeader home theme={theme} toggleTheme={toggleTheme} />
      </div>
      <main className="cv-shell" id="main-content">
        <ProfileHeader theme={theme} toggleTheme={toggleTheme} />
        <div className="resume-layout">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <div className="resume-content">
            <SummarySection />
            <EducationSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CertificationsSection />
            <OutsideSection />
            <GitHubSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
