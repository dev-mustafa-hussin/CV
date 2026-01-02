import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';
import { HelpCircle, ChevronDown, MessageCircle, Clock, DollarSign, Code, Smartphone, Globe, Shield, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQCategory {
  title: string;
  icon: React.ElementType;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqCategories: FAQCategory[] = [
  {
    title: 'خدماتي',
    icon: Code,
    questions: [
      {
        question: 'ما هي الخدمات التي تقدمها؟',
        answer: 'أقدم خدمات تطوير تطبيقات الموبايل باستخدام Flutter لنظامي Android و iOS، بالإضافة إلى تطوير الواجهات الأمامية للويب. كما أقدم خدمات تصميم واجهات المستخدم UI/UX، وتكامل قواعد البيانات مثل Supabase و Firebase.'
      },
      {
        question: 'هل تعمل على مشاريع فردية أم فرق؟',
        answer: 'أعمل بشكل فردي على معظم المشاريع الصغيرة والمتوسطة. للمشاريع الكبيرة، يمكنني التعاون مع فريق من المطورين والمصممين لضمان تسليم المشروع في الوقت المحدد وبأعلى جودة.'
      },
      {
        question: 'ما هي التقنيات التي تتقنها؟',
        answer: 'أتقن Flutter و Dart كتقنيات أساسية، بالإضافة إلى Supabase و Firebase للـ Backend. كما أعمل مع React و TypeScript لتطوير الويب، وأستخدم Figma لتصميم الواجهات.'
      },
    ],
  },
  {
    title: 'التسعير والدفع',
    icon: DollarSign,
    questions: [
      {
        question: 'كيف يتم تحديد سعر المشروع؟',
        answer: 'يتم تحديد السعر بناءً على عدة عوامل: حجم المشروع، تعقيد الميزات المطلوبة، المدة الزمنية، والتقنيات المستخدمة. أقدم عرض سعر مفصل بعد دراسة متطلبات المشروع.'
      },
      {
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'أقبل الدفع عبر التحويل البنكي، PayPal، و Wise. يتم الدفع عادةً على دفعات: 30% مقدماً، 40% عند الانتهاء من نصف المشروع، و30% عند التسليم النهائي.'
      },
      {
        question: 'هل تقدم ضماناً على العمل؟',
        answer: 'نعم، أقدم ضمان صيانة مجانية لمدة شهر بعد تسليم المشروع لإصلاح أي أخطاء تقنية. كما أقدم دعماً فنياً مستمراً بأسعار مخفضة للعملاء السابقين.'
      },
    ],
  },
  {
    title: 'المدة الزمنية',
    icon: Clock,
    questions: [
      {
        question: 'كم يستغرق تطوير تطبيق موبايل؟',
        answer: 'يعتمد على حجم التطبيق وتعقيده. تطبيق بسيط يستغرق 2-4 أسابيع، متوسط التعقيد 1-2 شهر، والتطبيقات المعقدة قد تستغرق 3-6 أشهر. أقدم جدولاً زمنياً مفصلاً مع كل عرض سعر.'
      },
      {
        question: 'هل يمكن تسريع التسليم؟',
        answer: 'نعم، يمكن تسريع التسليم في بعض الحالات مقابل رسوم إضافية. يتطلب ذلك تخصيص وقت إضافي وموارد أكثر للمشروع.'
      },
      {
        question: 'كيف تتعامل مع التأخيرات؟',
        answer: 'أحرص على الالتزام بالمواعيد المحددة. في حالة أي تأخير متوقع، أقوم بإبلاغ العميل مسبقاً مع شرح الأسباب وتقديم حلول بديلة.'
      },
    ],
  },
  {
    title: 'التطبيقات',
    icon: Smartphone,
    questions: [
      {
        question: 'هل التطبيقات تعمل على Android و iOS؟',
        answer: 'نعم، باستخدام Flutter أطور تطبيقات تعمل على كلا النظامين من كود واحد، مما يوفر الوقت والتكلفة مع الحفاظ على جودة عالية وأداء ممتاز.'
      },
      {
        question: 'هل تساعد في نشر التطبيق على المتاجر؟',
        answer: 'نعم، أقدم خدمة نشر التطبيقات على Google Play Store و Apple App Store، بما في ذلك إعداد حسابات المطورين وتجهيز جميع المتطلبات.'
      },
      {
        question: 'هل توفر كود المصدر؟',
        answer: 'نعم، عند اكتمال المشروع والدفع الكامل، يتم تسليم كود المصدر كاملاً مع جميع الملفات والتوثيق اللازم للعميل.'
      },
    ],
  },
  {
    title: 'الدعم والصيانة',
    icon: Shield,
    questions: [
      {
        question: 'هل تقدم دعماً فنياً بعد التسليم؟',
        answer: 'نعم، أقدم دعماً فنياً مجانياً لمدة شهر بعد التسليم. بعد ذلك، يمكن الاشتراك في باقات صيانة شهرية أو سنوية حسب احتياجات المشروع.'
      },
      {
        question: 'كيف يمكنني طلب تعديلات أو إضافات؟',
        answer: 'يمكنك التواصل معي عبر البريد الإلكتروني أو WhatsApp لمناقشة أي تعديلات أو إضافات. سأقدم عرض سعر منفصل للميزات الجديدة.'
      },
      {
        question: 'هل تقدم تحديثات للتطبيقات؟',
        answer: 'نعم، أقدم خدمات تحديث التطبيقات لمواكبة تحديثات أنظمة التشغيل وإضافة ميزات جديدة. يمكن الاتفاق على عقد صيانة سنوي.'
      },
    ],
  },
  {
    title: 'التواصل',
    icon: MessageCircle,
    questions: [
      {
        question: 'كيف يمكنني التواصل معك؟',
        answer: 'يمكنك التواصل معي عبر صفحة "اتصل بي" في الموقع، أو عبر البريد الإلكتروني مباشرة، أو من خلال حساباتي على وسائل التواصل الاجتماعي المذكورة في الموقع.'
      },
      {
        question: 'ما هي أوقات العمل؟',
        answer: 'أعمل من الأحد إلى الخميس، من الساعة 9 صباحاً حتى 6 مساءً بتوقيت القاهرة. أستجيب للرسائل خلال 24 ساعة كحد أقصى.'
      },
      {
        question: 'هل يمكن عقد اجتماعات عبر الإنترنت؟',
        answer: 'نعم، أقوم بعقد اجتماعات عبر Zoom أو Google Meet لمناقشة تفاصيل المشاريع ومتابعة التقدم. يمكن جدولة اجتماع مسبقاً.'
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <BackButton to="/" label="الرئيسية" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعاً حول خدماتي وطريقة العمل
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <section
              key={category.title}
              className="card-glass p-6 animate-slide-up"
              style={{ animationDelay: `${0.1 + categoryIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h2>
              </div>

              {/* Questions */}
              <Accordion type="single" collapsible className="space-y-3">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.title}-${index}`}
                    className="bg-background/50 rounded-xl border border-border/30 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-primary/5 transition-colors text-right">
                      <span className="text-foreground font-medium text-right flex-1">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="card-glass p-8 text-center">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لم تجد إجابة لسؤالك؟
            </h3>
            <p className="text-muted-foreground mb-6">
              تواصل معي مباشرة وسأكون سعيداً بالإجابة على جميع استفساراتك
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل معي</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
