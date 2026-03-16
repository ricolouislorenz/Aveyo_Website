import { Helmet } from "react-helmet-async";

const SITE_NAME = "AVEYO";
const BASE_URL = "https://aveyo.de";
const DEFAULT_IMAGE = `${BASE_URL}/images/og-default.webp`;

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

export function SEO({ title, description, path, image = DEFAULT_IMAGE, noindex = false }: SEOProps) {
  const url = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="de_DE" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
