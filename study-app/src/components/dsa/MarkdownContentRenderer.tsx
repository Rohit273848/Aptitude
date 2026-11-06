import React, { useMemo } from 'react';
import { marked, Tokens } from 'marked';
import { KaTeXMath } from '../KaTeXMath';
import { CodeBlock } from './CodeBlock';
import { PseudocodeBlock } from './PseudocodeBlock';
import { extractDryRunsFromTable, slugify } from '../../services/markdownParser';
import {
  AlertTriangle,
  Info,
  Lightbulb,
  CheckCircle2,
  FileText,
  PlayCircle,
  Table as TableIcon
} from 'lucide-react';

interface MarkdownContentRendererProps {
  markdown: string;
  onActivateTableDryRun?: (scenario: any) => void;
}

/**
 * Parses inline string into React nodes supporting inline KaTeX math ($...$),
 * inline code (`...`), bold (**...**), and regular text.
 */
export const renderInlineMarkdown = (text: string): React.ReactNode => {
  if (!text) return null;

  // Split text by inline math: $...$ (avoiding \$, and ensuring not display $$)
  const mathRegex = /(?<!\\)\$([^\$]+?)\$/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mathRegex.exec(text)) !== null) {
    const beforeText = text.substring(lastIndex, match.index);
    if (beforeText) {
      parts.push(renderFormatting(beforeText, `txt-${lastIndex}`));
    }

    const mathExpr = match[1];
    parts.push(
      <KaTeXMath
        key={`math-${match.index}`}
        math={mathExpr}
        className="dsa-inline-katex"
      />
    );

    lastIndex = match.index + match[0].length;
  }

  const remaining = text.substring(lastIndex);
  if (remaining) {
    parts.push(renderFormatting(remaining, `txt-${lastIndex}`));
  }

  return <>{parts}</>;
};

/**
 * Helper to parse bold, italic, code, and links in non-math segments
 */
function renderFormatting(str: string, keyPrefix: string): React.ReactNode {
  // Simple parser for `code` and **bold**
  const tokens = str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <React.Fragment key={keyPrefix}>
      {tokens.map((tok, i) => {
        if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 2) {
          return (
            <code key={`${keyPrefix}-${i}`} className="dsa-inline-code">
              {tok.slice(1, -1)}
            </code>
          );
        }
        if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
          return (
            <strong key={`${keyPrefix}-${i}`} className="dsa-strong-text">
              {tok.slice(2, -2)}
            </strong>
          );
        }
        return tok;
      })}
    </React.Fragment>
  );
}

