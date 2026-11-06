import greedyAlgorithmsRaw from './dsaNotes/greedy-algorithms.md?raw';
import trees01IntroRaw from './dsaNotes/trees-01-introduction.md?raw';
import trees02TraversalsRaw from './dsaNotes/trees-02-tree-traversals.md?raw';
import trees03LevelOrderRaw from './dsaNotes/trees-03-level-order-traversal.md?raw';
import trees04SymmetryRaw from './dsaNotes/trees-04-tree-symmetry-pattern.md?raw';
import trees05SymmetricTreeRaw from './dsaNotes/trees-05-symmetrical-tree.md?raw';
import trees06HeightRaw from './dsaNotes/trees-06-tree-height-problems.md?raw';
import trees07LcaRaw from './dsaNotes/trees-07-lca.md?raw';
import trees08DiameterRaw from './dsaNotes/trees-08-diameter-complete-tree.md?raw';
import trees09PathSumRaw from './dsaNotes/trees-09-path-sum.md?raw';
import bstRaw from './dsaNotes/binary-search-trees.md?raw';

export interface DryRunStep {
  stepNumber: number;
  title: string;
  explanation: string;
  state: Record<string, any>;
  pointers?: Record<string, number>;
  highlightedIndices?: number[];
  badge?: string;
  isSuccess?: boolean;
  isFailure?: boolean;
}

export interface DSAProblemMeta {
  id: string;
  title: string;
  platform: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  dryRunType: 'cash-register' | 'two-pointer' | 'jump-reach' | 'fractional-knapsack' | 'custom';
  presetScenarios: {
    name: string;
    description: string;
    input: any;
    steps: DryRunStep[];
  }[];
}

export interface DSATopicData {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  problemCount: number;
  topicsCovered: string[];
  summary: string;
  markdownContent: string;
  problems: DSAProblemMeta[];
}

