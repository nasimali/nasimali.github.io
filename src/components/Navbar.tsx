import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useConfigData } from '@/contexts/ConfigContext';
import { scrollToSection } from '@/lib/scroll';
import type { NavLinkItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Menu, MoonStar, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  onOpenPalette: () => void;
}

const Navbar = ({
  isDark,
  toggleTheme,
  activeSection,
  setActiveSection,
  onOpenPalette,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    textContent: { siteName, navLinks },
  } = useConfigData();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navButtonClass = (itemId: string) =>
    cn(
      'h-8 rounded-md px-3 font-mono text-xs transition-all duration-200',
      activeSection === itemId
        ? 'bg-primary text-primary-foreground font-bold shadow-none'
        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
    );

  const navItems = (itemsClassName?: string) =>
    navLinks.map((item: NavLinkItem) => (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(navButtonClass(item.id), itemsClassName)}
        onClick={() => handleNavigation(item.id)}
      >
        ./{item.id}
      </Button>
    ));

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-all duration-300',
        isScrolled
          ? 'border-border bg-background/90 backdrop-blur-xl'
          : 'border-transparent bg-background/40 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <span className="hidden items-center gap-1.5 lg:flex" aria-hidden="true">
          <span className="term-dot term-dot-red" />
          <span className="term-dot term-dot-amber" />
          <span className="term-dot term-dot-green" />
        </span>

        <Button
          variant="ghost"
          className="h-auto gap-0 rounded-md px-2 py-1.5 font-mono text-sm font-bold tracking-tight text-foreground hover:bg-accent"
          onClick={() => handleNavigation('home')}
          aria-label={`${siteName} — back to top`}
        >
          <span className="text-term-green">nasim@dev</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-term-blue">~/{activeSection === 'home' ? '' : activeSection}</span>
          <span aria-hidden="true" className="animate-blink text-primary">
            ▊
          </span>
        </Button>

        <div className="ml-auto hidden items-center gap-0.5 rounded-lg border bg-card/80 p-1 md:flex">
          {navItems()}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden h-8 gap-1.5 px-2.5 font-mono text-xs text-muted-foreground sm:flex"
          >
            <kbd className="font-mono text-[10px] font-bold">⌘K</kbd>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="size-8 rounded-md"
          >
            {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-md md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[84vw] border-border bg-background sm:w-100">
              <SheetHeader>
                <SheetTitle className="font-mono text-lg tracking-tight">
                  <span className="text-term-green">nasim@dev</span>
                  <span className="text-muted-foreground">:~$</span>
                </SheetTitle>
                <SheetDescription className="font-mono text-xs">cd into a section</SheetDescription>
              </SheetHeader>
              <Separator />
              <div className="space-y-1.5 px-6 pb-8 pt-4">
                {navItems('w-full justify-start rounded-md text-sm')}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
