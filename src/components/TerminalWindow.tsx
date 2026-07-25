import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Reusable retro terminal window chrome: traffic-light dots, mono title, content well.
 */
const TerminalWindow = ({ title, children, className, contentClassName }: TerminalWindowProps) => {
  return (
    <div className={cn('term-window', className)}>
      <div className="term-titlebar">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="term-dot term-dot-red" />
          <span className="term-dot term-dot-amber" />
          <span className="term-dot term-dot-green" />
        </span>
        <span className="mx-auto truncate pr-12 font-mono text-xs text-muted-foreground">
          {title}
        </span>
      </div>
      <div className={cn('p-5 sm:p-6', contentClassName)}>{children}</div>
    </div>
  );
};

export default TerminalWindow;
