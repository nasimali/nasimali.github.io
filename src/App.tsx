import React, { useState, useEffect, Suspense } from 'react';
import ReactGAFunctions from 'react-ga4';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getConfigData } from '@/lib/fetchConfig.ts';
import '@/App.css';
import ConsentBanner from '@/components/ConsentBanner.tsx';
import { devLog } from '@/lib/devLogger.ts';
import { getConsentCookie, setConsentCookie } from '@/lib/cookieConsentManager.ts';

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
const ReactGA = ReactGAFunctions;

const App: React.FC = () => {
  const { textContent } = getConfigData();
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
    const consent = getConsentCookie();
    if (consent === 'true') {
      ReactGA.initialize(GA_TRACKING_ID);
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
          document.title = target.id === 'home' ? textContent.siteTitleFull : target.id;
          const consent = getConsentCookie();
          if (consent === 'true' && ReactGA) {
            ReactGA.send({ hitType: 'pageview', page: target.id });
          }
        }
      },
      {
        threshold: 0.6,
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
      <ConsentBanner
        onAccept={() => {
          setConsentCookie(true);
          ReactGA.initialize(GA_TRACKING_ID);
        }}
        onReject={() => {
          devLog('Analytics tracking was rejected by the user.');
        }}
      />
    </div>
  );
};

export default App;
