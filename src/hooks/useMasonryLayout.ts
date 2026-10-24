import { useLayoutEffect, type RefObject } from 'react';

// Place each card in the shortest column, independently of its image loading.
export function useMasonryLayout(
  ref: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || !enabled) return;
    const cards = [
      ...container.querySelectorAll<HTMLElement>('.gallery-position'),
    ];
    let frame = 0;
    let readyFrame = 0;
    let previousWidth = 0;
    let previousColumns = 0;

    const layout = () => {
      frame = 0;
      const styles = getComputedStyle(container);
      const columns = Number(styles.getPropertyValue('--gallery-columns')) || 2;
      const gap =
        Number.parseFloat(styles.getPropertyValue('--gallery-gap')) || 12;
      const width = container.clientWidth;
      if (!width || (width === previousWidth && columns === previousColumns))
        return;
      previousWidth = width;
      previousColumns = columns;
      const columnWidth = (width - gap * (columns - 1)) / columns;
      const stagger =
        Number.parseFloat(styles.getPropertyValue('--gallery-stagger')) || 0;
      const heights = Array.from({ length: columns }, (_, column) =>
        column % 2 === 1 ? stagger : 0,
      );

      cards.forEach((card, index) => {
        const [numerator, denominator] = (card.dataset.aspect ?? '3 / 4')
          .split('/')
          .map(Number);
        const ratio = numerator / denominator;
        const height = columnWidth / (ratio > 0 ? ratio : 0.75);
        const column =
          index < columns ? index : heights.indexOf(Math.min(...heights));
        card.style.width = `${columnWidth}px`;
        card.style.height = `${height}px`;
        card.style.setProperty('--tile-x', `${column * (columnWidth + gap)}px`);
        card.style.setProperty('--tile-y', `${heights[column]}px`);
        heights[column] += height + gap;
      });
      container.style.height = `${Math.max(...heights) - gap}px`;
      readyFrame = requestAnimationFrame(() =>
        container.classList.add('is-laid-out'),
      );
    };
    const scheduleLayout = () => {
      if (!frame) frame = requestAnimationFrame(layout);
    };
    layout();
    const observer = new ResizeObserver(scheduleLayout);
    observer.observe(container);
    window.addEventListener('resize', scheduleLayout, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', scheduleLayout);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(readyFrame);
      container.classList.remove('is-laid-out');
      container.style.removeProperty('height');
      cards.forEach((card) => {
        card.style.removeProperty('width');
        card.style.removeProperty('height');
        card.style.removeProperty('--tile-x');
        card.style.removeProperty('--tile-y');
      });
    };
  }, [ref, enabled]);
}
