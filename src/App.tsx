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

export default function App() {
  const { theme, toggleTheme, activeSection, setActiveSection } = useCV();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to CV content
      </a>
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
            <CertificationsSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
