export interface Project {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  description: string;
  fullDescription: string;
  icon: 'shopping' | 'chat' | 'social';
  technologies: {
    name: string;
    description: string;
    percentage: number;
  }[];
  features: string[];
}

export const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce App',
    titleAr: 'متجر الكترونى متكامل',
    category: 'تطبيقات موبايل',
    description: 'تطبيق متجر الكترونى متكامل يعمل بـ Supabase و Backend كامل مع واجهات مستخدم عصرية وتجربة تسوق سلسة',
    fullDescription: 'تطبيق متجر الكترونى متكامل يوفر تجربة تسوق احترافية مع نظام إدارة متكامل للمنتجات والطلبات. يتميز بواجهة مستخدم عصرية وسهلة الاستخدام مع دعم كامل للدفع الإلكتروني وتتبع الطلبات في الوقت الحقيقي.',
    icon: 'shopping',
    technologies: [
      { name: 'Flutter', description: 'تطوير مشاريع', percentage: 99 },
      { name: 'Dart', description: 'لغة البرمجة الأساسية', percentage: 98 },
      { name: 'Supabase PostgreSQL', description: 'قاعدة البيانات', percentage: 95 },
      { name: 'Supabase Authentication', description: 'نظام المصادقة', percentage: 97 },
      { name: 'Supabase Row Level Security', description: 'البيانات + التشفير', percentage: 96 },
      { name: 'Supabase Realtime', description: 'التحديثات اللحظية', percentage: 95 },
      { name: 'Supabase Storage', description: 'تخزين الصور والملفات', percentage: 94 },
      { name: 'Push Notifications', description: 'الإشعارات', percentage: 93 },
      { name: 'Stripe Payment', description: 'الدفع الإلكتروني', percentage: 96 },
      { name: 'Localization', description: 'دعم اللغات المتعددة', percentage: 92 },
      { name: 'Image Picker', description: 'اختيار الصور من المعرض', percentage: 98 },
      { name: 'Camera', description: 'التقاط الصور بالكاميرا', percentage: 97 },
      { name: 'WebView', description: 'عرض محتوى الويب', percentage: 91 },
      { name: 'Shared Preferences', description: 'حفظ إعدادات المستخدم', percentage: 99 },
      { name: 'Animation', description: 'حركات وتأثيرات منقسمة', percentage: 95 },
      { name: 'Responsive Design', description: 'تصميم متجاوب', percentage: 98 },
    ],
    features: [
      'مصادقة متقدمة مع Supabase Auth',
      'قاعدة بيانات علائقية دقيقة مع PostgreSQL',
      'تحديثات لحظية للطلبات والبيانات',
      'نظام دفع إلكتروني آمن مع Stripe',
      'إشعارات فورية للعملاء',
      'لوحة تحكم متكاملة للإدارة',
      'تصميم متجاوب لجميع الأجهزة',
      'دعم متعدد اللغات',
    ],
  },
  {
    id: 'chatapp',
    title: 'ChatApp',
    titleAr: 'تطبيق دردشة',
    category: 'تطبيقات موبايل',
    description: 'تجربة شات كاملة مع واجهة عصرية وأداء سريع واستخدام تقنيات حديثة للتواصل الفوري',
    fullDescription: 'تطبيق دردشة متطور يوفر تجربة تواصل فورية مع واجهة مستخدم سلسة وعصرية. يدعم الرسائل النصية والوسائط المتعددة مع إمكانية إنشاء مجموعات والمحادثات الخاصة.',
    icon: 'chat',
    technologies: [
      { name: 'Flutter', description: 'إطار العمل الأساسي', percentage: 99 },
      { name: 'Realtime Database', description: 'قاعدة بيانات لحظية', percentage: 97 },
      { name: 'Firebase', description: 'البنية التحتية', percentage: 96 },
      { name: 'Authentication', description: 'نظام المصادقة', percentage: 98 },
      { name: 'Cloud Messaging', description: 'الإشعارات الفورية', percentage: 95 },
      { name: 'Cloud Storage', description: 'تخزين الوسائط', percentage: 94 },
    ],
    features: [
      'رسائل فورية في الوقت الحقيقي',
      'دعم الوسائط المتعددة (صور، فيديو، صوت)',
      'إنشاء مجموعات ومحادثات خاصة',
      'مؤشر الكتابة والقراءة',
      'إشعارات فورية',
      'تشفير المحادثات',
    ],
  },
  {
    id: 'socialmedia',
    title: 'SocialmediaAPP',
    titleAr: 'تطبيق اجتماعي',
    category: 'تطبيقات موبايل',
    description: 'تطبيق اجتماعي متكامل بجميع مميزات المنصات الاجتماعية في مكان واحد مع تصميم عصري',
    fullDescription: 'منصة اجتماعية متكاملة تجمع بين أفضل مميزات التطبيقات الاجتماعية في تجربة واحدة سلسة. يدعم مشاركة المنشورات والصور والفيديوهات مع نظام تفاعل متكامل.',
    icon: 'social',
    technologies: [
      { name: 'Flutter', description: 'إطار العمل', percentage: 99 },
      { name: 'Dart', description: 'لغة البرمجة', percentage: 98 },
      { name: 'Material Design 3', description: 'نظام التصميم', percentage: 97 },
      { name: 'State Management', description: 'إدارة الحالة', percentage: 96 },
      { name: 'REST API', description: 'واجهة برمجية', percentage: 95 },
      { name: 'Caching', description: 'التخزين المؤقت', percentage: 94 },
    ],
    features: [
      'نشر المحتوى والوسائط المتعددة',
      'نظام متابعة وتفاعل متكامل',
      'صفحات شخصية قابلة للتخصيص',
      'استكشاف المحتوى والترندات',
      'رسائل خاصة ومجموعات',
      'إشعارات ذكية',
    ],
  },
];
