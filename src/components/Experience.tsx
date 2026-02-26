import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getConfigData } from '@/lib/fetchConfig';
import { cn } from '@/lib/utils';

const Experience = () => {
  const {
    experience,
    textContent: { experience: experienceSection },
  } = getConfigData();

  const [openItemId, setOpenItemId] = useState<string | null>(experience[0]?.id ?? null);

  const toggleItem = (itemId: string) => {
    setOpenItemId((prevOpenItemId) => (prevOpenItemId === itemId ? null : itemId));
  };

  return (
    <section id="experience" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Career"
          heading={experienceSection.heading}
          subheading={experienceSection.subheading}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <Card className="glass-panel border-border/70 py-0">
            <CardContent className="px-0 py-0">
              <div className="divide-y divide-border/65">
                {experience.map((item) => {
                  const isOpen = openItemId === item.id;

                  return (
                    <div key={item.id} className="px-6 sm:px-8">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="flex w-full items-center gap-3 py-5 text-left"
                        aria-expanded={isOpen}
                        aria-controls={`experience-panel-${item.id}`}
                      >
                        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background/70">
                            <DynamicIcon name={item.iconName} className="h-4 w-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-base font-semibold text-foreground sm:text-lg">
                              {item.role}
                            </p>
                            <p className="truncate text-sm text-muted-foreground">{item.company}</p>
                          </div>
                        </div>

                        <div className="ml-2 flex shrink-0 items-center gap-3">
                          <span className="rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                            {item.duration}
                          </span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-muted-foreground transition-transform duration-200',
                              isOpen && 'rotate-180'
                            )}
                            aria-hidden="true"
                          />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`experience-panel-${item.id}`}
                            key={`content-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pb-5">
                              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                                {item.descriptionPoints.map((point, index) => (
                                  <li key={index} className="flex gap-2">
                                    <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
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
                                      className="rounded-full px-2.5 py-1 text-[11px]"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
