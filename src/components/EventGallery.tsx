import { useState } from 'react';
import { Expand, Images } from 'lucide-react';
import { eventPhotos } from '../data/community';
import type { EventPhoto } from '../data/community';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMasonryLayout } from '../hooks/useMasonryLayout';
import PhotoLightbox from './PhotoLightbox';

const comingSoonAspects = [
  '3 / 4',
  '4 / 5',
  '1 / 1',
  '2 / 3',
  '4 / 5',
  '3 / 5',
  '1 / 1',
  '3 / 4',
  '4 / 5',
  '2 / 3',
];

export default function EventGallery({
  preview = false,
  comingSoon = false,
  photos: suppliedPhotos = eventPhotos,
  label = 'Event photo gallery',
  viewerLabel = 'Event photo viewer',
  className = '',
}: {
  preview?: boolean;
  comingSoon?: boolean;
  photos?: EventPhoto[];
  label?: string;
  viewerLabel?: string;
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const ref = useScrollReveal<HTMLDivElement>(!preview);
  useMasonryLayout(ref, !preview);
  const photos = preview ? suppliedPhotos.slice(0, 3) : suppliedPhotos;
  return (
    <>
      <div
        ref={ref}
        className={`${preview ? 'event-gallery-preview' : 'event-masonry'} ${className}`.trim()}
        aria-label={label}
      >
        {photos.map((photo, position) => (
          <div
            key={photo.id}
            className="gallery-position"
            data-reveal-trigger
            data-aspect={photo.tileAspect ?? photo.aspect}
          >
            <div
              className="gallery-reveal"
              data-reveal
              style={{ transitionDelay: `${position * (preview ? 70 : 45)}ms` }}
            >
              <button
                type="button"
                className="gallery-photo"
                style={{
                  aspectRatio: preview
                    ? '1 / 1'
                    : (photo.tileAspect ?? photo.aspect),
                }}
                onClick={() => setIndex(position)}
                aria-label={`Open photo ${position + 1}: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ objectPosition: photo.position }}
                  loading={position < 5 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="gallery-expand" aria-hidden="true">
                  <Expand size={17} />
                </span>
              </button>
            </div>
          </div>
        ))}
        {comingSoon &&
          !preview &&
          comingSoonAspects.map((aspect, position) => (
            <div
              key={`coming-soon-${position}`}
              className="gallery-position"
              data-reveal-trigger
              data-aspect={aspect}
              aria-hidden={position > 0 ? true : undefined}
            >
              <div
                className="gallery-reveal"
                data-reveal
                style={{
                  transitionDelay: `${(photos.length + position) * 45}ms`,
                }}
              >
                <div
                  className="gallery-placeholder"
                  style={{ aspectRatio: aspect }}
                >
                  <Images size={22} aria-hidden="true" />
                  <p>More moments coming soon</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <PhotoLightbox
        photos={photos}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(null)}
        label={viewerLabel}
      />
    </>
  );
}