export const dsaRegistry: Record<string, DSATopicData> = {
  // ========================================================
  // GREEDY ALGORITHMS
  // ========================================================
  'dsa-greedy-algorithms': {
    id: 'dsa-greedy-algorithms',
    title: 'Greedy Algorithms',
    slug: 'greedy-algorithms',
    category: 'Algorithmic Paradigms',
    difficulty: 'Medium',
    estimatedTime: '45 mins',
    problemCount: 4,
    topicsCovered: [
      'The Core Rule of Greedy & The Chaiwala Analogy',
      'The Regret (Pachtawa) Test: Greedy vs Dynamic Programming',
      'Problem 1: Lemonade Change (LeetCode 860)',
      'Problem 2: Assign Cookies (LeetCode 455)',
      'Problem 3: Jump Game (LeetCode 55)',
      'Problem 4: Fractional Knapsack (Standard Interview Problem)',
      'Interview Heuristics & Next Step: Jump Game II (LeetCode 45)'
    ],
    summary:
      'Master the Greedy algorithmic paradigm from first principles: the Chaiwala cash register analogy, the Buffet regret test, decision matrices, and 4 complete LeetCode & placement interview problems with step-by-step logic, dry-run traces, and production Java implementations.',
    markdownContent: greedyAlgorithmsRaw,
    problems: [
      {
        id: 'lemonade-change',
        title: 'Lemonade Change',
        platform: 'LeetCode 860',
        difficulty: 'Easy',
        summary:
          'Return true if you can provide every lemonade customer exact change using only collected ₹5 and ₹10 bills.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        dryRunType: 'cash-register',
        presetScenarios: [
          {
            name: 'Standard Line [5, 5, 5, 10, 20]',
            description: 'Greedy saving of ₹5 notes pays off when customer pays ₹20.',
            input: [5, 5, 5, 10, 20],
            steps: [
              {
                stepNumber: 0,
                title: 'Initial State',
                explanation: 'Register is empty. Starting cash: five = 0, ten = 0. Customer queue: [5, 5, 5, 10, 20].',
                state: { five: 0, ten: 0, currentBill: null, changeNeeded: 0, result: 'Running' },
                badge: 'Start'
              },
              {
                stepNumber: 1,
                title: 'Customer 1: Pays ₹5',
                explanation: 'Cost is ₹5. Change needed = ₹0. Put ₹5 note into register: five = 1.',
                state: { five: 1, ten: 0, currentBill: 5, changeNeeded: 0, result: 'Running' },
                highlightedIndices: [0],
                badge: 'five++'
              },
              {
                stepNumber: 2,
                title: 'Customer 2: Pays ₹5',
                explanation: 'Cost is ₹5. Change needed = ₹0. Put ₹5 note into register: five = 2.',
                state: { five: 2, ten: 0, currentBill: 5, changeNeeded: 0, result: 'Running' },
                highlightedIndices: [1],
                badge: 'five++'
              },
              {
                stepNumber: 3,
                title: 'Customer 3: Pays ₹5',
                explanation: 'Cost is ₹5. Change needed = ₹0. Put ₹5 note into register: five = 3.',
                state: { five: 3, ten: 0, currentBill: 5, changeNeeded: 0, result: 'Running' },
                highlightedIndices: [2],
                badge: 'five++'
              },
              {
                stepNumber: 4,
                title: 'Customer 4: Pays ₹10',
                explanation: 'Cost is ₹5. Return ₹5 change. Deduct one ₹5 note and add one ₹10 note: five = 2, ten = 1.',
                state: { five: 2, ten: 1, currentBill: 10, changeNeeded: 5, result: 'Running' },
                highlightedIndices: [3],
                badge: 'five--, ten++'
              },
              {
                stepNumber: 5,
                title: 'Customer 5: Pays ₹20 (The Greedy Moment)',
                explanation:
                  'Greedy Choice Priority: Give one ₹10 and one ₹5 first! ten = 0, five = 1. Success! All customers served.',
                state: { five: 1, ten: 0, currentBill: 20, changeNeeded: 15, result: 'true' },
                highlightedIndices: [4],
                badge: 'SUCCESS',
                isSuccess: true
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================
  // TREES 9-PART MASTER SERIES (PADHO WITH PRATYUSH)
  // ========================================================
  'dsa-trees-01-introduction': {
    id: 'dsa-trees-01-introduction',
    title: 'Trees 01: Why Trees Matter & Core Intuition',
    slug: 'trees-01-introduction',
    category: 'Binary Trees',
    difficulty: 'Easy',
    estimatedTime: '25 mins',
    problemCount: 2,
    topicsCovered: [
      'Why Trees are the Gateway to High-Paying Jobs (90% Quit at Arrays)',
      'The Indian Politics Analogy: PM, Ministers, IAS Officers & Reporting Hierarchy',
      'Essential Tree Terminologies: Node, Root, Children, Parent, Leaf (Patte)',
      'Binary Tree & Memory Representation (Linked List vs. Binary Tree Pointers)',
      'Complete Java Code: TreeNode Definition & TreeBasics Navigation',
      'Linked List vs. Binary Tree Quick Comparison Table',
      'The 6 Master Patterns of Trees (Traversal, Mirror, Search, Validation, Path Sum, Construction)',
      'Actionable Placement & Career Takeaways (Pune/Sambhajinagar Placement Tips)'
    ],
    summary:
      'Episode 01 of Padho with Pratyush Tree Series: Why Trees are the gateway to high-paying jobs, the Indian Politics hierarchy analogy (PM, HM/FM, IAS), memory representation (Linked List vs Binary Tree), TreeBasics Java code, and the 6 master tree patterns.',
    markdownContent: trees01IntroRaw,
    problems: []
  },

  'dsa-trees-02-tree-traversals': {
    id: 'dsa-trees-02-tree-traversals',
    title: 'Trees 02: Tree Traversals (The Dadaji & Chocolate Analogy)',
    slug: 'trees-02-tree-traversals',
    category: 'Binary Trees',
    difficulty: 'Easy–Medium',
    estimatedTime: '30 mins',
    problemCount: 3,
    topicsCovered: [
      "Core Intuition: The 'Dadaji & Chocolate' Family Tree Analogy",
      'The 3 Invariant Steps: Left Child -> Self -> Right Child',
      'Step-by-Step Dry Run of the Chocolate Movement (Eating = Printing)',
      'The 3 Traversal Rules: Preorder (Pehle), Inorder (Beech mein), Postorder (Baad mein)',
      'Recursion Call Stack Trace on Number Tree (Output: 2 4 1 3)',
      'Complete Java Implementation: Console Print & LeetCode Return List<Integer>',
      'Complexity Analysis: Time O(N) & Space O(H) Call Stack',
      'Actionable Placement Tips: 80% of Tree Problems are Traversals in Disguise'
    ],
    summary:
      'Episode 02 of the Master Tree Series: Master Inorder, Preorder, and Postorder traversals via the intuitive Dadaji & Chocolate family tree analogy, recursion call stack traces, Java production code, and LeetCode 94/144/145 templates.',
    markdownContent: trees02TraversalsRaw,
    problems: []
  },

  'dsa-trees-03-level-order-traversal': {
    id: 'dsa-trees-03-level-order-traversal',
    title: 'Trees 03: Level Order Traversal (BFS Intuition & Template)',
    slug: 'trees-03-level-order-traversal',
    category: 'Binary Trees',
    difficulty: 'Medium',
    estimatedTime: '35 mins',
    problemCount: 3,
    topicsCovered: [
      'Core Intuition: What is Level Order Traversal? (Horizontal Generations Analogy)',
      'Why Recursion Fails & Why We Need a Queue (FIFO / Cinema Ticket Line Analogy)',
      'C++ Queue vs. Java Queue Syntax Cheat Sheet',
      'Problem 1: Binary Tree Level Order Traversal (LeetCode 102)',
      'The Master Algorithm Template: int levelSize = q.size() Magic Trick',
      'Complete Step-by-Step Queue Dry Run (Cycles 1, 2, and 3)',
      'Problem 2: Binary Tree Zigzag Level Order Traversal (LeetCode 103)',
      'The Two-Pointer In-Place Array Trick (leftToRight = 1 - leftToRight)',
      'Bonus: Binary Tree Level Order Traversal II (LeetCode 107 in 1 Line)',
      'Actionable Placement Takeaways & 15+ Solvable Interview Problems'
    ],
    summary:
      'Episode 03 of the Master Tree Series: Master Breadth-First Search (BFS) and Level Order Traversal via the horizontal generations analogy, cinema ticket queue mental model, universal levelSize snapshot template, LeetCode 102, Zigzag (LC 103), and Level Order II (LC 107).',
    markdownContent: trees03LevelOrderRaw,
    problems: []
  },

  'dsa-trees-04-tree-symmetry-pattern': {
    id: 'dsa-trees-04-tree-symmetry-pattern',
    title: 'Trees 04: Tree Symmetry & The 5-Point Matching Template',
    slug: 'trees-04-tree-symmetry-pattern',
    category: 'Binary Trees',
    difficulty: 'Easy–Medium',
    estimatedTime: '30 mins',
    problemCount: 2,
    topicsCovered: [
      'Pattern Identification: When to Use the Dual-Tree Symmetry Pattern',
      'The Golden Rule of Thinking: Always Imagine a 3-Node Tree',
      'The 5-Point Universal Decision Matrix (3 Base Checks + 2 Recursive Steps)',
      'Problem 1: Same Tree (LeetCode 100)',
      'Structural Mismatch Call Stack Trace (Tricky Example)',
      'Problem 2 (Bonus Homework): Symmetric Tree (LeetCode 101 — The Mirror Twist)',
      'The NullPointerException Safety Chain (Evaluation Order Invariant)'
    ],
    summary:
      'Episode 04 of Padho with Pratyush Tree Series: The 5-point universal structural comparison template, 3-node mental model, LeetCode 100 (Same Tree), LeetCode 101 (Symmetric Tree with Mirror Twist), and NPE prevention heuristics.',
    markdownContent: trees04SymmetryRaw,
    problems: []
  },

  'dsa-trees-05-symmetrical-tree': {
    id: 'dsa-trees-05-symmetrical-tree',
    title: 'Trees 05: Symmetrical Binary Trees',
    slug: 'trees-05-symmetrical-tree',
    category: 'Binary Trees',
    difficulty: 'Easy',
    estimatedTime: '30 mins',
    problemCount: 2,
    topicsCovered: [
      'The Mirror Reflection Paradigm & Central Vertical Axis',
      'The Dual-Node Crossing Rule (t1.left <-> t2.right & t1.right <-> t2.left)',
      'Check for Symmetrical Binary Tree (LeetCode 101) [Recursive DFS]',
      'Check for Symmetrical Binary Tree (LeetCode 101) [Iterative BFS Queue Pairs]',
      'The SameTree vs MirrorTree Interview Blunder'
    ],
    summary:
      'Episode 05 of Padho with Pratyush Tree Series: Master LeetCode 101 (Symmetric Tree). Understand mirror reflection duality, dual recursion with branch crossing, and iterative BFS queue pair verification.',
    markdownContent: trees05SymmetricTreeRaw,
    problems: []
  },

  'dsa-trees-06-tree-height-problems': {
    id: 'dsa-trees-06-tree-height-problems',
    title: 'Trees 06: 3 Tree Height & Depth Problems',
    slug: 'trees-06-tree-height-problems',
    category: 'Binary Trees',
    difficulty: 'Medium',
    estimatedTime: '40 mins',
    problemCount: 3,
    topicsCovered: [
      'The Height Invariant: 1 + max(leftHeight, rightHeight)',
      'Maximum Depth of Binary Tree (LeetCode 104)',
      'Minimum Depth of Binary Tree (LeetCode 111) [The Skewed Tree Leaf Trap]',
      'Balanced Binary Tree (LeetCode 110) [The Optimal O(N) Sentinel -1 Pattern]',
      'BFS Early Exit for Minimum Depth'
    ],
    summary:
      'Episode 06 of Padho with Pratyush Tree Series: Master 3 fundamental tree height problems—LeetCode 104 (Max Depth), LeetCode 111 (Min Depth with skewed leaf safeguard), and LeetCode 110 (Balanced Binary Tree with O(N) sentinel -1 bottom-up short-circuiting).',
    markdownContent: trees06HeightRaw,
    problems: []
  },

  'dsa-trees-07-lca': {
    id: 'dsa-trees-07-lca',
    title: 'Trees 07: Lowest Common Ancestor (LCA)',
    slug: 'trees-07-lca',
    category: 'Binary Trees',
    difficulty: 'Medium',
    estimatedTime: '40 mins',
    problemCount: 2,
    topicsCovered: [
      'Formal Definition of Lowest Common Ancestor (LCA)',
      'The Family Tree Divergence Fork Analogy',
      'The Postorder Bubble-Up Protocol & 4-Way Decision Matrix',
      'Lowest Common Ancestor of a Binary Tree (LeetCode 236)',
      'Self-Ancestor Edge Case (p is Parent of q)',
      'Binary Tree LCA O(N) vs BST LCA O(H)'
    ],
    summary:
      'Episode 07 of Padho with Pratyush Tree Series: Master LeetCode 236 (Lowest Common Ancestor in Binary Tree). Deep-dive into postorder bubble-up mechanics, the fork convergence invariant, and self-ancestor edge cases.',
    markdownContent: trees07LcaRaw,
    problems: []
  },

  'dsa-trees-08-diameter-complete-tree': {
    id: 'dsa-trees-08-diameter-complete-tree',
    title: 'Trees 08: Diameter & Complete Binary Tree',
    slug: 'trees-08-diameter-complete-tree',
    category: 'Binary Trees',
    difficulty: 'Medium',
    estimatedTime: '40 mins',
    problemCount: 2,
    topicsCovered: [
      'Longest Path Invariant: leftHeight + rightHeight through node X',
      'Diameter of Binary Tree (LeetCode 543) [Optimal O(N) Bottom-Up DFS]',
      'Complete Binary Tree (CBT) Structural Definition',
      'Check Completeness of a Binary Tree (LeetCode 958) [BFS Null-Marker Pattern]',
      'Diameter Edges vs Nodes Definition Trap'
    ],
    summary:
      'Episode 12 of Padho with Pratyush Tree Series: Master LeetCode 543 (Diameter of Binary Tree) in single-pass O(N) time and LeetCode 958 (Check Complete Binary Tree) using the BFS null-marker queue invariant.',
    markdownContent: trees08DiameterRaw,
    problems: []
  },

  'dsa-trees-09-path-sum': {
    id: 'dsa-trees-09-path-sum',
    title: 'Trees 09: Path Sum Problems',
    slug: 'trees-09-path-sum',
    category: 'Binary Trees',
    difficulty: 'Medium',
    estimatedTime: '45 mins',
    problemCount: 3,
    topicsCovered: [
      'The 3-Tier Path Sum Framework (Decision, Collection & Arbitrary Subpaths)',
      'Path Sum I (LeetCode 112) [Target Subtraction Invariant]',
      'Path Sum II (LeetCode 113) [Backtracking add-recurse-remove Pattern]',
      'Path Sum III (LeetCode 437) [Linear O(N) Prefix Sum Hash Map Optimization]',
      'Binary Tree Maximum Path Sum (LeetCode 124 Preview)',
      'Deep Copying & Defensive Backtracking in Trees'
    ],
    summary:
      'Episode 11 of Padho with Pratyush Tree Series: Master the complete Path Sum progression—LeetCode 112 (Boolean Decision), LeetCode 113 (Backtracking Path Collection), and LeetCode 437 (Linear O(N) Prefix Sum Map).',
    markdownContent: trees09PathSumRaw,
    problems: []
  },

  // ========================================================
  // BINARY SEARCH TREES (STANDALONE SEPARATE MODULE)
  // ========================================================
  'dsa-binary-search-trees': {
    id: 'dsa-binary-search-trees',
    title: 'Binary Search Trees (BST)',
    slug: 'binary-search-trees',
    category: 'Binary Search Trees',
    difficulty: 'Medium',
    estimatedTime: '45 mins',
    problemCount: 3,
    topicsCovered: [
      'The Strict BST Invariant: LeftSubtree < Root < RightSubtree',
      'The Inorder Monotonicity Theorem (BST Inorder is Strictly Sorted)',
      'Core Operations: Search, Insertion & 3 Deletion Cases (Inorder Successor)',
      'Validate Binary Search Tree (LeetCode 98) [Range Propagation (min, max)]',
      'Lowest Common Ancestor in BST (LeetCode 235) [O(H) Value Branching]',
      'Kth Smallest Element in a BST (LeetCode 230)',
      'Integer Overflow Trap with Long Bounds'
    ],
    summary:
      'Separate Standalone Master Notes on Binary Search Trees (BST): Master the strict BST ordering invariant, validate BSTs with range propagation (LeetCode 98), O(H) Lowest Common Ancestor (LeetCode 235), and in-order Kth smallest element extraction.',
    markdownContent: bstRaw,
    problems: []
  }
};

export function getDSATopicById(topicId: string): DSATopicData | null {
  // Legacy alias support: 'dsa-trees' forwards to Part 01
  if (topicId === 'dsa-trees') {
    return dsaRegistry['dsa-trees-01-introduction'] || null;
  }
  return dsaRegistry[topicId] || null;
}

export function getAllDSATopics(): DSATopicData[] {
  return Object.values(dsaRegistry);
}
