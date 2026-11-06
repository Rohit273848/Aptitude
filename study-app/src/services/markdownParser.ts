import { marked, Tokens } from 'marked';
import { DSATopicMetadata, TocHeading, DryRunScenario, DryRunStep } from '../types/dsa';

export interface ParsedMarkdownDoc {
  metadata: DSATopicMetadata;
  headings: TocHeading[];
  rawMarkdown: string;
  sections: ParsedSection[];
}

export interface ParsedSection {
  id: string;
  title: string;
  level: number;
  tokens: Tokens.Generic[];
  rawText: string;
}

/**
 * Extracts YAML frontmatter from Markdown text
 */
export function parseFrontmatter(rawContent: string): { metadata: Partial<DSATopicMetadata>; contentWithoutFrontmatter: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return {
      metadata: {},
      contentWithoutFrontmatter: rawContent
    };
  }

  const yamlBlock = match[1];
  const contentWithoutFrontmatter = rawContent.slice(match[0].length);
  const metadata: Partial<DSATopicMetadata> = {};

  const lines = yamlBlock.split(/\r?\n/);
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Strip quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key === 'id') metadata.id = value;
    else if (key === 'title') metadata.title = value;
    else if (key === 'subtitle') metadata.subtitle = value;
    else if (key === 'category') metadata.category = value;
    else if (key === 'difficulty') metadata.difficulty = value as any;
    else if (key === 'estimatedTime') metadata.estimatedTime = value;
    else if (key === 'problemsCovered') metadata.problemsCovered = parseInt(value, 10) || 0;
    else if (key === 'tags') {
      try {
        if (value.startsWith('[') && value.endsWith(']')) {
          metadata.tags = JSON.parse(value.replace(/'/g, '"'));
        } else {
          metadata.tags = value.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
        }
      } catch {
        metadata.tags = value.replace(/[\[\]']/g, '').split(',').map(s => s.trim());
      }
    }
  }

  return { metadata, contentWithoutFrontmatter };
}

/**
 * Generates URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // remove HTML
    .replace(/[^\w\s-]/g, '') // remove special chars
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Extracts table of contents headings (h1, h2, h3)
 */
export function extractHeadings(markdown: string): TocHeading[] {
  const tokens = marked.lexer(markdown);
  const headings: TocHeading[] = [];

  for (const token of tokens) {
    if (token.type === 'heading') {
      const text = token.text.replace(/\*\*/g, '').replace(/`/g, '');
      const id = slugify(text);
      headings.push({
        id,
        text,
        level: token.depth
      });
    }
  }

  return headings;
}

/**
 * Splits document into logical sections by h2 headings
 */
export function parseSections(markdown: string): ParsedSection[] {
  const tokens = marked.lexer(markdown);
  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;

  for (const token of tokens) {
    if (token.type === 'heading' && token.depth <= 2) {
      if (currentSection) {
        sections.push(currentSection);
      }
      const title = token.text.replace(/\*\*/g, '').replace(/`/g, '');
      currentSection = {
        id: slugify(title),
        title,
        level: token.depth,
        tokens: [token],
        rawText: token.raw
      };
    } else {
      if (!currentSection) {
        currentSection = {
          id: 'intro',
          title: 'Introduction',
          level: 2,
          tokens: [token],
          rawText: token.raw
        };
      } else {
        currentSection.tokens.push(token);
        currentSection.rawText += '\n' + token.raw;
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Helper to extract dry-run scenarios from markdown tables
 */
export function extractDryRunsFromTable(tableToken: Tokens.Table, title: string = 'Step-by-Step Dry Run'): DryRunScenario | null {
  if (!tableToken || !tableToken.header || tableToken.header.length === 0) return null;

  const headers = tableToken.header.map(h => (typeof h === 'string' ? h : (h as any).text || '').replace(/\*\*/g, '').trim());
  
  // Check if this looks like a dry-run table
  const dryRunKeywords = ['step', 'iteration', 'town', 'strategy', 'index', 'check', 'action', 'state', 'reach', 'status', 'outcome'];
  const hasKeyword = headers.some(h => dryRunKeywords.some(kw => h.toLowerCase().includes(kw)));
  
  if (!hasKeyword) return null;

  const steps: DryRunStep[] = [];
  let isSuccess = true;

  tableToken.rows.forEach((row, idx) => {
    const rowValues = row.map(cell => (typeof cell === 'string' ? cell : (cell as any).text || '').trim());
    const label = rowValues[0] || `Step ${idx + 1}`;
    
    // Construct state dictionary from header-value pairs
    const state: Record<string, string> = {};
    headers.forEach((h, colIdx) => {
      if (colIdx > 0 && rowValues[colIdx]) {
        state[h] = rowValues[colIdx].replace(/\*\*/g, '').replace(/\$/g, '');
      }
    });

    const lastCol = rowValues[rowValues.length - 1] || '';
    const isFailStep = lastCol.toLowerCase().includes('fail') || lastCol.toLowerCase().includes('dead end') || lastCol.includes('❌');
    const isSuccessStep = lastCol.toLowerCase().includes('success') || lastCol.toLowerCase().includes('return true') || lastCol.includes('✅') || lastCol.includes('🎉');

    if (isFailStep) isSuccess = false;

    steps.push({
      step: idx + 1,
      label: label.replace(/\*\*/g, '').replace(/\$/g, ''),
      explanation: rowValues.slice(1).join(' | '),
      state,
      isSuccess: isSuccessStep,
      isFailure: isFailStep
    });
  });

  return {
    id: slugify(title),
    title,
    description: 'Execution trace stepping through algorithm invariants and state transitions.',
    inputDescription: 'Sample placement test trace',
    steps,
    finalResult: steps.length > 0 ? steps[steps.length - 1].explanation : 'Execution Complete',
    isSuccess
  };
}
