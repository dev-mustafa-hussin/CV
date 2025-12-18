import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Smooth spring physics for parallax
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  
  // Different parallax speeds for depth effect
  const particle1Y = useTransform(smoothScrollY, [0, 500], [0, 150]);
  const particle2Y = useTransform(smoothScrollY, [0, 500], [0, -100]);
  const particle3Y = useTransform(smoothScrollY, [0, 500], [0, 200]);
  const particle4Y = useTransform(smoothScrollY, [0, 500], [0, -150]);
  const particle5Y = useTransform(smoothScrollY, [0, 500], [0, 100]);
  
  const orb1Y = useTransform(smoothScrollY, [0, 500], [0, 80]);
  const orb2Y = useTransform(smoothScrollY, [0, 500], [0, -60]);
  
  const waveY = useTransform(smoothScrollY, [0, 300], [0, 50]);
  const waveOpacity = useTransform(smoothScrollY, [0, 300], [0.2, 0.1]);
  
  // Rotation effects
  const particle1Rotate = useTransform(smoothScrollY, [0, 1000], [0, 360]);
  const particle3Rotate = useTransform(smoothScrollY, [0, 1000], [0, -180]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90" />
      
      {/* Animated waves with parallax */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden"
        style={{ y: waveY }}
      >
        <motion.svg
          className="absolute bottom-0 w-[200%] h-full animate-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ opacity: waveOpacity }}
        >
          <path
            fill="hsl(252 100% 68%)"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </motion.svg>
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave-slow opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(217 91% 60%)"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </motion.div>

      {/* Floating particles with parallax */}
      <motion.div 
        className="particle particle-1"
        style={{ y: particle1Y, rotate: particle1Rotate }}
      />
      <motion.div 
        className="particle particle-2"
        style={{ y: particle2Y }}
      />
      <motion.div 
        className="particle particle-3"
        style={{ y: particle3Y, rotate: particle3Rotate }}
      />
      <motion.div 
        className="particle particle-4"
        style={{ y: particle4Y }}
      />
      <motion.div 
        className="particle particle-5"
        style={{ y: particle5Y }}
      />

      {/* Extra glow orbs with parallax */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
        style={{ y: orb1Y }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-info/10 rounded-full blur-3xl animate-float-delayed"
        style={{ y: orb2Y }}
      />
      
      {/* Additional parallax elements for depth */}
      <motion.div 
        className="absolute top-[10%] left-[15%] w-3 h-3 bg-primary/40 rounded-full"
        style={{ 
          y: useTransform(smoothScrollY, [0, 500], [0, 180]),
          scale: useTransform(smoothScrollY, [0, 500], [1, 0.5])
        }}
      />
      <motion.div 
        className="absolute top-[60%] right-[10%] w-4 h-4 bg-success/30 rounded-full"
        style={{ 
          y: useTransform(smoothScrollY, [0, 500], [0, -120]),
          scale: useTransform(smoothScrollY, [0, 500], [1, 1.5])
        }}
      />
      <motion.div 
        className="absolute top-[40%] left-[60%] w-2 h-2 bg-warning/40 rounded-full"
        style={{ 
          y: useTransform(smoothScrollY, [0, 500], [0, 100]),
          x: useTransform(smoothScrollY, [0, 500], [0, -50])
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
