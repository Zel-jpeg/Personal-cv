import { useEffect, useRef, type PointerEvent } from 'react';

// Pointer coordinates update CSS once per frame without re-rendering the card.
export function useCardSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

  const cancelFrame = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };

  useEffect(() => cancelFrame, []);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType === 'touch' ||
      !window.matchMedia('(any-hover: hover) and (any-pointer: fine)')
        .matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const { clientX, clientY } = event;
    cancelFrame();
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const card = ref.current;
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--spotlight-x', `${clientX - bounds.left}px`);
      card.style.setProperty('--spotlight-y', `${clientY - bounds.top}px`);
      card.style.setProperty('--spotlight-opacity', '1');
    });
  };

  const onPointerLeave = () => {
    cancelFrame();
    ref.current?.style.setProperty('--spotlight-opacity', '0');
  };

  return {
    ref,
    onPointerMove,
    onPointerLeave,
    onPointerCancel: onPointerLeave,
  };
}
