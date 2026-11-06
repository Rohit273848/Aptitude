import React, { useState, useEffect, useMemo } from 'react';
import { getDSATopicById } from '../../data/dsaRegistry';
import { DSAHeader } from '../../components/dsa/DSAHeader';
// import { VerticalTimelineNav } from '../../components/dsa/VerticalTimelineNav';
import { ExplanationBlock } from '../../components/dsa/ExplanationBlock';
import { ProblemCard, ProblemCardData } from '../../components/dsa/ProblemCard';
import { DryRunVisualizer } from '../../components/dsa/DryRunVisualizer';
import { RevisionPanel } from '../../components/dsa/RevisionPanel';
import { MarkdownRenderer } from '../../components/dsa/MarkdownRenderer';
import { KaTeXMath } from '../../components/KaTeXMath';
import {
  BookOpen,
  Code2,
  FileText,
  Sparkles,
  CheckCircle,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  Layers,
  ArrowRight,
  ArrowUp,
  Award,
  LayoutDashboard
} from 'lucide-react';

interface DSANotesPageProps {
  topicId?: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onGoHome?: () => void;
}

export const DSANotesPage: React.FC<DSANotesPageProps> = ({
  topicId = 'dsa-greedy-algorithms',
  isCompleted,
  onToggleComplete,
  onGoHome
}) => {
  const topic = getDSATopicById(topicId);
  const isGreedy = topic?.id === 'dsa-greedy-algorithms';
  const [expandAll, setExpandAll] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'markdown'>(isGreedy ? 'interactive' : 'markdown');

  useEffect(() => {
    setViewMode(isGreedy ? 'interactive' : 'markdown');
  }, [topicId, isGreedy]);

  if (!topic) {
    return (
      <div className="dsa-empty-state">
        <AlertCircle size={40} color="var(--secondary-accent)" />
        <h3>DSA Topic Notes Not Found</h3>
        <p>No verified notes exist for topic ID: <code>{topicId}</code>.</p>
      </div>
    );
  }

  // Structured problem data for the 4 problems
  const problem1Data: ProblemCardData = {
    id: 'lemonade-change',
    problemNumber: 1,
    title: 'Lemonade Change',
    platform: 'LeetCode 860',
    difficulty: 'Easy',
    summary:
      'Selling lemonade for ₹5 each. Customers line up with ₹5, ₹10, or ₹20 bills. You start with zero cash. Return true if you can give exact change to every customer, or false immediately when unable.',
    analogyTitle: 'Analogy & The Dead Asset Principle',
    analogyContent: (
      <div>
        <p>
          You only maintain registers for <code>five = 0</code> and <code>ten = 0</code>.
          Why? A <strong>₹20 bill cannot be used to return change</strong> for ₹5 or ₹15. It is a dead asset in your cash register: <em>"₹20 kisi kaam ka nahi hai change dene ke liye."</em>
        </p>
      </div>
    ),
    steps: [
      {
        number: 1,
        title: 'Customer pays ₹5',
        description: 'Change needed = ₹0. Put it into the register: five++.',
        badge: 'five++'
      },
      {
        number: 2,
        title: 'Customer pays ₹10',
        description: 'Must return ₹5 change. If five == 0, return false immediately! Otherwise: five-- and ten++.',
        badge: 'five--, ten++'
      },
      {
        number: 3,
        title: 'Customer pays ₹20 (The Greedy Priority)',
        description:
          'Must return ₹15 change. Choice 1 (Greedy Priority): Give one ₹10 and one ₹5 (ten--, five--). Always try this first to save flexible ₹5 bills! Choice 2 (Fallback): Give three ₹5 bills (five -= 3) only if ten == 0. If neither works, return false.',
        badge: 'Greedy Priority: ₹10 + ₹5'
      }
    ],
    dryRunTitle: 'Dry Run: Greedy Priority vs. Bad Choice',
    dryRunHeaders: ['Strategy', 'Action Taken', 'Pocket State', 'Next Customer (Pays ₹10, Needs ₹5)', 'Result'],
    dryRunRows: [
      [
        <strong style={{ color: '#EF4444' }}>Bad Choice (Waste ₹5s)</strong>,
        'Give three ₹5 notes',
        'ten = 1, five = 0',
        'Needs ₹5, but five == 0',
        <span style={{ color: '#EF4444', fontWeight: 700 }}>❌ FAIL (false)</span>
      ],
      [
        <strong style={{ color: 'var(--primary-action)' }}>Greedy Choice (Save ₹5s)</strong>,
        'Give one ₹10 + one ₹5',
        'ten = 0, five = 2',
        'Needs ₹5, gives one ₹5 (five = 1)',
        <span style={{ color: 'var(--primary-action)', fontWeight: 700 }}>✅ SUCCESS (true)</span>
      ]
    ],
    javaCode: `class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0; // Tracks count of ₹5 notes
        int ten = 0;  // Tracks count of ₹10 notes (₹20 track karne ki zarurat nahi hai)

        for (int i = 0; i < bills.length; i++) {
            int money = bills[i];

            if (money == 5) {
                five++; // ₹5 mila, seedha jeb mein rakho
            } else if (money == 10) {
                if (five == 0) {
                    return false; // ₹5 wapas karne ke liye chillar nahi hai
                }
                five--;
                ten++;
            } else { // money == 20 (Need to return ₹15 change)
                // Choice 1 (Greedy): Try giving one ₹10 and one ₹5 first
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } 
                // Choice 2 (Fallback): Give three ₹5 notes
                else if (five >= 3) {
                    five -= 3;
                } 
                // Neither choice possible
                else {
                    return false;
                }
            }
        }
        return true;
    }
}`,
    timeComplexity: '\\mathcal{O}(N)',
    spaceComplexity: '\\mathcal{O}(1)',
    timeExplanation: 'Single linear scan through the customer bills array.',
    spaceExplanation: 'Only two integer register variables (five, ten) maintained in memory.',
    interviewTrap:
      'Never create a counter for ₹20 bills. It serves zero purpose in giving change and clutters your state.'
  };

  const problem2Data: ProblemCardData = {
    id: 'assign-cookies',
    problemNumber: 2,
    title: 'Assign Cookies',
    platform: 'LeetCode 455',
    difficulty: 'Easy',
    summary:
      'Given greed factors of children child[i] and cookie sizes cookie[j], find the maximum number of children that can be content. Each child can receive at most one cookie.',
    analogyTitle: 'The Task Analogy',
    analogyContent: (
      <div>
        <p>
          If your goal is to finish maximum tasks today, you don't start with a heavy 2.5-hour workout and faint. You finish small, quick tasks first: take a bath, eat breakfast, walk (3 tasks &gt; 1 task).
        </p>
      </div>
    ),
    steps: [
      {
        number: 1,
        title: 'Sort both arrays ascending',
        description:
          'Jis bacche ka lalach (greed) sabse kam hai, usko khush karna sabse aasan hai. Giving a 4kg cookie to a child who wanted 1kg wastes capacity that could satisfy a hungrier child later.',
        badge: 'Arrays.sort()'
      },
      {
        number: 2,
        title: 'Two-pointer traversal',
        description:
          'Place pointer i = 0 on child, j = 0 on cookie. If cookie[j] >= child[i]: child is happy! result++, i++, j++. If cookie[j] < child[i]: this cookie cannot satisfy child i, nor any hungrier child ahead. Advance j++ to find a bigger cookie.',
        badge: 'i on child, j on cookie'
      }
    ],
    dryRunTitle: 'Dry Run: child = [1, 3, 5], cookie = [2, 4]',
    dryRunHeaders: ['Step', 'Child Pointer (i)', 'Cookie Pointer (j)', 'Condition (cookie[j] >= child[i])', 'Action Taken', 'Result'],
    dryRunRows: [
      ['1', 'i = 0 (Wants 1)', 'j = 0 (Size 2)', '2 >= 1 (True)', 'Give 2kg to Child 0. i++, j++', 'result = 1'],
      ['2', 'i = 1 (Wants 3)', 'j = 1 (Size 4)', '4 >= 3 (True)', 'Give 4kg to Child 1. i++, j++', 'result = 2'],
      ['3', 'i = 2 (Wants 5)', 'j = 2 (Out of bounds)', 'Cookie array exhausted', 'Terminate traversal', 'Final = 2']
    ],
    javaCode: `import java.util.Arrays;

class Solution {
    public int findContentChildren(int[] child, int[] cookie) {
        // Step 1: Sort both arrays in ascending order
        Arrays.sort(child);
        Arrays.sort(cookie);

        int i = 0; // Pointer for children
        int j = 0; // Pointer for cookies
        int result = 0;

        // Step 2: Two-pointer traversal
        while (i < child.length && j < cookie.length) {
            if (cookie[j] >= child[i]) {
                result++; // Child is satisfied
                i++;      // Move to next child
                j++;      // Cookie consumed, move to next cookie
            } else {
                // Cookie too small for current child; try a larger cookie
                j++;
            }
        }
        return result;
    }
}`,
    timeComplexity: '\\mathcal{O}(N \\log N + M \\log M)',
    spaceComplexity: '\\mathcal{O}(1)',
    timeExplanation: 'Dominated by sorting child (length N) and cookie (length M). Traversal is linear O(N + M).',
    spaceExplanation: 'In-place two-pointer traversal with zero extra allocations.',
    interviewTrap:
      'Always sort both arrays first. Without sorting, matching cannot be performed in linear time.'
  };

  const problem3Data: ProblemCardData = {
    id: 'jump-game',
    problemNumber: 3,
    title: 'Jump Game',
    platform: 'LeetCode 55',
    difficulty: 'Medium',
    summary:
      'Given an array nums where nums[i] represents maximum jump distance from position i, determine if you can reach the last index starting at index 0.',
    analogyTitle: 'The Town Guide Analogy',
    analogyContent: (
      <div>
        <p>
          Each index <code>i</code> is a <strong>Town</strong>, and <code>nums[i]</code> is a local resident who knows routes up to <code>i + nums[i]</code> towns ahead. Walk town by town sequentially. Maintain <code>reach</code> (the furthest town you have verified knowledge to travel to).
        </p>
      </div>
    ),
    steps: [
      {
        number: 1,
        title: 'Check the Reach Invariant',
        description:
          'When entering Town i, check: Did I even have the knowledge to arrive here? If reach < i, you are in a DEAD END! Return false immediately.',
        badge: 'if (reach < i) return false'
      },
      {
        number: 2,
        title: 'Expand Knowledge Horizon',
        description:
          'Ask the town resident: reach = Math.max(reach, i + nums[i]). If reach >= n - 1, return true early!',
        badge: 'reach = Math.max(reach, i + nums[i])'
      }
    ],
    dryRunTitle: 'Trace Dry Run: Success vs. Dead End',
    dryRunHeaders: ['Input Array', 'Town (i)', 'nums[i]', 'Condition (reach < i)', 'Formula max(reach, i + nums[i])', 'Updated reach', 'Verdict'],
    dryRunRows: [
      ['[2, 3, 1, 1, 4]', '0', '2', '0 < 0 (False)', 'max(0, 0 + 2)', 'reach = 2', 'Valid'],
      ['[2, 3, 1, 1, 4]', '1', '3', '2 < 1 (False)', 'max(2, 1 + 3)', 'reach = 4', 'Destination Reached (true)'],
      ['[1, 0, 2]', '0', '1', '0 < 0 (False)', 'max(0, 0 + 1)', 'reach = 1', 'Valid'],
      ['[1, 0, 2]', '1', '0', '1 < 1 (False)', 'max(1, 1 + 0)', 'reach = 1', 'Valid'],
      ['[1, 0, 2]', '2', '2', '1 < 2 (TRUE)', 'Dead End! Cannot arrive', 'reach = 1', '❌ DEAD END (false)']
    ],
    javaCode: `class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        int reach = 0; // Furthest index reachable so far

        for (int i = 0; i < n; i++) {
            // Step 1: Check if we even had the reach to arrive at Town i
            if (reach < i) {
                return false; // Dead end! No path exists to reach index i
            }

            // Step 2: Ask the person in Town i how far they can send us
            reach = Math.max(reach, i + nums[i]);

            // Step 3: Early exit if we can already reach or surpass the final town
            if (reach >= n - 1) {
                return true;
            }
        }
        return true;
    }
}`,
    timeComplexity: '\\mathcal{O}(N)',
    spaceComplexity: '\\mathcal{O}(1)',
    timeExplanation: 'Single linear pass with early termination as soon as reach >= n - 1.',
    spaceExplanation: 'Only a single integer reach variable is maintained.',
    interviewTrap:
      'Never write exponential recursive DP for Jump Game. The single-pass reach invariant is optimal and tests greedy instinct.'
  };

  const problem4Data: ProblemCardData = {
    id: 'fractional-knapsack',
    problemNumber: 4,
    title: 'Fractional Knapsack',
    platform: 'GFG / Standard Interview Problem',
    difficulty: 'Medium',
    summary:
      'Given weights and values of N items and a knapsack of capacity W, find the maximum value possible. Items can be broken into arbitrary fractions.',
    analogyTitle: '0/1 Knapsack (DP) vs. Fractional Knapsack (Greedy)',
    analogyContent: (
      <div>
        <p>
          In <strong>0/1 Knapsack</strong>, items are indivisible (take whole or leave). Greedy fails because a heavy item leaves unused gap space. But in <strong>Fractional Knapsack</strong>, <em>aap item ko tod (break) sakte ho!</em> Just like Kesar (₹1000/g) vs Loha (₹10/g), pick items with highest unit price (Value / Weight) first!
        </p>
      </div>
    ),
    steps: [
      {
        number: 1,
        title: 'Calculate Unitary Price per 1 kg',
        description: 'Compute Ratio = Value / Weight for every item. Sort items descending by this ratio.',
        badge: 'Ratio = Value / Weight'
      },
      {
        number: 2,
        title: 'Greedy Bag Filling',
        description:
          'If remaining capacity >= item.weight, take the whole item! Otherwise, take the fractional amount: (Value / Weight) * remainingCapacity.',
        badge: 'Unitary Method Fraction'
      }
    ],
    dryRunTitle: 'Derivation Trace (Capacity W = 50 kg)',
    dryRunHeaders: ['Item', 'Value', 'Weight', 'Unit Ratio', 'Action Taken', 'Remaining Capacity', 'Total Value'],
    dryRunRows: [
      ['Item 1', '₹60', '10 kg', '6.0 ₹/kg', 'Take completely (10 kg)', '40 kg', '₹60'],
      ['Item 2', '₹100', '20 kg', '5.0 ₹/kg', 'Take completely (20 kg)', '20 kg', '₹160'],
      ['Item 3', '₹120', '30 kg', '4.0 ₹/kg', 'Break & take 20 kg: 4.0 * 20 = ₹80', '0 kg', '₹240 (Final)']
    ],
    javaCode: `import java.util.Arrays;

class Item {
    int value, weight;
    Item(int value, int weight) {
        this.value = value;
        this.weight = weight;
    }
}

class Solution {
    public double fractionalKnapsack(int capacity, Item[] items) {
        // Step 1: Sort items descending by (value / weight) ratio
        Arrays.sort(items, (a, b) -> {
            double r1 = (double) a.value / a.weight;
            double r2 = (double) b.value / b.weight;
            return Double.compare(r2, r1);
        });

        double totalValue = 0.0;
        int remainingCapacity = capacity;

        // Step 2: Pick items greedily
        for (Item item : items) {
            if (remainingCapacity == 0) break;

            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                double valuePerKg = (double) item.value / item.weight;
                totalValue += valuePerKg * remainingCapacity;
                remainingCapacity = 0;
            }
        }
        return totalValue;
    }
}`,
    timeComplexity: '\\mathcal{O}(N \\log N)',
    spaceComplexity: '\\mathcal{O}(1)',
    timeExplanation: 'Sorting items by unit price takes O(N log N). Greedy loop runs in linear O(N).',
    spaceExplanation: 'In-place sorting array with constant extra space.',
    interviewTrap:
      'Avoid integer truncation! Always cast to (double) when dividing item.value / item.weight.'
  };

  return (
    <div className="dsa-learning-page-container">
      {/* Top Header */}
      <DSAHeader
        title={topic.title}
        category={topic.category}
        difficulty={topic.difficulty}
        estimatedTime={topic.estimatedTime}
        problemCount={topic.problemCount}
        summary={topic.summary}
        sourceFile={`docs/dsa/${topic.slug}.md`}
        isCompleted={isCompleted}
        onToggleComplete={onToggleComplete}
        expandAll={expandAll}
        onToggleExpandAll={() => setExpandAll(prev => !prev)}
      />

      {/* View Mode Switcher: Only displayed for Greedy or when interactive components exist */}
      {isGreedy && (
        <div className="dsa-view-mode-bar">
          <div className="view-mode-tabs">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'interactive' ? 'active' : ''}`}
              onClick={() => setViewMode('interactive')}
            >
              <Sparkles size={15} />
              <span>Interactive Learning Platform</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'markdown' ? 'active' : ''}`}
              onClick={() => setViewMode('markdown')}
            >
              <FileText size={15} />
              <span>Raw GitHub Markdown Document</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Full-Width Learning Layout */}
      <div className="dsa-main-layout">
        {/* Center Main Learning Column - spans 100% full width */}
        <div className="dsa-center-content">
          {isGreedy && viewMode === 'interactive' ? (
            <>
              {/* Section 1: Core Intuition */}
              <section id="core-intuition" style={{ marginBottom: '2.5rem' }}>
                <div className="section-title-bar">
                  <Sparkles size={20} color="var(--primary-action)" />
                  <h2>1. Core Intuition & The Greedy Philosophy</h2>
                </div>
                <ExplanationBlock />
              </section>

              {/* Section 2: Problems Covered */}
              <section id="problems-section" style={{ marginBottom: '2.5rem' }}>
                <div className="section-title-bar">
                  <Code2 size={20} color="var(--primary-action)" />
                  <h2>2. Core Placement Coding Problems (Step-by-Step + Java)</h2>
                </div>

                <div className="problems-stack">
                  <ProblemCard data={problem1Data} isForceExpanded={expandAll} />
                  <ProblemCard data={problem2Data} isForceExpanded={expandAll} />
                  <ProblemCard data={problem3Data} isForceExpanded={expandAll} />
                  <ProblemCard data={problem4Data} isForceExpanded={expandAll} />
                </div>
              </section>

              {/* Section 3: Interactive Dry-Run Simulator */}
              <section id="interactive-visualizer" style={{ marginBottom: '2.5rem' }}>
                <DryRunVisualizer problems={topic.problems} />
              </section>

              {/* Section 4: Revision & Interview Takeaways */}
              <section id="revision-panel" style={{ marginBottom: '2.5rem' }}>
                <RevisionPanel />
              </section>
            </>
          ) : (
            /* Comprehensive Rendered Markdown Notes Mode */
            <div className="dsa-markdown-view-wrapper">
              <div className="markdown-source-banner">
                <FileText size={16} color="var(--primary-action)" />
                <span>
                  Viewing verified master notes from <code>docs/dsa/{topic.slug}.md</code>.
                </span>
              </div>
              <MarkdownRenderer content={topic.markdownContent} />
            </div>
          )}

          {/* Enhanced DSA Completion Card */}
          <div className={`dsa-completion-card ${isCompleted ? 'completed-state' : ''}`}>
            <div className="completion-card-glow" aria-hidden="true" />

            <div className="completion-badge-circle">
              {isCompleted ? (
                <CheckCircle2 size={32} className="completion-icon completed" />
              ) : (
                <Award size={32} className="completion-icon" />
              )}
            </div>

            <div className="completion-text-block">
              <div className="completion-status-pill">
                <Sparkles size={13} />
                <span>{isCompleted ? 'Topic Verified & Mastered' : 'Placement Milestone'}</span>
              </div>
              <h3 className="completion-headline">
                {isCompleted
                  ? `You've Mastered ${topic.title}! 🎉`
                  : `Ready to Conquer ${topic.title} in Interviews?`}
              </h3>
              <p className="completion-subtext">
                {isCompleted
                  ? `All core patterns, mathematical invariants, step-by-step dry runs, and verified Java implementations for ${topic.title} have been studied and recorded in your syllabus progress.`
                  : 'Mark this lesson as completed to record your hands-on placement preparation progress in your dashboard.'}
              </p>
            </div>

            {/* Achievement Highlights */}
            <div className="completion-highlights-row">
              <div className="highlight-pill">
                <Code2 size={13} color="var(--primary-action)" />
                <span>{topic.problemCount} Problems Mastered</span>
              </div>
              <div className="highlight-pill">
                <CheckCircle2 size={13} color="var(--primary-action)" />
                <span>Java Invariants Verified</span>
              </div>
              <div className="highlight-pill">
                <Sparkles size={13} color="var(--secondary-accent)" />
                <span>Placement Heuristics Ready</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="completion-actions-row">
              <button
                type="button"
                className={`dsa-completion-toggle-btn ${isCompleted ? 'completed' : ''}`}
                onClick={onToggleComplete}
              >
                <CheckCircle2 size={18} />
                <span>{isCompleted ? 'Completed & Mastered ✓' : 'Mark Topic as Completed'}</span>
              </button>

              <button
                type="button"
                className="dsa-secondary-action-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Scroll back to top of lesson"
              >
                <ArrowUp size={16} />
                <span>Back to Top</span>
              </button>

              {onGoHome && (
                <button
                  type="button"
                  className="dsa-secondary-action-btn"
                  onClick={onGoHome}
                  title="Return to Study Dashboard"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hover-Based Minimal Vertical Contents Timeline Navigation */}
      {/* <VerticalTimelineNav
        markdownContent={topic.markdownContent}
        topicTitle={topic.title}
      /> */}
    </div>
  );
};
