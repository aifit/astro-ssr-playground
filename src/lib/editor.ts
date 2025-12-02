import type { TiptapSchema, TiptapNode, PublicImage } from "../sdk/types.gen";

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
        html += renderNode(child);
      }
    }
    html += "</p>";
  } else if (node.type === "text") {
    // TextNode has text and marks properties
    const textNode = node as Extract<TiptapNode, { type: "text" }>;
    let text = textNode.text || "";

    if (textNode.marks) {
      for (const mark of textNode.marks) {
        if (mark.type === "bold") text = `<strong>${text}</strong>`;
        if (mark.type === "italic") text = `<em>${text}</em>`;
        if (mark.type === "link" && mark.attrs && "href" in mark.attrs) {
          text = `<a href="${mark.attrs.href}">${text}</a>`;
        }
      }
    }
    html += text;
  } else if (node.type === "heading") {
    const level = Number(node.attrs?.level || 2);
    html += `<h${level}>`;
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child);
      }
    }
    html += `</h${level}>`;
  } else if (node.type === "bulletList") {
    html += "<ul>";
    if (node.content) {
      for (const item of node.content) {
        html += renderNode(item);
      }
    }
    html += "</ul>";
  } else if (node.type === "orderedList") {
    html += "<ol>";
    if (node.content) {
      for (const item of node.content) {
        html += renderNode(item);
      }
    }
    html += "</ol>";
  } else if (node.type === "listItem") {
    html += "<li>";
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child);
      }
    }
    html += "</li>";
  } else if (node.type === "blockquote") {
    html += "<blockquote>";
    if (node.content) {
      for (const child of node.content) {
        html += renderNode(child);
      }
    }
    html += "</blockquote>";
  } else if (node.type === "pullQuote") {
    const text = String(node.attrs?.text || "");
    const attribution = String(node.attrs?.attribution || "");
    html += `<blockquote><p>${text}</p>`;
    if (attribution) {
      html += `<footer>— <cite>${attribution}</cite></footer>`;
    }
    html += "</blockquote>";
  } else if (node.type === "codeBlock") {
    const language = String(node.attrs?.language || "");
    html += `<pre><code class="${language}">`;
    if (node.content) {
      for (const child of node.content) {
        if (child.type === "text") {
          const textNode = child as Extract<TiptapNode, { type: "text" }>;
          html += textNode.text;
        }
      }
    }
    html += "</code></pre>";
  } else if (node.type === "imageNode") {
    const imageId = String(node.attrs?.["data-id"] || "");

    // Find matching image from images array by ID (following Minima's pattern)
    if (imageId && images.length > 0) {
      const image = images.find((img) => img.id === imageId);
      if (image) {
        const src = `https://r2.minima.ltd/${image.path}`;
        const alt = image.caption || "";
        const caption = image.caption;

        if (caption) {
          html += `<figure>`;
          html += `<img src="${src}" alt="${alt}" width="${image.width}" height="${image.height}" />`;
          html += `<figcaption>${caption}</figcaption>`;
          html += `</figure>`;
        } else {
          html += `<img src="${src}" alt="${alt}" width="${image.width}" height="${image.height}" />`;
        }
      }
    }
  }

  return html;
}
