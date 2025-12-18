import { useCountAnimation } from '@/hooks/useCountAnimation';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2000, className = '' }: AnimatedCounterProps) => {
  const { count, ref } = useCountAnimation({ end: value, duration });

  // Format number with commas for thousands
  const formatNumber = (num: number) => {
    return num.toLocaleString('ar-EG');
  };

  return (
    <div ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
};

export default AnimatedCounter;
