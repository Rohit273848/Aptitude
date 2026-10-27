import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXMathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KaTeXMath: React.FC<KaTeXMathProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
      return `<span>${math}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`katex-block-wrapper ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`katex-inline-wrapper ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
