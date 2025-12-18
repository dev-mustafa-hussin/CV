export interface ProjectStat {
  icon: 'users' | 'downloads' | 'star' | 'code' | 'clock' | 'update' | 'check' | 'building';
  value: string;
  label: string;
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Project {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  description: string;
  fullDescription: string;
  icon: 'shopping' | 'chat' | 'social' | 'task' | 'fitness' | 'education' | 'food' | 'travel' | 'erp' | 'web' | 'training' | 'analysis';
  screenshot?: string;
  gallery?: string[];
  stats?: ProjectStat[];
  timeline?: TimelineMilestone[];
  technologies: {
    name: string;
    description: string;
    percentage: number;
  }[];
  features: string[];
  supabaseFeatures?: {
    name: string;
    nameAr: string;
  }[];
  databaseSchema?: {
    name: string;
    nameAr: string;
  }[];
  challenges?: string[];
  solutions?: string[];
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'odoo-development',
    title: 'Odoo ERP Development',
    titleAr: 'تطوير وتخصيص أودوو',
    category: 'Odoo Enterprise',
    description: 'تطوير وتخصيص نظام Odoo ERP بالكامل من الموديولات المخصصة إلى التكاملات المتقدمة',
    fullDescription: 'خبرة متعمقة في تطوير وتخصيص نظام Odoo Enterprise لتلبية احتياجات الأعمال المختلفة. أقوم بتطوير موديولات مخصصة، تعديل الموديولات الأساسية، بناء تقارير متقدمة، وإنشاء تكاملات مع أنظمة خارجية. التركيز على الجودة والأداء مع الالتزام بأفضل ممارسات Odoo.',
    icon: 'erp',
    stats: [
      { icon: 'building', value: '20+', label: 'شركة' },
      { icon: 'code', value: '50+', label: 'موديول مخصص' },
      { icon: 'check', value: '100%', label: 'نسبة النجاح' },
      { icon: 'clock', value: '4+', label: 'سنوات خبرة' },
    ],
    technologies: [
      { name: 'Python', description: 'لغة البرمجة الأساسية', percentage: 95 },
      { name: 'Odoo Framework', description: 'إطار العمل الرئيسي', percentage: 98 },
      { name: 'PostgreSQL', description: 'قاعدة البيانات', percentage: 90 },
      { name: 'XML/QWeb', description: 'تصميم الواجهات والتقارير', percentage: 92 },
      { name: 'JavaScript/OWL', description: 'تطوير الواجهات التفاعلية', percentage: 88 },
      { name: 'REST API', description: 'التكاملات الخارجية', percentage: 90 },
      { name: 'Docker', description: 'بيئات التطوير والنشر', percentage: 85 },
      { name: 'Git', description: 'إدارة الكود المصدري', percentage: 95 },
    ],
    features: [
      'تطوير موديولات مخصصة من الصفر',
      'تعديل وتوسيع الموديولات الأساسية',
      'بناء تقارير PDF و Excel متقدمة',
      'تطوير Wizards و Actions مخصصة',
      'إنشاء Dashboard تحليلي',
      'تكامل مع APIs خارجية',
      'تحسين الأداء وحل المشاكل التقنية',
      'تطوير Workflows آلية',
    ],
    supabaseFeatures: [
      { name: 'Sales', nameAr: 'إدارة المبيعات' },
      { name: 'Purchase', nameAr: 'إدارة المشتريات' },
      { name: 'Inventory', nameAr: 'إدارة المخزون' },
      { name: 'Accounting', nameAr: 'المحاسبة والمالية' },
      { name: 'HR', nameAr: 'إدارة الموارد البشرية' },
      { name: 'Manufacturing', nameAr: 'التصنيع والإنتاج' },
      { name: 'CRM', nameAr: 'إدارة علاقات العملاء' },
      { name: 'Project', nameAr: 'إدارة المشاريع' },
    ],
    challenges: [
      'التعامل مع متطلبات أعمال معقدة ومتنوعة',
      'ضمان التوافق مع تحديثات Odoo المستقبلية',
      'تحسين أداء النظام مع حجم بيانات كبير',
    ],
    solutions: [
      'تحليل دقيق للمتطلبات قبل البدء',
      'اتباع معايير Odoo في كتابة الكود',
      'استخدام تقنيات Caching و Optimization',
    ],
    timeline: [
      { date: '2020', title: 'بداية العمل مع Odoo', description: 'تعلم أساسيات النظام والتطوير', status: 'completed' },
      { date: '2021', title: 'مشاريع تخصيص متقدمة', description: 'تنفيذ مشاريع تخصيص لشركات مختلفة', status: 'completed' },
      { date: '2022', title: 'تطوير موديولات مخصصة', description: 'بناء موديولات من الصفر', status: 'completed' },
      { date: '2023', title: 'التكاملات المتقدمة', description: 'ربط Odoo مع أنظمة خارجية', status: 'completed' },
      { date: '2024', title: 'مستشار تقني', description: 'تقديم استشارات تقنية متخصصة', status: 'in-progress' },
    ],
  },
  {
    id: 'fullstack-web',
    title: 'Full Stack Web Development',
    titleAr: 'تطوير ويب متكامل',
    category: 'Web Development',
    description: 'تطوير تطبيقات ويب متكاملة من الواجهة الأمامية إلى الخادم وقواعد البيانات',
    fullDescription: 'خبرة شاملة في تطوير تطبيقات الويب المتكاملة باستخدام أحدث التقنيات. أقوم ببناء تطبيقات سريعة وآمنة وقابلة للتوسع مع التركيز على تجربة المستخدم والأداء. من مواقع الشركات البسيطة إلى تطبيقات الويب المعقدة.',
    icon: 'web',
    stats: [
      { icon: 'code', value: '30+', label: 'مشروع ويب' },
      { icon: 'users', value: '15+', label: 'عميل' },
      { icon: 'star', value: '4.9', label: 'تقييم العملاء' },
      { icon: 'clock', value: '3+', label: 'سنوات خبرة' },
    ],
    technologies: [
      { name: 'React.js', description: 'مكتبة الواجهات الأمامية', percentage: 92 },
      { name: 'TypeScript', description: 'لغة البرمجة الآمنة', percentage: 90 },
      { name: 'Node.js', description: 'بيئة الخادم', percentage: 88 },
      { name: 'Python/Django', description: 'إطار العمل الخلفي', percentage: 85 },
      { name: 'PostgreSQL/MySQL', description: 'قواعد البيانات', percentage: 90 },
      { name: 'Tailwind CSS', description: 'تصميم الواجهات', percentage: 95 },
      { name: 'REST API', description: 'تصميم الواجهات البرمجية', percentage: 92 },
      { name: 'Git/GitHub', description: 'إدارة الكود', percentage: 95 },
    ],
    features: [
      'تطوير واجهات مستخدم تفاعلية وسريعة',
      'بناء APIs قوية وآمنة',
      'تصميم قواعد بيانات محسنة',
      'تطبيق أنظمة المصادقة والصلاحيات',
      'تحسين SEO وسرعة التحميل',
      'تصميم متجاوب لجميع الأجهزة',
      'اختبار وضمان الجودة',
      'نشر وإدارة التطبيقات',
    ],
    supabaseFeatures: [
      { name: 'SPA Applications', nameAr: 'تطبيقات الصفحة الواحدة' },
      { name: 'E-commerce Platforms', nameAr: 'منصات التجارة الإلكترونية' },
      { name: 'Admin Dashboards', nameAr: 'لوحات التحكم الإدارية' },
      { name: 'CRM Systems', nameAr: 'أنظمة إدارة العملاء' },
      { name: 'Booking Systems', nameAr: 'أنظمة الحجوزات' },
      { name: 'Portfolio Websites', nameAr: 'مواقع الأعمال والشركات' },
    ],
    challenges: [
      'ضمان أداء عالي مع حركة مرور كبيرة',
      'حماية التطبيقات من الثغرات الأمنية',
      'التوافق مع جميع المتصفحات والأجهزة',
    ],
    solutions: [
      'استخدام تقنيات Caching و CDN',
      'تطبيق أفضل ممارسات الأمان (OWASP)',
      'اختبار شامل على بيئات متعددة',
    ],
    timeline: [
      { date: '2021', title: 'بداية تطوير الويب', description: 'تعلم HTML, CSS, JavaScript', status: 'completed' },
      { date: '2022', title: 'إتقان React', description: 'التخصص في React و TypeScript', status: 'completed' },
      { date: '2023', title: 'Full Stack', description: 'إضافة Backend Development', status: 'completed' },
      { date: '2024', title: 'مشاريع متقدمة', description: 'تنفيذ مشاريع ويب معقدة', status: 'in-progress' },
    ],
  },
  {
    id: 'odoo-training',
    title: 'Odoo Training & Consulting',
    titleAr: 'تدريب واستشارات أودوو',
    category: 'Training & Consulting',
    description: 'تدريب الفرق على استخدام وتطوير Odoo مع تقديم استشارات متخصصة',
    fullDescription: 'أقدم برامج تدريبية متكاملة للفرق التقنية والوظيفية على نظام Odoo. من التدريب الأساسي للمستخدمين إلى التدريب المتقدم للمطورين. كما أقدم استشارات لاختيار أفضل الحلول وتحسين العمليات باستخدام Odoo.',
    icon: 'training',
    stats: [
      { icon: 'users', value: '100+', label: 'متدرب' },
      { icon: 'building', value: '15+', label: 'شركة' },
      { icon: 'check', value: '50+', label: 'جلسة تدريب' },
      { icon: 'star', value: '4.9', label: 'تقييم المتدربين' },
    ],
    technologies: [
      { name: 'Odoo Functional', description: 'الاستخدام الوظيفي', percentage: 98 },
      { name: 'Odoo Technical', description: 'التطوير التقني', percentage: 95 },
      { name: 'Business Process', description: 'تحليل العمليات', percentage: 92 },
      { name: 'Data Migration', description: 'نقل البيانات', percentage: 88 },
      { name: 'System Configuration', description: 'إعداد النظام', percentage: 95 },
      { name: 'User Management', description: 'إدارة المستخدمين', percentage: 90 },
    ],
    features: [
      'تدريب المستخدمين النهائيين',
      'تدريب الفرق التقنية على التطوير',
      'ورش عمل تطبيقية',
      'إعداد مواد تدريبية مخصصة',
      'استشارات اختيار الموديولات المناسبة',
      'تقييم وتحسين العمليات الحالية',
      'دعم ما بعد التدريب',
      'تدريب عن بُعد أو حضوري',
    ],
    supabaseFeatures: [
      { name: 'End User Training', nameAr: 'تدريب المستخدمين' },
      { name: 'Developer Training', nameAr: 'تدريب المطورين' },
      { name: 'Admin Training', nameAr: 'تدريب المسؤولين' },
      { name: 'Best Practices', nameAr: 'أفضل الممارسات' },
      { name: 'Process Consulting', nameAr: 'استشارات العمليات' },
      { name: 'System Audit', nameAr: 'تدقيق النظام' },
    ],
    challenges: [
      'تنوع مستويات المتدربين',
      'ربط التدريب بسيناريوهات العمل الفعلية',
      'ضمان تطبيق المتدربين لما تعلموه',
    ],
    solutions: [
      'تصميم برامج حسب المستوى',
      'استخدام حالات دراسية من الشركة',
      'متابعة ودعم بعد التدريب',
    ],
    timeline: [
      { date: '2021', title: 'بداية التدريب', description: 'تدريب فرق داخلية', status: 'completed' },
      { date: '2022', title: 'توسيع البرامج', description: 'تطوير برامج تدريبية متكاملة', status: 'completed' },
      { date: '2023', title: 'استشارات متخصصة', description: 'تقديم استشارات للشركات', status: 'completed' },
      { date: '2024', title: 'تدريب متقدم', description: 'برامج تدريب للمطورين', status: 'in-progress' },
    ],
  },
  {
    id: 'business-analysis',
    title: 'Business Analysis & ERP Implementation',
    titleAr: 'تحليل الأعمال وتنفيذ الأنظمة',
    category: 'Business Analysis',
    description: 'تحليل شامل لمتطلبات الأعمال وإدارة مشاريع تنفيذ أنظمة ERP من البداية للتشغيل',
    fullDescription: 'أقدم خدمات تحليل الأعمال الشاملة بدءاً من فهم العمليات الحالية، تحديد المتطلبات، تصميم الحلول، إدارة مشروع التنفيذ، نقل البيانات، الاختبار، وحتى التشغيل الفعلي والدعم. منهجية متكاملة تضمن نجاح المشروع.',
    icon: 'analysis',
    stats: [
      { icon: 'building', value: '10+', label: 'مشروع تنفيذ' },
      { icon: 'check', value: '100%', label: 'نسبة التسليم' },
      { icon: 'users', value: '500+', label: 'مستخدم نهائي' },
      { icon: 'clock', value: '3+', label: 'سنوات خبرة' },
    ],
    technologies: [
      { name: 'Requirements Analysis', description: 'تحليل المتطلبات', percentage: 95 },
      { name: 'Process Mapping', description: 'رسم العمليات', percentage: 92 },
      { name: 'Gap Analysis', description: 'تحليل الفجوات', percentage: 90 },
      { name: 'Data Migration', description: 'نقل البيانات', percentage: 88 },
      { name: 'UAT Testing', description: 'اختبار القبول', percentage: 92 },
      { name: 'Change Management', description: 'إدارة التغيير', percentage: 85 },
      { name: 'Project Management', description: 'إدارة المشاريع', percentage: 90 },
      { name: 'Documentation', description: 'التوثيق', percentage: 95 },
    ],
    features: [
      'تحليل العمليات الحالية (As-Is)',
      'تصميم العمليات المستقبلية (To-Be)',
      'إعداد وثائق المتطلبات (BRD/FRD)',
      'إدارة مشروع التنفيذ',
      'خطة نقل البيانات وتنفيذها',
      'إعداد سيناريوهات الاختبار',
      'إدارة التغيير وتدريب المستخدمين',
      'دعم ما بعد التشغيل (Go-Live Support)',
    ],
    supabaseFeatures: [
      { name: 'Discovery Phase', nameAr: 'مرحلة الاكتشاف' },
      { name: 'Analysis Phase', nameAr: 'مرحلة التحليل' },
      { name: 'Design Phase', nameAr: 'مرحلة التصميم' },
      { name: 'Development Phase', nameAr: 'مرحلة التطوير' },
      { name: 'Testing Phase', nameAr: 'مرحلة الاختبار' },
      { name: 'Go-Live Phase', nameAr: 'مرحلة التشغيل' },
    ],
    challenges: [
      'مقاومة التغيير من الموظفين',
      'بيانات تاريخية غير منظمة',
      'ضيق الوقت والموارد',
    ],
    solutions: [
      'خطة إدارة تغيير متكاملة',
      'أدوات تنظيف وتحويل البيانات',
      'منهجية Agile للتنفيذ المرن',
    ],
    timeline: [
      { date: 'الأسبوع 1-2', title: 'Discovery', description: 'فهم الأعمال والعمليات الحالية', status: 'completed' },
      { date: 'الأسبوع 3-4', title: 'Analysis', description: 'تحليل المتطلبات وتحديد الفجوات', status: 'completed' },
      { date: 'الأسبوع 5-8', title: 'Configuration', description: 'إعداد وتخصيص النظام', status: 'completed' },
      { date: 'الأسبوع 9-10', title: 'Data Migration', description: 'نقل البيانات والتحقق منها', status: 'completed' },
      { date: 'الأسبوع 11-12', title: 'UAT & Training', description: 'الاختبار والتدريب', status: 'in-progress' },
      { date: 'الأسبوع 13', title: 'Go-Live', description: 'التشغيل الفعلي والدعم', status: 'planned' },
    ],
  },
];
