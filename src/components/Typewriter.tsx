import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
  className?: string;
  showCursorWhileTyping?: boolean;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Types text one character at a time; renders instantly when the user
 * prefers reduced motion.
 */
const Typewriter = ({
  text,
  speed = 32,
  startDelay = 0,
  onDone,
  className,
  showCursorWhileTyping = true,
}: TypewriterProps) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const isDone = visibleChars >= text.length;

  useEffect(() => {
    setVisibleChars(0);

    if (prefersReducedMotion()) {
      setVisibleChars(text.length);
      const doneTimeout = window.setTimeout(() => onDoneRef.current?.(), 60);
      return () => window.clearTimeout(doneTimeout);
    }

    let intervalId: number | undefined;
    const startTimeout = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleChars((current) => {
          if (current >= text.length) {
            window.clearInterval(intervalId);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  useEffect(() => {
    if (isDone && text.length > 0) {
      onDoneRef.current?.();
    }
  }, [isDone, text]);

  return (
    <span className={cn('font-mono', className)}>
      {text.slice(0, visibleChars)}
      {!isDone && showCursorWhileTyping && (
        <span aria-hidden="true" className="text-primary">
          ▊
        </span>
      )}
    </span>
  );
};

export default Typewriter;
