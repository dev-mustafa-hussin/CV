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

  const hasNavigation = showPrev || showNext;

  return (
    <div className="relative">
      {/* Navigation arrows for mobile - positioned outside the card */}
      {hasNavigation && (
        <div className="absolute inset-y-0 -left-2 -right-2 flex items-center justify-between pointer-events-none z-10">
          {showNext && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNext?.();
              }}
              className="pointer-events-auto w-10 h-10 rounded-full bg-card/90 border border-primary/50 
                         flex items-center justify-center shadow-lg active:scale-95 transition-all"
              aria-label="التالي"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
          )}
          {showPrev && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPrev?.();
              }}
              className="pointer-events-auto w-10 h-10 rounded-full bg-card/90 border border-primary/50 
                         flex items-center justify-center shadow-lg active:scale-95 transition-all"
              aria-label="السابق"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          )}
        </div>
      )}

      <Link
        to={link}
        className="card-glass p-4 sm:p-6 flex items-center gap-3 sm:gap-4 group transition-all duration-300 
                   hover:shadow-[0_0_40px_hsl(252_100%_68%_/_0.3)] hover:-translate-y-2
                   active:scale-[0.98] touch-manipulation"
      >
        {/* Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 border border-primary/50 
                        flex items-center justify-center shrink-0
                        group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-0.5 sm:mb-1 truncate">{title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default NavigationCard;
