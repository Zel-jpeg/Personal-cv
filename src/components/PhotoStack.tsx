import { RotateCw } from 'lucide-react';
import { personalPhotos } from '../data/personal';
import { stackTransform, usePhotoShuffle } from '../hooks/usePhotoShuffle';

export default function PhotoStack() {
  const { button, order, shuffle } = usePhotoShuffle(personalPhotos.length);
  return (
    <button
      ref={button}
      type="button"
      className="photo-stack"
      onClick={() => void shuffle()}
      aria-label="Shuffle Outside the IDE photos"
    >
      {order.map((photoIndex, position) => {
        const photo = personalPhotos[photoIndex];
        return (
          <span
            key={photo.src}
            className={`stack-photo stack-position-${position}`}
            data-photo-index={photoIndex}
            style={{
              transform: stackTransform(position),
              zIndex: order.length - position,
            }}
          >
            <img
              decoding="async"
              src={photo.src}
              alt={position === 0 ? photo.alt : ''}
              style={{ objectPosition: photo.position }}
              draggable="false"
              loading="lazy"
            />
          </span>
        );
      })}
      <span className="stack-hint">
        <RotateCw size={12} /> Click to shuffle
      </span>
    </button>
  );
}
