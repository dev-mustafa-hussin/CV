interface StatItemProps {
  value: string;
  label: string;
  emoji?: string;
}

const StatItem = ({ value, label, emoji }: StatItemProps) => {
  return (
    <div className="stat-card flex-row-reverse">
      {emoji && <span>{emoji}</span>}
      <span>{label}</span>
      <span className="text-foreground font-semibold">{value}</span>
    </div>
  );
};

export default StatItem;
