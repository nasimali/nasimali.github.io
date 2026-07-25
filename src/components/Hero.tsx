import DynamicIcon, { type LucideIconName } from '@/components/DynamicIcon';
import TerminalWindow from '@/components/TerminalWindow';
import Typewriter from '@/components/Typewriter';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useConfigData } from '@/contexts/ConfigContext';
import { renderAsciiBanner } from '@/lib/ascii';
import { scrollToSection } from '@/lib/scroll';
import * as m from 'framer-motion/m';
import { useMemo, useState } from 'react';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const Prompt = () => (
  <span className="shrink-0 font-mono">
    <span className="font-bold text-term-green">nasim@dev</span>
    <span className="text-muted-foreground">:</span>
    <span className="font-bold text-term-blue">~</span>
    <span className="text-muted-foreground">${' '}</span>
  </span>
);

const OutputBlock = ({ children }: { children: React.ReactNode }) => (
  <m.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="pl-0 sm:pl-4"
  >
    {children}
  </m.div>
);

const Hero = () => {
  const {
    projects,
    skills,
    experience,
    uiProps,
    textContent: { hero, contact, navLinks },
  } = useConfigData();

  const [step, setStep] = useState(0);

  const asciiName = useMemo(() => renderAsciiBanner(hero.name), [hero.name]);

  const navLabelById = new Map(navLinks.map((link) => [link.id, link.label]));
  const systemStats = [
    { id: 'projects', value: projects.length, label: navLabelById.get('projects') ?? 'Projects' },
    {
      id: 'experience',
      value: experience.length,
      label: navLabelById.get('experience') ?? 'Experience',
    },
    { id: 'skills', value: skills.length, label: navLabelById.get('skills') ?? 'Skills' },
  ];
  const maxStat = Math.max(...systemStats.map((stat) => stat.value), 1);

  return (
    <section id="home" className="relative pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <TerminalWindow
            title="nasim@dev: ~/portfolio — zsh"
            contentClassName="min-h-[26rem] space-y-4 font-mono text-sm leading-relaxed sm:min-h-[28rem]"
          >
            <div className="flex flex-wrap items-baseline">
              <Prompt />
              <Typewriter
                text="whoami"
                startDelay={350}
                onDone={() => setStep((s) => Math.max(s, 1))}
              />
            </div>

            {step >= 1 && (
              <OutputBlock>
                <pre
                  aria-hidden="true"
                  className="overflow-x-auto text-[clamp(4px,1.1vw,8px)] leading-[1.15] font-bold text-primary sm:text-[8px]"
                >
                  {asciiName}
                </pre>
                <h1 className="sr-only">{hero.name}</h1>
                <p className="mt-3 text-base font-bold text-foreground sm:text-lg">
                  <span className="text-term-amber">λ</span> {hero.title}
                </p>
              </OutputBlock>
            )}

            {step >= 1 && (
              <div className="flex flex-wrap items-baseline">
                <Prompt />
                <Typewriter
                  text="cat ./mission.txt"
                  onDone={() => setStep((s) => Math.max(s, 2))}
                />
              </div>
            )}

            {step >= 2 && (
              <OutputBlock>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {hero.subtitle}
                </p>
              </OutputBlock>
            )}

            {step >= 2 && (
              <div className="flex flex-wrap items-baseline">
                <Prompt />
                <Typewriter text="./connect --now" onDone={() => setStep((s) => Math.max(s, 3))} />
              </div>
            )}

            {step >= 3 && (
              <OutputBlock>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                  <Button
                    size="lg"
                    className="group font-mono font-bold"
                    onClick={() => scrollToSection('projects')}
                  >
                    ./{slugify(hero.ctaViewWork)}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-mono"
                    onClick={() => scrollToSection('contact')}
                  >
                    ./{slugify(hero.ctaGetInTouch)}
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-4">
                  {contact.socialLinks.map((social) => (
                    <Button
                      key={social.id}
                      variant="secondary"
                      size="sm"
                      className="font-mono text-xs"
                      asChild
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <DynamicIcon
                          name={social.iconName as LucideIconName}
                          className="size-3.5 text-primary"
                        />
                        {social.label.toLowerCase()}
                      </a>
                    </Button>
                  ))}
                </div>

                <p className="cursor-block pt-4 font-mono text-sm text-muted-foreground">
                  <Prompt />
                </p>
              </OutputBlock>
            )}
          </TerminalWindow>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65, ease: 'easeOut' }}
        >
          <TerminalWindow
            title="htop — session snapshot"
            contentClassName="space-y-5 font-mono text-sm"
          >
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
              <span className="animate-pulse-dot inline-block size-2 rounded-full bg-term-green" />
              <span className="text-term-green">status: online</span>
              <span className="ml-auto text-muted-foreground">v{new Date().getFullYear()}</span>
            </div>

            <div className="space-y-3">
              {systemStats.map((stat) => (
                <div key={stat.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-muted-foreground lowercase">{stat.label}</span>
                    <span className="font-bold text-foreground">
                      {String(stat.value).padStart(2, '0')}
                    </span>
                  </div>
                  <Progress
                    value={(stat.value / maxStat) * 100}
                    aria-label={`${stat.label}: ${stat.value}`}
                    className="h-2 rounded-sm"
                  />
                </div>
              ))}
            </div>

            <div className="rounded-md border border-dashed border-border bg-background/60 p-3.5 text-xs leading-relaxed text-muted-foreground">
              <p className="code-comment mb-1.5 font-bold">stdout</p>
              {uiProps.hero.snapshotDescription}
            </div>

            <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
              {uiProps.hero.snapshotReflections.map((reflection, index) => (
                <li key={index} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-term-green">
                    ✓
                  </span>
                  <span>{reflection}</span>
                </li>
              ))}
            </ul>
          </TerminalWindow>
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
