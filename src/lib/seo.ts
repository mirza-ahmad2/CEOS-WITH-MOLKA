import { SITE_URL } from "./content";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_KEYWORDS =
  "CEOs with Molka, Arabic podcast, GCC healthcare, life sciences, Dubai podcast, Molka Hachouch, leadership podcast, executive search, pharma leadership, women in leadership";

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  ogImage?: string;
  type?: "website" | "article";
};

export function pageSeo({
  title,
  description,
  path = "/",
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
}: PageSeoInput) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: "Molka Hachouch" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:type", content: type },
      { property: "og:site_name", content: "CEOs with Molka" },
      { property: "og:locale", content: "en_AE" },
      { property: "og:locale:alternate", content: "ar_AE" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: "CEOs with Molka — Arabic leadership podcast logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: "CEOs with Molka podcast" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
