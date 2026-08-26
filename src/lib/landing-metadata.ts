import type { Metadata } from "next";
import { getDict, type Lang } from "@/content/landing";

const siteUrl = "https://audioguidekit.org";

/** `/` is English, `/de` and `/es` are the translated landing pages. */
export const localeUrl = (lang: Lang) => (lang === "en" ? siteUrl : `${siteUrl}/${lang}`);

export function landingMetadata(lang: Lang): Metadata {
  const t = getDict(lang).meta;
  const url = localeUrl(lang);

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: url,
      languages: {
        en: siteUrl,
        de: `${siteUrl}/de`,
        es: `${siteUrl}/es`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      type: "website",
      siteName: "AudioGuideKit",
      url,
      locale: lang,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
      creator: "@audiotour_oss",
      images: ["/og-image.png"],
    },
  };
}
