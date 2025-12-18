import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import SEO from '@/components/SEO';
import { Code, Smartphone, Database, Palette, Globe, Zap } from 'lucide-react';

const skills = [
  {
    category: 'تطوير التطبيقات',
    icon: Smartphone,
    items: [
      { name: 'Flutter', level: 95 },
      { name: 'Dart', level: 92 },
      { name: 'React Native', level: 75 },
    ],
  },
  {
    category: 'البرمجة',
    icon: Code,
    items: [
      { name: 'JavaScript', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 70 },
    ],
  },
  {
    category: 'قواعد البيانات',
    icon: Database,
    items: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'Firebase', level: 88 },
      { name: 'Supabase', level: 92 },
    ],
  },
  {
    category: 'التصميم',
    icon: Palette,
    items: [
      { name: 'UI/UX Design', level: 85 },
      { name: 'Figma', level: 82 },
      { name: 'Material Design', level: 90 },
    ],
  },
  {
    category: 'تطوير الويب',
    icon: Globe,
    items: [
      { name: 'React', level: 80 },
      { name: 'HTML/CSS', level: 92 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    category: 'أدوات أخرى',
    icon: Zap,
    items: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'REST APIs', level: 92 },
      { name: 'State Management', level: 88 },
    ],
  },
];

const Skills = () => {
  return (
    <>
      <SEO 
        title="مهاراتي"
        description="تعرف على المهارات التقنية لأكرم عطية - Flutter, React Native, Dart, Firebase, Supabase والمزيد."
        url="https://cv.3mcode-solutions.com/skills"
        keywords="مهارات, Flutter skills, React Native, تقنيات, programming skills"
      />
      <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <BackButton to="/" label="الرئيسية" />
        </div>

        {/* Header */}
        <div className="mb-12 animate-slide-right">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            مهاراتي 💡
          </h1>
          <p className="text-muted-foreground max-w-xl">
            مجموعة المهارات والتقنيات التي أتقنها وأستخدمها في تطوير المشاريع
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="card-glass p-6 animate-slide-up"
              style={{ animationDelay: `${0.2 + categoryIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.items.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.4 + categoryIndex * 0.1 + skillIndex * 0.05}s` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-sm text-primary font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-l from-primary to-info rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      </div>
    </>
  );
};

export default Skills;
