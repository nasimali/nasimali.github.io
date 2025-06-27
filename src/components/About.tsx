import React from 'react';
import DynamicIcon from './DynamicIcon';
import { motion } from 'framer-motion';
import { getConfigData } from '../lib/fetchConfig.ts';

const About: React.FC = () => {
  const { about } = getConfigData().textContent;

  return (
    <section
      id="about"
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
            {about.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{about.subheading}</p>
        </motion.div>
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="md:col-span-2 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <img
              src={about.imageSrc}
              alt={about.imageAlt}
              width={865}
              height={1300}
              className="rounded-lg shadow-xl w-full h-auto relative object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src =
                  'https://placehold.co/600x750/333333/FFFFFF?text=Image+Not+Found';
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="md:col-span-3 space-y-6"
          >
            <DynamicIcon name="UserCheck" className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-foreground">{about.philosophyTitle}</h3>
            <p className="text-lg text-foreground/90 leading-relaxed">
              <span className="font-semibold">{about.greeting}</span> {about.bioParagraphs[0]}
            </p>
            {about.bioParagraphs.slice(1).map((paragraph: string, index: number) => (
              <p key={index} className="text-lg text-foreground/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
