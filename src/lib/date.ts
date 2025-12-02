export function formatDate(timestamp: number, locale: string = "en-US"): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
