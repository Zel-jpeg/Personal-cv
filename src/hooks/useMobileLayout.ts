import { useSyncExternalStore } from 'react';

const query = '(max-width: 850px)';
const subscribe = (onChange: () => void) => {
  const media = matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

export function useMobileLayout() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}
