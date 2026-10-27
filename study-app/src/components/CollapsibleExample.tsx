import React, { useState } from 'react';
import { KaTeXMath } from './KaTeXMath';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

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

  return (
    <div className="worked-example-box" id={`example-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      <div className="worked-example-header">
        <span className="worked-example-tag">{tag}</span>
        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
          {title}
        </h4>
        <div className="worked-example-question">
          {question}
        </div>
        <button
          type="button"
          className="toggle-solution-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <>
              <span>Hide Solution</span>
              <ChevronUp size={16} />
            </>
          ) : (
            <>
              <span>Show Solution</span>
              <ChevronDown size={16} />
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="worked-solution-drawer">
          {steps.map((step, idx) => (
            <div key={idx} className="solution-step-item">
              <div className="step-label">{step.title}</div>
              {step.explanation && <p style={{ fontSize: '0.92rem', marginBottom: '0.4rem' }}>{step.explanation}</p>}
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
