import { useEffect, useRef, useState } from 'react';
import TechBadge from './TechBadge';

export default function TechnologyRow({
  skills,
  label,
}: {
  skills: string[];
  label: string;
}) {
  const windowRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState({ copies: 2, duration: 40 });

  useEffect(() => {
    const windowElement = windowRef.current;
    const unit = unitRef.current;
    if (!windowElement || !unit) return;
    const measure = () => {
      const width = unit.getBoundingClientRect().width;
      if (!width) return;
      // Each of the two identical batches must be wider than the visible row.
      const copies = Math.max(
        1,
        Math.ceil(windowElement.clientWidth / width) + 1,
      );
      setLoop({ copies, duration: (copies * width) / 28 });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(windowElement);
    observer.observe(unit);
    measure();
    return () => observer.disconnect();
  }, [skills]);

  return (
    <div className="technology-window" ref={windowRef} aria-label={label}>
      <div
        className="technology-track"
        style={{ animationDuration: `${loop.duration}s` }}
      >
        {[0, 1].map((batch) => (
          <div key={batch} aria-hidden={batch === 1 ? true : undefined}>
            {Array.from({ length: loop.copies }, (_, copy) => (
              <div
                className="technology-unit"
                key={copy}
                ref={batch === 0 && copy === 0 ? unitRef : undefined}
                aria-hidden={copy > 0 ? true : undefined}
                data-loop-copy={copy > 0 ? '' : undefined}
              >
                {skills.map((name) => (
                  <TechBadge key={name} name={name} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
