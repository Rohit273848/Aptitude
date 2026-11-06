import { SubjectArea } from '../types/syllabus';

export const syllabusData: SubjectArea[] = [
  // ==========================================
  // FOUNDATION SECTION
  // ==========================================
  {
    id: 'foundation-numerical-ability',
    title: 'Numerical Ability',
    section: 'Foundation',
    difficulty: 'Easy–Medium',
    description: 'Core arithmetic, numbers, basic mensuration, and quantitative interpretation tested in the TCS NQT Foundation section.',
    groups: [
      {
        id: 'group-number-system',
        title: 'Number System',
        topics: [
          {
            id: 'number-system-lcm-hcf',
            title: 'Number System, LCM & HCF',
            status: 'ready',
            noteFile: 'Numarical/NumberSystem+LCM&HCF.md',
            summary: 'Number theory fundamentals, prime distribution counts (1-50, 51-100, 101-200), LCM/HCF of fractions & decimals, ratio multipliers, and periodic simultaneous events.',
            formulaCount: 14,
            exampleCount: 8
          },
          {
            id: 'divisibility',
            title: 'Divisibility',
            status: 'needed'
          },
          {
            id: 'numbers-decimal-fractions',
            title: 'Numbers & Decimal Fractions',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-mensuration',
        title: 'Mensuration',
        topics: [
          {
            id: 'geometry-foundation',
            title: 'Geometry',
            status: 'needed'
          },
          {
            id: 'area-shapes-perimeter',
            title: 'Area, Shapes & Perimeter',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-arithmetic-ability',
        title: 'Arithmetic Ability',
        topics: [
          {
            id: 'percentages',
            title: 'Percentages',
            status: 'ready',
            noteFile: 'Numarical/Percentage.md',
            summary: '27 master formulas covering basic percentage, increase/decrease, successive changes, ratio comparisons, population/votes, and profit/discount percentages.',
            formulaCount: 27,
            exampleCount: 16
          },
          {
            id: 'allegations-and-mixtures',
            title: 'Allegations and Mixtures',
            status: 'ready',
            noteFile: 'Numarical/Ratio&Proportion+Mixtures&Partnership.md',
            summary: 'Untouched component invariants, dilution formulas, and ratio replacement mechanics.',
            formulaCount: 12,
            exampleCount: 8
          },
          {
            id: 'ratios-proportion',
            title: 'Ratios, Proportion',
            status: 'ready',
            noteFile: 'Numarical/Ratio&Proportion+Mixtures&Partnership.md',
            summary: 'Ratio combination grid, hide method, unit scalers, mean/third/fourth proportions, coin problems, partnership profit distributions, and age difference invariance.',
            formulaCount: 16,
            exampleCount: 12
          },
          {
            id: 'work-and-time',
            title: 'Work and Time',
            status: 'ready',
            noteFile: 'Numarical/Time&Work+Pipes&Cisterns+LCM&HCF.md',
            summary: '6 complete modules covering efficiency model, 3-step LCM workflow, 2/3/4-worker combined rates, fractional work, continuous worker deduction, and pipes & cisterns.',
            formulaCount: 16,
            exampleCount: 12
          },
          {
            id: 'speed-time-and-distance',
            title: 'Speed, Time and Distance',
            status: 'ready',
            noteFile: 'Numarical/Time,Speed&Distance+Boats&Streams.md',
            summary: '12 complete modules including train crossings, relative speed framework, chasing & meeting problems, logical differential method, ratio proportionality, average speed harmonic mean, and boats & streams.',
            formulaCount: 16,
            exampleCount: 14
          },
          {
            id: 'profit-and-loss',
            title: 'Profit and Loss',
            status: 'ready',
            noteFile: 'Numarical/Profit,Loss&Discount.md',
            summary: '7 complete modules covering Golden Ratio MP/CP equation, column cross-simplification for successive discounts, Buy X Get Y Free retail schemes, article parity LCM method, budget price-quantity inversion, and stock split weighted averages.',
            formulaCount: 13,
            exampleCount: 13
          },
          {
            id: 'averages',
            title: 'Averages',
            status: 'needed'
          },
          {
            id: 'equations',
            title: 'Equations',
            status: 'needed'
          },
          {
            id: 'ages',
            title: 'Ages',
            status: 'needed'
          },
          {
            id: 'series-and-progressions',
            title: 'Series and Progressions',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-elementary-statistics',
        title: 'Elementary Statistics',
        topics: [
          {
            id: 'mean-median-mode-variance-std',
            title: 'Mean, Median, Mode, Variance, and Standard Deviation',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-data-interpretation',
        title: 'Data Interpretation',
        topics: [
          {
            id: 'pie-charts',
            title: 'Pie Charts',
            status: 'needed'
          },
          {
            id: 'tabular-di',
            title: 'Tabular DI',
            status: 'needed'
          },
          {
            id: 'graphical-di',
            title: 'Graphical DI',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-simplifications',
        title: 'Simplifications & Approximations',
        topics: [
          {
            id: 'simplifications-and-calculations',
            title: 'Simplifications and Calculations (Rational and Irrational Numbers)',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-other-topics',
        title: 'Other topics',
        topics: [
          {
            id: 'probability-foundation',
            title: 'Probability',
            status: 'needed',
            tag: 'Not asked in past two years'
          },
          {
            id: 'clocks-and-calendar',
            title: 'Clocks & Calendar',
            status: 'needed',
            tag: 'Not asked in past two years'
          }
        ]
      }
    ]
  },
  {
    id: 'foundation-reasoning-ability',
    title: 'Reasoning Ability',
    section: 'Foundation',
    difficulty: 'Medium',
    description: 'Logical deductions, patterns, analytical puzzles, and spatial reasoning for the TCS NQT Foundation section.',
    groups: [
      {
        id: 'group-identifying-word',
        title: 'Identifying Word',
        topics: [
          {
            id: 'word-pattern',
            title: 'Word Pattern',
            status: 'needed'
          },
          {
            id: 'letter-series',
            title: 'Letter Series',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-numeric-patterns',
        title: 'Numeric Patterns',
        topics: [
          {
            id: 'number-series',
            title: 'Number Series',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-problem-solving',
        title: 'Problem Solving',
        topics: [
          {
            id: 'seating-arrangements',
            title: 'Seating Arrangements',
            status: 'needed'
          },
          {
            id: 'coding-decoding',
            title: 'Coding–Decoding',
            status: 'needed'
          },
          {
            id: 'blood-relations',
            title: 'Blood Relations',
            status: 'needed'
          },
          {
            id: 'directional-sense',
            title: 'Directional Sense',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-figural-analysis',
        title: 'Figural and Factual Analysis',
        topics: [
          {
            id: 'cube-folding-paper-cuts',
            title: 'Cube Folding, Paper Cuts and Folds',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-decision-making',
        title: 'Decision Making',
        topics: [
          {
            id: 'statement-and-conclusion',
            title: 'Statement and Conclusion',
            status: 'needed'
          },
          {
            id: 'syllogism',
            title: 'Syllogism',
            status: 'needed'
          },
          {
            id: 'data-sufficiency',
            title: 'Data Sufficiency',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-propositional-reasoning',
        title: 'Propositional Reasoning',
        topics: [
          {
            id: 'logical-venn-diagram-di',
            title: 'Logical Venn Diagram Based DI',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-visual-spatial',
        title: 'Visual/Spatial Reasoning',
        topics: [
          {
            id: 'visual-reasoning',
            title: 'Visual Reasoning',
            status: 'needed'
          }
        ]
      }
    ]
  },
  {
    id: 'foundation-verbal-ability',
    title: 'Verbal Ability',
    section: 'Foundation',
    difficulty: 'Easy–Medium',
    description: 'English grammar, vocabulary in context, sentence structure, and reading comprehension.',
    groups: [
      {
        id: 'group-english-grammar',
        title: 'English Grammar',
        topics: [
          {
            id: 'word-completion',
            title: 'Word Completion',
            status: 'needed'
          },
          {
            id: 'sentence-completion',
            title: 'Sentence Completion',
            status: 'needed'
          },
          {
            id: 'error-identification',
            title: 'Error Identification',
            status: 'needed'
          },
          {
            id: 'arrangement',
            title: 'Arrangement',
            status: 'needed'
          },
          {
            id: 'formal-informal-sentences',
            title: 'Formal or Informal Sentences, Sentence Joining',
            status: 'needed'
          },
          {
            id: 'meanings',
            title: 'Meanings',
            status: 'needed'
          }
        ]
      },
      {
        id: 'group-reading-comprehension',
        title: 'Reading Comprehension',
        topics: [
          {
            id: 'reading-comprehension',
            title: 'Reading Comprehension',
            status: 'needed'
          }
        ]
      }
    ]
  },

  // ==========================================
  // ADVANCE SECTION
  // ==========================================
  {
    id: 'advance-quantitative-ability',
    title: 'Advanced Quantitative Ability',
    section: 'Advance',
    difficulty: 'Hard',
    description: 'Higher-level quantitative topics requiring multi-step algebraic formulations and fast mental arithmetic.',
    groups: [
      {
        id: 'group-advanced-quant',
        title: 'Advanced Quantitative Topics',
        topics: [
          { id: 'adv-averages', title: 'Averages', status: 'needed' },
          { id: 'adv-profit-loss', title: 'Profit Loss', status: 'needed' },
          { id: 'adv-hcf-lcm', title: 'HCF LCM', status: 'needed' },
          { id: 'adv-permutation-combination', title: 'Permutation and Combination', status: 'needed' },
          { id: 'adv-probability', title: 'Probability', status: 'needed' },
          { id: 'adv-geometry', title: 'Geometry', status: 'needed' },
          { id: 'adv-mensuration', title: 'Mensuration', status: 'needed' },
          { id: 'adv-puzzles', title: 'Puzzles', status: 'needed' },
          { id: 'adv-partnership', title: 'Partnership', status: 'needed' },
          { id: 'adv-number-system', title: 'Number System', status: 'needed' },
          { id: 'adv-time-work', title: 'Time & Work', status: 'needed' },
          { id: 'adv-time-speed-distance', title: 'Time, Speed, Distance', status: 'needed' },
          { id: 'adv-simple-compound-interest', title: 'Simple & Compound Interest', status: 'needed' },
          { id: 'adv-progressions', title: 'Progressions', status: 'needed' },
          { id: 'adv-logarithms', title: 'Logarithms', status: 'needed' }
        ]
      }
    ]
  },
  {
    id: 'advance-reasoning-ability',
    title: 'Advanced Reasoning Ability',
    section: 'Advance',
    difficulty: 'Hard',
    description: 'Complex data arrangements, syllogisms, spatial puzzles, and deductive logic questions.',
    groups: [
      {
        id: 'group-advanced-reasoning',
        title: 'Advanced Reasoning Topics',
        topics: [
          { id: 'adv-data-arrangements', title: 'Data Arrangements', status: 'needed' },
          { id: 'adv-visual-reasoning', title: 'Visual Reasoning', status: 'needed' },
          { id: 'adv-venn-diagrams', title: 'Venn Diagrams', status: 'needed' },
          { id: 'adv-syllogisms', title: 'Syllogisms', status: 'needed' },
          { id: 'adv-statement-assumption', title: 'Statement Assumption', status: 'needed' },
          { id: 'adv-statement-conclusion', title: 'Statement Conclusion', status: 'needed' },
          { id: 'adv-seating-arrangements', title: 'Seating Arrangements', status: 'needed' },
          { id: 'adv-spatial-reasoning', title: 'Spatial Reasoning', status: 'needed' },
          { id: 'adv-puzzles-reasoning', title: 'Puzzles', status: 'needed' },
          { id: 'adv-cuts-folds-cubes', title: 'Cuts, Folds, Cubes-based questions', status: 'needed' }
        ]
      }
    ]
  },
  // ==========================================
  // DATA STRUCTURES & ALGORITHMS (DSA) SECTION
  // ==========================================
  {
    id: 'dsa-data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    section: 'DSA',
    difficulty: 'Medium–Hard',
    description: 'Core DSA concepts, data structures, algorithmic paradigms, time-space complexities, and coding interview preparation.',
    groups: [
      {
        id: 'group-dsa-linear',
        title: 'Linear Data Structures & Foundations',
        topics: [
          {
            id: 'dsa-programming-fundamentals',
            title: 'Programming Fundamentals',
            status: 'needed',
            noteFile: 'DSA/Programming_Fundamentals.md',
            summary: 'Language syntax, memory structure (stack vs heap), pointers, references, time & space complexities, asymptotic Big-O notations.'
          },
          {
            id: 'dsa-number-system-mathematics',
            title: 'Number System and Mathematics',
            status: 'needed',
            noteFile: 'DSA/Number_System_and_Mathematics.md',
            summary: 'Bitwise operations (bitmasks, XOR tricks), prime checking & Sieve of Eratosthenes, Euclidean GCD/LCM, modular arithmetic, fast exponentiation.'
          },
          {
            id: 'dsa-arrays',
            title: 'Arrays',
            status: 'needed',
            noteFile: 'DSA/Arrays.md',
            summary: 'Static and dynamic arrays, prefix sums, sliding window, two-pointer techniques, Kadane algorithm, Dutch National Flag, 2D matrix traversal.'
          },
          {
            id: 'dsa-strings',
            title: 'Strings',
            status: 'needed',
            noteFile: 'DSA/Strings.md',
            summary: 'String immutability & ASCII manipulation, frequency count arrays, anagrams, palindromic substrings, sliding window strings, KMP string matching.'
          },
          {
            id: 'dsa-searching-and-sorting',
            title: 'Searching and Sorting',
            status: 'needed',
            noteFile: 'DSA/Searching_and_Sorting.md',
            summary: 'Linear and Binary Search (search on answer monotonic predicate), Bubble, Selection, Insertion, Merge Sort, Quick Sort, Counting Sort.'
          },
          {
            id: 'dsa-hashing',
            title: 'Hashing',
            status: 'needed',
            noteFile: 'DSA/Hashing.md',
            summary: 'Hash tables & direct address tables, collision resolution (chaining, open addressing), frequency maps, prefix sum hash map pattern.'
          },
          {
            id: 'dsa-recursion-and-backtracking',
            title: 'Recursion and Backtracking',
            status: 'needed',
            noteFile: 'DSA/Recursion_and_Backtracking.md',
            summary: 'Recursion trees, call stack, base cases, recurrence relations, subset generation, permutations, N-Queens problem, Sudoku solver.'
          },
          {
            id: 'dsa-stack-and-queue',
            title: 'Stack and Queue',
            status: 'needed',
            noteFile: 'DSA/Stack_and_Queue.md',
            summary: 'LIFO & FIFO primitives, monotonic stacks (Next Greater Element, largest rectangle in histogram), circular queues, min/max stack, deque.'
          },
          {
            id: 'dsa-linked-list',
            title: 'Linked List',
            status: 'needed',
            noteFile: 'DSA/Linked_List.md',
            summary: 'Singly, doubly, and circular linked lists, in-place reversal, Floyd cycle detection (slow & fast pointers), merge sorted lists, LRU Cache.'
          }
        ]
      },
      {
        id: 'group-dsa-trees',
        title: 'Binary Trees (9-Part Master Series)',
        topics: [
          {
            id: 'dsa-trees-01-introduction',
            title: 'Trees 01: Why Trees Matter & Core Intuition',
            status: 'ready',
            noteFile: 'DSA/Trees_01_Introduction.md',
            summary: 'Episode 01 (Padho with Pratyush): Why Trees are the gateway to high-paying jobs, Indian Politics hierarchy analogy (PM, Ministers, IAS), Linked List vs Binary Tree memory pointers, TreeBasics Java code, and the 6 master tree patterns.',
            formulaCount: 3,
            exampleCount: 2
          },
          {
            id: 'dsa-trees-02-tree-traversals',
            title: 'Trees 02: Tree Traversals (Dadaji & Chocolate Analogy)',
            status: 'ready',
            noteFile: 'DSA/Trees_02_Tree_Traversals.md',
            summary: "Episode 02 (Padho with Pratyush): The 'Dadaji & Chocolate' family tree analogy, 3-step invariant (Left -> Self -> Right), recursion call stack dry run (output: 2 4 1 3), Java TreeTraversals code, and LeetCode 94/144/145 templates.",
            formulaCount: 3,
            exampleCount: 3
          },
          {
            id: 'dsa-trees-03-level-order-traversal',
            title: 'Trees 03: Level Order Traversal (BFS & Queue Template)',
            status: 'ready',
            noteFile: 'DSA/Trees_03_Level_Order_Traversal.md',
            summary: "Episode 03 (Padho with Pratyush): Horizontal generations analogy, cinema ticket line Queue intuition (FIFO), universal levelSize = q.size() template, LeetCode 102, Zigzag array trick (LC 103), and LC 107.",
            formulaCount: 3,
            exampleCount: 3
          },
          {
            id: 'dsa-trees-04-tree-symmetry-pattern',
            title: 'Trees 04: Tree Symmetry & The 5-Point Matching Template',
            status: 'ready',
            noteFile: 'DSA/Trees_04_Tree_Symmetry_Pattern.md',
            summary: 'Episode 04 (Padho with Pratyush): The 5-point universal structural comparison template, 3-node mental model, LeetCode 100 (Same Tree), LeetCode 101 (Symmetric Tree with Mirror Twist), and NPE prevention heuristics.',
            formulaCount: 3,
            exampleCount: 2
          },
          {
            id: 'dsa-trees-05-symmetrical-tree',
            title: 'Trees 05: Symmetrical Binary Trees',
            status: 'ready',
            noteFile: 'DSA/Trees_05_Symmetrical_Tree.md',
            summary: 'Episode 05 (Padho with Pratyush): Checking for symmetrical mirror binary trees (LeetCode 101). Cross-branch dual-node recursion (t1.left <-> t2.right) and iterative BFS queue pair verification.',
            formulaCount: 2,
            exampleCount: 2
          },
          {
            id: 'dsa-trees-06-tree-height-problems',
            title: 'Trees 06: 3 Tree Height Problems',
            status: 'ready',
            noteFile: 'DSA/Trees_06_Tree_Height_Problems.md',
            summary: 'Episode 06 (Padho with Pratyush): 3 foundational tree height challenges: LeetCode 104 (Max Depth), LeetCode 111 (Min Depth with skewed leaf trap), and LeetCode 110 (Balanced Binary Tree with O(N) bottom-up sentinel -1 return).',
            formulaCount: 4,
            exampleCount: 3
          },
          {
            id: 'dsa-trees-07-lca',
            title: 'Trees 07: Lowest Common Ancestor (LCA)',
            status: 'ready',
            noteFile: 'DSA/Trees_07_LCA.md',
            summary: 'Episode 07 (Padho with Pratyush): Lowest Common Ancestor in Binary Tree (LeetCode 236). Postorder bubble-up mechanics, divergence fork logic (left != null && right != null), and self-ancestor edge cases.',
            formulaCount: 3,
            exampleCount: 2
          },
          {
            id: 'dsa-trees-08-diameter-complete-tree',
            title: 'Trees 08: Diameter & Complete Binary Tree',
            status: 'ready',
            noteFile: 'DSA/Trees_08_Diameter_Complete_Tree.md',
            summary: 'Episode 12 (Padho with Pratyush): Single-pass O(N) Diameter of Binary Tree (LeetCode 543) and Complete Binary Tree validation (LeetCode 958) using the BFS null-marker queue invariant.',
            formulaCount: 3,
            exampleCount: 2
          },
          {
            id: 'dsa-trees-09-path-sum',
            title: 'Trees 09: Path Sum Problems',
            status: 'ready',
            noteFile: 'DSA/Trees_09_Path_Sum.md',
            summary: 'Episode 11 (Padho with Pratyush): Mastering root-to-leaf and subpath patterns: LeetCode 112 (Path Sum I), LeetCode 113 (Backtracking Path Sum II), and LeetCode 437 (Linear O(N) Prefix Sum Hash Map).',
            formulaCount: 4,
            exampleCount: 3
          }
        ]
      },
      {
        id: 'group-dsa-bst-advanced',
        title: 'Binary Search Trees & Advanced Topics',
        topics: [
          {
            id: 'dsa-binary-search-trees',
            title: 'Binary Search Trees (BST)',
            status: 'ready',
            noteFile: 'DSA/Binary_Search_Trees.md',
            summary: 'Separate Standalone BST Module: Strict order invariants (Left < Root < Right), search/insert/delete (3 cases with inorder successor), range propagation validation (LeetCode 98), O(H) BST LCA (LeetCode 235), and Kth smallest element.',
            formulaCount: 6,
            exampleCount: 3
          },
          {
            id: 'dsa-graphs',
            title: 'Graphs',
            status: 'needed',
            noteFile: 'DSA/Graphs.md',
            summary: 'Adjacency list & matrix representations, BFS & DFS, cycle detection (directed & undirected), topological sort (Kahn algorithm), Dijkstra shortest path, Disjoint Set Union (DSU).'
          },
          {
            id: 'dsa-greedy-algorithms',
            title: 'Greedy Algorithms',
            status: 'ready',
            noteFile: 'DSA/Greedy_Algorithms.md',
            summary: 'Core intuition & the Regret (Pachtawa) test, Lemonade Change (LC 860), Assign Cookies (LC 455), Jump Game (LC 55) reach invariants, Fractional Knapsack unitary method, Gas Station & Interval Scheduling.',
            formulaCount: 8,
            exampleCount: 6
          },
          {
            id: 'dsa-dynamic-programming',
            title: 'Dynamic Programming',
            status: 'needed',
            noteFile: 'DSA/Dynamic_Programming.md',
            summary: 'Optimal substructure & overlapping subproblems, memoization vs tabulation, 0/1 Knapsack, Longest Common Subsequence (LCS), Longest Increasing Subsequence (LIS), Coin Change.'
          }
        ]
      }
    ]
  },
  // ==========================================
  // SYSTEM DESIGN (HLD) SECTION
  // ==========================================
  {
    id: 'system-design-hld',
    title: 'System Design (HLD)',
    section: 'System Design',
    difficulty: 'Medium–Hard',
    description: 'High-Level System Architecture, Distributed Systems, Scalability, Storage, Communication Protocols, and Placement Case Studies.',
    groups: [
      {
        id: 'group-hld-fundamentals',
        title: 'Core Architecture & Fundamentals',
        topics: [
          {
            id: 'hld-foundations',
            title: '1. Foundations: The 9 Core Principles & Blueprint',
            status: 'ready',
            noteFile: 'SystemDesign/Foundations.md',
            summary: 'The 40-story building analogy, HLD vs LLD, client-server restaurant analogy, Delhi-to-Patna trade-off matrix, the 9 non-functional principles, and the SBI vs Instagram case study.',
            formulaCount: 5,
            exampleCount: 4
          },
          {
            id: 'hld-scaling-the-application',
            title: '2. Scaling the Application',
            status: 'needed',
            noteFile: 'SystemDesign/Scaling_the_Application.md',
            summary: 'Load Balancers (L4 vs L7, round-robin, least connections, consistent hashing), Stateless architecture, session management (JWT vs Redis), and autoscaling.'
          },
          {
            id: 'hld-storing-data',
            title: '3. Storing Data',
            status: 'needed',
            noteFile: 'SystemDesign/Storing_Data.md',
            summary: 'Relational (SQL) vs Non-Relational (NoSQL), Database Replication (Master-Slave, Multi-Master), Sharding & Partitioning strategies, ACID vs BASE guarantees.'
          },
          {
            id: 'hld-making-it-fast',
            title: '4. Making It Fast',
            status: 'needed',
            noteFile: 'SystemDesign/Making_It_Fast.md',
            summary: 'Caching tiers (Client, CDN, Server, DB), Caching strategies (Cache-aside, Read/Write-through, Write-back), Eviction policies (LRU, LFU), and Connection pooling.'
          },
          {
            id: 'hld-how-systems-communicate',
            title: '5. How Systems Communicate',
            status: 'needed',
            noteFile: 'SystemDesign/How_Systems_Communicate.md',
            summary: 'Synchronous vs Asynchronous communication, REST vs gRPC vs GraphQL, WebSockets, Server-Sent Events (SSE), and Message Queues (Kafka vs RabbitMQ).'
          },
          {
            id: 'hld-distributed-systems',
            title: '6. Distributed Systems',
            status: 'needed',
            noteFile: 'SystemDesign/Distributed_Systems.md',
            summary: 'CAP Theorem, PACELC, Distributed Consensus (Raft, Paxos), Clock Drift, Leader Election, Distributed Locking (Redlock), and Idempotency.'
          },
          {
            id: 'hld-running-systems-in-production',
            title: '7. Running Systems in Production',
            status: 'needed',
            noteFile: 'SystemDesign/Running_Systems_in_Production.md',
            summary: 'Observability (Metrics, Logs, Distributed Tracing), Health Checks, Circuit Breaker pattern, Rate Limiting, Graceful Degradation, Disaster Recovery, and SLAs/SLOs.'
          },
          {
            id: 'hld-interview-playbook',
            title: '8. Interview Playbook',
            status: 'needed',
            noteFile: 'SystemDesign/Interview_Playbook.md',
            summary: 'The 4-Step System Design Interview Framework: Scope & Requirements Clarification, High-Level Architecture, Deep-Dive Design, Bottlenecks & Scale.'
          }
        ]
      },
      {
        id: 'group-hld-case-studies',
        title: 'High-Level Design Case Studies',
        topics: [
          {
            id: 'hld-url-shortener',
            title: '9. Case Studies: Design a URL Shortener',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_URL_Shortener.md',
            summary: 'High-concurrency URL shortener (TinyURL/Bitly): 100M DAU, Base62 encoding vs MD5 collisions, KGS (Key Generation Service), Redis caching, and 301 vs 302 redirects.'
          },
          {
            id: 'hld-rate-limiter',
            title: '10. Case Studies: Design a Rate Limiter',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_Rate_Limiter.md',
            summary: 'Distributed API rate limiter: Token Bucket, Leaky Bucket, Sliding Window Log/Counter, Redis sorted sets (ZSET), distributed race conditions, and HTTP 429 Too Many Requests.'
          },
          {
            id: 'hld-chat-app',
            title: '11. Case Studies: Design a Chat App',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_Chat_App.md',
            summary: 'Real-time messaging system (WhatsApp/Slack): Persistent WebSockets, Message sync across devices, Online presence servers, Message ordering with sequence IDs, and Push notifications.'
          },
          {
            id: 'hld-news-feed',
            title: '12. Case Studies: Design a News Feed',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_News_Feed.md',
            summary: 'Social media news feed (Twitter/Facebook/Instagram): Feed generation architectures, Fan-out on Write (Push) vs Fan-out on Read (Pull), Hybrid model for celebrities, and Ranking algorithms.'
          },
          {
            id: 'hld-video-streaming',
            title: '13. Case Studies: Design a Video Streaming Platform',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_Video_Streaming_Platform.md',
            summary: 'Large-scale video streaming (YouTube/Netflix): Video chunking and ingestion, Transcoding pipelines (DAG), Adaptive Bitrate Streaming (HLS/DASH), CDN caching, and Blob storage.'
          },
          {
            id: 'hld-ticket-booking',
            title: '14. Case Studies: Design a Ticket Booking System',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_Ticket_Booking_System.md',
            summary: 'High-concurrency booking platform (BookMyShow/IRCTC): Race condition prevention, Pessimistic vs Optimistic locking, Distributed Saga transactions, Temporary seat reservation timers, and Fair queues.'
          },
          {
            id: 'hld-ride-sharing',
            title: '15. Case Studies: Design a Ride-Sharing App',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_Ride_Sharing_App.md',
            summary: 'Real-time geospatial dispatch (Uber/Lyft): QuadTrees vs Geohash vs Uber H3 hexagonal indexing, Driver location tracking, Matching algorithms, Dynamic surge pricing, and ETA calculation.'
          },
          {
            id: 'hld-payment-system',
            title: '16. Case Studies: Design a Payment System',
            status: 'needed',
            noteFile: 'SystemDesign/Design_a_Payment_System.md',
            summary: 'Fault-tolerant financial transactions (Stripe/PayPal): Exactly-once processing with Idempotency keys, Double-entry bookkeeping ledger, Payment gateway reconciliation, and Two-Phase Commit / Saga.'
          }
        ]
      }
    ]
  }
];

export function findTopicById(topicId: string) {
  for (const subject of syllabusData) {
    if (subject.id === topicId) {
      return {
        topic: {
          id: subject.id,
          title: subject.title,
          status: 'needed' as const,
          summary: subject.description
        },
        group: { id: `${subject.id}-general`, title: 'General Overview', topics: [] },
        subject
      };
    }
    for (const group of subject.groups) {
      const found = group.topics.find(t => t.id === topicId);
      if (found) {
        return {
          topic: found,
          group,
          subject
        };
      }
    }
  }
  return null;
}

export function getAllTopics() {
  const topics: { topic: any; group: any; subject: any }[] = [];
  for (const subject of syllabusData) {
    for (const group of subject.groups) {
      for (const topic of group.topics) {
        topics.push({ topic, group, subject });
      }
    }
  }
  return topics;
}
