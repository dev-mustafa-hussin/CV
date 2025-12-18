import { TimelineMilestone } from '@/data/projects';
import { CheckCircle2, Clock, Circle, Calendar } from 'lucide-react';

interface ProjectTimelineProps {
  milestones: TimelineMilestone[];
}

const ProjectTimeline = ({ milestones }: ProjectTimelineProps) => {
  const getStatusIcon = (status: TimelineMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-warning animate-pulse" />;
      case 'planned':
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: TimelineMilestone['status']) => {
    switch (status) {
      case 'completed':
        return 'border-success bg-success/10';
      case 'in-progress':
        return 'border-warning bg-warning/10';
      case 'planned':
        return 'border-muted-foreground/50 bg-muted/30';
    }
  };

  const getLineColor = (status: TimelineMilestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      case 'planned':
        return 'bg-muted-foreground/30';
    }
  };

  return (
    <div className="relative">
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className="relative flex gap-4 pb-8 last:pb-0 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Timeline line */}
          {index < milestones.length - 1 && (
            <div
              className={`absolute right-[19px] top-10 w-0.5 h-[calc(100%-2.5rem)] ${getLineColor(milestone.status)}`}
            />
          )}

          {/* Status indicator */}
          <div
            className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(milestone.status)}`}
          >
            {getStatusIcon(milestone.status)}
          </div>

          {/* Content */}
          <div className="flex-1 bg-card/30 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">{milestone.date}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  milestone.status === 'completed'
                    ? 'bg-success/20 text-success'
                    : milestone.status === 'in-progress'
                    ? 'bg-warning/20 text-warning'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {milestone.status === 'completed'
                  ? 'مكتمل'
                  : milestone.status === 'in-progress'
                  ? 'قيد التنفيذ'
                  : 'مخطط'}
              </span>
            </div>
            <h4 className="text-foreground font-semibold mb-1">{milestone.title}</h4>
            <p className="text-sm text-muted-foreground">{milestone.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTimeline;
