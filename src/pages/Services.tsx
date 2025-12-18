import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Database, Globe, BookOpen, BarChart3, Check, MessageCircle, 
  Building, Users, Clock, Zap, Star, ArrowLeft
} from 'lucide-react';

interface ServicePackage {
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  popular?: boolean;
}

interface Service {
  id: string;
  title: string;
  titleAr: string;
  icon: React.ElementType;
  description: string;
  packages: ServicePackage[];
  formFields: {
    label: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'select';
    options?: string[];
  }[];
}

const services: Service[] = [
  {
    id: 'odoo-development',
    title: 'Odoo ERP Development',
    titleAr: 'تطوير وتخصيص أودوو',
    icon: Database,
    description: 'تطوير موديولات مخصصة، تعديل الموديولات الأساسية، بناء تقارير متقدمة، وتكاملات مع أنظمة خارجية',
    packages: [
      {
        name: 'باقة البداية',
        price: 'تواصل للسعر',
        priceNote: 'للمشاريع الصغيرة',
        features: [
          'تخصيص موديول واحد',
          'تعديلات بسيطة على الواجهة',
          'دعم فني لمدة شهر',
          'تدريب أساسي للمستخدمين',
        ],
      },
      {
        name: 'باقة الأعمال',
        price: 'تواصل للسعر',
        priceNote: 'للشركات المتوسطة',
        features: [
          'تطوير حتى 3 موديولات',
          'تقارير مخصصة PDF/Excel',
          'تكامل مع API خارجي',
          'دعم فني لمدة 3 أشهر',
          'تدريب شامل للفريق',
        ],
        popular: true,
      },
      {
        name: 'باقة المؤسسات',
        price: 'تواصل للسعر',
        priceNote: 'للمشاريع الكبيرة',
        features: [
          'تطوير موديولات غير محدودة',
          'تكاملات متعددة',
          'Dashboard تحليلي متقدم',
          'دعم فني لمدة سنة',
          'تدريب ومتابعة مستمرة',
          'أولوية في الدعم',
        ],
      },
    ],
    formFields: [
      { label: 'اسم الشركة', placeholder: 'أدخل اسم شركتك', type: 'text' },
      { label: 'عدد المستخدمين المتوقع', placeholder: 'مثال: 10-50 مستخدم', type: 'text' },
      { label: 'الموديولات المطلوبة', placeholder: 'اختر الموديولات', type: 'select', options: ['المبيعات', 'المشتريات', 'المخزون', 'المحاسبة', 'الموارد البشرية', 'التصنيع', 'نقاط البيع', 'أخرى'] },
      { label: 'وصف المشروع', placeholder: 'اشرح متطلباتك بالتفصيل...', type: 'textarea' },
    ],
  },
  {
    id: 'web-development',
    title: 'Full Stack Web Development',
    titleAr: 'تطوير ويب متكامل',
    icon: Globe,
    description: 'تطوير تطبيقات ويب متكاملة باستخدام React, TypeScript, Node.js مع تصميم متجاوب وأداء عالي',
    packages: [
      {
        name: 'موقع بسيط',
        price: 'تواصل للسعر',
        priceNote: 'Landing Page',
        features: [
          'صفحة واحدة متجاوبة',
          'تصميم عصري وجذاب',
          'نموذج تواصل',
          'تحسين SEO أساسي',
        ],
      },
      {
        name: 'موقع متكامل',
        price: 'تواصل للسعر',
        priceNote: 'للشركات',
        features: [
          'حتى 10 صفحات',
          'لوحة تحكم إدارية',
          'قاعدة بيانات',
          'نظام مصادقة',
          'تحسين SEO متقدم',
        ],
        popular: true,
      },
      {
        name: 'تطبيق ويب',
        price: 'تواصل للسعر',
        priceNote: 'Web Application',
        features: [
          'تطبيق ويب متكامل',
          'واجهة مستخدم تفاعلية',
          'APIs متقدمة',
          'تكاملات خارجية',
          'دعم وصيانة',
          'استضافة ونشر',
        ],
      },
    ],
    formFields: [
      { label: 'نوع المشروع', placeholder: 'اختر نوع المشروع', type: 'select', options: ['موقع شركة', 'متجر إلكتروني', 'تطبيق ويب', 'لوحة تحكم', 'منصة تعليمية', 'أخرى'] },
      { label: 'الميزات المطلوبة', placeholder: 'اختر الميزات', type: 'select', options: ['نظام مستخدمين', 'دفع إلكتروني', 'لوحة تحكم', 'تقارير', 'إشعارات', 'متعدد اللغات'] },
      { label: 'الميزانية التقريبية', placeholder: 'حدد ميزانيتك', type: 'select', options: ['أقل من 5000 ج.م', '5000 - 15000 ج.م', '15000 - 30000 ج.م', 'أكثر من 30000 ج.م'] },
      { label: 'وصف الفكرة', placeholder: 'اشرح فكرة مشروعك...', type: 'textarea' },
    ],
  },
  {
    id: 'odoo-training',
    title: 'Odoo Training & Consulting',
    titleAr: 'تدريب واستشارات أودوو',
    icon: BookOpen,
    description: 'برامج تدريبية متكاملة للفرق التقنية والوظيفية على نظام Odoo مع استشارات متخصصة',
    packages: [
      {
        name: 'تدريب أساسي',
        price: 'تواصل للسعر',
        priceNote: 'للمستخدمين',
        features: [
          'تدريب على الاستخدام الأساسي',
          '8 ساعات تدريبية',
          'مواد تدريبية مكتوبة',
          'شهادة إتمام',
        ],
      },
      {
        name: 'تدريب متقدم',
        price: 'تواصل للسعر',
        priceNote: 'للمسؤولين',
        features: [
          'إعداد وتهيئة النظام',
          '16 ساعة تدريبية',
          'تمارين عملية',
          'دعم بعد التدريب',
          'شهادة معتمدة',
        ],
        popular: true,
      },
      {
        name: 'تدريب تطوير',
        price: 'تواصل للسعر',
        priceNote: 'للمطورين',
        features: [
          'تطوير موديولات Odoo',
          '24+ ساعة تدريبية',
          'مشروع تطبيقي كامل',
          'كود المصدر والأمثلة',
          'متابعة لمدة شهر',
          'شهادة مطور Odoo',
        ],
      },
    ],
    formFields: [
      { label: 'نوع التدريب', placeholder: 'اختر نوع التدريب', type: 'select', options: ['تدريب مستخدمين', 'تدريب مسؤولين', 'تدريب مطورين', 'استشارة فنية'] },
      { label: 'عدد المتدربين', placeholder: 'مثال: 5 أشخاص', type: 'text' },
      { label: 'مكان التدريب', placeholder: 'اختر المكان', type: 'select', options: ['أونلاين', 'في مقر الشركة', 'في مركز تدريب'] },
      { label: 'ملاحظات إضافية', placeholder: 'أي متطلبات خاصة...', type: 'textarea' },
    ],
  },
  {
    id: 'business-analysis',
    title: 'Business Analysis & ERP Implementation',
    titleAr: 'تحليل الأعمال وتنفيذ الأنظمة',
    icon: BarChart3,
    description: 'تحليل شامل لمتطلبات الأعمال وإدارة مشاريع تنفيذ أنظمة ERP من البداية للتشغيل',
    packages: [
      {
        name: 'تحليل أولي',
        price: 'تواصل للسعر',
        priceNote: 'Discovery',
        features: [
          'تحليل العمليات الحالية',
          'تحديد المتطلبات',
          'تقرير توصيات',
          'خطة عمل مبدئية',
        ],
      },
      {
        name: 'تنفيذ جزئي',
        price: 'تواصل للسعر',
        priceNote: 'قسم واحد',
        features: [
          'تحليل وتصميم',
          'تنفيذ قسم واحد',
          'نقل البيانات',
          'تدريب المستخدمين',
          'دعم شهر',
        ],
        popular: true,
      },
      {
        name: 'تنفيذ شامل',
        price: 'تواصل للسعر',
        priceNote: 'End-to-End',
        features: [
          'تحليل شامل للأعمال',
          'تنفيذ جميع الأقسام',
          'نقل كامل للبيانات',
          'تدريب جميع الفرق',
          'دعم 6 أشهر',
          'مدير مشروع مخصص',
        ],
      },
    ],
    formFields: [
      { label: 'اسم الشركة', placeholder: 'أدخل اسم شركتك', type: 'text' },
      { label: 'مجال العمل', placeholder: 'اختر مجال العمل', type: 'select', options: ['تجارة', 'تصنيع', 'خدمات', 'تقنية', 'تعليم', 'صحة', 'أخرى'] },
      { label: 'حجم الشركة', placeholder: 'اختر حجم الشركة', type: 'select', options: ['1-10 موظفين', '11-50 موظف', '51-200 موظف', 'أكثر من 200'] },
      { label: 'الأقسام المطلوب تنفيذها', placeholder: 'اختر الأقسام', type: 'select', options: ['المبيعات', 'المشتريات', 'المخزون', 'المالية', 'الموارد البشرية', 'الإنتاج', 'الكل'] },
      { label: 'وصف الاحتياجات', placeholder: 'اشرح احتياجاتك بالتفصيل...', type: 'textarea' },
    ],
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const whatsappNumber = '201066094050';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppMessage = () => {
    if (!selectedService) return '';
    
    let message = `مرحباً، أريد الاستفسار عن خدمة: ${selectedService.titleAr}\n`;
    message += `الباقة المختارة: ${selectedPackage || 'غير محددة'}\n\n`;
    message += `📋 تفاصيل المشروع:\n`;
    
    selectedService.formFields.forEach(field => {
      if (formData[field.label]) {
        message += `• ${field.label}: ${formData[field.label]}\n`;
      }
    });
    
    return encodeURIComponent(message);
  };

  const handleSubmit = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <SEO 
        title="خدماتي | Full Stack Developer & ERP Consultant"
        description="خدمات تطوير Odoo ERP، تطوير ويب متكامل، تدريب واستشارات، تحليل أعمال وتنفيذ أنظمة. احصل على عرض سعر مخصص."
        url="https://cv.3mcode-solutions.com/services"
        keywords="Odoo services, web development, ERP implementation, training, consulting, أسعار"
      />
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />

        <main className="relative z-10 container mx-auto px-4 py-8">
          {/* Back button */}
          <div className="mb-6 animate-fade-in">
            <BackButton to="/" label="الرئيسية" />
          </div>

          {!selectedService ? (
            <>
              {/* Header */}
              <div className="text-center mb-12 animate-slide-up">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  خدماتي 💼
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  اختر الخدمة المناسبة لك واحصل على عرض سعر مخصص لمشروعك
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className="card-glass p-6 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {service.titleAr}
                        </h3>
                        <p className="text-sm text-primary mb-2">{service.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {service.packages.length} باقات متاحة
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary">
                        عرض التفاصيل
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="card-glass p-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                  لماذا تختارني؟ ⭐
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Building, label: '+20 شركة', desc: 'عملاء راضين' },
                    { icon: Clock, label: '+4 سنوات', desc: 'خبرة متراكمة' },
                    { icon: Users, label: '+100 متدرب', desc: 'تم تدريبهم' },
                    { icon: Zap, label: '100%', desc: 'نسبة نجاح' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-xl font-bold text-foreground">{stat.label}</p>
                      <p className="text-sm text-muted-foreground">{stat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Back to Services */}
              <button
                onClick={() => {
                  setSelectedService(null);
                  setFormData({});
                  setSelectedPackage('');
                }}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                العودة للخدمات
              </button>

              {/* Service Header */}
              <div className="text-center mb-8 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mx-auto mb-4">
                  <selectedService.icon className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {selectedService.titleAr}
                </h1>
                <p className="text-primary mb-2">{selectedService.title}</p>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {selectedService.description}
                </p>
              </div>

              {/* Packages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {selectedService.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`card-glass p-6 relative cursor-pointer transition-all duration-300 animate-slide-up ${
                      selectedPackage === pkg.name 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'hover:border-primary/50'
                    } ${pkg.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    onClick={() => setSelectedPackage(pkg.name)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        الأكثر طلباً
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                      <p className="text-2xl font-bold text-primary mt-2">{pkg.price}</p>
                      <p className="text-sm text-muted-foreground">{pkg.priceNote}</p>
                    </div>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {selectedPackage === pkg.name && (
                      <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="card-glass p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  أخبرني عن مشروعك
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedService.formFields.map((field, index) => (
                    <div 
                      key={index} 
                      className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                    >
                      <Label className="text-foreground mb-2 block">{field.label}</Label>
                      {field.type === 'text' && (
                        <Input
                          placeholder={field.placeholder}
                          value={formData[field.label] || ''}
                          onChange={(e) => handleInputChange(field.label, e.target.value)}
                          className="bg-card/50 border-border/50"
                        />
                      )}
                      {field.type === 'select' && (
                        <select
                          className="w-full h-10 px-3 rounded-md bg-card/50 border border-border/50 text-foreground focus:border-primary outline-none"
                          value={formData[field.label] || ''}
                          onChange={(e) => handleInputChange(field.label, e.target.value)}
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}
                      {field.type === 'textarea' && (
                        <Textarea
                          placeholder={field.placeholder}
                          value={formData[field.label] || ''}
                          onChange={(e) => handleInputChange(field.label, e.target.value)}
                          className="bg-card/50 border-border/50 min-h-[120px]"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full mt-6 bg-success hover:bg-success/90 text-white flex items-center justify-center gap-2 h-12 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل عبر واتساب
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-3">
                  سيتم توجيهك للواتساب مع تفاصيل مشروعك
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Services;
