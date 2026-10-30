import React, { useState, useMemo } from 'react';
import { ratioData } from '../data/ratioContent';
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
  Sliders,
  Scale
} from 'lucide-react';

interface RatioViewProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export const RatioView: React.FC<RatioViewProps> = ({
  isCompleted,
  onToggleComplete
}) => {
  const [expandAll, setExpandAll] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');
  const [activeFormulaCat, setActiveFormulaCat] = useState('All');

  // Interactive Ratio Combiner State
  const [aTerm, setATerm] = useState('2');
  const [b1Term, setB1Term] = useState('3');
  const [b2Term, setB2Term] = useState('4');
  const [cTerm, setCTerm] = useState('5');
  const [totalSplitAmount, setTotalSplitAmount] = useState('98');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Ratio calculation
  const ratioResult = useMemo(() => {
    const a = parseFloat(aTerm);
    const b1 = parseFloat(b1Term);
    const b2 = parseFloat(b2Term);
    const c = parseFloat(cTerm);
    const tot = parseFloat(totalSplitAmount);

    if (isNaN(a) || isNaN(b1) || isNaN(b2) || isNaN(c) || a <= 0 || b1 <= 0 || b2 <= 0 || c <= 0) {
      return null;
    }

    // Grid method calculation
    const rawA = a * b2;
    const rawB = b1 * b2;
    const rawC = b1 * c;

    // GCD of raw values
    const g = gcd(Math.round(rawA), gcd(Math.round(rawB), Math.round(rawC)));
    const simA = rawA / g;
    const simB = rawB / g;
    const simC = rawC / g;

    const totalUnits = simA + simB + simC;
    let splitMath = '';

    if (!isNaN(tot) && tot > 0) {
      const unitValue = tot / totalUnits;
      const shareA = (simA * unitValue).toFixed(2);
      const shareB = (simB * unitValue).toFixed(2);
      const shareC = (simC * unitValue).toFixed(2);

      splitMath = `\\\\\\text{Dividing Total Amount } ${tot}:\\\\`;
      splitMath += `\\text{Total Units} = ${simA} + ${simB} + ${simC} = ${totalUnits}\\text{ units}\\\\`;
      splitMath += `1\\text{ unit} = \\frac{${tot}}{${totalUnits}} = ${unitValue.toFixed(2)}\\\\`;
      splitMath += `A = ${shareA},\\quad B = ${shareB},\\quad C = ${shareC}`;
    }

    const formulaMath = `A:B = ${a}:${b1},\\quad B:C = ${b2}:${c}\\\\` +
      `\\text{Raw Product: } (${a}\\times${b2}) : (${b1}\\times${b2}) : (${b1}\\times${c}) = ${rawA} : ${rawB} : ${rawC}\\\\` +
      `\\boxed{A : B : C = ${simA} : ${simB} : ${simC}}` + splitMath;

    return {
      combinedRatio: `${simA} : ${simB} : ${simC}`,
      raw: `${rawA} : ${rawB} : ${rawC}`,
      math: formulaMath
    };
  }, [aTerm, b1Term, b2Term, cTerm, totalSplitAmount]);

  // Quiz calculations
  const currentQ = ratioData.quizQuestions[quizIndex];
  const selectedAnswer = userAnswers[currentQ?.id];

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswer !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const score = useMemo(() => {
    let s = 0;
    ratioData.quizQuestions.forEach(q => {
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
    if (!topicSearch.trim()) return ratioData.modules;
    const q = topicSearch.toLowerCase();
    return ratioData.modules.filter(m => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchConcepts = m.concepts.some(c => c.toLowerCase().includes(q));
      const matchExamples = m.examples.some(e => e.question.toLowerCase().includes(q) || e.title.toLowerCase().includes(q));
      return matchTitle || matchConcepts || matchExamples;
    });
  }, [topicSearch]);

  const filteredFormulas = useMemo(() => {
    if (activeFormulaCat === 'All') return ratioData.formulaSheet;
    return ratioData.formulaSheet.filter(f => f.category === activeFormulaCat);
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
            <span className="lesson-source-tag">Source: Aptitude/Numarical/Ratio&Proportion+Mixtures&Partnership.md</span>
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
          {ratioData.title}
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)' }}>
          {ratioData.subtitle}
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

          <a href="#ratio-combiner" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>⚡ Ratio Combiner</span>
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
            placeholder="Search concepts, proportions, mixtures..."
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

      {/* Interactive Tool: Ratio Combiner & Amount Scaler */}
      <section id="ratio-combiner" className="unit-converter-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Scale size={20} color="var(--primary-action)" />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
            Interactive Ratio Combiner & Unit Scaler
          </h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Combine two ratios (A:B and B:C) via the Grid Duplication method and optionally distribute a total amount across the resulting parts.
        </p>

        <div className="converter-controls-row">
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Ratio A : B:
            </label>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <input
                type="number"
                value={aTerm}
                onChange={e => setATerm(e.target.value)}
                className="converter-input-field"
                style={{ width: '65px' }}
                placeholder="A"
              />
              <span style={{ alignSelf: 'center', fontWeight: 700 }}>:</span>
              <input
                type="number"
                value={b1Term}
                onChange={e => setB1Term(e.target.value)}
                className="converter-input-field"
                style={{ width: '65px' }}
                placeholder="B"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Ratio B : C:
            </label>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <input
                type="number"
                value={b2Term}
                onChange={e => setB2Term(e.target.value)}
                className="converter-input-field"
                style={{ width: '65px' }}
                placeholder="B"
              />
              <span style={{ alignSelf: 'center', fontWeight: 700 }}>:</span>
              <input
                type="number"
                value={cTerm}
                onChange={e => setCTerm(e.target.value)}
                className="converter-input-field"
                style={{ width: '65px' }}
                placeholder="C"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
              Total Amount (Optional):
            </label>
            <input
              type="number"
              value={totalSplitAmount}
              onChange={e => setTotalSplitAmount(e.target.value)}
              className="converter-input-field"
              placeholder="e.g. 98"
            />
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Combined A : B : C
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-action)' }}>
              {ratioResult ? ratioResult.combinedRatio : '---'}
            </div>
          </div>
        </div>

        {ratioResult && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-action)' }}>
              Step-by-step Grid Duplication breakdown:
            </span>
            <KaTeXMath math={ratioResult.math} block />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-subtle)' }}>Exam question presets:</span>
          {[
            { label: 'A:B=2:3, B:C=4:5 (Ex 1)', a: '2', b1: '3', b2: '4', c: '5', tot: '98' },
            { label: 'A:B=2:3, B:C=5:8 (TCS PYQ)', a: '2', b1: '3', b2: '5', c: '8', tot: '98' },
            { label: 'A:B=3:4, B:C=8:9', a: '3', b1: '4', b2: '8', c: '9', tot: '100' }
          ].map(preset => (
            <button
              key={preset.label}
              type="button"
              className="speed-chip-btn"
              onClick={() => {
                setATerm(preset.a);
                setB1Term(preset.b1);
                setB2Term(preset.b2);
                setCTerm(preset.c);
                setTotalSplitAmount(preset.tot);
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
              Master Formula & Shortcut Sheet
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Instant memory cheat-sheet for Ratios, Proportions, Mixtures, Partnerships, and Ages.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="formula-cat-tabs">
            {['All', 'Fundamentals', 'Combinations', 'Division', 'Proportions', 'Coins', 'Partnership', 'Ages', 'Mixtures'].map(cat => (
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
              Active Retrieval: Question {quizIndex + 1} of {ratioData.quizQuestions.length}
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
                    if (quizIndex < ratioData.quizQuestions.length - 1) {
                      setQuizIndex(quizIndex + 1);
                    } else {
                      setQuizFinished(true);
                    }
                  }}
                >
                  {quizIndex === ratioData.quizQuestions.length - 1 ? 'View Results 📊' : 'Next Question →'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-action)', marginBottom: '0.5rem' }}>
              {score} / {ratioData.quizQuestions.length}
            </div>
            <h4 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {score >= 5 ? 'TCS NQT Ready! Outstanding 🏆' : score >= 3 ? 'Good Progress! Revise Invariants 📚' : 'Needs Practice! Review the Modules 💡'}
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Remember: In age and subtraction questions, equalize horizontal differences; in mixtures, match the untouched component units!
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
            Summary of substantive checks, invariant properties, and placement techniques.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ratioData.auditItems.map((item, idx) => (
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
            Finished reviewing Ratio & Proportion, Mixtures & Partnership?
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

