import React from 'react';
import DynamicIcon from '@/components/DynamicIcon';
import { getConfigData } from '@/lib/fetchConfig.ts';

const Footer: React.FC = () => {
  const {
    textContent: { footer },
  } = getConfigData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {footer.copyright}
          </p>
          <p className="text-xs text-muted-foreground flex items-center flex-wrap justify-center sm:justify-end">
            <span className="mr-1">{footer.builtWith}</span>
            <DynamicIcon
              name="Heart"
              className="inline h-3.5 w-3.5 text-red-500"
              aria-label={footer.heartIconAlt}
            />
            <span className="ml-1 mr-1">{footer.tools}.</span>
            <span className="mr-1 hidden sm:inline">|</span>
            <span className="mr-1">{footer.fueledBy}</span>
            <DynamicIcon
              name="Coffee"
              className="inline h-3.5 w-3.5 text-amber-600 dark:text-amber-400"
              aria-label={footer.coffeeIconAlt}
            />
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
