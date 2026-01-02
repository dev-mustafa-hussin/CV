import { useState, useMemo } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProjectCard from '@/components/ProjectCard';
import BackButton from '@/components/BackButton';
import StatItem from '@/components/StatItem';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { Search, Filter, X, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(projects.map(p => p.category))];
  }, []);

  // Get unique technologies
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => {
      p.technologies.forEach(t => techs.add(t.name));
    });
    return [...techs].slice(0, 10); // Limit to 10 most common
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter
      const searchMatch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.titleAr.includes(searchQuery) ||
        project.description.includes(searchQuery) ||
        project.technologies.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const categoryMatch = !selectedCategory || project.category === selectedCategory;

      // Technology filter
      const techMatch = !selectedTech || project.technologies.some(t => t.name === selectedTech);

      return searchMatch && categoryMatch && techMatch;
    });
  }, [searchQuery, selectedCategory, selectedTech]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTech(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTech;

  return (
    <>
      <SEO 
        title="مشاريعي"
        description="استعرض مجموعة من أبرز المشاريع التي قمت بتطويرها باستخدام Flutter و React Native وأحدث التقنيات."
        url="https://cv.3mcode-solutions.com/projects"
        keywords="مشاريع, Flutter projects, تطبيقات موبايل, portfolio, أعمال سابقة"
      />
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <BackButton to="/" label="الرئيسية" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="animate-slide-right">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              أعمالي المبدعة 🚀
            </h1>
            <p className="text-muted-foreground max-w-xl">
              مجموعة من أبرز المشاريع التي قمت بتطويرها باستخدام أحدث التقنيات
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <StatItem value="100%" label="رضا المقرر" emoji="👍" />
            <StatItem value="+15" label="تكنولوجيا مستخدمة" />
            <StatItem value="+3" label="مشروع مكتمل" emoji="💼" />
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="card-glass p-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث في المشاريع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-card/50 border-border/50 focus:border-primary"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="shrink-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="shrink-0"
              >
                <List className="w-4 h-4" />
              </Button>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="shrink-0 text-destructive border-destructive/50 hover:bg-destructive/10"
                >
                  <X className="w-4 h-4 ml-1" />
                  مسح الفلاتر
                </Button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">التصنيفات:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-primary/20'
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Technology Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-info" />
              <span className="text-sm text-muted-foreground">التقنيات:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map(tech => (
                <Badge
                  key={tech}
                  variant={selectedTech === tech ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all text-xs ${
                    selectedTech === tech 
                      ? 'bg-info text-info-foreground' 
                      : 'hover:bg-info/20 border-info/30'
                  }`}
                  onClick={() => setSelectedTech(
                    selectedTech === tech ? null : tech
                  )}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground animate-fade-in">
          عرض {filteredProjects.length} من {projects.length} مشروع
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  titleAr={project.titleAr}
                  category={project.category}
                  description={project.description}
                  technologies={project.technologies.map((t) => t.name)}
                  icon={project.icon}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card-glass p-12 text-center animate-fade-in">
            <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-muted-foreground mb-4">
              لم نجد مشاريع تطابق بحثك. جرب تغيير الفلاتر أو البحث بكلمات مختلفة.
            </p>
            <Button onClick={clearFilters} variant="outline">
              مسح جميع الفلاتر
            </Button>
          </div>
        )}
      </main>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
