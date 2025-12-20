import type { TiptapSchema, TiptapNode, PublicImage } from "../sdk/types.gen";
import { CDN_BASE_URL } from "./constants";
import { escapeHtml, escapeAttribute } from "../lib/sanitize.ts"

// Render Tiptap JSON content to HTML
export function renderTiptapContent(content: TiptapSchema, images: PublicImage[] = []): string {
  if (!content || !content.content) return "";

  let html = "";
  for (const node of content.content) {
    html += renderNode(node, images);
  }
  return html;
}

function renderNode(node: TiptapNode, images: PublicImage[] = []): string {
  let html = "";

  if (node.type === "paragraph") {
    html += "<p>";
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child, images);
      }
    }
    html += "</p>";
  } else if (node.type === "text") {
    // Text content
    const textNode = node as Extract<TiptapNode, { type: "text" }>;
    let text = escapeHtml(textNode.text || "");

    if (textNode.marks) {
      for (const mark of textNode.marks) {
        if (mark.type === "bold") text = `<strong>${text}</strong>`;
        if (mark.type === "italic") text = `<em>${text}</em>`;
        if (mark.type === "link" && mark.attrs && "href" in mark.attrs) {
          // Link href attribute
          const href = escapeAttribute(String(mark.attrs.href || ""));
          text = `<a href="${href}">${text}</a>`;
        }
      }
    }
    html += text;
  } else if (node.type === "heading") {
    const level = Number(node.attrs?.level || 2);
    html += `<h${level}>`;
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child, images);
      }
    }
    html += `</h${level}>`;
  } else if (node.type === "bulletList") {
    html += "<ul>";
    if (node.content) {
      for (const item of node.content) {
        html += renderNode(item, images);
      }
    }
    html += "</ul>";
  } else if (node.type === "orderedList") {
    html += "<ol>";
    if (node.content) {
      for (const item of node.content) {
        html += renderNode(item, images);
      }
    }
    html += "</ol>";
  } else if (node.type === "listItem") {
    html += "<li>";
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child, images);
      }
    }
    html += "</li>";
  } else if (node.type === "blockquote") {
    html += "<blockquote>";
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child, images);
      }
    }
    html += "</blockquote>";
  } else if (node.type === "pullQuote") {
    // Quote text and attribution
    const text = escapeHtml(String(node.attrs?.text || ""));
    const attribution = escapeHtml(String(node.attrs?.attribution || ""));
    html += `<blockquote><p>${text}</p>`;
    if (attribution) {
      html += `<footer>— <cite>${attribution}</cite></footer>`;
    }
    html += "</blockquote>";
  } else if (node.type === "codeBlock") {
    // Language class and code content
    const language = escapeAttribute(String(node.attrs?.language || ""));
    html += `<pre><code class="${language}">`;
    if (node.content) {
      for (const child of node.content) {
        if (child.type === "text") {
          const textNode = child as Extract<TiptapNode, { type: "text" }>;
          // Code block text
          html += escapeHtml(textNode.text || "");
        }
      }
    }
    html += "</code></pre>";
  } else if (node.type === "imageNode") {
    const imageId = String(node.attrs?.["data-id"] || "");

    // Find matching image from images array by ID
    if (imageId && images.length > 0) {
      const image = images.find((img) => img.id === imageId);
      if (image) {
        // Image path, alt text, and caption
        const path = escapeAttribute(image.path);
        const src = `${CDN_BASE_URL}/${path}`;
        const alt = escapeAttribute(image.caption || "");
        const caption = escapeHtml(image.caption || "");
        const width = Number(image.width) || 0;
        const height = Number(image.height) || 0;

        if (caption) {
          html += `<figure>`;
          html += `<img src="${src}" alt="${alt}" width="${width}" height="${height}" />`;
          html += `<figcaption class="text-center text-sm text-gray-500 mt-2">${caption}</figcaption>`;
          html += `</figure>`;
        } else {
          html += `<img src="${src}" alt="${alt}" width="${width}" height="${height}" />`;
        }
      }
    }
  } else if (node.type === "entityEmbed") {
    // Entity name and type
    const entityName = escapeHtml(String(node.attrs?.entityName || ""));
    const entityType = escapeHtml(String(node.attrs?.entityType || ""));

    html += `<div class="border border-gray-300 my-5 bg-gray-100 rounded">`;
    html += `<div class="grid grid-cols-[70%_30%] text-sm uppercase text-gray-700 m-0 border-b border-gray-300 p-4 leading-none">`;
    html += `<div class="text-left">${entityName}</div>`;
    html += `<div class="text-right">${entityType}</div>`;
    html += `</div>`;

    html += `<div class="p-4 bg-gray-50 space-y-4">`;
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child, images);
      }
    }
    html += `</div>`;
    html += `</div>`;
  }

  return html;
}
