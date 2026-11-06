import React, { useMemo, useEffect, useRef } from 'react';
import { marked } from 'marked';
import katex from 'katex';
import mermaid from 'mermaid';
import { TOCItem } from './TableOfContents';

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
});

interface MarkdownRendererProps {
  content: string;
  className?: string;
  onTOCParsed?: (items: TOCItem[]) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  onTOCParsed
}) => {
  // Extract Frontmatter and Markdown Body
  const { frontmatter, body } = useMemo(() => {
    let raw = content;
    let fm: Record<string, string> = {};

    if (raw.startsWith('---')) {
      const endIdx = raw.indexOf('---', 3);
      if (endIdx !== -1) {
        const fmContent = raw.slice(3, endIdx).trim();
        raw = raw.slice(endIdx + 3).trim();

        // Simple YAML key-value parser
        fmContent.split('\n').forEach(line => {
          const colonIdx = line.indexOf(':');
          if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            let val = line.slice(colonIdx + 1).trim();
            val = val.replace(/^["']|["']$/g, '');
            fm[key] = val;
          }
        });
      }
    }

    return { frontmatter: fm, body: raw };
  }, [content]);

  // Extract Headings for Table of Contents
  const tocItems = useMemo<TOCItem[]>(() => {
    const items: TOCItem[] = [];
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(body)) !== null) {
      const level = match[1].length;
      let rawTitle = match[2].trim();
      // Clean links if inside heading
      rawTitle = rawTitle.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

      // Create URL-safe anchor ID
      const id = rawTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      items.push({ id, title: rawTitle, level });
    }

    return items;
  }, [body]);

  // Notify parent of parsed TOC if callback provided
  React.useEffect(() => {
    if (onTOCParsed && tocItems.length > 0) {
      onTOCParsed(tocItems);
    }
  }, [tocItems, onTOCParsed]);

  // Parse Markdown to HTML with KaTeX and Callouts
  const renderedHtml = useMemo(() => {
    try {
      let processed = body;

      // 1. Mermaid diagram extraction before marked messes with syntax
      const mermaidBlocks: string[] = [];
      processed = processed.replace(/```mermaid\s*\n([\s\S]*?)```/g, (_, code) => {
        const idx = mermaidBlocks.length;
        mermaidBlocks.push(code.trim());
        return `@@MERMAIDBLOCK_${idx}@@`;
      });

      // 2. Math placeholders to prevent marked from corrupting LaTeX underscores/asterisks
      const mathBlocks: string[] = [];
      processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
        const idx = mathBlocks.length;
        try {
          const rendered = katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
            strict: false
          });
          mathBlocks.push(`<div class="katex-block-wrapper">${rendered}</div>`);
        } catch {
          mathBlocks.push(`<div class="katex-block-wrapper"><code>${math}</code></div>`);
        }
        return `@@MATHBLOCK_${idx}@@`;
      });

      const mathInline: string[] = [];
      processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
        const idx = mathInline.length;
        try {
          const rendered = katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
            strict: false
          });
          mathInline.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
        } catch {
          mathInline.push(`<code>${math}</code>`);
        }
        return `@@MATHINLINE_${idx}@@`;
      });

      // 2. Transform GitHub Alert Callouts with optional custom title
      processed = processed.replace(
        /> \[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]([^\n]*)\n((?:> .*\n?)*)/gi,
        (_, alertType, customTitle, alertBody) => {
          const type = alertType.toLowerCase();
          const cssClass =
            type === 'tip'
              ? 'tip'
              : type === 'warning'
              ? 'warning'
              : type === 'important' || type === 'caution'
              ? 'trap'
              : 'info';

          const trimmedTitle = (customTitle || '').trim();
          const title =
            trimmedTitle.length > 0
              ? trimmedTitle
              : type === 'tip'
              ? 'Key Intuition & Pro-Tip'
              : type === 'warning'
              ? 'Common Pitfall & Trap'
              : type === 'important'
              ? 'Core Invariant Rule'
              : 'Concept Deep-Dive';

          const cleanLines = alertBody
            .split('\n')
            .map((l: string) => l.replace(/^>\s?/, ''))
            .join('\n');

          return `<div class="callout-block ${cssClass}"><div class="callout-card-title">${title}</div>\n\n${cleanLines}\n</div>\n\n`;
        }
      );

      // 3. Add IDs to Markdown Headings (H2, H3, H4) for anchor links
      const headingIdCounts = new Map<string, number>();
      processed = processed.replace(/^(#{2,4})\s+(.+)$/gm, (full, hashes, title) => {
        const cleanTitle = title.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
        let id = cleanTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        if (headingIdCounts.has(id)) {
          const count = headingIdCounts.get(id)! + 1;
          headingIdCounts.set(id, count);
          id = `${id}-${count}`;
        } else {
          headingIdCounts.set(id, 1);
        }
        return `${hashes} <span id="${id}" class="markdown-heading-anchor"></span>${title}`;
      });

      // 4. Parse with marked
      let html = marked.parse(processed) as string;

      // 5. Restore Math Placeholders
      html = html.replace(/@@MATHBLOCK_(\d+)@@/g, (_, idx) => mathBlocks[Number(idx)] || '');
      html = html.replace(/@@MATHINLINE_(\d+)@@/g, (_, idx) => mathInline[Number(idx)] || '');

      // 6. Restore Mermaid Placeholders
      html = html.replace(/@@MERMAIDBLOCK_(\d+)@@/g, (_, idx) => {
        const code = mermaidBlocks[Number(idx)] || '';
        return `<div class="mermaid-diagram-wrap" data-mermaid-code="${encodeURIComponent(code)}"><div class="mermaid-loading-state">Rendering architecture diagram...</div></div>`;
      });

      // 7. Style HTML Tables
      html = html.replace(
        /<table>/g,
        '<div class="table-responsive-wrapper"><table class="dsa-styled-table">'
      );
      html = html.replace(/<\/table>/g, '</table></div>');

      return html;
    } catch (err) {
      console.error('Markdown parse error:', err);
      return `<p>Error rendering markdown content.</p>`;
    }
  }, [body]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Render Mermaid diagrams into SVGs
  useEffect(() => {
    if (!containerRef.current) return;
    const diagramContainers = containerRef.current.querySelectorAll<HTMLDivElement>('.mermaid-diagram-wrap');

    diagramContainers.forEach(async (el, index) => {
      const rawCode = el.getAttribute('data-mermaid-code');
      if (!rawCode || el.getAttribute('data-rendered') === 'true') return;

      const code = decodeURIComponent(rawCode);
      const uniqueId = `mermaid-svg-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`;

      try {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        });
        const { svg } = await mermaid.render(uniqueId, code);
        el.innerHTML = svg;
        el.setAttribute('data-rendered', 'true');
      } catch (err) {
        console.error('Mermaid render error:', err);
        el.innerHTML = `<pre class="mermaid-fallback-code"><code>${code}</code></pre>`;
      }
    });
  }, [renderedHtml]);

  return (
    <div
      ref={containerRef}
      className={`dsa-markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

