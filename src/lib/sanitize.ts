// ✅ HTML Escape
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// ✅ Escape for HTML attributes (href, src, class, etc)
export function escapeAttribute(text: string): string {
  return text.replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

