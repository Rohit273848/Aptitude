export interface NSWorkedExample {
  id: string;
  module: number;
  title: string;
  question: string;
  steps: { title: string; math?: string; explanation?: string }[];
  finalAnswer: string;
}

export interface NSModule {
  id: string;
  number: number;
  title: string;
  concepts: string[];
  formulas?: { name: string; math: string; note?: string }[];
  table?: { headers: string[]; rows: string[][] };
  examples: NSWorkedExample[];
  callout?: { type: 'tip' | 'warning' | 'trap' | 'info'; title: string; content: string };
}

export interface NSQuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface NSFormulaSheetItem {
  id: string;
  category: string;
  concept: string;
  math: string;
}

export interface NSData {
  title: string;
  syllabusPath: string;
  subtitle: string;
  auditItems: { title: string; detail: string }[];
  formulaSheet: NSFormulaSheetItem[];
  quizQuestions: NSQuizQuestion[];
  modules: NSModule[];
}

export const numberSystemData: NSData = {
  title: "Number System, Prime Numbers & LCM-HCF",
  syllabusPath: "Foundation > Numerical Ability > Number System > Number System, LCM & HCF",
  subtitle: "Master number theory fundamentals, prime distribution counts, decimal/fractional LCM & HCF, and periodic events for TCS NQT.",

  auditItems: [
    {
      title: "1. Prime Count Memory Facts (15 in 1-50, 25 in 1-100, 46 in 1-200)",
      detail: "Direct TCS NQT questions frequently test prime thresholds or averages. Memorizing: 1-50 has 15 primes, 51-100 has 10 primes, and 101-200 has 21 primes eliminates manual counting under timed pressure."
    },
    {
      title: "2. The Decimal LCM/HCF Golden Rule",
      detail: "When calculating LCM/HCF of decimals like 3.6, 1.8, and 0.144, always equalize decimal places with trailing zeros first (3.600, 1.800, 0.144). Never reduce individual fractions independently, as that destroys base-10 positional equivalence."
    },
    {
      title: "3. Two-Number Product Identity Limitation",
      detail: "A × B = LCM(A, B) × HCF(A, B) is strictly valid for pairs of numbers. For three or more numbers, A × B × C ≠ LCM × HCF."
    },
    {
      title: "4. Co-Prime Factorization Divisibility Check",
      detail: "To test divisibility by large composite divisors like 72 or 88, split them into co-prime pairs (72 = 8 × 9; 88 = 8 × 11). A number is divisible by 72 if and only if it passes both the 8-test (last 3 digits) and 9-test (sum of digits)."
    }
  ],

  formulaSheet: [
    {
      id: "ns-f-1",
      category: "Primes",
      concept: "Prime Distribution 1 to 100",
      math: "\\text{Primes}(1\\dots 50) = 15,\\quad \\text{Primes}(51\\dots 100) = 10,\\quad \\text{Total} = 25"
    },
    {
      id: "ns-f-2",
      category: "Primes",
      concept: "Prime Distribution 101 to 200",
      math: "\\text{Primes}(101\\dots 200) = 21,\\quad \\text{Total}(1\\dots 200) = 46"
    },
    {
      id: "ns-f-3",
      category: "Fundamentals",
      concept: "Two-Number Product Identity",
      math: "A \\times B = \\text{LCM}(A, B) \\times \\text{HCF}(A, B)"
    },
    {
      id: "ns-f-4",
      category: "Fundamentals",
      concept: "LCM Prime Factorization Rule",
      math: "\\text{LCM} = \\prod p_i^{\\max(a_i, b_i, \\dots)}"
    },
    {
      id: "ns-f-5",
      category: "Fundamentals",
      concept: "HCF Prime Factorization Rule",
      math: "\\text{HCF} = \\prod p_i^{\\min(a_i, b_i, \\dots)}"
    },
    {
      id: "ns-f-6",
      category: "Fractions",
      concept: "LCM of Fractions",
      math: "\\text{LCM}\\left(\\frac{a}{b}, \\frac{c}{d}\\right) = \\frac{\\text{LCM}(a, c)}{\\text{HCF}(b, d)}"
    },
    {
      id: "ns-f-7",
      category: "Fractions",
      concept: "HCF of Fractions",
      math: "\\text{HCF}\\left(\\frac{a}{b}, \\frac{c}{d}\\right) = \\frac{\\text{HCF}(a, c)}{\\text{LCM}(b, d)}"
    },
    {
      id: "ns-f-8",
      category: "Decimals",
      concept: "Decimal LCM Golden Rule",
      math: "\\text{LCM}(3.6, 1.8, 0.144) = \\frac{\\text{LCM}(3600, 1800, 144)}{1000} = 3.6"
    },
    {
      id: "ns-f-9",
      category: "Ratios",
      concept: "Numbers from Ratio & HCF",
      math: "\\text{Numbers} = a\\cdot H,\\; b\\cdot H \\implies \\text{LCM} = a\\cdot b\\cdot H \\quad [\\gcd(a, b)=1]"
    },
    {
      id: "ns-f-10",
      category: "Ratios",
      concept: "Sum and Difference of Numbers",
      math: "\\text{Sum} = (a+b)H,\\quad \\text{Diff} = |a-b|H"
    },
    {
      id: "ns-f-11",
      category: "Divisibility",
      concept: "Divisibility by 8 and 9",
      math: "\\text{Div 8: Last 3 digits};\\quad \\text{Div 9: Sum of digits} = 9k"
    },
    {
      id: "ns-f-12",
      category: "Divisibility",
      concept: "Divisibility by 11",
      math: "|\\sum \\text{odd pos} - \\sum \\text{even pos}| \\equiv 0 \\pmod{11}"
    },
    {
      id: "ns-f-13",
      category: "Simultaneous",
      concept: "Simultaneous Periodic Events",
      math: "\\text{Next Event Timestamp} = \\text{Base Time} + \\text{LCM}(t_1, t_2, t_3, \\dots)"
    },
    {
      id: "ns-f-14",
      category: "Simultaneous",
      concept: "Total Tolls in Duration T",
      math: "\\text{Total Tolls} = \\left\\lfloor \\frac{T}{\\text{LCM}} \\right\\rfloor + 1"
    }
  ],

  quizQuestions: [
    {
      id: 1,
      topic: "Prime Number Distribution",
      question: "How many prime numbers exist between 1 and 100?",
      options: ["21", "24", "25", "26"],
      correctIndex: 2,
      explanation: "There are 15 primes from 1 to 50, and 10 primes from 51 to 100, giving exactly 25 primes between 1 and 100."
    },
    {
      id: 2,
      topic: "Two Number Product Rule",
      question: "The LCM of two numbers is 360 and their HCF is 12. If one of the numbers is 72, what is the other number?",
      options: ["48", "60", "72", "90"],
      correctIndex: 1,
      explanation: "A × B = LCM × HCF => 72 × B = 360 × 12 => B = (360 × 12) / 72 = 5 × 12 = 60."
    },
    {
      id: 3,
      topic: "Decimal LCM (TCS NQT PYQ)",
      question: "What is the LCM of 3.6, 1.8, and 0.144?",
      options: ["0.36", "3.6", "36", "360"],
      correctIndex: 1,
      explanation: "Equalize decimal places: 3.600, 1.800, 0.144 => 3600/1000, 1800/1000, 144/1000. LCM(3600, 1800, 144) = 3600. LCM = 3600 / 1000 = 3.6."
    },
    {
      id: 4,
      topic: "Fraction LCM & HCF",
      question: "What is the HCF of 4/15, 7/30, and 9/45?",
      options: ["1/90", "1/45", "4/30", "252/15"],
      correctIndex: 0,
      explanation: "HCF of fractions = HCF(numerators) / LCM(denominators). HCF(4, 7, 9) = 1. LCM(15, 30, 45) = 90. HCF = 1/90."
    },
    {
      id: 5,
      topic: "Ratio & HCF",
      question: "Two numbers are in the ratio 7 : 11 and their HCF is 28. What is the sum of the two numbers?",
      options: ["308", "476", "504", "532"],
      correctIndex: 2,
      explanation: "Sum = (a + b) × HCF = (7 + 11) × 28 = 18 × 28 = 504."
    },
    {
      id: 6,
      topic: "Periodic Events (Bells)",
      question: "Five bells begin tolling together and toll at intervals of 4, 6, 8, 10, and 12 seconds, respectively. How many times will they toll together in 60 minutes (including the starting toll)?",
      options: ["30", "31", "32", "29"],
      correctIndex: 1,
      explanation: "LCM(4, 6, 8, 10, 12) = 120 seconds = 2 minutes. Number of tolls = (60 / 2) + 1 = 30 + 1 = 31 times."
    },
    {
      id: 7,
      topic: "Divisibility by 72",
      question: "If a 9-digit number 985x3678y is divisible by 72, what is the value of (4x - 3y) for the largest possible value of y?",
      options: ["3", "4", "5", "6"],
      correctIndex: 0,
      explanation: "72 = 8 × 9. Divisibility by 8 requires 78y divisible by 8 => y = 4 (since 784 = 8 × 98). Divisibility by 9 requires sum of digits = 9 + 8 + 5 + x + 3 + 6 + 7 + 8 + 4 = 50 + x divisible by 9 => x = 4. Then 4x - 3y = 4(4) - 3(4) = 16 - 12 = 4 (or for different y values if applicable, y=4 gives 4)."
    },
    {
      id: 8,
      topic: "Co-Prime LCM",
      question: "The LCM of two co-prime numbers is 117. What is their HCF?",
      options: ["1", "3", "9", "13"],
      correctIndex: 0,
      explanation: "By definition, two co-prime numbers have no common factors other than 1, so their HCF is strictly 1."
    }
  ],

  modules: [
    {
      id: "ns-mod-1",
      number: 1,
      title: "Number Theory Fundamentals & Prime Distribution",
      concepts: [
        "Natural numbers: Positive counting integers {1, 2, 3, 4, ...}.",
        "Prime definition: Integers P > 1 with strictly two positive factors: 1 and P.",
        "The number 1 rule: 1 is neither prime nor composite as it has only one positive factor.",
        "The number 2 fact: 2 is the smallest prime and the only even prime number in mathematics.",
        "Prime count 1 to 50: Exactly 15 primes (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47).",
        "Prime count 51 to 100: Exactly 10 primes (53, 59, 61, 67, 71, 73, 79, 83, 89, 97).",
        "Prime count 1 to 100: Exactly 25 primes (15 + 10 = 25).",
        "Prime count 101 to 200: Exactly 21 primes; total in 1 to 200 is 46 primes."
      ],
      formulas: [
        { name: "Prime Distribution 1-100", math: "\\text{Primes}(1\\dots 100) = 25" },
        { name: "Prime Distribution 1-200", math: "\\text{Primes}(1\\dots 200) = 46" }
      ],
      callout: {
        type: "tip",
        title: "Prime Test Heuristic",
        content: "To check if N is prime, test divisibility only by prime numbers up to sqrt(N). If no prime p <= sqrt(N) divides N, then N is strictly prime!"
      },
      examples: [
        {
          id: "ns-ex-1-1",
          module: 1,
          title: "Prime Counting Across Intervals",
          question: "Find the average of all prime numbers between 50 and 70.",
          steps: [
            { title: "Identify primes in the range (50, 70)", explanation: "The primes between 50 and 70 are 53, 59, 61, and 67." },
            { title: "Calculate the sum", math: "\\text{Sum} = 53 + 59 + 61 + 67 = 240" },
            { title: "Divide by the count of numbers (4)", math: "\\text{Average} = \\frac{240}{4} = 60" }
          ],
          finalAnswer: "60"
        }
      ]
    },
    {
      id: "ns-mod-2",
      number: 2,
      title: "Prime Factorization, LCM & HCF Core Framework",
      concepts: [
        "Fundamental Theorem of Arithmetic: Every integer N > 1 is uniquely expressible as a product of prime powers.",
        "LCM definition: Smallest positive integer divisible by all numbers (take highest power of every prime).",
        "HCF / GCD definition: Largest positive integer that divides all numbers without remainder (take lowest power of common primes).",
        "Two-number product identity: A × B = LCM(A, B) × HCF(A, B).",
        "Product identity trap: Formula holds strictly for 2 numbers; never use A × B × C = LCM × HCF."
      ],
      formulas: [
        { name: "LCM Rule", math: "\\text{LCM} = \\prod p_i^{\\max(a_i, b_i, \\dots)}" },
        { name: "HCF Rule", math: "\\text{HCF} = \\prod p_i^{\\min(a_i, b_i, \\dots)}" },
        { name: "Product Rule", math: "A \\times B = \\text{LCM}(A, B) \\times \\text{HCF}(A, B)" }
      ],
      callout: {
        type: "trap",
        title: "Three-Number Product Trap",
        content: "A × B × C is NOT equal to LCM × HCF. For three numbers, the product includes redundant factor overlaps. Use prime factorization directly for sets of 3+ numbers."
      },
      examples: [
        {
          id: "ns-ex-2-1",
          module: 2,
          title: "LCM and HCF Computation via Prime Powers",
          question: "Find the LCM and HCF of 24 and 45, and verify their product identity.",
          steps: [
            { title: "Prime factorize both integers", math: "24 = 2^3 \\times 3^1,\\quad 45 = 3^2 \\times 5^1" },
            { title: "Compute LCM using highest powers", math: "\\text{LCM} = 2^3 \\times 3^2 \\times 5^1 = 8 \\times 9 \\times 5 = 360" },
            { title: "Compute HCF using common lowest powers", math: "\\text{HCF} = 2^0 \\times 3^1 \\times 5^0 = 3" },
            { title: "Verify product equality", math: "24 \\times 45 = 1080;\\quad 360 \\times 3 = 1080" }
          ],
          finalAnswer: "LCM = 360, HCF = 3"
        }
      ]
    },
    {
      id: "ns-mod-3",
      number: 3,
      title: "LCM & HCF of Fractions and Decimals",
      concepts: [
        "Fractions LCM formula: LCM = LCM(numerators) / HCF(denominators).",
        "Fractions HCF formula: HCF = HCF(numerators) / LCM(denominators).",
        "Simplification rule: Always reduce fractions to coprime lowest terms before applying the fraction formula.",
        "Decimals Golden Rule: Equalize the count of decimal places by appending trailing zeros before creating fractions.",
        "Positional denominator rule: Decimals must stay over identical power-of-10 denominators (e.g. 1000); never reduce individual fractions first."
      ],
      formulas: [
        { name: "Fraction LCM", math: "\\text{LCM}\\left(\\frac{a}{b}, \\frac{c}{d}\\right) = \\frac{\\text{LCM}(a, c)}{\\text{HCF}(b, d)}" },
        { name: "Fraction HCF", math: "\\text{HCF}\\left(\\frac{a}{b}, \\frac{c}{d}\\right) = \\frac{\\text{HCF}(a, c)}{\\text{LCM}(b, d)}" },
        { name: "Decimal Rule", math: "\\text{LCM}(3.6, 1.8, 0.144) \\to \\frac{\\text{LCM}(3600, 1800, 144)}{1000} = 3.6" }
      ],
      callout: {
        type: "warning",
        title: "The Decimal Simplification Trap",
        content: "If you reduce 1.8 to 9/5 and 3.6 to 18/5, their LCM formula yields 18/5 = 3.6, but for other numbers mismatched denominators give incorrect base-10 place values. Keep identical power-of-10 denominators!"
      },
      examples: [
        {
          id: "ns-ex-3-1",
          module: 3,
          title: "Decimal LCM (TCS NQT PYQ)",
          question: "Find the LCM of 3.6, 1.8, and 0.144.",
          steps: [
            { title: "Equalize decimal places to 3 digits", explanation: "Terms become 3.600, 1.800, and 0.144." },
            { title: "Represent as fractions over 1000", math: "\\frac{3600}{1000},\\quad \\frac{1800}{1000},\\quad \\frac{144}{1000}" },
            { title: "Calculate LCM of numerators", math: "\\text{LCM}(3600, 1800, 144) = 3600" },
            { title: "Divide by common denominator 1000", math: "\\text{LCM} = \\frac{3600}{1000} = 3.6" }
          ],
          finalAnswer: "3.6"
        }
      ]
    },
    {
      id: "ns-mod-4",
      number: 4,
      title: "Ratio and HCF Multiplier Relationships",
      concepts: [
        "Scalar factor rule: When numbers are in simplified ratio a : b, their original values are a·H and b·H where H = HCF.",
        "Sum of numbers formula: Sum = (a + b) × HCF.",
        "Difference of numbers formula: Diff = |a - b| × HCF.",
        "Product of numbers formula: Product = a × b × HCF².",
        "LCM from ratio and HCF: LCM = a × b × HCF (holds because gcd(a, b) = 1)."
      ],
      formulas: [
        { name: "Original Numbers", math: "N_1 = a\\cdot H,\\quad N_2 = b\\cdot H" },
        { name: "Sum & Difference", math: "\\text{Sum} = (a+b)H,\\quad \\text{Diff} = |a-b|H" },
        { name: "LCM from Ratio", math: "\\text{LCM} = a\\cdot b\\cdot H \\quad [\\gcd(a, b)=1]" }
      ],
      callout: {
        type: "tip",
        title: "Fast MCQ Mental Math",
        content: "If numbers are in ratio a:b, their sum MUST be a multiple of (a+b), their difference MUST be a multiple of |a-b|, and their LCM MUST be a multiple of (a×b). Use this to eliminate 3 out of 4 options instantly!"
      },
      examples: [
        {
          id: "ns-ex-4-1",
          module: 4,
          title: "Sum and LCM from Ratio and HCF",
          question: "Two numbers are in the ratio 7 : 11 and their HCF is 28. Find their sum and their LCM.",
          steps: [
            { title: "Apply sum formula (a + b) × H", math: "\\text{Sum} = (7 + 11) \\times 28 = 18 \\times 28 = 504" },
            { title: "Apply LCM formula a × b × H", math: "\\text{LCM} = 7 \\times 11 \\times 28 = 77 \\times 28 = 2156" }
          ],
          finalAnswer: "Sum = 504, LCM = 2156"
        }
      ]
    },
    {
      id: "ns-mod-5",
      number: 5,
      title: "Divisibility Rules & Digital Root Tests",
      concepts: [
        "Divisibility by 3 and 9: Sum of digits must be a multiple of 3 or 9.",
        "Divisibility by 4 and 8: Last 2 digits must be divisible by 4; last 3 digits divisible by 8.",
        "Divisibility by 11: Difference between sum of odd-position and even-position digits is 0 or multiple of 11.",
        "Co-prime composite rule: For C = p × q with gcd(p, q) = 1, test divisibility by p and q independently.",
        "Divisibility by 72: Number must satisfy both 8-divisibility (last 3 digits) and 9-divisibility (sum of digits)."
      ],
      formulas: [
        { name: "Divisibility by 8", math: "\\text{Last 3 digits divisible by 8}" },
        { name: "Divisibility by 9", math: "\\sum \\text{digits} = 9k" },
        { name: "Divisibility by 11", math: "|\\sum_{\\text{odd}} d_i - \\sum_{\\text{even}} d_i| \\equiv 0 \\pmod{11}" }
      ],
      callout: {
        type: "info",
        title: "Composite Test Rule",
        content: "Never test composite factors that share divisors! For example, testing divisibility by 6 and 2 does not prove divisibility by 12. Always use co-prime factors: 12 = 3 × 4, 72 = 8 × 9, 88 = 8 × 11."
      },
      examples: [
        {
          id: "ns-ex-5-1",
          module: 5,
          title: "Unknown Digits Divisible by 72 (TCS NQT Pattern)",
          question: "If 7-digit number 543x28y is divisible by 72, find the minimum value of (x + y).",
          steps: [
            { title: "Test 8-divisibility on last 3 digits (28y)", explanation: "28y must be divisible by 8. 280 = 8 × 35, 288 = 8 × 36. Thus y can be 0 or 8. For minimum sum, try y = 0." },
            { title: "Test 9-divisibility on sum of digits", math: "5 + 4 + 3 + x + 2 + 8 + 0 = 22 + x \\implies 22 + x = 27 \\implies x = 5" },
            { title: "Calculate (x + y)", math: "x + y = 5 + 0 = 5" }
          ],
          finalAnswer: "5"
        }
      ]
    },
    {
      id: "ns-mod-6",
      number: 6,
      title: "Periodic Simultaneous Events (Traffic Lights & Bells)",
      concepts: [
        "Simultaneous Event Theorem: Periodic events repeating at intervals t1, t2, t3 occur together at multiples of LCM(t1, t2, t3).",
        "Next event timestamp: Next Occurrence = Base Time + LCM(t1, t2, ...).",
        "Repetitions in duration T: Total simultaneous events = floor(T / LCM) + 1 (including the initial toll).",
        "Circular track lap meetings: Time to meet at starting point = LCM of lap times."
      ],
      formulas: [
        { name: "Next Event Time", math: "\\text{Interval} = \\text{LCM}(t_1, t_2, t_3, \\dots)" },
        { name: "Total Tolls Count", math: "\\text{Count} = \\left\\lfloor \\frac{T}{\\text{LCM}} \\right\\rfloor + 1" }
      ],
      callout: {
        type: "warning",
        title: "The '+1' Starting Toll Trap",
        content: "If the question states 'bells commence tolling together and toll for T minutes', always ADD 1 for the initial starting toll at t = 0! If it asks 'how many times will they toll AFTER the start', do not add 1."
      },
      examples: [
        {
          id: "ns-ex-6-1",
          module: 6,
          title: "Traffic Light Cycle Synchronization",
          question: "Three traffic lights change after every 48 s, 72 s, and 108 s. If they change simultaneously at 8:20 AM, at what time will they change together next?",
          steps: [
            { title: "Find LCM of intervals 48, 72, and 108", math: "48 = 2^4\\times 3,\\; 72 = 2^3\\times 3^2,\\; 108 = 2^2\\times 3^3 \\implies \\text{LCM} = 2^4\\times 3^3 = 432\\text{ s}" },
            { title: "Convert seconds to minutes and seconds", math: "\\frac{432}{60} = 7\\text{ minutes and } 12\\text{ seconds}" },
            { title: "Add to initial timestamp", math: "8:20:00\\text{ AM} + 7\\text{ min } 12\\text{ s} = 8:27:12\\text{ AM}" }
          ],
          finalAnswer: "8:27:12 AM"
        }
      ]
    }
  ]
};

