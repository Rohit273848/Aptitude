import React, { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

interface PseudocodeBlockProps {
  title?: string;
  pseudocode: string;
  invariant?: string;
}

export const PseudocodeBlock: React.FC<PseudocodeBlockProps> = ({
  title = 'Algorithmic Pseudocode',
  pseudocode,
  invariant
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pseudocode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = pseudocode.trim().split('\n');

  return (
    <div className="dsa-pseudocode-card">
      <div className="dsa-pseudocode-header">
        <div className="dsa-pseudocode-title-wrap">
          <FileText size={15} color="var(--primary-action)" />
          <span className="dsa-pseudocode-title">{title}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`dsa-code-copy-btn ${copied ? 'copied' : ''}`}
        >
          {copied ? (
            <>
              <Check size={13} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {invariant && (
        <div className="dsa-pseudocode-invariant">
          <span className="invariant-badge">Key Invariant:</span>
          <span>{invariant}</span>
        </div>
      )}

      <div className="dsa-pseudocode-body">
        <pre className="dsa-pseudocode-pre">
          {lines.map((line, idx) => (
            <div key={idx} className="dsa-pseudocode-row">
              <span className="dsa-pseudocode-num">{idx + 1}</span>
              <span className="dsa-pseudocode-text">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
