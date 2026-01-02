import { useState, useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';
import { Download, Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Code, Star, Calendar, ExternalLink, FolderOpen } from 'lucide-react';
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
  title: 'Senior Full-Stack Developer & Odoo ERP Specialist',
  email: 'dev-mustafa-hussin@hotmail.com',
  phone: '01225309785',
  location: 'El Saf, Giza, Egypt',
  website: 'cv.3mcode-solutions.com',
  summary: 'Senior Full-Stack Developer & Odoo ERP Specialist with 8+ years of enterprise experience, delivering end-to-end ERP and web solutions for SMEs in retail, real estate, and manufacturing. Specialized in designing ERP architectures, multi-tenant SaaS solutions, and deep Odoo customizations, with a strong focus on performance, scalability, and business process optimization. Proven track record of completing projects on time (98% on-time delivery) and generating measurable ROI through automation, integrations, and data-driven decision support.',
  experience: [
    {
      title: 'Senior Full-Stack / Odoo ERP Developer',
      company: '3M Code Software Solutions, Giza, Egypt',
      period: 'January 2022 - Present',
      description: [
        'Odoo ERP: Expert in implementation and development for SMEs in retail, real estate, and manufacturing',
        'ASP.NET Core & C#: Backend development and RESTful APIs for scalable enterprise systems',
        'Frontend: React, Angular, Next.js for responsive and maintainable web applications',
        'Databases: PostgreSQL, MySQL, SQL Server, MongoDB for data modeling and performance tuning',
        'DevOps: Docker, CI/CD, Railway, Hostinger, n8n for automated deployments and integrations',
      ],
    },
    {
      title: 'Full-Stack Developer / ERP Consultant',
      company: 'Freelance Projects, Remote',
      period: 'January 2018 - Present',
      description: [
        'Led full-stack development of web applications using ASP.NET Core, C#, React, and SQL/MongoDB, ensuring scalable and maintainable architectures',
        'Implemented and configured Odoo ERP for SMEs in retail, real estate, and manufacturing, aligning system workflows with business requirements',
        'Designed and developed RESTful APIs and integrations between Odoo, third-party services, and in-house systems to streamline operations',
        'Optimized database queries, indexing, and data models to improve performance, reporting accuracy, and decision-making',
        'Collaborated with stakeholders to gather requirements, prioritize features, and deliver projects with a 98% on-time completion rate',
      ],
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: 'Industrial Secondary School (Three-Year System)',
      institution: 'El Saf Industrial Secondary School, El Saf Giza',
      period: 'December 2005 - 75%',
    },
  ] as EducationItem[],
  skills: [
    {
      category: 'ERP & Business',
      skills: [
        { name: 'Odoo ERP Implementation', level: 98 },
        { name: 'Workflow Automation', level: 95 },
        { name: 'Business Process Analysis', level: 92 },
      ],
    },
    {
      category: 'Backend Development',
      skills: [
        { name: 'ASP.NET Core (C#)', level: 95 },
        { name: 'Node.js', level: 88 },
        { name: 'RESTful APIs', level: 95 },
      ],
    },
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React', level: 92 },
        { name: 'Angular', level: 85 },
        { name: 'Next.js', level: 88 },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'PostgreSQL', level: 95 },
        { name: 'MySQL', level: 90 },
        { name: 'SQL Server', level: 88 },
        { name: 'MongoDB', level: 85 },
      ],
    },
    {
      category: 'DevOps & Cloud',
      skills: [
        { name: 'Docker', level: 88 },
        { name: 'CI/CD', level: 85 },
        { name: 'n8n / Zapier / Make.com', level: 90 },
      ],
    },
    {
      category: 'Architecture & Practices',
      skills: [
        { name: 'SOLID Principles', level: 92 },
        { name: 'Clean Architecture', level: 90 },
        { name: 'Microservices', level: 85 },
      ],
    },
  ] as SkillCategory[],
  certifications: [
    'Odoo Certified Professional Developer - Certified professional demonstrating expertise in Odoo ERP system implementation, customization, and module development across enterprise environments',
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Fluent' },
  ],
  projects: [
    {
      name: 'Wasalny – Online Food & Grocery Delivery Platform',
      description: [
        'Designed and implemented a responsive Arabic-first UI/UX for a food & grocery delivery platform with category-based filtering, search, promotions slider, and mobile-ready layout',
        'Developed user account features including profile management, saved addresses, favorites, cart, and order history',
        'Integrated marketing features such as promo codes (e.g., FIRST50), free-delivery thresholds, and weekend offers',
        'Built support and legal sections (FAQ, Contact, Terms & Privacy) to make the platform production-ready',
      ],
    },
    {
      name: 'Hisabix ERP – Modular Accounting & Business Management System',
      description: [
        'Custom ERP solution focusing on financial accounting, inventory, sales, and purchasing workflows for SMEs',
        'Designed and implemented core accounting modules (chart of accounts, journal entries, trial balance, and financial reports)',
        'Developed inventory, sales, and purchasing flows with document lifecycle and stock movement tracking',
        'Implemented role-based access control and multi-company/branch structure',
        'Built configurable VAT/tax rules and automated posting of financial transactions',
      ],
    },
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

              {/* Projects */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  المشاريع المميزة
                </h2>
                <div className="space-y-6">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="relative pr-4 border-r-2 border-primary/30">
                      <div className="absolute -right-2 top-0 w-4 h-4 rounded-full bg-primary" />
                      <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
                      <ul className="space-y-1">
                        {project.description.map((item, i) => (
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
      <Footer />
    </div>
  );
};

export default Resume;
