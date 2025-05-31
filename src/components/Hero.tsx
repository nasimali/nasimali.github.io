import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button.tsx';
import DynamicIcon from './DynamicIcon';
import { motion } from 'framer-motion';
import { getConfigData } from '../lib/fetchConfig.ts';

const Hero: React.FC = () => {
  const { hero } = getConfigData().textContent;

  const smoothScrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = (document.querySelector('nav')?.offsetHeight || 64) + 16; // Default navbar height + margin
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient-text"
        >
          {hero.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-2xl md:text-3xl font-semibold text-foreground mb-6"
        >
          {hero.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl text-muted-foreground mb-10"
        >
          {hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto shadow-lg hover:shadow-primary/30 transform hover:scale-105 transition-all duration-300 group"
            onClick={() => smoothScrollToId('projects')}
          >
            {hero.ctaViewWork}{' '}
            <DynamicIcon name="Briefcase" className="ml-2 h-5 w-5 group-hover:animate-pulse" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto shadow-lg hover:shadow-accent-foreground/20 transform hover:scale-105 transition-all duration-300 group"
            onClick={() => smoothScrollToId('contact')}
          >
            {hero.ctaGetInTouch}{' '}
            <DynamicIcon name="Mail" className="ml-2 h-5 w-5 group-hover:animate-bounce" />
          </Button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => smoothScrollToId('about')}
          aria-label={hero.scrollDownAlt}
          className="animate-bounce text-muted-foreground hover:text-foreground"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
