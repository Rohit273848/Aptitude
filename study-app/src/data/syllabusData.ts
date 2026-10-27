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
            status: 'needed'
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
            status: 'needed'
          },
          {
            id: 'ratios-proportion',
            title: 'Ratios, Proportion',
            status: 'needed'
          },
          {
            id: 'work-and-time',
            title: 'Work and Time',
            status: 'needed'
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
            status: 'needed'
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
  {
    id: 'advance-coding-ability',
    title: 'Advanced Coding Ability',
    section: 'Advance',
    difficulty: 'Hard',
    description: 'Programming logic, algorithm problem-solving, and coding implementation in C/C++, Java, or Python.',
    groups: [] // Intentionally empty: no invented topic list or lessons
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
