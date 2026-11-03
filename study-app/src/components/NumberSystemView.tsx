import React, { useState, useMemo } from 'react';
import { numberSystemData } from '../data/numberSystemContent';
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
  CheckCircle2,
  HelpCircle,
  Calculator,
  Sparkles,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  XCircle,
  Info,
  Scale,
  Hash
} from 'lucide-react';

interface NumberSystemViewProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

// Math helpers
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

function getPrimeFactors(n: number): { [prime: number]: number } {
  const factors: { [prime: number]: number } = {};
  let d = 2;
  let temp = Math.abs(n);
  while (d * d <= temp) {
    while (temp % d === 0) {
      factors[d] = (factors[d] || 0) + 1;
      temp /= d;
    }
    d++;
  }
  if (temp > 1) {
    factors[temp] = (factors[temp] || 0) + 1;
  }
  return factors;
}

function factorsToString(factors: { [prime: number]: number }): string {
  const keys = Object.keys(factors).map(Number).sort((a, b) => a - b);
  if (keys.length === 0) return '1';
  return keys.map(p => factors[p] > 1 ? `${p}^{${factors[p]}}` : `${p}`).join(' \\times ');
}

export const NumberSystemView: React.FC<NumberSystemViewProps> = ({
  isCompleted,
  onToggleComplete
}) => {
  // Search and filter
  const [topicSearch, setTopicSearch] = useState('');
  const [activeFormulaCat, setActiveFormulaCat] = useState('All');
  const [expandAll, setExpandAll] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Interactive Calculator State
  const [num1, setNum1] = useState('24');
  const [num2, setNum2] = useState('45');
  const [num3, setNum3] = useState('');

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});

  // Interactive Calculation
  const calcResult = useMemo(() => {
    const a = parseInt(num1, 10);
    const b = parseInt(num2, 10);
    const c = num3.trim() ? parseInt(num3, 10) : null;

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      return null;
    }

    if (c !== null && (!isNaN(c) && c > 0)) {
      const g1 = gcd(a, b);
      const gAll = gcd(g1, c);
      const l1 = lcm(a, b);
      const lAll = lcm(l1, c);

      const fA = getPrimeFactors(a);
      const fB = getPrimeFactors(b);
      const fC = getPrimeFactors(c);

      const math = `\\begin{aligned}
        ${a} &= ${factorsToString(fA)}\\\\[4pt]
        ${b} &= ${factorsToString(fB)}\\\\[4pt]
        ${c} &= ${factorsToString(fC)}\\\\[6pt]
        \\text{HCF}(${a}, ${b}, ${c}) &= \\mathbf{${gAll}}\\\\[4pt]
        \\text{LCM}(${a}, ${b}, ${c}) &= \\mathbf{${lAll}}
      \\end{aligned}`;

      return { hcf: gAll, lcm: lAll, math, isThree: true };
    } else {
      const g = gcd(a, b);
      const l = lcm(a, b);
      const prod = a * b;
      const fA = getPrimeFactors(a);
      const fB = getPrimeFactors(b);

      const math = `\\begin{aligned}
        ${a} &= ${factorsToString(fA)}\\\\[4pt]
        ${b} &= ${factorsToString(fB)}\\\\[6pt]
        \\text{HCF}(${a}, ${b}) &= \\mathbf{${g}}\\\\[4pt]
        \\text{LCM}(${a}, ${b}) &= \\mathbf{${l}}\\\\[6pt]
        \\text{Verification: } A \\times B &= ${a} \\times ${b} = ${prod}\\\\[4pt]
        \\text{LCM} \\times \\text{HCF} &= ${l} \\times ${g} = ${l * g} \\quad (\\checkmark)
      \\end{aligned}`;

      return { hcf: g, lcm: l, math, isThree: false };
    }
  }, [num1, num2, num3]);

  // Quiz calculations
  const currentQ = numberSystemData.quizQuestions[quizIndex];
  const selectedAnswer = userAnswers[currentQ?.id];

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswer !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const score = useMemo(() => {
    let s = 0;
    numberSystemData.quizQuestions.forEach(q => {
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
    if (!topicSearch.trim()) return numberSystemData.modules;
    const q = topicSearch.toLowerCase();
    return numberSystemData.modules.filter(m => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchConcepts = m.concepts.some(c => c.toLowerCase().includes(q));
      const matchExamples = m.examples.some(e => e.question.toLowerCase().includes(q) || e.title.toLowerCase().includes(q));
      return matchTitle || matchConcepts || matchExamples;
    });
  }, [topicSearch]);

  const filteredFormulas = useMemo(() => {
    if (activeFormulaCat === 'All') return numberSystemData.formulaSheet;
    return numberSystemData.formulaSheet.filter(f => f.category === activeFormulaCat);
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
            <span className="lesson-source-tag">Source: Aptitude/Numarical/NumberSystem+LCM&HCF.md</span>
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
          {numberSystemData.title}
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)' }}>
          {numberSystemData.subtitle}
        </p>
      </div>

      {/* Interactive Tool Card */}
      <section id="interactive-tool" className="unit-converter-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Hash size={20} color="var(--primary-action)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
              Live Prime Factorization, LCM & HCF Solver
            </h3>
          </div>
          <span className="topic-status-pill ready">Real-time Arithmetic Engine</span>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Enter two or three positive integers to compute their prime factor tree, highest common factor, and lowest common multiple with verification.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Number 1 (A):
            </label>
            <input
              type="number"
              value={num1}
              onChange={e => setNum1(e.target.value)}
              className="converter-input-field"
              placeholder="e.g. 24"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Number 2 (B):
            </label>
            <input
              type="number"
              value={num2}
              onChange={e => setNum2(e.target.value)}
              className="converter-input-field"
              placeholder="e.g. 45"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Number 3 (C, optional):
            </label>
            <input
              type="number"
              value={num3}
              onChange={e => setNum3(e.target.value)}
              className="converter-input-field"
              placeholder="e.g. 108"
            />
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Computed LCM / HCF
            </span>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-action)' }}>
              {calcResult ? `LCM: ${calcResult.lcm} | HCF: ${calcResult.hcf}` : '---'}
            </div>
          </div>
        </div>

        {calcResult && (
          <div style={{ marginTop: '0.85rem', padding: '0.85rem 1.15rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-action)' }}>
              Prime Factorization & Product Verification:
            </span>
            <KaTeXMath math={calcResult.math} block />
          </div>
        )}

        <div className="presets-bar">
          <span className="presets-label">Exam Question Presets:</span>
          <div className="presets-pills-row">
            {[
              { label: '24, 45 (Ex 1)', a: '24', b: '45', c: '' },
              { label: '48, 72, 108 (Traffic Lights)', a: '48', b: '72', c: '108' },
              { label: '12, 18, 30', a: '12', b: '18', c: '30' },
              { label: '3600, 1800, 144 (Decimals)', a: '3600', b: '1800', c: '144' }
            ].map(preset => (
              <button
                key={preset.label}
                type="button"
                className="speed-chip-btn"
                onClick={() => {
                  setNum1(preset.a);
                  setNum2(preset.b);
                  setNum3(preset.c);
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modules List */}
      <div className="lesson-modules-flow">
        {filteredModules.map(mod => (
          <div key={mod.id} className="lesson-module-card">
            <div className="module-card-header">
              <div className="module-card-top-row">
                <span className="module-badge">Module {mod.number}</span>
                <span className="topic-status-pill ready">Core Curriculum</span>
              </div>
              <h3 className="module-card-title">
                {mod.title}
              </h3>
            </div>

            {/* Core Concepts */}
            <div className="concept-rules-container">
              <div className="module-section-label">
                <Sparkles size={14} className="module-section-icon" />
                <span>Key Theoretical Rules & Principles</span>
              </div>
              <div className="concept-rules-list">
                {mod.concepts.map((concept, cIdx) => {
                  const colonIdx = concept.indexOf(':');
                  const hasColon = colonIdx > 0 && colonIdx < 50;
                  const ruleTitle = hasColon ? concept.slice(0, colonIdx).trim() : null;
                  const ruleDesc = hasColon ? concept.slice(colonIdx + 1).trim() : concept;

                  return (
                    <div key={cIdx} className="concept-rule-card">
                      <div className="concept-rule-bullet">
                        <span className="concept-bullet-dot" />
                      </div>
                      <div className="concept-rule-content">
                        {ruleTitle ? (
                          <>
                            <span className="concept-rule-badge">{ruleTitle}</span>
                            <span className="concept-rule-text">{ruleDesc}</span>
                          </>
                        ) : (
                          <span className="concept-rule-text">{concept}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Callout Box if present */}
            {mod.callout && (
              <div className={`module-callout-card ${mod.callout.type}`}>
                <div className="callout-card-header">
                  <div className="callout-icon-badge">
                    {mod.callout.type === 'tip' && <Sparkles size={15} />}
                    {mod.callout.type === 'warning' && <AlertTriangle size={15} />}
                    {mod.callout.type === 'trap' && <XCircle size={15} />}
                    {mod.callout.type === 'info' && <Info size={15} />}
                  </div>
                  <span className="callout-card-title">{mod.callout.title}</span>
                  <span className="callout-pill-tag">
                    {mod.callout.type === 'tip' ? 'Exam Shortcut' : mod.callout.type === 'trap' ? 'Common Trap' : 'Key Note'}
                  </span>
                </div>
                <p className="callout-card-text">{mod.callout.content}</p>
              </div>
            )}

            {/* Formulas Box */}
            {mod.formulas && mod.formulas.length > 0 && (
              <div className="module-formulas-panel">
                <div className="module-section-label">
                  <Scale size={14} className="module-section-icon" />
                  <span>Mathematical Relationships</span>
                </div>
                <div className="module-formulas-grid">
                  {mod.formulas.map((f, fIdx) => (
                    <div key={fIdx} className="module-formula-card">
                      <div className="module-formula-name">{f.name}</div>
                      <div className="module-formula-math">
                        <KaTeXMath math={f.math} block />
                      </div>
                      {f.note && <div className="module-formula-note">{f.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Worked Examples */}
            <div>
              <div className="module-section-label" style={{ marginTop: '0.5rem' }}>
                <BookOpen size={14} className="module-section-icon" />
                <span>Worked Exam Scenarios ({mod.examples.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
      <section id="formula-sheet" className="formula-sheet-container">
        <div className="formula-sheet-header">
          <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            Master Formula & Concept Sheet
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Instant memory cheat-sheet for Prime Numbers, Factors, Multiples, Divisibility Rules, and Periodic Events.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="formula-cat-tabs">
          {['All', 'Primes', 'Fundamentals', 'Fractions', 'Decimals', 'Ratios', 'Divisibility', 'Simultaneous'].map(cat => (
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

        <div className="formula-grid">
          {filteredFormulas.map(item => (
            <div key={item.id} className="formula-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="formula-tag">{item.category}</span>
                <button
                  type="button"
                  className={`copy-formula-pill-btn ${copyFeedback === item.id ? 'copied' : ''}`}
                  onClick={() => copyFormula(item.math, item.id)}
                  title="Copy formula LaTeX"
                  aria-label="Copy formula LaTeX"
                >
                  {copyFeedback === item.id ? <Check size={12} strokeWidth={2.4} /> : <Copy size={12} strokeWidth={2} />}
                  <span>{copyFeedback === item.id ? 'Copied!' : 'Copy LaTeX'}</span>
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
              Active Retrieval: Question {quizIndex + 1} of {numberSystemData.quizQuestions.length}
            </h3>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-action)' }}>
            Score: {score} / {Object.keys(userAnswers).length}
          </div>
        </div>

        {currentQ && (
          <div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '1.25rem' }}>
              {currentQ.question}
            </p>

            <div className="quiz-options-list">
              {currentQ.options.map((opt, oIdx) => {
                const isChosen = selectedAnswer === oIdx;
                const isCorrect = oIdx === currentQ.correctIndex;
                let optStyle: React.CSSProperties = {};

                if (selectedAnswer !== undefined) {
                  if (isCorrect) {
                    optStyle = { borderColor: 'var(--primary-action)', backgroundColor: 'var(--primary-action-light)', fontWeight: 700 };
                  } else if (isChosen) {
                    optStyle = { borderColor: 'var(--secondary-accent)', backgroundColor: 'rgba(244, 119, 53, 0.08)' };
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    className="quiz-option-button"
                    style={optStyle}
                    onClick={() => handleSelectOption(oIdx)}
                  >
                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== undefined && (
              <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: selectedAnswer === currentQ.correctIndex ? 'var(--primary-action)' : 'var(--secondary-accent)', marginBottom: '0.35rem' }}>
                  {selectedAnswer === currentQ.correctIndex ? '✓ Correct Answer!' : '✗ Explanation:'}
                </div>
                <p style={{ fontSize: '0.88rem', margin: 0 }}>{currentQ.explanation}</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="lesson-control-btn"
                disabled={quizIndex === 0}
                onClick={() => setQuizIndex(prev => Math.max(0, prev - 1))}
              >
                Previous
              </button>

              <button
                type="button"
                className="lesson-control-btn"
                disabled={quizIndex === numberSystemData.quizQuestions.length - 1}
                onClick={() => setQuizIndex(prev => Math.min(numberSystemData.quizQuestions.length - 1, prev + 1))}
              >
                Next Question
              </button>
            </div>
          </div>
        )}
      </section>

      {/* High-Yield Placement Heuristics */}
      <section id="heuristics" style={{ marginTop: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)' }}>
            High-Yield Placement Heuristics
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Essential memory rules and shortcuts to secure 100% accuracy on Number System questions in TCS NQT.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {numberSystemData.auditItems.map((item, idx) => (
            <div key={idx} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.15rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-action)', marginBottom: '0.4rem', fontWeight: 700 }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Completion Footer */}
      <div className="lesson-completion-footer">
        <div>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.2rem', fontWeight: 700 }}>
            Finished reviewing Number System, Primes & LCM-HCF?
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Mark this topic as complete to track your overall TCS NQT study readiness.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleComplete}
          className="add-notes-btn"
        >
          <CheckCircle size={18} />
          <span>{isCompleted ? 'Topic Completed ✓' : 'Mark Topic as Completed'}</span>
        </button>
      </div>
    </div>
  );
};

