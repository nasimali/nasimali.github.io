import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getConfigData } from '@/lib/fetchConfig';

const Projects = () => {
  const {
    projects,
    textContent: { projects: projectsSection },
  } = getConfigData();

  const [featuredProject, ...projectList] = projects;

  return (
    <section id="projects" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Work"
          heading={projectsSection.heading}
          subheading={projectsSection.subheading}
          align="center"
        />

        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-8"
          >
            <Card className="glass-panel overflow-hidden border-border/70 py-0">
              <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                {featuredProject.imageUrl ? (
                  <div className="relative h-full min-h-[280px] overflow-hidden">
                    <img
                      src={featuredProject.imageUrl}
                      alt={`${featuredProject.title} preview`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src =
                          'https://placehold.co/900x600/111827/E5E7EB?text=Preview+Unavailable';
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/45 via-black/0 to-black/10" />
                  </div>
                ) : (
                  <div className="hidden lg:block" />
                )}

                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-primary">
                    Featured Project
                  </div>
                  <h3 className="font-display text-3xl leading-tight tracking-tight text-foreground">
                    {featuredProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{featuredProject.category}</p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {featuredProject.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full px-2.5 py-1 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {featuredProject.liveLink && featuredProject.liveLink !== '#' && (
                      <Button asChild className="rounded-full px-5">
                        <a
                          href={featuredProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Visit Live
                        </a>
                      </Button>
                    )}
                    {featuredProject.repoLink && (
                      <Button variant="outline" asChild className="rounded-full px-5">
                        <a
                          href={featuredProject.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          View Source
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectList.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
              className="h-full"
            >
              <Card className="glass-panel h-full border-border/70 py-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl">
                <CardHeader className="gap-3 border-b border-border/60 pb-4 pt-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl border border-border/60 bg-background/70 p-2">
                      <DynamicIcon
                        name={project.iconName}
                        className={`h-5 w-5 ${project.iconColor}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg tracking-tight">{project.title}</CardTitle>
                      <CardDescription>{project.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-4 pb-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <Separator className="bg-border/60" />
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full px-2.5 py-1 text-[11px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto flex gap-2 border-t border-border/60 pt-4 pb-5">
                  {project.liveLink && project.liveLink !== '#' && (
                    <Button variant="secondary" size="sm" className="rounded-full" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.repoLink && (
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
