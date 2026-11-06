import React, { useState, useEffect, useRef } from 'react';
import { DSAProblemMeta, DryRunStep } from '../../data/dsaRegistry';
import { KaTeXMath } from '../KaTeXMath';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle,
  XCircle,
  HelpCircle,
  Coins,
  ArrowRight,
  TrendingUp,
  Sliders
} from 'lucide-react';

interface DryRunVisualizerProps {
  problems: DSAProblemMeta[];
}

export const DryRunVisualizer: React.FC<DryRunVisualizerProps> = ({ problems }) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(problems[0]?.id || '');
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1800);

  const activeProblem = problems.find(p => p.id === selectedProblemId) || problems[0];
  const activeScenario = activeProblem?.presetScenarios[selectedScenarioIdx] || activeProblem?.presetScenarios[0];
  const steps: DryRunStep[] = activeScenario?.steps || [];
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play interval timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playSpeed]);

  const handleSelectProblem = (pId: string) => {
    setSelectedProblemId(pId);
    setSelectedScenarioIdx(0);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIdx(idx);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleTogglePlay = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(prev => !prev);
  };

  if (!activeProblem || !activeScenario) {
    return null;
  }

  return (
    <div className="dsa-visualizer-container" id="interactive-visualizer">
      {/* Visualizer Top Bar: Problem Switcher */}
      <div className="dsa-visualizer-header">
        <div className="visualizer-header-title">
          <Sparkles size={18} color="var(--primary-action)" />
          <h3>Interactive Algorithm Dry-Run Simulator</h3>
        </div>
        <p className="visualizer-header-subtitle">
          Step through greedy choice invariants with live memory states, pointers, and condition branching.
        </p>

        {/* Problem Selection Pills */}
        <div className="visualizer-problem-tabs">
          {problems.map(prob => (
            <button
              key={prob.id}
              type="button"
              className={`visualizer-prob-btn ${prob.id === selectedProblemId ? 'active' : ''}`}
              onClick={() => handleSelectProblem(prob.id)}
            >
              <span>{prob.title}</span>
              <span className="prob-platform-tag">{prob.platform}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario & Controls Toolbar */}
      <div className="visualizer-toolbar">
        <div className="scenario-selector-group">
          <label htmlFor="scenario-select" className="scenario-label">
            Preset Scenario:
          </label>
          <select
            id="scenario-select"
            className="scenario-select-dropdown"
            value={selectedScenarioIdx}
            onChange={e => handleSelectScenario(Number(e.target.value))}
          >
            {activeProblem.presetScenarios.map((sc, sIdx) => (
              <option key={sIdx} value={sIdx}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step Navigation Controls */}
        <div className="visualizer-playback-controls">
          <button
            type="button"
            className="playback-btn"
            onClick={handleReset}
            title="Reset to Step 0"
          >
            <RotateCcw size={15} />
            <span className="btn-text">Reset</span>
          </button>
          <button
            type="button"
            className="playback-btn"
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            title="Previous Step"
          >
            <ChevronLeft size={16} />
            <span className="btn-text">Prev</span>
          </button>
          <button
            type="button"
            className={`playback-btn primary ${isPlaying ? 'playing' : ''}`}
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause auto-play' : 'Auto play simulation'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span className="btn-text">{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>
          <button
            type="button"
            className="playback-btn"
            onClick={handleNext}
            disabled={currentStepIdx >= steps.length - 1}
            title="Next Step"
          >
            <span className="btn-text">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Visual Canvas Stage */}
      <div className="visualizer-stage-canvas">
        {/* Lemonade Change Stage */}
        {activeProblem.dryRunType === 'cash-register' && (
          <div className="stage-content-box">
            {/* Customer Queue */}
            <div className="stage-row">
              <span className="stage-row-label">Customer Queue (Bills Paid):</span>
              <div className="customer-bills-queue">
                {(activeScenario.input as number[]).map((bill, bIdx) => {
                  const isCurrent = currentStep?.highlightedIndices?.includes(bIdx);
                  const isProcessed = bIdx < (currentStep?.highlightedIndices?.[0] ?? -1);
                  return (
                    <div
                      key={bIdx}
                      className={`bill-queue-token ${isCurrent ? 'current-active' : ''} ${
                        isProcessed ? 'processed' : ''
                      }`}
                    >
                      <span className="bill-currency">₹</span>
                      <span className="bill-amount">{bill}</span>
                      {isCurrent && <span className="bill-active-indicator">Current</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cash Register Registers */}
            <div className="stage-register-rack">
              <div className="register-drawer-card five-slot">
                <div className="drawer-header">
                  <Coins size={16} color="var(--primary-action)" />
                  <span>₹5 Bills in Drawer</span>
                </div>
                <div className="drawer-count">{currentStep?.state?.five ?? 0}</div>
                <div className="drawer-note">High flexibility &bull; Keep preserved!</div>
              </div>

              <div className="register-drawer-card ten-slot">
                <div className="drawer-header">
                  <Coins size={16} color="var(--secondary-accent)" />
                  <span>₹10 Bills in Drawer</span>
                </div>
                <div className="drawer-count">{currentStep?.state?.ten ?? 0}</div>
                <div className="drawer-note">Used first for ₹15 change</div>
              </div>

              <div className="register-drawer-card twenty-slot muted">
                <div className="drawer-header">
                  <span>₹20 Bills (Not Tracked)</span>
                </div>
                <div className="drawer-count">—</div>
                <div className="drawer-note">Dead asset: cannot give as change</div>
              </div>
            </div>
          </div>
        )}

        {/* Assign Cookies Stage */}
        {activeProblem.dryRunType === 'two-pointer' && (
          <div className="stage-content-box">
            {/* Children Array */}
            <div className="stage-row">
              <span className="stage-row-label">
                Children Greed Array (<code>child[i]</code>):
              </span>
              <div className="array-visual-row">
                {activeScenario.input.child.map((val: number, idx: number) => {
                  const isPointed = currentStep?.pointers?.i === idx;
                  const isSatisfied = idx < (currentStep?.state?.i ?? 0);
                  return (
                    <div
                      key={idx}
                      className={`array-element-cell ${isPointed ? 'pointer-highlight' : ''} ${
                        isSatisfied ? 'matched-cell' : ''
                      }`}
                    >
                      <div className="cell-index">i = {idx}</div>
                      <div className="cell-value">{val} kg</div>
                      {isPointed && <div className="pointer-arrow-badge top">Pointer i</div>}
                      {isSatisfied && <div className="status-checkmark">✓ Content</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cookies Array */}
            <div className="stage-row" style={{ marginTop: '1.5rem' }}>
              <span className="stage-row-label">
                Cookies Available Array (<code>cookie[j]</code>):
              </span>
              <div className="array-visual-row">
                {activeScenario.input.cookie.map((val: number, idx: number) => {
                  const isPointed = currentStep?.pointers?.j === idx;
                  const isUsed = idx < (currentStep?.state?.j ?? 0);
                  return (
                    <div
                      key={idx}
                      className={`array-element-cell cookie-cell ${
                        isPointed ? 'pointer-highlight-secondary' : ''
                      } ${isUsed ? 'consumed-cell' : ''}`}
                    >
                      <div className="cell-index">j = {idx}</div>
                      <div className="cell-value">{val} kg</div>
                      {isPointed && <div className="pointer-arrow-badge bottom">Pointer j</div>}
                      {isUsed && <div className="status-checkmark">Consumed</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Happy Children Live Metric */}
            <div className="live-metric-card" style={{ marginTop: '1.2rem' }}>
              <span>Happy Children Count (<code>result</code>):</span>
              <strong className="metric-bold">{currentStep?.state?.result ?? 0}</strong>
            </div>
          </div>
        )}

        {/* Jump Game Stage */}
        {activeProblem.dryRunType === 'jump-reach' && (
          <div className="stage-content-box">
            <div className="stage-row">
              <span className="stage-row-label">Towns Array & Jump Knowledge:</span>
              <div className="array-visual-row town-row">
                {(activeScenario.input as number[]).map((val, idx) => {
                  const isCurrentTown = currentStep?.pointers?.i === idx;
                  const isReachable = idx <= (currentStep?.state?.reach ?? 0);
                  const isLastTown = idx === (activeScenario.input as number[]).length - 1;

                  return (
                    <div
                      key={idx}
                      className={`array-element-cell town-cell ${
                        isCurrentTown ? 'pointer-highlight' : ''
                      } ${isReachable ? 'reachable-town' : 'unreachable-town'}`}
                    >
                      <div className="cell-index">Town {idx}</div>
                      <div className="cell-value">{val}</div>
                      <div className="town-jump-reach">Send up to: {idx + val}</div>
                      {isCurrentTown && <div className="pointer-arrow-badge top">Current i</div>}
                      {isLastTown && <div className="destination-badge">🎯 Goal</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reach Horizon Indicator */}
            <div className="reach-horizon-bar-card">
              <div className="reach-bar-header">
                <span>Maximum Verified Knowledge Horizon (<code>reach</code>):</span>
                <strong className="reach-badge">Index {currentStep?.state?.reach ?? 0}</strong>
              </div>
              <div className="reach-progress-track">
                <div
                  className="reach-progress-fill"
                  style={{
                    width: `${Math.min(
                      100,
                      (((currentStep?.state?.reach ?? 0) + 1) /
                        (activeScenario.input as number[]).length) *
                        100
                    )}%`
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Fractional Knapsack Stage */}
        {activeProblem.dryRunType === 'fractional-knapsack' && (
          <div className="stage-content-box">
            <div className="knapsack-overview-grid">
              {/* Knapsack Container Visual */}
              <div className="knapsack-bag-visual">
                <div className="bag-label-row">
                  <span>Bag Capacity:</span>
                  <strong>{currentStep?.state?.packedWeight ?? 0} / 50 kg</strong>
                </div>
                <div className="bag-capacity-cylinder">
                  <div
                    className="bag-cylinder-fill"
                    style={{
                      height: `${((currentStep?.state?.packedWeight ?? 0) / 50) * 100}%`
                    }}
                  >
                    <span className="fill-val">{currentStep?.state?.packedWeight ?? 0} kg</span>
                  </div>
                </div>
                <div className="bag-status-note">
                  Remaining: {currentStep?.state?.remainingCapacity ?? 50} kg
                </div>
              </div>

              {/* Items List Sorted by Ratio */}
              <div className="knapsack-items-table-wrap">
                <span className="stage-row-label">Items Sorted Descending by Price/kg Ratio:</span>
                <div className="knapsack-items-list">
                  {activeScenario.input.items.map((item: any) => {
                    const isPacked = (currentStep?.state?.currentItem ?? 0) >= item.id;
                    return (
                      <div
                        key={item.id}
                        className={`knapsack-item-pill ${isPacked ? 'packed' : ''}`}
                      >
                        <div className="item-pill-title">Item {item.id}</div>
                        <div className="item-pill-detail">
                          Value: ₹{item.value} &bull; Wt: {item.weight} kg
                        </div>
                        <div className="item-pill-ratio">
                          Ratio: <strong>{item.ratio} ₹/kg</strong>
                        </div>
                        {isPacked && <div className="packed-tag">Packed</div>}
                      </div>
                    );
                  })}
                </div>

                <div className="live-metric-card" style={{ marginTop: '1rem' }}>
                  <span>Total Accumulated Value:</span>
                  <strong className="metric-bold" style={{ color: 'var(--primary-action)' }}>
                    ₹{currentStep?.state?.totalValue ?? 0}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step Explanation Drawer */}
      <div className="visualizer-step-card">
        <div className="step-card-meta">
          <span className="step-counter-pill">
            Step {currentStep?.stepNumber ?? 0} of {steps.length - 1}
          </span>
          {currentStep?.badge && <span className="step-badge-tag">{currentStep.badge}</span>}
          {currentStep?.isSuccess && (
            <span className="step-outcome-tag success">
              <CheckCircle size={14} /> Solved / Goal Reached
            </span>
          )}
          {currentStep?.isFailure && (
            <span className="step-outcome-tag failure">
              <XCircle size={14} /> Dead End / Invariant Broken
            </span>
          )}
        </div>
        <h4 className="step-title">{currentStep?.title}</h4>
        <p className="step-explanation">{currentStep?.explanation}</p>
      </div>
    </div>
  );
};
