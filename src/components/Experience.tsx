import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import TerminalWindow from '@/components/TerminalWindow';
import { Badge } from '@/components/ui/badge';
import { useConfigData } from '@/contexts/ConfigContext';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import * as m from 'framer-motion/m';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

/** Deterministic 7-char pseudo commit hash so entries look like `git log` output. */
const commitHash = (seed: string) => {
  let hash = 0;
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash.toString(16).padStart(7, '0').slice(0, 7);
};

const Experience = () => {
  const {
    experience,
    textContent: { experience: experienceSection },
  } = useConfigData();

  const [openItemId, setOpenItemId] = useState<string | null>(experience[0]?.id ?? null);

  const toggleItem = (itemId: string) => {
    setOpenItemId((prevOpenItemId) => (prevOpenItemId === itemId ? null : itemId));
  };

  return (
    <section id="experience" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="git log --oneline --career"
          heading={experienceSection.heading}
          subheading={experienceSection.subheading}
        />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <TerminalWindow title="git log — branch: career" contentClassName="p-0 sm:p-0">
            <div className="relative">
              {/* branch line */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-7 w-px bg-border sm:left-9"
              />

              {experience.map((item) => {
                const isOpen = openItemId === item.id;
                const hash = commitHash(item.id);

                return (
                  <div key={item.id} className="relative border-b last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="flex w-full cursor-pointer items-center gap-3 py-5 pr-5 pl-4 text-left transition-colors hover:bg-accent/40 sm:gap-4 sm:pl-6"
                      aria-expanded={isOpen}
                      aria-controls={`experience-panel-${item.id}`}
                    >
                      {/* commit dot on the branch line */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-card sm:size-7',
                          isOpen ? 'border-primary' : 'border-border'
                        )}
                      >
                        <DynamicIcon
                          name={item.iconName}
                          className={cn(
                            'size-3 sm:size-3.5',
                            isOpen ? 'text-primary' : 'text-muted-foreground'
                          )}
                        />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-baseline gap-x-2 font-mono text-sm sm:text-base">
                          <span className="font-bold text-term-amber">{hash}</span>
                          <span className="font-bold text-foreground">{item.role}</span>
                          <span className="text-muted-foreground">@ {item.company}</span>
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground sm:text-xs">
                          <span className="text-term-green">Date:</span> {item.duration}
                        </p>
                      </div>

                      <ChevronDown
                        className={cn(
                          'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
                          isOpen && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          id={`experience-panel-${item.id}`}
                          key={`content-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pr-5 pb-5 pl-13 sm:pl-17">
                            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                              {item.descriptionPoints.map((point, index) => (
                                <li key={index} className="flex gap-2.5">
                                  <span
                                    aria-hidden="true"
                                    className="font-mono text-xs font-bold text-primary"
                                  >
                                    +
                                  </span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>

                            {item.skills && item.skills.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {item.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="rounded-sm font-mono text-[10px] lowercase"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <p className="cursor-block py-4 pl-4 font-mono text-xs text-muted-foreground sm:pl-6">
                git checkout --future
              </p>
            </div>
          </TerminalWindow>
        </m.div>
      </div>
    </section>
  );
};

export default Experience;
