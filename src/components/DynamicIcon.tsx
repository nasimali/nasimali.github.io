import { HelpCircle } from 'lucide-react';
import { DynamicIcon as LucideDynamicIcon, iconNames, type IconName } from 'lucide-react/dynamic';
import type { LucideProps } from 'lucide-react';

export type LucideIconName = string;

interface DynamicIconProps extends LucideProps {
  name: LucideIconName;
}

const availableIcons = new Set<string>(iconNames);

function toDynamicName(iconName: string): IconName | null {
  const normalized = iconName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([a-z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();

  if (!availableIcons.has(normalized)) {
    return null;
  }

  return normalized as IconName;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const dynamicName = toDynamicName(name);

  if (!dynamicName) {
    if (import.meta.env.DEV) {
      console.warn(`Icon "${name}" was not found in lucide-react dynamic icon set.`);
    }
    return <HelpCircle {...props} />;
  }

  return <LucideDynamicIcon name={dynamicName} {...props} />;
};

export default DynamicIcon;
