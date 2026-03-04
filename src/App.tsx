import ConsentBanner from '@/components/ConsentBanner';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { ConfigProvider, useConfigContext } from '@/contexts/ConfigContext';
import { useActiveSection } from '@/hooks/use-active-section';
import { useTheme } from '@/hooks/use-theme';
import { getConsentCookie, setConsentCookie } from '@/lib/cookieConsentManager';
import { domAnimation, LazyMotion } from 'framer-motion';
import { lazy, Suspense, useEffect, useMemo, useRef } from 'react';

const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Experience = lazy(() => import('@/components/Experience'));
const Education = lazy(() => import('@/components/Education'));
const Contact = lazy(() => import('@/components/Contact'));

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID as string | undefined;

const SectionLoader = () => (
  <div className="flex h-48 w-full items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
  </div>
);

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
  const reactGAModulePromise = useRef<Promise<typeof import('react-ga4')> | null>(null);

  const loadReactGA = async () => {
    if (!reactGAModulePromise.current) {
      reactGAModulePromise.current = import('react-ga4');
    }

    const module = await reactGAModulePromise.current;
    return module.default;
  };

  const initializeAnalytics = async () => {
    if (isAnalyticsInitialized.current || !GA_TRACKING_ID) {
      return null;
    }

    const ReactGA = await loadReactGA();
    ReactGA.initialize(GA_TRACKING_ID);
    isAnalyticsInitialized.current = true;
    return ReactGA;
  };

  useEffect(() => {
    document.title = siteTitleFull;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', metaDescription);
    }

    if (getConsentCookie() === 'true' && GA_TRACKING_ID) {
      void initializeAnalytics();
    }
  }, [metaDescription, siteTitleFull]);

  useEffect(() => {
    if (!activeSection) {
      return;
    }

    const isHome = activeSection === 'home';
    const currentSectionLabel = sectionLabelById.get(activeSection) ?? activeSection;
    document.title = isHome ? siteTitleFull : `${siteName} | ${currentSectionLabel}`;

    if (getConsentCookie() === 'true' && GA_TRACKING_ID) {
      void (async () => {
        const ReactGA = (await initializeAnalytics()) ?? (await loadReactGA());
        ReactGA.send({
          hitType: 'pageview',
          page: `/${activeSection}`,
          title: currentSectionLabel,
        });
      })();
    }
  }, [activeSection, sectionLabelById, siteName, siteTitleFull]);

  return (
    <LazyMotion features={domAnimation} strict>
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
          <Suspense fallback={<SectionLoader />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </Suspense>
        </main>

        <Footer />

        <ConsentBanner
          onAccept={() => {
            setConsentCookie(true);
            if (GA_TRACKING_ID) {
              void initializeAnalytics();
            }
          }}
          onReject={() => {
            setConsentCookie(false);
          }}
        />
      </div>
    </LazyMotion>
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
