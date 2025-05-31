// nasim-ali-portfolio/src/types/index.ts

// Import LucideIconName if you've defined it centrally (e.g., in DynamicIcon.tsx)
// Or define it here if it's to be used by multiple type definitions below.
// For this example, let's assume LucideIconName is exported from DynamicIcon or a similar utility.
// If not, you might need to define a more generic string type or import it.
// import { LucideIconName } from "@/components/DynamicIcon"; // Assuming export from DynamicIcon

// A more generic way if LucideIconName is not easily importable here,
// though less type-safe without direct import from lucide-react or your DynamicIcon component.
export type IconName = string; // Or ideally: keyof typeof import("lucide-react");


// --- Shared Data Item Structures ---

export interface SkillItem {
    id: string;
    name: string;
    iconName: IconName; // Or LucideIconName if imported
    iconColor: string;
    level?: string;
}

export interface ProjectItem {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    iconName: IconName; // Or LucideIconName
    iconColor: string;
    liveLink?: string | null;
    repoLink?: string | null;
    imageUrl?: string;
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    companyLink?: string;
    duration: string;
    descriptionPoints: string[];
    iconName: IconName; // Or LucideIconName
    skills?: string[];
}

export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    institutionLink?: string;
    duration: string;
    description: string;
    iconName: IconName; // Or LucideIconName
    highlights?: string[];
}

// --- Text Content Structures (More complex, so breaking them down) ---

export interface NavLink {
    id: string;
    label: string;
}

export interface HeroContent {
    name: string;
    title: string;
    subtitle: string;
    ctaViewWork: string;
    ctaGetInTouch: string;
    scrollDownAlt: string;
}

export interface AboutContent {
    heading: string;
    subheading: string;
    imageAlt: string;
    imageSrc: string;
    greeting: string;
    bioParagraphs: string[];
    philosophyTitle: string;
}

export interface SectionHeadingContent {
    heading: string;
    subheading: string;
}

export interface ContactFormContent {
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
}

export interface SocialLink {
    id: string;
    label: string;
    url: string;
    iconName: IconName; // Or LucideIconName
}

export interface FooterContent {
    copyright: string;
    builtWith: string;
    heartIconAlt: string;
    tools: string;
    fueledBy: string;
    coffeeIconAlt: string;
}

// Main structure for textContent.json
export interface TextContent {
    siteName: string;
    siteTitleFull: string;
    metaDescription: string;
    navLinks: NavLink[];
    hero: HeroContent;
    about: AboutContent;
    skills: SectionHeadingContent;
    projects: SectionHeadingContent;
    experience: SectionHeadingContent;
    education: SectionHeadingContent;
    contact: ContactFormContent & SectionHeadingContent; // Merging SectionHeadingContent with ContactFormContent
    footer: FooterContent;
}

// You would then import these types in your components like so:
// import { SkillItem, TextContent } from "@/types";
//
// const skillsData: SkillItem[] = skillsDataJson;
// const siteTexts: TextContent = textContentJson;