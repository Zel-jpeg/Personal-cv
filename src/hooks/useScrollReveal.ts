import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (
      !ref.current ||
      !('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const items = [
      ...ref.current.querySelectorAll<HTMLElement>('[data-reveal]'),
    ];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-waiting');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    items.forEach((item) => {
      item.classList.add('reveal-waiting');
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
      items.forEach((item) => item.classList.remove('reveal-waiting'));
    };
  }, []);
  return ref;
}
