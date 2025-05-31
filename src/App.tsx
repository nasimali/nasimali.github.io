import React, { useState, useEffect, Suspense } from 'react';
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
import './App.css';
const App: React.FC = () => {
  const textContent = getConfigData().textContent;
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) return JSON.parse(savedMode);
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [activeSection, setActiveSection] = useState<string>('home');

  // Update document title and meta description dynamically
  useEffect(() => {
    document.title = textContent.siteTitleFull;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', textContent.metaDescription);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(false));
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
              mostVisible = entry;
            }
          }
        });

        if (mostVisible) {
          const target = (mostVisible as IntersectionObserverEntry).target as HTMLElement;
          setActiveSection(target.id);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-primary/70 selection:text-primary-foreground
    ${darkMode ? 'dark' : ''} bg-background text-foreground`}
    >
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
