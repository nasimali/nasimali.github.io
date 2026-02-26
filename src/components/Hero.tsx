import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import DynamicIcon, { type LucideIconName } from '@/components/DynamicIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getConfigData } from '@/lib/fetchConfig';
import { scrollToSection } from '@/lib/scroll';

const Hero = () => {
  const {
    projects,
    skills,
    experience,
    uiProps,
    textContent: { hero, contact, navLinks },
  } = getConfigData();

  const navLabelById = new Map(navLinks.map((link) => [link.id, link.label]));
  const snapshotStats = [
    { id: 'projects', value: projects.length, label: navLabelById.get('projects') ?? 'Projects' },
    {
      id: 'experience',
      value: experience.length,
      label: navLabelById.get('experience') ?? 'Experience',
    },
    { id: 'skills', value: skills.length, label: navLabelById.get('skills') ?? 'Skills' },
  ];

  const snapshotReflections = uiProps.hero.snapshotReflections;

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-30 sm:pb-20 sm:pt-36 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-orb-left" />
        <div className="hero-orb-right" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] uppercase text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Crafted for clarity and scale
          </div>

          <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
            {hero.name}
          </h1>
          <p className="text-lg font-semibold tracking-wide text-primary sm:text-xl">
            {hero.title}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="group rounded-full px-7"
              onClick={() => scrollToSection('projects')}
            >
              {hero.ctaViewWork}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border/70 bg-background/70 px-7"
              onClick={() => scrollToSection('contact')}
            >
              {hero.ctaGetInTouch}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {contact.socialLinks.map((social) => (
              <Button
                key={social.id}
                variant="outline"
                size="sm"
                className="rounded-full border-border/70 bg-background/70"
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <DynamicIcon name={social.iconName as LucideIconName} className="h-3.5 w-3.5" />
                  {social.label}
                </a>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.65, ease: 'easeOut' }}
        >
          <Card className="glass-panel border-border/70 py-0 shadow-2xl">
            <CardHeader className="space-y-3 border-b border-border/70 pb-5 pt-6">
              <CardTitle className="font-display text-2xl tracking-tight text-foreground">
                Snapshot
              </CardTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {uiProps.hero.snapshotDescription}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pb-6 pt-6">
              <div className="grid grid-cols-3 gap-3">
                {snapshotStats.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-border/70 bg-background/60 px-3 py-3 text-center"
                  >
                    <p className="font-display text-2xl leading-none text-foreground">
                      {String(item.value).padStart(2, '0')}
                    </p>
                    <p className="mt-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {snapshotReflections.map((highlight, index) => (
                  <p
                    key={index}
                    className="rounded-lg border border-border/60 bg-background/65 p-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    {highlight}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
