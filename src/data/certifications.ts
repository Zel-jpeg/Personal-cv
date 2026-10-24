import srweImage from '../assets/certifications/ccna-srwe.webp';
import srweBadge from '../assets/certifications/ccna-srwe-badge.webp';
import srweCredential from '../assets/certifications/ccna-srwe-credential.webp';
import introductionImage from '../assets/certifications/ccna-introduction.webp';

const hasLocalFiles = import.meta.env.VITE_LOCAL_CERTIFICATES === 'true';
const localFile = (name: string) =>
  hasLocalFiles ? `/local-certificates/${name}` : undefined;

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  pdf?: string;
  badge?: string;
  additionalDocument?: { title: string; image: string; pdf?: string };
};

// Dates verified against the original documents. These are course completions,
// not a claim of having passed the separate Cisco CCNA certification exam.
// Both supplied CCNASRWEUpdate PDFs have identical SHA-256 hashes: keep one copy.
export const certifications: Certificate[] = [
  {
    id: 'ccna-srwe',
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy · Davao del Norte State College',
    date: '2025-12-26',
    image: srweImage,
    pdf: localFile('ccna-srwe.pdf'),
    badge: srweBadge,
    additionalDocument: {
      title: 'Cisco course-completion credential',
      image: srweCredential,
      pdf: localFile('ccna-srwe-credential.pdf'),
    },
  },
  {
    id: 'ccna-introduction',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy · Davao del Norte State College',
    date: '2025-06-11',
    image: introductionImage,
    pdf: localFile('ccna-introduction.pdf'),
  },
];

export function certificateDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
