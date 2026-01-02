import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import { Code, Smartphone, Database, Palette, Globe, Zap, Settings, BarChart3, Users, BookOpen } from 'lucide-react';

const skills = [
  {
    category: 'Odoo ERP Development',
    icon: Settings,
    items: [
      { name: 'Python', level: 95 },
      { name: 'Odoo Framework', level: 98 },
      { name: 'XML/QWeb', level: 92 },
      { name: 'JavaScript/OWL', level: 88 },
      { name: 'PostgreSQL', level: 90 },
    ],
  },
  {
    category: 'Full Stack Web',
    icon: Globe,
    items: [
      { name: 'React.js', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Node.js', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'REST API', level: 92 },
    ],
  },
  {
    category: 'تطوير تطبيقات الموبايل',
    icon: Smartphone,
    items: [
      { name: 'Flutter', level: 95 },
      { name: 'Dart', level: 92 },
      { name: 'Firebase', level: 88 },
      { name: 'Supabase', level: 90 },
    ],
  },
  {
    category: 'Business Analysis',
    icon: BarChart3,
    items: [
      { name: 'Requirements Analysis', level: 95 },
      { name: 'Process Mapping', level: 92 },
      { name: 'Gap Analysis', level: 90 },
      { name: 'Project Management', level: 90 },
      { name: 'Documentation', level: 95 },
    ],
  },
  {
    category: 'قواعد البيانات',
    icon: Database,
    items: [
      { name: 'PostgreSQL', level: 92 },
      { name: 'MySQL', level: 85 },
      { name: 'Supabase', level: 90 },
      { name: 'Firebase', level: 88 },
    ],
  },
  {
    category: 'Odoo Modules',
    icon: Zap,
    items: [
      { name: 'Sales & CRM', level: 98 },
      { name: 'Inventory & Purchase', level: 95 },
      { name: 'Accounting', level: 90 },
      { name: 'HR & Payroll', level: 88 },
      { name: 'Manufacturing', level: 85 },
    ],
  },
  {
    category: 'التدريب والاستشارات',
    icon: BookOpen,
    items: [
      { name: 'End User Training', level: 98 },
      { name: 'Technical Training', level: 95 },
      { name: 'System Configuration', level: 95 },
      { name: 'Data Migration', level: 88 },
    ],
  },
  {
    category: 'أدوات التطوير',
    icon: Code,
    items: [
      { name: 'Git & GitHub', level: 95 },
      { name: 'Docker', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux/Ubuntu', level: 88 },
    ],
  },
];

const Skills = () => {
  return (
    <>
      <SEO 
        title="مهاراتي | Full Stack Developer & ERP Consultant"
        description="مهارات مصطفى حسين أحمد - Odoo ERP Development, Full Stack Web, Python, React, PostgreSQL, Business Analysis, تدريب واستشارات أودوو."
        url="https://cv.3mcode-solutions.com/skills"
        keywords="Odoo developer, Full Stack, Python, React, PostgreSQL, Business Analysis, ERP consultant, مهارات برمجة"
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
        <Footer />
      </div>
    </>
  );
};

export default Skills;
