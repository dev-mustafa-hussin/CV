interface StatItemProps {
  value: string;
  label: string;
  emoji?: string;
}

const StatItem = ({ value, label, emoji }: StatItemProps) => {
  return (
    <div className="flex items-center gap-2 text-sm md:text-base">
      {emoji && <span className="text-lg">{emoji}</span>}
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-bold">{value}</span>
    </div>
  );
};

export default StatItem;
