import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button.tsx';
import type { NavLinkItem, NavLinkProps } from '../lib/types.ts';
import { getConfigData } from '../lib/fetchConfig.ts';

const NavLink: React.FC<NavLinkProps> = ({
  item,
  activeSection,
  setActiveSection,
  children,
  onClick,
}) => (
  <a
    href={`#${item.id}`}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors block sm:inline-block w-full text-left sm:w-auto sm:text-center
      ${
        activeSection === item.id
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
      }`}
    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveSection(item.id);
      const element = document.getElementById(item.id);
      if (element) {
        const navbarHeight = (document.querySelector('nav')?.offsetHeight || 64) + 16;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      if (onClick) onClick();
    }}
  >
    {children}
  </a>
);

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}
// props - darkMode, toggleDarkMode,
const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { siteName, navLinks } = getConfigData().textContent;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        // 768px is md breakpoint in Tailwind
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 
      ${isScrolled || mobileMenuOpen ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-md border-b border-border/40' : 'bg-transparent border-b border-transparent'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a
          href="#home"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setActiveSection('home');
            // Scroll to the very top for #home
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (mobileMenuOpen) setMobileMenuOpen(false);
          }}
          className="text-2xl font-bold text-primary transition-colors hover:text-primary/80"
          aria-label="Homepage"
        >
          {siteName}
        </a>
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((item: NavLinkItem) => (
            <NavLink
              key={item.id}
              item={item}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center">
          {/*<Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode" className="text-muted-foreground hover:text-foreground">*/}
          {/*    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}*/}
          {/*</Button>*/}
          <div className="md:hidden ml-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg border-t border-border/40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((item: NavLinkItem) => (
              <NavLink
                key={item.id}
                item={item}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
