import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Mail, Target, Briefcase, FileText, HelpCircle } from 'lucide-react';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: 'mail' | 'target' | 'briefcase' | 'file' | 'help';
  link: string;
  onPrev?: () => void;
  onNext?: () => void;
  showPrev?: boolean;
  showNext?: boolean;
}

const iconMap = {
  mail: Mail,
  target: Target,
  briefcase: Briefcase,
  file: FileText,
  help: HelpCircle,
};

const NavigationCard = ({
  title,
  description,
  icon,
  link,
  onPrev,
  onNext,
  showPrev = true,
  showNext = true,
}: NavigationCardProps) => {
  const IconComponent = iconMap[icon];

  return (
    <Link
      to={link}
      className="card-glass p-6 flex items-center gap-4 group transition-all duration-300 
                 hover:shadow-[0_0_40px_hsl(252_100%_68%_/_0.3)] hover:-translate-y-2"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center
                      group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Navigation arrows */}
      <div className="flex flex-col gap-2">
        {showPrev && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onPrev?.();
            }}
            className="p-1 rounded-full hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
        {showNext && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onNext?.();
            }}
            className="p-1 rounded-full hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </Link>
  );
};

export default NavigationCard;
