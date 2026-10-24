import { FileText } from 'lucide-react';
import resumeUrl from '../assets/resume/azel-villanueva-resume.pdf?url';

export default function ResumeActions({ onSelect }: { onSelect?: () => void }) {
  return (
    <a
      className="button resume-action"
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Resume (PDF, opens in a new tab)"
      onClick={onSelect}
    >
      <FileText size={16} aria-hidden="true" />
      <span>View Resume</span>
    </a>
  );
}
