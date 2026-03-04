import { iconRegistry, type RegisteredIconName } from '@/lib/iconRegistry';
import type { LucideProps } from 'lucide-react';
import { HelpCircle } from 'lucide-react';

export type LucideIconName = string;

interface DynamicIconProps extends LucideProps {
  name: LucideIconName;
}

/**
 * DynamicIcon component - Renders Lucide icons dynamically by name
 *
 * Uses a pre-defined icon registry for optimal tree-shaking and performance.
 * Falls back to HelpCircle if icon is not found in registry.
 *
 * @param name - Icon name from config (PascalCase, e.g., "Github", "Coffee")
 * @param props - Lucide icon props (size, color, className, etc.)
 */
const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = iconRegistry[name as RegisteredIconName] ?? HelpCircle;

  if (!iconRegistry[name as RegisteredIconName] && import.meta.env.DEV) {
    console.warn(
      `Icon "${name}" not found in registry. Add it to /src/lib/iconRegistry.ts. Falling back to HelpCircle.`
    );
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
