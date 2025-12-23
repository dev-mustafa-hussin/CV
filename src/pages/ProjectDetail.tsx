import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import TechBadge from '@/components/TechBadge';
import AnimatedCounter from '@/components/AnimatedCounter';
import { projects, ProjectStat } from '@/data/projects';
import StatsChart from '@/components/StatsChart';
import ProjectTimeline from '@/components/ProjectTimeline';
import TechStack3D from '@/components/TechStack3D';
import { ShoppingBag, MessageCircle, Users, Rocket, Zap, Database, AlertTriangle, CheckCircle, Lightbulb, Play, Video, Cloud, Images, ChevronLeft, ChevronRight, X, Download, Star, Code, Clock, RefreshCw, TrendingUp, BarChart3, GitBranch, Box, Globe, BookOpen, Building, CheckSquare, Wallet, Dumbbell, GraduationCap, UtensilsCrossed, Plane, ExternalLink } from 'lucide-react';
// Import screenshots
import ecommerceScreenshot from '@/assets/projects/ecommerce-screenshot.png';
import ecommerceCart from '@/assets/projects/ecommerce-cart.png';
import ecommerceProduct from '@/assets/projects/ecommerce-product.png';
import chatappScreenshot from '@/assets/projects/chatapp-screenshot.png';
import chatappContacts from '@/assets/projects/chatapp-contacts.png';
import chatappGroup from '@/assets/projects/chatapp-group.png';
import socialmediaScreenshot from '@/assets/projects/socialmedia-screenshot.png';
import socialmediaProfile from '@/assets/projects/socialmedia-profile.png';
import socialmediaExplore from '@/assets/projects/socialmedia-explore.png';
import taskmanagerScreenshot from '@/assets/projects/taskmanager-screenshot.png';
import fitnessScreenshot from '@/assets/projects/fitness-screenshot.png';
import educationScreenshot from '@/assets/projects/education-screenshot.png';
import fooddeliveryScreenshot from '@/assets/projects/fooddelivery-screenshot.png';
import travelScreenshot from '@/assets/projects/travel-screenshot.png';
import walletScreenshot from '@/assets/projects/wallet-screenshot.png';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shopping: ShoppingBag,
  chat: MessageCircle,
  social: Users,
  task: CheckSquare,
  fitness: Dumbbell,
  education: GraduationCap,
  food: UtensilsCrossed,
  travel: Plane,
  wallet: Wallet,
  erp: Database,
  web: Globe,
  training: BookOpen,
  analysis: BarChart3,
};

const statIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  downloads: Download,
  star: Star,
  code: Code,
  clock: Clock,
  update: RefreshCw,
  check: CheckSquare,
  building: Building,
};

const screenshotMap: Record<string, string> = {
  ecommerce: ecommerceScreenshot,
  chatapp: chatappScreenshot,
  socialmedia: socialmediaScreenshot,
  taskmanager: taskmanagerScreenshot,
  fitness: fitnessScreenshot,
  education: educationScreenshot,
  fooddelivery: fooddeliveryScreenshot,
  travel: travelScreenshot,
  wallet: walletScreenshot,
};

