import SectionIntro from '@/components/SectionIntro';
import TerminalWindow from '@/components/TerminalWindow';
import { useConfigData } from '@/contexts/ConfigContext';
import { optimizeGitHubImageUrl } from '@/lib/utils';
import * as m from 'framer-motion/m';

const About = () => {
  const {
    uiProps,
    textContent: { about },
  } = useConfigData();

  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="cat ./about.md"
          heading={about.heading}
          subheading={about.subheading}
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="retro-card overflow-hidden p-0">
              <div className="term-titlebar">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="term-dot term-dot-red" />
                  <span className="term-dot term-dot-amber" />
                  <span className="term-dot term-dot-green" />
                </span>
                <span className="mx-auto truncate pr-12 font-mono text-xs text-muted-foreground">
                  imgcat ./portrait.jpg
                </span>
              </div>
              <img
                src={optimizeGitHubImageUrl(about.imageSrc)}
                alt={about.imageAlt}
                width={865}
                height={1300}
                className="aspect-4/5 w-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src =
                    'https://placehold.co/600x750/1a1915/f0eee6?text=Image+Unavailable';
                }}
              />
            </div>

            <blockquote className="retro-card space-y-2 p-5 font-mono text-sm leading-relaxed">
              <p className="code-comment font-bold lowercase">
                {uiProps.about.engineeringNoteTitle}
              </p>
              <p className="text-foreground">&ldquo;{uiProps.about.quote.text}&rdquo;</p>
              <footer className="text-xs text-muted-foreground">
                <span className="text-term-green">--</span> {uiProps.about.quote.author}
              </footer>
            </blockquote>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
          >
            <TerminalWindow
              title="less ~/about.md"
              contentClassName="space-y-5 text-sm leading-relaxed sm:text-base"
            >
              <p className="font-mono text-base font-bold text-foreground">
                <span aria-hidden="true" className="text-primary">
                  &gt;{' '}
                </span>
                {about.greeting}
              </p>

              {about.bioParagraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}

              <div className="rounded-md border border-dashed bg-background/60 p-4 font-mono text-xs leading-relaxed sm:text-sm">
                <p className="mb-2 font-bold text-term-purple lowercase">
                  ## {about.philosophyTitle}
                </p>
                <p className="text-muted-foreground">
                  <span className="text-term-blue">while</span>
                  <span className="text-foreground"> (alive) </span>
                  {'{'} <span className="text-term-green">learn</span>();{' '}
                  <span className="text-term-green">build</span>();{' '}
                  <span className="text-term-green">ship</span>();{' '}
                  <span className="text-term-green">refactor</span>(); {'}'}
                </p>
              </div>

              <p className="cursor-block font-mono text-xs text-muted-foreground">(END)</p>
            </TerminalWindow>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default About;
