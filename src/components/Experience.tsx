import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import DynamicIcon from '@/components/DynamicIcon';
import { motion } from 'framer-motion';
import { getConfigData } from '@/lib/fetchConfig.ts';

const Experience: React.FC = () => {
  const {
    experience: experiencesData,
    textContent: { experience: experienceSectionContent },
  } = getConfigData();

  return (
    <section id="experience" className="py-16 md:py-24 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-foreground">
            {experienceSectionContent.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{experienceSectionContent.subheading}</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-10 relative">
          <div
            className="absolute left-5 top-2 bottom-2 w-0.5 bg-border hidden sm:block"
            aria-hidden="true"
          ></div>

          {experiencesData.map((exp, index) => (
            <motion.div
              key={exp.id} // Use unique ID from JSON
              className="relative pl-12 sm:pl-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
            >
              {/* Icon for the timeline point */}
              <div className="absolute left-0 top-1 sm:left-5 sm:-ml-[1.125rem] h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-8 ring-background shadow-md">
                <DynamicIcon name={exp.iconName} className="w-5 h-5" />
              </div>
              <Card className="hover:shadow-lg dark:hover:shadow-primary/20 transition-shadow duration-300 border-border hover:border-primary/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">{exp.role}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {exp.companyLink ? (
                      <a
                        href={exp.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary/90 dark:text-primary-foreground/90 font-medium"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className="font-medium text-foreground/80">{exp.company}</span>
                    )}
                    <span className="mx-1.5 text-muted-foreground">|</span> {exp.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="list-disc list-outside space-y-1.5 pl-4 text-muted-foreground text-sm">
                    {exp.descriptionPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-foreground/70 mb-1.5">Key Skills:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
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

export default Experience;
