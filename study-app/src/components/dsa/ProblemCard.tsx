import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { ComplexityCard } from './ComplexityCard';
import { KaTeXMath } from '../KaTeXMath';
import {
  Code2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Table,
  Zap,
  Tag
} from 'lucide-react';

export interface ProblemCardData {
  id: string;
  problemNumber: number;
  title: string;
  platform: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  analogyTitle?: string;
  analogyContent?: React.ReactNode;
  steps: {
    number: number;
    title: string;
    description: string;
    badge?: string;
  }[];
  dryRunTitle?: string;
  dryRunHeaders?: string[];
  dryRunRows?: (string | React.ReactNode)[][];
  javaCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  timeExplanation: string;
  spaceExplanation: string;
  interviewTrap?: string;
  isExpandedByDefault?: boolean;
}

interface ProblemCardProps {
  data: ProblemCardData;
  isForceExpanded?: boolean;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  data,
  isForceExpanded = false
}) => {
  const [isOpen, setIsOpen] = useState(data.isExpandedByDefault ?? true);
  const isExpanded = isForceExpanded || isOpen;

  return (
    <article className="dsa-problem-card" id={`problem-${data.id}`}>
      {/* Header Bar */}
      <header className="dsa-problem-header" onClick={() => setIsOpen(prev => !prev)}>
        <div className="dsa-problem-title-group">
          <span className="problem-num-badge">Problem {data.problemNumber}</span>
          <div>
            <h3 className="problem-title-text">{data.title}</h3>
            <div className="problem-tags-row">
              <span className="platform-tag">{data.platform}</span>
              <span className={`diff-pill ${data.difficulty.toLowerCase()}`}>
                {data.difficulty}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="problem-collapse-btn"
          aria-label={isExpanded ? 'Collapse problem' : 'Expand problem'}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </header>

      {/* Expandable Problem Body */}
      {isExpanded && (
        <div className="dsa-problem-body">
          {/* Summary */}
          <p className="problem-lead-summary">{data.summary}</p>

          {/* Analogy & Intuition Callout */}
          {data.analogyContent && (
            <div className="problem-analogy-box">
              <div className="analogy-box-header">
                <Lightbulb size={16} color="var(--primary-action)" />
                <strong>{data.analogyTitle || 'Intuition & Analogy'}</strong>
              </div>
              <div className="analogy-box-content">{data.analogyContent}</div>
            </div>
          )}

          {/* Step-by-Step Logic */}
          <div className="problem-steps-section">
            <h4 className="sub-section-heading">Step-by-Step Algorithmic Logic</h4>
            <div className="logic-steps-list">
              {data.steps.map(step => (
                <div key={step.number} className="logic-step-item">
                  <div className="logic-step-num-pill">{step.number}</div>
                  <div className="logic-step-details">
                    <div className="step-title-row">
                      <strong className="step-title-name">{step.title}</strong>
                      {step.badge && <span className="step-tag-pill">{step.badge}</span>}
                    </div>
                    <p className="step-desc-text">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dry Run Trace Table */}
          {data.dryRunRows && data.dryRunHeaders && (
            <div className="problem-dryrun-section">
              <h4 className="sub-section-heading">
                {data.dryRunTitle || 'Dry-Run Trace & Decision Execution'}
              </h4>
              <div className="table-responsive-wrapper">
                <table className="dsa-styled-table">
                  <thead>
                    <tr>
                      {data.dryRunHeaders.map((head, hIdx) => (
                        <th key={hIdx}>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.dryRunRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Java Implementation */}
          <div className="problem-code-section">
            <h4 className="sub-section-heading">Production Java Implementation</h4>
            <CodeBlock
              code={data.javaCode}
              language="java"
              title={`${data.title} - Solution`}
            />
          </div>

          {/* Complexity Breakdown */}
          <div className="problem-complexity-section">
            <h4 className="sub-section-heading">Complexity Analysis</h4>
            <ComplexityCard
              timeComplexity={data.timeComplexity}
              spaceComplexity={data.spaceComplexity}
              timeExplanation={data.timeExplanation}
              spaceExplanation={data.spaceExplanation}
            />
          </div>

          {/* Common Placement Traps */}
          {data.interviewTrap && (
            <div className="callout-block warning" style={{ marginTop: '1.2rem' }}>
              <div className="callout-card-title">⚠️ Placement OA Trap to Avoid</div>
              <p>{data.interviewTrap}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

