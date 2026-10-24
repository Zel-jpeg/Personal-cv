import { useEffect, useRef, useState } from 'react';
import { chatGreeting, getPreparedReply, getQuickReply } from '../data/chat';
import type { ChatMessage, ChatReply } from '../data/chat';

export type ChatEntry = ChatMessage & {
  id: number;
  reply?: ChatReply;
  displayContent?: string;
  revealing?: boolean;
};
const greeting = (): ChatEntry => ({
  id: 0,
  role: 'assistant',
  content: chatGreeting,
});

function pause(milliseconds: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason);
      return;
    }
    const abort = () => {
      clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort);
      resolve();
    }, milliseconds);
    signal.addEventListener('abort', abort, { once: true });
  });
}

export function useZelChat() {
  const [messages, setMessages] = useState<ChatEntry[]>([greeting()]);
  const [busy, setBusy] = useState(false);
  const [awaitingReply, setAwaitingReply] = useState(false);
  const [notice, setNotice] = useState('');
  const [retryAt, setRetryAt] = useState(0);
  const nextId = useRef(1);
  const controller = useRef<AbortController | null>(null);
  const inFlight = useRef(false);

  useEffect(
    () => () => {
      controller.current?.abort();
      controller.current = null;
    },
    [],
  );

  const reset = () => {
    controller.current?.abort();
    controller.current = null;
    inFlight.current = false;
    setBusy(false);
    setAwaitingReply(false);
    setNotice('');
    setMessages([greeting()]);
  };

  const send = (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || question.length > 600 || inFlight.current) return false;
    if (Date.now() < retryAt) {
      setNotice(
        'Please wait a minute before asking another question. You can still browse the links or send me a message.',
      );
      return false;
    }
    const user: ChatEntry = {
      id: nextId.current++,
      role: 'user',
      content: question,
    };
    const history = messages
      .filter((message) => message.id !== 0)
      .slice(-6)
      .map(({ role, content }) => ({ role, content }));
    setMessages((previous) => [...previous, user].slice(-40));
    setNotice('');
    const activeController = new AbortController();
    controller.current = activeController;
    inFlight.current = true;
    setBusy(true);
    setAwaitingReply(true);
    const started = performance.now();
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

    const requestReply = async (): Promise<ChatReply> => {
      const quick = getQuickReply(question);
      if (quick) return quick;
      try {
        const response = await fetch('/api/zel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.any([
            activeController.signal,
            AbortSignal.timeout(24000),
          ]),
          body: JSON.stringify({
            messages: [...history, { role: 'user', content: question }],
          }),
        });
        if (response.status === 429) {
          setRetryAt(Date.now() + 60_000);
          setNotice(
            'Please give me a minute before the next question. Here’s what I can share from my portfolio.',
          );
        }
        if (!response.ok) throw new Error('Chat unavailable');
        const reply: ChatReply = await response.json();
        if (
          typeof reply.text !== 'string' ||
          !['ai', 'portfolio'].includes(reply.source)
        )
          throw new Error('Invalid reply');
        // Links are chosen locally from verified data; never trust model URLs.
        return {
          text: reply.text.slice(0, 1800),
          source: reply.source,
          ...(reply.source === 'portfolio'
            ? getPreparedReply(question, history)
            : {}),
        };
      } catch {
        return getPreparedReply(question, history);
      }
    };

    const deliver = async () => {
      try {
        const reply = await requestReply();
        if (activeController.signal.aborted) return;
        const wait = reducedMotion.matches
          ? 0
          : Math.max(0, 600 - (performance.now() - started));
        if (wait) await pause(wait, activeController.signal);
        if (activeController.signal.aborted) return;
        setAwaitingReply(false);
        const id = nextId.current++;
        const animated = !reducedMotion.matches;
        setMessages((previous) =>
          [
            ...previous,
            {
              id,
              role: 'assistant' as const,
              content: reply.text,
              reply,
              ...(animated ? { displayContent: '', revealing: true } : {}),
            },
          ].slice(-40),
        );

        if (animated) {
          await new Promise<void>((resolve, reject) => {
            const duration = Math.min(
              1400,
              Math.max(450, reply.text.length * 4),
            );
            const start = performance.now();
            let frame = 0;
            let previousEnd = -1;
            const abort = () => {
              cancelAnimationFrame(frame);
              reject(activeController.signal.reason);
            };
            const tick = (now: number) => {
              if (activeController.signal.aborted) {
                abort();
                return;
              }
              const progress = reducedMotion.matches
                ? 1
                : Math.min(1, (now - start) / duration);
              const target = Math.ceil(reply.text.length * progress);
              const boundary = reply.text.indexOf(' ', target);
              const end =
                progress === 1 || boundary === -1
                  ? reply.text.length
                  : boundary;
              if (end !== previousEnd || progress === 1) {
                setMessages((previous) =>
                  previous.map((message) =>
                    message.id === id
                      ? {
                          ...message,
                          displayContent:
                            progress === 1
                              ? undefined
                              : reply.text.slice(0, end),
                          revealing: progress < 1,
                        }
                      : message,
                  ),
                );
                previousEnd = end;
              }
              if (progress < 1) frame = requestAnimationFrame(tick);
              else {
                activeController.signal.removeEventListener('abort', abort);
                resolve();
              }
            };
            activeController.signal.addEventListener('abort', abort, {
              once: true,
            });
            frame = requestAnimationFrame(tick);
          });
        }
      } catch {
        // Reset/unmount cancels pending delays and frames without a late reply.
      } finally {
        if (controller.current === activeController) {
          inFlight.current = false;
          setBusy(false);
          setAwaitingReply(false);
        }
      }
    };
    void deliver();
    return true;
  };
  return { messages, busy, awaitingReply, notice, send, reset };
}
