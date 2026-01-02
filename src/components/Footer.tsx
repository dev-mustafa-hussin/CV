import { Github, Linkedin, Facebook, Instagram, MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { 
    icon: Github, 
    label: 'GitHub', 
    url: 'https://github.com/dev-mustafa-hussin',
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/mustafa-hussein-53228678/',
  },
  { 
    icon: Facebook, 
    label: 'Facebook', 
    url: 'https://www.facebook.com/mustafa.hussin.tech',
  },
  { 
    icon: Instagram, 
    label: 'Instagram', 
    url: 'https://www.instagram.com/dev_mustafa_hussin/',
  },
  { 
    icon: MessageCircle, 
    label: 'WhatsApp', 
    url: 'https://wa.me/2001066094050',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/80 border border-primary/30 
                         flex items-center justify-center text-muted-foreground 
                         hover:text-primary hover:border-primary hover:shadow-[0_0_15px_hsl(252_100%_68%_/_0.3)]
                         transition-all duration-300"
                aria-label={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1 flex-wrap">
              <span>© {currentYear}</span>
              <span>Mustafa Hussein.</span>
              <span>جميع الحقوق محفوظة</span>
              <Heart className="w-3 h-3 text-destructive inline-block mx-1" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
