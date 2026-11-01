import React, { useState, useEffect } from 'react';
import { KaTeXMath } from './KaTeXMath';
import { ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';

interface Step {
  title: string;
  math?: string;
  explanation?: string;
}

interface CollapsibleExampleProps {
  id: string;
  tag?: string;
  title: string;
  question: string;
  steps: Step[];
  finalAnswer: string;
  isExpanded?: boolean;
}

export const CollapsibleExample: React.FC<CollapsibleExampleProps> = ({
  tag = 'Worked Example',
  title,
  question,
  steps,
  finalAnswer,
  isExpanded = false
}) => {
  const [isOpen, setIsOpen] = useState(isExpanded);

  // Sync when parent expandAll changes
  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  return (
    <div className="worked-example-box" id={`example-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      <div
        className="worked-example-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span className="worked-example-tag">{tag}</span>
          <button
            type="button"
            className="toggle-solution-btn"
            onClick={e => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <>
                <span>Hide Solution</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span>Show Solution</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.45rem', fontWeight: 700 }}>
          {title}
        </h4>

        <div className="worked-example-question">
          {question}
        </div>
      </div>

      {isOpen && (
        <div className="worked-solution-drawer">
          {steps.map((step, idx) => (
            <div key={idx} className="solution-step-item">
              <div className="step-label">{step.title}</div>
              {step.explanation && (
                <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', marginBottom: '0.45rem', lineHeight: 1.6 }}>
                  {step.explanation}
                </p>
              )}
              {step.math && <KaTeXMath math={step.math} block />}
            </div>
          ))}

          <div className="final-answer-pill">
            <CheckCircle size={16} />
            <span>Final Answer: {finalAnswer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
