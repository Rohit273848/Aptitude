import React, { useState } from 'react';
import { ProblemData } from '../../types/dsa';
import { CodeBlock } from './CodeBlock';
import { PseudocodeBlock } from './PseudocodeBlock';
import { ComplexityCard } from './ComplexityCard';
import {
  ChevronDown,
  ChevronUp,
  Code2,
  ExternalLink,
  Layers,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  PlayCircle
} from 'lucide-react';

interface ProblemSectionProps {
  problem: ProblemData;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  children?: React.ReactNode;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({
  problem,
  isExpanded = true,
  onToggleExpand,
  children
}) => {
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);

  const expanded = onToggleExpand ? isExpanded : internalExpanded;
  const toggle = () => {
    if (onToggleExpand) onToggleExpand();
    else setInternalExpanded(!internalExpanded);
  };

  const getDifficultyPill = (diff?: string) => {
    if (!diff) return null;
    const isEasy = diff.toLowerCase().includes('easy');
    const isHard = diff.toLowerCase().includes('hard');
    const color = isEasy
      ? 'var(--primary-action)'
      : isHard
      ? '#E11D48'
      : 'var(--secondary-accent)';

    return (
      <span
        className="dsa-tag-item"
        style={{ color, borderColor: color, fontWeight: 700 }}
      >
        {diff}
      </span>
    );
  };

  return (
    <div className="dsa-problem-card" id={`problem-${problem.id}`}>
      {/* Header Bar */}
      <div
        className="dsa-problem-header"
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div className="dsa-problem-title-group">
          <div className="dsa-problem-icon">
            <Code2 size={18} color="var(--primary-action)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              {problem.platform && (
                <span className="dsa-platform-badge">
                  {problem.platform} {problem.problemNumber ? `#${problem.problemNumber}` : ''}
                </span>
              )}
              {getDifficultyPill(problem.difficulty)}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              {problem.title}
            </h3>
          </div>
        </div>

        <button
          type="button"
          className="dsa-toggle-icon-btn"
          aria-label={expanded ? 'Collapse problem' : 'Expand problem'}
        >
          {expanded ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.84rem' }}>
              Hide Details <ChevronUp size={16} />
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.84rem' }}>
              Show Details <ChevronDown size={16} />
            </span>
          )}
        </button>
      </div>

      {expanded && (
        <div className="dsa-problem-body">
          {/* Problem Statement */}
          {problem.statement && (
            <div className="dsa-problem-statement-box">
              <span className="statement-label">Problem Statement:</span>
              <p>{problem.statement}</p>
            </div>
          )}

          {/* Intuition & Key Invariant */}
          {problem.intuition && (
            <div className="dsa-problem-intuition-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                <Lightbulb size={15} color="var(--secondary-accent)" />
                <span>Greedy Intuition & Core Invariant:</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                {problem.intuition}
              </p>
            </div>
          )}

          {/* Step-by-Step Logic */}
          {problem.steps && problem.steps.length > 0 && (
            <div className="dsa-steps-sequence-box">
              <span className="steps-header-title">Algorithmic Step-by-Step Execution:</span>
              <ol className="dsa-steps-ordered-list">
                {problem.steps.map((st, sIdx) => (
                  <li key={sIdx}>
                    <span>{st}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Pseudocode */}
          {problem.pseudocode && (
            <PseudocodeBlock
              title={`${problem.title} (Pseudocode)`}
              pseudocode={problem.pseudocode}
            />
          )}

          {/* Java Implementation */}
          {problem.javaCode && (
            <CodeBlock
              language="java"
              fileName={`${problem.title.replace(/\s+/g, '')}.java`}
              code={problem.javaCode}
              notes="Optimal Java placement implementation. Passes 100% of test cases."
            />
          )}

          {/* Complexity */}
          {problem.complexity && (
            <ComplexityCard complexity={problem.complexity} />
          )}

          {/* Observations */}
          {problem.observations && problem.observations.length > 0 && (
            <div className="dsa-observations-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                <CheckCircle size={15} color="var(--primary-action)" />
                <span>Key Placement Takeaways & Edge Cases:</span>
              </div>
              <ul className="dsa-observations-list">
                {problem.observations.map((obs, oIdx) => (
                  <li key={oIdx}>{obs}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Render any additional nested content */}
          {children}
        </div>
      )}
    </div>
  );
};
