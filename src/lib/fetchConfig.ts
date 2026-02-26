import type { EducationItemJson, ExperienceItemJson, ProjectItem, SkillItem } from '@/lib/types';

const DEFAULT_CONFIG_BASE = 'https://raw.githubusercontent.com/nasimali/nasim-dev-config/main/data';
const CONFIG_BASE =
  (import.meta.env.VITE_CONFIG_BASE_URL as string | undefined)?.trim() || DEFAULT_CONFIG_BASE;

export interface SiteTextContent {
  siteName: string;
  siteTitleFull: string;
  metaDescription: string;
  navLinks: NavLink[];
  hero: HeroSection;
  about: AboutSection;
  skills: SectionHeading;
  projects: SectionHeading;
  experience: SectionHeading;
  education: SectionHeading;
  contact: ContactSection;
  footer: FooterSection;
}

export interface UiPropsContent {
  hero: {
    snapshotDescription: string;
    snapshotReflections: string[];
  };
  about: {
    engineeringNoteTitle: string;
    quote: {
      text: string;
      author: string;
    };
  };
}

interface NavLink {
  id: string;
  label: string;
}

interface HeroSection {
  name: string;
  title: string;
  subtitle: string;
  ctaViewWork: string;
  ctaGetInTouch: string;
  scrollDownAlt: string;
}

interface AboutSection {
  heading: string;
  subheading: string;
  imageAlt: string;
  imageSrc: string;
  greeting: string;
  bioParagraphs: string[];
  philosophyTitle: string;
}

interface SectionHeading {
  heading: string;
  subheading: string;
}

interface ContactSection extends SectionHeading {
  formCardTitle: string;
  formCardDescription: string;
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    submitting: string;
  };
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  successMessage: string;
  errorMessage: string;
  socialPrompt: string;
  socialLinks: SocialLink[];
  hostName: string;
}

interface SocialLink {
  id: string;
  label: string;
  url: string;
  iconName: string;
}

interface FooterSection {
  copyright: string;
  builtWith: string;
  heartIconAlt: string;
  tools: string;
  fueledBy: string;
  coffeeIconAlt: string;
}

export interface ConfigData {
  textContent: SiteTextContent;
  uiProps: UiPropsContent;
  skills: SkillItem[];
  experience: ExperienceItemJson[];
  education: EducationItemJson[];
  projects: ProjectItem[];
}

const endpoints = {
  textContent: `${CONFIG_BASE}/textContent.json`,
  uiProps: '/Props.json',
  skills: `${CONFIG_BASE}/skills.json`,
  experience: `${CONFIG_BASE}/experience.json`,
  education: `${CONFIG_BASE}/education.json`,
  projects: `${CONFIG_BASE}/projects.json`,
};

let configData: ConfigData | null = null;
let loadPromise: Promise<ConfigData> | null = null;

async function fetchWithTimeout<T>(url: string, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout for ${url} after ${timeoutMs}ms`);
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function loadConfigData(): Promise<ConfigData> {
  if (configData) {
    return configData;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = Promise.all([
    fetchWithTimeout<SiteTextContent>(endpoints.textContent),
    fetchWithTimeout<UiPropsContent>(endpoints.uiProps),
    fetchWithTimeout<SkillItem[]>(endpoints.skills),
    fetchWithTimeout<ExperienceItemJson[]>(endpoints.experience),
    fetchWithTimeout<EducationItemJson[]>(endpoints.education),
    fetchWithTimeout<ProjectItem[]>(endpoints.projects),
  ])
    .then(([textContent, uiProps, skills, experience, education, projects]) => {
      configData = { textContent, uiProps, skills, experience, education, projects };
      return configData;
    })
    .catch((error) => {
      console.error('Failed to load config data:', error);
      throw error;
    })
    .finally(() => {
      loadPromise = null;
    });

  return loadPromise;
}

export function getConfigData(): ConfigData {
  if (!configData) {
    throw new Error('Config data is not loaded yet. Call loadConfigData() before rendering.');
  }

  return configData;
}
