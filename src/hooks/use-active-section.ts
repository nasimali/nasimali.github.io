import { useEffect, useState } from 'react';

function getSectionProbeOffset() {
  const navHeight = document.querySelector('nav')?.getBoundingClientRect().height ?? 72;
  return navHeight + window.innerHeight * 0.26;
}

function getTrackedSections(sectionIds: string[]) {
  return sectionIds
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null);
}

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? 'home');

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    let isTicking = false;
    let hasObservedAllSections = false;

    const updateActiveSection = () => {
      isTicking = false;
      const sections = getTrackedSections(sectionIds);

      if (sections.length === 0) {
        return;
      }

      if (!hasObservedAllSections && sections.length === sectionIds.length) {
        hasObservedAllSections = true;
        mutationObserver.disconnect();
      }

      const probeY = window.scrollY + getSectionProbeOffset();
      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;

      if (pageBottom >= documentBottom - 2) {
        const lastSectionId = sections[sections.length - 1]?.id;
        if (lastSectionId) {
          setActiveSection((prev) => (prev === lastSectionId ? prev : lastSectionId));
        }
        return;
      }

      let nextActiveSection = sections[0]?.id ?? 'home';

      for (const section of sections) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (probeY >= top && probeY < bottom) {
          nextActiveSection = section.id;
          break;
        }

        if (probeY >= top) {
          nextActiveSection = section.id;
        }
      }

      setActiveSection((prev) => (prev === nextActiveSection ? prev : nextActiveSection));
    };

    const scheduleUpdate = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    const mutationObserver = new MutationObserver(() => {
      scheduleUpdate();
    });

    const observedRoot = document.querySelector('main') ?? document.body;
    mutationObserver.observe(observedRoot, { childList: true, subtree: true });

    updateActiveSection();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [sectionIds]);

  return {
    activeSection,
    setActiveSection,
  };
}
