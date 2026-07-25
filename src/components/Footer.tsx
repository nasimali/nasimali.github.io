import DynamicIcon from '@/components/DynamicIcon';
import { useConfigData } from '@/contexts/ConfigContext';
import { GitBranch } from 'lucide-react';

/** tmux/vim-style statusline footer. */
const Footer = () => {
  const {
    textContent: { footer },
  } = useConfigData();

  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pt-6 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-md border font-mono text-xs">
        <div className="flex flex-col items-stretch sm:flex-row sm:items-center">
          <span className="flex items-center justify-center bg-primary px-3 py-2 font-bold tracking-widest text-primary-foreground uppercase">
            -- normal --
          </span>
          <span className="hidden items-center gap-1.5 border-r bg-secondary/70 px-3 py-2 font-bold text-muted-foreground sm:flex">
            <GitBranch className="size-3.5" aria-hidden="true" />
            main
          </span>

          <span className="flex items-center justify-center gap-1.5 px-3 py-2 text-muted-foreground sm:justify-start">
            &copy; {year} {footer.copyright}
          </span>

          <span className="flex flex-wrap items-center justify-center gap-1.5 border-t px-3 py-2 text-muted-foreground sm:ml-auto sm:justify-end sm:border-t-0">
            <span>{footer.builtWith}</span>
            <DynamicIcon
              name="Heart"
              className="size-3.5 text-term-red"
              aria-label={footer.heartIconAlt}
            />
            <span>{footer.tools}</span>
            <span aria-hidden="true" className="text-border">
              |
            </span>
            <span>{footer.fueledBy}</span>
            <DynamicIcon
              name="Coffee"
              className="size-3.5 text-term-amber"
              aria-label={footer.coffeeIconAlt}
            />
          </span>

          <span
            aria-hidden="true"
            className="hidden items-center bg-secondary/70 px-3 py-2 font-bold text-term-green sm:flex"
          >
            0:zsh*
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
