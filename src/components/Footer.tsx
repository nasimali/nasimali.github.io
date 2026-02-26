import DynamicIcon from '@/components/DynamicIcon';
import { Separator } from '@/components/ui/separator';
import { getConfigData } from '@/lib/fetchConfig';

const Footer = () => {
  const {
    textContent: { footer },
  } = getConfigData();

  const year = new Date().getFullYear();

  return (
    <footer className="pb-10 pt-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Separator className="mb-6 bg-border/70" />
        <div className="flex flex-col items-start justify-between gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; {year} {footer.copyright}
          </p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span>{footer.builtWith}</span>
            <DynamicIcon
              name="Heart"
              className="h-3.5 w-3.5 text-rose-500"
              aria-label={footer.heartIconAlt}
            />
            <span>{footer.tools}</span>
            <span className="mx-1">|</span>
            <span>{footer.fueledBy}</span>
            <DynamicIcon
              name="Coffee"
              className="h-3.5 w-3.5 text-amber-500"
              aria-label={footer.coffeeIconAlt}
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
