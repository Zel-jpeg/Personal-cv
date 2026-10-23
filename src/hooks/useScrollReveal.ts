import { useLayoutEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
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
            const image = entry.target.querySelector('img');
            const reveal = () => {
              if (!cancelled) entry.target.classList.remove('reveal-waiting');
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
    items.forEach((item) => item.classList.add('reveal-waiting'));
    // Give the hidden starting position a paint before observing cached images.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        items.forEach((item) => observer.observe(item));
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer.disconnect();
      items.forEach((item) => item.classList.remove('reveal-waiting'));
    };
  }, []);
  return ref;
}
