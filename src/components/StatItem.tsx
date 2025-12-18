interface StatItemProps {
  value: string;
  label: string;
  emoji?: string;
}

const StatItem = ({ value, label, emoji }: StatItemProps) => {
  return (
    <div className="stat-card">
      <span className="text-foreground font-semibold">{value}</span>
      <span>{label}</span>
      {emoji && <span>{emoji}</span>}
    </div>
  );
};

export default StatItem;
