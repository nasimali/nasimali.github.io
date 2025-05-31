import React from "react";
import * as LucideIcons from "lucide-react";

export type LucideIconName = keyof typeof LucideIcons;

interface DynamicIconProps extends LucideIcons.LucideProps {
    name: LucideIconName;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {

    const IconComponent = LucideIcons[name] as React.FC<LucideIcons.LucideProps>;

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in LucideIcons. Rendering HelpCircle as fallback.`);
        return <LucideIcons.HelpCircle {...props} />;
    }

    return <IconComponent {...props} />;
};

export default DynamicIcon;