export const MarkdownContentRenderer: React.FC<MarkdownContentRendererProps> = ({
  markdown,
  onActivateTableDryRun
}) => {
  const tokens = useMemo(() => marked.lexer(markdown), [markdown]);

  const renderToken = (token: Tokens.Generic, index: number): React.ReactNode => {
    switch (token.type) {
      case 'heading': {
        const text = token.text.replace(/\*\*/g, '').replace(/`/g, '');
        const id = slugify(text);

        if (token.depth === 1) {
          return null; // Top-level h1 handled by DSAHeader
        }
        if (token.depth === 2) {
          return (
            <div key={index} className="dsa-section-anchor-wrap" id={id}>
              <hr className="dsa-major-divider" />
              <h2 className="dsa-section-heading">
                <a href={`#${id}`} className="dsa-heading-anchor-link">
                  #
                </a>
                <span>{renderInlineMarkdown(token.text)}</span>
              </h2>
            </div>
          );
        }
        if (token.depth === 3) {
          return (
            <h3 key={index} id={id} className="dsa-subsection-heading">
              <span>{renderInlineMarkdown(token.text)}</span>
            </h3>
          );
        }
        return (
          <h4 key={index} id={id} className="dsa-h4-heading">
            {renderInlineMarkdown(token.text)}
          </h4>
        );
      }

      case 'paragraph': {
        const raw = token.text.trim();

        // Check if paragraph is purely a display KaTeX math block: $$ ... $$
        if (raw.startsWith('$$') && raw.endsWith('$$')) {
          const math = raw.slice(2, -2).trim();
          return (
            <div key={index} className="dsa-display-math-wrapper">
              <KaTeXMath math={math} block />
            </div>
          );
        }

        return (
          <p key={index} className="dsa-paragraph">
            {renderInlineMarkdown(token.text)}
          </p>
        );
      }

      case 'code': {
        const lang = (token.lang || '').toLowerCase();
        if (lang === 'pseudocode' || lang === 'text') {
          return (
            <PseudocodeBlock
              key={index}
              pseudocode={token.text}
              title={lang === 'pseudocode' ? 'Algorithm Pseudocode' : 'Specification / Output'}
            />
          );
        }

        return (
          <div key={index} style={{ margin: '1.4rem 0' }}>
            <CodeBlock
              code={token.text}
              language={lang || 'java'}
              fileName={lang === 'java' ? 'Solution.java' : lang === 'cpp' ? 'Solution.cpp' : undefined}
            />
          </div>
        );
      }

      case 'blockquote': {
        const text = token.text.trim();
        let alertType: 'important' | 'tip' | 'warning' | 'note' | null = null;
        let cleanText = text;

        if (text.startsWith('[!IMPORTANT]')) {
          alertType = 'important';
          cleanText = text.replace(/^\[!IMPORTANT\]\s*/, '');
        } else if (text.startsWith('[!TIP]')) {
          alertType = 'tip';
          cleanText = text.replace(/^\[!TIP\]\s*/, '');
        } else if (text.startsWith('[!WARNING]')) {
          alertType = 'warning';
          cleanText = text.replace(/^\[!WARNING\]\s*/, '');
        } else if (text.startsWith('[!NOTE]')) {
          alertType = 'note';
          cleanText = text.replace(/^\[!NOTE\]\s*/, '');
        }

        if (alertType) {
          const alertIcons = {
            important: <CheckCircle2 size={16} color="var(--primary-action)" />,
            tip: <Lightbulb size={16} color="var(--secondary-accent)" />,
            warning: <AlertTriangle size={16} color="#E11D48" />,
            note: <Info size={16} color="var(--primary-action)" />
          };

          const alertTitles = {
            important: 'Important Rule / Invariant',
            tip: 'Placement Shortcut & Pro-Tip',
            warning: 'Common Exam Trap & Regret Warning',
            note: 'Technical Context & Note'
          };

          return (
            <div key={index} className={`dsa-alert-box ${alertType}`}>
              <div className="dsa-alert-header">
                {alertIcons[alertType]}
                <span>{alertTitles[alertType]}</span>
              </div>
              <div className="dsa-alert-body">
                {renderInlineMarkdown(cleanText)}
              </div>
            </div>
          );
        }

        return (
          <blockquote key={index} className="dsa-blockquote">
            {renderInlineMarkdown(text)}
          </blockquote>
        );
      }

      case 'table': {
        const tableToken = token as Tokens.Table;
        const dryRunScenario = extractDryRunsFromTable(tableToken);

        return (
          <div key={index} className="dsa-table-outer-wrapper">
            {dryRunScenario && onActivateTableDryRun && (
              <div className="dsa-table-stepper-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TableIcon size={14} color="var(--primary-action)" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Trace Table Detected ({dryRunScenario.steps.length} Steps)
                  </span>
                </div>
                <button
                  type="button"
                  className="dsa-launch-stepper-btn"
                  onClick={() => onActivateTableDryRun(dryRunScenario)}
                >
                  <PlayCircle size={14} /> Step Through in Visualizer
                </button>
              </div>
            )}

            <div className="dsa-table-scroll-container">
              <table className="dsa-markdown-table">
                <thead>
                  <tr>
                    {tableToken.header.map((cell, cIdx) => (
                      <th key={cIdx} style={{ textAlign: tableToken.align[cIdx] || 'left' }}>
                        {renderInlineMarkdown(typeof cell === 'string' ? cell : (cell as any).text || '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableToken.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} style={{ textAlign: tableToken.align[cIdx] || 'left' }}>
                          {renderInlineMarkdown(typeof cell === 'string' ? cell : (cell as any).text || '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case 'list': {
        const listToken = token as Tokens.List;
        if (listToken.ordered) {
          return (
            <ol key={index} className="dsa-ordered-list">
              {listToken.items.map((item, iIdx) => (
                <li key={iIdx}>
                  <span>{renderInlineMarkdown(item.text)}</span>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <ul key={index} className="dsa-unordered-list">
            {listToken.items.map((item, iIdx) => (
              <li key={iIdx}>
                <span>{renderInlineMarkdown(item.text)}</span>
              </li>
            ))}
          </ul>
        );
      }

      case 'hr': {
        return <hr key={index} className="dsa-major-divider" />;
      }

      case 'space':
        return null;

      default:
        return null;
    }
  };

  return <div className="dsa-rendered-markdown-root">{tokens.map(renderToken)}</div>;
};
