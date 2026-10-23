import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { personalPhotos } from '../data/personal';

// Inspired by the click-through Stack interaction documented at reactbits.dev/components/stack.
export default function PhotoStack() {
  const [front, setFront] = useState(0);
  return (
    <button
      type="button"
      className="photo-stack"
      onClick={() => setFront((value) => (value + 1) % personalPhotos.length)}
      aria-label="Cycle personal photos"
    >
      {personalPhotos.map((photo, index) => {
        const position =
          (index - front + personalPhotos.length) % personalPhotos.length;
        return (
          <span
            key={index}
            className={`stack-photo stack-position-${position}`}
          >
            <img
              src={photo.src}
              alt={position === 0 ? photo.alt : ''}
              draggable="false"
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
