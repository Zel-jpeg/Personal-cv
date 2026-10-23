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
  additionalDocument?: { title: string; image: string; pdf: string };
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
    image: localFile('ccna-srwe.webp'),
    pdf: localFile('ccna-srwe.pdf'),
    badge: localFile('ccna-srwe-badge.webp'),
    additionalDocument: hasLocalFiles
      ? {
          title: 'Cisco course-completion credential',
          image: localFile('ccna-srwe-credential.webp')!,
          pdf: localFile('ccna-srwe-credential.pdf')!,
        }
      : undefined,
  },
  {
    id: 'ccna-introduction',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy · Davao del Norte State College',
    date: '2025-06-11',
    image: localFile('ccna-introduction.webp'),
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
