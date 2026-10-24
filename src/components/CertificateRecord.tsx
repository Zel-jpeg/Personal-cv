import { ArrowUpRight } from 'lucide-react';
import type { Certificate } from '../data/certifications';
import { certificateDate } from '../data/certifications';
import CertificatePreview from './CertificatePreview';
import { contactEmail } from '../data/personal';

export default function CertificateRecord({
  certificate,
  detailed = false,
  preview = true,
}: {
  certificate: Certificate;
  detailed?: boolean;
  preview?: boolean;
}) {
  return (
    <article
      className={`certificate-record ${detailed ? 'certificate-detailed' : 'certificate-compact'} ${!preview || !certificate.image || !certificate.pdf ? 'without-preview' : ''}`}
    >
      <time dateTime={certificate.date}>
        {certificateDate(certificate.date)}
      </time>
      <div className="certificate-content">
        <div className="certificate-copy">
          <h3>{certificate.title}</h3>
          <p>{certificate.issuer}</p>
        </div>
        {preview && certificate.image && certificate.pdf && (
          <CertificatePreview
            title={certificate.title}
            image={certificate.image}
            pdf={certificate.pdf}
          />
        )}
        <div className="certificate-document-links">
          <a
            href={
              certificate.pdf ??
              `mailto:${contactEmail}?subject=${encodeURIComponent(`Certificate request: ${certificate.title}`)}`
            }
            {...(certificate.pdf
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {certificate.pdf ? 'View certificate' : 'Available on request'}{' '}
            <ArrowUpRight size={12} />
          </a>
        </div>
        {detailed && certificate.additionalDocument && (
          <div className="certificate-supporting">
            <p className="small-label">ADDITIONAL COURSE DOCUMENT</p>
            <CertificatePreview {...certificate.additionalDocument} />
            <a
              className="text-link"
              href={certificate.additionalDocument.pdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Cisco credential <ArrowUpRight size={12} />
            </a>
          </div>
        )}
        {detailed && certificate.badge && (
          <a
            className="certificate-badge-link"
            href={certificate.badge}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View badge for ${certificate.title}`}
          >
            <img
              decoding="async"
              src={certificate.badge}
              alt={`${certificate.title} course badge`}
              loading="lazy"
            />
            <span>
              Course badge <ArrowUpRight size={12} />
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
