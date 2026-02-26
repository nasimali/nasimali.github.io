import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
        'mb-10 space-y-4 md:mb-12',
        isCentered && 'mx-auto max-w-3xl text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-primary/90 text-xs font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
        {heading}
      </h2>
      <p className="text-muted-foreground text-base leading-relaxed md:text-lg">{subheading}</p>
      {trailing}
    </div>
  );
};

export default SectionIntro;
