/**
 * Dynamic Markdown Document H2 Main Section Parser
 * Extracts strictly major section headings (H2 only), skipping H3/H4 subtopics from marker count
 * while collecting key subtopics, takeaways, and observations into the section's hover preview data.
 */

export interface TimelineNavSection {
  id: string;
  title: string;
  level: number; // Always 2 for major H2 sections
  parentTitle: string;
  tag: string;
  leadSnippet?: string;
  highlightItem?: string;
  keyPoints: string[];
  badge?: string;
}

/**
 * Strips Markdown formatting (bold, italic, links, inline code, math) for clean display
 */
export function cleanMarkdownFormatting(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\$\$([\s\S]*?)\$\$/g, '')
    .replace(/\$([^\$\n]+?)\$/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Generates URL-safe anchor ID from heading text
 */
export function slugifyHeading(title: string): string {
  return cleanMarkdownFormatting(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Infers an appropriate contextual tag for a major H2 section
 */
function inferSectionTag(title: string, lines: string[]): string {
  const t = title.toLowerCase();

  if (/leetcode\s*\d+|lc\s*\d+/i.test(t)) {
    const lcMatch = title.match(/(?:leetcode|lc)\s*(\d+)/i);
    return lcMatch ? `LeetCode ${lcMatch[1]}` : 'Coding Problem';
  }
  if (/lemonade\s*change/i.test(t)) return 'LeetCode 860 • Easy';
  if (/assign\s*cookies/i.test(t)) return 'LeetCode 455 • Easy';
  if (/jump\s*game/i.test(t)) return 'LeetCode 55 • Medium';
  if (/fractional\s*knapsack/i.test(t)) return 'Standard Placement • Medium';
  if (/regret|pachtawa|dp\s*vs/i.test(t)) return 'Paradigm Comparison';
  if (/intuition|philosophy|core\s*rule/i.test(t)) return 'Core Intuition';
  if (/strategy|mistake|interview|traps/i.test(t)) return 'Interview Strategy';
  if (/practice|homework/i.test(t)) return 'Practice Problems';
  if (/formula|cheat\s*sheet|quick/i.test(t)) return 'Revision Sheet';

  for (const line of lines.slice(0, 8)) {
    if (line.includes('> [!IMPORTANT]')) return 'Core Invariant';
    if (line.includes('> [!WARNING]')) return 'Exam Trap Warning';
    if (line.includes('> [!TIP]')) return 'Calculation Tip';
  }

  return 'Main Section';
}

/**
 * Infers a badge (e.g. complexity or difficulty)
 */
function inferSectionBadge(title: string, lines: string[]): string | undefined {
  for (const line of lines) {
    if (/\\mathcal\{O\}|O\([1Nlog\s\\]+\)/i.test(line)) {
      const match = line.match(/(O\([^)]+\)|\\mathcal\{O\}\([^)]+\))/);
      if (match) return match[1].replace(/\\mathcal\{O\}/g, 'O');
    }
  }
  if (/easy/i.test(title)) return 'Difficulty: Easy';
  if (/medium/i.test(title)) return 'Difficulty: Medium';
  if (/hard/i.test(title)) return 'Difficulty: Hard';
  return undefined;
}

/**
 * Parses raw Markdown document into structured Timeline navigation sections.
 * STRICTLY extracts H2 (##) headings only, collecting subtopics (H3) as bullet points
 * inside the preview card so only major markers are shown on the vertical indicator rail.
 */
export function parseMarkdownTimeline(
  markdownContent: string,
  defaultTopicTitle: string = 'DSA Learning Notes'
): TimelineNavSection[] {
  if (!markdownContent || typeof markdownContent !== 'string') return [];

  // Remove YAML Frontmatter if present
  let body = markdownContent;
  if (body.startsWith('---')) {
    const endIdx = body.indexOf('---', 3);
    if (endIdx !== -1) {
      body = body.slice(endIdx + 3).trim();
    }
  }

  // Regex strictly matching H2 (## )
  const h2Regex = /^##\s+(.+)$/gm;
  const rawH2s: {
    title: string;
    index: number;
    fullMatchLength: number;
  }[] = [];

  let match: RegExpExecArray | null;
  while ((match = h2Regex.exec(body)) !== null) {
    const rawTitle = match[1].trim();
    // Exclude Table of Contents heading itself
    if (/^table\s+of\s+contents$/i.test(rawTitle)) {
      continue;
    }
    rawH2s.push({
      title: rawTitle,
      index: match.index,
      fullMatchLength: match[0].length
    });
  }

  if (rawH2s.length === 0) return [];

  const sections: TimelineNavSection[] = [];
  const usedIds = new Map<string, number>();

  for (let i = 0; i < rawH2s.length; i++) {
    const curr = rawH2s[i];
    const next = rawH2s[i + 1];

    const cleanTitle = cleanMarkdownFormatting(curr.title);
    let baseId = slugifyHeading(cleanTitle);

    // Deduplicate ID
    let finalId = baseId;
    if (usedIds.has(baseId)) {
      const count = usedIds.get(baseId)! + 1;
      usedIds.set(baseId, count);
      finalId = `${baseId}-${count}`;
    } else {
      usedIds.set(baseId, 1);
    }

    // Chunk of content between this H2 and the next H2
    const sectionChunk = body.slice(
      curr.index + curr.fullMatchLength,
      next ? next.index : undefined
    ).trim();

    const rawLines = sectionChunk.split('\n').map(l => l.trim()).filter(Boolean);

    let leadSnippet = '';
    let highlightItem = '';
    const keyPoints: string[] = [];

    // Extract H3 subtopics as keyPoints for rich contextual preview
    for (let j = 0; j < rawLines.length; j++) {
      const line = rawLines[j];

      // Ignore math block lines or horizontal divider
      if (line.startsWith('$$') || line.startsWith('```') || line === '---') {
        continue;
      }

      // Collect H3 subheadings as key points
      if (line.startsWith('### ')) {
        const subtopic = cleanMarkdownFormatting(line.replace(/^###\s+/, ''));
        if (subtopic && !keyPoints.includes(subtopic)) {
          keyPoints.push(subtopic);
        }
        continue;
      }

      // Prominent Alert Callout as highlight
      if (line.startsWith('> [!') || line.startsWith('> **')) {
        const cleanedCallout = cleanMarkdownFormatting(
          line.replace(/^>\s*(\[![\w]+\])?\s*/i, '')
        );
        if (cleanedCallout && !highlightItem) {
          highlightItem = cleanedCallout;
        }
        continue;
      }

      // If keyPoints from H3 is small, collect numbered/bullet items
      if (keyPoints.length < 5) {
        const listMatch = line.match(/^(\d+\.|[-*•])\s+(.+)$/);
        if (listMatch) {
          const pt = cleanMarkdownFormatting(listMatch[2]);
          if (pt && !keyPoints.includes(pt) && pt.length > 5) {
            keyPoints.push(pt);
          }
        }
      }

      // Lead snippet
      if (!leadSnippet && !line.startsWith('#') && !line.startsWith('>') && line.length > 20) {
        leadSnippet = cleanMarkdownFormatting(line);
      }
    }

    // Fallback highlight item if none was extracted from callout
    if (!highlightItem) {
      if (keyPoints.length > 0) {
        highlightItem = keyPoints.shift()!;
      } else if (leadSnippet) {
        highlightItem = leadSnippet.slice(0, 90) + (leadSnippet.length > 90 ? '...' : '');
      } else {
        highlightItem = `Core takeaways & step-by-step logic for ${cleanTitle}`;
      }
    }

    const tag = inferSectionTag(cleanTitle, rawLines);
    const badge = inferSectionBadge(cleanTitle, rawLines);

    sections.push({
      id: finalId,
      title: cleanTitle,
      level: 2, // Always H2
      parentTitle: defaultTopicTitle,
      tag,
      leadSnippet: leadSnippet ? leadSnippet.slice(0, 130) : undefined,
      highlightItem,
      keyPoints: keyPoints.slice(0, 6),
      badge
    });
  }

  return sections;
}
