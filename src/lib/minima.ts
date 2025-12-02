import { client } from "../sdk/client.gen";
import * as sdk from "../sdk";
import type {
  GetPublicArticlesData,
  GetPublicEntitiesData,
  GetPublicCategoriesData,
} from "../sdk/types.gen";

// Helper to get env vars at runtime
const getEnv = () => ({
  apiKey: import.meta.env.MINIMA_API_KEY,
  siteId: import.meta.env.MINIMA_SITE_ID,
});

// Configure client with runtime env
const configureClient = () => {
  const { apiKey } = getEnv();
  client.setConfig({
    headers: {
      "X-Api-Key": apiKey,
    },
  });
};

// Export configured SDK methods with siteId pre-filled
export const minima = {
  getPublicSite: () => {
    configureClient();
    const { siteId } = getEnv();
    return sdk.getPublicSite({ path: { siteId } });
  },

  getPublicArticles: (options?: GetPublicArticlesData["query"]) => {
    configureClient();
    const { siteId } = getEnv();
    return sdk.getPublicArticles({
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
    });
  },

  getPublicArticleBySlug: (slug: string) => {
    configureClient();
    const { siteId } = getEnv();
    return sdk.getPublicArticleBySlug({ path: { siteId, slug } });
  },

  getPublicEntities: (options?: GetPublicEntitiesData["query"]) => {
    configureClient();
    const { siteId } = getEnv();
    return sdk.getPublicEntities({
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
    });
  },

  getPublicEntityBySlug: (slug: string) => {
    configureClient();
    const { siteId } = getEnv();
    return sdk.getPublicEntityBySlug({ path: { siteId, slug } });
  },

  getPublicCategories: (options?: GetPublicCategoriesData["query"]) => {
    configureClient();
    const { siteId } = getEnv();
    return sdk.getPublicCategories({
      path: { siteId },
      query: {
        limit: options?.limit || 10,
        offset: options?.offset || 0,
      },
    });
  },

  resolvePublicPermalink: (path: string) => {
    configureClient();
    const { siteId } = getEnv();
    return sdk.resolvePublicPermalink({
      path: { siteId },
      query: { path },
    });
  },
};

export const getSiteId = () => getEnv().siteId;
export const getApiKey = () => getEnv().apiKey;
