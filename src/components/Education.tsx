import { motion } from 'framer-motion';
import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getConfigData } from '@/lib/fetchConfig';

const Education = () => {
  const {
    education,
    textContent: { education: educationSection },
  } = getConfigData();

  return (
    <section id="education" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Learning"
          heading={educationSection.heading}
          subheading={educationSection.subheading}
          align="center"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
              className="h-full"
            >
              <Card className="glass-panel h-full border-border/70 py-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-xl">
                <CardHeader className="space-y-3 border-b border-border/60 pb-4 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-xl border border-border/60 bg-background/70 p-2">
                        <DynamicIcon name={item.iconName} className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight tracking-tight">
                          {item.degree}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          {item.institutionLink ? (
                            <a
                              href={item.institutionLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {item.institution}
                            </a>
                          ) : (
                            item.institution
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4 pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((highlight) => (
                        <Badge
                          key={highlight}
                          variant="outline"
                          className="rounded-full px-2.5 py-1 text-[11px]"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
