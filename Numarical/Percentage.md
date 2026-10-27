# Percentages & Shortcut Methods

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, Infosys, Wipro, and other aptitude rounds. Formulas are written in GitHub-compatible Markdown/LaTeX.

## Table of Contents

1. [Fundamentals and Notation](#1-fundamentals-and-notation)
2. [Basic Percentage Formulas](#2-basic-percentage-formulas)
3. [Percentage Increase and Decrease](#3-percentage-increase-and-decrease)
4. [Successive Percentage Changes](#4-successive-percentage-changes)
5. [Ratio and Comparison Framework](#5-ratio-and-comparison-framework)
6. [Expenditure and Consumption (Product Consistency)](#6-expenditure-and-consumption-product-consistency)
7. [Population, Salary, and Exam Marks](#7-population-salary-and-exam-marks)
8. [Profit, Loss, and Discount Percentages](#8-profit-loss-and-discount-percentages)
9. [Fraction-to-Percentage Equivalents](#9-fraction-to-percentage-equivalents)
10. [Fast Mental Calculation Tricks](#10-fast-mental-calculation-tricks)
11. [Placement Strategy and Common Mistakes](#11-placement-strategy-and-common-mistakes)
12. [Practice Problems: Exam Scenarios](#12-practice-problems-exam-scenarios)
13. [Quick Formula Sheet](#13-quick-formula-sheet)

---

## 1. Fundamentals and Notation

### Core definition and notation

The term **percentage** literally translates to "per hundred" (from Latin *per centum*). It represents any dimensionless ratio or fraction as a part out of 100.

Let:

- $P$ = numerical percentage value (for example, $P = 20$ for $20\%$)
- $\text{Multiplier} = \frac{P}{100}$ (the decimal scale factor; for example, $20\% \implies 0.20$)
- $N$ = base quantity or total value

The fundamental conversion relationships are:

$$
\Large
\boxed{P\% = \frac{P}{100}}
\qquad
\boxed{\text{Fraction } \left(\frac{a}{b}\right) \text{ to Percentage} = \frac{a}{b} \times 100\%}
$$

### Notation convention

Unless explicitly defined otherwise in a formula:
- Use $P$ as the pure numerical percentage (e.g., $P = 25$ for $25\%$).
- The fraction $\frac{P}{100}$ serves as the direct multiplier for computational efficiency.

### Warm-up examples

**Example 1: Convert $0.45$ to a percentage.**

$$
\Large
0.45 \times 100\% = \boxed{45\%}
$$

**Example 2: Convert the fraction $\frac{3}{8}$ to a percentage.**

$$
\Large
\frac{3}{8} \times 100\% = 3 \times 12.5\% = \boxed{37.5\%}
$$

**Example 3: Convert $35\%$ to a simplified fraction.**

$$
\Large
35\% = \frac{35}{100} = \boxed{\frac{7}{20}}
$$

---

## 2. Basic Percentage Formulas

### Type 2A: Find the percentage (Part of a whole)

When calculating what percentage a given part represents out of an entire base:

$$
\Large
\boxed{\text{Percentage} = \frac{\text{Part}}{\text{Total}} \times 100\%}
$$

**Example:** A student scores 72 marks out of 90. Find the percentage.

$$
\Large
\text{Percentage} = \frac{72}{90} \times 100\% = \frac{4}{5} \times 100\% = \boxed{80\%}
$$

### Type 2B: Find a percentage of a number

When calculating the absolute value given a percentage $P\%$ and a total $N$:

$$
\Large
\boxed{\text{Value} = \frac{P}{100} \times N}
$$

**Example:** Find $20\%$ of 750.

$$
\Large
\text{Value} = \frac{20}{100} \times 750 = \frac{1}{5} \times 750 = \boxed{150}
$$

### Type 2C: Find the total number when the part is known

When a specific percentage $P\%$ equals a given numerical amount:

$$
\Large
\boxed{\text{Total} = \frac{\text{Part} \times 100}{P}}
$$

**Example:** $40\%$ of a number is 200. Find the original number.

$$
\Large
\text{Total} = \frac{200 \times 100}{40} = 5 \times 100 = \boxed{500}
$$

### Type 2D: Percentage increase or decrease

Percentage change is always measured relative to the **original baseline value**:

$$
\Large
\boxed{\text{Percentage Change} = \frac{\text{Change}}{\text{Original Value}} \times 100\%}
$$

Where:
- For an increase: $\text{Change} = \text{New Value} - \text{Original Value}$
- For a decrease: $\text{Change} = \text{Original Value} - \text{New Value}$

**Example:** A commodity price rises from ₹200 to ₹250. Find the percentage increase.

**Step 1: Calculate change**

$$
\Large
\text{Change} = 250 - 200 = ₹50
$$

**Step 2: Calculate percentage change**

$$
\Large
\text{Percentage Increase} = \frac{50}{200} \times 100\% = \frac{1}{4} \times 100\% = \boxed{25\%}
$$

---

## 3. Percentage Increase and Decrease

### The Multiplier Framework

Instead of performing two separate steps (calculating the change and then adding/subtracting), use multiplying factors:

| Operation | Percentage Change | Multiplier Factor | Direct Calculation ($N = 500$) |
|---|---|---|---|
| Increase by $P\%$ | $+20\%$ | $\Large 1 + \frac{20}{100} = 1.20 = \frac{6}{5}$ | $\Large 500 \times \frac{6}{5} = 600$ |
| Decrease by $P\%$ | $-20\%$ | $\Large 1 - \frac{20}{100} = 0.80 = \frac{4}{5}$ | $\Large 500 \times \frac{4}{5} = 400$ |

### Formula 5: Increase a number by $P\%$

$$
\Large
\boxed{\text{New Value} = \text{Original} \times \frac{100 + P}{100}}
$$

**Example:** Increase 500 by $20\%$.

$$
\Large
\text{New Value} = 500 \times \frac{100 + 20}{100} = 500 \times 1.20 = \boxed{600}
$$

### Formula 6: Decrease a number by $P\%$

$$
\Large
\boxed{\text{New Value} = \text{Original} \times \frac{100 - P}{100}}
$$

**Example:** Decrease 500 by $20\%$.

$$
\Large
\text{New Value} = 500 \times \frac{100 - 20}{100} = 500 \times 0.80 = \boxed{400}
$$

### Formula 7: Find the original value after an increase

$$
\Large
\boxed{\text{Original} = \text{Final} \times \frac{100}{100 + P}}
$$

**Example:** After a $20\%$ increase, a product sells for ₹600. Find the original price.

$$
\Large
\text{Original} = 600 \times \frac{100}{100 + 20} = 600 \times \frac{5}{6} = \boxed{₹500}
$$

### Formula 8: Find the original value after a decrease

$$
\Large
\boxed{\text{Original} = \text{Final} \times \frac{100}{100 - P}}
$$

**Example:** After a $20\%$ decrease, a product sells for ₹400. Find the original price.

$$
\Large
\text{Original} = 400 \times \frac{100}{100 - 20} = 400 \times \frac{5}{4} = \boxed{₹500}
$$

---

## 4. Successive Percentage Changes

When a quantity undergoes multiple consecutive percentage adjustments, the base changes after each step. These formulas eliminate multi-step calculations.

### Master formula (Universal Net Change)

For any two successive percentage changes $a\%$ and $b\%$:

$$
\Large
\boxed{\text{Net \% Change} = \left(a + b + \frac{ab}{100}\right)\%}
$$

*Sign rule:* Substitute $+a, +b$ for increases, and $-a, -b$ for decreases.

### Case 4A: Two successive increases ($+a\%$ and $+b\%$)

$$
\Large
\boxed{\text{Net Increase} = \left(a + b + \frac{ab}{100}\right)\%}
$$

**Example:** A salary increases by $20\%$ and subsequently by $10\%$. Find the overall percentage increase.

$$
\Large
\text{Net Increase} = \left(20 + 10 + \frac{20 \times 10}{100}\right)\% = (30 + 2)\% = \boxed{32\%}
$$

### Case 4B: Two successive decreases ($-a\%$ and $-b\%$)

$$
\Large
\boxed{\text{Net Decrease} = \left(a + b - \frac{ab}{100}\right)\%}
$$

**Example:** The value of an asset depreciates by $20\%$, then by $10\%$ in the next year. Find the total depreciation.

$$
\Large
\text{Net Decrease} = \left(20 + 10 - \frac{20 \times 10}{100}\right)\% = (30 - 2)\% = \boxed{28\%\text{ decrease}}
$$

### Case 4C: Increase by $a\%$ followed by a decrease of $b\%$

$$
\Large
\boxed{\text{Net \% Change} = \left(a - b - \frac{ab}{100}\right)\%}
$$

A positive result indicates a net increase; a negative result indicates a net decrease.

**Example:** A shopkeeper raises the price by $20\%$, then offers a discount of $10\%$.

$$
\Large
\text{Net \% Change} = \left(20 - 10 - \frac{20 \times 10}{100}\right)\% = (10 - 2)\% = \boxed{+8\%\text{ (net increase)}}
$$

### Case 4D: Equal increase and decrease ($+x\%$ and $-x\%$)

When a value is increased by $x\%$ and subsequently decreased by $x\%$ (or vice-versa), there is **always a net decrease**:

$$
\Large
\boxed{\text{Net Decrease} = \frac{x^2}{100}\%}
$$

**Example:** An item price is increased by $20\%$ and then decreased by $20\%$.

$$
\Large
\text{Net Decrease} = \frac{20^2}{100}\% = \frac{400}{100}\% = \boxed{4\%\text{ decrease}}
$$

### Three successive changes

For three successive changes $a\%, b\%, c\%$:

$$
\Large
\boxed{\text{Final Value} = \text{Initial} \times \left(1 \pm \frac{a}{100}\right) \times \left(1 \pm \frac{b}{100}\right) \times \left(1 \pm \frac{c}{100}\right)}
$$

---

## 5. Ratio and Comparison Framework

### Case 5A: If $A$ is $P\%$ of $B$

$$
\Large
\boxed{A : B = P : 100}
$$

**Example:** $A$ is $120\%$ of $B$.

$$
\Large
A : B = 120 : 100 = \boxed{6 : 5}
$$

### Case 5B: If $A$ is $P\%$ more than $B$

$$
\Large
\boxed{A : B = (100 + P) : 100}
$$

**Example:** $A$ is $20\%$ more than $B$.

$$
\Large
A : B = (100 + 20) : 100 = 120 : 100 = \boxed{6 : 5}
$$

### Case 5C: If $A$ is $P\%$ less than $B$

$$
\Large
\boxed{A : B = (100 - P) : 100}
$$

**Example:** $A$ is $20\%$ less than $B$.

$$
\Large
A : B = (100 - 20) : 100 = 80 : 100 = \boxed{4 : 5}
$$

### Case 5D: If $A$ is $P\%$ more than $B$, how much percent is $B$ less than $A$?

Because the base shifts from $B$ to $A$ (which is larger), the percentage drop is smaller:

$$
\Large
\boxed{\% \text{ by which } B \text{ is less than } A = \frac{P}{100 + P} \times 100\%}
$$

**Example:** $A$'s salary is $25\%$ more than $B$'s salary. By what percentage is $B$'s salary less than $A$'s?

$$
\Large
\frac{25}{100 + 25} \times 100\% = \frac{25}{125} \times 100\% = \frac{1}{5} \times 100\% = \boxed{20\%}
$$

### Case 5E: If $A$ is $P\%$ less than $B$, how much percent is $B$ more than $A$?

$$
\Large
\boxed{\% \text{ by which } B \text{ is more than } A = \frac{P}{100 - P} \times 100\%}
$$

**Example:** $A$ is $20\%$ less than $B$. By what percentage is $B$ more than $A$?

$$
\Large
\frac{20}{100 - 20} \times 100\% = \frac{20}{80} \times 100\% = \frac{1}{4} \times 100\% = \boxed{25\%}
$$

---

## 6. Expenditure and Consumption (Product Consistency)

Whenever the product of two variables equals a constant:

$$
\Large
\boxed{\text{Price} \times \text{Consumption} = \text{Expenditure}}
$$

If expenditure is fixed, Price and Consumption are **inversely proportional**:

$$
\Large
\boxed{\text{Price} \propto \frac{1}{\text{Consumption}}}
$$

### Formula: Constant expenditure adjustments

**When Price increases by $P\%$:**

$$
\Large
\boxed{\text{\% Reduction in Consumption} = \frac{P}{100 + P} \times 100\%}
$$

**When Price decreases by $P\%$:**

$$
\Large
\boxed{\text{\% Increase in Consumption} = \frac{P}{100 - P} \times 100\%}
$$

### The Fraction Shortcut Table

If a variable increases by fraction $\frac{a}{b}$, the other must decrease by $\frac{a}{a + b}$ to maintain a constant product:

| Price Change (Fraction) | Consumption Change (Fraction) | Percentage Equivalent |
|:---:|:---:|:---:|
| $\Large +\frac{1}{2}\;(+50\%)$ | $\Large -\frac{1}{3}$ | $\Large -33.33\%$ |
| $\Large +\frac{1}{3}\;(+33.33\%)$ | $\Large -\frac{1}{4}$ | $\Large -25\%$ |
| $\Large +\frac{1}{4}\;(+25\%)$ | $\Large -\frac{1}{5}$ | $\Large -20\%$ |
| $\Large +\frac{1}{5}\;(+20\%)$ | $\Large -\frac{1}{6}$ | $\Large -16.67\%$ |
| $\Large -\frac{1}{4}\;(-25\%)$ | $\Large +\frac{1}{3}$ | $\Large +33.33\%$ |
| $\Large -\frac{1}{5}\;(-20\%)$ | $\Large +\frac{1}{4}$ | $\Large +25\%$ |

---

## 7. Population, Salary, and Exam Marks

### Population growth

Let:
- $P_0$ = initial population
- $r$ = annual growth rate in percent
- $n$ = number of years

$$
\Large
\boxed{P_n = P_0\left(1 + \frac{r}{100}\right)^n}
$$

### Population decline and depreciation

Used for declining population or depreciating equipment/machinery:

$$
\Large
\boxed{P_n = P_0\left(1 - \frac{r}{100}\right)^n}
$$

### Election and valid votes

Let $I$ be the percentage of invalid votes:

$$
\Large
\boxed{\text{Valid Votes} = \text{Total Votes} \times \frac{100 - I}{100}}
$$

**Example:** In an election, $20\%$ of $7,500$ votes were invalid. The winning candidate received $55\%$ of the valid votes. Find the winning candidate's vote count.

$$
\Large
\text{Valid Votes} = 7500 \times \frac{100 - 20}{100} = 7500 \times 0.80 = 6000
$$

$$
\Large
\text{Winner's Votes} = 6000 \times \frac{55}{100} = \boxed{3300}
$$

### Exam percentage and passing marks

$$
\Large
\boxed{\text{Exam Percentage} = \frac{\text{Marks Obtained}}{\text{Maximum Marks}} \times 100\%}
$$

### Percentage error

Always divide by the **correct/true value** as the reference base:

$$
\Large
\boxed{\text{Percentage Error} = \frac{\lvert\text{Actual} - \text{Correct}\rvert}{\lvert\text{Correct}\rvert} \times 100\%}
$$

**Example:** A student multiplied a number by $\frac{3}{5}$ instead of $\frac{5}{3}$. Find the percentage error in the calculation.

Let the number be $\text{LCM}(5, 3) = 15$.
- Correct value $= 15 \times \frac{5}{3} = 25$
- Calculated value $= 15 \times \frac{3}{5} = 9$

$$
\Large
\text{Error} = \frac{\lvert 9 - 25 \rvert}{25} \times 100\% = \frac{16}{25} \times 100\% = \boxed{64\%}
$$

---

## 8. Profit, Loss, and Discount Percentages

Let:
- $CP$ = Cost Price
- $SP$ = Selling Price
- $MP$ = Marked Price (List Price)
- $D$ = Discount percentage
- $T$ = Tax / GST percentage

### Profit and loss percentages

Profit and Loss are always calculated on the **Cost Price ($CP$)**:

$$
\Large
\boxed{\text{Profit \%} = \frac{SP - CP}{CP} \times 100\%}
\qquad
\boxed{\text{Loss \%} = \frac{CP - SP}{CP} \times 100\%}
$$

### Discount and selling price

Discount is always calculated on the **Marked Price ($MP$)**:

$$
\Large
\boxed{\text{Discount \%} = \frac{MP - SP}{MP} \times 100\%}
$$

$$
\Large
\boxed{SP = MP \times \frac{100 - D}{100}}
$$

### Final price after discount and tax

When tax is applied on the discounted price:

$$
\Large
\boxed{\text{Final Price} = MP \times \frac{100 - D}{100} \times \frac{100 + T}{100}}
$$

### Successive discounts

Two successive discounts of $D_1\%$ and $D_2\%$ equal a single net discount:

$$
\Large
\boxed{\text{Single Equivalent Discount} = \left(D_1 + D_2 - \frac{D_1 D_2}{100}\right)\%}
$$

**Example:** Find the single discount equivalent to successive discounts of $20\%$ and $10\%$.

$$
\Large
\left(20 + 10 - \frac{20 \times 10}{100}\right)\% = (30 - 2)\% = \boxed{28\%}
$$

---

## 9. Fraction-to-Percentage Equivalents

Memorizing these standard conversions provides immediate speed advantages in aptitude exams:

| Fraction | Percentage | Decimal Multiplier |
|:---:|:---:|:---:|
| $\Large \frac{1}{2}$ | $50\%$ | $0.50$ |
| $\Large \frac{1}{3}$ | $33.33\% \text{ or } 33\frac{1}{3}\%$ | $0.3333$ |
| $\Large \frac{2}{3}$ | $66.67\% \text{ or } 66\frac{2}{3}\%$ | $0.6667$ |
| $\Large \frac{1}{4}$ | $25\%$ | $0.25$ |
| $\Large \frac{3}{4}$ | $75\%$ | $0.75$ |
| $\Large \frac{1}{5}$ | $20\%$ | $0.20$ |
| $\Large \frac{2}{5}$ | $40\%$ | $0.40$ |
| $\Large \frac{3}{5}$ | $60\%$ | $0.60$ |
| $\Large \frac{4}{5}$ | $80\%$ | $0.80$ |
| $\Large \frac{1}{6}$ | $16.67\% \text{ or } 16\frac{2}{3}\%$ | $0.1667$ |
| $\Large \frac{1}{7}$ | $14.28\% \text{ or } 14\frac{2}{7}\%$ | $0.1428$ |
| $\Large \frac{1}{8}$ | $12.5\% \text{ or } 12\frac{1}{2}\%$ | $0.125$ |
| $\Large \frac{3}{8}$ | $37.5\%$ | $0.375$ |
| $\Large \frac{5}{8}$ | $62.5\%$ | $0.625$ |
| $\Large \frac{1}{9}$ | $11.11\% \text{ or } 11\frac{1}{9}\%$ | $0.1111$ |
| $\Large \frac{1}{10}$ | $10\%$ | $0.10$ |
| $\Large \frac{1}{11}$ | $9.09\% \text{ or } 9\frac{1}{11}\%$ | $0.0909$ |
| $\Large \frac{1}{12}$ | $8.33\% \text{ or } 8\frac{1}{3}\%$ | $0.0833$ |
| $\Large \frac{1}{14}$ | $7.14\%$ | $0.0714$ |
| $\Large \frac{1}{15}$ | $6.67\%$ | $0.0667$ |
| $\Large \frac{1}{16}$ | $6.25\%$ | $0.0625$ |
| $\Large \frac{1}{20}$ | $5\%$ | $0.05$ |
| $\Large \frac{1}{25}$ | $4\%$ | $0.04$ |
| $\Large \frac{1}{40}$ | $2.5\%$ | $0.025$ |
| $\Large \frac{1}{50}$ | $2\%$ | $0.02$ |

---

## 10. Fast Mental Calculation Tricks

### The Reciprocal Property: $x\%$ of $y = y\%$ of $x$

Because multiplication is commutative:

$$
\Large
\boxed{x\% \text{ of } y = y\% \text{ of } x}
$$

Why does this work?

$$
\Large
\frac{x}{100} \times y = \frac{x \times y}{100} = \frac{y}{100} \times x
$$

**Example 1: Find $16\%$ of $25$.**

$$
\Large
16\% \text{ of } 25 = 25\% \text{ of } 16 = \frac{1}{4} \times 16 = \boxed{4}
$$

**Example 2: Find $64\%$ of $50$.**

$$
\Large
64\% \text{ of } 50 = 50\% \text{ of } 64 = \frac{1}{2} \times 64 = \boxed{32}
$$

### Benchmark and Splitting Method

Decompose awkward percentage values into easy mental benchmarks ($50\%, 10\%, 5\%, 1\%$):

- **$10\%$:** Shift the decimal point one place left.
- **$1\%$:** Shift the decimal point two places left.
- **$5\%$:** Take half of the $10\%$ value.
- **$20\%$:** Double the $10\%$ value.
- **$25\%$:** Divide by 4 (or halve twice).
- **$50\%$:** Divide by 2.
- **$75\%$:** Add $50\% + 25\%$ (or multiply by $\frac{3}{4}$).

**Example: Calculate $36\%$ of $450$.**

$$
\Large
10\% \text{ of } 450 = 45 \implies 30\% = 45 \times 3 = 135
$$

$$
\Large
5\% \text{ of } 450 = \frac{45}{2} = 22.5
$$

$$
\Large
1\% \text{ of } 450 = 4.5
$$

$$
\Large
36\% = 135 + 22.5 + 4.5 = \boxed{162}
$$

### Doubling and Halving Method

When multiplying percentages, double one number and halve the other:

**Example: Calculate $35\%$ of $240$.**

$$
\Large
35\% \times 240 = 70\% \times 120 = 7 \times 12 = \boxed{84}
$$

---

## 11. Placement Strategy and Common Mistakes

### Why these shortcuts matter

In timed placement tests (TCS NQT, Infosys, Cognizant, Wipro), each quantitative question has a budget of 40–60 seconds. Building long simultaneous equations consumes too much time. Recognizing decimal multipliers, fraction equivalents, and product consistency enables near-instant mental solutions.

### What to practise

1. Memorize core fraction-percentage conversions up to $\frac{1}{16}$:
   $$
   \Large
   \boxed{\frac{1}{6} = 16.67\%}
   \qquad
   \boxed{\frac{1}{7} = 14.28\%}
   \qquad
   \boxed{\frac{1}{8} = 12.5\%}
   \qquad
   \boxed{\frac{1}{12} = 8.33\%}
   $$
2. Master the product consistency table:
   $$
   \Large
   \boxed{+\frac{a}{b} \longleftrightarrow -\frac{a}{a+b}}
   $$
3. Flip numbers using $x\%$ of $y = y\%$ of $x$ whenever $y$ is a multiple of 25, 50, or 75.
4. Apply the successive change formula $\left(a + b + \frac{ab}{100}\right)\%$ for 2D area problems (length/width variations).
5. Always double-check whether a problem asks for the **value**, the **increase/decrease**, or the **original base**.

### Common mistakes to avoid

- **Wrong base in denominator:** For percentage change, the denominator is ALWAYS the original value, never the updated new value.
- **Summing percentage changes directly:** An increase of $20\%$ followed by a decrease of $20\%$ does NOT equal $0\%$; it equals a **$4\%$ net decrease**.
- **Confusing Marked Price and Cost Price:** Discount is applied to Marked Price ($MP$), whereas Profit/Loss is applied to Cost Price ($CP$).
- **Percentage error denominator:** In error calculation, the denominator must be the **True/Correct** value, never the incorrect measurement.

---

## 12. Practice Problems: Exam Scenarios

### Practice Problem 1: Price Increase and Consumption Reduction

**Question:** The price of petrol increases by $25\%$. By what percentage must a motorist reduce petrol consumption so that the total expenditure on petrol increases by only $10\%$?

### Step-by-step solution

Let:
- Original Price $= 100$
- Original Consumption $= 100$
- Original Expenditure $= 100 \times 100 = 10,000$

New Price after $25\%$ increase:

$$
\Large
\text{New Price} = 100 + 25 = 125
$$

Target Expenditure after $10\%$ increase:

$$
\Large
\text{New Expenditure} = 10,000 \times \frac{110}{100} = 11,000
$$

Calculate required consumption:

$$
\Large
\text{New Consumption} = \frac{\text{New Expenditure}}{\text{New Price}} = \frac{11,000}{125} = 88
$$

Calculate percentage reduction:

$$
\Large
\text{Reduction} = 100 - 88 = \boxed{12\%}
$$

### Final answer

- **Reduction in consumption:** $\Large \boxed{12\%}$

### Faster shortcut

Using proportional ratios:

$$
\Large
\frac{\text{New Expenditure}}{\text{Old Expenditure}} = \frac{\text{New Price}}{\text{Old Price}} \times \frac{\text{New Consumption}}{\text{Old Consumption}}
$$

$$
\Large
\frac{110}{100} = \frac{125}{100} \times \frac{C_{\text{new}}}{C_{\text{old}}}
\implies \frac{C_{\text{new}}}{C_{\text{old}}} = \frac{110}{125} = \frac{22}{25}
$$

$$
\Large
\text{Reduction} = \frac{25 - 22}{25} \times 100\% = \frac{3}{25} \times 100\% = \boxed{12\%}
$$

---

### Practice Problem 2: Pass/Fail Scores and Maximum Marks

**Question:** In a competitive exam, a candidate scores $32\%$ marks and fails by $28$ marks. Another candidate scores $48\%$ marks and obtains $36$ marks above the minimum passing criteria. Determine the maximum marks and the passing percentage required for the exam.

### Step-by-step solution

Let $M$ be the maximum marks.

For Candidate 1:

$$
\Large
\text{Pass Marks} = 0.32M + 28 \tag{1}
$$

For Candidate 2:

$$
\Large
\text{Pass Marks} = 0.48M - 36 \tag{2}
$$

Equating equations (1) and (2):

$$
\Large
0.48M - 36 = 0.32M + 28
$$

$$
\Large
0.48M - 0.32M = 28 + 36
$$

$$
\Large
0.16M = 64 \implies \boxed{M = 400\text{ marks}}
$$

Calculate the passing marks:

$$
\Large
\text{Pass Marks} = 0.32(400) + 28 = 128 + 28 = 156\text{ marks}
$$

Calculate the passing percentage:

$$
\Large
\text{Pass Percentage} = \frac{156}{400} \times 100\% = \boxed{39\%}
$$

### Final answer

- **Maximum marks:** $\Large \boxed{400\text{ marks}}$
- **Passing percentage:** $\Large \boxed{39\%}$

### Faster shortcut

The percentage difference accounts directly for the total gap in marks:

$$
\Large
\text{Percentage difference} = 48\% - 32\% = 16\%
$$

$$
\Large
\text{Marks gap} = 28 + 36 = 64\text{ marks}
$$

$$
\Large
16\% \equiv 64 \implies 1\% \equiv \frac{64}{16} = 4\text{ marks}
$$

$$
\Large
\text{Maximum Marks (100\%)} = 100 \times 4 = \boxed{400\text{ marks}}
$$

Convert the 28 failure marks into percentage:

$$
\Large
\frac{28}{4}\% = 7\%
$$

$$
\Large
\text{Pass Percentage} = 32\% + 7\% = \boxed{39\%}
$$

---

## 13. Quick Formula Sheet

| Concept | Formula |
|---|---|
| Basic Percentage | $\Large \displaystyle \text{Percentage} = \frac{\text{Part}}{\text{Total}} \times 100\%$ |
| Value from Percentage | $\Large \displaystyle \text{Value} = \frac{P}{100} \times N$ |
| Total from Value | $\Large \displaystyle \text{Total} = \frac{\text{Part} \times 100}{P}$ |
| Percentage Change | $\Large \displaystyle \frac{\lvert\text{New} - \text{Original}\rvert}{\text{Original}} \times 100\%$ |
| Value after Increase | $\Large \displaystyle \text{Original} \times \frac{100 + P}{100}$ |
| Value after Decrease | $\Large \displaystyle \text{Original} \times \frac{100 - P}{100}$ |
| Original after Increase | $\Large \displaystyle \text{Final} \times \frac{100}{100 + P}$ |
| Original after Decrease | $\Large \displaystyle \text{Final} \times \frac{100}{100 - P}$ |
| Successive Net Change | $\Large \displaystyle \left(a + b + \frac{ab}{100}\right)\%$ |
| Two Successive Decreases | $\Large \displaystyle \left(a + b - \frac{ab}{100}\right)\%$ |
| Equal Increase & Decrease ($x\%$) | $\Large \displaystyle \frac{x^2}{100}\% \text{ (Always decrease)}$ |
| $A$ is $P\%$ more than $B$ $\implies B < A$ by | $\Large \displaystyle \frac{P}{100 + P} \times 100\%$ |
| $A$ is $P\%$ less than $B$ $\implies B > A$ by | $\Large \displaystyle \frac{P}{100 - P} \times 100\%$ |
| Consumption reduction for constant expenditure | $\Large \displaystyle \frac{P}{100 + P} \times 100\%$ |
| Population after $n$ years (Growth) | $\Large \displaystyle P_n = P_0\left(1 + \frac{r}{100}\right)^n$ |
| Population / Depreciation after $n$ years | $\Large \displaystyle P_n = P_0\left(1 - \frac{r}{100}\right)^n$ |
| Valid Votes in Election | $\Large \displaystyle \text{Total} \times \frac{100 - I}{100}$ |
| Percentage Error | $\Large \displaystyle \frac{\lvert\text{Actual} - \text{Correct}\rvert}{\lvert\text{Correct}\rvert} \times 100\%$ |
| Profit Percentage | $\Large \displaystyle \frac{SP - CP}{CP} \times 100\%$ |
| Loss Percentage | $\Large \displaystyle \frac{CP - SP}{CP} \times 100\%$ |
| Discount Percentage | $\Large \displaystyle \frac{MP - SP}{MP} \times 100\%$ |
| Successive Discounts ($D_1, D_2$) | $\Large \displaystyle \left(D_1 + D_2 - \frac{D_1 D_2}{100}\right)\%$ |
| Reciprocal Property | $\Large \displaystyle x\% \text{ of } y = y\% \text{ of } x$ |

---

*Revision tip: Always identify the base (the "of" value or original value) before setting up the fraction. Recognizing percentage multipliers and fraction equivalents will double your speed in timed exams.*
