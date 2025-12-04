import type { PublicArticle, PublicTag } from "../sdk/types.gen";

// Deduplicate tags from articles
export function deduplicateTags(articles: PublicArticle[]): PublicTag[] {
  const allTags = articles.flatMap((article) => article.tags);
  return Array.from(new Map(allTags.map((tag) => [tag.slug, tag])).values());
}
