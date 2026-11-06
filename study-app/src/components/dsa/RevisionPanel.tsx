import React, { useState } from 'react';
import { KaTeXMath } from '../KaTeXMath';
import { CodeBlock } from './CodeBlock';
import {
  Award,
  AlertOctagon,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  BookOpen
} from 'lucide-react';

export const RevisionPanel: React.FC = () => {
  const [openHomework, setOpenHomework] = useState<{ [id: string]: boolean }>({
    hw1: false,
    hw2: false
  });

  const toggleHomework = (id: string) => {
    setOpenHomework(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const jumpGame2Code = `class Solution {
    public int jump(int[] nums) {
        int jumps = 0, currentEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        return jumps;
    }
}`;

  const gasStationCode = `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        int currentTank = 0, start = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            currentTank += gas[i] - cost[i];

            if (currentTank < 0) {
                start = i + 1; // Greedily reset starting point
                currentTank = 0;
            }
        }

        return (totalGas >= totalCost) ? start : -1;
    }
}`;

  return (
    <div className="dsa-revision-section" id="revision-panel">
      {/* Placement Strategy & Interview Insights */}
      <div className="dsa-insights-card">
        <div className="insights-header">
          <Award size={20} color="var(--primary-action)" />
          <h3>Placement Strategy & Interview Insights</h3>
        </div>

        <div className="insights-grid">
          <div className="insight-column">
            <div className="insight-badge do">
              <CheckCircle size={15} /> What You Should DO
            </div>
            <ul className="insight-bullets">
              <li>
                <strong>Perform the Counter-Example Test:</strong> Always try to construct an edge case where picking the immediate local optimum creates future regret. If no counter-example exists, proceed greedily.
              </li>
              <li>
                <strong>Check if Sorting Helps:</strong> Sorting in <KaTeXMath math="\mathcal{O}(N \log N)" /> converts an uncertain future into a known monotonic sequence, eliminating 90% of greedy traps.
              </li>
              <li>
                <strong>State the Invariant to the Interviewer:</strong> Explicitly state: <em>"I maintain the invariant that reach stores the maximum reachable index so far."</em>
              </li>
            </ul>
          </div>

          <div className="insight-column">
            <div className="insight-badge avoid">
              <AlertOctagon size={15} /> What You Should AVOID
            </div>
            <ul className="insight-bullets">
              <li>
                <strong>Never Jump into Blind Recursion / DP:</strong> Writing memoized recursion for problems like Jump Game indicates an inability to detect linear invariant structures.
              </li>
              <li>
                <strong>Never Track Useless State:</strong> In Lemonade Change, never create a counter for ₹20 bills; they cannot be used as change.
              </li>
              <li>
                <strong>Watch for Integer Division Bugs:</strong> When calculating ratios like <code>item.value / item.weight</code>, always cast to <code>double</code> before division.
              </li>
            </ul>
          </div>
        </div>

        {/* The Next Practical Step Card */}
        <div className="next-step-callout">
          <div className="next-step-header">
            <ArrowRight size={16} color="var(--primary-action)" />
            <strong>Your Next Practical Step: Jump Game II (LeetCode 45)</strong>
          </div>
          <p>
            Extend the exact same <code>reach</code> framework to calculate the <strong>minimum number of jumps</strong> to reach the end index. Instead of tracking one variable, maintain two boundaries: <code>currentEnd</code> (current jump range) and <code>farthest</code>. When <KaTeXMath math="i == \text{currentEnd}" />, increment jumps and update <KaTeXMath math="\text{currentEnd} = \text{farthest}" />!
          </p>
        </div>
      </div>

      {/* Practice Problems: Homework Solutions */}
      <div className="dsa-homework-section" style={{ marginTop: '2.5rem' }}>
        <div className="section-title-bar">
          <BookOpen size={18} color="var(--primary-action)" />
          <h3>Practice Problems: End-of-Video Homework</h3>
        </div>

        {/* HW 1 */}
        <div className="homework-item-card">
          <div className="homework-header" onClick={() => toggleHomework('hw1')}>
            <div className="homework-title-wrap">
              <span className="hw-number">1</span>
              <div>
                <h4 className="hw-title">Jump Game II (LeetCode 45)</h4>
                <span className="hw-subtitle">Greedy BFS Interval Exploration &bull; Return Minimum Jumps</span>
              </div>
            </div>
            <button type="button" className="hw-toggle-btn">
              {openHomework.hw1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {openHomework.hw1 && (
            <div className="homework-drawer-body">
              <p>
                <strong>Problem Statement:</strong> Return the minimum number of jumps to reach index <KaTeXMath math="N - 1" />. You can always assume the last index is reachable.
              </p>
              <div className="hw-steps-list">
                <p>1. Track <code>jumps = 0</code>, <code>currentEnd = 0</code>, and <code>farthest = 0</code>.</p>
                <p>2. Loop from <KaTeXMath math="i = 0" /> to <KaTeXMath math="N - 2" /> (stop before the last index).</p>
                <p>3. Update <code>farthest = Math.max(farthest, i + nums[i])</code>.</p>
                <p>4. When <KaTeXMath math="i == \text{currentEnd}" />, increment jumps and set <code>currentEnd = farthest</code>.</p>
              </div>
              <CodeBlock code={jumpGame2Code} language="java" title="Jump Game II (O(N) Time, O(1) Space)" />
            </div>
          )}
        </div>

        {/* HW 2 */}
        <div className="homework-item-card">
          <div className="homework-header" onClick={() => toggleHomework('hw2')}>
            <div className="homework-title-wrap">
              <span className="hw-number">2</span>
              <div>
                <h4 className="hw-title">Gas Station / Circular Tour (LeetCode 134)</h4>
                <span className="hw-subtitle">Total Gas Invariant &bull; Greedy Start Reset</span>
              </div>
            </div>
            <button type="button" className="hw-toggle-btn">
              {openHomework.hw2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {openHomework.hw2 && (
            <div className="homework-drawer-body">
              <p>
                <strong>Problem Statement:</strong> Given gas and cost arrays along a circle, find the starting station index to complete the clockwise circuit, or return -1.
              </p>
              <div className="hw-steps-list">
                <p>1. If <KaTeXMath math="\sum \text{gas} < \sum \text{cost}" />, completing the circuit is impossible &rarr; return -1.</p>
                <p>2. Greedily track <code>currentTank</code>. Whenever <code>currentTank &lt; 0</code>, the current station (and all previous stations) cannot be the starting point! Reset <code>start = i + 1</code> and <code>currentTank = 0</code>.</p>
              </div>
              <CodeBlock code={gasStationCode} language="java" title="Gas Station (O(N) Time, O(1) Space)" />
            </div>
          )}
        </div>
      </div>

      {/* Quick Formula & Concept Cheat Sheet Table */}
      <div className="dsa-cheatsheet-section" style={{ marginTop: '2.5rem' }}>
        <div className="section-title-bar">
          <FileCheck2 size={18} color="var(--primary-action)" />
          <h3>Quick Formula & Concept Cheat Sheet</h3>
        </div>

        <div className="table-responsive-wrapper">
          <table className="dsa-styled-table">
            <thead>
              <tr>
                <th>Problem / Concept</th>
                <th>Core Invariant / Mathematical Rule</th>
                <th>Time Complexity</th>
                <th>Auxiliary Space</th>
                <th>Placement Interview Tip</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Greedy Choice Property</strong></td>
                <td><KaTeXMath math="\text{Local Optimum} \implies \text{Global Optimum}" /></td>
                <td><KaTeXMath math="\mathcal{O}(N) \text{ or } \mathcal{O}(N \log N)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>Prove no counter-example exists before writing code.</td>
              </tr>
              <tr>
                <td><strong>Sorting Invariant</strong></td>
                <td>Sort to eliminate future uncertainty</td>
                <td><KaTeXMath math="\mathcal{O}(N \log N)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>90% of greedy OA problems require sorting the array first.</td>
              </tr>
              <tr>
                <td><strong>Lemonade Change (LC 860)</strong></td>
                <td>Dispense ₹10 + ₹5 first; save flexible ₹5 bills</td>
                <td><KaTeXMath math="\mathcal{O}(N)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>Never track ₹20 bills; they cannot be used as change.</td>
              </tr>
              <tr>
                <td><strong>Assign Cookies (LC 455)</strong></td>
                <td>Match smallest viable cookie to least greedy child</td>
                <td><KaTeXMath math="\mathcal{O}(N \log N + M \log M)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>Two-pointer traversal advances greedily.</td>
              </tr>
              <tr>
                <td><strong>Jump Game (LC 55)</strong></td>
                <td><KaTeXMath math="\text{reach} = \max(\text{reach}, i + \text{nums}[i])" /></td>
                <td><KaTeXMath math="\mathcal{O}(N)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>Do NOT use DP; single linear pass covers all towns.</td>
              </tr>
              <tr>
                <td><strong>Jump Game II (LC 45)</strong></td>
                <td>Increment jumps when <KaTeXMath math="i == \text{currentEnd}" /></td>
                <td><KaTeXMath math="\mathcal{O}(N)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>Loop terminates at index <KaTeXMath math="N - 2" />.</td>
              </tr>
              <tr>
                <td><strong>Fractional Knapsack</strong></td>
                <td>Sort descending by <KaTeXMath math="\text{Ratio} = \frac{\text{Value}}{\text{Weight}}" /></td>
                <td><KaTeXMath math="\mathcal{O}(N \log N)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>Cast to <code>double</code> to avoid integer division truncation.</td>
              </tr>
              <tr>
                <td><strong>Gas Station (LC 134)</strong></td>
                <td>Reset <code>start = i + 1</code> whenever <code>currentTank &lt; 0</code></td>
                <td><KaTeXMath math="\mathcal{O}(N)" /></td>
                <td><KaTeXMath math="\mathcal{O}(1)" /></td>
                <td>If <KaTeXMath math="\sum \text{gas} \ge \sum \text{cost}" />, unique start always exists.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
