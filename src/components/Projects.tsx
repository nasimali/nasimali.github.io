import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from './ui/card.tsx';
import { Badge } from './ui/badge.tsx';
import { Button } from './ui/button.tsx';
import DynamicIcon from './DynamicIcon';
import { motion } from 'framer-motion';
import type { ProjectItem } from '../lib/types.ts';
import { getConfigData } from '../lib/fetchConfig.ts';

const Projects: React.FC = () => {
  const projectsData: ProjectItem[] = getConfigData().projects;
  const { projects: projectsSectionContent } = getConfigData().textContent;

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/10 rounded-none sm:rounded-xl scroll-mt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-foreground">
            {projectsSectionContent.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{projectsSectionContent.subheading}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1.5 group border-border hover:border-primary/50">
                {project.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.src =
                          'https://placehold.co/600x400/CCCCCC/999999?text=Image+Error';
                      }}
                    />
                  </div>
                )}
                <CardHeader className="pb-3 pt-5">
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <DynamicIcon
                        name={project.iconName}
                        className={`w-7 h-7 ${project.iconColor}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl leading-tight">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-xs pt-0.5">
                        {project.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-2 pb-4">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 ease-in-out">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 pb-5">
                  <div className="flex justify-end space-x-2 w-full">
                    {project.liveLink && project.liveLink !== '#' && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="mr-1.5 h-4 w-4" /> Live
                        </a>
                      </Button>
                    )}
                    {project.repoLink && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-muted-foreground hover:text-foreground"
                        >
                          <Github className="mr-1.5 h-4 w-4" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
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
