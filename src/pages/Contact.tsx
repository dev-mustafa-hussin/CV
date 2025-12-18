import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import BackButton from '@/components/BackButton';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'تم إرسال الرسالة ✅',
      description: 'سأتواصل معك في أقرب وقت ممكن',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'البريد الإلكتروني', value: 'akram@example.com' },
    { icon: Phone, label: 'رقم الهاتف', value: '+20 123 456 7890' },
    { icon: MapPin, label: 'الموقع', value: 'مصر' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-8 animate-fade-in">
          <BackButton to="/" label="الرئيسية" />
        </div>

        {/* Header */}
        <div className="mb-12 animate-slide-right">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            اتصل بي 📧
          </h1>
          <p className="text-muted-foreground max-w-xl">
            هل لديك مشروع في ذهنك؟ دعنا نتحدث ونحول فكرتك إلى حقيقة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card-glass p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              أرسل رسالة
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-muted-foreground mb-2">
                  الاسم
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground
                             focus:outline-none focus:border-primary transition-colors"
                  placeholder="اسمك الكامل"
                  required
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground
                             focus:outline-none focus:border-primary transition-colors"
                  placeholder="بريدك@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2">
                  الرسالة
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-secondary/50 border border-primary/30 rounded-xl px-4 py-3 text-foreground
                             focus:outline-none focus:border-primary transition-colors resize-none h-32"
                  placeholder="اكتب رسالتك هنا..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
