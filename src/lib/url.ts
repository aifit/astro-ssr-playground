import type { PublicArticle, GraphEntity, PublicSiteCategory, PublicTag } from "../sdk/types.gen";

/**
 * Get article URL from article slug
 */
export function getArticleUrl(article: PublicArticle): string {
  return `/articles/${article.slug}`;
}

/**
 * Get project URL from entity slug
 */
export function getProjectUrl(project: GraphEntity): string {
  return `/projects/${project.slug}`;
}

/**
 * Get category URL from category slug
 */
export function getCategoryUrl(category: PublicSiteCategory): string {
  return `/category/${category.slug}`;
}

/**
 * Get tag URL from tag slug
 */
export function getTagUrl(tag: PublicTag): string {
  return `/tag/${tag.slug}`;
}
