export interface WorkedExample {
  id: string;
  title: string;
  question: string;
  steps: { title: string; math?: string; explanation?: string }[];
  finalAnswer: string;
}

export interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  description: string;
  example?: string;
  category: string;
}

export interface PercentageSection {
  id: string;
  number: string;
  title: string;
  description?: string;
  formulas: FormulaItem[];
  examples: WorkedExample[];
}

export const percentagesData = {
  title: "Percentages",
  syllabusPath: "Foundation > Numerical Ability > Arithmetic Ability > Percentages",
  subtitle: "Percentage Formula Cheat Sheet & Aptitude Guide for TCS NQT, Infosys, and Wipro.",
  notationNote: "Unless a formula says otherwise, use percentage values as numbers: for example, use $P=20$ for $20\\%$. The fraction $P/100$ is the corresponding decimal multiplier.",
  
  fractionsTable: [
    { fraction: "\\frac{1}{2}", percentage: "50\\%", decimal: "0.5" },
    { fraction: "\\frac{1}{3}", percentage: "\\approx 33.33\\%", decimal: "0.3333..." },
    { fraction: "\\frac{1}{4}", percentage: "25\\%", decimal: "0.25" },
    { fraction: "\\frac{1}{5}", percentage: "20\\%", decimal: "0.20" },
    { fraction: "\\frac{1}{6}", percentage: "\\approx 16.67\\%", decimal: "0.1667" },
    { fraction: "\\frac{1}{8}", percentage: "12.5\\%", decimal: "0.125" },
    { fraction: "\\frac{1}{9}", percentage: "\\approx 11.11\\%", decimal: "0.1111" },
    { fraction: "\\frac{1}{10}", percentage: "10\\%", decimal: "0.10" },
    { fraction: "\\frac{1}{11}", percentage: "\\approx 9.09\\%", decimal: "0.0909" },
    { fraction: "\\frac{1}{12}", percentage: "\\approx 8.33\\%", decimal: "0.0833" },
    { fraction: "\\frac{1}{16}", percentage: "6.25\\%", decimal: "0.0625" },
    { fraction: "\\frac{1}{20}", percentage: "5\\%", decimal: "0.05" },
    { fraction: "\\frac{1}{25}", percentage: "4\\%", decimal: "0.04" },
    { fraction: "\\frac{1}{40}", percentage: "2.5\\%", decimal: "0.025" },
    { fraction: "\\frac{1}{50}", percentage: "2\\%", decimal: "0.02" }
  ],

  mentalTricks: [
    { trick: "10%", method: "Divide by 10 (shift decimal 1 place left).", example: "10% of 340 = 34" },
    { trick: "5%", method: "Calculate 10% and divide by 2, or divide by 20.", example: "5% of 240 = 24 / 2 = 12" },
    { trick: "1%", method: "Divide by 100 (shift decimal 2 places left).", example: "1% of 850 = 8.5" },
    { trick: "20%", method: "Divide by 5, or calculate 10% and double it.", example: "20% of 175 = 175 / 5 = 35" },
    { trick: "25%", method: "Divide by 4 (halve twice).", example: "25% of 160 = 160 / 4 = 40" },
    { trick: "50%", method: "Divide by 2 (take half).", example: "50% of 98 = 49" },
    { trick: "75%", method: "Multiply by 3/4 (50% + 25%).", example: "75% of 80 = 40 + 20 = 60" },
    { trick: "12.5%", method: "Divide by 8 (halve three times).", example: "12.5% of 64 = 8" },
    { trick: "33 1/3%", method: "Divide by 3.", example: "33.33% of 270 = 90" },
    { trick: "x% of y = y% of x", method: "Symmetry trick: swap base and percentage for faster mental multiplication.", example: "16% of 25 = 25% of 16 = 16 / 4 = 4" }
  ],

  sections: [
    {
      id: "pct-sec-1",
      number: "1",
      title: "Basic Percentage Formulas",
      description: "The fundamental equations connecting part, whole, and percentage value.",
      formulas: [
        {
          id: "formula-1",
          name: "Formula 1: Find the percentage",
          formula: "\\boxed{\\text{Percentage}=\\frac{\\text{Part}}{\\text{Total}}\\times 100\\%}",
          description: "Calculates what percent one quantity is of another.",
          category: "Basics"
        },
        {
          id: "formula-2",
          name: "Formula 2: Find a percentage of a number",
          formula: "\\boxed{\\text{Value}=\\frac{P}{100}\\times N}",
          description: "Computes the actual numerical value of P percent of N.",
          category: "Basics"
        },
        {
          id: "formula-3",
          name: "Formula 3: Find the total number",
          formula: "\\boxed{\\text{Total}=\\frac{\\text{Part}\\times 100}{P}}",
          description: "Recovers the full base total when given a part and its percentage.",
          category: "Basics"
        },
        {
          id: "formula-4",
          name: "Formula 4: Percentage increase or decrease",
          formula: "\\boxed{\\text{Percentage change}=\\frac{\\text{Change}}{\\text{Original}}\\times 100\\%}",
          description: "Change = New - Original (increase) or Original - New (decrease). Denominator is ALWAYS the original value.",
          category: "Basics"
        }
      ],
      examples: [
        {
          id: "pct-ex-1",
          title: "Formula 1 Example",
          question: "A student scored 72 marks out of 90 in an aptitude test. What is the score percentage?",
          steps: [
            { title: "Substitute Part = 72 and Total = 90 into Formula 1", math: "\\frac{72}{90}\\times 100\\% = \\frac{4}{5}\\times 100\\% = 80\\%" }
          ],
          finalAnswer: "80%"
        },
        {
          id: "pct-ex-2",
          title: "Formula 2 Example",
          question: "Find 20% of 750.",
          steps: [
            { title: "Apply Formula 2", math: "\\frac{20}{100}\\times 750 = \\frac{1}{5}\\times 750 = 150" }
          ],
          finalAnswer: "150"
        },
        {
          id: "pct-ex-3",
          title: "Formula 3 Example",
          question: "40% of an unknown number is 200. Find the number.",
          steps: [
            { title: "Apply Formula 3", math: "\\text{Total} = \\frac{200\\times 100}{40} = 5\\times 100 = 500" }
          ],
          finalAnswer: "500"
        },
        {
          id: "pct-ex-4",
          title: "Formula 4 Example",
          question: "A product's retail price rises from ₹200 to ₹250. Calculate the percentage price increase.",
          steps: [
            { title: "Find change and divide by original", math: "\\text{Percentage change} = \\frac{250-200}{200}\\times 100\\% = \\frac{50}{200}\\times 100\\% = 25\\%" }
          ],
          finalAnswer: "25% increase"
        }
      ]
    },
    {
      id: "pct-sec-2",
      number: "2",
      title: "Percentage Increase and Decrease",
      description: "Direct multiplier methods for updating values and calculating reverse original quantities.",
      formulas: [
        {
          id: "formula-5",
          name: "Formula 5: Increase a number by P%",
          formula: "\\boxed{\\text{New value}=\\text{Original}\\times\\frac{100+P}{100}}",
          description: "Multiplies original by (1 + P/100).",
          category: "Change"
        },
        {
          id: "formula-6",
          name: "Formula 6: Decrease a number by P%",
          formula: "\\boxed{\\text{New value}=\\text{Original}\\times\\frac{100-P}{100}}",
          description: "Multiplies original by (1 - P/100).",
          category: "Change"
        },
        {
          id: "formula-7",
          name: "Formula 7: Find original value after an increase",
          formula: "\\boxed{\\text{Original}=\\text{Final}\\times\\frac{100}{100+P}}",
          description: "Reverses a percentage growth.",
          category: "Change"
        },
        {
          id: "formula-8",
          name: "Formula 8: Find original value after a decrease",
          formula: "\\boxed{\\text{Original}=\\text{Final}\\times\\frac{100}{100-P}}",
          description: "Reverses a percentage reduction.",
          category: "Change"
        }
      ],
      examples: [
        {
          id: "pct-ex-5",
          title: "Formula 5 Example",
          question: "Increase 500 by 20%.",
          steps: [
            { title: "Multiply by (100 + 20) / 100", math: "500\\times\\frac{120}{100} = 5\\times 120 = 600" }
          ],
          finalAnswer: "600"
        },
        {
          id: "pct-ex-6",
          title: "Formula 6 Example",
          question: "Decrease 500 by 20%.",
          steps: [
            { title: "Multiply by (100 - 20) / 100", math: "500\\times\\frac{80}{100} = 5\\times 80 = 400" }
          ],
          finalAnswer: "400"
        },
        {
          id: "pct-ex-7",
          title: "Formula 7 Example",
          question: "After a 20% increase, the salary is ₹600. What was the original salary?",
          steps: [
            { title: "Multiply final by 100 / (100 + 20)", math: "600\\times\\frac{100}{120} = 5\\times 100 = 500" }
          ],
          finalAnswer: "₹500"
        },
        {
          id: "pct-ex-8",
          title: "Formula 8 Example",
          question: "After a 20% discount/decrease, the price is ₹400. What was the initial price?",
          steps: [
            { title: "Multiply final by 100 / (100 - 20)", math: "400\\times\\frac{100}{80} = 5\\times 100 = 500" }
          ],
          finalAnswer: "₹500"
        }
      ]
    },
    {
      id: "pct-sec-3",
      number: "3",
      title: "Successive Percentage Changes",
      description: "Fast compound shortcuts where a and b are numerical percentage values.",
      formulas: [
        {
          id: "formula-9",
          name: "Formula 9: Two successive increases",
          formula: "\\boxed{\\text{Net increase}=\\left(a+b+\\frac{ab}{100}\\right)\\%}",
          description: "Compound net effect of two consecutive increases a% and b%.",
          category: "Successive"
        },
        {
          id: "formula-10",
          name: "Formula 10: Two successive decreases",
          formula: "\\boxed{\\text{Net decrease}=\\left(a+b-\\frac{ab}{100}\\right)\\%}",
          description: "Equivalent single discount for two consecutive price drops a% and b%.",
          category: "Successive"
        },
        {
          id: "formula-11",
          name: "Formula 11: Increase by a% and decrease by b%",
          formula: "\\boxed{\\text{Net percentage change}=\\left(a-b-\\frac{ab}{100}\\right)\\%}",
          description: "Positive result means net increase; negative result means net decrease.",
          category: "Successive"
        },
        {
          id: "formula-12",
          name: "Formula 12: Equal increase and decrease by x%",
          formula: "\\boxed{\\text{Net decrease}=\\frac{x^2}{100}\\%}",
          description: "When an item increases by x% and then decreases by x%, there is ALWAYS a net loss of x²/100%.",
          category: "Successive"
        }
      ],
      examples: [
        {
          id: "pct-ex-9",
          title: "Formula 9 Example",
          question: "A town's population increases by 20%, then by 10% the following year. Find the net percentage increase.",
          steps: [
            { title: "Apply Formula 9", math: "\\left(20+10+\\frac{20\\times 10}{100}\\right)\\% = (30 + 2)\\% = 32\\%" }
          ],
          finalAnswer: "32% net increase"
        },
        {
          id: "pct-ex-10",
          title: "Formula 10 Example",
          question: "Find the single equivalent discount for two successive discounts of 20% and 10%.",
          steps: [
            { title: "Apply Formula 10", math: "\\left(20+10-\\frac{20\\times 10}{100}\\right)\\% = (30 - 2)\\% = 28\\%" }
          ],
          finalAnswer: "28% net decrease"
        },
        {
          id: "pct-ex-11",
          title: "Formula 11 Example",
          question: "A salary increases by 20% and in the following quarter is reduced by 10%. What is the overall percentage change?",
          steps: [
            { title: "Apply Formula 11", math: "\\left(20-10-\\frac{20\\times 10}{100}\\right)\\% = (10 - 2)\\% = +8\\%" }
          ],
          finalAnswer: "+8% net increase"
        },
        {
          id: "pct-ex-12",
          title: "Formula 12 Example",
          question: "A stock price increases by 20% on Monday and falls by 20% on Tuesday. Find the net percentage change from the initial price.",
          steps: [
            { title: "Apply Formula 12", math: "\\text{Net decrease} = \\frac{20^2}{100}\\% = \\frac{400}{100}\\% = 4\\%\\text{ decrease}" }
          ],
          finalAnswer: "4% net decrease"
        }
      ]
    },
    {
      id: "pct-sec-4",
      number: "4",
      title: "Ratio and Comparison Formulas",
      description: "Converting percentage comparisons into direct mathematical ratios and finding reciprocal difference percentages.",
      formulas: [
        {
          id: "formula-13",
          name: "Formula 13: If A is P% of B",
          formula: "\\boxed{A:B=P:100}",
          description: "Direct ratio.",
          category: "Ratios"
        },
        {
          id: "formula-14",
          name: "Formula 14: If A is P% more than B",
          formula: "\\boxed{A:B=(100+P):100}",
          description: "Ratio when A exceeds B by P percent.",
          category: "Ratios"
        },
        {
          id: "formula-15",
          name: "Formula 15: If A is P% less than B",
          formula: "\\boxed{A:B=(100-P):100}",
          description: "Ratio when A is smaller than B by P percent.",
          category: "Ratios"
        },
        {
          id: "formula-16",
          name: "Formula 16: If A is P% more than B, how much % is B less than A?",
          formula: "\\boxed{\\frac{P}{100+P}\\times 100\\%}",
          description: "Common exam trap: if A is 25% more than B, B is NOT 25% less than A!",
          category: "Ratios"
        },
        {
          id: "formula-17",
          name: "Formula 17: If A is P% less than B, how much % is B more than A?",
          formula: "\\boxed{\\frac{P}{100-P}\\times 100\\%}",
          description: "Reciprocal excess percentage over a smaller base.",
          category: "Ratios"
        }
      ],
      examples: [
        {
          id: "pct-ex-13",
          title: "Formula 13 Example",
          question: "A is 120% of B. Find ratio A : B.",
          steps: [{ title: "Simplify 120:100", math: "A:B = 120:100 = 6:5" }],
          finalAnswer: "6 : 5"
        },
        {
          id: "pct-ex-14",
          title: "Formula 14 Example",
          question: "A is 20% more than B. Find ratio A : B.",
          steps: [{ title: "A : B = (100 + 20) : 100", math: "A:B = 120:100 = 6:5" }],
          finalAnswer: "6 : 5"
        },
        {
          id: "pct-ex-15",
          title: "Formula 15 Example",
          question: "A is 20% less than B. Find ratio A : B.",
          steps: [{ title: "A : B = (100 - 20) : 100", math: "A:B = 80:100 = 4:5" }],
          finalAnswer: "4 : 5"
        },
        {
          id: "pct-ex-16",
          title: "Formula 16 Example",
          question: "A's salary is 25% more than B's salary. By what percentage is B's salary less than A's salary?",
          steps: [
            { title: "Apply Formula 16 with P = 25", math: "\\frac{25}{100+25}\\times 100\\% = \\frac{25}{125}\\times 100\\% = \\frac{1}{5}\\times 100\\% = 20\\%" }
          ],
          finalAnswer: "20% less"
        },
        {
          id: "pct-ex-17",
          title: "Formula 17 Example",
          question: "A is 20% less than B. By what percent is B more than A?",
          steps: [
            { title: "Apply Formula 17 with P = 20", math: "\\frac{20}{100-20}\\times 100\\% = \\frac{20}{80}\\times 100\\% = \\frac{1}{4}\\times 100\\% = 25\\%" }
          ],
          finalAnswer: "25% more"
        }
      ]
    },
    {
      id: "pct-sec-5",
      number: "5",
      title: "Population, Salary, Votes, and Marks",
      description: "Real-world contextual aptitude applications covering compounding, election votes, and measurement error.",
      formulas: [
        {
          id: "formula-18",
          name: "Formula 18: Population growth",
          formula: "\\boxed{P_n=P_0\\left(1+\\frac{r}{100}\\right)^n}",
          description: "P_0 is initial population, r is annual growth rate in %, and n is number of years.",
          category: "Applications"
        },
        {
          id: "formula-19",
          name: "Formula 19: Population decline",
          formula: "\\boxed{P_n=P_0\\left(1-\\frac{r}{100}\\right)^n}",
          description: "P_0 is initial population, r is annual decline rate in %, and n is number of years.",
          category: "Applications"
        },
        {
          id: "formula-20",
          name: "Formula 20: Percentage of valid votes",
          formula: "\\boxed{\\text{Valid votes}=\\text{Total votes}\\times\\frac{100-I}{100}}",
          description: "Where I is percentage of invalid votes. Candidate votes are calculated on valid votes.",
          category: "Applications"
        },
        {
          id: "formula-21",
          name: "Formula 21: Exam percentage",
          formula: "\\boxed{\\text{Exam percentage}=\\frac{\\text{Marks obtained}}{\\text{Maximum marks}}\\times 100\\%}",
          description: "Standard academic scoring formula.",
          category: "Applications"
        },
        {
          id: "formula-22",
          name: "Formula 22: Percentage error",
          formula: "\\boxed{\\text{Percentage error}=\\frac{|\\text{Actual}-\\text{Correct}|}{|\\text{Correct}|}\\times 100\\%}",
          description: "Denominator is always the true/correct value, not the mistaken value.",
          category: "Applications"
        }
      ],
      examples: [
        {
          id: "pct-ex-18",
          title: "Election Votes Example",
          question: "In an election, 20% of 7,500 polled votes are declared invalid. Find the number of valid votes.",
          steps: [
            { title: "Apply Formula 20", math: "7500\\times\\frac{100-20}{100} = 7500\\times\\frac{80}{100} = 75\\times 80 = 6000" }
          ],
          finalAnswer: "6,000 valid votes"
        }
      ]
    },
    {
      id: "pct-sec-6",
      number: "6",
      title: "Profit, Loss, and Discount Percentages",
      description: "Commercial math definitions and pricing chains connecting Cost Price (CP), Selling Price (SP), and Marked Price (MP).",
      formulas: [
        {
          id: "formula-23",
          name: "Formula 23: Profit percentage",
          formula: "\\boxed{\\text{Profit percentage}=\\frac{\\text{Selling price}-\\text{Cost price}}{\\text{Cost price}}\\times 100\\%}",
          description: "Profit is always calculated with respect to Cost Price.",
          category: "Commercial"
        },
        {
          id: "formula-24",
          name: "Formula 24: Loss percentage",
          formula: "\\boxed{\\text{Loss percentage}=\\frac{\\text{Cost price}-\\text{Selling price}}{\\text{Cost price}}\\times 100\\%}",
          description: "Loss is always calculated with respect to Cost Price.",
          category: "Commercial"
        },
        {
          id: "formula-25",
          name: "Formula 25: Discount percentage",
          formula: "\\boxed{\\text{Discount percentage}=\\frac{\\text{Marked price}-\\text{Selling price}}{\\text{Marked price}}\\times 100\\%}",
          description: "Discount is always calculated with respect to Marked Price (MP).",
          category: "Commercial"
        },
        {
          id: "formula-26",
          name: "Formula 26: Selling price after discount",
          formula: "\\boxed{SP=MP\\times\\frac{100-D}{100}}",
          description: "Where MP is marked price and D is discount percentage.",
          category: "Commercial"
        },
        {
          id: "formula-27",
          name: "Formula 27: Final price after discount and tax",
          formula: "\\boxed{\\text{Final price}=MP\\times\\frac{100-D}{100}\\times\\frac{100+T}{100}}",
          description: "Where D is discount % and T is tax %. Assumes tax is applied after the discount.",
          category: "Commercial"
        }
      ],
      examples: [
        {
          id: "pct-ex-26",
          title: "Discount & Tax Example",
          question: "An item marked at ₹1,000 is sold with a 10% discount and a subsequent 5% sales tax. Calculate the final price paid.",
          steps: [
            { title: "Calculate SP after 10% discount", math: "1000\\times\\frac{90}{100} = 900" },
            { title: "Apply 5% tax on ₹900", math: "900\\times\\frac{105}{100} = 9\\times 105 = 945" }
          ],
          finalAnswer: "₹945"
        }
      ]
    }
  ]
};
