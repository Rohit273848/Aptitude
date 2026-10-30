# Ratio & Proportion, Mixtures & Partnership

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, Infosys, Wipro, and other campus aptitude rounds. Formulas and step-by-step models are written in GitHub-compatible Markdown/LaTeX.

## Table of Contents

1. [Fundamentals of Ratios](#1-fundamentals-of-ratios)
   - [Definition and Homogeneity Rule](#definition-and-homogeneity-rule)
   - [Reduction & The HCF Principle](#reduction--the-hcf-principle)
2. [Type 1: Ratio Combination Techniques](#2-type-1-ratio-combination-techniques)
   - [Subtype 1A: Two Ratios ($A:B$ and $B:C \implies A:B:C$)](#subtype-1a-two-ratios-ab-and-bc-implies-abc)
   - [Subtype 1B: Multi-term Ratios ($A:B:C:D$)](#subtype-1b-multi-term-ratios-abcd)
   - [Subtype 1C: Fractional Ratios](#subtype-1c-fractional-ratios)
   - [Subtype 1D: Equality to Ratio Form (The "Hide Method")](#subtype-1d-equality-to-ratio-form-the-hide-method)
3. [Type 2: Division of Amounts & Scaler Multipliers](#3-type-2-division-of-amounts--scaler-multipliers)
   - [The Unit Scaler Concept](#the-unit-scaler-concept)
   - [Exam Scenarios: Sum Given, Fractional Proportions & Difference Given](#exam-scenarios-sum-given-fractional-proportions--difference-given)
4. [Type 3: Proportions & Proportional Types](#4-type-3-proportions--proportional-types)
   - [Extremes and Means Identity](#extremes-and-means-identity)
   - [Mean, Third, and Fourth Proportional Formulations](#mean-third-and-fourth-proportional-formulations)
5. [Type 4: Inserting or Subtracting $x$ to Form a Proportion](#5-type-4-inserting-or-subtracting-x-to-form-a-proportion)
   - [Option Elimination vs. Algebraic Setup](#option-elimination-vs-algebraic-setup)
6. [Type 5: Percentage Shifts in Ratios](#6-type-5-percentage-shifts-in-ratios)
   - [Baseline $100$ Benchmark Technique](#baseline-100-benchmark-technique)
   - [Multiplier Scaling on Categorical Ratios](#multiplier-scaling-on-categorical-ratios)
7. [Type 6: Coin and Denomination Problems](#7-type-6-coin-and-denomination-problems)
   - [Paise Conversion Rule](#paise-conversion-rule)
   - [Worked Problem with Mixed Denominations](#worked-problem-with-mixed-denominations)
8. [Type 7: Partnership Fundamentals](#8-type-7-partnership-fundamentals)
   - [Investment-Time-Profit Identity](#investment-time-profit-identity)
   - [Simple Time Horizon Calculations](#simple-time-horizon-calculations)
   - [Partial Capital Withdrawals and Additions](#partial-capital-withdrawals-and-additions)
9. [Type 8: Age & The Constant Difference Method](#9-type-8-age--the-constant-difference-method)
   - [The Invariant Age Gap Principle](#the-invariant-age-gap-principle)
   - [Direct Unit Gaps vs. Cross-Difference Gap Normalization](#direct-unit-gaps-vs-cross-difference-gap-normalization)
10. [Type 9: Constant Component in Mixtures](#10-type-9-constant-component-in-mixtures)
    - [The Untouched Component Invariant](#the-untouched-component-invariant)
    - [Dilution and Replacement Scenarios](#dilution-and-replacement-scenarios)
11. [Placement Strategy and Common Mistakes](#11-placement-strategy-and-common-mistakes)
    - [Why this matters for your placement](#why-this-matters-for-your-placement)
    - [What you should do (Golden Execution Rules)](#what-you-should-do-golden-execution-rules)
    - [What you should avoid (Avoidable Traps)](#what-you-should-avoid-avoidable-traps)
12. [Practice Problem: End-of-Video Homework Problem](#12-practice-problem-end-of-video-homework-problem)
13. [Quick Formula & Concept Sheet](#quick-formula--concept-sheet)

---

## 1. Fundamentals of Ratios

### Definition and Homogeneity Rule

A **ratio** is a mathematical comparison of two or more quantities of the **same physical dimension**, expressed in the **exact same units**:

$$
\Large
A : B = \frac{A}{B}
$$

#### The Two Homogeneity Rules
1. **Dimension Rule:** You cannot compare two fundamentally different physical quantities.
   - Example: An age ($20\text{ years}$) cannot be compared with a weight ($50\text{ kg}$).
2. **Unit Consistency Rule:** If two quantities represent the same dimension but are written in different units, they **must be converted into identical units** before computing their ratio.
   - You cannot write $50\text{ kg} : 30,000\text{ g}$ directly as $50 : 30,000$.
   - First convert: $30,000\text{ g} = 30\text{ kg}$.
   - Result:
     $$\Large 50\text{ kg} : 30\text{ kg} = 50 : 30 = \boxed{5 : 3}$$

---

### Reduction & The HCF Principle

When an absolute numerical pair is expressed as a simplified ratio, the common scalar divided out is strictly their **Highest Common Factor (HCF / GCD)**:

$$
\Large
50 : 75 = \frac{50}{25} : \frac{75}{25} = 2 : 3 \qquad (\text{where } \text{HCF}(50, 75) = 25)
$$

$$
\Large
\boxed{\text{A ratio } a : b \text{ is in its simplest form} \iff \text{HCF}(a, b) = 1}
$$

Conversely, given a simplified ratio $a : b$ and their common multiplier $k$ (which equals $\text{HCF}$):

$$
\Large
\boxed{\text{Actual Value } 1 = a \cdot k}
\qquad
\boxed{\text{Actual Value } 2 = b \cdot k}
$$

---

## 2. Type 1: Ratio Combination Techniques

### Subtype 1A: Two Ratios ($A:B$ and $B:C \implies A:B:C$)

Given: $A : B = 2 : 3$ and $B : C = 4 : 5$.

#### Method 1: Empty Space Duplication (Recommended for Speed)
Write the terms in a table. Fill any empty cell with its horizontally adjacent row neighbor:

```text
Row 1 (A:B):     2     3    [3]   <-- blank filled by adjacent '3'
Row 2 (B:C):    [4]    4     5    <-- blank filled by adjacent '4'
--------------------------------
Column Product: 2×4   3×4   3×5
Result:          8     12    15
```

$$
\Large
\boxed{A : B : C = 8 : 12 : 15}
$$

#### Method 2: Equating the Common Term via LCM
Make the shared variable ($B$) identical across both expressions:
- $B$ has value $3$ in ratio 1, and $4$ in ratio 2.
- $\text{LCM}(3, 4) = 12$.
- Multiply first ratio by $4$: $(2 \times 4) : (3 \times 4) = 8 : 12$.
- Multiply second ratio by $3$: $(4 \times 3) : (5 \times 3) = 12 : 15$.
- Merged: $\mathbf{8 : 12 : 15}$.

---

### Subtype 1B: Multi-term Ratios ($A:B:C:D$)

Given:
- $A : B = 2 : 3$
- $B : C = 4 : 5$
- $C : D = 2 : 7$

Construct the grid and propagate each row value sideways into any empty cell:

```text
A       B       C       D
2       3      [3]     [3]    <-- filled rightward with 3
[4]     4       5      [5]    <-- filled left with 4, right with 5
[2]    [2]      2       7     <-- filled leftward with 2
--------------------------------
2×4×2  3×4×2   3×5×2   3×5×7
 16     24      30      105
```

$$
\Large
\boxed{A : B : C : D = 16 : 24 : 30 : 105}
$$

Check if $16, 24, 30, 105$ share any common factor: $\text{HCF}(16, 24, 30, 105) = 1$. The ratio is fully simplified.

---

### Subtype 1C: Fractional Ratios

To transform fractional ratios into standard integer ratios, multiply every term by the **LCM of all denominators**.

#### Example 1: Two fractional terms
Simplify $\frac{3}{4} : \frac{5}{3}$.

$$
\Large
\text{LCM}(4, 3) = 12
$$

$$
\Large
\left(\frac{3}{4} \times 12\right) : \left(\frac{5}{3} \times 12\right) = (3 \times 3) : (5 \times 4) = \boxed{9 : 20}
$$

#### Example 2: Three fractional terms
Simplify $\frac{3}{4} : \frac{5}{3} : \frac{1}{5}$.

$$
\Large
\text{LCM}(4, 3, 5) = 60
$$

$$
\Large
\left(\frac{3}{4} \times 60\right) : \left(\frac{5}{3} \times 60\right) : \left(\frac{1}{5} \times 60\right) = (3 \times 15) : (5 \times 20) : (1 \times 12) = \boxed{45 : 100 : 12}
$$

---

### Subtype 1D: Equality to Ratio Form (The "Hide Method")

#### Case 1: Coefficients in Numerator ($2A = 3B = 4C$)

To find the ratio $A : B : C$:
- **To find $A$:** Cover/hide $A$'s coefficient and multiply the other two: $3 \times 4 = 12$
- **To find $B$:** Cover/hide $B$'s coefficient and multiply the other two: $2 \times 4 = 8$
- **To find $C$:** Cover/hide $C$'s coefficient and multiply the other two: $2 \times 3 = 6$

$$
\Large
\text{Raw Ratio} = 12 : 8 : 6
$$

Divide by common factor $2$:

$$
\Large
\boxed{A : B : C = 6 : 4 : 3}
$$

*Alternative LCM approach:* Divide $2A = 3B = 4C$ through by $\text{LCM}(2, 3, 4) = 12$:
$$\frac{2A}{12} = \frac{3B}{12} = \frac{4C}{12} \implies \frac{A}{6} = \frac{B}{4} = \frac{C}{3} \implies A : B : C = 6 : 4 : 3$$

#### Case 2: Pure Denominators with Unit Numerators

$$
\Large
\frac{A}{2} = \frac{B}{3} = \frac{C}{5} = k
$$

$$
\Large
A = 2k, \quad B = 3k, \quad C = 5k \implies \boxed{A : B : C = 2 : 3 : 5}
$$

> [!TIP]
> When variables are divided directly by constants with unit coefficients ($1$), the denominators **are** the direct ratio terms!

---

## 3. Type 2: Division of Amounts & Scaler Multipliers

### The Unit Scaler Concept

When an actual quantity $S$ is divided into parts following a ratio $a : b : c$:

$$
\Large
\boxed{\text{Total Ratio Units} = a + b + c}
$$

$$
\Large
\boxed{\text{Value of 1 Ratio Unit } (k) = \frac{\text{Total Actual Amount}}{\text{Total Ratio Units}}}
$$

$$
\Large
\boxed{\text{Part } A = a \times k, \quad \text{Part } B = b \times k, \quad \text{Part } C = c \times k}
$$

---

### Exam Scenarios

#### Scenario 2A (TCS NQT PYQ): Sum Given with Chained Ratios

**Problem:** The sum of three numbers is $98$. The ratio of the 1st to the 2nd is $2 : 3$, and the 2nd to the 3rd is $5 : 8$. Find the second number.

**Step 1: Merge the ratios**

```text
A     B     C
2     3    [3]
[5]   5     8
--------------
10    15    24
```

$$
\Large
A : B : C = 10 : 15 : 24
$$

**Step 2: Total Units & Scaler**

$$
\Large
\text{Total Units} = 10 + 15 + 24 = 49\text{ units}
$$

$$
\Large
49\text{ units} = 98 \implies 1\text{ unit} = \frac{98}{49} = 2
$$

**Step 3: Calculate second number ($B$)**

$$
\Large
B = 15\text{ units} \times 2 = \boxed{\mathbf{30}}
$$

---

#### Scenario 2B (TCS NQT PYQ): Dividing Money with Fractional Ratios

**Problem:** Divide ₹$782$ into three parts proportional to $\frac{1}{2} : \frac{2}{3} : \frac{3}{4}$. Find the first part.

**Step 1: Convert to integer ratio**

$$
\Large
\text{LCM}(2, 3, 4) = 12
$$

$$
\Large
\left(\frac{1}{2} \times 12\right) : \left(\frac{2}{3} \times 12\right) : \left(\frac{3}{4} \times 12\right) = 6 : 8 : 9
$$

**Step 2: Total Units & Unit Value**

$$
\Large
\text{Total Units} = 6 + 8 + 9 = 23\text{ units}
$$

$$
\Large
23\text{ units} = ₹782 \implies 1\text{ unit} = \frac{782}{23} = 34
$$

**Step 3: First part**

$$
\Large
\text{First Part} = 6 \times 34 = \boxed{\mathbf{₹204}}
$$

---

#### Scenario 2C: Difference Between Specific Parts Given

**Problem:** An amount is divided among $A, B, C, D$ in the ratio $5 : 2 : 4 : 3$. If $C$ receives ₹$1000$ more than $D$, find $B$'s share.

**Step 1: Focus only on the ratio difference between C and D**

$$
\Large
\text{Ratio Gap } (C - D) = 4 - 3 = 1\text{ unit}
$$

**Step 2: Determine unit scaler**

$$
\Large
1\text{ unit} = ₹1000
$$

**Step 3: Compute B's share**

$$
\Large
B\text{'s Share} = 2\text{ units} = 2 \times 1000 = \boxed{\mathbf{₹2000}}
$$

---

## 4. Type 3: Proportions & Proportional Types

### Extremes and Means Identity

Four quantities $A, B, C, D$ are in **proportion** if the ratio of the first two equals the ratio of the last two:

$$
\Large
A : B :: C : D \iff \frac{A}{B} = \frac{C}{D}
$$

$$
\Large
\boxed{\text{Product of Extremes} = \text{Product of Means} \iff A \times D = B \times C}
$$

---

### Mean, Third, and Fourth Proportional Formulations

| Proportion Type | Algebraic Setup | Mathematical Formula | Concept |
|---|:---:|:---:|---|
| **Mean Proportion ($x$)** of $a$ and $b$ | $a : x :: x : b$ | $\Large \boxed{x = \sqrt{a \cdot b}}$ | Geometric Mean of the two numbers |
| **Third Proportion ($x$)** to $a$ and $b$ | $a : b :: b : x$ | $\Large \boxed{x = \frac{b^2}{a}}$ | Extends a continuous geometric ratio |
| **Fourth Proportion ($x$)** to $a, b, c$ | $a : b :: c : x$ | $\Large \boxed{x = \frac{b \cdot c}{a}}$ | Solves the fourth term in an open sequence |

#### Worked Examples

1. **Mean Proportion of $20$ and $5$:**
   $$x = \sqrt{20 \times 5} = \sqrt{100} = \boxed{\mathbf{10}}$$
2. **Third Proportion to $4$ and $6$:**
   $$4 : 6 :: 6 : x \implies x = \frac{6^2}{4} = \frac{36}{4} = \boxed{\mathbf{9}}$$
3. **Fourth Proportion to $12, 15, 16$:**
   $$12 : 15 :: 16 : x \implies 12x = 15 \times 16 = 240 \implies x = \frac{240}{12} = \boxed{\mathbf{20}}$$

---

## 5. Type 4: Inserting or Subtracting $x$ to Form a Proportion

### Option Elimination vs. Algebraic Setup

**Problem:** What number $x$ must be added to each of $7, 16, 43, 79$ so that the resulting numbers are in proportion?
- Options: **(A) 3**, **(B) 5**, **(C) 2**, **(D) 4**

#### The Algebraic Setup (Time Consuming)

$$
\Large
\frac{7 + x}{16 + x} = \frac{43 + x}{79 + x}
$$

Cross-multiplying yields quadratic terms that take 2 minutes of algebra to solve:
$$(7 + x)(79 + x) = (16 + x)(43 + x)$$

#### The Option Elimination Shortcut (Under 15 Seconds)

Test the options directly into both fractions:

**Test Option (B) $x = 5$:**
- Left fraction:
  $$\frac{7 + 5}{16 + 5} = \frac{12}{21} = \frac{4}{7}$$
- Right fraction:
  $$\frac{43 + 5}{79 + 5} = \frac{48}{84} = \frac{4 \times 12}{7 \times 12} = \frac{4}{7}$$

Both simplified ratios equal $\frac{4}{7}$. The condition holds $\implies \boxed{\mathbf{x = 5}}$.

---

## 6. Type 5: Percentage Shifts in Ratios

### Baseline 100 Benchmark Technique

**Problem (TCS NQT PYQ):** Two numbers are $20\%$ and $50\%$ more than a third number, respectively. Find the ratio of the two numbers.

**Step 1: Assume the third reference number is $100$**
- Third Number $= 100$
- First Number $= 100 + 20\% = 120$
- Second Number $= 100 + 50\% = 150$

**Step 2: Take the direct ratio**

$$
\Large
\text{Ratio} = 120 : 150 = \frac{120}{30} : \frac{150}{30} = \boxed{\mathbf{4 : 5}}
$$

---

### Multiplier Scaling on Categorical Ratios

**Problem:** Seats for Mathematics, Physics, and Biology in an institution are in the ratio $5 : 7 : 8$. There is a proposal to increase these seats by $40\%$, $50\%$, and $75\%$, respectively. What will be the ratio of increased seats?

**Step 1: Express percentage increases as decimal or fractional multipliers**
- $+40\% \implies \times 1.40 = \times \frac{7}{5}$
- $+50\% \implies \times 1.50 = \times \frac{3}{2}$
- $+75\% \implies \times 1.75 = \times \frac{7}{4}$

**Step 2: Multiply each ratio term**
- Mathematics: $5 \times \frac{7}{5} = 7$
- Physics: $7 \times \frac{3}{2} = \frac{21}{2}$
- Biology: $8 \times \frac{7}{4} = 14$

**Step 3: Simplify the resulting ratio**

$$
\Large
7 : \frac{21}{2} : 14
$$

Divide all terms by $7$:

$$
\Large
1 : \frac{3}{2} : 2
$$

Multiply all terms by $2$:

$$
\Large
\boxed{\mathbf{2 : 3 : 4}}
$$

---

## 7. Type 6: Coin and Denomination Problems

### Paise Conversion Rule

In currency and coin problems, working in decimal Rupees (e.g. ₹$0.50$, ₹$0.25$) creates clumsy arithmetic. **Always convert all values into integer Paise**:

$$
\Large
\boxed{\text{Total Value in Paise} = \sum (\text{Denomination in Paise} \times \text{Coin Count})}
$$

$$
\Large
₹1 = 100\text{ paise}, \quad 50\text{p} = 50\text{ paise}, \quad 25\text{p} = 25\text{ paise}
$$

---

### Worked Problem

A bag contains ₹$1$, $50\text{p}$, and $25\text{p}$ coins in the ratio $1 : 2 : 2$. If the total value of all coins is ₹$50$, find the total number of $50\text{p}$ coins.

**Step 1: Set algebraic counts from the ratio**
Let the multiplier be $k$:
- Number of ₹$1$ coins $= 1k$
- Number of $50\text{p}$ coins $= 2k$
- Number of $25\text{p}$ coins $= 2k$

**Step 2: Calculate total value generated in paise**

$$
\Large
\text{Value} = (100 \times 1k) + (50 \times 2k) + (25 \times 2k)
$$

$$
\Large
\text{Value} = 100k + 100k + 50k = 250k\text{ paise}
$$

**Step 3: Equate to total money (in paise)**

$$
\Large
₹50 = 50 \times 100 = 5000\text{ paise}
$$

$$
\Large
250k = 5000 \implies k = \frac{5000}{250} = 20
$$

**Step 4: Find 50p coin count**

$$
\Large
\text{Number of } 50\text{p coins} = 2k = 2 \times 20 = \boxed{\mathbf{40\text{ coins}}}
$$

---

## 8. Type 7: Partnership Fundamentals

### Investment-Time-Profit Identity

In any commercial partnership, profit is distributed in direct proportion to the **product of capital invested ($I$) and duration of investment ($T$)**:

$$
\Large
\boxed{\text{Profit } (P) \propto \text{Investment } (I) \times \text{Time } (T)}
$$

$$
\Large
\boxed{P_A : P_B : P_C = (I_A \times T_A) : (I_B \times T_B) : (I_C \times T_C)}
$$

#### Special Cases
- If all partners invest for the **same duration** ($T$ is constant):
  $$\Large P_A : P_B = I_A : I_B$$
- If all partners invest the **same capital** ($I$ is constant):
  $$\Large P_A : P_B = T_A : T_B$$

---

### Simple Time Horizon Calculations

**Problem:** The ratio of investments of $A$ and $B$ is $14 : 15$, and the ratio of their annual profits is $2 : 5$. If $A$ invested his money for $3\text{ months}$, for how many months did $B$ invest?

**Step 1: Formulate equation using the profit ratio identity**

$$
\Large
\frac{P_A}{P_B} = \frac{I_A \times T_A}{I_B \times T_B}
$$

**Step 2: Substitute given values**

$$
\Large
\frac{2}{5} = \frac{14 \times 3}{15 \times T_B}
$$

$$
\Large
\frac{2}{5} = \frac{42}{15 T_B}
$$

$$
\Large
2 \times 15 T_B = 5 \times 42
$$

$$
\Large
30 T_B = 210 \implies T_B = \frac{210}{30} = \boxed{\mathbf{7\text{ months}}}
$$

---

### Partial Capital Withdrawals and Additions

**Problem:** $A$, $B$, and $C$ enter into a business by investing ₹$25,000$ each. After $5\text{ months}$, $A$ withdraws ₹$6,000$, $B$ withdraws ₹$7,000$, and $C$ adds ₹$8,000$. The total profit earned at the end of $1\text{ year}$ is ₹$86,500$. Find the difference between the shares of $A$ and $B$.

**Step 1: Scale down values by dividing by ₹$1000$**
- Initial capital for all: $25$ units for $5\text{ months}$.
- Remaining time: $12 - 5 = 7\text{ months}$.
- $A$'s revised capital: $25 - 6 = 19$
- $B$'s revised capital: $25 - 7 = 18$
- $C$'s revised capital: $25 + 8 = 33$

**Step 2: Compute profit-unit contributions ($I \times T$)**
- **$A$:** $(25 \times 5) + (19 \times 7) = 125 + 133 = 258\text{ units}$
- **$B$:** $(25 \times 5) + (18 \times 7) = 125 + 126 = 251\text{ units}$
- **$C$:** $(25 \times 5) + (33 \times 7) = 125 + 231 = 356\text{ units}$

**Step 3: Total units & value of 1 unit**

$$
\Large
\text{Total Units} = 258 + 251 + 356 = 865\text{ units}
$$

$$
\Large
865\text{ units} = ₹86,500 \implies 1\text{ unit} = \frac{86,500}{865} = ₹100
$$

**Step 4: Compute difference between A and B**

$$
\Large
A - B = 258 - 251 = 7\text{ units}
$$

$$
\Large
\text{Difference} = 7 \times ₹100 = \boxed{\mathbf{₹700}}
$$

---

## 9. Type 8: Age & The Constant Difference Method

### The Invariant Age Gap Principle

> [!IMPORTANT]
> The numerical difference in age between two people **never changes** with the passage of time. If you are 5 years older than your brother today, you will remain exactly 5 years older in 10, 20, or 50 years.

---

### Case 8A: Equal Shifts (Direct Gap)

**Problem:** The ratio of the present ages of Maya and Chhaya is $6 : 5$. In $15\text{ years}$, the ratio will become $9 : 8$. Find Maya's present age.

**Step 1: Check vertical unit increments**
- Maya: $6 \to 9 \implies +3\text{ units}$
- Chhaya: $5 \to 8 \implies +3\text{ units}$

Both vertical shifts are identical ($+3\text{ units}$).

**Step 2: Equate to the actual elapsed time**

$$
\Large
3\text{ units} = 15\text{ years} \implies 1\text{ unit} = 5\text{ years}
$$

**Step 3: Maya's present age**

$$
\Large
\text{Maya} = 6\text{ units} \times 5\text{ years} = \boxed{\mathbf{30\text{ years}}}
$$

---

### Case 8B: Cross-Difference Gap Normalization

When vertical differences are **not** equal, normalize the ratios by cross-multiplying each ratio by the horizontal difference of the other.

**Problem:** The ratio of the present ages of a mother and daughter is $7 : 1$. After $5\text{ years}$, their age ratio becomes $4 : 1$. Find the difference between their present ages.

**Step 1: Identify horizontal age gaps**
- Present ratio ($7 : 1$): $\text{Difference } D_1 = 7 - 1 = 6$
- Future ratio ($4 : 1$): $\text{Difference } D_2 = 4 - 1 = 3$

**Step 2: Equalize horizontal differences**
To make the age difference identical, scale the ratios so their internal gaps match:
- $D_1 = 6$ and $D_2 = 3 \implies \text{LCM}(6, 3) = 6$.
- Multiply future ratio by $\frac{6}{3} = 2$:
  $$\text{Future Ratio} = (4 \times 2) : (1 \times 2) = 8 : 2$$
- Present Ratio remains: $7 : 1$

*(Alternatively, cross-multiply by $3$ and $6$ to get $21:3$ and $24:6$; both methods yield identical answers).*

**Step 3: Check vertical increments**
- Mother: $7 \to 8 \implies +1\text{ unit}$
- Daughter: $1 \to 2 \implies +1\text{ unit}$

**Step 4: Equate to actual years and compute age difference**

$$
\Large
1\text{ unit} = 5\text{ years}
$$

$$
\Large
\text{Present Age Difference} = 7 - 1 = 6\text{ units}
$$

$$
\Large
\text{Difference} = 6 \times 5\text{ years} = \boxed{\mathbf{30\text{ years}}}
$$

---

## 10. Type 9: Constant Component in Mixtures

### The Untouched Component Invariant

When one substance (e.g., water) is added or removed from a mixture, the absolute quantity of the other substance (e.g., pure milk, acid, salt) **remains strictly unchanged**.

$$
\Large
\boxed{\text{Initial Quantity of Untouched Substance} = \text{Final Quantity of Untouched Substance}}
$$

To solve without algebra, simply scale the ratio of the new mixture so that the **untouched component's ratio units match the initial ratio units**.

---

### Worked Problem (TCS NQT PYQ)

In a $60\text{ L}$ mixture of milk and water, the ratio of milk to water is $2 : 1$. How much water must be added to this mixture so that the ratio of milk to water becomes $1 : 2$?

**Step 1: Determine initial volume per unit**
- Initial Ratio: $\text{Milk} : \text{Water} = 2 : 1$
- Total initial units $= 2 + 1 = 3\text{ units}$
- $3\text{ units} = 60\text{ L} \implies 1\text{ unit} = 20\text{ L}$

**Step 2: Identify the untouched component**
- Only **water** is added; the quantity of **milk** is unchanged.
- Initial milk has **$2$ units**.

**Step 3: Equalize milk units in the target ratio**
- Target ratio is $\text{Milk} : \text{Water} = 1 : 2$.
- Multiply the entire target ratio by $2$ to make milk units equal $2$:
  $$\text{New Ratio} = (1 \times 2) : (2 \times 2) = 2 : 4$$

**Step 4: Calculate water added**
- Milk: $2 \to 2$ (unchanged $\checkmark$)
- Water: $1\text{ unit} \to 4\text{ units} \implies +3\text{ units}$

$$
\Large
\text{Water Added} = 3\text{ units} \times 20\text{ L} = \boxed{\mathbf{60\text{ Litres}}}
$$

---

## 11. Placement Strategy and Common Mistakes

### Why this matters for your placement

Ratios, Proportions, Mixtures, and Partnerships appear in almost every TCS NQT Numerical test and campus assessment.
- Setting up traditional $x, y$ simultaneous equations takes $90\text{–}120$ seconds per question.
- Using **Ratio Unit Scaling**, **Horizontal Gap Balancing**, and **Untouched Invariant Components** reduces solving time to **$20\text{–}30$ seconds** completely on scratch paper.

### What you should do (Golden Execution Rules)

1. **Check Multiples in Options First:** If a problem asks for $B$'s share where $B$ corresponds to $7$ ratio units, check the MCQ options for multiples of $7$ before doing math!
2. **Always Use Integers for Coins:** Immediately convert all Rupees into Paise ($₹1 = 100\text{p}$, $50\text{p}$, $25\text{p}$, $10\text{p}$) to eliminate decimal errors.
3. **Equate the Untouched Component:** In mixture addition/evaporation problems, normalize the unchanged ingredient's ratio units first.
4. **Normalize Age Gaps Horizontally:** If vertical age differences don't match, multiply each ratio by the other's internal horizontal difference.
5. **Drop Shared Trailing Zeros in Partnerships:** If investments are ₹$25,000$, ₹$19,000$, etc., divide by $1000$ immediately to work with clean two-digit numbers ($25, 19$).

### What you should avoid (Avoidable Traps)

- ❌ **Never cross-multiply algebraic quadratics for proportion tests:** Testing answer options for $\frac{a+x}{b+x} = \frac{c+x}{d+x}$ takes 10 seconds; cross-multiplying takes over a minute.
- ❌ **Never compare quantities with mismatched units:** Watch for grams vs. kilograms, or months vs. years in partnership terms.
- ❌ **Don't confuse Third Proportion with Fourth Proportion:** 
  - Third proportion of $(a, b)$ is $\frac{b^2}{a}$.
  - Fourth proportion of $(a, b, c)$ is $\frac{bc}{a}$.
- ❌ **Don't alter both components in an addition mixture:** If only water is added, the milk ratio units must be equalized first.

---

## 12. Practice Problem: End-of-Video Homework Problem

### Problem Statement

> **Question:** Two numbers are in the ratio $3 : 5$. If $9$ is subtracted from each, the new ratio becomes $12 : 23$. Find the smaller number.

---

### Method 1: The Constant Difference Invariant Method (Fastest)

#### Step 1: Identify Horizontal Differences
Since the **same quantity ($9$)** is subtracted from both numbers, their difference remains strictly unchanged!
- Initial ratio ($3 : 5$): $\text{Difference } D_1 = 5 - 3 = 2$
- New ratio ($12 : 23$): $\text{Difference } D_2 = 23 - 12 = 11$

#### Step 2: Equalize Differences
Multiply each ratio by the other's difference:
- Multiply initial ratio $(3 : 5)$ by $11$:
  $$(3 \times 11) : (5 \times 11) = 33 : 55 \quad (\text{Difference} = 55 - 33 = 22)$$
- Multiply new ratio $(12 : 23)$ by $2$:
  $$(12 \times 2) : (23 \times 2) = 24 : 46 \quad (\text{Difference} = 46 - 24 = 22)$$

#### Step 3: Check Vertical Reduction
- First number: $33 \to 24 \implies -9\text{ units}$
- Second number: $55 \to 46 \implies -9\text{ units}$

The vertical reduction is exactly $9\text{ units}$.

#### Step 4: Compute Actual Value
Since the actual subtraction is $9$:

$$
\Large
9\text{ units} = 9 \implies 1\text{ unit} = 1
$$

Therefore:
- **Smaller Number:** $\Large 33 \times 1 = \boxed{\mathbf{33}}$
- **Larger Number:** $\Large 55 \times 1 = \mathbf{55}$

---

### Method 2: Algebraic Cross-Multiplication (Verification)

Let the two numbers be $3k$ and $5k$.
Subtract $9$ from each:

$$
\Large
\frac{3k - 9}{5k - 9} = \frac{12}{23}
$$

Cross-multiply:

$$
\Large
23(3k - 9) = 12(5k - 9)
$$

$$
\Large
69k - 207 = 60k - 108
$$

$$
\Large
69k - 60k = 207 - 108
$$

$$
\Large
9k = 99 \implies k = 11
$$

The smaller number is:

$$
\Large
3k = 3 \times 11 = \boxed{\mathbf{33}}
$$

### Final Answer

The smaller number is $\Large \boxed{\mathbf{33}}$.

---

## Quick Formula & Concept Sheet

| Concept | Mathematical Formula / Rule | Key Application |
|---|---|---|
| **Ratio Simplest Form** | $\Large \text{HCF}(a, b) = 1$ | Divide common factor out |
| **Combined Ratio Grid** | Fill empty slots with adjacent row neighbor | Fast $A:B:C:D$ resolution |
| **Fractional Ratios** | Multiply all terms by $\text{LCM}(\text{denominators})$ | Eliminates fractions |
| **Hide Method** | $aA = bB = cC \implies A = bc, B = ac, C = ab$ | Inverts numerator coefficients |
| **Unit Scaler** | $\Large 1\text{ unit} = \frac{\text{Total Actual Amount}}{\sum \text{Ratio Units}}$ | Distributes amounts proportionally |
| **Mean Proportion** | $\Large x = \sqrt{a \cdot b}$ | Continuous proportion middle term |
| **Third Proportion** | $\Large \displaystyle x = \frac{b^2}{a}$ | $a : b :: b : x$ |
| **Fourth Proportion** | $\Large \displaystyle x = \frac{b \cdot c}{a}$ | $a : b :: c : x$ |
| **Proportion Insertion ($x$)** | Test options in $\frac{a+x}{b+x} = \frac{c+x}{d+x}$ | Bypasses quadratic equations |
| **Coin Total Value** | $\Large \text{Total Paise} = \sum (\text{Denom}_p \times \text{Count})$ | Convert ₹ into Paise first |
| **Partnership Profit** | $\Large P_1 : P_2 = (I_1 \times T_1) : (I_2 \times T_2)$ | Profit $\propto$ Investment $\times$ Time |
| **Age / Difference Invariant** | Equalize horizontal gaps: $(a-b) \times \text{other}$ | Age difference is constant across time |
| **Constant Mixture Component** | Scale target ratio to match untouched units | One ingredient unchanged |

---

*Revision tip: Whenever a problem involves two ratios at different time points or before/after adding a single substance, always identify what stayed CONSTANT (the age difference or the untouched liquid) and equalize those ratio units.*

