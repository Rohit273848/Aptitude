export interface TWWorkedExample {
  id: string;
  module: number;
  title: string;
  question: string;
  steps: { title: string; math?: string; explanation?: string }[];
  finalAnswer: string;
}

export interface TWModule {
  id: string;
  number: number;
  title: string;
  concepts: string[];
  formulas?: { name: string; math: string; note?: string }[];
  table?: { headers: string[]; rows: string[][] };
  examples: TWWorkedExample[];
  callout?: { type: 'tip' | 'warning' | 'trap' | 'info'; title: string; content: string };
}

export interface TWQuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TWFormulaSheetItem {
  id: string;
  category: string;
  concept: string;
  math: string;
}

export interface TWData {
  title: string;
  syllabusPath: string;
  subtitle: string;
  auditItems: { title: string; detail: string }[];
  formulaSheet: TWFormulaSheetItem[];
  quizQuestions: TWQuizQuestion[];
  modules: TWModule[];
}

export const timeWorkData: TWData = {
  title: "Time & Work, Pipes & Cisterns + LCM & HCF",
  syllabusPath: "Foundation > Numerical Ability > Arithmetic Ability > Work and Time",
  subtitle: "Master the Efficiency Model, integer LCM rates, worker join/leave dynamics, tank inlets/outlets, and number theory shortcuts for TCS NQT.",

  auditItems: [
    {
      title: "1. The Inverse Proportionality Principle (Never Add Days)",
      detail: "Days cannot be added directly because Time is inversely proportional to Rate. In this lesson, all problem types convert day counts to whole-number Work Units per day (Efficiency) using the LCM method, completely bypassing messy fraction arithmetic."
    },
    {
      title: "2. Golden Rule for Decimal LCM/HCF (Equalize Decimal Places)",
      detail: "When calculating LCM/HCF of decimals like 3.6, 1.8, and 0.144, you MUST equalize decimal places first (3.600, 1.800, 0.144) to keep common denominator 1000. Never simplify individual fractions independently before computing LCM/HCF."
    },
    {
      title: "3. Continuous Worker Deduction Shortcut",
      detail: "In problems where a worker departs early but another stays throughout the entire project (or a pipe is closed early while another runs continuously), calculate the uninterrupted worker's output across all T days first. The remaining work belongs exclusively to the departing partner."
    },
    {
      title: "4. Sign Conventions in Pipes & Cisterns",
      detail: "Inlet pipes supply positive work (+η), while outlet pipes or leaks perform negative work (-η). In exam questions, always distinguish whether the tank 'fills' (+net rate) or 'empties' (-net rate)."
    }
  ],

  formulaSheet: [
    { id: 'tw-f1', category: 'Fundamentals', concept: 'Total Work (W)', math: 'W = \\eta \\times T' },
    { id: 'tw-f2', category: 'Fundamentals', concept: 'Efficiency (\\eta)', math: '\\eta = \\frac{W}{T}' },
    { id: 'tw-f3', category: 'Fundamentals', concept: 'Time (T)', math: 'T = \\frac{W}{\\eta}' },
    { id: 'tw-f4', category: 'Fundamentals', concept: 'Two Workers Shortcut', math: 'T = \\frac{A \\times B}{A + B}' },
    { id: 'tw-f5', category: 'Fractional Work', concept: 'Full Work Normalization', math: 'T_{\\text{full}} = d \\times \\frac{q}{p}' },
    { id: 'tw-f6', category: 'Worker Leaving', concept: 'Continuous Worker Deduction', math: 'W_{\\text{other}} = W_{\\text{total}} - (\\eta_{\\text{continuous}} \\times T_{\\text{total}})' },
    { id: 'tw-f7', category: 'Pipes & Cisterns', concept: 'Net Flow Efficiency', math: '\\eta_{\\text{net}} = \\sum \\eta_{\\text{inlets}} - \\sum \\eta_{\\text{outlets}}' },
    { id: 'tw-f8', category: 'Number Theory', concept: 'Product of Two Numbers', math: 'A \\times B = \\text{LCM} \\times \\text{HCF}' },
    { id: 'tw-f9', category: 'Number Theory', concept: 'LCM of Fractions', math: '\\text{LCM} = \\frac{\\text{LCM of Numerators}}{\\text{HCF of Denominators}}' },
    { id: 'tw-f10', category: 'Number Theory', concept: 'HCF of Fractions', math: '\\text{HCF} = \\frac{\\text{HCF of Numerators}}{\\text{LCM of Denominators}}' },
    { id: 'tw-f11', category: 'Ratios', concept: 'Numbers in Ratio a : b', math: 'N_1 = a \\times H,\\quad N_2 = b \\times H,\\quad \\text{Sum} = (a+b)H' },
    { id: 'tw-f12', category: 'Simultaneous Events', concept: 'Coincidence Interval', math: 'T_{\\text{next}} = \\text{LCM}(\\text{individual cycle times})' }
  ],

  quizQuestions: [
    {
      id: 1,
      topic: 'Prime Numbers',
      question: 'Which of the following numbers is the only even prime number, and how many primes exist from 1 to 100?',
      options: [
        '0 is prime; 24 primes',
        '2 is prime; 25 primes',
        '4 is prime; 26 primes',
        '1 is prime; 25 primes'
      ],
      correctIndex: 1,
      explanation: '2 is the only even prime and the smallest prime. 1 is neither prime nor composite. There are exactly 15 primes from 1 to 50, and 10 primes from 51 to 100, giving 25 total primes from 1 to 100.'
    },
    {
      id: 2,
      topic: 'Decimal LCM',
      question: 'Find the LCM of 3.6, 1.8, and 0.144.',
      options: [
        '36',
        '0.36',
        '3.6',
        '360'
      ],
      correctIndex: 2,
      explanation: 'Equalize decimal places to 3 places: 3600/1000, 1800/1000, 144/1000. LCM(3600, 1800, 144) = 3600. Denominator HCF(1000, 1000, 1000) = 1000. LCM = 3600/1000 = 3.6.'
    },
    {
      id: 3,
      topic: 'Ratio and HCF',
      question: 'Two numbers are in the ratio 7 : 11 and their HCF is 28. What is the sum of these two numbers?',
      options: [
        '498',
        '504',
        '512',
        '484'
      ],
      correctIndex: 1,
      explanation: 'Sum = (a + b) × HCF = (7 + 11) × 28 = 18 × 28. Unit digit check: 8 × 8 = 64 (ends in 4). 18 × 28 = 18 × (30 - 2) = 540 - 36 = 504.'
    },
    {
      id: 4,
      topic: 'Combined Work',
      question: 'A can complete a piece of work in 12 days, and B can complete it in 18 days. Working together, in how many days will they finish?',
      options: [
        '6.5 days',
        '7.2 days (7 1/5 days)',
        '8.0 days',
        '7.5 days'
      ],
      correctIndex: 1,
      explanation: 'Total Work = LCM(12, 18) = 36 units. Rate of A = 3 u/day, Rate of B = 2 u/day. Combined rate = 5 u/day. Time = 36 / 5 = 7.2 days (7 1/5 days).'
    },
    {
      id: 5,
      topic: 'Worker Leaving Early',
      question: 'A can complete a work in 24 days and B in 32 days. They begin together, but B leaves early such that the entire work is completed in 18 days. After how many days did B leave?',
      options: [
        '6 days',
        '8 days',
        '10 days',
        '12 days'
      ],
      correctIndex: 1,
      explanation: 'Work = LCM(24, 32) = 96 units. Rate of A = 4, Rate of B = 3. A worked all 18 days: 4 × 18 = 72 units. Work done by B = 96 - 72 = 24 units. Days B worked = 24 / 3 = 8 days.'
    },
    {
      id: 6,
      topic: 'Pipes & Cisterns Homework',
      question: 'Pipe A can fill a tank in 12 hours and Pipe B in 18 hours. If both open simultaneously, after how many hours should Pipe B be closed so that the tank is completely full in 8 hours?',
      options: [
        '4 hours',
        '5 hours',
        '6 hours',
        '7 hours'
      ],
      correctIndex: 2,
      explanation: 'Tank Capacity = LCM(12, 18) = 36 units. Rate A = +3 u/hr, Rate B = +2 u/hr. Pipe A runs uninterrupted for all 8 hours: 3 × 8 = 24 units. Volume remaining for Pipe B = 36 - 24 = 12 units. Time B was open = 12 / 2 = 6 hours.'
    }
  ],

  modules: [
    {
      id: "tw-mod-1",
      number: 1,
      title: "Mathematical Foundation: Prime Numbers & Factorization",
      concepts: [
        "Natural numbers {1, 2, 3, ...} and Prime numbers (strictly two distinct positive factors: 1 and itself).",
        "1 is neither prime nor composite; 2 is the only even prime and the smallest prime.",
        "Direct exam memory facts: 1-50 has 15 primes, 51-100 has 10 primes (25 primes in 1-100), 101-200 has 21 primes (46 total in 1-200).",
        "Prime factorization method: LCM takes the highest power of each prime base; HCF takes the lowest power of common prime bases."
      ],
      formulas: [
        { name: "LCM Rule", math: "\\text{LCM} = \\prod p_i^{\\max(a_i, b_i)}" },
        { name: "HCF Rule", math: "\\text{HCF} = \\prod p_i^{\\min(a_i, b_i)}" },
        { name: "Two Numbers Product Identity", math: "A \\times B = \\text{LCM}(A, B) \\times \\text{HCF}(A, B)" }
      ],
      callout: {
        type: 'info',
        title: 'Exam Memory Counts',
        content: 'From 1 to 100 there are exactly 25 primes. From 101 to 200 there are 21 primes. Memorizing these totals eliminates manual counting during TCS NQT quantitative rounds.'
      },
      examples: [
        {
          id: "tw-ex-1-1",
          module: 1,
          title: "Prime Factorization of 24 and 45",
          question: "Find the LCM and HCF of 24 and 45 using prime power decomposition.",
          steps: [
            { title: "Factorize both numbers", math: "24 = 2^3 \\times 3^1 \\times 5^0, \\quad 45 = 2^0 \\times 3^2 \\times 5^1" },
            { title: "Calculate LCM (Highest powers)", math: "\\text{LCM} = 2^3 \\times 3^2 \\times 5^1 = 8 \\times 9 \\times 5 = 360" },
            { title: "Calculate HCF (Lowest common powers)", math: "\\text{HCF} = 2^0 \\times 3^1 \\times 5^0 = 3" }
          ],
          finalAnswer: "LCM = 360, HCF = 3"
        }
      ]
    },
    {
      id: "tw-mod-2",
      number: 2,
      title: "Shortcuts: Fractions, Decimals, Ratios & Coincidence",
      concepts: [
        "Fractions: LCM = (LCM of Numerators) / (HCF of Denominators); HCF = (HCF of Numerators) / (LCM of Denominators).",
        "Decimals Golden Rule: Equalize decimal places across all terms with trailing zeros first. Never simplify individual fractions independently.",
        "Ratios and HCF: In simplified ratio a : b, the common scalar multiplier is their HCF. Sum = (a + b) × HCF.",
        "Periodic Simultaneous Events: The interval until lights, bells, or track runners coincide next is the LCM of their cycle intervals."
      ],
      formulas: [
        { name: "Fraction LCM", math: "\\text{LCM}\\left(\\frac{a}{b}, \\frac{c}{d}\\right) = \\frac{\\text{LCM}(a, c)}{\\text{HCF}(b, d)}" },
        { name: "Fraction HCF", math: "\\text{HCF}\\left(\\frac{a}{b}, \\frac{c}{d}\\right) = \\frac{\\text{HCF}(a, c)}{\\text{LCM}(b, d)}" },
        { name: "Ratio Sum Identity", math: "\\text{Sum} = (a + b) \\times \\text{HCF}" }
      ],
      callout: {
        type: 'warning',
        title: 'Golden Rule for Decimals',
        content: 'Do NOT simplify fractions individually before finding LCM/HCF of decimals. Doing so disrupts the place-value relationship with 10^k!'
      },
      examples: [
        {
          id: "tw-ex-2-1",
          module: 2,
          title: "TCS NQT PYQ: Decimal LCM of 3.6, 1.8, 0.144",
          question: "Find the LCM of 3.6, 1.8, and 0.144.",
          steps: [
            { title: "Equalize decimal places to 3 places", math: "3.600, \\quad 1.800, \\quad 0.144" },
            { title: "Express over identical denominator 1000", math: "\\frac{3600}{1000}, \\quad \\frac{1800}{1000}, \\quad \\frac{144}{1000}" },
            { title: "Find LCM of numerators", explanation: "3600 is a multiple of 1800, and 144 × 25 = 3600. Hence LCM(3600, 1800, 144) = 3600." },
            { title: "Divide by common denominator", math: "\\text{LCM} = \\frac{3600}{1000} = 3.6" }
          ],
          finalAnswer: "3.6"
        },
        {
          id: "tw-ex-2-2",
          module: 2,
          title: "Ratio and HCF Sum",
          question: "Two numbers are in ratio 7 : 11 and their HCF is 28. Find their sum.",
          steps: [
            { title: "Use sum formula", math: "\\text{Sum} = (7 + 11) \\times 28 = 18 \\times 28" },
            { title: "Unit digit and mental split", math: "18 \\times (30 - 2) = 540 - 36 = 504" }
          ],
          finalAnswer: "504"
        },
        {
          id: "tw-ex-2-3",
          module: 2,
          title: "Simultaneous Traffic Lights",
          question: "Three lights change every 48 s, 72 s, and 108 s. If they change simultaneously at 8:20 AM, when do they change together next?",
          steps: [
            { title: "Factorize", math: "48 = 2^4 \\times 3, \\quad 72 = 2^3 \\times 3^2, \\quad 108 = 2^2 \\times 3^3" },
            { title: "Compute LCM", math: "\\text{LCM} = 2^4 \\times 3^3 = 16 \\times 27 = 432\\text{ seconds}" },
            { title: "Convert to minutes", math: "432\\text{ s} = 7\\text{ min } 12\\text{ s}" },
            { title: "Add to start time", math: "8:20\\text{ AM} + 7\\text{m } 12\\text{s} = 8:27:12\\text{ AM}" }
          ],
          finalAnswer: "8:27:12 AM"
        }
      ]
    },
    {
      id: "tw-mod-3",
      number: 3,
      title: "Core Time & Work: The Efficiency Model",
      concepts: [
        "Time and Work are inversely proportional: more workers = less completion time.",
        "Never add days directly (10 days + 20 days != 30 days).",
        "The 3-Step LCM Method: (1) Total Work = LCM of days; (2) Efficiency = Work / Days; (3) Combined Time = Work / Sum of Efficiencies."
      ],
      formulas: [
        { name: "Total Work", math: "W = \\text{LCM}(\\text{day}_A, \\text{day}_B, \\dots)" },
        { name: "Individual Efficiency", math: "\\eta = \\frac{W}{\\text{Days}}" },
        { name: "Combined Time", math: "T = \\frac{W}{\\sum \\eta}" }
      ],
      callout: {
        type: 'tip',
        title: 'Why LCM?',
        content: 'Choosing W as the LCM of days guarantees that all individual efficiencies are whole integers. You never have to add fractions on scratch paper!'
      },
      examples: [
        {
          id: "tw-ex-3-1",
          module: 3,
          title: "Two Workers Combined (A & B)",
          question: "A can do a piece of work in 12 days and B in 18 days. How long will they take working together?",
          steps: [
            { title: "Total Work", math: "W = \\text{LCM}(12, 18) = 36\\text{ units}" },
            { title: "Efficiencies", math: "\\eta_A = 36/12 = 3\\text{ u/d}, \\quad \\eta_B = 36/18 = 2\\text{ u/d}" },
            { title: "Combined Rate & Time", math: "\\eta_{A+B} = 5\\text{ u/d} \\implies T = \\frac{36}{5} = 7.2\\text{ days}" }
          ],
          finalAnswer: "7 1/5 days (7.2 days)"
        },
        {
          id: "tw-ex-3-2",
          module: 3,
          title: "Three Workers Combined (A, B & C)",
          question: "A in 10 days, B in 15 days, C in 20 days. How long working together?",
          steps: [
            { title: "Total Work", math: "W = \\text{LCM}(10, 15, 20) = 60\\text{ units}" },
            { title: "Efficiencies", math: "\\eta_A = 6, \\quad \\eta_B = 4, \\quad \\eta_C = 3" },
            { title: "Combined Time", math: "\\sum \\eta = 13 \\implies T = \\frac{60}{13} = 4\\frac{8}{13}\\text{ days}" }
          ],
          finalAnswer: "4 8/13 days"
        },
        {
          id: "tw-ex-3-3",
          module: 3,
          title: "Four Workers Combined (A, B, C & D)",
          question: "A in 10d, B in 20d, C in 30d, D in 45d. Working together?",
          steps: [
            { title: "Total Work", math: "W = \\text{LCM}(10, 20, 30, 45) = 180\\text{ units}" },
            { title: "Efficiencies", math: "\\eta_A = 18, \\quad \\eta_B = 9, \\quad \\eta_C = 6, \\quad \\eta_D = 4" },
            { title: "Combined Time", math: "\\sum \\eta = 37 \\implies T = \\frac{180}{37} = 4\\frac{32}{37}\\text{ days}" }
          ],
          finalAnswer: "180/37 days (4 32/37 days)"
        }
      ]
    },
    {
      id: "tw-mod-4",
      number: 4,
      title: "Fractional Work, Partial Work & Finding Unknown Partner",
      concepts: [
        "Fractional work: If 1/n work takes d days, 100% full work takes n × d days.",
        "Work left: Compute units completed in initial days, subtract from total, and form fraction over total work.",
        "Finding unknown partner: Given A and (A + B), deduce B's efficiency: η_B = η_{A+B} - η_A."
      ],
      formulas: [
        { name: "Full Work Normalization", math: "T_{\\text{full}} = d \\times \\frac{q}{p}" },
        { name: "Unknown Partner Rate", math: "\\eta_B = \\eta_{A+B} - \\eta_A" }
      ],
      callout: {
        type: 'info',
        title: 'Fraction Normalization Rule',
        content: 'Always convert partial/fractional days to 100% full completion days for each worker BEFORE calculating the LCM.'
      },
      examples: [
        {
          id: "tw-ex-4-1",
          module: 4,
          title: "Fractional Work Conversion",
          question: "A does 1/5 of a task in 4 days. B does 1/6 in 5 days. How long will they take together?",
          steps: [
            { title: "Normalize to 100% days", math: "A_{\\text{full}} = 4 \\times 5 = 20\\text{ days}, \\quad B_{\\text{full}} = 5 \\times 6 = 30\\text{ days}" },
            { title: "Total Work & Efficiencies", math: "W = \\text{LCM}(20, 30) = 60\\text{ units} \\implies \\eta_A = 3, \\quad \\eta_B = 2" },
            { title: "Time Together", math: "T = \\frac{60}{3 + 2} = \\frac{60}{5} = 12\\text{ days}" }
          ],
          finalAnswer: "12 days"
        },
        {
          id: "tw-ex-4-2",
          module: 4,
          title: "Work Left After Partial Days",
          question: "A alone takes 30 days, B alone takes 60 days. If they work together for 5 days, what fraction of work is left?",
          steps: [
            { title: "Work & Efficiencies", math: "W = 60\\text{ units} \\implies \\eta_A = 2, \\quad \\eta_B = 1" },
            { title: "Work done in 5 days", math: "W_{\\text{done}} = (2 + 1) \\times 5 = 15\\text{ units}" },
            { title: "Fraction Remaining", math: "\\text{Remaining} = 60 - 15 = 45\\text{ units} \\implies \\frac{45}{60} = \\frac{3}{4}" }
          ],
          finalAnswer: "3/4"
        },
        {
          id: "tw-ex-4-3",
          module: 4,
          title: "Finding Unknown Worker (B Alone)",
          question: "A can do a work in 20 days. A and B together can do it in 15 days. How many days for B alone?",
          steps: [
            { title: "Total Work", math: "W = \\text{LCM}(20, 15) = 60\\text{ units}" },
            { title: "Efficiencies", math: "\\eta_A = 60/20 = 3, \\quad \\eta_{A+B} = 60/15 = 4" },
            { title: "Isolate B", math: "\\eta_B = 4 - 3 = 1\\text{ u/day} \\implies T_B = \\frac{60}{1} = 60\\text{ days}" }
          ],
          finalAnswer: "60 days"
        }
      ]
    },
    {
      id: "tw-mod-5",
      number: 5,
      title: "Worker Leaving, Joining & Dynamic Changes",
      concepts: [
        "Continuous worker deduction: In worker-leaving scenarios where one person stays throughout all T days, compute their work first.",
        "Multi-stage chains: Solve phase by phase; subtract Phase 1 output to get remaining workload for Phase 2."
      ],
      formulas: [
        { name: "Continuous Worker Work", math: "W_{\\text{continuous}} = \\eta_{\\text{continuous}} \\times T_{\\text{total}}" },
        { name: "Departing Worker Time", math: "T_{\\text{departed}} = \\frac{W_{\\text{total}} - W_{\\text{continuous}}}{\\eta_{\\text{departed}}}" }
      ],
      callout: {
        type: 'tip',
        title: 'Continuous Worker Rule',
        content: 'Identify who worked from Day 1 to the very last day without interruption. Compute their total contribution first—the remaining units belong to the leaving worker!'
      },
      examples: [
        {
          id: "tw-ex-5-1",
          module: 5,
          title: "Multi-stage Chain (A+B start, B leaves, C joins)",
          question: "A and B take 15 and 10 days. They work 4 days, then B leaves. A continues with C and finishes remaining work in 3 days. How many days for C alone to complete 40% of the total work?",
          steps: [
            { title: "Base efficiencies", math: "W = \\text{LCM}(15, 10) = 30\\text{ units} \\implies \\eta_A = 2, \\quad \\eta_B = 3" },
            { title: "Phase 1 Progress (4 days)", math: "W_1 = (2 + 3) \\times 4 = 20\\text{ units} \\implies W_{\\text{rem}} = 30 - 20 = 10\\text{ units}" },
            { title: "Solve for C's rate in Phase 2", math: "(2 + \\eta_C) \\times 3 = 10 \\implies \\eta_C = \\frac{10}{3} - 2 = \\frac{4}{3}\\text{ u/day}" },
            { title: "Target workload for C", math: "40\\% \\text{ of } 30 = 12\\text{ units} \\implies T_C = \\frac{12}{4/3} = 12 \\times \\frac{3}{4} = 9\\text{ days}" }
          ],
          finalAnswer: "9 days"
        },
        {
          id: "tw-ex-5-2",
          module: 5,
          title: "Continuous Worker Shortcut (Total Days Known)",
          question: "A does work in 24 days, B in 32 days. They start together. After some days B leaves, and the total work completes in 18 days. After how many days did B leave?",
          steps: [
            { title: "Work & Efficiencies", math: "W = \\text{LCM}(24, 32) = 96\\text{ units} \\implies \\eta_A = 4, \\quad \\eta_B = 3" },
            { title: "Isolate continuous worker A", math: "W_A = 4 \\times 18\\text{ days} = 72\\text{ units}" },
            { title: "Compute work by B", math: "W_B = 96 - 72 = 24\\text{ units}" },
            { title: "Days B worked", math: "T_B = \\frac{24}{\\eta_B} = \\frac{24}{3} = 8\\text{ days}" }
          ],
          finalAnswer: "8 days"
        }
      ]
    },
    {
      id: "tw-mod-6",
      number: 6,
      title: "Pipes & Cisterns: Inlets, Outlets & Leaks",
      concepts: [
        "Inlet pipes add water -> Positive Efficiency (+η).",
        "Outlet pipes or leaks remove water -> Negative Efficiency (-η).",
        "Net flow rate η_net = Σ η_inlets - Σ η_outlets. If positive, the cistern is filling; if negative, emptying."
      ],
      formulas: [
        { name: "Net Tank Rate", math: "\\eta_{\\text{net}} = \\sum \\eta_{\\text{inlets}} - \\sum \\eta_{\\text{outlets}}" },
        { name: "Filling/Emptying Time", math: "T = \\frac{\\text{Tank Capacity}}{\\lvert \\eta_{\\text{net}} \\rvert}" }
      ],
      callout: {
        type: 'trap',
        title: 'Fills vs Empties Trap',
        content: 'Check whether the problem states the combined pipes fill the tank (+ net rate) or empty the tank (- net rate). The sign directly changes the waste pipe efficiency!'
      },
      examples: [
        {
          id: "tw-ex-6-1",
          module: 6,
          title: "One Inlet and One Outlet",
          question: "Tap A fills a cistern in 8 hours. Tap B empties it in 16 hours. If both open together, how long to fill?",
          steps: [
            { title: "Capacity & Efficiencies", math: "C = \\text{LCM}(8, 16) = 16\\text{ units} \\implies \\eta_A = +2\\text{ u/hr}, \\quad \\eta_B = -1\\text{ u/hr}" },
            { title: "Net Rate & Time", math: "\\eta_{\\text{net}} = +2 - 1 = +1\\text{ u/hr} \\implies T = \\frac{16}{1} = 16\\text{ hours}" }
          ],
          finalAnswer: "16 hours"
        },
        {
          id: "tw-ex-6-2",
          module: 6,
          title: "Two Inlets and Unknown Waste Pipe",
          question: "Taps A and B fill in 12 min and 15 min. Waste pipe C is open. Together the tank fills in 20 min. How long does C alone take to empty the full tank?",
          steps: [
            { title: "Capacity & Efficiencies", math: "C = \\text{LCM}(12, 15, 20) = 60\\text{ units} \\implies \\eta_A = +5, \\quad \\eta_B = +4" },
            { title: "Net rate", math: "\\eta_{\\text{net}} = +60/20 = +3\\text{ u/min}" },
            { title: "Solve for C", math: "5 + 4 + \\eta_C = 3 \\implies \\eta_C = 3 - 9 = -6\\text{ u/min}" },
            { title: "Time to empty full tank", math: "T_C = \\frac{60}{6} = 10\\text{ minutes}" }
          ],
          finalAnswer: "10 minutes"
        },
        {
          id: "tw-ex-6-3",
          module: 6,
          title: "End-of-Video Homework Problem (Pipe B Closed Early)",
          question: "Pipe A can fill a tank in 12 hours and Pipe B in 18 hours. If both pipes are opened simultaneously, after how many hours should Pipe B be closed so that the tank is completely full in 8 hours?",
          steps: [
            { title: "Capacity & Rates", math: "C = \\text{LCM}(12, 18) = 36\\text{ units} \\implies \\eta_A = +3\\text{ u/hr}, \\quad \\eta_B = +2\\text{ u/hr}" },
            { title: "Continuous Pipe A deduction", explanation: "Pipe A stays open for the entire 8 hours.", math: "W_A = 3 \\times 8 = 24\\text{ units}" },
            { title: "Remaining volume for Pipe B", math: "W_B = 36 - 24 = 12\\text{ units}" },
            { title: "Hours Pipe B was open", math: "t = \\frac{12}{\\eta_B} = \\frac{12}{2} = 6\\text{ hours}" }
          ],
          finalAnswer: "6 hours"
        }
      ]
    }
  ]
};

