import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type Pose = { x: number; y: number; rotation: number; scale: number };
const duration = 520;
const fastestDuration = 200;

function stackPose(position: number): Pose {
  return {
    x: position * 6,
    y: position * -4,
    rotation: [-3, 5, 10, 14][position] ?? 14,
    scale: 1 - position * 0.1,
  };
}

function transform(pose: Pose) {
  return `translate3d(${pose.x}px, ${pose.y}px, 0) rotate(${pose.rotation}deg) scale(${pose.scale})`;
}

export function stackTransform(position: number) {
  return transform(stackPose(position));
}

// Damped spring response inspired by the reference's stiffness 260 / damping 20.
// Sampled transforms keep this implementation on the native Web Animations API.
function spring(seconds: number) {
  const frequency = Math.sqrt(260 - 10 * 10);
  return (
    1 -
    Math.exp(-10 * seconds) *
      (Math.cos(frequency * seconds) +
        (10 / frequency) * Math.sin(frequency * seconds))
  );
}

function between(from: Pose, to: Pose, progress: number): Pose {
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
    rotation: from.rotation + (to.rotation - from.rotation) * progress,
    scale: from.scale + (to.scale - from.scale) * progress,
  };
}

function shuffleFrames(
  position: number,
  nextPosition: number,
  count: number,
  direction: number,
): Keyframe[] {
  const from = stackPose(position);
  const to = stackPose(nextPosition);
  const outward: Pose = {
    x: direction * 32,
    y: -14,
    rotation: direction * 14,
    scale: 0.9,
  };
  return Array.from({ length: 61 }, (_, frame) => {
    const offset = frame / 60;
    let pose: Pose;
    if (position === 0) {
      // Slide aside, pass behind the others, then settle back without fading.
      pose =
        offset <= 0.24
          ? between(from, outward, 1 - (1 - offset / 0.24) ** 3)
          : between(
              outward,
              to,
              spring(((offset - 0.24) / 0.76) * 0.6) / spring(0.6),
            );
    } else {
      pose = between(from, to, spring(offset * 0.6) / spring(0.6));
    }
    return {
      offset,
      transform: transform(pose),
      zIndex:
        position === 0 && offset <= 0.24 ? count + 1 : count - nextPosition,
    };
  });
}

export function usePhotoShuffle(count: number) {
  const [order, setOrder] = useState(() =>
    Array.from({ length: count }, (_, index) => index),
  );
  const button = useRef<HTMLButtonElement>(null);
  const animations = useRef<Animation[]>([]);
  const currentOrder = useRef(order);
  const running = useRef(false);
  const mounted = useRef(true);
  const lastClick = useRef<number | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      animations.current.forEach((animation) => animation.cancel());
    };
  }, []);

  const shuffle = async () => {
    if (count < 2 || !mounted.current) return;
    const now = performance.now();
    const interval =
      lastClick.current === null ? duration : now - lastClick.current;
    lastClick.current = now;
    const targetDuration = Math.max(
      fastestDuration,
      Math.min(duration, interval),
    );
    const rate = duration / targetDuration;
    if (running.current) {
      // Fast input accelerates the current motion without scheduling more work.
      animations.current.forEach((motion) =>
        motion.updatePlaybackRate(Math.max(motion.playbackRate, rate)),
      );
      return;
    }
    const previous = currentOrder.current;
    const next = [...previous.slice(1), previous[0]];
    const direction = Math.random() < 0.5 ? -1 : 1;
    const cards =
      button.current?.querySelectorAll<HTMLElement>('[data-photo-index]');
    if (
      !cards?.length ||
      !cards[0].animate ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      currentOrder.current = next;
      setOrder(next);
      return;
    }

    running.current = true;
    const motions = [...cards].map((card) => {
      const photo = Number(card.dataset.photoIndex);
      const motion = card.animate(
        shuffleFrames(
          previous.indexOf(photo),
          next.indexOf(photo),
          count,
          direction,
        ),
        { duration, easing: 'linear', fill: 'forwards' },
      );
      motion.updatePlaybackRate(rate);
      return motion;
    });
    animations.current = motions;
    try {
      await Promise.all(motions.map((motion) => motion.finished));
      if (!mounted.current) return;
      // Commit matching resting poses before releasing animation styles.
      currentOrder.current = next;
      flushSync(() => setOrder(next));
    } catch {
      // Navigation cancels the current transition without reordering.
    } finally {
      motions.forEach((motion) => motion.cancel());
      animations.current = [];
      running.current = false;
    }
  };

  return { button, order, shuffle };
}
