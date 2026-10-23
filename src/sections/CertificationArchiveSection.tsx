import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { certifications } from '../data/certifications';
import CertificateRecord from '../components/CertificateRecord';

export default function CertificationArchiveSection() {
  useEffect(() => {
    document.title = 'Certifications — Azel M. Villanueva';
    return () => {
      document.title = 'Azel M. Villanueva - Personal CV';
    };
  }, []);
  return (
    <main className="tech-stack-page certification-archive" id="main-content">
      <a className="text-link back-link" href="/#certifications">
        <ArrowLeft size={15} /> Back to home
      </a>
      <header className="tech-page-intro">
        <h1>
          Certifications<span className="heading-dot">.</span>
        </h1>
        <p>
          Completed networking courses and credentials from Cisco Networking
          Academy.
        </p>
      </header>
      <div className="certificate-timeline">
        {certifications.map((certificate) => (
          <CertificateRecord
            key={certificate.id}
            certificate={certificate}
            detailed
          />
        ))}
      </div>
    </main>
  );
}
