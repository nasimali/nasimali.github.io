import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConfigData } from '@/contexts/ConfigContext';
import type { SkillItem } from '@/lib/types';
import * as m from 'framer-motion/m';

interface SkillTab {
  value: string;
  label: string;
  skills: SkillItem[];
}

const levelPriority: Record<string, number> = {
  Expert: 0,
  Advanced: 1,
  Proficient: 2,
  Intermediate: 3,
  Beginner: 4,
  Other: 5,
};

const levelValue: Record<string, number> = {
  Expert: 96,
  Advanced: 80,
  Proficient: 64,
  Intermediate: 50,
  Beginner: 34,
};

const toTabValue = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const buildTabs = (skills: SkillItem[]): SkillTab[] => {
  const grouped = skills.reduce<Record<string, SkillItem[]>>((acc, skill) => {
    const level = skill.level ?? 'Other';
    acc[level] ??= [];
    acc[level].push(skill);
    return acc;
  }, {});

  const levelTabs = Object.entries(grouped)
    .sort((a, b) => {
      const left = levelPriority[a[0]] ?? 999;
      const right = levelPriority[b[0]] ?? 999;
      return left - right;
    })
    .map(([level, levelSkills]) => ({
      value: toTabValue(level),
      label: `${level.toLowerCase()} (${levelSkills.length})`,
      skills: levelSkills,
    }));

  return [
    {
      value: 'all',
      label: `--all (${skills.length})`,
      skills,
    },
    ...levelTabs,
  ];
};

const Skills = () => {
  const {
    skills: skillsData,
    textContent: { skills: skillsSection },
  } = useConfigData();

  const tabs = buildTabs(skillsData);

  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="ls ~/skills --sort=level"
          heading={skillsSection.heading}
          subheading={skillsSection.subheading}
        />

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="grow-0 rounded-md border bg-card px-3.5 py-1.5 font-mono text-xs data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tab.skills.map((skill, index) => {
                  const level = skill.level ?? 'Other';
                  const value = levelValue[level] ?? 55;

                  return (
                    <m.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.45, delay: index * 0.03, ease: 'easeOut' }}
                      className="h-full"
                    >
                      <div className="retro-card flex h-full flex-col gap-4 p-5">
                        <div className="flex items-center gap-3.5">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-secondary/60">
                            <DynamicIcon
                              name={skill.iconName}
                              className={`size-5 ${skill.iconColor}`}
                            />
                          </div>
                          <p className="font-mono text-sm leading-snug font-bold text-foreground">
                            {skill.name}
                          </p>
                          <Badge
                            variant="outline"
                            className="ml-auto shrink-0 rounded-sm font-mono text-[10px] lowercase"
                          >
                            {level}
                          </Badge>
                        </div>
                        <div className="mt-auto flex items-center gap-3">
                          <Progress
                            value={value}
                            aria-label={`${skill.name} proficiency: ${level}`}
                            className="h-1.5 rounded-sm"
                          />
                          <span className="shrink-0 font-mono text-[10px] font-bold text-muted-foreground">
                            {value}%
                          </span>
                        </div>
                      </div>
                    </m.div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
