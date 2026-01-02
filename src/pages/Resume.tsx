import { useState, useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import { Download, Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Code, Star, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

const resumeData = {
  name: 'Mustafa Hussein Ahmed',
  nameAr: 'مصطفى حسين أحمد',
  title: 'Full Stack Developer & ERP Consultant',
  email: 'mustafa@example.com',
  phone: '+20 123 456 7890',
  location: 'القاهرة، مصر',
  website: 'cv.3mcode-solutions.com',
  summary: 'مطور ومستشار متخصص في أنظمة Odoo ERP وتطوير الويب المتكامل بخبرة +4 سنوات. أقدم خدمات تطوير وتخصيص Odoo، تدريب الفرق، تحليل الأعمال، وتنفيذ أنظمة ERP من البداية للتشغيل. خبرة شاملة في Python، React، PostgreSQL مع تركيز على جودة الحلول وتحقيق أهداف العملاء.',
  experience: [
    {
      title: 'Odoo ERP Consultant & Developer',
      company: 'مستقل / Freelancer',
      period: '2022 - الحالي',
      description: [
        'تطوير وتخصيص +50 موديول Odoo مخصص',
        'تنفيذ +10 مشاريع ERP كاملة من التحليل للتشغيل',
        'تدريب +100 متدرب على استخدام وتطوير Odoo',
        'تحقيق 100% نسبة نجاح في تسليم المشاريع',
      ],
    },
    {
      title: 'Full Stack Web Developer',
      company: 'شركات متعددة',
      period: '2021 - الحالي',
      description: [
        'تطوير +30 تطبيق ويب باستخدام React و TypeScript',
        'بناء APIs وخدمات Backend باستخدام Node.js و Python',
        'تصميم وإدارة قواعد بيانات PostgreSQL و MySQL',
        'تحسين أداء التطبيقات وتطبيق أفضل ممارسات الأمان',
      ],
    },
    {
      title: 'Business Analyst & ERP Implementation',
      company: 'استشارات مستقلة',
      period: '2021 - الحالي',
      description: [
        'تحليل متطلبات الأعمال وتوثيق العمليات',
        'إدارة مشاريع تنفيذ أنظمة ERP',
        'إعداد خطط نقل البيانات وتنفيذها',
        'تدريب المستخدمين ودعم ما بعد التشغيل',
      ],
    },
    {
      title: 'مطور تطبيقات موبايل',
      company: 'مشاريع متنوعة',
      period: '2020 - 2022',
      description: [
        'تطوير تطبيقات Flutter متعددة المنصات',
        'بناء تطبيقات E-commerce و Chat و Social Media',
        'تكامل مع Firebase و Supabase للـ Backend',
      ],
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: 'بكالوريوس علوم الحاسب',
      institution: 'جامعة القاهرة',
      period: '2017 - 2021',
    },
  ] as EducationItem[],
  skills: [
    {
      category: 'Odoo Development',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'Odoo Framework', level: 98 },
        { name: 'XML/QWeb', level: 92 },
      ],
    },
    {
      category: 'Full Stack Web',
      skills: [
        { name: 'React.js', level: 92 },
        { name: 'TypeScript', level: 90 },
        { name: 'Node.js', level: 88 },
      ],
    },
    {
      category: 'قواعد البيانات',
      skills: [
        { name: 'PostgreSQL', level: 92 },
        { name: 'MySQL', level: 85 },
        { name: 'Supabase', level: 90 },
      ],
    },
    {
      category: 'Business Analysis',
      skills: [
        { name: 'Requirements Analysis', level: 95 },
        { name: 'Process Mapping', level: 92 },
        { name: 'Project Management', level: 90 },
      ],
    },
  ] as SkillCategory[],
  certifications: [
    'Odoo Functional Certification',
    'Odoo Technical Certification',
    'Python Professional Certificate',
    'Agile Project Management',
  ],
  languages: [
    { name: 'العربية', level: 'اللغة الأم' },
    { name: 'English', level: 'متقدم' },
  ],
};

const Resume = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    // Dynamic import for html2pdf
    const html2pdf = (await import('html2pdf.js')).default;
    
    if (resumeRef.current) {
      const element = resumeRef.current;
      const opt = {
        margin: 10,
        filename: `${resumeData.name}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      
      await html2pdf().set(opt).from(element).save();
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6 animate-fade-in flex items-center justify-between">
          <BackButton to="/" label="الرئيسية" />
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'جاري التحميل...' : 'تحميل PDF'}
          </Button>
        </div>

        {/* Resume Content */}
        <div ref={resumeRef} className="card-glass p-8 animate-slide-up" style={{ backgroundColor: '#0F0F1E' }}>
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-border/30">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {resumeData.nameAr}
            </h1>
            <p className="text-xl text-primary mb-4">{resumeData.title}</p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-primary" />
                {resumeData.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-primary" />
                {resumeData.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                {resumeData.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-primary" />
                {resumeData.website}
              </span>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              نبذة شخصية
            </h2>
            <p className="text-muted-foreground leading-relaxed">{resumeData.summary}</p>
          </section>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="md:col-span-2 space-y-8">
              {/* Experience */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  الخبرة العملية
                </h2>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="relative pr-4 border-r-2 border-primary/30">
                      <div className="absolute -right-2 top-0 w-4 h-4 rounded-full bg-primary" />
                      <h3 className="font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-primary text-sm">{exp.company}</p>
                      <p className="text-muted-foreground text-sm flex items-center gap-1 mb-2">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </p>
                      <ul className="space-y-1">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  التعليم
                </h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="bg-card/30 rounded-lg p-4 border border-border/30">
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-primary text-sm">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </p>
                  </div>
                ))}
              </section>
            </div>

            {/* Side Column */}
            <div className="space-y-6">
              {/* Skills */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  المهارات
                </h2>
                <div className="space-y-4">
                  {resumeData.skills.map((category, index) => (
                    <div key={index}>
                      <h3 className="text-sm font-medium text-primary mb-2">{category.category}</h3>
                      <div className="space-y-2">
                        {category.skills.map((skill, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{skill.name}</span>
                              <span className="text-primary">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 bg-card rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-info rounded-full transition-all duration-1000"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  الشهادات
                </h2>
                <ul className="space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  اللغات
                </h2>
                <div className="space-y-2">
                  {resumeData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{lang.name}</span>
                      <span className="text-primary">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
