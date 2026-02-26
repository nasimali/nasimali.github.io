import { motion } from 'framer-motion';
import DynamicIcon from '@/components/DynamicIcon';
import SectionIntro from '@/components/SectionIntro';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getConfigData } from '@/lib/fetchConfig';
import type { SkillItem } from '@/lib/types';

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
      label: `${level} (${levelSkills.length})`,
      skills: levelSkills,
    }));

  return [
    {
      value: 'all',
      label: `All (${skills.length})`,
      skills,
    },
    ...levelTabs,
  ];
};

const Skills = () => {
  const {
    skills: skillsData,
    textContent: { skills: skillsSection },
  } = getConfigData();

  const tabs = buildTabs(skillsData);

  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Stack"
          heading={skillsSection.heading}
          subheading={skillsSection.subheading}
          align="center"
        />

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-xs font-semibold tracking-wide data-[state=active]:border-primary/40 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tab.skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: index * 0.03, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <Card className="glass-panel h-full border-border/70 py-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-xl">
                      <CardHeader className="flex flex-row items-center gap-4 border-b border-border/60 pb-4 pt-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-background/70">
                          <DynamicIcon
                            name={skill.iconName}
                            className={`h-6 w-6 ${skill.iconColor}`}
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight tracking-tight">
                            {skill.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 pb-5">
                        <Badge
                          variant="secondary"
                          className="rounded-full px-2.5 py-1 text-xs font-medium"
                        >
                          {skill.level ?? 'Core Skill'}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
