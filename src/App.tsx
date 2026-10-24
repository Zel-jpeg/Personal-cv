import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ProfileHeader from './sections/ProfileHeader';
import SummarySection from './sections/SummarySection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ExperienceArchiveSection from './sections/ExperienceArchiveSection';
import CertificationsSection from './sections/CertificationsSection';
import ContactSection from './sections/ContactSection';
import { useCV } from './hooks/useCV';
import ProjectsSection from './sections/ProjectsSection';
import OutsideSection from './sections/OutsideSection';
import GitHubSection from './sections/GitHubSection';
import TechStackSection from './sections/TechStackSection';
import DetailHeader from './components/DetailHeader';
import HomeHeader from './components/HomeHeader';
import ProjectArchiveSection from './sections/ProjectArchiveSection';
import CertificationArchiveSection from './sections/CertificationArchiveSection';
import CommunitySection from './sections/CommunitySection';
import CommunityArchiveSection from './sections/CommunityArchiveSection';
import EventsSection from './sections/EventsSection';
import DoneeitProjectSection from './sections/DoneeitProjectSection';
import FinancifyProjectSection from './sections/FinancifyProjectSection';
import NotFoundSection, {
  OfflineSection,
  ErrorSection,
} from './sections/PageStatusSection';
import type { ComponentType } from 'react';
import { useLocation } from 'react-router';
import { usePageNavigation } from './hooks/usePageNavigation';

const detailPages: Record<string, ComponentType> = {
  '/404': NotFoundSection,
  '/offline': OfflineSection,
  '/error': ErrorSection,
  '/experience': ExperienceArchiveSection,
  '/projects/financify': FinancifyProjectSection,
  '/projects/doneeit': DoneeitProjectSection,
  '/projects': ProjectArchiveSection,
  '/tech-stack': TechStackSection,
  '/certifications': CertificationArchiveSection,
  '/community': CommunityArchiveSection,
  '/events': EventsSection,
};

export default function App() {
  const location = useLocation();
  const path = location.pathname.replace(/\/$/, '');
  const { theme, toggleTheme, activeSection, setActiveSection } = useCV(path);
  usePageNavigation();
  const DetailPage = detailPages[path] ?? (path ? NotFoundSection : undefined);
  if (DetailPage) {
    return (
      <div className="page-view" key={path}>
        <a className="skip-link" href="#main-content">
          Skip to page content
        </a>
        <DetailHeader theme={theme} toggleTheme={toggleTheme} />
        <DetailPage />
        <Footer />
        <BackToTop />
      </div>
    );
  }
  return (
    <div className="page-view" key={path}>
      <a className="skip-link" href="#main-content">
        Skip to CV content
      </a>
      <HomeHeader theme={theme} toggleTheme={toggleTheme} />
      <main className="cv-shell" id="main-content">
        <ProfileHeader theme={theme} toggleTheme={toggleTheme} />
        <div className="resume-layout">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <div className="resume-content">
            <SummarySection />
            <ExperienceSection />
            <SkillsSection />
            <CommunitySection />
            <ProjectsSection />
            <CertificationsSection />
            <EducationSection />
            <OutsideSection />
            <GitHubSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
