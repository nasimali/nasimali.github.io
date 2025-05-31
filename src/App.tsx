import React, { useState, useEffect } from 'react';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import Skills from '../src/components/Skills';
import Projects from '../src/components/Projects';
import Experience from '../src/components/Experience';
import Education from '../src/components/Education';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';
import { getConfigData } from '../src/lib/fetchConfig.ts';

const App: React.FC = () => {
  const textContent = getConfigData().textContent;
  // const [darkMode, setDarkMode] = useState<boolean>(() => {
  //     const savedMode = localStorage.getItem("darkMode");
  //     if (savedMode) return JSON.parse(savedMode);
  //     return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  // });
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Update document title and meta description dynamically
  useEffect(() => {
    document.title = textContent.siteTitleFull;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', textContent.metaDescription);
    }
  }, []);

  // useEffect(() => {
  //     if (darkMode) {
  //         document.documentElement.classList.add("dark");
  //         localStorage.setItem("darkMode", JSON.stringify(true));
  //     } else {
  //         document.documentElement.classList.remove("dark");
  //         localStorage.setItem("darkMode", JSON.stringify(false));
  //     }
  // }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    setDarkMode(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the entry is intersecting and makes up a significant portion of the viewport
          // or if its top is near the top of the viewport (for sections taller than viewport)
          if (
            entry.isIntersecting &&
            (entry.intersectionRatio >= 0.4 || entry.boundingClientRect.top <= 150)
          ) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Adjust rootMargin to effectively shrink the "viewport" for observation.
        // Negative top margin means the "top" of the viewport for intersection purposes is lower.
        // Negative bottom margin means the "bottom" of the viewport is higher.
        // This setup tries to make the section in the middle of the screen active.
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0.1, 0.4, 0.8], // Multiple thresholds can help with different section sizes
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300 selection:bg-primary/70 selection:text-primary-foreground">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="overflow-x-hidden pt-16">
        {' '}
        {/* Add padding-top equal to navbar height */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
