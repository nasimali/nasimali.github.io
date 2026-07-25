import CommandPalette from '@/components/CommandPalette';
import ConsentBanner from '@/components/ConsentBanner';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { ConfigProvider, useConfigContext } from '@/contexts/ConfigContext';
import type { ConfigData } from '@/lib/fetchConfig';
import { useActiveSection } from '@/hooks/use-active-section';
import { useTheme } from '@/hooks/use-theme';
import { getConsentCookie, setConsentCookie } from '@/lib/cookieConsentManager';
import { domAnimation, LazyMotion } from 'framer-motion';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';

const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const Experience = lazy(() => import('@/components/Experience'));
const Education = lazy(() => import('@/components/Education'));
const Contact = lazy(() => import('@/components/Contact'));

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID as string | undefined;

const SectionLoader = () => (
  <div className="flex h-48 w-full items-center justify-center">
    <p className="cursor-block font-mono text-sm text-muted-foreground">loading module</p>
  </div>
);

const BootScreen = () => (
  <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-background text-foreground">
    <div className="w-full max-w-md space-y-2 px-6 font-mono text-sm">
      <p className="text-term-green">[ ok ] reticulating splines...</p>
      <p className="text-term-green">[ ok ] mounting ~/portfolio...</p>
      <p className="cursor-block text-muted-foreground">[ .. ] fetching site config</p>
    </div>
  </div>
);

const ErrorScreen = ({ message }: { message?: string }) => (
  <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-background text-foreground">
    <div className="w-full max-w-lg space-y-3 px-6 font-mono text-sm">
      <p className="font-bold text-term-red">kernel panic — portfolio not synced</p>
      <p className="text-muted-foreground">
        {message || 'An unexpected error occurred while loading the portfolio data.'}
      </p>
      <p className="cursor-block text-muted-foreground">try refreshing the page</p>
    </div>
  </div>
);

const AppContent = () => {
  const { config, isLoading, error } = useConfigContext();

  if (isLoading) {
    return <BootScreen />;
  }

  if (error) {
    return <ErrorScreen message={error.message} />;
  }

  if (!config) {
    return <div />;
  }

  return <PortfolioApp config={config} />;
};

const PortfolioApp = ({ config }: { config: ConfigData }) => {
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
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

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
        <div className="page-grid" />
        <div className="crt-overlay" aria-hidden="true" />

        <Navbar
          isDark={isDark}
          toggleTheme={toggleTheme}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onOpenPalette={() => setIsPaletteOpen(true)}
        />

        <CommandPalette
          open={isPaletteOpen}
          setOpen={setIsPaletteOpen}
          isDark={isDark}
          toggleTheme={toggleTheme}
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
