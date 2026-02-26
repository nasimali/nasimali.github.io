import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionIntro from '@/components/SectionIntro';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getConfigData } from '@/lib/fetchConfig';

const About = () => {
  const {
    uiProps,
    textContent: { about },
  } = getConfigData();

  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="About"
          heading={about.heading}
          subheading={about.subheading}
          align="center"
        />

        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <Card className="glass-panel overflow-hidden border-border/70 py-0">
              <div className="relative">
                <img
                  src={about.imageSrc}
                  alt={about.imageAlt}
                  width={865}
                  height={1300}
                  className="aspect-[4/5] w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src =
                      'https://placehold.co/600x750/111827/E5E7EB?text=Image+Unavailable';
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="space-y-5"
          >
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs tracking-[0.12em] uppercase"
            >
              {about.philosophyTitle}
            </Badge>

            <Card className="glass-panel border-border/70 py-0">
              <CardContent className="space-y-5 px-6 py-6 sm:px-7 sm:py-7">
                <p className="text-base leading-relaxed text-foreground">
                  <span className="font-semibold text-primary">{about.greeting}</span>
                </p>
                {about.bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>

            <div className="rounded-2xl border border-border/70 bg-background/65 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Quote className="h-4 w-4 text-primary" />
                {uiProps.about.engineeringNoteTitle}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                "{uiProps.about.quote.text}" - {uiProps.about.quote.author}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
