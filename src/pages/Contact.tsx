import { useState, useMemo, useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import SEO from '@/components/SEO';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Facebook, Instagram, MessageCircle, Upload, X, FileText, Image, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const serviceTypes = [
  { id: 'odoo-development', label: 'تطوير وتخصيص أودوو' },
  { id: 'web-development', label: 'تطوير ويب متكامل' },
  { id: 'odoo-training', label: 'تدريب واستشارات أودوو' },
  { id: 'business-analysis', label: 'تحليل الأعمال وتنفيذ الأنظمة' },
];

const requestTypes = [
  { id: 'inquiry', label: 'استفسار عام' },
  { id: 'quote', label: 'طلب عرض سعر' },
  { id: 'consultation', label: 'حجز استشارة' },
  { id: 'modification', label: 'طلب تعديل على مشروع سابق' },
];

const budgetRanges = [
  { id: 'less-5k', label: 'أقل من 5,000 ج.م' },
  { id: '5k-15k', label: '5,000 - 15,000 ج.م' },
  { id: '15k-30k', label: '15,000 - 30,000 ج.م' },
  { id: '30k-50k', label: '30,000 - 50,000 ج.م' },
  { id: 'more-50k', label: 'أكثر من 50,000 ج.م' },
  { id: 'not-sure', label: 'غير محدد بعد' },
];

const timelineOptions = [
  { id: 'urgent', label: 'عاجل (خلال أسبوع)' },
  { id: 'month', label: 'خلال شهر' },
  { id: 'quarter', label: 'خلال 3 أشهر' },
  { id: 'flexible', label: 'مرن / غير محدد' },
];

const preferredContact = [
  { id: 'whatsapp', label: 'واتساب' },
  { id: 'email', label: 'البريد الإلكتروني' },
  { id: 'phone', label: 'اتصال هاتفي' },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { text: 'صباح الخير', emoji: '☀️', period: 'morning' };
  } else if (hour >= 12 && hour < 17) {
    return { text: 'مساء الخير', emoji: '🌤️', period: 'afternoon' };
  } else if (hour >= 17 && hour < 21) {
    return { text: 'مساء الخير', emoji: '🌅', period: 'evening' };
  } else {
    return { text: 'مساء الخير', emoji: '🌙', period: 'night' };
  }
};

interface UploadedFile {
  file: File;
  preview: string;
  type: 'image' | 'document';
}

