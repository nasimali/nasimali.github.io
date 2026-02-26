import { useEffect, useState } from 'react';
import { Menu, MoonStar, SunMedium } from 'lucide-react';
import { getConfigData } from '@/lib/fetchConfig';
import { scrollToSection } from '@/lib/scroll';
import type { NavLinkItem } from '@/lib/types';
import { cn } from '@/lib/utils';
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

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

const Navbar = ({ isDark, toggleTheme, activeSection, setActiveSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    textContent: { siteName, navLinks },
  } = getConfigData();

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
      'h-9 rounded-full px-4 text-sm font-medium transition-all duration-200',
      activeSection === itemId
        ? 'bg-primary text-primary-foreground shadow-sm'
        : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground'
    );

  const navItems = (itemsClassName?: string) =>
    navLinks.map((item: NavLinkItem) => (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(navButtonClass(item.id), itemsClassName)}
        onClick={() => handleNavigation(item.id)}
      >
        {item.label}
      </Button>
    ));

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-all duration-300',
        isScrolled
          ? 'border-border/80 bg-background/85 backdrop-blur-xl'
          : 'border-transparent bg-background/30 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="font-display h-auto rounded-full px-3 py-2 text-xl tracking-tight text-foreground hover:bg-accent/60"
          onClick={() => handleNavigation('home')}
        >
          {siteName}
        </Button>

        <div className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/80 p-1 md:flex">
          {navItems()}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full border-border/70 bg-background/80"
          >
            {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border/70 bg-background/80 md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[84vw] border-border/80 bg-background/95 sm:w-[400px]"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-2xl tracking-tight">{siteName}</SheetTitle>
                <SheetDescription>Navigate between sections.</SheetDescription>
              </SheetHeader>
              <Separator className="bg-border/70" />
              <div className="space-y-2 px-6 pb-8">
                {navItems('w-full justify-start rounded-xl text-base')}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
