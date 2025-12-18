interface TechBadgeProps {
  name: string;
  description: string;
  percentage?: number;
}

const TechBadge = ({ name, description, percentage }: TechBadgeProps) => {
  return (
    <div className="card-glass p-4 flex items-center gap-4 group
                    hover:shadow-[0_0_20px_hsl(252_100%_68%_/_0.2)] transition-all duration-300">
      {percentage && (
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center
                        bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
          <span className="text-xs font-bold text-primary">{percentage}%</span>
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{description}</p>
        <h4 className="text-foreground font-medium">{name}</h4>
      </div>
    </div>
  );
};

export default TechBadge;
