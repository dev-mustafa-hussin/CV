import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProfileImage from '@/components/ProfileImage';
import StatItem from '@/components/StatItem';
import NavigationCard from '@/components/NavigationCard';

const navItems = [
  { title: 'مشاريعي', description: 'أعمالي المبدعة', icon: 'briefcase' as const, link: '/projects' },
  { title: 'مهاراتي', description: 'قدرات الخاصة', icon: 'target' as const, link: '/skills' },
  { title: 'اتصل بي', description: 'لعمل إدارتي', icon: 'mail' as const, link: '/contact' },
  { title: 'سيرتي الذاتية', description: 'CV تفاعلي', icon: 'file' as const, link: '/resume' },
  { title: 'أسئلة شائعة', description: 'FAQ', icon: 'help' as const, link: '/faq' },
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
    <div className="min-h-screen min-h-[100dvh] relative overflow-hidden safe-area-top">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 min-h-[45vh] sm:min-h-[50vh] lg:min-h-[60vh]">
          {/* Profile Image - Shows first on mobile */}
          <div className="animate-fade-in flex-shrink-0 order-first lg:order-last" style={{ animationDelay: '0.2s' }}>
            <ProfileImage />
          </div>

          {/* Content */}
          <div className="text-center lg:text-right flex-1 max-w-xl">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-4">
                Akram Atiia
              </h1>
              <h2 className="text-lg xs:text-xl md:text-2xl text-primary font-medium mb-2 sm:mb-4">
                مطور تطبيقات
              </h2>
              <p className="text-muted-foreground text-sm xs:text-base md:text-lg mb-6 sm:mb-8 px-2 sm:px-0">
                أطوّر حلولاً رقمية فريدة لا تُنسى
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3 xs:gap-4 md:gap-6 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <StatItem value="100%" label="رضا المقرر" emoji="👍" />
              <StatItem value="+15" label="تكنولوجيا مستخدمة" />
              <StatItem value="+3" label="مشروع مكتمل" emoji="💼" />
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 animate-slide-up safe-area-bottom" style={{ animationDelay: '0.7s' }}>
          {/* Mobile: Show one card at a time with dots indicator */}
          <div className="block md:hidden px-4">
            <NavigationCard
              {...navItems[currentNavIndex]}
              onPrev={handlePrev}
              onNext={handleNext}
            />
            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {navItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNavIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentNavIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`انتقل إلى ${navItems[index].title}`}
                />
              ))}
            </div>
          </div>

          {/* Tablet: Show 3 cards */}
          <div className="hidden md:grid lg:hidden grid-cols-3 gap-4">
            {navItems.slice(0, 3).map((item) => (
              <NavigationCard
                key={item.title}
                {...item}
                showPrev={false}
                showNext={false}
              />
            ))}
            <div className="col-span-3 grid grid-cols-2 gap-4 mt-2">
              {navItems.slice(3).map((item) => (
                <NavigationCard
                  key={item.title}
                  {...item}
                  showPrev={false}
                  showNext={false}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Show all 5 cards */}
          <div className="hidden lg:grid grid-cols-5 gap-4 xl:gap-6">
            {navItems.map((item) => (
              <NavigationCard
                key={item.title}
                {...item}
                showPrev={false}
                showNext={false}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
