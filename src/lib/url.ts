
/**
 * Get article URL from article slug
 */
export function getArticleUrl(slug: string): string {
  return `/articles/${slug}`;
}

/**
 * Get project URL from entity slug
 */
export function getProjectUrl(slug: string): string {
  return `/projects/${slug}`;
}

/**
 * Get category URL from category slug
 */
export function getCategoryUrl(slug: string): string {
  return `/category/${slug}`;
}

/**
 * Get tag URL from tag slug
 */
export function getTagUrl(slug: string): string {
  return `/tag/${slug}`;
}
