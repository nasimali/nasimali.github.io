import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  // Config icons - Experience
  Briefcase,
  ChevronDown,
  Clock3,
  Code,
  CodeXml,
  // Config icons - Skills
  Coffee,
  Container,
  Database,
  ExternalLink,
  FileBadge2,
  FileCode,
  FileJson,
  FileJson2,
  Gamepad2,
  GithubIcon,
  // Config icons - Education
  GraduationCap,
  Heart,
  HelpCircle,
  Laptop,
  LinkedinIcon,
  ListTodo,
  // Component icons - UI
  Loader2,
  // Config icons - Contact/Social
  Mail,
  Menu,
  MoonStar,
  PencilRuler,
  Quote,
  Rocket,
  SendHorizonal,
  ServerCog,
  Settings2,
  Sparkles,
  Store,
  SunMedium,
  TestTube2,
  // Config icons - Projects
  User2,
  UserCircle2,
  Wind,
  X,
} from 'lucide-react';

/**
 * Icon registry mapping icon names (PascalCase) to Lucide icon components
 */
export const iconRegistry = {
  // Config icons - Skills
  Coffee,
  FileJson2,
  FileBadge2,
  FileJson,
  CodeXml,
  Wind,
  Database,
  Code,
  Container,
  Settings2,
  Github: GithubIcon, // Using GithubIcon (recommended over deprecated Github)
  Activity,
  TestTube2,
  ListTodo,

  // Config icons - Experience
  Briefcase,
  PencilRuler,
  Rocket,
  Store,
  User2,

  // Config icons - Education
  GraduationCap,
  BookOpenCheck,
  FileCode,
  Laptop,

  // Config icons - Projects
  UserCircle2,
  ServerCog,
  Clock3,
  Gamepad2,

  // Config icons - Contact/Social
  Mail,
  Linkedin: LinkedinIcon, // Using LinkedinIcon (recommended over deprecated Linkedin)

  // Component icons - UI
  Loader2,
  SendHorizonal,
  HelpCircle,
  Quote,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Menu,
  MoonStar,
  SunMedium,
  X,
  Heart,
} as const;

export type RegisteredIconName = keyof typeof iconRegistry;