const Contact = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    serviceType: '',
    requestType: '',
    budget: '',
    timeline: '',
    preferredContact: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const greeting = useMemo(() => getGreeting(), []);
  const whatsappNumber = '2001066094050';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (uploadedFiles.length + files.length > maxFiles) {
      toast({
        title: 'تنبيه ⚠️',
        description: `يمكنك رفع ${maxFiles} ملفات كحد أقصى`,
        variant: 'destructive',
      });
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        toast({
          title: 'حجم الملف كبير جداً',
          description: `الملف ${file.name} يتجاوز 10 ميجابايت`,
          variant: 'destructive',
        });
        return;
      }

      const isImage = file.type.startsWith('image/');
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setUploadedFiles((prev) => [
          ...prev,
          {
            file,
            preview: event.target?.result as string,
            type: isImage ? 'image' : 'document',
          },
        ]);
      };
      
      if (isImage) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsDataURL(file);
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'الاسم يجب أن يكون أكثر من حرفين';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (formData.whatsapp && !/^[0-9+\s-]{8,20}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'رقم الواتساب غير صحيح';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'يرجى اختيار نوع الخدمة';
    }
    
    if (!formData.requestType) {
      newErrors.requestType = 'يرجى اختيار نوع الطلب';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'الرسالة مطلوبة';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'الرسالة يجب أن تكون أكثر من 10 أحرف';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const serviceName = serviceTypes.find(s => s.id === formData.serviceType)?.label || 'غير محدد';
    const requestName = requestTypes.find(r => r.id === formData.requestType)?.label || 'غير محدد';
    const budgetName = budgetRanges.find(b => b.id === formData.budget)?.label || 'غير محدد';
    const timelineName = timelineOptions.find(t => t.id === formData.timeline)?.label || 'غير محدد';
    
    let message = `مرحباً، أريد التواصل معك 👋\n\n`;
    message += `📋 تفاصيل الطلب:\n`;
    message += `• الاسم: ${formData.name}\n`;
    message += `• البريد: ${formData.email}\n`;
    if (formData.whatsapp) message += `• واتساب: ${formData.whatsapp}\n`;
    message += `• نوع الخدمة: ${serviceName}\n`;
    message += `• نوع الطلب: ${requestName}\n`;
    if (formData.budget) message += `• الميزانية: ${budgetName}\n`;
    if (formData.timeline) message += `• الجدول الزمني: ${timelineName}\n`;
    if (uploadedFiles.length > 0) {
      message += `• المرفقات: ${uploadedFiles.length} ملف (سأرسلها في رسالة منفصلة)\n`;
    }
    message += `\n💬 الرسالة:\n${formData.message}`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'يوجد أخطاء في النموذج ⚠️',
        description: 'يرجى تصحيح الأخطاء والمحاولة مرة أخرى',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-notification', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'تم إرسال الرسالة بنجاح ✅',
        description: 'سأتواصل معك في أقرب وقت ممكن. تم إرسال تأكيد إلى بريدك الإلكتروني.',
      });
      
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        serviceType: '',
        requestType: '',
        budget: '',
        timeline: '',
        preferredContact: '',
        message: '',
      });
      setUploadedFiles([]);
      setErrors({});
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'حدث خطأ ❌',
        description: 'لم نتمكن من إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر الواتساب.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!validateForm()) {
      toast({
        title: 'يوجد أخطاء في النموذج ⚠️',
        description: 'يرجى تصحيح الأخطاء قبل الإرسال عبر الواتساب',
        variant: 'destructive',
      });
      return;
    }
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Use anchor element to avoid iframe blocking
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contactInfo = [
    { icon: Mail, label: 'البريد الإلكتروني', value: 'dev-mustafa-hussin@hotmail.com' },
    { icon: Phone, label: 'رقم الهاتف', value: '+20 106 609 4050' },
    { icon: MapPin, label: 'الموقع', value: 'مصر' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/dev-mustafa-hussin' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/mustafa-hussein-53228678/' },
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/mustafa.hussin.tech' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/dev_mustafa_hussin/' },
  ];

  return (
    <>
      <SEO 
        title="اتصل بي"
        description="تواصل مع مصطفى حسين أحمد - مطور تطبيقات محترف. لديك مشروع في ذهنك؟ دعنا نتحدث ونحول فكرتك إلى حقيقة."
        url="https://cv.3mcode-solutions.com/contact"
        keywords="اتصل بي, تواصل, contact, hire developer, توظيف مطور"
      />
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />

        <main className="relative z-10 container mx-auto px-4 py-8">
          {/* Back button */}
          <div className="mb-8 animate-fade-in">
            <BackButton to="/" label="الرئيسية" />
          </div>

          {/* Smart Greeting Header */}
          <div className="mb-12 animate-slide-right">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-4">
              <span className="text-2xl">{greeting.emoji}</span>
              <span className="text-primary font-medium">{greeting.text}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              اتصل بي 📧
            </h1>
            <p className="text-muted-foreground max-w-xl">
              هل لديك مشروع في ذهنك؟ دعنا نتحدث ونحول فكرتك إلى حقيقة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2 card-glass p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                أرسل رسالة 💬
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground">
                      الاسم <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`bg-secondary/50 border-primary/30 ${errors.name ? 'border-destructive' : ''}`}
                      placeholder="اسمك الكامل"
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">
                      البريد الإلكتروني <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`bg-secondary/50 border-primary/30 ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="بريدك@example.com"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: WhatsApp & Preferred Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-muted-foreground">
                      رقم الواتساب
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className={`bg-secondary/50 border-primary/30 ${errors.whatsapp ? 'border-destructive' : ''}`}
                      placeholder="+20 1XX XXX XXXX"
                      dir="ltr"
                    />
                    {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">
                      طريقة التواصل المفضلة
                    </Label>
                    <Select
                      value={formData.preferredContact}
                      onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}
                    >
                      <SelectTrigger className="bg-secondary/50 border-primary/30">
                        <SelectValue placeholder="اختر طريقة التواصل" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-primary/30">
                        {preferredContact.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 3: Service Type & Request Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">
                      نوع الخدمة <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger className={`bg-secondary/50 border-primary/30 ${errors.serviceType ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-primary/30">
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && <p className="text-sm text-destructive">{errors.serviceType}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">
                      نوع الطلب <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.requestType}
                      onValueChange={(value) => setFormData({ ...formData, requestType: value })}
                    >
                      <SelectTrigger className={`bg-secondary/50 border-primary/30 ${errors.requestType ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="اختر نوع الطلب" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-primary/30">
                        {requestTypes.map((request) => (
                          <SelectItem key={request.id} value={request.id}>
                            {request.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.requestType && <p className="text-sm text-destructive">{errors.requestType}</p>}
                  </div>
                </div>

                {/* Row 4: Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">
                      الميزانية التقريبية
                    </Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => setFormData({ ...formData, budget: value })}
                    >
                      <SelectTrigger className="bg-secondary/50 border-primary/30">
                        <SelectValue placeholder="اختر نطاق الميزانية" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-primary/30">
                        {budgetRanges.map((budget) => (
                          <SelectItem key={budget.id} value={budget.id}>
                            {budget.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">
                      الجدول الزمني
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    >
                      <SelectTrigger className="bg-secondary/50 border-primary/30">
                        <SelectValue placeholder="متى تحتاج المشروع؟" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-primary/30">
                        {timelineOptions.map((timeline) => (
                          <SelectItem key={timeline.id} value={timeline.id}>
                            {timeline.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">
                    مرفقات (صور أو مستندات)
                  </Label>
                  <div 
                    className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-primary/60 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      اضغط هنا لرفع ملفات (صور، PDF، Word، Excel)
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-1">
                      الحد الأقصى: 5 ملفات، 10 ميجابايت لكل ملف
                    </p>
                  </div>
                  
                  {/* Uploaded Files Preview */}
                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {uploadedFiles.map((file, index) => (
                        <div 
                          key={index} 
                          className="relative group bg-secondary/30 rounded-lg p-2 border border-primary/20"
                        >
                          {file.type === 'image' ? (
                            <img 
                              src={file.preview} 
                              alt={file.file.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                          ) : (
                            <div className="w-20 h-20 flex flex-col items-center justify-center">
                              <FileText className="w-8 h-8 text-primary" />
                              <span className="text-xs text-muted-foreground mt-1 truncate max-w-full px-1">
                                {file.file.name.split('.').pop()?.toUpperCase()}
                              </span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <p className="text-xs text-muted-foreground mt-1 truncate max-w-[80px]">
                            {file.file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">
                    تفاصيل المشروع / الرسالة <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`bg-secondary/50 border-primary/30 min-h-[120px] ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="اشرح فكرتك أو متطلباتك بالتفصيل..."
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>إرسال عبر واتساب</span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Info - Takes 1 column */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="card-glass p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  معلومات التواصل
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.label}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="text-foreground">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Maps */}
              <div className="card-glass p-6 animate-slide-up overflow-hidden" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  الموقع 📍
                </h2>
                <div className="rounded-xl overflow-hidden border border-primary/20">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.5084239457813!2d31.23571841511692!3d30.04441918188379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c26967a5b3%3A0x90fa3b9c8d8e9f6a!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1635000000000!5m2!1sen!2seg"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقعي على الخريطة"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  القاهرة، مصر 🇪🇬
                </p>
              </div>

              {/* Social Links */}
              <div className="card-glass p-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  تابعني على
                </h2>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center
                                 hover:bg-primary/30 hover:scale-110 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                      <social.icon className="w-6 h-6 text-primary" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp */}
              <div className="card-glass p-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  تواصل سريع 🚀
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  تفضل التواصل المباشر؟ اضغط هنا للتحدث معي على الواتساب مباشرة
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدماتك')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>واتساب مباشر</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact;
