import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  lineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'java',
  title,
  lineNumbers = true
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  // Simple syntax tokenizer for highlighting Java/C++/Python
  const highlightLine = (line: string): React.ReactNode => {
    // Comments
    if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
      return <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{line}</span>;
    }

    // Split words while preserving separators
    const tokens = line.split(/(\s+|[(),;{}[\]+\-*/%!=<>|&])/g);

    return tokens.map((token, idx) => {
      // Check for inline comment in line
      if (token.startsWith('//')) {
        return (
          <span key={idx} style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {token}
          </span>
        );
      }

      // Keywords
      if (
        /^(public|private|protected|class|static|void|int|double|boolean|String|char|long|float|return|if|else|for|while|break|continue|new|import|package|def|def|true|false|null)$/.test(
          token
        )
      ) {
        return (
          <span key={idx} style={{ color: 'var(--primary-action)', fontWeight: 650 }}>
            {token}
          </span>
        );
      }

      // String literals
      if (/^["'].*["']$/.test(token)) {
        return (
          <span key={idx} style={{ color: 'var(--secondary-accent)' }}>
            {token}
          </span>
        );
      }

      // Numbers
      if (/^\d+(\.\d+)?$/.test(token)) {
        return (
          <span key={idx} style={{ color: '#3B82F6', fontWeight: 600 }}>
            {token}
          </span>
        );
      }

      return token;
    });
  };

  return (
    <div className="dsa-code-card">
      <div className="dsa-code-header">
        <div className="dsa-code-meta">
          <Terminal size={14} className="dsa-code-icon" />
          <span className="dsa-code-lang">{language.toUpperCase()}</span>
          {title && <span className="dsa-code-title">&bull; {title}</span>}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`dsa-code-copy-btn ${copied ? 'copied' : ''}`}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      <div className="dsa-code-viewport">
        <pre className="dsa-code-pre">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="dsa-code-line-row">
                {lineNumbers && (
                  <span className="dsa-code-line-num" aria-hidden="true">
                    {idx + 1}
                  </span>
                )}
                <span className="dsa-code-line-content">{highlightLine(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
