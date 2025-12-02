import type { PublicArticle, PublicSiteCategory, PublicTag } from "../sdk/types.gen";

/**
 * Get article URL from Minima's canonical permalink
 * This uses the permalink provided by Minima CMS and prepends /article/
 * to match our Astro routing structure at /src/pages/article/[slug].astro
 */
export function getArticleUrl(article: PublicArticle): string {
  const path = article.permalink.path;

  // Remove leading slash if present, then add /article/ prefix
  const slug = path.startsWith('/') ? path.slice(1) : path;
  return `/article/${slug}`;
}

/**
 * Get category URL from Minima's category path
 * PublicSiteCategory has a path property that we can use
 */
export function getCategoryUrl(category: PublicSiteCategory): string {
  const path = category.path;

  // Handle undefined/null path - fallback to slug
  if (!path) {
    return `/category/${category.slug}`;
  }

  // If path already starts with /category/, use it as-is
  if (path.startsWith('/category/')) {
    return path;
  }

  // Otherwise, build it from the path (remove leading slash if present)
  const slug = path.startsWith('/') ? path.slice(1) : path;
  return `/category/${slug}`;
}

/**
 * Get tag URL from tag slug
 * PublicTag only has name and slug, no path property
 * So we build the URL manually
 */
export function getTagUrl(tag: PublicTag): string {
  return `/tag/${tag.slug}`;
}
