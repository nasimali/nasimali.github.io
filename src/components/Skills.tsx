import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import DynamicIcon from "./DynamicIcon";
import { motion } from "framer-motion";
import type {SkillItem} from "../lib/types.ts";
import {getConfigData} from "../lib/fetchConfig.ts";

const Skills: React.FC = () => {
    const skillsData: SkillItem[] = getConfigData().skills;
    const { skills: skillsSectionContent } = getConfigData().textContent;

    return (
        <section id="skills" className="py-16 md:py-24 scroll-mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-foreground">{skillsSectionContent.heading}</h2>
                    <p className="text-lg text-muted-foreground">
                        {skillsSectionContent.subheading}
                    </p>
                </motion.div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                            className="h-full"
                        >
                            <Card className="hover:shadow-primary/20 dark:hover:shadow-primary/30 transition-all duration-300 group hover:border-primary h-full flex flex-col text-center transform hover:-translate-y-1">
                                <CardHeader className="items-center pt-6 pb-3">
                                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-2">
                                        <DynamicIcon
                                            name={skill.iconName}
                                            className={`w-8 h-8 ${skill.iconColor} group-hover:scale-110 transition-transform duration-300`}
                                        />
                                    </div>
                                    <CardTitle className="text-base sm:text-lg font-medium">{skill.name}</CardTitle>
                                </CardHeader>
                                {skill.level && (
                                    <CardContent className="pb-4 pt-0">
                                        <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">{skill.level}</p>
                                    </CardContent>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;