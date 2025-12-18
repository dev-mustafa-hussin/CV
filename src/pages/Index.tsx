import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProfileImage from '@/components/ProfileImage';
import StatItem from '@/components/StatItem';
import NavigationCard from '@/components/NavigationCard';

const navItems = [
  { title: 'اتصل بي', description: 'لعمل إدارتي', icon: 'mail' as const, link: '/contact' },
  { title: 'مهاراتي', description: 'قدرات الخاصة', icon: 'target' as const, link: '/skills' },
  { title: 'مشاريعي', description: 'أعمالي المبدعة', icon: 'briefcase' as const, link: '/projects' },
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
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[60vh]">
          {/* Right side - Profile Image */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <ProfileImage />
          </div>

          {/* Left side - Content */}
          <div className="text-center lg:text-right max-w-xl">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Akram Atiia
              </h1>
              <h2 className="text-xl md:text-2xl text-primary font-medium mb-6">
                مطور تطبيقات
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                أطوّر حلولاً رقمية فريدة لا تُنسى
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <StatItem value="100%" label="رضا المقرر" emoji="👍" />
              <StatItem value="+15" label="تكنولوجيا مستخدمة" />
              <StatItem value="+3" label="مشروع مكتمل" emoji="💼" />
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-12 md:mt-16 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          {/* Mobile: Show one card at a time */}
          <div className="block md:hidden">
            <NavigationCard
              {...navItems[currentNavIndex]}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>

          {/* Desktop: Show all cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
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
