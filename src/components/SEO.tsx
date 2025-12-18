import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const defaultMeta = {
  title: 'Akram Atiia | مطور تطبيقات محترف',
  description: 'أكرم عطية - مطور تطبيقات محترف متخصص في Flutter و React Native. أطوّر حلولاً رقمية فريدة لا تُنسى.',
  image: 'https://cv.3mcode-solutions.com/assets/profile-vPlSWNaC.png',
  url: 'https://cv.3mcode-solutions.com',
  type: 'website',
  keywords: 'مطور تطبيقات, Flutter Developer, Dart, تطوير موبايل, Akram Atiia, أكرم عطية',
};

const SEO = ({
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = defaultMeta.type,
  keywords = defaultMeta.keywords,
}: SEOProps) => {
  const fullTitle = title === defaultMeta.title ? title : `${title} | Akram Atiia`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