const galleryMap: Record<string, string[]> = {
  ecommerce: [ecommerceScreenshot, ecommerceCart, ecommerceProduct],
  chatapp: [chatappScreenshot, chatappContacts, chatappGroup],
  socialmedia: [socialmediaScreenshot, socialmediaProfile, socialmediaExplore],
  taskmanager: [taskmanagerScreenshot],
  fitness: [fitnessScreenshot],
  education: [educationScreenshot],
  fooddelivery: [fooddeliveryScreenshot],
  travel: [travelScreenshot],
  wallet: [walletScreenshot],
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">المشروع غير موجود</p>
      </div>
    );
  }

  const IconComponent = iconMap[project.icon];
  const screenshot = screenshotMap[project.id];
  const gallery = galleryMap[project.id] || [];
  
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage(prev => prev !== null ? (prev + 1) % gallery.length : 0);
  const prevImage = () => setSelectedImage(prev => prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <BackButton to="/projects" label="المشاريع" />
        </div>

        {/* Header with Screenshot */}
        <div className="card-glass p-8 mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            {/* Screenshot */}
            <div className="relative w-48 md:w-56 lg:w-64 flex-shrink-0">
              <div className="relative rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
                <img 
                  src={screenshot} 
                  alt={project.titleAr}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
              {/* Icon badge */}
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center glow-border">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center lg:text-right flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                {project.title} - {project.titleAr}
              </h1>
              <span className="inline-block bg-info/20 text-info px-4 py-1.5 rounded-full text-sm md:text-base mb-4">
                {project.category}
              </span>
              
              {/* Live Demo Button */}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>تجربة مباشرة</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {project.stats && project.stats.length > 0 && (
          <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {project.stats.map((stat, index) => {
                const StatIcon = statIconMap[stat.icon];
                // Parse value to extract number and suffix
                const valueMatch = stat.value.match(/^([\d,]+)(.*)$/);
                const numericValue = valueMatch ? parseInt(valueMatch[1].replace(/,/g, '')) : 0;
                const suffix = valueMatch ? valueMatch[2] : stat.value;
                
                return (
                  <div
                    key={index}
                    className="card-glass p-4 text-center animate-fade-in hover:border-primary/30 transition-all duration-300"
                    style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                      <StatIcon className="w-5 h-5 text-primary" />
                    </div>
                    {numericValue > 0 ? (
                      <AnimatedCounter 
                        value={numericValue} 
                        suffix={suffix}
                        className="text-xl md:text-2xl font-bold text-foreground"
                        duration={1500 + index * 200}
                      />
                    ) : (
                      <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                    )}
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            
            {/* Charts */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>الرسوم البيانية</span>
              </h3>
              <StatsChart stats={project.stats} />
            </div>
          </section>
        )}

        {/* About Section */}
        <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            نبذة عن المشروع
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.fullDescription}
          </p>
        </section>

        {/* Technologies Section */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="text-primary">⭐</span>
            <span>التقنيات المستخدمة</span>
          </h2>
          
          {/* 3D Tech Visualization */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" />
              <span>عرض تفاعلي ثلاثي الأبعاد</span>
            </h3>
            <TechStack3D technologies={project.technologies} />
            <p className="text-sm text-muted-foreground text-center mt-2">
              اسحب للتدوير • استخدم عجلة الماوس للتكبير
            </p>
          </div>

          {/* Tech Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.05}s` }}
              >
                <TechBadge
                  name={tech.name}
                  description={tech.description}
                  percentage={tech.percentage}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            المميزات الرئيسية 🚀
          </h2>
          <ul className="space-y-4">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-muted-foreground animate-fade-in"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <Rocket className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Supabase Features Section */}
        {project.supabaseFeatures && project.supabaseFeatures.length > 0 && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-warning" />
              <span>مميزات Supabase</span>
            </h2>
            <div className="bg-card/50 rounded-2xl p-6 border border-border/30">
              <ul className="space-y-4">
                {project.supabaseFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${0.8 + index * 0.05}s` }}
                  >
                    <Cloud className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {feature.nameAr} - <span className="text-foreground font-medium">{feature.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Database Schema Section */}
        {project.databaseSchema && project.databaseSchema.length > 0 && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" />
              <span>مخطط قاعدة البيانات</span>
            </h2>
            <div className="bg-card/50 rounded-2xl p-4 border border-border/30">
              <div className="space-y-3">
                {project.databaseSchema.map((table, index) => (
                  <div
                    key={index}
                    className="bg-background/50 rounded-xl p-4 border border-border/20 flex items-center gap-3 animate-fade-in hover:border-primary/30 transition-colors"
                    style={{ animationDelay: `${0.9 + index * 0.05}s` }}
                  >
                    <Database className="w-5 h-5 text-primary/60 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {table.nameAr} - <span className="text-foreground font-medium">{table.name}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenges and Solutions Section */}
        {project.challenges && project.solutions && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-warning" />
              <span>التحديات والحلول</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Challenges */}
              <div className="bg-warning/10 rounded-2xl p-6 border border-warning/30">
                <h3 className="text-lg font-semibold text-warning mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>التحديات</span>
                </h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground animate-fade-in"
                      style={{ animationDelay: `${1 + index * 0.1}s` }}
                    >
                      <span className="text-warning mt-1">▸</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="bg-success/10 rounded-2xl p-6 border border-success/30">
                <h3 className="text-lg font-semibold text-success mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>الحلول</span>
                </h3>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground animate-fade-in"
                      style={{ animationDelay: `${1 + index * 0.1}s` }}
                    >
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Timeline Section */}
        {project.timeline && project.timeline.length > 0 && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.92s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-primary" />
              <span>مراحل التطوير</span>
            </h2>
            <ProjectTimeline milestones={project.timeline} />
          </section>
        )}

        {/* Gallery Section */}
        {gallery.length > 0 && (
          <section className="card-glass p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.95s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Images className="w-6 h-6 text-primary" />
              <span>معرض الصور</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                    <img
                      src={img}
                      alt={`${project.titleAr} - صورة ${index + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <span className="text-sm text-foreground font-medium">عرض الصورة</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video/Live Preview Section */}
        {project.videoUrl && (
          <section className="card-glass p-6 animate-slide-up" style={{ animationDelay: '1s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Video className="w-6 h-6 text-primary" />
              <span>معاينة حية للمشروع</span>
            </h2>
            <div className="bg-card/50 rounded-2xl border border-border/30 overflow-hidden">
              {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={project.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                    title={`${project.titleAr} - فيديو توضيحي`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-2xl"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Interactive iframe preview */}
                  <div className="aspect-video relative group">
                    <iframe
                      src={project.videoUrl}
                      title={`${project.titleAr} - معاينة حية`}
                      className="w-full h-full rounded-t-2xl border-0"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-background/30 rounded-b-2xl">
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>فتح في نافذة جديدة</span>
                    </a>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Play className="w-4 h-4 text-success animate-pulse" />
                      <span>التطبيق يعمل مباشرة</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/50 border border-border/30 flex items-center justify-center text-foreground hover:bg-card transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 w-12 h-12 rounded-full bg-card/50 border border-border/30 flex items-center justify-center text-foreground hover:bg-card transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 w-12 h-12 rounded-full bg-card/50 border border-border/30 flex items-center justify-center text-foreground hover:bg-card transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            className="max-w-sm md:max-w-md lg:max-w-lg max-h-[80vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[selectedImage]}
              alt={`${project.titleAr} - صورة ${selectedImage + 1}`}
              className="w-full h-auto rounded-3xl border-2 border-primary/30 shadow-2xl shadow-primary/30"
            />
            <p className="text-center text-muted-foreground mt-4">
              {selectedImage + 1} / {gallery.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
