import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type LightboxPhoto = {
  id: string;
  fullSrc: string;
  alt: string;
  caption: string;
};

type PhotoLightboxProps = {
  photos: LightboxPhoto[];
  index: number | null;
  onIndex: (index: number) => void;
  onClose: () => void;
  label?: string;
};

export default function PhotoLightbox({
  photos,
  index,
  onIndex,
  onClose,
  label = 'Event photo viewer',
}: PhotoLightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element || index === null) return;
    if (!element.open) {
      element.showModal();
      closeButton.current?.focus();
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [index]);
  useEffect(() => {
    if (index === null) dialog.current?.close();
  }, [index]);
  const move = (direction: number) => {
    if (index !== null)
      onIndex((index + direction + photos.length) % photos.length);
  };

  return (
    <dialog
      className="photo-lightbox"
      ref={dialog}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          move(1);
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <div
        className="lightbox-frame"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <button
          className="lightbox-close"
          type="button"
          ref={closeButton}
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          <X size={22} />
        </button>
        <button
          className="lightbox-arrow lightbox-previous"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>
        {index !== null && (
          <figure className="lightbox-photo">
            <img
              decoding="async"
              key={photos[index].id}
              src={photos[index].fullSrc}
              alt={photos[index].alt}
            />
            <figcaption>
              <span>{photos[index].caption}</span>
              <span aria-live="polite">
                {index + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button
          className="lightbox-arrow lightbox-next"
          type="button"
          onClick={() => move(1)}
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </dialog>
  );
}
