import React, { useState, useMemo } from 'react';
import { timeWorkData } from '../data/timeWorkContent';
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
  Calculator
} from 'lucide-react';

interface TimeWorkViewProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

// Utility GCD and LCM functions
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export const TimeWorkView: React.FC<TimeWorkViewProps> = ({
  isCompleted,
  onToggleComplete
}) => {
  const [expandAll, setExpandAll] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');
  const [activeFormulaCat, setActiveFormulaCat] = useState('All');

  // Interactive Efficiency Calculator State
  const [workerADays, setWorkerADays] = useState('12');
  const [workerBDays, setWorkerBDays] = useState('18');
  const [workerCDays, setWorkerCDays] = useState('');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Efficiency Calculator computation
  const calcResult = useMemo(() => {
    const da = parseFloat(workerADays);
    const db = parseFloat(workerBDays);
    const dc = workerCDays.trim() ? parseFloat(workerCDays) : null;

    if (isNaN(da) || da <= 0 || isNaN(db) || db <= 0) return null;
    if (dc !== null && (isNaN(dc) || dc <= 0)) return null;

    // Compute LCM
    let totalWork = lcm(Math.round(da), Math.round(db));
    if (dc !== null) {
      totalWork = lcm(totalWork, Math.round(dc));
    }

    const etaA = totalWork / da;
    const etaB = totalWork / db;
    const etaC = dc !== null ? totalWork / dc : 0;
    const sumEta = etaA + etaB + etaC;
    const totalTime = totalWork / sumEta;

    const timeFormatted = Number.isInteger(totalTime) ? totalTime.toString() : totalTime.toFixed(2);

    let formulaStep = `W = \\text{LCM}(${da}, ${db}${dc !== null ? ', ' + dc : ''}) = ${totalWork}\\text{ units}\\\\`;
    formulaStep += `\\eta_A = \\frac{${totalWork}}{${da}} = ${etaA.toFixed(2)}\\text{ u/d},\\quad `;
    formulaStep += `\\eta_B = \\frac{${totalWork}}{${db}} = ${etaB.toFixed(2)}\\text{ u/d}`;
    if (dc !== null) {
      formulaStep += `,\\quad \\eta_C = \\frac{${totalWork}}{${dc}} = ${etaC.toFixed(2)}\\text{ u/d}`;
    }
    formulaStep += `\\\\\\sum \\eta = ${sumEta.toFixed(2)}\\text{ u/d} \\implies T = \\frac{${totalWork}}{${sumEta.toFixed(2)}} \\approx ${timeFormatted}\\text{ days}`;

    return {
      totalWork,
      etaA: etaA.toFixed(2),
      etaB: etaB.toFixed(2),
      etaC: dc !== null ? etaC.toFixed(2) : null,
      totalTime: timeFormatted,
      math: formulaStep
    };
  }, [workerADays, workerBDays, workerCDays]);

  // Quiz calculations
  const currentQ = timeWorkData.quizQuestions[quizIndex];
  const selectedAnswer = userAnswers[currentQ?.id];

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswer !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const score = useMemo(() => {
    let s = 0;
    timeWorkData.quizQuestions.forEach(q => {
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
    if (!topicSearch.trim()) return timeWorkData.modules;
    const q = topicSearch.toLowerCase();
    return timeWorkData.modules.filter(m => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchConcepts = m.concepts.some(c => c.toLowerCase().includes(q));
      const matchExamples = m.examples.some(e => e.question.toLowerCase().includes(q) || e.title.toLowerCase().includes(q));
      return matchTitle || matchConcepts || matchExamples;
    });
  }, [topicSearch]);

  const filteredFormulas = useMemo(() => {
    if (activeFormulaCat === 'All') return timeWorkData.formulaSheet;
    return timeWorkData.formulaSheet.filter(f => f.category === activeFormulaCat);
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
            <span className="lesson-source-tag">Source: Aptitude/Numarical/Time&Work+Pipes&Cisterns+LCM&HCF.md</span>
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
          {timeWorkData.title}
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)' }}>
          {timeWorkData.subtitle}
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

          <a href="#work-calculator" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>⚡ Efficiency Calculator</span>
          </a>

          <a href="#formula-sheet" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>📐 Master Formulas</span>
          </a>

          <a href="#quiz-checkpoint" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>🎯 Placement Quiz</span>
          </a>
        </div>

        {/* In-Lesson Search */}
        <div className="lesson-search-box">
          <Search size={15} color="var(--color-stack-gray)" />
          <input
            type="text"
            placeholder="Search concepts or examples in this lesson..."
            value={topicSearch}
            onChange={e => setTopicSearch(e.target.value)}
          />
          {topicSearch && (
            <button
              type="button"
              onClick={() => setTopicSearch('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Interactive Tool: Work & Efficiency Calculator */}
      <section id="work-calculator" className="unit-converter-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Calculator size={20} color="var(--primary-action)" />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
            Interactive Time & Work Efficiency Calculator
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Input the completion days for workers to instantly calculate Total Work (LCM), individual efficiencies, and combined time.
        </p>

        <div className="converter-controls-row">
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Worker A (Days):
            </label>
            <input
              type="number"
              value={workerADays}
              onChange={e => setWorkerADays(e.target.value)}
              className="converter-input-field"
              placeholder="e.g. 12"
              min="1"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Worker B (Days):
            </label>
            <input
              type="number"
              value={workerBDays}
              onChange={e => setWorkerBDays(e.target.value)}
              className="converter-input-field"
              placeholder="e.g. 18"
              min="1"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Worker C (Optional):
            </label>
            <input
              type="number"
              value={workerCDays}
              onChange={e => setWorkerCDays(e.target.value)}
              className="converter-input-field"
              placeholder="e.g. 20 (optional)"
              min="1"
            />
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Combined Time
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-action)' }}>
              {calcResult ? `${calcResult.totalTime} days` : '---'}
            </div>
          </div>
        </div>

        {calcResult && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-action)' }}>
              Step-by-step LCM & Efficiency breakdown:
            </span>
            <KaTeXMath math={calcResult.math} block />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-subtle)' }}>Standard video presets:</span>
          {[
            { label: 'A=12, B=18', a: '12', b: '18', c: '' },
            { label: 'A=10, B=15, C=20', a: '10', b: '15', c: '20' },
            { label: 'A=20, B=30', a: '20', b: '30', c: '' },
            { label: 'A=12, B=18 (Pipes)', a: '12', b: '18', c: '' }
          ].map(preset => (
            <button
              key={preset.label}
              type="button"
              className="speed-chip-btn"
              onClick={() => {
                setWorkerADays(preset.a);
                setWorkerBDays(preset.b);
                setWorkerCDays(preset.c);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {/* Modules List */}
      <div className="lesson-modules-flow">
        {filteredModules.map(mod => (
          <div key={mod.id} className="lesson-module-card">
            <div className="module-card-header">
              <span className="module-badge">Module {mod.number}</span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>
                {mod.title}
              </h3>
            </div>

            {/* Core Concepts */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                Key Theoretical Rules
              </h4>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {mod.concepts.map((concept, cIdx) => (
                  <li key={cIdx} style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {concept}
                  </li>
                ))}
              </ul>
            </div>

            {/* Callout Box if present */}
            {mod.callout && (
              <div className={`module-callout-box ${mod.callout.type}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <HelpCircle size={16} />
                  <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{mod.callout.title}</span>
                </div>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>{mod.callout.content}</p>
              </div>
            )}

            {/* Formulas Box */}
            {mod.formulas && mod.formulas.length > 0 && (
              <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--primary-action)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Mathematical Relationships
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {mod.formulas.map((f, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{f.name}:</span>
                      <KaTeXMath math={f.math} block />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Worked Examples */}
            <div>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                Worked Exam Scenarios ({mod.examples.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {mod.examples.map(ex => (
                  <CollapsibleExample
                    key={ex.id}
                    title={ex.title}
                    question={ex.question}
                    steps={ex.steps}
                    finalAnswer={ex.finalAnswer}
                    forceOpen={expandAll}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Master Formula Sheet */}
      <section id="formula-sheet" className="formula-sheet-container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              Master Formula & Concept Sheet
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Instant memory cheat-sheet for Time & Work, Pipes & Cisterns, and LCM/HCF.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="formula-cat-tabs">
            {['All', 'Fundamentals', 'Fractional Work', 'Worker Leaving', 'Pipes & Cisterns', 'Number Theory', 'Ratios', 'Simultaneous Events'].map(cat => (
              <button
                key={cat}
                type="button"
                className={`formula-cat-pill ${activeFormulaCat === cat ? 'active' : ''}`}
                onClick={() => setActiveFormulaCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="formula-grid">
          {filteredFormulas.map(item => (
            <div key={item.id} className="formula-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="formula-tag">{item.category}</span>
                <button
                  type="button"
                  className="formula-copy-btn"
                  onClick={() => copyFormula(item.math, item.id)}
                  title="Copy formula LaTeX"
                >
                  {copyFeedback === item.id ? <Check size={14} color="var(--primary-action)" /> : <Copy size={14} />}
                  <span>{copyFeedback === item.id ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                {item.concept}
              </h4>
              <div style={{ overflowX: 'auto', padding: '0.25rem 0' }}>
                <KaTeXMath math={item.math} block />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Placement Quiz Simulator */}
      <section id="quiz-checkpoint" className="quiz-simulator-card" style={{ marginTop: '2.5rem' }}>
        <div className="quiz-header-bar">
          <div>
            <span className="topic-status-pill ready">Placement Practice Simulator</span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginTop: '0.3rem' }}>
              Active Retrieval: Question {quizIndex + 1} of {timeWorkData.quizQuestions.length}
            </h3>
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-action)' }}>
            Score: {score} / {quizIndex + (selectedAnswer !== undefined ? 1 : 0)}
          </div>
        </div>

        {!quizFinished ? (
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-stack-gray)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Topic: {currentQ.topic}
            </div>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              {currentQ.question}
            </p>

            <div className="quiz-options-list">
              {currentQ.options.map((opt, oIdx) => {
                let btnClass = 'quiz-option-btn';
                const isSelected = selectedAnswer === oIdx;
                const isCorrect = oIdx === currentQ.correctIndex;

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
                    if (quizIndex < timeWorkData.quizQuestions.length - 1) {
                      setQuizIndex(quizIndex + 1);
                    } else {
                      setQuizFinished(true);
                    }
                  }}
                >
                  {quizIndex === timeWorkData.quizQuestions.length - 1 ? 'View Results 📊' : 'Next Question →'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-action)', marginBottom: '0.5rem' }}>
              {score} / {timeWorkData.quizQuestions.length}
            </div>
            <h4 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {score >= 5 ? 'TCS NQT Ready! Outstanding 🏆' : score >= 3 ? 'Good Progress! Revise the Traps 📚' : 'Needs Practice! Review the Modules 💡'}
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Remember: Always equalize decimal places for decimal LCM, and isolate the continuous worker first in leaving problems!
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
      <section id="corrections-audit" style={{ marginBottom: '2.5rem', marginTop: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            Mathematical Audit & Exam Insights
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Summary of substantive checks, boundary clarifications, and placement techniques.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {timeWorkData.auditItems.map((item, idx) => (
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
            Finished reviewing Time & Work, Pipes & Cisterns, LCM & HCF?
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

