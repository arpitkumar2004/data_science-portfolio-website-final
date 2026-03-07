import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://arpitkumar.dev';
const DEFAULT_TITLE = 'Arpit Kumar | Applied AI & ML Researcher | IIT Kharagpur';
const DEFAULT_DESCRIPTION =
  'Applied AI & ML Researcher who ships production-grade AI systems. Top 0.5% Amazon ML Challenge. Built systems serving 10,000+ users at IIT Kharagpur. Seeking full-time roles in Production ML / Quant Research (May 2027).';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = '@arpitkumar';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-page SEO head component using react-helmet-async.
 * Dynamically sets <title>, meta description, canonical, OG & Twitter tags.
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '/',
  ogImage = DEFAULT_IMAGE,
  ogImageAlt = 'Arpit Kumar - Applied AI & ML Researcher from IIT Kharagpur',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  jsonLd,
}) => {
  const pageTitle = title ? `${title} | Arpit Kumar` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
