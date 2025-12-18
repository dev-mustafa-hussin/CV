import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, MessageCircle, Users, CheckSquare, Dumbbell, GraduationCap, UtensilsCrossed, Plane, Database, Globe, BookOpen, BarChart3, Wallet } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  description: string;
  technologies: string[];
  icon: 'shopping' | 'chat' | 'social' | 'task' | 'fitness' | 'education' | 'food' | 'travel' | 'wallet' | 'erp' | 'web' | 'training' | 'analysis';
}

const iconMap = {
  shopping: ShoppingBag,
  chat: MessageCircle,
  social: Users,
  task: CheckSquare,
  fitness: Dumbbell,
  education: GraduationCap,
  food: UtensilsCrossed,
  travel: Plane,
  wallet: Wallet,
  erp: Database,
  web: Globe,
  training: BookOpen,
  analysis: BarChart3,
};

const ProjectCard = ({
  id,
  title,
  titleAr,
  category,
  description,
  technologies,
  icon,
}: ProjectCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="card-glass p-6 flex flex-col h-full group transition-all duration-300
                    hover:shadow-[0_0_40px_hsl(252_100%_68%_/_0.3)] hover:-translate-y-2">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center
                        group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
          <IconComponent className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {title} - {titleAr}
          </h3>
          <span className="inline-block bg-info/20 text-info text-xs px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="tech-badge text-xs">
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="tech-badge text-xs">+{technologies.length - 4}</span>
        )}
      </div>

      {/* CTA */}
      <Link
        to={`/projects/${id}`}
        className="btn-primary text-center flex items-center justify-center gap-2"
      >
        <ArrowRight className="w-4 h-4" />
        <span>استكشاف المشروع</span>
      </Link>
    </div>
  );
};

export default ProjectCard;
