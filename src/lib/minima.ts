import { client } from "../sdk/client.gen";
import * as sdk from "../sdk";
import type {
  GetPublicArticlesData,
  GetPublicEntitiesData,
  GetPublicCategoriesData,
  GetPublicArticleBySlugData,
  GetPublicEntityBySlugData,
  ResolvePublicPermalinkData,
} from "../sdk/types.gen";

const apiKey = import.meta.env.PUBLIC_MINIMA_API_KEY;
const siteId = import.meta.env.PUBLIC_MINIMA_SITE_ID;

// Configure client once
client.setConfig({
  headers: {
    "X-Api-Key": apiKey,
  },
});

// Export configured SDK methods with siteId pre-filled
export const minima = {
  getPublicSite: () => sdk.getPublicSite({ path: { siteId } }),

  getPublicArticles: (options?: GetPublicArticlesData["query"]) =>
    sdk.getPublicArticles({
      path: { siteId },
      query: {
        limit: options?.limit || 10,
        offset: options?.offset || 0,
        orderBy: options?.orderBy || "publishedAt",
        order: options?.order || "desc",
        ...(options?.category && { category: options.category }),
        ...(options?.tag && { tag: options.tag }),
        ...(options?.type && { type: options.type }),
      },
    }),

  getPublicArticleBySlug: (
    slug: string,
    options?: Omit<GetPublicArticleBySlugData["query"], "slug">
  ) =>
    sdk.getPublicArticleBySlug({
      path: { siteId, slug },
      query: options,
    }),

  getPublicEntities: (options?: GetPublicEntitiesData["query"]) =>
    sdk.getPublicEntities({
      path: { siteId },
      query: {
        limit: options?.limit || 10,
        offset: options?.offset || 0,
        ...(options?.query && { query: options.query }),
        ...(options?.category && { category: options.category }),
        ...(options?.slug && { slug: options.slug }),
        ...(options?.orderBy && { orderBy: options.orderBy }),
        ...(options?.order && { order: options.order }),
        ...(options?.type && { type: options.type }),
        ...(options?.hasPermalink && { hasPermalink: options.hasPermalink }),
      },
    }),

  getPublicEntityBySlug: (
    slug: string,
    options?: Omit<GetPublicEntityBySlugData["query"], "slug">
  ) =>
    sdk.getPublicEntityBySlug({
      path: { siteId, slug },
      query: options,
    }),

  getPublicCategories: (options?: GetPublicCategoriesData["query"]) =>
    sdk.getPublicCategories({
      path: { siteId },
      query: {
        limit: options?.limit || 10,
        offset: options?.offset || 0,
      },
    }),

  resolvePublicPermalink: (
    path: string,
    options?: Omit<ResolvePublicPermalinkData["query"], "path">
  ) =>
    sdk.resolvePublicPermalink({
      path: { siteId },
      query: { path, ...options },
    }),
};

export { siteId, apiKey };
