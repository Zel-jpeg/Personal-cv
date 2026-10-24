import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setVisible(window.scrollY > 400);
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (!visible) return null;

  const backToTop = () => {
    const heading = document.querySelector<HTMLElement>('main h1, main h2');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };

  return createPortal(
    <button
      type="button"
      className="back-to-top"
      onClick={backToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>,
    document.body,
  );
}
