export interface RatioWorkedExample {
  id: string;
  module: number;
  title: string;
  question: string;
  steps: { title: string; math?: string; explanation?: string }[];
  finalAnswer: string;
}

export interface RatioModule {
  id: string;
  number: number;
  title: string;
  concepts: string[];
  formulas?: { name: string; math: string; note?: string }[];
  table?: { headers: string[]; rows: string[][] };
  examples: RatioWorkedExample[];
  callout?: { type: 'tip' | 'warning' | 'trap' | 'info'; title: string; content: string };
}

export interface RatioQuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RatioFormulaSheetItem {
  id: string;
  category: string;
  concept: string;
  math: string;
}

export interface RatioData {
  title: string;
  syllabusPath: string;
  subtitle: string;
  auditItems: { title: string; detail: string }[];
  formulaSheet: RatioFormulaSheetItem[];
  quizQuestions: RatioQuizQuestion[];
  modules: RatioModule[];
}

export const ratioData: RatioData = {
  title: "Ratio & Proportion, Mixtures & Partnership",
  syllabusPath: "Foundation > Numerical Ability > Arithmetic Ability > Ratios, Proportion",
  subtitle: "Master ratio combinations, hide method, unit scalers, mean/third/fourth proportion, constant age differences, and mixture invariants for TCS NQT.",

  auditItems: [
    {
      title: "1. The Invariant Difference Principle (Ages & Equal Subtractions)",
      detail: "When two quantities increase or decrease by the exact same amount (such as aging or subtracting 9 from both numbers), their difference remains invariant. Multiplying each ratio by the other's horizontal gap equalizes the units in seconds."
    },
    {
      title: "2. The Untouched Mixture Component Rule",
      detail: "When only one substance (e.g. water) is added to a solution, the pure quantity of the other ingredient (e.g. milk) does not change. Always normalize the ratio units of the untouched component before computing the added liquid volume."
    },
    {
      title: "3. Coin Problems Integer Paise Conversion",
      detail: "Always convert mixed currency (₹1, 50p, 25p) into pure integer paise (100p, 50p, 25p) and total money into paise. Working with decimals like 0.50 and 0.25 leads to frequent calculation mistakes under timed conditions."
    },
    {
      title: "4. Capital Scaling in Partnerships",
      detail: "In business partnership questions with large sums (e.g. ₹25,000, ₹6,000, ₹8,000), drop common thousands by dividing by 1000 at the outset to keep mental calculations fast and error-free."
    }
  ],

  formulaSheet: [
    { id: 'rp-f1', category: 'Fundamentals', concept: 'Simplest Form Condition', math: '\\text{HCF}(a, b) = 1' },
    { id: 'rp-f2', category: 'Combinations', concept: 'Grid Duplication', math: 'A:B = a:b,\\quad B:C = c:d \\implies A:B:C = ac : bc : bd' },
    { id: 'rp-f3', category: 'Combinations', concept: 'The Hide Method', math: 'aA = bB = cC \\implies A:B:C = bc : ac : ab' },
    { id: 'rp-f4', category: 'Division', concept: 'Unit Scaler (k)', math: 'k = \\frac{\\text{Total Actual Amount}}{\\sum \\text{Ratio Parts}}' },
    { id: 'rp-f5', category: 'Proportions', concept: 'Extremes and Means Identity', math: 'A : B :: C : D \\iff A \\times D = B \\times C' },
    { id: 'rp-f6', category: 'Proportions', concept: 'Mean Proportion', math: 'x = \\sqrt{a \\cdot b}' },
    { id: 'rp-f7', category: 'Proportions', concept: 'Third Proportion', math: 'x = \\frac{b^2}{a}' },
    { id: 'rp-f8', category: 'Proportions', concept: 'Fourth Proportion', math: 'x = \\frac{b \\cdot c}{a}' },
    { id: 'rp-f9', category: 'Coins', concept: 'Total Paise Value', math: '\\text{Value} = \\sum (\\text{Denomination}_p \\times \\text{Count})' },
    { id: 'rp-f10', category: 'Partnership', concept: 'Profit Distribution', math: 'P_A : P_B = (I_A \\times T_A) : (I_B \\times T_B)' },
    { id: 'rp-f11', category: 'Ages', concept: 'Age Gap Invariance', math: '\\text{Scale ratios by opposite horizontal differences}' },
    { id: 'rp-f12', category: 'Mixtures', concept: 'Untouched Component Rule', math: '\\text{Initial Untouched Units} = \\text{Final Untouched Units}' }
  ],

  quizQuestions: [
    {
      id: 1,
      topic: 'Ratio Combination',
      question: 'If A : B = 2 : 3 and B : C = 4 : 5, what is the combined ratio A : B : C?',
      options: [
        '6 : 7 : 8',
        '8 : 12 : 15',
        '8 : 10 : 15',
        '4 : 6 : 15'
      ],
      correctIndex: 1,
      explanation: 'Using the empty space duplication grid: A:B:C = (2 × 4) : (3 × 4) : (3 × 5) = 8 : 12 : 15.'
    },
    {
      id: 2,
      topic: 'Third Proportional',
      question: 'Find the third proportion to 4 and 6.',
      options: [
        '8',
        '9',
        '12',
        '10'
      ],
      correctIndex: 1,
      explanation: 'Third proportion to a and b is x = b^2 / a = 6^2 / 4 = 36 / 4 = 9.'
    },
    {
      id: 3,
      topic: 'Coins in a Bag',
      question: 'A bag contains ₹1, 50p, and 25p coins in the ratio 1 : 2 : 2. If the total value is ₹50, how many 50p coins are there?',
      options: [
        '20 coins',
        '30 coins',
        '40 coins',
        '50 coins'
      ],
      correctIndex: 2,
      explanation: 'In paise: 100(1k) + 50(2k) + 25(2k) = 250k paise = 5000 paise. k = 20. Number of 50p coins = 2k = 40 coins.'
    },
    {
      id: 4,
      topic: 'Partnership Time',
      question: 'The ratio of investments of A and B is 14 : 15, and the ratio of their profits is 2 : 5. If A invested for 3 months, for how long did B invest?',
      options: [
        '5 months',
        '6 months',
        '7 months',
        '8 months'
      ],
      correctIndex: 2,
      explanation: 'Profit ratio: (I_A × T_A) / (I_B × T_B) = P_A / P_B => (14 × 3) / (15 × T_B) = 2 / 5 => 42 / (15 T_B) = 2 / 5 => 30 T_B = 210 => T_B = 7 months.'
    },
    {
      id: 5,
      topic: 'Mixture Dilution',
      question: 'In a 60 L mixture, the ratio of milk to water is 2 : 1. How much water must be added so the ratio becomes 1 : 2?',
      options: [
        '30 L',
        '45 L',
        '60 L',
        '90 L'
      ],
      correctIndex: 2,
      explanation: 'Initial: 2:1 (Total = 3 units = 60 L => 1 unit = 20 L). Milk is untouched with 2 units. New target ratio is 1:2. Multiply by 2 => 2:4. Water increased from 1 to 4 units (+3 units). Added water = 3 × 20 = 60 L.'
    },
    {
      id: 6,
      topic: 'Homework Problem: Equal Subtraction',
      question: 'Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new ratio becomes 12 : 23. Find the smaller number.',
      options: [
        '27',
        '33',
        '45',
        '55'
      ],
      correctIndex: 1,
      explanation: 'Difference in 3:5 is 2. Difference in 12:23 is 11. Scale ratios by opposite differences: (3:5) × 11 = 33:55; (12:23) × 2 = 24:46. Vertical reduction = 33 - 24 = 9 units. Since actual decrease is 9, 1 unit = 1. Smaller number = 33 × 1 = 33.'
    }
  ],

  modules: [
    {
      id: "rp-mod-1",
      number: 1,
      title: "Fundamentals & Ratio Combination Techniques",
      concepts: [
        "Homogeneity rule: Ratios must compare quantities of the same physical type and identical units.",
        "Reduction & HCF: Taking a ratio divides out the HCF. In simplest form, HCF(a, b) = 1.",
        "Grid method: Propagate row neighbors sideways into blank cells to combine multi-variable ratios (A:B:C:D).",
        "Fractional ratios: Multiply each fraction by the LCM of all denominators to obtain clean integers.",
        "The Hide Method: For aA = bB = cC, hide each variable's coefficient and multiply the other two."
      ],
      formulas: [
        { name: "Grid Duplication", math: "A:B = 2:3,\\quad B:C = 4:5 \\implies A:B:C = 8:12:15" },
        { name: "Fractional Normalization", math: "\\frac{3}{4} : \\frac{5}{3} \\xrightarrow{\\times 12} 9 : 20" },
        { name: "Hide Method", math: "2A = 3B = 4C \\implies A:B:C = (3\\times 4) : (2\\times 4) : (2\\times 3) = 6:4:3" }
      ],
      callout: {
        type: 'tip',
        title: 'Empty Space Duplication',
        content: 'Never solve complex simultaneous fractions. Write the given ratios row by row, fill blank spaces with the adjacent horizontal number, and multiply the columns straight down!'
      },
      examples: [
        {
          id: "rp-ex-1-1",
          module: 1,
          title: "Multi-Term Ratio Combination (A:B:C:D)",
          question: "Given A:B = 2:3, B:C = 4:5, and C:D = 2:7, find A:B:C:D.",
          steps: [
            { title: "Set up the 4-column grid", explanation: "Row 1: 2, 3, [3], [3]; Row 2: [4], 4, 5, [5]; Row 3: [2], [2], 2, 7." },
            { title: "Multiply columns", math: "A = 2\\times 4\\times 2 = 16,\\quad B = 3\\times 4\\times 2 = 24,\\quad C = 3\\times 5\\times 2 = 30,\\quad D = 3\\times 5\\times 7 = 105" }
          ],
          finalAnswer: "16 : 24 : 30 : 105"
        },
        {
          id: "rp-ex-1-2",
          module: 1,
          title: "Equality to Ratio (The Hide Method)",
          question: "Convert 2A = 3B = 4C into the ratio A : B : C.",
          steps: [
            { title: "Cover each coefficient in turn", math: "A = 3 \\times 4 = 12,\\quad B = 2 \\times 4 = 8,\\quad C = 2 \\times 3 = 6" },
            { title: "Divide by common factor 2", math: "12 : 8 : 6 = 6 : 4 : 3" }
          ],
          finalAnswer: "6 : 4 : 3"
        }
      ]
    },
    {
      id: "rp-mod-2",
      number: 2,
      title: "Division of Amounts & The Unit Scaler Concept",
      concepts: [
        "Unit Scaler Method: Total Units = sum of ratio parts; 1 Unit = Total Actual Amount / Total Units.",
        "Fractional allocations: Convert fractional proportions to integer ratio before computing total units.",
        "Difference given: Focus solely on the ratio unit gap between the two specified entities."
      ],
      formulas: [
        { name: "Unit Scaler", math: "k = \\frac{\\text{Total Actual Amount}}{\\sum \\text{Ratio Parts}}" },
        { name: "Target Share", math: "\\text{Share} = \\text{Ratio Part} \\times k" }
      ],
      callout: {
        type: 'info',
        title: 'Difference Shortcuts',
        content: 'When a problem states "C gets ₹1000 more than D", do NOT calculate the grand total. The 1-unit ratio gap between C and D directly equals ₹1000!'
      },
      examples: [
        {
          id: "rp-ex-2-1",
          module: 2,
          title: "TCS NQT PYQ: Sum of Three Numbers is 98",
          question: "Sum of 3 numbers is 98. Ratio of 1st to 2nd is 2:3, and 2nd to 3rd is 5:8. Find the second number.",
          steps: [
            { title: "Merge ratios", math: "A:B:C = 10 : 15 : 24" },
            { title: "Total units", math: "10 + 15 + 24 = 49\\text{ units}" },
            { title: "Calculate 1 unit", math: "49\\text{ units} = 98 \\implies 1\\text{ unit} = 2" },
            { title: "Find second number (B)", math: "B = 15 \\times 2 = 30" }
          ],
          finalAnswer: "30"
        },
        {
          id: "rp-ex-2-2",
          module: 2,
          title: "TCS NQT PYQ: Fractional Money Division",
          question: "Divide ₹782 into three parts proportional to 1/2 : 2/3 : 3/4. Find the first part.",
          steps: [
            { title: "Integer ratio via LCM(2,3,4)=12", math: "6 : 8 : 9" },
            { title: "Total units", math: "6 + 8 + 9 = 23\\text{ units} = 782 \\implies 1\\text{ unit} = 34" },
            { title: "First part", math: "6 \\times 34 = ₹204" }
          ],
          finalAnswer: "₹204"
        }
      ]
    },
    {
      id: "rp-mod-3",
      number: 3,
      title: "Proportions & Option Elimination Tricks",
      concepts: [
        "Four terms in proportion: A:B :: C:D <=> A × D = B × C (Product of Extremes = Product of Means).",
        "Mean proportion: x = √(a · b); Third proportion: x = b² / a; Fourth proportion: x = (b · c) / a.",
        "Testing for added/subtracted x: Never expand quadratics algebraically; test options directly into (a+x)/(b+x) = (c+x)/(d+x)."
      ],
      formulas: [
        { name: "Extremes and Means", math: "A \\times D = B \\times C" },
        { name: "Mean Proportion", math: "x = \\sqrt{a \\cdot b}" },
        { name: "Third Proportion", math: "x = \\frac{b^2}{a}" },
        { name: "Fourth Proportion", math: "x = \\frac{b \\cdot c}{a}" }
      ],
      callout: {
        type: 'trap',
        title: 'Option Testing on Proportion',
        content: 'Cross-multiplying (7+x)(79+x) = (16+x)(43+x) creates tedious quadratic expansion. Test option values directly into the fractions for a 10-second solution!'
      },
      examples: [
        {
          id: "rp-ex-3-1",
          module: 3,
          title: "Mean, Third, and Fourth Proportional Formulations",
          question: "Find: (i) Mean prop of 20 & 5; (ii) Third prop to 4 & 6; (iii) Fourth prop to 12, 15, 16.",
          steps: [
            { title: "Mean proportion", math: "x = \\sqrt{20 \\times 5} = \\sqrt{100} = 10" },
            { title: "Third proportion", math: "x = \\frac{6^2}{4} = \\frac{36}{4} = 9" },
            { title: "Fourth proportion", math: "12x = 15 \\times 16 \\implies x = \\frac{240}{12} = 20" }
          ],
          finalAnswer: "10, 9, 20"
        },
        {
          id: "rp-ex-3-2",
          module: 3,
          title: "Adding x to Form a Proportion (Option Elimination)",
          question: "What number x must be added to 7, 16, 43, 79 so the resulting numbers are in proportion?",
          steps: [
            { title: "Condition", math: "\\frac{7+x}{16+x} = \\frac{43+x}{79+x}" },
            { title: "Test x = 5", math: "\\frac{12}{21} = \\frac{4}{7}, \\quad \\frac{48}{84} = \\frac{4}{7} \\quad \\checkmark" }
          ],
          finalAnswer: "x = 5"
        }
      ]
    },
    {
      id: "rp-mod-4",
      number: 4,
      title: "Percentage Shifts & Coin Problems",
      concepts: [
        "Percentage increase in ratios: Apply multipliers (1 + P/100) directly to each ratio term.",
        "Baseline 100: When numbers are compared to a common third entity, set the reference to 100.",
        "Coin problems: Total Value in Paise = Σ (Denomination in Paise × Count). Always work with integer paise!"
      ],
      formulas: [
        { name: "Total Paise Value", math: "\\text{Value} = \\sum (\\text{Paise Denomination} \\times \\text{Count})" }
      ],
      callout: {
        type: 'warning',
        title: 'Paise Rule',
        content: 'Never work with decimal rupees like ₹0.50 or ₹0.25. Always convert ₹50 to 5000 paise to prevent decimal errors.'
      },
      examples: [
        {
          id: "rp-ex-4-1",
          module: 4,
          title: "Seat Increases by Percentages",
          question: "Seats in Math, Physics, Bio are 5 : 7 : 8. Increased by 40%, 50%, 75%. Find new ratio.",
          steps: [
            { title: "Apply multipliers", math: "5 \\times 1.4 = 7, \\quad 7 \\times 1.5 = \\frac{21}{2}, \\quad 8 \\times 1.75 = 14" },
            { title: "Divide by 7", math: "1 : \\frac{3}{2} : 2" },
            { title: "Multiply by 2", math: "2 : 3 : 4" }
          ],
          finalAnswer: "2 : 3 : 4"
        },
        {
          id: "rp-ex-4-2",
          module: 4,
          title: "Mixed Coins in a Bag",
          question: "A bag has ₹1, 50p, 25p coins in ratio 1 : 2 : 2. Total value is ₹50. Find count of 50p coins.",
          steps: [
            { title: "Paise equation", math: "100(1k) + 50(2k) + 25(2k) = 250k\\text{ paise}" },
            { title: "Equate to ₹50 = 5000 paise", math: "250k = 5000 \\implies k = 20" },
            { title: "50p coin count", math: "2k = 2 \\times 20 = 40\\text{ coins}" }
          ],
          finalAnswer: "40 coins"
        }
      ]
    },
    {
      id: "rp-mod-5",
      number: 5,
      title: "Commercial Partnership: Capital & Time Horizon",
      concepts: [
        "Profit distribution is strictly proportional to (Investment × Time).",
        "If investment is constant, Profit ∝ Time. If time is constant, Profit ∝ Investment.",
        "Partial withdrawals/additions: Calculate (Capital × Months) for each active period and sum them up."
      ],
      formulas: [
        { name: "Profit Ratio Identity", math: "P_A : P_B : P_C = (I_A \\times T_A) : (I_B \\times T_B) : (I_C \\times T_C)" }
      ],
      callout: {
        type: 'tip',
        title: 'Drop the Three Zeros',
        content: 'When investments are in thousands (₹25,000, ₹6,000, ₹8,000), divide by 1000 immediately to work with clean integers: 25, 6, 8.'
      },
      examples: [
        {
          id: "rp-ex-5-1",
          module: 5,
          title: "Partnership Investment Duration",
          question: "Investments of A and B are 14 : 15, profits are 2 : 5. If A invested for 3 months, how long did B invest?",
          steps: [
            { title: "Profit formula", math: "\\frac{14 \\times 3}{15 \\times T_B} = \\frac{2}{5}" },
            { title: "Solve for T_B", math: "\\frac{42}{15 T_B} = \\frac{2}{5} \\implies 30 T_B = 210 \\implies T_B = 7\\text{ months}" }
          ],
          finalAnswer: "7 months"
        },
        {
          id: "rp-ex-5-2",
          module: 5,
          title: "Partnership with Withdrawals and Additions",
          question: "A, B, C invest ₹25,000 each. After 5 months, A withdraws ₹6,000, B withdraws ₹7,000, C adds ₹8,000. Annual profit is ₹86,500. Find difference between shares of A and B.",
          steps: [
            { title: "Scale by 1000", explanation: "Initial capital = 25 for 5 months. Remaining time = 7 months." },
            { title: "A's units", math: "(25 \\times 5) + (19 \\times 7) = 125 + 133 = 258" },
            { title: "B's units", math: "(25 \\times 5) + (18 \\times 7) = 125 + 126 = 251" },
            { title: "C's units", math: "(25 \\times 5) + (33 \\times 7) = 125 + 231 = 356" },
            { title: "Total units and unit value", math: "258 + 251 + 356 = 865\\text{ units} = 86,500 \\implies 1\\text{ unit} = ₹100" },
            { title: "Difference A - B", math: "(258 - 251) \\times 100 = 7 \\times 100 = ₹700" }
          ],
          finalAnswer: "₹700"
        }
      ]
    },
    {
      id: "rp-mod-6",
      number: 6,
      title: "Invariant Methods: Age Problems & Constant Mixtures",
      concepts: [
        "Age Invariance: The age difference between two people is strictly constant over time.",
        "Horizontal Gap Balancing: If vertical increments are not equal, multiply each ratio by the horizontal gap of the other.",
        "Mixture Invariance: When only one component (water) is added, the quantity of the other (milk) remains unchanged. Scale the target ratio to match untouched units."
      ],
      formulas: [
        { name: "Age Difference", math: "\\text{Scale ratios by opposite horizontal gaps}" },
        { name: "Untouched Substance", math: "\\text{Equate ratio units of unchanged component}" }
      ],
      callout: {
        type: 'info',
        title: 'Untouched Component Rule',
        content: 'Identify which ingredient was NOT touched! Match its ratio units before comparing the added volume.'
      },
      examples: [
        {
          id: "rp-ex-6-1",
          module: 6,
          title: "Age Problem with Cross-Difference Gap Normalization",
          question: "Mother to daughter present age is 7 : 1. After 5 years, ratio is 4 : 1. Find the difference in their present ages.",
          steps: [
            { title: "Horizontal gaps", math: "D_1 = 7 - 1 = 6, \\quad D_2 = 4 - 1 = 3" },
            { title: "Equalize differences (multiply second ratio by 2)", math: "4:1 \\xrightarrow{\\times 2} 8:2" },
            { title: "Vertical shift", math: "7 \\to 8 \\implies 1\\text{ unit} = 5\\text{ years}" },
            { title: "Present age difference", math: "(7 - 1) \\times 5 = 6 \\times 5 = 30\\text{ years}" }
          ],
          finalAnswer: "30 years"
        },
        {
          id: "rp-ex-6-2",
          module: 6,
          title: "TCS NQT PYQ: Water Added to Constant Milk Mixture",
          question: "In a 60 L mixture, milk to water is 2 : 1. How much water must be added so the ratio becomes 1 : 2?",
          steps: [
            { title: "Initial volume breakdown", math: "2:1 \\implies 3\\text{ units} = 60\\text{ L} \\implies 1\\text{ unit} = 20\\text{ L}" },
            { title: "Untouched milk units = 2", explanation: "Target ratio is 1:2. Multiply by 2 to equate milk units: 2 : 4." },
            { title: "Water added", math: "4 - 1 = 3\\text{ units} \\implies 3 \\times 20\\text{ L} = 60\\text{ Litres}" }
          ],
          finalAnswer: "60 Litres"
        },
        {
          id: "rp-ex-6-3",
          module: 6,
          title: "End-of-Video Homework Problem: Subtraction Invariance",
          question: "Two numbers are in ratio 3 : 5. If 9 is subtracted from each, new ratio is 12 : 23. Find the smaller number.",
          steps: [
            { title: "Horizontal differences", math: "D_1 = 5 - 3 = 2, \\quad D_2 = 23 - 12 = 11" },
            { title: "Equalize differences", math: "(3:5) \\times 11 = 33 : 55, \\quad (12:23) \\times 2 = 24 : 46" },
            { title: "Vertical decrease", math: "33 - 24 = 9\\text{ units} = 9 \\implies 1\\text{ unit} = 1" },
            { title: "Smaller number", math: "33 \\times 1 = 33" }
          ],
          finalAnswer: "33"
        }
      ]
    }
  ]
};

