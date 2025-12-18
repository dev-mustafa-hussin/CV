import { useParams } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import TechBadge from '@/components/TechBadge';
import { projects } from '@/data/projects';
import { ShoppingBag, MessageCircle, Users, Rocket, Zap, Database, AlertTriangle, CheckCircle, Lightbulb, Play, Video, Cloud } from 'lucide-react';

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
        <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
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

        {/* Supabase Features Section */}
        {project.supabaseFeatures && project.supabaseFeatures.length > 0 && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 text-right flex items-center justify-end gap-2">
              <span>مميزات Supabase</span>
              <Zap className="w-6 h-6 text-warning" />
            </h2>
            <div className="bg-card/50 rounded-2xl p-6 border border-border/30">
              <ul className="space-y-4">
                {project.supabaseFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-end gap-3 animate-fade-in"
                    style={{ animationDelay: `${0.8 + index * 0.05}s` }}
                  >
                    <span className="text-muted-foreground text-right">
                      {feature.nameAr} - <span className="text-foreground font-medium">{feature.name}</span>
                    </span>
                    <Cloud className="w-5 h-5 text-success flex-shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Database Schema Section */}
        {project.databaseSchema && project.databaseSchema.length > 0 && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 text-right flex items-center justify-end gap-2">
              <span>مخطط قاعدة البيانات</span>
              <Database className="w-6 h-6 text-primary" />
            </h2>
            <div className="bg-card/50 rounded-2xl p-4 border border-border/30">
              <div className="space-y-3">
                {project.databaseSchema.map((table, index) => (
                  <div
                    key={index}
                    className="bg-background/50 rounded-xl p-4 border border-border/20 flex items-center justify-end gap-3 animate-fade-in hover:border-primary/30 transition-colors"
                    style={{ animationDelay: `${0.9 + index * 0.05}s` }}
                  >
                    <span className="text-muted-foreground text-right">
                      {table.nameAr} - <span className="text-foreground font-medium">{table.name}</span>
                    </span>
                    <Database className="w-5 h-5 text-primary/60 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenges and Solutions Section */}
        {project.challenges && project.solutions && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 text-right flex items-center justify-end gap-2">
              <span>التحديات والحلول</span>
              <Lightbulb className="w-6 h-6 text-warning" />
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Challenges */}
              <div className="bg-warning/10 rounded-2xl p-6 border border-warning/30">
                <h3 className="text-lg font-semibold text-warning mb-4 text-right flex items-center justify-end gap-2">
                  <span>التحديات</span>
                  <AlertTriangle className="w-5 h-5" />
                </h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li
                      key={index}
                      className="flex items-start justify-end gap-3 text-muted-foreground animate-fade-in"
                      style={{ animationDelay: `${1 + index * 0.1}s` }}
                    >
                      <span className="text-right">{challenge}</span>
                      <span className="text-warning mt-1">▸</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="bg-success/10 rounded-2xl p-6 border border-success/30">
                <h3 className="text-lg font-semibold text-success mb-4 text-right flex items-center justify-end gap-2">
                  <span>الحلول</span>
                  <Lightbulb className="w-5 h-5" />
                </h3>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li
                      key={index}
                      className="flex items-start justify-end gap-3 text-muted-foreground animate-fade-in"
                      style={{ animationDelay: `${1 + index * 0.1}s` }}
                    >
                      <span className="text-right">{solution}</span>
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Video Section */}
        {project.videoUrl && (
          <section className="card-glass p-6 animate-slide-up" style={{ animationDelay: '1s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 text-right flex items-center justify-end gap-2">
              <span>فيديو توضيحي للمشروع</span>
              <Video className="w-6 h-6 text-primary" />
            </h2>
            <div className="bg-card/50 rounded-2xl border border-border/30 overflow-hidden">
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video flex items-center justify-center bg-background/50 hover:bg-background/70 transition-colors cursor-pointer group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                  <p className="text-primary font-medium">اضغط لمشاهدة الفيديو</p>
                </div>
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProjectDetail;
