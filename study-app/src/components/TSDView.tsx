import React, { useState, useMemo } from 'react';
import { tsdData } from '../data/tsdContent';
import { KaTeXMath } from './KaTeXMath';
import { CollapsibleExample } from './CollapsibleExample';
import {
  Check,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Copy,
  CheckCircle,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

interface TSDViewProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const TSDView: React.FC<TSDViewProps> = ({
  isCompleted,
  onToggleComplete
}) => {
  const [expandAll, setExpandAll] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');
  const [activeFormulaCat, setActiveFormulaCat] = useState('All');

  // Converter state
  const [convVal, setConvVal] = useState('180');
  const [convUnit, setConvUnit] = useState<'kmh' | 'ms'>('kmh');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Unit converter calculation
  const convResult = useMemo(() => {
    const val = parseFloat(convVal);
    if (isNaN(val) || val < 0) return null;

    if (convUnit === 'kmh') {
      const ms = (val * 5) / 18;
      const formatted = Number.isInteger(ms) ? ms.toString() : ms.toFixed(2);
      const isMult18 = val % 18 === 0;
      const breakdown = isMult18
        ? `${val} \\times \\frac{5}{18} = (${val} \\div 18) \\times 5 = ${val / 18} \\times 5 = ${formatted}\\text{ m/s}`
        : `${val} \\times \\frac{5}{18} = \\frac{${val * 5}}{18} \\approx ${formatted}\\text{ m/s}`;
      return {
        result: `${formatted} m/s`,
        math: breakdown
      };
    } else {
      const kmh = (val * 18) / 5;
      const formatted = Number.isInteger(kmh) ? kmh.toString() : kmh.toFixed(2);
      const isMult5 = val % 5 === 0;
      const breakdown = isMult5
        ? `${val} \\times \\frac{18}{5} = (${val} \\div 5) \\times 18 = ${val / 5} \\times 18 = ${formatted}\\text{ km/h}`
        : `${val} \\times \\frac{18}{5} = \\frac{${val * 18}}{5} \\approx ${formatted}\\text{ km/h}`;
      return {
        result: `${formatted} km/h`,
        math: breakdown
      };
    }
  }, [convVal, convUnit]);

  // Quiz calculations
  const currentQ = tsdData.quizQuestions[quizIndex];
  const selectedAnswer = userAnswers[currentQ?.id];

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswer !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const score = useMemo(() => {
    let s = 0;
    tsdData.quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) s++;
    });
    return s;
  }, [userAnswers]);

  const copyFormula = (formulaText: string, id: string) => {
    navigator.clipboard.writeText(formulaText).then(() => {
      setCopyFeedback(id);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const filteredModules = useMemo(() => {
    if (!topicSearch.trim()) return tsdData.modules;
    const q = topicSearch.toLowerCase();
    return tsdData.modules.filter(m => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchConcepts = m.concepts.some(c => c.toLowerCase().includes(q));
      const matchExamples = m.examples.some(e => e.question.toLowerCase().includes(q) || e.title.toLowerCase().includes(q));
      return matchTitle || matchConcepts || matchExamples;
    });
  }, [topicSearch]);

  const filteredFormulas = useMemo(() => {
    if (activeFormulaCat === 'All') return tsdData.formulaSheet;
    return tsdData.formulaSheet.filter(f => f.category === activeFormulaCat);
  }, [activeFormulaCat]);

  return (
    <div className="lesson-page-container">
      {/* Lesson Header */}
      <div className="lesson-page-header">
        <div className="lesson-meta-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="topic-status-pill ready">
              <Check size={12} /> Notes Available &bull; Ready to Study
            </span>
            <span className="lesson-source-tag">Source: Aptitude/Numarical/Time,Speed&Distance+Boats&Streams.md</span>
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
          {tsdData.title}
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)' }}>
          {tsdData.subtitle}
        </p>
      </div>

      {/* Lesson Navigation & Toolbar */}
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

          <a href="#unit-converter" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>⚡ Unit Converter</span>
          </a>

          <a href="#formula-sheet" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>📐 Master Formulas</span>
          </a>

          <a href="#placement-quiz" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>🎯 Placement Quiz</span>
          </a>

          <a href="#corrections-audit" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>🔍 Corrections</span>
          </a>
        </div>

        <div className="lesson-search-box">
          <Search size={14} className="lesson-search-icon" />
          <input
            type="text"
            className="lesson-search-input"
            placeholder="Search within TSD notes..."
            value={topicSearch}
            onChange={e => setTopicSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Interactive Unit Converter Tool */}
      <section id="unit-converter" className="converter-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-action)' }}>
            Interactive Unit Conversion Helper (km/h ↔ m/s)
          </h3>
          <span className="topic-status-pill ready">Step Breakdown Included</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          In placement aptitude tests, mismatched units cause over 40% of calculation errors. Visualize the arithmetic reduction below.
        </p>

        <div className="converter-controls-row">
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Value:
            </label>
            <div style={{ display: 'flex' }}>
              <input
                type="number"
                value={convVal}
                onChange={e => setConvVal(e.target.value)}
                className="converter-input-field"
                placeholder="Enter value"
              />
              <select
                value={convUnit}
                onChange={e => setConvUnit(e.target.value as any)}
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: 'none',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <option value="kmh">km/h → m/s</option>
                <option value="ms">m/s → km/h</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            className="lesson-control-btn"
            style={{ alignSelf: 'flex-end', height: '42px', padding: '0 1rem' }}
            onClick={() => setConvUnit(prev => (prev === 'kmh' ? 'ms' : 'kmh'))}
            title="Swap conversion direction"
          >
            <RotateCw size={16} />
            <span>Swap Units</span>
          </button>

          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Result
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-action)' }}>
              {convResult ? convResult.result : '---'}
            </div>
          </div>
        </div>

        {convResult && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-action)' }}>
              Step-by-step arithmetic:
            </span>
            <KaTeXMath math={convResult.math} block />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-subtle)' }}>Common exam presets:</span>
          {[18, 36, 54, 72, 90, 108, 126, 144, 180].map(val => (
            <button
              key={val}
              type="button"
              className="lesson-control-btn"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
              onClick={() => {
                setConvVal(val.toString());
                setConvUnit('kmh');
              }}
            >
              {val} km/h
            </button>
          ))}
        </div>
      </section>

      {/* Modules Loop */}
      {filteredModules.map(mod => (
        <section key={mod.id} id={mod.id} style={{ marginBottom: '2.5rem' }}>
          <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
              Module {mod.number}: {mod.title}
            </h3>
          </div>

          {/* Concepts list */}
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            {mod.concepts.map((c, idx) => (
              <li key={idx} style={{ marginBottom: '0.35rem' }}>{c}</li>
            ))}
          </ul>

          {/* Formulas */}
          {mod.formulas && mod.formulas.length > 0 && (
            <div style={{ margin: '1rem 0' }}>
              {mod.formulas.map((f, idx) => (
                <div key={idx} className="formula-item-card">
                  <div className="formula-card-title">{f.name}</div>
                  <KaTeXMath math={f.math} block />
                  {f.note && <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>{f.note}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Table if present */}
          {mod.table && (
            <div className="editorial-table-wrapper">
              <table className="editorial-table">
                <thead>
                  <tr>
                    {mod.table.headers.map((h, idx) => (
                      <th key={idx} scope="col">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mod.table.rows.map((r, rIdx) => (
                    <tr key={rIdx}>
                      <td style={{ fontWeight: 600 }}>{r[0]}</td>
                      <td style={{ fontWeight: 700, color: 'var(--primary-action)' }}>
                        <KaTeXMath math={r[1]} />
                      </td>
                      <td>{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Callout if present */}
          {mod.callout && (
            <div className={`callout-block ${mod.callout.type}`}>
              <div className="callout-header">
                {mod.callout.type === 'tip' && <span>💡</span>}
                {mod.callout.type === 'warning' && <span>⚠️</span>}
                {mod.callout.type === 'trap' && <span>🚫</span>}
                {mod.callout.type === 'info' && <span>📌</span>}
                <span>{mod.callout.title}</span>
              </div>
              <p style={{ fontSize: '0.92rem' }}>{mod.callout.content}</p>
            </div>
          )}

          {/* Worked Examples */}
          {mod.examples && mod.examples.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--primary-action)', marginBottom: '0.75rem' }}>
                Worked Solutions ({mod.examples.length})
              </h4>
              {mod.examples.map(ex => (
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

      {/* Master Formula Sheet */}
      <section id="formula-sheet" style={{ marginBottom: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            Master Formula Reference Sheet
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            All 16 core kinematics and boats & streams formulas in one place. Filter by category or copy formulas for your notes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {['All', 'Fundamentals', 'Trains', 'Relative Speed', 'Average Speed', 'Boats & Streams'].map(cat => (
            <button
              key={cat}
              type="button"
              className="lesson-control-btn"
              style={{
                backgroundColor: activeFormulaCat === cat ? 'var(--primary-action)' : 'var(--bg-card)',
                color: activeFormulaCat === cat ? 'var(--text-on-dark)' : 'var(--text-main)',
                borderColor: activeFormulaCat === cat ? 'var(--primary-action)' : 'var(--border-subtle)'
              }}
              onClick={() => setActiveFormulaCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="formulas-grid">
          {filteredFormulas.map(f => (
            <div key={f.id} className="formula-item-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span className="topic-status-pill needed">{f.category}</span>
                  <button
                    type="button"
                    className="copy-formula-icon-btn"
                    onClick={() => copyFormula(f.math, f.id)}
                    title="Copy LaTeX"
                  >
                    {copyFeedback === f.id ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--primary-action)' }}>{f.concept}</h4>
              </div>
              <KaTeXMath math={f.math} block />
            </div>
          ))}
        </div>
      </section>

      {/* Placement Quiz Simulator */}
      <section id="placement-quiz" className="quiz-module-box">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="topic-status-pill ready">Placement Quiz Simulator</span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginTop: '0.25rem' }}>
              Timed Aptitude Quiz Mode (10 Questions)
            </h3>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Question {quizIndex + 1} of {tsdData.quizQuestions.length}
          </div>
        </div>

        {!quizFinished ? (
          <div>
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-stack-gray)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
                {currentQ.topic}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {currentQ.question}
              </div>
            </div>

            <div>
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === oIdx;
                const isCorrect = oIdx === currentQ.correctIndex;
                let btnClass = 'quiz-option-button';
                if (selectedAnswer !== undefined) {
                  if (isCorrect) btnClass += ' correct';
                  else if (isSelected) btnClass += ' incorrect';
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    className={btnClass}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={selectedAnswer !== undefined}
                  >
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', border: '1px solid var(--border-subtle)' }}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== undefined && (
              <div className="quiz-explanation-box">
                <div style={{ fontWeight: 700, color: 'var(--primary-action)', marginBottom: '0.35rem' }}>
                  {selectedAnswer === currentQ.correctIndex ? '✓ Correct Answer!' : '✗ Incorrect choice.'} Explanation:
                </div>
                <p style={{ fontSize: '0.92rem' }}>{currentQ.explanation}</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              {selectedAnswer !== undefined && (
                <button
                  type="button"
                  className="add-notes-btn"
                  onClick={() => {
                    if (quizIndex < tsdData.quizQuestions.length - 1) {
                      setQuizIndex(quizIndex + 1);
                    } else {
                      setQuizFinished(true);
                    }
                  }}
                >
                  {quizIndex === tsdData.quizQuestions.length - 1 ? 'View Results 📊' : 'Next Question →'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-action)', marginBottom: '0.5rem' }}>
              {score} / {tsdData.quizQuestions.length}
            </div>
            <h4 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {score >= 8 ? 'TCS NQT Ready! Outstanding 🏆' : score >= 5 ? 'Good Progress! Revise the Traps 📚' : 'Needs Practice! Work through the Modules 💡'}
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Review the logical differential shortcut and the harmonic average speed rule to maximize your placement score.
            </p>
            <button
              type="button"
              className="add-notes-btn"
              onClick={() => {
                setUserAnswers({});
                setQuizIndex(0);
                setQuizFinished(false);
              }}
            >
              Retake Quiz 🔄
            </button>
          </div>
        )}
      </section>

      {/* Corrections Made & Audit Section */}
      <section id="corrections-audit" style={{ marginBottom: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            Corrections Made & Mathematical Audit
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Summary of substantive checks and boundary clarifications applied to the source notes.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tsdData.auditItems.map((item, idx) => (
            <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-key-lime-pie)' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-action)', marginBottom: '0.25rem' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.88rem' }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completion Footer */}
      <div className="lesson-completion-footer">
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            Finished reviewing Speed, Time & Distance?
          </h4>
          <p style={{ fontSize: '0.85rem' }}>
            Mark this topic as complete to track your overall syllabus progress.
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
