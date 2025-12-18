interface StatItemProps {
  value: string;
  label: string;
  emoji?: string;
}

const StatItem = ({ value, label, emoji }: StatItemProps) => {
  return (
    <div className="flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm md:text-base whitespace-nowrap">
      {emoji && <span className="text-base xs:text-lg">{emoji}</span>}
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-bold">{value}</span>
    </div>
  );
};

export default StatItem;
