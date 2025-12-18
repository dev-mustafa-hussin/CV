import AnimatedBackground from '@/components/AnimatedBackground';
import ProjectCard from '@/components/ProjectCard';
import BackButton from '@/components/BackButton';
import StatItem from '@/components/StatItem';
import { projects } from '@/data/projects';

const Projects = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <BackButton to="/" label="الرئيسية" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="animate-slide-right">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              أعمالي المبدعة 🚀
            </h1>
            <p className="text-muted-foreground max-w-xl">
              مجموعة من أبرز المشاريع التي قمت بتطويرها باستخدام أحدث التقنيات
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <StatItem value="100%" label="رضا المقرر" emoji="👍" />
            <StatItem value="+15" label="تكنولوجيا مستخدمة" />
            <StatItem value="+3" label="مشروع مكتمل" emoji="💼" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                titleAr={project.titleAr}
                category={project.category}
                description={project.description}
                technologies={project.technologies.map((t) => t.name)}
                icon={project.icon}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
