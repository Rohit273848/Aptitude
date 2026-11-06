import React, { useState } from 'react';
import { KaTeXMath } from '../KaTeXMath';
import {
  Lightbulb,
  Coffee,
  UtensilsCrossed,
  Luggage,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Table
} from 'lucide-react';

export const ExplanationBlock: React.FC = () => {
  const [activeAnalogyTab, setActiveAnalogyTab] = useState<'chaiwala' | 'buffet' | 'bags'>(
    'chaiwala'
  );
  const [isDecisionMatrixOpen, setIsDecisionMatrixOpen] = useState(true);

  return (
    <div className="dsa-intuition-wrapper">
      {/* Golden Rule Card */}
      <div className="dsa-golden-rule-card">
        <div className="golden-rule-badge">
          <Lightbulb size={16} />
          <span>The Core Rule of Greedy</span>
        </div>
        <div className="golden-rule-formula">
          <KaTeXMath
            math={`\\boxed{\\begin{aligned} &\\textbf{"Abhi jo sabse accha choice lag raha hai wo karo,} \\\\[4pt] &\\textbf{aur ant mein sab kuch theek ho jayega"}\\end{aligned}}`}
            block
          />
        </div>
        <p className="golden-rule-subtitle">
          A Greedy Algorithm builds up a solution piece by piece, always choosing the next piece
          that offers the most immediate (local) benefit, under the fundamental mathematical
          guarantee that:
        </p>

        <div className="golden-rule-invariants-grid">
          <div className="invariant-box">
            <div className="invariant-header">
              <CheckCircle2 size={16} color="var(--primary-action)" />
              <strong>1. Greedy-Choice Property</strong>
            </div>
            <p>
              A globally optimal solution can be reached by making a locally optimal choice at each step without reconsidering earlier choices.
            </p>
          </div>
          <div className="invariant-box">
            <div className="invariant-header">
              <CheckCircle2 size={16} color="var(--primary-action)" />
              <strong>2. Zero Regret (No Pachtawa)</strong>
            </div>
            <p>
              Choosing the current best option never penalizes, blocks, or invalidates a better future choice.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Analogy Showcase */}
      <div className="dsa-analogy-container">
        <div className="dsa-analogy-nav">
          <button
            type="button"
            className={`analogy-tab-btn ${activeAnalogyTab === 'chaiwala' ? 'active' : ''}`}
            onClick={() => setActiveAnalogyTab('chaiwala')}
          >
            <Coffee size={15} />
            <span>1. The Chaiwala Analogy (Why Greedy Works)</span>
          </button>
          <button
            type="button"
            className={`analogy-tab-btn ${activeAnalogyTab === 'buffet' ? 'active' : ''}`}
            onClick={() => setActiveAnalogyTab('buffet')}
          >
            <UtensilsCrossed size={15} />
            <span>2. The Buffet Regret Test (Greedy vs DP)</span>
          </button>
          <button
            type="button"
            className={`analogy-tab-btn ${activeAnalogyTab === 'bags' ? 'active' : ''}`}
            onClick={() => setActiveAnalogyTab('bags')}
          >
            <Luggage size={15} />
            <span>3. Packing Bags (Resource Density)</span>
          </button>
        </div>

        <div className="analogy-card-content">
          {activeAnalogyTab === 'chaiwala' && (
            <div className="analogy-slide">
              <div className="analogy-title-row">
                <h4>The Train Chaiwala & Change Flexibility Invariant</h4>
                <span className="analogy-pill success">Why Greedy Works</span>
              </div>
              <p className="analogy-text">
                A train chaiwala sells tea for <strong>₹10</strong>. A customer buys one cup and pays with a <strong>₹100 note</strong>. The chaiwala must return <strong>₹90 in change</strong> from his cash denominations:
              </p>
              <div className="analogy-math-box">
                <KaTeXMath math={`\\text{Denominations} = \\{\\text{₹}5, \\text{₹}10, \\text{₹}20, \\text{₹}50, \\text{₹}100\\}`} block />
              </div>
              <div className="chaiwala-comparison-grid">
                <div className="choice-option-card">
                  <div className="option-title">Choice 1 (Nine ₹10 notes)</div>
                  <div className="option-math">9 &times; 10 = ₹90</div>
                  <p className="option-verdict fail">❌ Wastes 9 precious flexible ₹10 notes.</p>
                </div>
                <div className="choice-option-card">
                  <div className="option-title">Choice 2 (4 &times; ₹20 + 1 &times; ₹10)</div>
                  <div className="option-math">80 + 10 = ₹90</div>
                  <p className="option-verdict neutral">⚠️ Decent, but consumes four ₹20 bills.</p>
                </div>
                <div className="choice-option-card recommended">
                  <div className="option-title">Choice 3: The Greedy Pick (1 &times; ₹50 + 2 &times; ₹20)</div>
                  <div className="option-math">50 + 40 = ₹90</div>
                  <p className="option-verdict success">
                    ✅ <strong>Optimal:</strong> Gets rid of largest, least flexible notes (₹50, ₹20) first and preserves small change (₹5, ₹10) for future customers!
                  </p>
                </div>
              </div>
              <div className="callout-block tip" style={{ marginTop: '1.2rem' }}>
                <div className="callout-card-title">💡 The Flexibility Invariant</div>
                <p>
                  A ₹10 note is versatile—it can make change for ₹10, or combine to make ₹20, ₹30, ₹40. But a ₹50 note is rigid: if the next customer pays ₹20 for a ₹10 tea, a ₹50 note is completely useless! Always dispense rigid resources first.
                </p>
              </div>
            </div>
          )}

          {activeAnalogyTab === 'buffet' && (
            <div className="analogy-slide">
              <div className="analogy-title-row">
                <h4>The Wedding Buffet & The "Pachtawa" (Regret) Test</h4>
                <span className="analogy-pill warning">Greedy vs Dynamic Programming</span>
              </div>
              <p className="analogy-text">
                Imagine entering a wedding buffet where you are allowed to consume <strong>only ONE dish for free</strong>. The manager walks you forward along a one-way corridor without letting you see the future stalls:
              </p>
              <div className="buffet-pathway-visual">
                <div className="buffet-stall">[Stall 1: Veg Pulao]</div>
                <div className="buffet-arrow">➡️ (Greedy picks Pulao!) ➡️</div>
                <div className="buffet-stall highlight">[Stall 2: Mutton Biryani]</div>
                <div className="buffet-arrow">➡️</div>
                <div className="buffet-stall">[Stall 3: Royal Shahi Paneer]</div>
              </div>
              <p className="analogy-text" style={{ marginTop: '0.8rem' }}>
                When you arrive at Stall 2, you see Mutton Biryani and feel instant <strong>Pachtawa (Regret)</strong>! But because choices were irreversible, your local greedy pick failed globally.
              </p>
              <div className="callout-block warning" style={{ margin: '1rem 0' }}>
                <div className="callout-card-title">⚠️ The Regret Heuristic</div>
                <p>
                  Jahan <strong>pachtawa (regret)</strong> hone ka 1% bhi chance ho, wahan Greedy <strong>kabhi mat lagana</strong>—wahan <strong>Dynamic Programming (DP)</strong> lagega (like 0/1 Knapsack or House Robber).
                </p>
              </div>
              <div className="callout-block tip">
                <div className="callout-card-title">✨ The Twist: When Sorting Enables Greedy</div>
                <p>
                  If the manager says: <em>"Pehle poora buffet ghoom aao, inspect and sort all dishes by tastiness, then pick"</em>: Sorting (in <KaTeXMath math="\mathcal{O}(N \log N)" />) eliminates future uncertainty, converting a regretful problem into a zero-regret Greedy pick!
                </p>
              </div>
            </div>
          )}

          {activeAnalogyTab === 'bags' && (
            <div className="analogy-slide">
              <div className="analogy-title-row">
                <h4>The Father Packing Suitcases: Maximum Container Density</h4>
                <span className="analogy-pill info">Greedy Priority Rule</span>
              </div>
              <p className="analogy-text">
                When packing bags for a flight with strict weight constraints, your father always picks the <strong>largest bag first</strong> and stuffs it completely full before opening a second bag.
              </p>
              <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-body)', lineHeight: 1.7, marginTop: '0.5rem' }}>
                <li>Filling the largest container first minimizes the total count of luggage bags.</li>
                <li>It preserves smaller, flexible backpacks for fragile and quick-access essentials.</li>
                <li>Greedily packing the largest volume first never harms future options.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Decision Matrix Section */}
      <div className="dsa-decision-matrix-card">
        <div
          className="matrix-header-clickable"
          onClick={() => setIsDecisionMatrixOpen(prev => !prev)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Table size={18} color="var(--primary-action)" />
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
              Algorithmic Decision Matrix: Greedy vs. DP vs. Backtracking
            </h4>
          </div>
          {isDecisionMatrixOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {isDecisionMatrixOpen && (
          <div className="matrix-table-wrapper">
            <table className="dsa-styled-table">
              <thead>
                <tr>
                  <th>Paradigm</th>
                  <th>When to Use</th>
                  <th>State Guarantee</th>
                  <th>Time Complexity</th>
                  <th>Auxiliary Space</th>
                </tr>
              </thead>
              <tbody>
                <tr className="highlight-row">
                  <td>
                    <strong style={{ color: 'var(--primary-action)' }}>Greedy</strong>
                  </td>
                  <td>Local choice is globally optimal; Zero regret</td>
                  <td>Irreversible forward steps</td>
                  <td>
                    <KaTeXMath math="\mathcal{O}(N) \text{ or } \mathcal{O}(N \log N)" />
                  </td>
                  <td>
                    <KaTeXMath math="\mathcal{O}(1)" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Dynamic Programming (DP)</strong>
                  </td>
                  <td>Overlapping subproblems; Future choices depend on past states</td>
                  <td>Stores optimal sub-results in cache / table</td>
                  <td>
                    <KaTeXMath math="\mathcal{O}(N^2) \text{ or } \mathcal{O}(N \times W)" />
                  </td>
                  <td>
                    <KaTeXMath math="\mathcal{O}(N) \text{ or } \mathcal{O}(N \times W)" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Backtracking</strong>
                  </td>
                  <td>Need to discover ALL valid configurations (subsets, permutations)</td>
                  <td>Reversible trial-and-error</td>
                  <td>
                    <KaTeXMath math="\mathcal{O}(2^N) \text{ or } \mathcal{O}(N!)" />
                  </td>
                  <td>
                    <KaTeXMath math="\mathcal{O}(N) \text{ (call stack)}" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
