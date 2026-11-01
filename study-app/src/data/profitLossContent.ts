export interface PLWorkedExample {
  id: string;
  module: number;
  title: string;
  question: string;
  steps: { title: string; math?: string; explanation?: string }[];
  finalAnswer: string;
}

export interface PLModule {
  id: string;
  number: number;
  title: string;
  concepts: string[];
  formulas?: { name: string; math: string; note?: string }[];
  table?: { headers: string[]; rows: string[][] };
  examples: PLWorkedExample[];
  callout?: { type: 'tip' | 'warning' | 'trap' | 'info'; title: string; content: string };
}

export interface PLQuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PLFormulaSheetItem {
  id: string;
  category: string;
  concept: string;
  math: string;
}

export interface PLData {
  title: string;
  syllabusPath: string;
  subtitle: string;
  auditItems: { title: string; detail: string }[];
  formulaSheet: PLFormulaSheetItem[];
  quizQuestions: PLQuizQuestion[];
  modules: PLModule[];
}

export const profitLossData: PLData = {
  title: "Profit, Loss & Discount",
  syllabusPath: "Foundation > Numerical Ability > Arithmetic Ability > Profit and Loss",
  subtitle: "Master the Golden Ratio MP/CP identity, successive discount column cancellation, Buy X Get Y Free retail schemes, article parity, and price-quantity inversion for TCS NQT.",

  auditItems: [
    {
      title: "1. The Golden Ratio MP to CP Identity (Bypass SP Completely)",
      detail: "When a question mentions both Discount % (on MP) and Profit % (on CP), you never need to calculate intermediate Selling Price (SP). Directly use MP/CP = (100 + P%) / (100 - D%) to solve in a single fraction multiplication step."
    },
    {
      title: "2. The Article Parity Law (Quantity Bought = Quantity Sold)",
      detail: "Profit or loss percentage cannot be computed by comparing unequal item counts. Before applying SP - CP, either equate the number of articles using LCM, or normalize prices to an identical single unit."
    },
    {
      title: "3. Constant Budget Inversion Law (Price × Quantity = Constant)",
      detail: "When total rupee spending or revenue remains constant across two conditions, Unit Price is strictly inversely proportional to Quantity (P1 : P2 = a : b ⟹ Q1 : Q2 = b : a). Ignore constant rupee figures entirely!"
    },
    {
      title: "4. Frequency-Weighted Averages on Fractional Stock Splits",
      detail: "When goods are broken into fractions (e.g. 2/3 at 30% profit, 1/4 at 16% profit, rest at 12%), convert fractions to integer lot frequencies via LCM of denominators, and compute overall % as Σ(frequency × percentage) / Total Parts."
    }
  ],

  formulaSheet: [
    { id: 'pl-f1', category: 'Fundamentals', concept: 'Profit (P)', math: 'P = \\text{SP} - \\text{CP}' },
    { id: 'pl-f2', category: 'Fundamentals', concept: 'Profit Percentage', math: '\\text{Profit } \\% = \\left(\\frac{\\text{SP} - \\text{CP}}{\\text{CP}}\\right) \\times 100' },
    { id: 'pl-f3', category: 'Fundamentals', concept: 'Loss (L)', math: 'L = \\text{CP} - \\text{SP}' },
    { id: 'pl-f4', category: 'Fundamentals', concept: 'Loss Percentage', math: '\\text{Loss } \\% = \\left(\\frac{\\text{CP} - \\text{SP}}{\\text{CP}}\\right) \\times 100' },
    { id: 'pl-f5', category: 'Fundamentals', concept: 'Margin Percentage', math: '\\text{Margin } \\% = \\left(\\frac{\\text{Profit}}{\\text{SP}}\\right) \\times 100' },
    { id: 'pl-f6', category: 'Golden Ratio', concept: 'The Golden MP to CP Formula', math: '\\frac{\\text{MP}}{\\text{CP}} = \\frac{100 + P\\%}{100 - D\\%}' },
    { id: 'pl-f7', category: 'Golden Ratio', concept: 'Direct CP to MP Ratio', math: '\\frac{\\text{CP}}{\\text{MP}} = \\frac{100 - D\\%}{100 + P\\%}' },
    { id: 'pl-f8', category: 'Successive Discount', concept: 'Net Ratio Pipeline', math: '\\text{MP} : \\text{SP} = \\prod b_i : \\prod (b_i - a_i)' },
    { id: 'pl-f9', category: 'Buy X Get Y', concept: 'Free Article Discount %', math: '\\text{Discount } \\% = \\left(\\frac{Y}{X + Y}\\right) \\times 100' },
    { id: 'pl-f10', category: 'Article Parity', concept: 'CP of x = SP of y', math: '\\frac{\\text{CP}}{\\text{SP}} = \\frac{y}{x},\\quad \\text{Profit } \\% = \\left(\\frac{x - y}{y}\\right) \\times 100' },
    { id: 'pl-f11', category: 'Price-Quantity', concept: 'Inverse Budget Inversion', math: 'P_1 : P_2 = a : b \\implies Q_1 : Q_2 = b : a' },
    { id: 'pl-f12', category: 'Weighted Averages', concept: 'Stock Lot Weighted %', math: '\\text{Net } \\% = \\frac{\\sum f_i x_i}{\\sum f_i}' },
    { id: 'pl-f13', category: 'Fraudulent Dealer', concept: 'Dishonest Weight Gain %', math: '\\text{Gain } \\% = \\left(\\frac{\\text{Error Weight}}{\\text{True Weight} - \\text{Error Weight}}\\right) \\times 100' }
  ],

  quizQuestions: [
    {
      id: 1,
      topic: 'Profit % vs. Margin %',
      question: 'A trader buys an item for ₹100 and sells it for ₹200. What are his Profit Percentage and Margin Percentage respectively?',
      options: [
        'Profit % = 100%, Margin % = 100%',
        'Profit % = 100%, Margin % = 50%',
        'Profit % = 50%, Margin % = 100%',
        'Profit % = 50%, Margin % = 50%'
      ],
      correctIndex: 1,
      explanation: 'Profit % is calculated on CP: (100/100) × 100 = 100%. Margin % is calculated on SP: (100/200) × 100 = 50%.'
    },
    {
      id: 2,
      topic: 'Successive Discounts',
      question: 'Find the single equivalent discount for three successive discounts of 50%, 30%, and 20%.',
      options: [
        '100%',
        '72%',
        '68%',
        '84%'
      ],
      correctIndex: 1,
      explanation: 'Using Initial-to-Final ratios: 50% = 2→1, 30% = 10→7, 20% = 5→4. Cross-cancel 4 with 2 and 10 to get MP : SP = 25 : 7. Effective discount = (25 - 7)/25 = 18/25 = 72%.'
    },
    {
      id: 3,
      topic: 'Buy X Get Y Free + Profit',
      question: 'A shopkeeper gives 3 articles free on purchase of 5 articles, allows an extra 20% cash discount, and still makes 25% profit. What is the ratio CP : MP?',
      options: [
        '1 : 2',
        '2 : 5',
        '3 : 5',
        '4 : 9'
      ],
      correctIndex: 1,
      explanation: 'Scheme discount: 8→5. Extra discount 20% (1/5): 5→4. Net discount: 8→4 = 2→1 = 50%. Golden ratio CP/MP = (100 - D)/(100 + P) = (100 - 50)/(100 + 25) = 50/125 = 2 : 5.'
    },
    {
      id: 4,
      topic: 'Inverse Price-Quantity',
      question: 'By selling 12 oranges for ₹60, a person loses 25%. How many oranges should he sell for ₹100 to gain 25%?',
      options: [
        '10 oranges',
        '12 oranges',
        '15 oranges',
        '18 oranges'
      ],
      correctIndex: 1,
      explanation: 'For ₹60: P1:P2 = (100-25):(100+25) = 75:125 = 3:5. Q1:Q2 = 5:3. Since Q1 = 12, Q2 = 12 × (3/5) = 36/5 oranges for ₹60. For ₹100: (36/5) × (100/60) = (36/5) × (5/3) = 12 oranges.'
    },
    {
      id: 5,
      topic: 'Two-Stage SP Shift',
      question: 'When an article is sold for ₹355, there is a loss of 29%. At what price should it be sold to gain 21%?',
      options: [
        '₹580',
        '₹605',
        '₹620',
        '₹650'
      ],
      correctIndex: 1,
      explanation: 'Let CP = 100 units. SP1 = 100 - 29 = 71 units = ₹355 ⟹ 1 unit = ₹5. Target SP2 = 100 + 21 = 121 units ⟹ 121 × 5 = ₹605.'
    },
    {
      id: 6,
      topic: 'Article Parity',
      question: 'If the Cost Price of 15 articles equals the Selling Price of 10 articles, what is the profit percentage?',
      options: [
        '33.33%',
        '50%',
        '66.67%',
        '25%'
      ],
      correctIndex: 1,
      explanation: '15 CP = 10 SP ⟹ CP/SP = 10/15 = 2/3. Profit = 3 - 2 = 1 unit on CP of 2 ⟹ (1/2) × 100 = 50% profit.'
    },
    {
      id: 7,
      topic: 'Stock Split Weighted Average',
      question: '2/3 of an inventory is sold at 30% profit, 1/4 at 16% profit, and the rest at 12% profit. If the total profit is ₹75, find the total Cost Price.',
      options: [
        '₹250',
        '₹300',
        '₹350',
        '₹400'
      ],
      correctIndex: 1,
      explanation: 'LCM(3, 4) = 12 total parts. 8 parts @ 30%, 3 parts @ 16%, 1 part @ 12%. Weighted average = [(8×30) + (3×16) + (1×12)] / 12 = 300/12 = 25% net profit. 25% of CP = ₹75 ⟹ CP = ₹300.'
    },
    {
      id: 8,
      topic: 'Dishonest Dealer Weight Gain',
      question: 'A dishonest dealer professes to sell goods at cost price, but uses a 960 gram weight for a 1 kg (1000 g) measure. Find his gain percentage.',
      options: [
        '4%',
        '4.17% (4 1/6%)',
        '4.5%',
        '5%'
      ],
      correctIndex: 1,
      explanation: 'Gain % = Error / (True - Error) × 100 = 40 / (1000 - 40) × 100 = 40/960 × 100 = 100/24 = 25/6% = 4 1/6% ≈ 4.17%.'
    }
  ],

  modules: [
    {
      id: 'pl-mod-1',
      number: 1,
      title: "Core Terminology & The Golden MP-to-CP Relation",
      concepts: [
        "Cost Price (CP): Purchase outlay including transit and taxes.",
        "Selling Price (SP): Actual revenue collected on sale.",
        "Marked Price (MP/MRP): Tag price on which discounts are calculated.",
        "Profit % is on CP; Margin % is on SP.",
        "The Golden Formula connects MP directly to CP: MP/CP = (100 + P%) / (100 - D%)."
      ],
      formulas: [
        { name: "Profit %", math: "\\text{Profit } \\% = \\frac{\\text{SP} - \\text{CP}}{\\text{CP}} \\times 100" },
        { name: "Margin %", math: "\\text{Margin } \\% = \\frac{\\text{SP} - \\text{CP}}{\\text{SP}} \\times 100" },
        { name: "The Golden Ratio", math: "\\frac{\\text{MP}}{\\text{CP}} = \\frac{100 + P\\%}{100 - D\\%}", note: "Replaces SP entirely; use for fast 1-line mark-up calculations." }
      ],
      callout: {
        type: 'tip',
        title: "Exam Secret: Avoid Calculating SP",
        content: "Whenever a TCS NQT question provides both Discount % and Profit %, do NOT find SP. Simply equate MP/CP = (100 + P) / (100 - D)."
      },
      examples: [
        {
          id: 'pl-ex-1',
          module: 1,
          title: "Direct Marked Price Calculation",
          question: "A merchant bought an article for ₹150. What price should he mark so that after a 10% discount, he still makes a 10% profit?",
          steps: [
            { title: "Set up Golden Ratio", math: "\\frac{\\text{MP}}{150} = \\frac{100 + 10}{100 - 10} = \\frac{110}{90} = \\frac{11}{9}" },
            { title: "Solve for MP", math: "\\text{MP} = 150 \\times \\frac{11}{9} = \\frac{1650}{9} = \\frac{550}{3} = ₹183.33" }
          ],
          finalAnswer: "₹183.33"
        }
      ]
    },
    {
      id: 'pl-mod-2',
      number: 2,
      title: "Type 1: Successive Discounts & Column Cancellation",
      concepts: [
        "Discounts d1, d2, d3 apply on decreasing balances and cannot be added directly.",
        "Convert each percentage to fraction: d = a/b ⟹ MP : SP = b : (b - a).",
        "Cross-cancel common factors between Left (MP) and Right (SP) columns before multiplying."
      ],
      formulas: [
        { name: "Column Ratio Product", math: "\\text{MP} = \\prod b_i,\\quad \\text{SP} = \\prod (b_i - a_i)" },
        { name: "Effective Discount %", math: "\\text{Discount } \\% = \\frac{\\text{MP} - \\text{SP}}{\\text{MP}} \\times 100" }
      ],
      callout: {
        type: 'info',
        title: "Standard Fraction Equivalents",
        content: "14 2/7% = 1/7 (7→6), 12 1/2% = 1/8 (8→7), 16 2/3% = 1/6 (6→5), 11 1/9% = 1/9 (9→8)."
      },
      examples: [
        {
          id: 'pl-ex-2',
          module: 2,
          title: "Three Successive Discounts",
          question: "Find the single equivalent discount for 50%, 30%, and 20%.",
          steps: [
            { title: "Convert to fractions", explanation: "50% = 2→1, 30% = 10→7, 20% = 5→4" },
            { title: "Cross-simplify columns", math: "(2 \\times 10 \\times 5) : (1 \\times 7 \\times 4) \\implies (1 \\times 5 \\times 5) : (1 \\times 7 \\times 1) = 25 : 7" },
            { title: "Compute effective %", math: "\\text{Discount } \\% = \\frac{25 - 7}{25} \\times 100 = \\frac{18}{25} \\times 100 = 72\\%" }
          ],
          finalAnswer: "72%"
        },
        {
          id: 'pl-ex-3',
          module: 2,
          title: "TCS NQT PYQ: Successive Discounts with MRP Valuation",
          question: "A shopkeeper gives two successive discounts of 10% and 20% on MRP. Find effective discount % and SP if MRP is ₹500.",
          steps: [
            { title: "Ratio setup", explanation: "10% = 10→9, 20% = 5→4. Cross-cancel 10 and 4 by 2 ⟹ MP : SP = 25 : 18." },
            { title: "Effective discount %", math: "\\frac{25 - 18}{25} \\times 100 = \\frac{7}{25} \\times 100 = 28\\%" },
            { title: "Rupee valuation", math: "25\\text{ units} = ₹500 \\implies 1\\text{ unit} = ₹20 \\implies \\text{SP} = 18 \\times 20 = ₹360" }
          ],
          finalAnswer: "28% discount and ₹360 Selling Price"
        }
      ]
    },
    {
      id: 'pl-mod-3',
      number: 3,
      title: "Type 2: 'Buy X, Get Y Free' Retail Schemes",
      concepts: [
        "In 'Buy X, Get Y Free', total stock leaving the shelf is (X + Y).",
        "Marked price corresponds to (X + Y) articles; customer pays for X articles.",
        "Discount % = [Y / (X + Y)] × 100.",
        "For hybrid schemes with extra discounts, multiply the scheme ratio with the cash discount ratio."
      ],
      formulas: [
        { name: "Free Article Formula", math: "\\text{Discount } \\% = \\left(\\frac{Y}{X + Y}\\right) \\times 100" },
        { name: "Hybrid Scheme Ratio", math: "\\text{Net Ratio} = (X+Y : X) \\times (b : b-a)" }
      ],
      callout: {
        type: 'warning',
        title: "Common Trap: Dividing by X instead of (X+Y)",
        content: "Never divide free articles by paid articles (Y/X is wrong!). Always divide by the total articles delivered (X + Y)."
      },
      examples: [
        {
          id: 'pl-ex-4',
          module: 3,
          title: "Buy 4 Get 3 Free",
          question: "What is the equivalent percentage discount in a 'Buy 4, Get 3 Free' offer?",
          steps: [
            { title: "Identify parameters", explanation: "X = 4 (paid), Y = 3 (free), Total = 4 + 3 = 7." },
            { title: "Apply formula", math: "\\text{Discount } \\% = \\frac{3}{7} \\times 100 = \\frac{300}{7}\\% = 42\\frac{6}{7}\\% \\approx 42.86\\%" }
          ],
          finalAnswer: "42 6/7% (42.86%)"
        },
        {
          id: 'pl-ex-5',
          module: 3,
          title: "Hybrid Promotion: Buy 5 Get 3 Free + 20% Discount + 25% Profit",
          question: "A seller gives 3 articles free on purchase of 5, allows an additional 20% discount, and still makes 25% profit. Find CP : MP.",
          steps: [
            { title: "Combine discount ratios", math: "(8 \\to 5) \\times (5 \\to 4) \\implies 8 : 4 = 2 : 1 \\implies 50\\% \\text{ net discount}" },
            { title: "Apply Golden Ratio", math: "\\frac{\\text{CP}}{\\text{MP}} = \\frac{100 - 50}{100 + 25} = \\frac{50}{125} = \\frac{2}{5}" }
          ],
          finalAnswer: "2 : 5"
        }
      ]
    },
    {
      id: 'pl-mod-4',
      number: 4,
      title: "Type 3: Two-Stage Selling Price Shifts & Successive Transfers",
      concepts: [
        "In two-stage shifts (SP1 → SP2), normalize with benchmark CP = 100 units.",
        "Loss % subtracts from 100; Profit % adds to 100.",
        "In multi-hand transfers (A → B → C), multiply the individual profit/loss multipliers."
      ],
      formulas: [
        { name: "Two-Stage Shift", math: "\\text{SP}_2 = \\text{SP}_1 \\times \\left(\\frac{100 + P_2\\%}{100 - L_1\\%}\\right)" },
        { name: "Chain Compounding", math: "\\text{Cost}_C = \\text{Cost}_A \\times \\left(1 + \\frac{P_1}{100}\\right)\\left(1 + \\frac{P_2}{100}\\right)" }
      ],
      examples: [
        {
          id: 'pl-ex-6',
          module: 4,
          title: "Two-Stage SP Shift from Loss to Gain",
          question: "When sold for ₹355, an article yields a 29% loss. For what price should it be sold to gain 21%?",
          steps: [
            { title: "Set CP = 100 units", math: "\\text{SP}_1 = 100 - 29 = 71\\text{ units} = ₹355 \\implies 1\\text{ unit} = ₹5" },
            { title: "Calculate target SP2", math: "\\text{SP}_2 = 100 + 21 = 121\\text{ units} \\implies 121 \\times 5 = ₹605" }
          ],
          finalAnswer: "₹605"
        },
        {
          id: 'pl-ex-7',
          module: 4,
          title: "Chain Transfer (A to B to C)",
          question: "A sells a bicycle to B at 5% profit. B sells it to C at 10% profit. If C pays ₹2310, find A's purchase price.",
          steps: [
            { title: "Multiplier fractions", explanation: "A→B (+5%): 20→21; B→C (+10%): 10→11" },
            { title: "Column product", math: "\\text{Initial } (A) = 20 \\times 10 = 200,\\quad \\text{Final } (C) = 21 \\times 11 = 231" },
            { title: "Unit scaling", math: "231\\text{ units} = ₹2310 \\implies 1\\text{ unit} = ₹10 \\implies \\text{Cost of } A = 200 \\times 10 = ₹2000" }
          ],
          finalAnswer: "₹2000"
        }
      ]
    },
    {
      id: 'pl-mod-5',
      number: 5,
      title: "Type 4: Quantity Equating & Article Parity (LCM Method)",
      concepts: [
        "Cardinal Rule: Never compare profit/loss until quantity bought equals quantity sold.",
        "If CP of x articles = SP of y articles, then CP/SP = y/x.",
        "When buying and selling rates differ, equalize total article count using LCM."
      ],
      formulas: [
        { name: "Parity Ratio", math: "x \\cdot \\text{CP} = y \\cdot \\text{SP} \\implies \\frac{\\text{CP}}{\\text{SP}} = \\frac{y}{x}" },
        { name: "LCM Parity Work", math: "\\text{Equate Quantity} = \\text{LCM}(\\text{Buying Qty}, \\text{Selling Qty})" }
      ],
      examples: [
        {
          id: 'pl-ex-8',
          module: 5,
          title: "CP of 15 = SP of 10",
          question: "Cost price of 15 articles equals selling price of 10 articles. Find profit %.",
          steps: [
            { title: "Set ratio", math: "15 \\text{CP} = 10 \\text{SP} \\implies \\frac{\\text{CP}}{\\text{SP}} = \\frac{10}{15} = \\frac{2}{3}" },
            { title: "Profit calculation", math: "\\text{Profit} = 3 - 2 = 1\\text{ on CP of } 2 \\implies \\frac{1}{2} \\times 100 = 50\\%" }
          ],
          finalAnswer: "50%"
        },
        {
          id: 'pl-ex-9',
          module: 5,
          title: "Different Rates: Buys 8 for ₹15, Sells 10 for ₹18",
          question: "A person buys 8 oranges for ₹15 and sells 10 oranges for ₹18. Find overall profit or loss %.",
          steps: [
            { title: "Equalize quantities via LCM", math: "\\text{LCM}(8, 10) = 40\\text{ oranges}" },
            { title: "Calculate CP and SP for 40 oranges", math: "\\text{CP} = 15 \\times 5 = ₹75,\\quad \\text{SP} = 18 \\times 4 = ₹72" },
            { title: "Loss calculation", math: "\\text{Loss} = 75 - 72 = ₹3 \\implies \\frac{3}{75} \\times 100 = 4\\%\\text{ Loss}" }
          ],
          finalAnswer: "4% Loss"
        }
      ]
    },
    {
      id: 'pl-mod-6',
      number: 6,
      title: "Type 5: Inverse Price-Quantity Relation (Constant Amount)",
      concepts: [
        "Total Amount = Unit Price (P) × Quantity (Q).",
        "When total rupee expenditure or revenue is constant, Price is inversely proportional to Quantity: P1:P2 = a:b ⟹ Q1:Q2 = b:a.",
        "Ignore constant rupee numbers like ₹90.75 or ₹1 entirely."
      ],
      formulas: [
        { name: "Inverse Proportionality", math: "P_1 : P_2 = a : b \\iff Q_1 : Q_2 = b : a" }
      ],
      callout: {
        type: 'tip',
        title: "Speed Shortcut",
        content: "If a problem asks 'How many eggs to sell for the same ₹90.75 to earn 14 2/7% profit?', cross out ₹90.75 immediately! Price is 7:8, so Quantity is 8:7. 8 units = 56 eggs ⟹ 7 units = 49 eggs."
      },
      examples: [
        {
          id: 'pl-ex-10',
          module: 6,
          title: "Toffees at Constant Re 1",
          question: "A man buys 11 toffees for ₹1. How many should he sell for ₹1 to gain 10%?",
          steps: [
            { title: "Price ratio", math: "P_1 : P_2 = 100 : 110 = 10 : 11" },
            { title: "Invert for quantity", math: "Q_1 : Q_2 = 11 : 10 \\implies Q_2 = 10\\text{ toffees}" }
          ],
          finalAnswer: "10 toffees"
        },
        {
          id: 'pl-ex-11',
          module: 6,
          title: "Loss-to-Profit Shift with Different Rupee Amounts",
          question: "By selling 12 oranges for ₹60, a person loses 25%. How many oranges should he sell for ₹100 to gain 25%?",
          steps: [
            { title: "Find quantity for SAME amount (₹60)", math: "P_1 : P_2 = 75 : 125 = 3 : 5 \\implies Q_1 : Q_2 = 5 : 3" },
            { title: "Solve for ₹60 quantity", math: "5\\text{ units} = 12 \\implies Q_2 = 12 \\times \\frac{3}{5} = \\frac{36}{5}\\text{ oranges}" },
            { title: "Scale from ₹60 to ₹100", math: "\\frac{36}{5} \\times \\frac{100}{60} = \\frac{36}{5} \\times \\frac{5}{3} = 12\\text{ oranges}" }
          ],
          finalAnswer: "12 oranges"
        }
      ]
    },
    {
      id: 'pl-mod-7',
      number: 7,
      title: "Type 6: Fractional Stock & Weighted Average Method",
      concepts: [
        "Instead of actual rupee values, treat stock fractions as frequencies and profit/loss % as values.",
        "Use + for profit, - for loss.",
        "Equalize all denominators using LCM to find total parts."
      ],
      formulas: [
        { name: "Weighted Average Formula", math: "\\text{Net Profit/Loss } \\% = \\frac{\\sum f_i x_i}{\\sum f_i}" },
        { name: "Break-Even Allocation", math: "\\sum f_i x_i = 0" }
      ],
      examples: [
        {
          id: 'pl-ex-12',
          module: 7,
          title: "All Profit Segments with Net Rupee Profit",
          question: "2/3 of goods sold at 30% profit, 1/4 at 16% profit, rest at 12% profit. If total profit is ₹75, find total CP.",
          steps: [
            { title: "Equalize parts via LCM(3, 4) = 12", explanation: "Part 1 (2/3): 8 parts @ +30%; Part 2 (1/4): 3 parts @ +16%; Part 3: 1 part @ +12%" },
            { title: "Weighted average %", math: "\\frac{(8 \\times 30) + (3 \\times 16) + (1 \\times 12)}{12} = \\frac{240 + 48 + 12}{12} = 25\\%\\text{ overall profit}" },
            { title: "Find total CP", math: "25\\% \\text{ of CP} = ₹75 \\implies \\text{CP} = ₹300" }
          ],
          finalAnswer: "₹300"
        },
        {
          id: 'pl-ex-13',
          module: 7,
          title: "Break-Even on Remaining Inventory",
          question: "A distributor buys books for ₹8000. He sells 1/4 part at a 20% loss. At what % profit must he sell the rest to break even?",
          steps: [
            { title: "Set total parts = 4", explanation: "1 part @ -20%; 3 parts @ +P%" },
            { title: "Break-even weighted sum = 0", math: "(1 \\times -20) + (3 \\times P) = 0 \\implies 3P = 20 \\implies P = 6\\frac{2}{3}\\%" }
          ],
          finalAnswer: "6 2/3% (6.67%)"
        }
      ]
    }
  ]
};

