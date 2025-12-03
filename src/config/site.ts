import { minima } from "../lib/minima";

let cachedSiteName: string | null = null;

export const getSiteName = async (): Promise<string> => {
  if (cachedSiteName) {
    console.log("✅ Using cached site name:", cachedSiteName);
    return cachedSiteName;
  }

  console.log("🔄 Fetching site name from API...");
  const response = await minima.getPublicSite();
  cachedSiteName = response.data?.name || "Astro SSR Playground";
  console.log("✅ Cached site name:", cachedSiteName);
  return cachedSiteName;
};

export const buildTitle = async (pageTitle?: string): Promise<string> => {
  const siteName = await getSiteName();
  if (!pageTitle) return siteName;
  return `${pageTitle} - ${siteName}`;
};
