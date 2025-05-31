import type { EducationItemJson, ExperienceItemJson, ProjectItem, SkillItem } from './types.ts';

const CONFIG_BASE = 'https://raw.githubusercontent.com/nasimali/nasim-dev-config/main/data';

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
  skills: SkillItem[];
  experience: ExperienceItemJson[];
  education: EducationItemJson[];
  projects: ProjectItem[];
}

const endpoints = {
  textContent: `${CONFIG_BASE}/textContent.json`,
  skills: `${CONFIG_BASE}/skills.json`,
  experience: `${CONFIG_BASE}/experience.json`,
  education: `${CONFIG_BASE}/education.json`,
  projects: `${CONFIG_BASE}/projects.json`,
};

let configData: ConfigData | null = null;

export async function loadConfigData(): Promise<ConfigData> {
  try {
    const [textContent, skills, experience, education, projects] = await Promise.all([
      fetch(endpoints.textContent).then((res) => res.json()),
      fetch(endpoints.skills).then((res) => res.json()),
      fetch(endpoints.experience).then((res) => res.json()),
      fetch(endpoints.education).then((res) => res.json()),
      fetch(endpoints.projects).then((res) => res.json()),
    ]);

    configData = { textContent, skills, experience, education, projects };
    return configData;
  } catch (err) {
    console.error('Failed to load config data:', err);
    throw err;
  }
}

export function getConfigData(): ConfigData {
  if (!configData) {
    throw new Error('Config data has not been loaded. Call loadConfigData() first.');
  }
  return configData;
}
