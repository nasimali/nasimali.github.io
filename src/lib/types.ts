import type {LucideIconName} from "../../src/components/DynamicIcon.tsx";
import React from "react";

export interface EducationItemJson {
    id: string;
    degree: string;
    institution: string;
    institutionLink?: string;
    duration: string;
    description: string;
    iconName: LucideIconName;
    highlights?: string[];
}

export interface ExperienceItemJson {
    id: string;
    role: string;
    company: string;
    companyLink?: string;
    duration: string;
    descriptionPoints: string[];
    iconName: LucideIconName;
    skills?: string[];
}

export interface NavLinkItem {
    id: string;
    label: string;
}

export interface NavLinkProps {
    item: NavLinkItem;
    activeSection: string;
    setActiveSection: (sectionId: string) => void;
    onClick?: () => void;
    children: React.ReactNode;
}

export interface ProjectItem {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    iconName: LucideIconName;
    iconColor: string;
    liveLink?: string | null;
    repoLink?: string | null;
    imageUrl?: string;
}

export interface SkillItem {
    id: string;
    name: string;
    iconName: LucideIconName;
    iconColor: string;
    level?: string;
}