import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero'; // Eager load: top of page
import { getConfigData } from '../src/lib/fetchConfig.ts';

// Lazy-loaded components
const About = lazy(() => import('../src/components/About'));
const Skills = lazy(() => import('../src/components/Skills'));
const Projects = lazy(() => import('../src/components/Projects'));
const Experience = lazy(() => import('../src/components/Experience'));
const Education = lazy(() => import('../src/components/Education'));
const Contact = lazy(() => import('../src/components/Contact'));
const Footer = lazy(() => import('../src/components/Footer'));

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
          if (
            entry.isIntersecting &&
            (entry.intersectionRatio >= 0.4 || entry.boundingClientRect.top <= 150)
          ) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0.1, 0.4, 0.8],
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
        <Hero />
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
