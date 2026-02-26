import { useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme-preference';

function hasStoredThemePreference(): boolean {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === 'light' || savedTheme === 'dark';
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return getSystemTheme();
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [hasExplicitPreference, setHasExplicitPreference] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return hasStoredThemePreference();
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);

    if (hasExplicitPreference) {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } else {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }, [hasExplicitPreference, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      if (!hasExplicitPreference) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handlePreferenceChange);
    return () => mediaQuery.removeEventListener('change', handlePreferenceChange);
  }, [hasExplicitPreference]);

  const isDark = useMemo(() => theme === 'dark', [theme]);

  return {
    isDark,
    theme,
    setTheme,
    toggleTheme: () => {
      setHasExplicitPreference(true);
      setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    },
  };
}
