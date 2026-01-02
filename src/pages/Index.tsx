import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProfileImage from '@/components/ProfileImage';
import StatItem from '@/components/StatItem';
import NavigationCard from '@/components/NavigationCard';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import SEO from '@/components/SEO';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

const navItems = [
  { title: 'خدماتي', description: 'الباقات والأسعار', icon: 'service' as const, link: '/services' },
  { title: 'مشاريعي', description: 'أعمالي المبدعة', icon: 'briefcase' as const, link: '/projects' },
  { title: 'مهاراتي', description: 'قدرات الخاصة', icon: 'target' as const, link: '/skills' },
  { title: 'اتصل بي', description: 'لعمل إدارتي', icon: 'mail' as const, link: '/contact' },
  { title: 'سيرتي الذاتية', description: 'CV تفاعلي', icon: 'file' as const, link: '/resume' },
  { title: 'أسئلة شائعة', description: 'FAQ', icon: 'help' as const, link: '/faq' },
];

const socialLinks = [
  { 
    icon: Github, 
    label: 'GitHub', 
    url: 'https://github.com/dev-mustafa-hussin',
    color: 'hover:text-foreground'
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/mustafa-hussein-53228678/',
    color: 'hover:text-info'
  },
  { 
    icon: MessageCircle, 
    label: 'WhatsApp', 
    url: 'https://wa.me/201234567890',
    color: 'hover:text-success'
  },
];

const Index = () => {
  const [currentNavIndex, setCurrentNavIndex] = useState(0);

  const handlePrev = () => {
    setCurrentNavIndex((prev) => (prev > 0 ? prev - 1 : navItems.length - 1));
  };

  const handleNext = () => {
    setCurrentNavIndex((prev) => (prev < navItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <SEO 
        title="Mustafa Hussein | مطور تطبيقات محترف"
        description="مصطفى حسين أحمد - مطور تطبيقات محترف متخصص في Flutter و React Native. أطوّر حلولاً رقمية فريدة لا تُنسى. +3 مشاريع مكتملة، +15 تقنية، 100% رضا العملاء."
        url="https://cv.3mcode-solutions.com/"
      />
      <div className="min-h-screen min-h-[100dvh] relative overflow-hidden safe-area-top">
        <AnimatedBackground />

      {/* Floating Social Links - Desktop */}
      <motion.div 
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 
                       flex items-center justify-center text-muted-foreground ${social.color}
                       hover:border-primary hover:shadow-[0_0_20px_hsl(252_100%_68%_/_0.3)]
                       transition-all duration-300`}
            aria-label={social.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + index * 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>

      <main className="relative z-10 container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 min-h-[45vh] sm:min-h-[50vh] lg:min-h-[60vh]">
          {/* Profile Image - Shows first on mobile */}
          <ScaleIn delay={0.2} className="flex-shrink-0 order-first lg:order-last">
            <ProfileImage />
          </ScaleIn>

          {/* Content */}
          <div className="text-center lg:text-right flex-1 max-w-xl">
            <FadeIn delay={0.3} direction="up">
              <motion.h1 
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              >
                Mustafa Hussein
              </motion.h1>
              <motion.h2 
                className="text-lg xs:text-xl md:text-2xl text-primary font-medium mb-2 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              >
                Full Stack Developer & ERP Consultant
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-sm xs:text-base md:text-lg mb-6 sm:mb-8 px-2 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              >
                أطوّر حلولاً رقمية فريدة لا تُنسى
              </motion.p>
            </FadeIn>

            {/* Stats */}
            <StaggerContainer delay={0.7} staggerDelay={0.1} className="flex flex-wrap items-center gap-3 xs:gap-4 md:gap-6 justify-center lg:justify-start">
              <StaggerItem>
                <StatItem value="100%" label="رضا المقرر" emoji="👍" />
              </StaggerItem>
              <StaggerItem>
                <StatItem value="+15" label="تكنولوجيا مستخدمة" />
              </StaggerItem>
              <StaggerItem>
                <StatItem value="+3" label="مشروع مكتمل" emoji="💼" />
              </StaggerItem>
            </StaggerContainer>

            {/* Social Links - Mobile & Tablet */}
            <StaggerContainer delay={0.9} staggerDelay={0.1} className="flex lg:hidden items-center justify-center lg:justify-start gap-3 mt-6">
              {socialLinks.map((social) => (
                <StaggerItem key={social.label}>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-full bg-card/80 border border-primary/30 
                               flex items-center justify-center text-muted-foreground ${social.color}
                               hover:border-primary transition-all duration-300`}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 safe-area-bottom">
          {/* Mobile: Show one card at a time with dots indicator */}
          <motion.div 
            className="block md:hidden px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <NavigationCard
              {...navItems[currentNavIndex]}
              onPrev={handlePrev}
              onNext={handleNext}
            />
            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {navItems.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentNavIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentNavIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
                  }`}
                  aria-label={`انتقل إلى ${navItems[index].title}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Tablet: Show 3 cards */}
          <div className="hidden md:block lg:hidden">
            <StaggerContainer delay={1} staggerDelay={0.1} className="grid grid-cols-3 gap-4">
              {navItems.slice(0, 3).map((item) => (
                <StaggerItem key={item.title}>
                  <NavigationCard
                    {...item}
                    showPrev={false}
                    showNext={false}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
            <StaggerContainer delay={1.3} staggerDelay={0.1} className="grid grid-cols-2 gap-4 mt-4">
              {navItems.slice(3).map((item) => (
                <StaggerItem key={item.title}>
                  <NavigationCard
                    {...item}
                    showPrev={false}
                    showNext={false}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Desktop: Show all 5 cards */}
          <StaggerContainer delay={1} staggerDelay={0.1} className="hidden lg:grid grid-cols-5 gap-4 xl:gap-6">
            {navItems.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <NavigationCard
                    {...item}
                    showPrev={false}
                    showNext={false}
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      </div>
    </>
  );
};

export default Index;
