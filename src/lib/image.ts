/**
 Options for image resizing via CDN
 */
export interface ImageResizeOptions {
  width?: number;
  height?: number;
  fit?: "contain" | "cover" | "fill" | "inside" | "outside";
}

/**
 getImageUrl('org_xxx/image.jpg') // => 'https://r2.minima.ltd/org_xxx/image.jpg'
 getImageUrl('org_xxx/image.jpg', 240, 240) // => 'https://r2.minima.ltd/org_xxx/image.jpg?width=240&height=240&fit=contain'
 */

export function getImageUrl(
  path: string,
  width?: number,
  height?: number
): string {
  if (!path) return "";

  // If already a full URL, return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Construct base CDN URL
  const baseUrl = `https://r2.minima.ltd/${path}`;

  // Add resize parameters if provided
  if (width || height) {
    const params = new URLSearchParams();
    if (width) params.append("width", width.toString());
    if (height) params.append("height", height.toString());
    params.append("fit", "contain");
    return `${baseUrl}?${params.toString()}`;
  }

  return baseUrl;
}
