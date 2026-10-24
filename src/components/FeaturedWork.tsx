import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../data/projects';

export default function FeaturedWork() {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const lastHoverPoint = useRef<{ x: number; y: number } | null>(null);
  const [imageWidth, setImageWidth] = useState(600);
  useEffect(() => {
    const element = stripRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const collapsed = Math.max(44, Math.min(100, width * 0.12));
      setImageWidth(Math.max(160, width - collapsed * 2 - 18));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="featured-strip"
      aria-label="Featured work"
      ref={stripRef}
      onPointerLeave={() => {
        lastHoverPoint.current = null;
      }}
      style={
        { '--featured-image-width': `${imageWidth}px` } as React.CSSProperties
      }
    >
      {featuredProjects.map((project, index) => (
        <button
          type="button"
          key={project.name}
          className={`featured-panel ${active === index ? 'is-expanded' : ''}`}
          aria-expanded={active === index}
          onPointerMove={(event) => {
            if (
              event.pointerType === 'mouse' &&
              matchMedia('(hover: hover)').matches
            ) {
              const point = { x: event.clientX, y: event.clientY };
              const previous = lastHoverPoint.current;
              // Moving card edges must not activate a neighbour under a still cursor.
              if (previous?.x === point.x && previous.y === point.y) return;
              lastHoverPoint.current = point;
              setActive(index);
            }
          }}
          onFocus={() => setActive(index)}
          onClick={() => setActive(index)}
          aria-label={`Feature ${project.name}`}
        >
          <img
            decoding="async"
            src={project.image}
            alt={`${project.name} project preview`}
            loading="lazy"
          />
          <span className="featured-overlay" />
          <span className="featured-copy">
            <span className="small-label">{project.category}</span>
            <strong>{project.name}</strong>
            <span className="featured-description">{project.description}</span>
            <ArrowUpRight size={20} />
          </span>
          <span className="featured-vertical" aria-hidden="true">
            {project.name}
          </span>
        </button>
      ))}
    </div>
  );
}
