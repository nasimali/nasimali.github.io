import About from '@/components/About';
import ConsentBanner from '@/components/ConsentBanner';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { ConfigProvider, useConfigContext } from '@/contexts/ConfigContext';
import { useActiveSection } from '@/hooks/use-active-section';
import { useTheme } from '@/hooks/use-theme';
import { getConsentCookie, setConsentCookie } from '@/lib/cookieConsentManager';
import { useEffect, useMemo, useRef } from 'react';
import ReactGAFunctions from 'react-ga4';

const ReactGA = ReactGAFunctions;
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID as string | undefined;

const AppContent = () => {
  const { config, isLoading, error } = useConfigContext();

  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted-foreground border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex items-center justify-center">
        <div className="space-y-3 text-center max-w-md">
          <h1 className="text-lg font-semibold text-foreground">Unable to load portfolio</h1>
          <p className="text-sm text-muted-foreground">
            {error.message || 'An unexpected error occurred while loading your portfolio data.'}
          </p>
        </div>
      </div>
    );
  }

  if (!config) {
    return <div />;
  }

  const {
    textContent: { metaDescription, navLinks, siteName, siteTitleFull },
  } = config;

  const sectionIds = useMemo(() => navLinks.map((link) => link.id), [navLinks]);
  const sectionLabelById = useMemo(
    () => new Map(navLinks.map((link) => [link.id, link.label])),
    [navLinks]
  );

  const { activeSection, setActiveSection } = useActiveSection(sectionIds);
  const { isDark, toggleTheme } = useTheme();

  const isAnalyticsInitialized = useRef(false);

  const initializeAnalytics = () => {
    if (isAnalyticsInitialized.current || !GA_TRACKING_ID) {
      return;
    }

    ReactGA.initialize(GA_TRACKING_ID);
    isAnalyticsInitialized.current = true;
  };

  useEffect(() => {
    document.title = siteTitleFull;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', metaDescription);
    }

    if (getConsentCookie() === 'true') {
      initializeAnalytics();
    }
  }, [metaDescription, siteTitleFull]);

  useEffect(() => {
    if (!activeSection) {
      return;
    }

    const isHome = activeSection === 'home';
    const currentSectionLabel = sectionLabelById.get(activeSection) ?? activeSection;
    document.title = isHome ? siteTitleFull : `${siteName} | ${currentSectionLabel}`;

    if (getConsentCookie() === 'true') {
      initializeAnalytics();
      ReactGA.send({
        hitType: 'pageview',
        page: `/${activeSection}`,
        title: currentSectionLabel,
      });
    }
  }, [activeSection, sectionLabelById, siteName, siteTitleFull]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="page-noise" />
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />

      <ConsentBanner
        onAccept={() => {
          setConsentCookie(true);
          initializeAnalytics();
        }}
        onReject={() => {
          setConsentCookie(false);
        }}
      />
    </div>
  );
};

const App = () => {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
};

export default App;
