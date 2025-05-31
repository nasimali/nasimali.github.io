import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
import DynamicIcon from "./DynamicIcon";
import { motion } from "framer-motion";
import {getConfigData} from "../lib/fetchConfig.ts";
import type {EducationItemJson} from "../lib/types.ts";

const Education: React.FC = () => {
    const educationData: EducationItemJson[] = getConfigData().education;
    const { education: educationSectionContent } = getConfigData().textContent;

    return (
        <section id="education" className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/10 rounded-none sm:rounded-xl scroll-mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-foreground">{educationSectionContent.heading}</h2>
                    <p className="text-lg text-muted-foreground">
                        {educationSectionContent.subheading}
                    </p>
                </motion.div>
                <div className="max-w-3xl mx-auto space-y-10 relative">
                    <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border hidden sm:block" aria-hidden="true"></div>

                    {educationData.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            className="relative pl-12 sm:pl-16"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                        >
                            <div className="absolute left-0 top-1 sm:left-5 sm:-ml-[1.125rem] h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center ring-8 ring-background shadow-md">
                                <DynamicIcon name={edu.iconName} className="w-5 h-5" />
                            </div>
                            <Card className="hover:shadow-lg dark:hover:shadow-purple-500/20 transition-shadow duration-300 border-border hover:border-purple-500/30">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg sm:text-xl">{edu.degree}</CardTitle>
                                    <CardDescription className="text-sm sm:text-base">
                                        {edu.institutionLink ? (
                                            <a href={edu.institutionLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-purple-700 dark:text-purple-400 font-medium">
                                                {edu.institution}
                                            </a>
                                        ) : (
                                            <span className="font-medium text-foreground/80">{edu.institution}</span>
                                        )}
                                        <span className="mx-1.5 text-muted-foreground">|</span> {edu.duration}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-muted-foreground text-sm mb-3">{edu.description}</p>
                                    {edu.highlights && edu.highlights.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-foreground/70 mb-1.5">Highlights:</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {edu.highlights.map(highlight => <Badge key={highlight} variant="outline" className="text-xs border-purple-500/50 text-purple-700 dark:text-purple-400">{highlight}</Badge>)}
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

export default Education;