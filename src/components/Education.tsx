import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { useConfigData } from '@/contexts/ConfigContext';
import * as m from 'framer-motion/m';

const Education = () => {
  const {
    education,
    textContent: { education: educationSection },
  } = useConfigData();

  return (
    <section id="education" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="tree ~/education"
          heading={educationSection.heading}
          subheading={educationSection.subheading}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {education.map((item, index) => {
            const isLast = index === education.length - 1;

            return (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                className="h-full"
              >
                <div className="retro-card flex h-full flex-col gap-4 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 font-mono text-sm font-bold text-muted-foreground"
                    >
                      {isLast ? '└──' : '├──'}
                    </span>
                    <div className="mt-0.5 rounded-md border bg-secondary/60 p-2">
                      <DynamicIcon name={item.iconName} className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-mono text-sm leading-snug font-bold text-foreground sm:text-base">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-sm">
                        {item.institutionLink ? (
                          <a
                            href={item.institutionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-primary underline-offset-4 hover:underline"
                          >
                            {item.institution} ↗
                          </a>
                        ) : (
                          <span className="font-mono text-xs text-muted-foreground">
                            {item.institution}
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 rounded-sm border bg-background/70 px-2 py-1 font-mono text-[10px] font-medium text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-auto space-y-1.5 border-t border-dashed pt-4 font-mono text-xs leading-relaxed text-muted-foreground">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span aria-hidden="true" className="font-bold text-term-green">
                            [x]
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
