import React from 'react';
import {
  Check,
  Clock,
  Code2,
  FileText,
  Sliders,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Zap,
  Target,
  ListTree
} from 'lucide-react';

interface DSAHeaderProps {
  title: string;
  category: string;
  difficulty: string;
  estimatedTime?: string;
  problemCount?: number;
  summary?: string;
  sourceFile?: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  expandAll: boolean;
  onToggleExpandAll: () => void;
  onOpenTOC?: () => void;
}

export const DSAHeader: React.FC<DSAHeaderProps> = ({
  title,
  category,
  difficulty,
  estimatedTime = '45 mins',
  problemCount = 4,
  summary,
  sourceFile = 'docs/dsa/greedy-algorithms.md',
  isCompleted,
  onToggleComplete,
  expandAll,
  onToggleExpandAll,
  onOpenTOC
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="dsa-page-header">
      {/* Top Meta Bar */}
      <div className="dsa-meta-bar">
        <div className="dsa-meta-left">
          <span className="topic-status-pill ready">
            <Check size={12} /> Notes Verified &bull; Interactive Ready
          </span>
          <span className="dsa-category-tag">{category}</span>
          <span className={`dsa-difficulty-tag ${difficulty.toLowerCase()}`}>
            {difficulty} Level
          </span>
          <span className="lesson-source-tag">Source: {sourceFile}</span>
        </div>

        <div className="dsa-meta-right">
          <label className="dsa-complete-toggle-label">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={onToggleComplete}
              className="dsa-complete-checkbox"
            />
            <span>{isCompleted ? 'Topic Completed ✓' : 'Mark as Completed'}</span>
          </label>
        </div>
      </div>

      {/* Main Headline & Summary */}
      <h1 className="dsa-title">{title}</h1>
      {summary && <p className="dsa-summary">{summary}</p>}

      {/* Statistics & Quick Specs Bar */}
      <div className="dsa-specs-bar">
        <div className="spec-item">
          <Clock size={15} color="var(--primary-action)" />
          <span>Estimated Time: <strong>{estimatedTime}</strong></span>
        </div>
        <div className="spec-separator">&bull;</div>
        <div className="spec-item">
          <Code2 size={15} color="var(--primary-action)" />
          <span>Problems Covered: <strong>{problemCount} Placement Problems</strong></span>
        </div>
        <div className="spec-separator">&bull;</div>
        <div className="spec-item">
          <Zap size={15} color="var(--secondary-accent)" />
          <span>Languages: <strong>Java (Primary) &bull; Clean Invariants</strong></span>
        </div>
      </div>

      {/* Fast Section Jump Bar & Expand Toggle */}
      <div className="dsa-quick-jump-bar">
        <div className="jump-links-group">
          {onOpenTOC && (
            <button
              type="button"
              className="dsa-jump-btn toc-trigger-btn"
              onClick={onOpenTOC}
              title="Open Table of Contents Drawer"
            >
              <ListTree size={13} color="var(--primary-action)" />
              <span>Contents</span>
            </button>
          )}
          <button
            type="button"
            className="dsa-jump-btn"
            onClick={() => scrollTo('core-intuition')}
          >
            💡 Intuition
          </button>
          <button
            type="button"
            className="dsa-jump-btn"
            onClick={() => scrollTo('problem-lemonade-change')}
          >
            🍋 Lemonade Change
          </button>
          <button
            type="button"
            className="dsa-jump-btn"
            onClick={() => scrollTo('problem-assign-cookies')}
          >
            🍪 Assign Cookies
          </button>
          <button
            type="button"
            className="dsa-jump-btn"
            onClick={() => scrollTo('problem-jump-game')}
          >
            🏃 Jump Game
          </button>
          <button
            type="button"
            className="dsa-jump-btn"
            onClick={() => scrollTo('problem-fractional-knapsack')}
          >
            🎒 Knapsack
          </button>
          <button
            type="button"
            className="dsa-jump-btn highlight"
            onClick={() => scrollTo('interactive-visualizer')}
          >
            🧪 Live Visualizer
          </button>
          <button
            type="button"
            className="dsa-jump-btn"
            onClick={() => scrollTo('revision-panel')}
          >
            🎯 Interview Strategy
          </button>
        </div>

        <button
          type="button"
          className="dsa-expand-toggle-btn"
          onClick={onToggleExpandAll}
          title="Collapse or expand all problem drawers"
        >
          {expandAll ? (
            <>
              <ChevronUp size={14} /> Collapse Solutions
            </>
          ) : (
            <>
              <ChevronDown size={14} /> Expand All Solutions
            </>
          )}
        </button>
      </div>
    </div>
  );
};
