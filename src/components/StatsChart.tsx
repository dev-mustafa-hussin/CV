import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { ProjectStat } from '@/data/projects';

interface StatsChartProps {
  stats: ProjectStat[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--info))', 'hsl(var(--destructive))', 'hsl(var(--accent))'];

const StatsChart = ({ stats }: StatsChartProps) => {
  // Parse numeric values from stats
  const chartData = stats.map((stat, index) => {
    const valueMatch = stat.value.match(/^([\d,]+)/);
    const numericValue = valueMatch ? parseInt(valueMatch[1].replace(/,/g, '')) : 0;
    return {
      name: stat.label,
      value: numericValue,
      originalValue: stat.value,
      fill: COLORS[index % COLORS.length]
    };
  }).filter(item => item.value > 0);

  // Filter data for pie chart (only meaningful numeric values)
  const pieData = chartData.filter(item => item.value > 0 && item.value < 100000);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl">
          <p className="text-foreground font-medium">{payload[0].payload.name}</p>
          <p className="text-primary font-bold text-lg">{payload[0].payload.originalValue}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-card/30 rounded-2xl p-4 border border-border/30">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">إحصائيات المشروع</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={80}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      {pieData.length >= 2 && (
        <div className="bg-card/30 rounded-2xl p-4 border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">توزيع الإحصائيات</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value: string) => <span className="text-muted-foreground text-sm">{value}</span>}
                wrapperStyle={{ paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatsChart;
