import { doneeitRelease, doneeitScreenshots, projects } from '../data/projects';
import MobileProjectPreview from './MobileProjectPreview';

const project = projects.find((entry) => entry.name === 'DoneeIt')!;

export default function DoneeitProjectSection() {
  return (
    <MobileProjectPreview
      project={project}
      screenshots={doneeitScreenshots}
      release={doneeitRelease}
      description="A student productivity app for keeping academic life organized. Manage to-dos, organize courses, and personalize your student ID in one place."
    />
  );
}
