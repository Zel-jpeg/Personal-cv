import { useLayoutEffect, useState } from 'react';

export function useCondensedHeader(enabled: boolean) {
  const [condensed, setCondensed] = useState(false);
  useLayoutEffect(() => {
    if (!enabled) return;
    const marker = document.getElementById('profile-header-marker');
    if (!marker) return;
    const update = () =>
      setCondensed(marker.getBoundingClientRect().bottom <= 0);
    update();
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) =>
          setCondensed(
            !entry.isIntersecting && entry.boundingClientRect.top < 0,
          ),
        { threshold: 0 },
      );
      observer.observe(marker);
      return () => observer.disconnect();
    }
    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          update();
          frame = 0;
        });
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [enabled]);
  return condensed;
}
