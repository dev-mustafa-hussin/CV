import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}: ScaleInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        },
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
