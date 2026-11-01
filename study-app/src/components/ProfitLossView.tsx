import React, { useState, useMemo } from 'react';
import { profitLossData } from '../data/profitLossContent';
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
  DollarSign,
  Tag,
  Percent,
  Scale,
  Sparkles
} from 'lucide-react';

interface ProfitLossViewProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const ProfitLossView: React.FC<ProfitLossViewProps> = ({
  isCompleted,
  onToggleComplete
}) => {
  const [expandAll, setExpandAll] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');
  const [activeFormulaCat, setActiveFormulaCat] = useState('All');

  // Interactive Tool Mode: 'golden' (MP/CP) vs 'discount' (Successive)
  const [calcMode, setCalcMode] = useState<'golden' | 'discount'>('golden');

  // Golden Ratio inputs
  const [costPrice, setCostPrice] = useState('150');
  const [profitPct, setProfitPct] = useState('10');
  const [discountPct, setDiscountPct] = useState('10');

  // Successive Discount inputs
  const [disc1, setDisc1] = useState('50');
  const [disc2, setDisc2] = useState('30');
  const [disc3, setDisc3] = useState('20');
  const [baseMaturedPrice, setBaseMaturedPrice] = useState('500');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Golden ratio calculation
  const goldenResult = useMemo(() => {
    const cp = parseFloat(costPrice);
    const p = parseFloat(profitPct);
    const d = parseFloat(discountPct);

    if (isNaN(cp) || isNaN(p) || isNaN(d) || cp <= 0 || d >= 100) {
      return null;
    }

    const mp = (cp * (100 + p)) / (100 - d);
    const sp = cp * (1 + p / 100);
    const markupPct = ((mp - cp) / cp) * 100;
    const rupeeDiscount = mp - sp;

    const math = `\\begin{aligned}
\\frac{\\text{MP}}{\\text{CP}} &= \\frac{100 + ${p}}{100 - ${d}} = \\frac{${100 + p}}{${100 - d}} \\\\[6pt]
\\text{MP} &= ${cp} \\times \\frac{${100 + p}}{${100 - d}} = \\mathbf{₹${mp.toFixed(2)}} \\\\[6pt]
\\text{Selling Price (SP)} &= ₹${sp.toFixed(2)},\\quad \\text{Markup} = ${markupPct.toFixed(1)}\\%
\\end{aligned}`;

    return {
      mp: mp.toFixed(2),
      sp: sp.toFixed(2),
      markupPct: markupPct.toFixed(1),
      rupeeDiscount: rupeeDiscount.toFixed(2),
      math
    };
  }, [costPrice, profitPct, discountPct]);

  // Successive discount calculation
  const discountResult = useMemo(() => {
    const d1 = parseFloat(disc1) || 0;
    const d2 = parseFloat(disc2) || 0;
    const d3 = parseFloat(disc3) || 0;
    const baseMP = parseFloat(baseMaturedPrice) || 100;

    const mult1 = (100 - d1) / 100;
    const mult2 = (100 - d2) / 100;
    const mult3 = (100 - d3) / 100;

    const netMultiplier = mult1 * mult2 * mult3;
    const effectiveDiscountPct = (1 - netMultiplier) * 100;
    const sp = baseMP * netMultiplier;
    const totalDiscountRupees = baseMP - sp;

    const math = `\\begin{aligned}
\\text{Net Multiplier} &= \\left(1 - \\frac{${d1}}{100}\\right)\\left(1 - \\frac{${d2}}{100}\\right)\\left(1 - \\frac{${d3}}{100}\\right) = ${netMultiplier.toFixed(4)} \\\\[6pt]
\\text{Effective Discount} &= (1 - ${netMultiplier.toFixed(4)}) \\times 100 = \\mathbf{${effectiveDiscountPct.toFixed(2)}\\%} \\\\[6pt]
\\text{On MRP ₹}${baseMP} &\\implies \\text{SP} = \\mathbf{₹${sp.toFixed(2)}},\\quad \\text{Savings} = ₹${totalDiscountRupees.toFixed(2)}
\\end{aligned}`;

    return {
      effectivePct: effectiveDiscountPct.toFixed(2),
      sp: sp.toFixed(2),
      discountRupees: totalDiscountRupees.toFixed(2),
      math
    };
  }, [disc1, disc2, disc3, baseMaturedPrice]);

  // Quiz calculations
  const currentQ = profitLossData.quizQuestions[quizIndex];
  const selectedAnswer = userAnswers[currentQ?.id];

  const handleSelectOption = (optIdx: number) => {
    if (selectedAnswer !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const score = useMemo(() => {
    let s = 0;
    profitLossData.quizQuestions.forEach(q => {
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

  // Filter modules/examples by search
  const filteredModules = useMemo(() => {
    if (!topicSearch.trim()) return profitLossData.modules;
    const q = topicSearch.toLowerCase();
    return profitLossData.modules.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.concepts.some(c => c.toLowerCase().includes(q)) ||
      m.examples.some(e => e.title.toLowerCase().includes(q) || e.question.toLowerCase().includes(q))
    );
  }, [topicSearch]);

  // Filter formula cheat sheet
  const filteredFormulas = useMemo(() => {
    if (activeFormulaCat === 'All') return profitLossData.formulaSheet;
    return profitLossData.formulaSheet.filter(f => f.category === activeFormulaCat);
  }, [activeFormulaCat]);

  return (
    <div className="lesson-page-container">
      {/* Lesson Header (Matching TSDView & PercentageView standard layout) */}
      <div className="lesson-page-header">
        <div className="lesson-meta-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="topic-status-pill ready">
              <Check size={12} /> Notes Available &bull; Ready to Study
            </span>
            <span className="lesson-source-tag">Source: Aptitude/Numarical/Profit,Loss&Discount.md</span>
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
          {profitLossData.title}
        </h2>
        <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)' }}>
          {profitLossData.subtitle}
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

          <a href="#interactive-tool" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>⚡ Golden & Discount Tool</span>
          </a>

          <a href="#formula-sheet" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>📐 Master Formulas</span>
          </a>

          <a href="#study-modules" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>📚 Core Modules (1–7)</span>
          </a>

          <a href="#placement-quiz" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>🎯 Placement Quiz</span>
          </a>

          <a href="#homework-section" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>✍️ Homework Solutions</span>
          </a>

          <a href="#corrections-audit" className="lesson-control-btn" style={{ textDecoration: 'none' }}>
            <span>🔍 Key Takeaways</span>
          </a>
        </div>

        <div className="lesson-search-box">
          <Search size={14} className="lesson-search-icon" />
          <input
            type="text"
            className="lesson-search-input"
            placeholder="Search within Profit & Loss notes..."
            value={topicSearch}
            onChange={e => setTopicSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Interactive Tool Section (Standard converter-card layout) */}
      <section id="interactive-tool" className="converter-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.6rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-action)', margin: '0 0 0.25rem 0' }}>
              Interactive Commercial Math Engine
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
              Test the Golden MP/CP equation and multi-stage successive discount compounding in real time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-surface)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              className="lesson-control-btn"
              style={{
                backgroundColor: calcMode === 'golden' ? 'var(--primary-action)' : 'transparent',
                color: calcMode === 'golden' ? 'var(--text-on-dark)' : 'var(--text-main)',
                border: 'none',
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
              onClick={() => setCalcMode('golden')}
            >
              Golden MP/CP Ratio
            </button>
            <button
              type="button"
              className="lesson-control-btn"
              style={{
                backgroundColor: calcMode === 'discount' ? 'var(--primary-action)' : 'transparent',
                color: calcMode === 'discount' ? 'var(--text-on-dark)' : 'var(--text-main)',
                border: 'none',
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
              onClick={() => setCalcMode('discount')}
            >
              Successive Discounts
            </button>
          </div>
        </div>

        {calcMode === 'golden' ? (
          <div>
            <div className="converter-controls-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Cost Price (CP in ₹):
                </label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={e => setCostPrice(e.target.value)}
                  className="converter-input-field"
                  placeholder="e.g. 150"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Target Profit % (P):
                </label>
                <input
                  type="number"
                  value={profitPct}
                  onChange={e => setProfitPct(e.target.value)}
                  className="converter-input-field"
                  placeholder="e.g. 10"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Offered Discount % (D):
                </label>
                <input
                  type="number"
                  value={discountPct}
                  onChange={e => setDiscountPct(e.target.value)}
                  className="converter-input-field"
                  placeholder="e.g. 10"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Required Marked Price (MP)
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-action)' }}>
                  {goldenResult ? `₹${goldenResult.mp}` : '---'}
                </div>
              </div>
            </div>

            {goldenResult && (
              <div style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-action)' }}>
                    Golden Ratio Derivation & Parameters:
                  </span>
                  <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.82rem' }}>
                    <span>Selling Price (SP): <strong>₹{goldenResult.sp}</strong></span>
                    <span>Markup: <strong>+{goldenResult.markupPct}%</strong></span>
                  </div>
                </div>
                <KaTeXMath math={goldenResult.math} block />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-subtle)' }}>Common exam presets:</span>
              {[
                { label: 'CP=150, P=10%, D=10%', cp: '150', p: '10', d: '10' },
                { label: 'CP=500, P=20%, D=20%', cp: '500', p: '20', d: '20' },
                { label: 'CP=200, P=25%, D=50%', cp: '200', p: '25', d: '50' }
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  className="lesson-control-btn"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => {
                    setCostPrice(preset.cp);
                    setProfitPct(preset.p);
                    setDiscountPct(preset.d);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="converter-controls-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', alignItems: 'flex-start' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Discount 1 (%):
                </label>
                <input
                  type="number"
                  value={disc1}
                  onChange={e => setDisc1(e.target.value)}
                  className="converter-input-field"
                  placeholder="e.g. 50"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Discount 2 (%):
                </label>
                <input
                  type="number"
                  value={disc2}
                  onChange={e => setDisc2(e.target.value)}
                  className="converter-input-field"
                  placeholder="e.g. 30"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Discount 3 (%):
                </label>
                <input
                  type="number"
                  value={disc3}
                  onChange={e => setDisc3(e.target.value)}
                  className="converter-input-field"
                  placeholder="e.g. 20"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Base MRP (₹):
                </label>
                <input
                  type="number"
                  value={baseMaturedPrice}
                  onChange={e => setBaseMaturedPrice(e.target.value)}
                  className="converter-input-field"
                  placeholder="e.g. 500"
                  style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Single Equivalent %
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-action)' }}>
                  {discountResult ? `${discountResult.effectivePct}%` : '---'}
                </div>
              </div>
            </div>

            {discountResult && (
              <div style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-action)' }}>
                    Multiplier Compounding:
                  </span>
                  <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.82rem' }}>
                    <span>Final SP: <strong>₹{discountResult.sp}</strong></span>
                    <span>Total Discount: <strong>₹{discountResult.discountRupees}</strong></span>
                  </div>
                </div>
                <KaTeXMath math={discountResult.math} block />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-subtle)' }}>Common exam sequences:</span>
              {[
                { label: '50% + 30% + 20%', d1: '50', d2: '30', d3: '20', base: '500' },
                { label: '10% + 20% on ₹500', d1: '10', d2: '20', d3: '0', base: '500' },
                { label: '25% + 20%', d1: '25', d2: '20', d3: '0', base: '1000' }
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  className="lesson-control-btn"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => {
                    setDisc1(preset.d1);
                    setDisc2(preset.d2);
                    setDisc3(preset.d3);
                    setBaseMaturedPrice(preset.base);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Modules Loop (Standard TSDView Module Structure) */}
      <div id="study-modules">
        {filteredModules.map(mod => (
          <section key={mod.id} id={mod.id} style={{ marginBottom: '2.5rem' }}>
            <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
                Module {mod.number}: {mod.title}
              </h3>
            </div>

            {/* Core Concepts - High Readability Rule Cards */}
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

            {/* Key Formulas */}
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

            {/* Callout Box */}
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
      </div>

      {/* Master Formula Sheet (Standard TSDView Formula Section) */}
      <section id="formula-sheet" style={{ marginBottom: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            Master Formula Reference Sheet
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            All core commercial math formulas in one place. Filter by category or copy formulas for your revision notes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {['All', 'Fundamentals', 'Golden Ratio', 'Successive Discount', 'Buy X Get Y', 'Article Parity', 'Price-Quantity', 'Weighted Averages', 'Fraudulent Dealer'].map(cat => (
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
                    className={`copy-formula-pill-btn ${copyFeedback === f.id ? 'copied' : ''}`}
                    onClick={() => copyFormula(f.math, f.id)}
                    title="Copy formula LaTeX"
                    aria-label="Copy formula LaTeX"
                  >
                    {copyFeedback === f.id ? (
                      <>
                        <Check size={12} strokeWidth={2.4} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} strokeWidth={2} />
                        <span>Copy LaTeX</span>
                      </>
                    )}
                  </button>
                </div>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--primary-action)' }}>{f.concept}</h4>
              </div>
              <KaTeXMath math={f.math} block />
            </div>
          ))}
        </div>
      </section>

      {/* Homework Solutions Section */}
      <section id="homework-section" style={{ marginBottom: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            End-of-Video Homework Problems & Step-by-Step Solutions
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Rigorous mathematical derivations for the practice homework problems assigned in the placement lecture.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* HW 1 */}
          <div className="worked-example-box" id="example-hw-1">
            <div className="worked-example-header">
              <span className="worked-example-tag">Homework Problem 1</span>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Split Stock with Net Rupee Profit
              </h4>
              <div className="worked-example-question">
                "1/3 of goods are sold at 15% profit, 25% of the goods at 20% profit, and the rest at 20% loss. If the total profit realized is ₹138.50, find the total cost value of the goods."
              </div>
            </div>
            <div className="worked-solution-drawer" style={{ display: 'block' }}>
              <div className="solution-step-item">
                <div className="step-label">Step 1: Express Stock Portions as Fractions</div>
                <p style={{ fontSize: '0.92rem', marginBottom: '0.4rem' }}>
                  Portion 1 is 1/3 (+15%), Portion 2 is 25% = 1/4 (+20%), and Rest = 1 - (1/3 + 1/4) = 5/12 (-20%).
                </p>
              </div>

              <div className="solution-step-item">
                <div className="step-label">Step 2: Equalize Stock Units via LCM(3, 4, 12) = 12 Parts</div>
                <KaTeXMath math={`\\text{Portion 1} = 4\\text{ parts @ }+15\\%,\\quad \\text{Portion 2} = 3\\text{ parts @ }+20\\%,\\quad \\text{Portion 3} = 5\\text{ parts @ }-20\\%`} block />
              </div>

              <div className="solution-step-item">
                <div className="step-label">Step 3: Compute Overall Weighted Profit %</div>
                <KaTeXMath math={`\\text{Net } \\% = \\frac{(4 \\times 15) + (3 \\times 20) + (5 \\times -20)}{12} = \\frac{60 + 60 - 100}{12} = \\frac{20}{12}\\% = \\frac{5}{3}\\%`} block />
              </div>

              <div className="solution-step-item">
                <div className="step-label">Step 4: Solve for Total Cost Value (CP)</div>
                <KaTeXMath math={`\\frac{5}{3}\\% \\text{ of CP} = ₹138.50 \\implies \\text{CP} = 138.50 \\times \\frac{3}{5} \\times 100 = 138.50 \\times 60 = ₹8,310`} block />
              </div>

              <div className="final-answer-pill">
                <CheckCircle size={16} />
                <span>Final Answer: ₹8,310</span>
              </div>
            </div>
          </div>

          {/* HW 2 */}
          <div className="worked-example-box" id="example-hw-2">
            <div className="worked-example-header">
              <span className="worked-example-tag">Homework Problem 2</span>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Dishonest Dealer False Weight Gain %
              </h4>
              <div className="worked-example-question">
                "A dishonest dealer professes to sell his goods at cost price but uses a weight of 960 grams in place of a 1 kg (1000 g) weight. Find his actual gain percentage."
              </div>
            </div>
            <div className="worked-solution-drawer" style={{ display: 'block' }}>
              <div className="solution-step-item">
                <div className="step-label">Step 1: Analyze Article / Weight Parity</div>
                <p style={{ fontSize: '0.92rem', marginBottom: '0.4rem' }}>
                  The dealer gives 960 g of stock (effective CP basis) while charging the customer for 1000 g (SP basis).
                </p>
                <KaTeXMath math={`\\frac{\\text{SP}}{\\text{CP}} = \\frac{1000}{960} = \\frac{25}{24}`} block />
              </div>

              <div className="solution-step-item">
                <div className="step-label">Step 2: Calculate Gain Percentage</div>
                <KaTeXMath math={`\\text{Gain Units} = 25 - 24 = 1\\text{ unit on CP of } 24\\\\[4pt]\\text{Gain } \\% = \\frac{40}{960} \\times 100 = \\frac{1}{24} \\times 100 = \\frac{25}{6}\\% = 4\\frac{1}{6}\\% \\approx 4.17\\%`} block />
              </div>

              <div className="final-answer-pill">
                <CheckCircle size={16} />
                <span>Final Answer: 4 1/6% (4.17%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Quiz Simulator (Standard TSDView Quiz Layout) */}
      <section id="placement-quiz" className="quiz-module-box" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="topic-status-pill ready">Placement Quiz Simulator</span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginTop: '0.25rem' }}>
              Timed Aptitude Quiz Mode ({profitLossData.quizQuestions.length} Questions)
            </h3>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Question {quizIndex + 1} of {profitLossData.quizQuestions.length}
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
                    if (quizIndex < profitLossData.quizQuestions.length - 1) {
                      setQuizIndex(quizIndex + 1);
                    } else {
                      setQuizFinished(true);
                    }
                  }}
                >
                  {quizIndex === profitLossData.quizQuestions.length - 1 ? 'View Results 📊' : 'Next Question →'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-action)', marginBottom: '0.5rem' }}>
              {score} / {profitLossData.quizQuestions.length}
            </div>
            <h4 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {score >= 6 ? 'TCS NQT Ready! Outstanding 🏆' : score >= 4 ? 'Good Progress! Revise the Traps 📚' : 'Needs Practice! Work through the Modules 💡'}
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Review the Golden Ratio identity and the article parity law to maximize your commercial math score.
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

      {/* Key Conceptual Audit & Placement Strategy (Standard TSDView Section) */}
      <section id="corrections-audit" style={{ marginBottom: '2.5rem' }}>
        <div style={{ borderBottom: '2px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
            Placement Key Takeaways & Exam Strategy
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Essential speed heuristics and traps to avoid under timed test conditions.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {profitLossData.auditItems.map((item, idx) => (
            <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-key-lime-pie)' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-action)', marginBottom: '0.25rem' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.88rem' }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completion Footer (Matching TSDView) */}
      <div className="lesson-completion-footer">
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            Finished reviewing Profit, Loss & Discount?
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
