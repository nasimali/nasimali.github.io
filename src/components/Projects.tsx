import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useConfigData } from '@/contexts/ConfigContext';
import { optimizeGitHubImageUrl } from '@/lib/utils';
import * as m from 'framer-motion/m';
import { ExternalLink, GitFork, Star } from 'lucide-react';

const Projects = () => {
  const {
    projects,
    textContent: { projects: projectsSection },
  } = useConfigData();

  const [featuredProject, ...projectList] = projects;

  return (
    <section id="projects" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="ls ~/projects --featured"
          heading={projectsSection.heading}
          subheading={projectsSection.subheading}
        />

        {featuredProject && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="term-window">
              <div className="term-titlebar">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="term-dot term-dot-red" />
                  <span className="term-dot term-dot-amber" />
                  <span className="term-dot term-dot-green" />
                </span>
                <span className="mx-auto flex items-center gap-1.5 truncate pr-12 font-mono text-xs text-muted-foreground">
                  <Star className="size-3 text-term-amber" />
                  {featuredProject.id}.sh — featured
                </span>
              </div>

              <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                {featuredProject.imageUrl ? (
                  <div className="relative h-full min-h-70 overflow-hidden border-b lg:border-b-0 lg:border-r">
                    <img
                      src={optimizeGitHubImageUrl(featuredProject.imageUrl)}
                      alt={`${featuredProject.title} preview`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.src =
                          'https://placehold.co/900x600/1a1915/f0eee6?text=Preview+Unavailable';
                      }}
                    />
                  </div>
                ) : (
                  <div className="hidden lg:block" />
                )}

                <div className="p-6 sm:p-8">
                  <p className="shell-prompt mb-3 font-mono text-xs font-bold text-term-green">
                    ./run --featured
                  </p>
                  <h3 className="font-mono text-2xl leading-tight font-bold tracking-tight text-foreground">
                    {featuredProject.title}
                  </h3>
                  <p className="code-comment mt-1.5 text-xs">{featuredProject.category}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {featuredProject.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {featuredProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-sm font-mono text-[11px] lowercase"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredProject.liveLink && featuredProject.liveLink !== '#' && (
                      <Button asChild className="font-mono">
                        <a
                          href={featuredProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="size-4" />
                          open --live
                        </a>
                      </Button>
                    )}
                    {featuredProject.repoLink && (
                      <Button variant="outline" asChild className="font-mono">
                        <a
                          href={featuredProject.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GitFork className="size-4" />
                          git clone
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectList.map((project, index) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              className="h-full"
            >
              <div className="retro-card flex h-full flex-col overflow-hidden p-0">
                <div className="term-titlebar">
                  <span className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="term-dot term-dot-red" />
                    <span className="term-dot term-dot-amber" />
                    <span className="term-dot term-dot-green" />
                  </span>
                  <span className="mx-auto truncate pr-12 font-mono text-xs text-muted-foreground">
                    {project.id}.sh
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-md border bg-secondary/60 p-2">
                      <DynamicIcon
                        name={project.iconName}
                        className={`size-5 ${project.iconColor}`}
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-mono text-sm leading-snug font-bold text-foreground">
                        {project.title}
                      </h3>
                      <p className="code-comment text-[11px]">{project.category}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-dashed pt-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-sm font-mono text-[10px] lowercase"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.liveLink && project.liveLink !== '#' && (
                      <Button variant="secondary" size="sm" className="font-mono text-xs" asChild>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3.5" />
                          live
                        </a>
                      </Button>
                    )}
                    {project.repoLink && (
                      <Button variant="outline" size="sm" className="font-mono text-xs" asChild>
                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                          <GitFork className="size-3.5" />
                          clone
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
