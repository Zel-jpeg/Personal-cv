import { useLayoutEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(fromBottom = false) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    if (
      !ref.current ||
      !('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const items = [
      ...ref.current.querySelectorAll<HTMLElement>('[data-reveal]'),
    ];
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            const item =
              entry.target.querySelector<HTMLElement>('[data-reveal]') ??
              entry.target;
            const image = item.querySelector('img');
            const reveal = () => {
              if (!cancelled) item.classList.remove('reveal-waiting');
            };
            if (image && !image.complete)
              image
                .decode()
                .catch(() => {})
                .then(reveal);
            else reveal();
          }
        }),
      { threshold: 0.08 },
    );
    items.forEach((item) => {
      if (fromBottom) {
        const trigger = item.closest('[data-reveal-trigger]') ?? item;
        const distance = Math.max(
          100,
          window.innerHeight - trigger.getBoundingClientRect().top + 80,
        );
        item.style.setProperty('--reveal-distance', `${distance}px`);
      }
      item.classList.add('reveal-waiting');
    });
    // Give the hidden starting position a paint before observing cached images.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        items.forEach((item) =>
          observer.observe(item.closest('[data-reveal-trigger]') ?? item),
        );
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer.disconnect();
      items.forEach((item) => {
        item.classList.remove('reveal-waiting');
        item.style.removeProperty('--reveal-distance');
      });
    };
  }, [fromBottom]);
  return ref;
}
