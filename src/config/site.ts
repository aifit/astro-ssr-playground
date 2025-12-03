import { minima } from "../lib/minima";

let cachedSiteName: string | null = null;

export const getSiteName = async (): Promise<string> => {
  if (cachedSiteName) {
    return cachedSiteName;
  }

  const response = await minima.getPublicSite();
  cachedSiteName = response.data?.name || "Astro SSR Playground";
  return cachedSiteName;
};

export const buildTitle = async (pageTitle?: string): Promise<string> => {
  const siteName = await getSiteName();
  if (!pageTitle) return siteName;
  return `${pageTitle} - ${siteName}`;
};
