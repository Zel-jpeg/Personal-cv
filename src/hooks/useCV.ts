import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';
const themeKey = 'azel-cv-portfolio-theme';

export function useCV(path: string) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem(themeKey) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(themeKey, theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>('.resume-content > section'),
    ];
    if (!sections.length) return;
    let frame = 0;
    function updateNavigation() {
      let current: HTMLElement | undefined = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 160) current = section;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 3
      ) {
        current = sections.at(-1);
      }
      if (current) setActiveSection(current.id);
      frame = 0;
    }
    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateNavigation);
    }
    updateNavigation();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    const pending: HTMLElement[] = [];
    let observer: IntersectionObserver | undefined;
    if (
      'IntersectionObserver' in window &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.remove('is-pending');
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.05 },
      );
      document.querySelectorAll<HTMLElement>('.reveal').forEach((section) => {
        if (section.getBoundingClientRect().top >= window.innerHeight) {
          pending.push(section);
          section.classList.add('is-pending');
          observer?.observe(section);
        }
      });
    }
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(frame);
      observer?.disconnect();
      pending.forEach((section) => section.classList.remove('is-pending'));
    };
  }, [path]);

  return {
    theme,
    toggleTheme: () => {
      const update = () => {
        flushSync(() =>
          setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
        );
      };
      if (
        document.startViewTransition &&
        !matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        document.startViewTransition(update);
      } else update();
    },
    activeSection,
    setActiveSection,
  };
}
