import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionIntroProps {
  heading: string;
  subheading: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  className?: string;
  trailing?: ReactNode;
}

const SectionIntro = ({
  heading,
  subheading,
  eyebrow,
  align = 'left',
  className,
  trailing,
}: SectionIntroProps) => {
  const isCentered = align === 'center';

  return (
    <div
      className={cn(
        'mb-10 space-y-3 md:mb-12',
        isCentered && 'mx-auto max-w-3xl text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="shell-prompt font-mono text-xs font-bold tracking-widest text-term-green lowercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-mono text-2xl leading-tight font-bold tracking-tight text-foreground md:text-3xl">
        <span aria-hidden="true" className="text-primary">
          ##{' '}
        </span>
        {heading}
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{subheading}</p>
      {trailing}
    </div>
  );
};

export default SectionIntro;
