import { useEffect, useRef, useState } from 'react';

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loading: Promise<Turnstile> | undefined;
function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loading) return loading;
  loading = new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement('script');
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    const fail = () => {
      clearTimeout(timeout);
      script.remove();
      loading = undefined;
      reject(new Error('Verification unavailable'));
    };
    const timeout = window.setTimeout(fail, 12000);
    script.onerror = fail;
    script.onload = () => {
      if (!window.turnstile) {
        fail();
        return;
      }
      clearTimeout(timeout);
      resolve(window.turnstile);
    };
    document.head.append(script);
  });
  return loading;
}

export default function ZelCaptcha({
  siteKey,
  resetKey,
  onToken,
}: {
  siteKey: string;
  resetKey: number;
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    let widget: string | undefined;
    let api: Turnstile | undefined;
    onToken('');
    setFailed(false);
    loadTurnstile()
      .then((loaded) => {
        if (cancelled || !container.current) return;
        api = loaded;
        widget = api.render(container.current, {
          sitekey: siteKey,
          size: 'compact',
          theme:
            document.documentElement.dataset.theme === 'dark'
              ? 'dark'
              : 'light',
          'response-field': false,
          callback: (token: string) => {
            if (!cancelled) {
              setFailed(false);
              onToken(token);
            }
          },
          'expired-callback': () => {
            if (!cancelled) onToken('');
          },
          'timeout-callback': () => {
            if (!cancelled) {
              onToken('');
              setFailed(true);
            }
          },
          'error-callback': () => {
            if (!cancelled) {
              onToken('');
              setFailed(true);
            }
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          onToken('');
          setFailed(true);
        }
      });
    return () => {
      cancelled = true;
      if (api && widget !== undefined) api.remove(widget);
      onToken('');
    };
  }, [siteKey, resetKey, attempt, onToken]);
  return (
    <div className="zel-captcha">
      <div ref={container} />
      {failed && (
        <p role="status">
          Verification couldn't load.{' '}
          <button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Try again
          </button>
        </p>
      )}
    </div>
  );
}
