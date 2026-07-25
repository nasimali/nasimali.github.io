import DynamicIcon, { type LucideIconName } from '@/components/DynamicIcon';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useConfigData } from '@/contexts/ConfigContext';
import { scrollToSection } from '@/lib/scroll';
import { ExternalLink, Hash, MoonStar, SunMedium, Terminal } from 'lucide-react';
import { useEffect } from 'react';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDark: boolean;
  toggleTheme: () => void;
  setActiveSection: (sectionId: string) => void;
}

const CommandPalette = ({
  open,
  setOpen,
  isDark,
  toggleTheme,
  setActiveSection,
}: CommandPaletteProps) => {
  const {
    textContent: { navLinks, contact },
  } = useConfigData();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  const goTo = (sectionId: string) => {
    setOpen(false);
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a section or run a command"
      className="border-border font-mono"
    >
      <CommandInput placeholder="type a command or search..." />
      <CommandList>
        <CommandEmpty className="py-6 text-center font-mono text-sm text-muted-foreground">
          command not found. try `help`
        </CommandEmpty>

        <CommandGroup heading="cd ~/sections">
          {navLinks.map((link) => (
            <CommandItem key={link.id} onSelect={() => goTo(link.id)}>
              <Hash className="text-primary" />
              <span className="font-mono">./{link.id}</span>
              <CommandShortcut className="font-mono">{link.label}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="system">
          <CommandItem
            onSelect={() => {
              toggleTheme();
              setOpen(false);
            }}
          >
            {isDark ? (
              <SunMedium className="text-term-amber" />
            ) : (
              <MoonStar className="text-term-purple" />
            )}
            <span className="font-mono">theme --set {isDark ? 'paper' : 'charcoal'}</span>
          </CommandItem>
          <CommandItem keywords={['hire', 'sudo', 'email']} onSelect={() => goTo('contact')}>
            <Terminal className="text-term-green" />
            <span className="font-mono">sudo hire-nasim</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="open --external">
          {contact.socialLinks.map((social) => (
            <CommandItem
              key={social.id}
              onSelect={() => {
                setOpen(false);
                window.open(social.url, '_blank', 'noopener,noreferrer');
              }}
            >
              <DynamicIcon name={social.iconName as LucideIconName} className="text-term-blue" />
              <span className="font-mono">open {social.label.toLowerCase()}</span>
              <CommandShortcut>
                <ExternalLink className="size-3.5" />
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
