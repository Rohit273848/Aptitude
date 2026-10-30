import React, { useState, useMemo } from 'react';
import { percentagesData } from '../data/percentagesContent';
import { KaTeXMath } from './KaTeXMath';
import { CollapsibleExample } from './CollapsibleExample';
import { Check, Copy, Search, ChevronDown, ChevronUp, Zap, CheckCircle } from 'lucide-react';

interface PercentageViewProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const PercentageView: React.FC<PercentageViewProps> = ({
  isCompleted,
  onToggleComplete
}) => {
  const [expandAll, setExpandAll] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');
  const [selectedCalcVal, setSelectedCalcVal] = useState('20');
  const [selectedCalcBase, setSelectedCalcBase] = useState('750');

  // Interactive mental calculation trick calculator
  const mentalResult = useMemo(() => {
    const p = parseFloat(selectedCalcVal);
    const b = parseFloat(selectedCalcBase);
    if (isNaN(p) || isNaN(b)) return null;
    return (p / 100) * b;
  }, [selectedCalcVal, selectedCalcBase]);

  const filteredSections = useMemo(() => {
    if (!topicSearch.trim()) return percentagesData.sections;
    const q = topicSearch.toLowerCase();
    return percentagesData.sections.filter(sec => {
      const matchTitle = sec.title.toLowerCase().includes(q);
      const matchFormulas = sec.formulas.some(f => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q));
      const matchExamples = sec.examples.some(e => e.question.toLowerCase().includes(q) || e.title.toLowerCase().includes(q));
      return matchTitle || matchFormulas || matchExamples;
    });
  }, [topicSearch]);

  return (
    <div className="lesson-page-container">
      {/* Lesson Header */}
      <div className="lesson-page-header">
        <div className="lesson-meta-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="topic-status-pill ready">
              <Check size={12} /> Notes Available &bull; Ready to Study
            </span>
            <span className="lesson-source-tag">Source: Aptitude/Numarical/Percentage.md</span>
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={onToggleComplete}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-action)', cursor: 'pointer' }}
            />
            <span>{isCompleted ? 'Marked as Completed ✓' : 'Mark as Completed'}</span>
          </label>
        </div>

        <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
          {percentagesData.title}
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)' }}>
          {percentagesData.subtitle}
        </p>
      </div>

      {/* Lesson Navigation & View Controls Bar */}
      <div className="lesson-controls-bar">
        <div className="lesson-controls-group">
          <button
            type="button"
            className="lesson-control-btn"
            onClick={() => setExpandAll(prev => !prev)}
          >
            {expandAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span>{expandAll ? 'Collapse Solutions' : 'Expand Solutions'}</span>
          </button>

          <a href="#fraction-table" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>📊 Fraction Shortcuts</span>
          </a>

          <a href="#mental-tricks" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>⚡ Mental Math Tricks</span>
          </a>
        </div>

        <div className="lesson-search-box">
          <Search size={14} className="lesson-search-icon" />
          <input
            type="text"
            className="lesson-search-input"
            placeholder="Search within Percentages..."
            value={topicSearch}
            onChange={e => setTopicSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Notation Callout */}
      <div className="callout-block info">
        <div className="callout-header">
          <span>📌</span><span>Notation Rule</span>
        </div>
        <p style={{ fontSize: '0.92rem' }}>
          {percentagesData.notationNote}
        </p>
      </div>

      {/* Sections Loop */}
      {filteredSections.map(sec => (
        <section key={sec.id} id={sec.id} style={{ marginBottom: '2.5rem' }}>
          <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
              {sec.number}. {sec.title}
            </h3>
            {sec.description && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {sec.description}
              </p>
            )}
          </div>

          {/* Formulas */}
          <div className="formulas-grid">
            {sec.formulas.map(f => (
              <div key={f.id} className="formula-item-card">
                <div className="formula-card-title">
                  <span>{f.name}</span>
                </div>
                <KaTeXMath math={f.formula} block />
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          {/* Worked Examples */}
          {sec.examples.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--primary-action)', marginBottom: '0.75rem' }}>
                Worked Examples ({sec.examples.length})
              </h4>
              {sec.examples.map(ex => (
                <CollapsibleExample
                  key={ex.id}
                  id={ex.id}
                  title={ex.title}
                  question={ex.question}
                  steps={ex.steps}
                  finalAnswer={ex.finalAnswer}
                  isExpanded={expandAll}
                />
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Section 7: Fraction-to-percentage table */}
      <section id="fraction-table" style={{ marginBottom: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            7. Fraction-to-Percentage Shortcuts Table
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Memorize these common conversions. They save valuable seconds in campus placement tests when answer options are close.
          </p>
        </div>

        <div className="editorial-table-wrapper">
          <table className="editorial-table">
            <thead>
              <tr>
                <th scope="col">Fraction</th>
                <th scope="col">Percentage Equivalent</th>
                <th scope="col">Decimal Equivalent</th>
              </tr>
            </thead>
            <tbody>
              {percentagesData.fractionsTable.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>
                    <KaTeXMath math={row.fraction} />
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--primary-action)' }}>
                    <KaTeXMath math={row.percentage} />
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {row.decimal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mental Math Tricks */}
      <section id="mental-tricks" style={{ marginBottom: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            Fast Mental Calculation Tricks
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Core mental arithmetic rules to bypass pen-and-paper calculation during aptitude rounds.
          </p>
        </div>

        <div className="mental-tricks-grid">
          {percentagesData.mentalTricks.map((trick, idx) => (
            <div key={idx} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <Zap size={16} color="var(--color-key-lime-pie)" />
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-action)' }}>{trick.trick}</h4>
              </div>
              <p style={{ fontSize: '0.88rem', marginBottom: '0.4rem' }}>{trick.method}</p>
              <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', backgroundColor: 'var(--bg-surface)', padding: '0.35rem 0.55rem', borderRadius: 'var(--radius-sm)' }}>
                {trick.example}
              </div>
            </div>
          ))}
        </div>

        {/* Live Symmetry Calculator */}
        <div className="converter-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🧮</span>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-action)' }}>
              Interactive Trick Tester: x% of y = y% of x
            </h4>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Try calculating <strong>16% of 25</strong>: swapping it to <strong>25% of 16</strong> instantly yields $16 \div 4 = 4$.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>x (%):</label>
              <input
                type="number"
                value={selectedCalcVal}
                onChange={e => setSelectedCalcVal(e.target.value)}
                style={{ width: '80px', padding: '0.4rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
            <span>of</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>y:</label>
              <input
                type="number"
                value={selectedCalcBase}
                onChange={e => setSelectedCalcBase(e.target.value)}
                style={{ width: '100px', padding: '0.4rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>

            <div style={{ padding: '0.4rem 1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, color: 'var(--primary-action)' }}>
              = {mentalResult !== null ? mentalResult : '...'}
            </div>
          </div>
        </div>
      </section>

      {/* Completion Footer */}
      <div className="lesson-completion-footer">
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            Finished reviewing Percentages?
          </h4>
          <p style={{ fontSize: '0.85rem' }}>
            Mark this topic as complete to track your overall TCS NQT study readiness.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleComplete}
          className="add-notes-btn"
          style={{
            backgroundColor: isCompleted ? 'var(--color-key-lime-pie)' : 'var(--primary-action)',
            color: isCompleted ? 'var(--color-black)' : 'var(--text-on-dark)'
          }}
        >
          <CheckCircle size={18} />
          <span>{isCompleted ? 'Topic Completed ✓' : 'Mark Topic as Completed'}</span>
        </button>
      </div>
    </div>
  );
};
