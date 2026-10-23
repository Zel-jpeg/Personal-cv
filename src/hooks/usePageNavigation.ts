import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';

const scrollPositions = new Map<string, number>();

// Keep native Back/Forward behavior while internal links stay in the same app.
export function usePageNavigation() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(location.pathname);
  useLayoutEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const samePage = previousPath.current === location.pathname;
    const saved =
      navigationType === 'POP' ? scrollPositions.get(location.key) : undefined;
    const anchor = document.getElementById(location.hash.slice(1));
    if (saved !== undefined) {
      window.scrollTo({ top: saved, behavior: 'instant' });
    } else if (anchor) {
      anchor.scrollIntoView({
        behavior:
          samePage &&
          navigationType !== 'POP' &&
          !matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'smooth'
            : 'instant',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (!samePage) {
      const heading = document.querySelector<HTMLElement>('main h1, main h2');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    }
    previousPath.current = location.pathname;
    return () => {
      scrollPositions.set(location.key, window.scrollY);
      history.scrollRestoration = previousRestoration;
    };
  }, [location.key, location.pathname, location.hash, navigationType]);
}
