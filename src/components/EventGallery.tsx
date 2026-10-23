import { useState } from 'react';
import { Expand } from 'lucide-react';
import { eventPhotos } from '../data/community';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PhotoLightbox from './PhotoLightbox';

export default function EventGallery({
  preview = false,
}: {
  preview?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const ref = useScrollReveal<HTMLDivElement>();
  const photos = preview ? eventPhotos.slice(0, 3) : eventPhotos;
  return (
    <>
      <div
        ref={ref}
        className={preview ? 'event-gallery-preview' : 'event-masonry'}
        aria-label="Event photo gallery"
      >
        {photos.map((photo, position) => (
          <div
            key={photo.id}
            className="gallery-reveal"
            data-reveal
            style={{ transitionDelay: `${Math.min(position, 7) * 70}ms` }}
          >
            <button
              type="button"
              className="gallery-photo"
              style={{ aspectRatio: preview ? '1 / 1' : photo.aspect }}
              onClick={() => setIndex(position)}
              aria-label={`Open photo ${position + 1}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={position < 5 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <span className="gallery-expand">
                <Expand size={17} />
              </span>
            </button>
          </div>
        ))}
      </div>
      <PhotoLightbox
        photos={photos}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
      />
    </>
  );
}
