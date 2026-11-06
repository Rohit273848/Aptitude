import { DSATopicMetadata } from '../types/dsa';
import { parseFrontmatter, extractHeadings, parseSections, ParsedMarkdownDoc } from './markdownParser';
import greedyRawMarkdown from '../content/dsa/greedy-algorithms.md?raw';

// Eagerly glob all markdown files in content/dsa
const dsaMarkdownModules = import.meta.glob('../content/dsa/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

/**
 * Registry mapping topicId or slug to raw markdown
 */
const topicMarkdownMap: Record<string, string> = {
  'dsa-greedy-algorithms': greedyRawMarkdown,
  'greedy-algorithms': greedyRawMarkdown
};

// Populate map from glob
Object.entries(dsaMarkdownModules).forEach(([path, content]) => {
  const filename = path.split('/').pop()?.replace('.md', '');
  if (filename) {
    topicMarkdownMap[filename] = content;
    topicMarkdownMap[`dsa-${filename}`] = content;
  }
});

/**
 * Loads and parses a DSA topic by its ID or slug
 */
export function loadDSATopic(topicId: string): ParsedMarkdownDoc | null {
  const raw = topicMarkdownMap[topicId] || topicMarkdownMap[topicId.replace(/^dsa-/, '')];

  if (!raw) {
    return null;
  }

  const { metadata, contentWithoutFrontmatter } = parseFrontmatter(raw);
  const headings = extractHeadings(contentWithoutFrontmatter);
  const sections = parseSections(contentWithoutFrontmatter);

  const fullMetadata: DSATopicMetadata = {
    id: metadata.id || topicId,
    title: metadata.title || 'Data Structures & Algorithms Topic',
    subtitle: metadata.subtitle || 'Placement preparation revision notes and interactive models.',
    category: metadata.category || 'Data Structures & Algorithms',
    difficulty: (metadata.difficulty as any) || 'Medium',
    estimatedTime: metadata.estimatedTime || '45 mins',
    problemsCovered: metadata.problemsCovered || 0,
    tags: metadata.tags || ['DSA', 'Placement'],
    noteFile: metadata.noteFile || `docs/dsa/${topicId.replace(/^dsa-/, '')}.md`
  };

  return {
    metadata: fullMetadata,
    headings,
    rawMarkdown: contentWithoutFrontmatter,
    sections
  };
}

/**
 * Returns all available DSA topic IDs
 */
export function getAvailableDSATopics(): string[] {
  return Object.keys(topicMarkdownMap);
}
