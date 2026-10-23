import { useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

type CertificatePreviewProps = { title: string; image: string; pdf: string };

export default function CertificatePreview({
  title,
  image,
  pdf,
}: CertificatePreviewProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="certificate-thumbnail"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Preview ${title}`}
      >
        <img src={image} alt={`${title} certificate`} loading="lazy" />
      </button>
      <dialog
        ref={dialog}
        className="certificate-dialog"
        aria-label={title}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="certificate-dialog-header">
          <h2>{title}</h2>
          <button
            type="button"
            className="certificate-close"
            onClick={() => dialog.current?.close()}
            aria-label="Close certificate preview"
            autoFocus
          >
            <X size={20} />
          </button>
        </div>
        <img className="certificate-full-image" src={image} alt={title} />
        <a
          className="button button-primary"
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open original PDF <ArrowUpRight size={15} />
        </a>
      </dialog>
    </>
  );
}
