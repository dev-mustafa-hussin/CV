import { useParams } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import TechBadge from '@/components/TechBadge';
import { projects } from '@/data/projects';
import { ShoppingBag, MessageCircle, Users, Rocket } from 'lucide-react';

const iconMap = {
  shopping: ShoppingBag,
  chat: MessageCircle,
  social: Users,
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">المشروع غير موجود</p>
      </div>
    );
  }

  const IconComponent = iconMap[project.icon];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <BackButton to="/projects" label="المشاريع" />
        </div>

        {/* Header */}
        <div className="card-glass p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Icon */}
            <div className="w-28 h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center
                            glow-border flex-shrink-0">
              <IconComponent className="w-12 h-12 text-primary" />
            </div>

            {/* Title */}
            <div className="text-center md:text-right flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {project.title} - {project.titleAr}
              </h1>
              <span className="inline-block bg-info/20 text-info px-4 py-1.5 rounded-full">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-4 text-right">
            نبذة عن المشروع
          </h2>
          <p className="text-muted-foreground text-right leading-relaxed">
            {project.fullDescription}
          </p>
        </section>

        {/* Technologies Section */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 text-right flex items-center justify-end gap-2">
            <span>التقنيات المستخدمة</span>
            <span className="text-primary">⭐</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.05}s` }}
              >
                <TechBadge
                  name={tech.name}
                  description={tech.description}
                  percentage={tech.percentage}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="card-glass p-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 text-right">
            المميزات الرئيسية 🚀
          </h2>
          <ul className="space-y-4">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center justify-end gap-3 text-muted-foreground animate-fade-in"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <span className="text-right">{feature}</span>
                <Rocket className="w-5 h-5 text-primary flex-shrink-0" />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;
