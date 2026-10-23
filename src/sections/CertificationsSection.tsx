import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { certifications } from '../data/certifications';
import CertificateRecord from '../components/CertificateRecord';

export default function CertificationsSection() {
  return (
    <section
      className="cv-section certifications-section reveal"
      id="certifications"
      aria-labelledby="certifications-title"
    >
      <div className="section-heading">
        <h2 id="certifications-title">
          Certifications<span className="heading-dot">.</span>
        </h2>
        <Link className="text-link" to="/certifications">
          View all <ChevronRight size={14} />
        </Link>
      </div>
      <p className="eyebrow certificate-group-label">
        LATEST COURSE CREDENTIAL
      </p>
      <CertificateRecord certificate={certifications[0]} />
      <div className="certificate-earlier">
        <p className="eyebrow certificate-group-label">EARLIER TRAINING</p>
        {certifications.slice(1).map((certificate) => (
          <CertificateRecord
            key={certificate.id}
            certificate={certificate}
            preview={false}
          />
        ))}
      </div>
    </section>
  );
}
