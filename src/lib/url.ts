import type { PublicArticle, PublicEntity, PublicSiteCategory, PublicTag } from "../sdk/types.gen";

/**
 * Get article URL from Minima's canonical permalink
 * This uses the permalink provided by Minima CMS and prepends /articles/
 * to match our Astro routing structure at /src/pages/articles/[slug].astro
 */
export function getArticleUrl(article: PublicArticle): string {
  // Handle cases where permalink might be null/undefined (defensive programming)
  const path = article.permalink?.path || article.slug;

  // Remove leading slash if present, then add /articles/ prefix
  const slug = path.startsWith('/') ? path.slice(1) : path;
  return `/articles/${slug}`;
}

/**
 * Get project URL from Minima's canonical permalink
 * This uses the permalink provided by Minima CMS and prepends /projects/
 * to match our Astro routing structure at /src/pages/projects/[slug].astro
 */
export function getProjectUrl(project: PublicEntity): string {
  // Handle cases where permalink might be null/undefined
  const path = project.permalink?.path || project.slug;

  // Remove leading slash if present, then add /projects/ prefix
  const slug = path.startsWith('/') ? path.slice(1) : path;
  return `/projects/${slug}`;
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
