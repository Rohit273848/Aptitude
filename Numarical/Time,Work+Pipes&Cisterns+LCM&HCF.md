# Time & Work, Pipes & Cisterns + LCM & HCF

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, Infosys, Wipro, and other campus aptitude rounds. Formulas and step-by-step models are written in GitHub-compatible Markdown/LaTeX.

## Table of Contents

1. [Mathematical Foundation: Prime Numbers, LCM & HCF](#1-mathematical-foundation-prime-numbers-lcm--hcf)
   - [Number Theory Fundamentals](#number-theory-fundamentals)
   - [Prime Factorization Method for LCM & HCF](#prime-factorization-method-for-lcm--hcf)
   - [Inspection & Elimination Shortcut for MCQ Options](#inspection--elimination-shortcut-for-mcq-options)
   - [LCM & HCF of Fractions](#lcm--hcf-of-fractions)
   - [LCM & HCF of Decimals (The Golden Rule)](#lcm--hcf-of-decimals-the-golden-rule)
   - [Ratio and HCF Relationship](#ratio-and-hcf-relationship)
   - [Simultaneous Periodic Events (Traffic Lights, Bells & Laps)](#simultaneous-periodic-events-traffic-lights-bells--laps)
2. [Core Time & Work Framework: The Efficiency Model](#2-core-time--work-framework-the-efficiency-model)
   - [Why the Direct Day-Addition Method Fails](#why-the-direct-day-addition-method-fails)
   - [The Fundamental Efficiency Equation](#the-fundamental-efficiency-equation)
   - [The Standard 3-Step LCM Workflow](#the-standard-3-step-lcm-workflow)
3. [Question Types in Time & Work](#3-question-types-in-time--work)
   - [Type 1: Basic Combined Work (2, 3, and 4 Workers)](#type-1-basic-combined-work-2-3-and-4-workers)
   - [Type 2: Fractional Work Given](#type-2-fractional-work-given)
   - [Type 3: Work Done for Partial Days & Fraction Remaining](#type-3-work-done-for-partial-days--fraction-remaining)
   - [Type 4: One Worker Known, Pair Known (Finding the Unknown Partner)](#type-4-one-worker-known-pair-known-finding-the-unknown-partner)
   - [Type 5: Mid-Work Worker Leaving, Joining & Dynamic Team Changes](#type-5-mid-work-worker-leaving-joining--dynamic-team-changes)
4. [Pipes and Cisterns](#4-pipes-and-cisterns)
   - [Analogies Between Time & Work and Tank Problems](#analogies-between-time--work-and-tank-problems)
   - [Type 1: One Inlet and One Outlet](#type-1-one-inlet-and-one-outlet)
   - [Type 2: Two Inlets and One Unknown Waste Pipe](#type-2-two-inlets-and-one-unknown-waste-pipe)
5. [Placement Strategy and Common Mistakes](#5-placement-strategy-and-common-mistakes)
   - [Why this matters for your placement](#why-this-matters-for-your-placement)
   - [What you should do (Golden Execution Rules)](#what-you-should-do-golden-execution-rules)
   - [What you should avoid (Avoidable Traps)](#what-you-should-avoid-avoidable-traps)
6. [Practice Problem: End-of-Video Homework Problem](#6-practice-problem-end-of-video-homework-problem)
7. [Quick Formula & Concept Sheet](#quick-formula--concept-sheet)

---

## 1. Mathematical Foundation: Prime Numbers, LCM & HCF

The LCM method is the computational engine of quantitative aptitude. Mastering prime numbers and factorization rules allows you to eliminate fractions and solve Time & Work and Tank problems mentally in under 30 seconds.

### Number Theory Fundamentals

- **Natural Numbers ($\mathbb{N}$):** The set of positive counting integers:
  $$\Large \{1, 2, 3, 4, 5, \dots\}$$
- **Prime Numbers:** Natural numbers greater than $1$ that have **strictly two distinct positive factors**: $1$ and the number itself.
- **The Number $1$:** Neither prime nor composite, as it possesses only a single positive factor ($1$).
- **The Number $2$:** The smallest prime number and the **only even prime number** in existence. Every other even number is divisible by 2 and therefore composite.
- **Boundary Conditions:** Negative numbers, $0$, and fractions/decimals cannot be classified as prime numbers.

#### Key Prime Distribution Counts (Direct Exam Memory Facts)

Memorizing these prime count intervals eliminates manual counting under exam time pressure:

| Number Range | Total Prime Numbers | Exact List of Primes |
|---|:---:|---|
| **$1$ to $50$** | **15** | $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47$ |
| **$51$ to $100$** | **10** | $53, 59, 61, 67, 71, 73, 79, 83, 89, 97$ |
| **$1$ to $100$** | **25** | Combined total of the two ranges above |
| **$101$ to $200$** | **21** | $101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199$ |

> [!TIP]
> **Total primes from $1$ to $200$ = $25 + 21 = 46$ primes.** Direct questions in TCS NQT often ask for the count of prime numbers or average of primes between two thresholds.

---

### Prime Factorization Method for LCM & HCF

According to the Fundamental Theorem of Arithmetic, every integer $N > 1$ can be uniquely expressed as the product of prime powers:

$$
\Large
N = p_1^{a_1} \cdot p_2^{a_2} \cdot p_3^{a_3} \cdots p_k^{a_k}
$$

#### Definitions

- **LCM (Least Common Multiple):** The smallest positive integer that is divisible by all given numbers.
  $$\Large \boxed{\text{LCM} = \prod p_i^{\max(a_i, b_i, \dots)}}$$
  *Rule:* Take the **highest power** of every prime base that appears in any of the factorizations.
- **HCF / GCD (Highest Common Factor / Greatest Common Divisor):** The largest positive integer that divides all given numbers without a remainder.
  $$\Large \boxed{\text{HCF} = \prod p_i^{\min(a_i, b_i, \dots)}}$$
  *Rule:* Take the **lowest (least) power** of only the **common** prime bases.

#### Fundamental Product Relationship

For any two positive integers $A$ and $B$:

$$
\Large
\boxed{A \times B = \text{LCM}(A, B) \times \text{HCF}(A, B)}
$$

#### Worked Example: LCM & HCF of 24 and 45

Find the LCM and HCF of $24$ and $45$.

**Step 1: Prime factorization**

$$
\Large
24 = 8 \times 3 = 2^3 \times 3^1 \times 5^0
$$

$$
\Large
45 = 9 \times 5 = 2^0 \times 3^2 \times 5^1
$$

**Step 2: Calculate LCM (Highest powers)**

$$
\Large
\text{LCM} = 2^{\max(3,0)} \times 3^{\max(1,2)} \times 5^{\max(0,1)} = 2^3 \times 3^2 \times 5^1 = 8 \times 9 \times 5 = \boxed{\mathbf{360}}
$$

**Step 3: Calculate HCF (Lowest common powers)**

$$
\Large
\text{HCF} = 2^{\min(3,0)} \times 3^{\min(1,2)} \times 5^{\min(0,1)} = 2^0 \times 3^1 \times 5^0 = 1 \times 3 \times 1 = \boxed{\mathbf{3}}
$$

**Verification:**

$$
\Large
A \times B = 24 \times 45 = 1080
$$

$$
\Large
\text{LCM} \times \text{HCF} = 360 \times 3 = 1080 \quad \checkmark
$$

---

### Inspection & Elimination Shortcut for MCQ Options

In multiple-choice placement exams, performing full prime factorization of 3 or 4 large numbers consumes excessive time. Use **prime power divisibility tests** to eliminate wrong options immediately:

1. **Power of 2 check:**
   - If any number in the set contains a factor of $16 = 2^4$ (e.g., $48, 80$), the LCM **must** be divisible by $16$ ($2^4$).
   - Immediately eliminate any option that only contains $8 = 2^3$ or is odd.
2. **Power of 3 check:**
   - If any number in the set contains a factor of $27 = 3^3$ (e.g., $54, 108$), the LCM **must** be divisible by $27$.
   - Eliminate any option whose sum of digits is not a multiple of 9 or 27.
3. **End digit clues:**
   - Multiples of $15$ must terminate in $0$ or $5$.
   - Multiples of $24$ or any even number must end in an even digit ($0, 2, 4, 6, 8$).
   - If an LCM contains factors of both $5$ and an even number, its unit digit **must be $0$**.

---

### LCM & HCF of Fractions

For any set of simplified fractions $\frac{a}{b}, \frac{c}{d}, \frac{e}{f}$:

$$
\Large
\boxed{\text{LCM}\left(\frac{a}{b}, \frac{c}{d}, \frac{e}{f}\right) = \frac{\text{LCM of Numerators }(a, c, e)}{\text{HCF of Denominators }(b, d, f)}}
$$

$$
\Large
\boxed{\text{HCF}\left(\frac{a}{b}, \frac{c}{d}, \frac{e}{f}\right) = \frac{\text{HCF of Numerators }(a, c, e)}{\text{LCM of Denominators }(b, d, f)}}
$$

> [!IMPORTANT]
> Always ensure that each fraction is reduced to its **lowest terms** before applying these formulas.

#### Worked Example: Fractions

Find the LCM and HCF of $\frac{4}{15}$, $\frac{7}{30}$, and $\frac{9}{45}$.

**Step 1: Inspect and simplify fractions**
- $\frac{4}{15}$ (already simplified)
- $\frac{7}{30}$ (already simplified)
- $\frac{9}{45} = \frac{1}{5}$ (or keep with denominator factors for computation)

Using original terms $\frac{4}{15}, \frac{7}{30}, \frac{9}{45}$:

**Step 2: Calculate LCM**
- Numerators: $\{4, 7, 9\}$ are pairwise coprime.
  $$\text{LCM}(4, 7, 9) = 4 \times 7 \times 9 = 252$$
- Denominators: $\{15, 30, 45\}$
  $$\text{HCF}(15, 30, 45) = 15$$

$$
\Large
\text{LCM} = \frac{\text{LCM}(4, 7, 9)}{\text{HCF}(15, 30, 45)} = \frac{252}{15} = \boxed{\mathbf{\frac{84}{5}}}
$$

**Step 3: Calculate HCF**
- Numerator HCF:
  $$\text{HCF}(4, 7, 9) = 1$$
- Denominator LCM:
  $$\text{LCM}(15, 30, 45) = 90$$

$$
\Large
\text{HCF} = \frac{\text{HCF}(4, 7, 9)}{\text{LCM}(15, 30, 45)} = \boxed{\mathbf{\frac{1}{90}}}
$$

---

### LCM & HCF of Decimals (The Golden Rule)

> [!CAUTION]
> **The Golden Rule for Decimals:**
> Make the number of decimal digits identical across **all** terms by appending trailing zeros before applying fraction LCM/HCF formulas.
> 
> **NEVER** reduce individual fractions to lowest terms independently before computing decimal LCM/HCF. Reducing individual fractions alters their positional base-10 denominators and produces incorrect place values.

#### Worked Example (TCS NQT PYQ): Decimal LCM

Find the LCM of $3.6$, $1.8$, and $0.144$.

**Step 1: Identify maximum decimal places**
- $3.6 \implies 1$ decimal place
- $1.8 \implies 1$ decimal place
- $0.144 \implies 3$ decimal places
- Maximum decimal places $= 3$.

**Step 2: Equalize decimal places with trailing zeros**

$$
\Large
3.600, \quad 1.800, \quad 0.144
$$

**Step 3: Express as fractions over the identical denominator ($1000$)**

$$
\Large
\frac{3600}{1000}, \quad \frac{1800}{1000}, \quad \frac{144}{1000}
$$

**Step 4: Apply fraction LCM formula**

$$
\Large
\text{LCM} = \frac{\text{LCM}(3600, 1800, 144)}{\text{HCF}(1000, 1000, 1000)}
$$

Observe divisibility:
- $3600 = 1800 \times 2$ (so $3600$ is a multiple of $1800$)
- $3600 = 144 \times 25$ (since $144 \times 100 / 4 = 144 \times 25 = 3600$)
- Therefore:
  $$\text{LCM}(3600, 1800, 144) = 3600$$

**Step 5: Convert back to decimal**

$$
\Large
\text{LCM} = \frac{3600}{1000} = \boxed{\mathbf{3.6}}
$$

---

### Ratio and HCF Relationship

When two or more numbers are reduced to their simplest ratio form $a : b$, the common scalar factor divided out from both numbers is strictly their **HCF**:

$$
\Large
\boxed{\text{Number } 1 = a \times \text{HCF}}
\qquad
\boxed{\text{Number } 2 = b \times \text{HCF}}
$$

$$
\Large
\boxed{\text{Sum of Numbers} = (a + b) \times \text{HCF}}
$$

$$
\Large
\boxed{\text{Difference of Numbers} = |a - b| \times \text{HCF}}
$$

$$
\Large
\boxed{\text{LCM of Numbers} = a \times b \times \text{HCF}}
$$

*(Note: $\text{LCM} = a \times b \times \text{HCF}$ holds because $a$ and $b$ are coprime: $\gcd(a, b) = 1$.)*

#### Worked Example: Ratio and HCF

Two numbers are in the ratio $7 : 11$ and their $\text{HCF} = 28$. Find their sum.

**Step 1: Apply sum formula**

$$
\Large
\text{Sum} = (a + b) \times \text{HCF} = (7 + 11) \times 28 = 18 \times 28
$$

**Step 2: Unit Digit Technique & Fast Mental Math**
- Unit digit check: $8 \times 8 = 64 \implies$ last digit **must be $4$**.
- Split calculation:
  $$18 \times 28 = 18 \times (30 - 2) = 540 - 36 = \boxed{\mathbf{504}}$$

---

### Simultaneous Periodic Events (Traffic Lights, Bells & Laps)

Whenever events repeat periodically at fixed intervals and the problem asks when they will occur **simultaneously** or **together next**:

$$
\Large
\boxed{\text{Interval until next simultaneous event} = \text{LCM of individual intervals}}
$$

#### Worked Example: Traffic Lights

Three traffic lights at different road crossings change after every $48\text{ s}$, $72\text{ s}$, and $108\text{ s}$, respectively. If they all change simultaneously at $8:20\text{ AM}$, at what time will they change together next?

**Step 1: Prime factorize each interval**

$$
\Large
48 = 16 \times 3 = 2^4 \times 3^1
$$

$$
\Large
72 = 8 \times 9 = 2^3 \times 3^2
$$

$$
\Large
108 = 4 \times 27 = 2^2 \times 3^3
$$

**Step 2: Find LCM**

$$
\Large
\text{LCM}(48, 72, 108) = 2^4 \times 3^3 = 16 \times 27 = 432\text{ seconds}
$$

**Step 3: Convert seconds to minutes and seconds**

$$
\Large
\frac{432}{60} = 7\text{ with a remainder of } 12 \implies 7\text{ minutes and } 12\text{ seconds}
$$

**Step 4: Add to initial timestamp**

$$
\Large
8:20:00\text{ AM} + 7\text{ min } 12\text{ sec} = \boxed{\mathbf{8:27:12\text{ AM}}}
$$

---

## 2. Core Time & Work Framework: The Efficiency Model

### Why the Direct Day-Addition Method Fails

A classic beginner mistake is adding completion days directly:

$$
\Large
10\text{ days} + 20\text{ days} \neq 30\text{ days}
$$

Work and Time share an **inverse proportional relationship**:

$$
\Large
\text{Time} \propto \frac{1}{\text{Rate of Work}}
$$

When more people collaborate on a task, the work is completed **faster**, meaning the total time required must be **less** than the time taken by any single individual working alone. 

Instead of adding time, we must add their individual rates of doing work per unit time, known as **Efficiency** ($\eta$).

---

### The Fundamental Efficiency Equation

Let:
- $W$ = Total Work (measured in arbitrary work units)
- $\eta$ = Efficiency (units of work completed per day/hour/minute)
- $T$ = Total Time required

$$
\Large
\boxed{W = \eta \times T}
\qquad
\boxed{\eta = \frac{W}{T}}
\qquad
\boxed{T = \frac{W}{\eta}}
$$

When multiple workers cooperate simultaneously, their efficiencies are additive:

$$
\Large
\boxed{\eta_{\text{combined}} = \eta_A + \eta_B + \eta_C + \dots}
$$

$$
\Large
\boxed{T_{\text{together}} = \frac{\text{Total Work Units}}{\sum \eta}}
$$

---

### The Standard 3-Step LCM Workflow

By assuming Total Work ($W$) equals the **$\text{LCM}$ of individual day counts**, the resulting efficiency for each worker is guaranteed to be a convenient **positive integer**. This completely bypasses cumbersome fraction additions like $\frac{1}{10} + \frac{1}{15} + \frac{1}{20}$.

```
┌────────────────────────────────────────────────────────┐
│               THE 3-STEP LCM WORKFLOW                  │
├────────────────────────────────────────────────────────┤
│ Step 1: Total Work (W)                                 │
│         W = LCM(Day_A, Day_B, Day_C, ...)              │
├────────────────────────────────────────────────────────┤
│ Step 2: Individual Efficiencies (η)                    │
│         η_A = W / Day_A,   η_B = W / Day_B,  ...       │
├────────────────────────────────────────────────────────┤
│ Step 3: Compute Target Time                            │
│         Time = Required Work Units / Effective η       │
└────────────────────────────────────────────────────────┘
```

---

## 3. Question Types in Time & Work

### Type 1: Basic Combined Work (2, 3, and 4 Workers)

#### Subtype 1A: Two Workers

**Problem:** $A$ can do a piece of work in $12\text{ days}$ and $B$ in $18\text{ days}$. How long will they take working together?

**Step 1: Total Work**

$$
\Large
W = \text{LCM}(12, 18) = 36\text{ units}
$$

*(Note: Choosing $72$ or any multiple also works, but $36$ gives the simplest integers).*

**Step 2: Individual Efficiencies**

$$
\Large
\eta_A = \frac{36}{12} = 3\text{ units/day}
$$

$$
\Large
\eta_B = \frac{36}{18} = 2\text{ units/day}
$$

**Step 3: Combined time**

$$
\Large
\eta_{A+B} = 3 + 2 = 5\text{ units/day}
$$

$$
\Large
T = \frac{36}{5} = \boxed{\mathbf{7\frac{1}{5}\text{ days} = 7.2\text{ days}}}
$$

> [!TIP]
> **Two-Worker Direct Formula:**
> For exactly two workers, $\Large T = \frac{A \times B}{A + B} = \frac{12 \times 18}{12 + 18} = \frac{216}{30} = 7.2\text{ days}$.

---

#### Subtype 1B: Three Workers

**Problem:** $A$ completes a work in $10\text{ days}$, $B$ in $15\text{ days}$, and $C$ in $20\text{ days}$. Working together, how many days will they take?

**Step 1: Total Work**

$$
\Large
W = \text{LCM}(10, 15, 20) = 60\text{ units}
$$

**Step 2: Individual Efficiencies**

$$
\Large
\eta_A = \frac{60}{10} = 6\text{ u/day}, \quad \eta_B = \frac{60}{15} = 4\text{ u/day}, \quad \eta_C = \frac{60}{20} = 3\text{ u/day}
$$

**Step 3: Combined time**

$$
\Large
\sum \eta = 6 + 4 + 3 = 13\text{ units/day}
$$

$$
\Large
T = \frac{60}{13} = \boxed{\mathbf{4\frac{8}{13}\text{ days}}}
$$

---

#### Subtype 1C: Four Workers

**Problem:** $A$ completes a task in $10\text{ days}$, $B$ in $20\text{ days}$, $C$ in $30\text{ days}$, and $D$ in $45\text{ days}$. How many days if all four work together?

**Step 1: Total Work**

$$
\Large
W = \text{LCM}(10, 20, 30, 45) = 180\text{ units}
$$

**Step 2: Individual Efficiencies**

$$
\Large
\eta_A = \frac{180}{10} = 18, \quad \eta_B = \frac{180}{20} = 9, \quad \eta_C = \frac{180}{30} = 6, \quad \eta_D = \frac{180}{45} = 4
$$

**Step 3: Combined time**

$$
\Large
\sum \eta = 18 + 9 + 6 + 4 = 37\text{ units/day}
$$

$$
\Large
T = \frac{180}{37} = \boxed{\mathbf{4\frac{32}{37}\text{ days}}}
$$

---

### Type 2: Fractional Work Given

If a worker completes a fraction $\frac{p}{q}$ of the full work in $d$ days, calculate their **full completion time** first before setting up the LCM:

$$
\Large
\boxed{\text{Time for full work } (100\%) = d \times \frac{q}{p}}
$$

Specifically, if $\frac{1}{n}$ part takes $d$ days $\implies$ Full work takes $\mathbf{n \times d\text{ days}}$.

#### Worked Example: Fractional Work

$A$ completes $\frac{1}{5}$ of a task in $4\text{ days}$. $B$ completes $\frac{1}{6}$ of the same task in $5\text{ days}$. In how many days can they complete the task together?

**Step 1: Normalize to 100% individual completion times**
- $A$'s full time $= 4 \times 5 = 20\text{ days}$
- $B$'s full time $= 5 \times 6 = 30\text{ days}$

**Step 2: Total Work & Efficiencies**

$$
\Large
W = \text{LCM}(20, 30) = 60\text{ units}
$$

$$
\Large
\eta_A = \frac{60}{20} = 3\text{ u/day}, \qquad \eta_B = \frac{60}{30} = 2\text{ u/day}
$$

**Step 3: Time working together**

$$
\Large
\eta_{A+B} = 3 + 2 = 5\text{ u/day}
$$

$$
\Large
T = \frac{60}{5} = \boxed{\mathbf{12\text{ days}}}
$$

---

### Type 3: Work Done for Partial Days & Fraction Remaining

When workers collaborate for a restricted number of days, determine:
1. Work completed in that initial phase
2. Remaining work units
3. Required fraction relative to Total Work

#### Worked Example: Work Left

$A$ alone takes $30\text{ days}$ and $B$ alone takes $60\text{ days}$. If they work together for $5\text{ days}$, what fraction of the work remains unfinished?

**Step 1: Total Work & Efficiencies**

$$
\Large
W = \text{LCM}(30, 60) = 60\text{ units}
$$

$$
\Large
\eta_A = \frac{60}{30} = 2\text{ u/day}, \qquad \eta_B = \frac{60}{60} = 1\text{ u/day}
$$

**Step 2: Work completed in 5 days**

$$
\Large
\eta_{A+B} = 2 + 1 = 3\text{ u/day}
$$

$$
\Large
W_{\text{done}} = 3\text{ u/day} \times 5\text{ days} = 15\text{ units}
$$

**Step 3: Remaining work and fraction**

$$
\Large
W_{\text{remaining}} = 60 - 15 = 45\text{ units}
$$

$$
\Large
\text{Fraction left} = \frac{W_{\text{remaining}}}{W_{\text{total}}} = \frac{45}{60} = \boxed{\mathbf{\frac{3}{4}}}
$$

---

### Type 4: One Worker Known, Pair Known (Finding the Unknown Partner)

When given the time taken by worker $A$ alone and the time taken by $(A + B)$ together:

$$
\Large
\boxed{\eta_B = \eta_{A+B} - \eta_A}
\qquad
\boxed{T_B = \frac{W}{\eta_B}}
$$

#### Worked Example: Finding B Alone

$A$ can do a piece of work in $20\text{ days}$. Working together, $A$ and $B$ can finish the same work in $15\text{ days}$. How many days does $B$ take working alone?

**Step 1: Total Work**

$$
\Large
W = \text{LCM}(20, 15) = 60\text{ units}
$$

**Step 2: Compute efficiencies**

$$
\Large
\eta_A = \frac{60}{20} = 3\text{ u/day}
$$

$$
\Large
\eta_{A+B} = \frac{60}{15} = 4\text{ u/day}
$$

**Step 3: Isolate B's efficiency**

$$
\Large
\eta_B = \eta_{A+B} - \eta_A = 4 - 3 = 1\text{ u/day}
$$

**Step 4: Time for B alone**

$$
\Large
T_B = \frac{60\text{ units}}{1\text{ u/day}} = \boxed{\mathbf{60\text{ days}}}
$$

---

### Type 5: Mid-Work Worker Leaving, Joining & Dynamic Team Changes

#### Subtype 5A: Multi-stage Chain ($A+B$ start, $B$ leaves, $C$ joins)

**Problem:** $A$ and $B$ can do a piece of work in $15\text{ days}$ and $10\text{ days}$, respectively. They begin working together for $4\text{ days}$, after which $B$ leaves. $A$ continues with a new worker $C$, and together they complete the remaining work in $3\text{ days}$. In how many days can $C$ alone complete $40\%$ of the total work?

**Step 1: Base efficiencies of A and B**

$$
\Large
W = \text{LCM}(15, 10) = 30\text{ units}
$$

$$
\Large
\eta_A = \frac{30}{15} = 2\text{ u/day}, \qquad \eta_B = \frac{30}{10} = 3\text{ u/day}
$$

**Step 2: Progress during initial 4-day period**

$$
\Large
W_{\text{Phase 1}} = (\eta_A + \eta_B) \times 4\text{ days} = (2 + 3) \times 4 = 20\text{ units}
$$

$$
\Large
W_{\text{remaining}} = 30 - 20 = 10\text{ units}
$$

**Step 3: Solve for C's efficiency ($\eta_C$)**

$A$ and $C$ finish the remaining $10\text{ units}$ in $3\text{ days}$:

$$
\Large
(\eta_A + \eta_C) \times 3 = 10
$$

$$
\Large
2 + \eta_C = \frac{10}{3} \implies \eta_C = \frac{10}{3} - 2 = \mathbf{\frac{4}{3}\text{ u/day}}
$$

**Step 4: Target workload for C alone**

Target $= 40\%$ of Total Work:

$$
\Large
W_{\text{target}} = 0.40 \times 30 = 12\text{ units}
$$

$$
\Large
\text{Time for } C = \frac{W_{\text{target}}}{\eta_C} = \frac{12}{4/3} = 12 \times \frac{3}{4} = \boxed{\mathbf{9\text{ days}}}
$$

---

#### Subtype 5B: Worker Leaves Early (Continuous Worker Deduction)

**Problem:** $A$ can do a piece of work in $24\text{ days}$ and $B$ in $32\text{ days}$. They start working together. After some days, $B$ leaves, and the entire work is completed in $18\text{ days}$ from start to finish. After how many days did $B$ leave?

> [!TIP]
> **The Continuous Worker Shortcut:**
> When one person leaves midway but the other works without interruption until the end, calculate the work done by the continuous worker for the **entire duration** first!

**Step 1: Total Work & Efficiencies**

$$
\Large
W = \text{LCM}(24, 32) = 96\text{ units}
$$

$$
\Large
\eta_A = \frac{96}{24} = 4\text{ u/day}, \qquad \eta_B = \frac{96}{32} = 3\text{ u/day}
$$

**Step 2: Isolate continuous worker A**

$A$ worked continuously for all $18\text{ days}$:

$$
\Large
W_A = \eta_A \times 18 = 4 \times 18 = 72\text{ units}
$$

**Step 3: Work completed by B**

$$
\Large
W_B = W_{\text{total}} - W_A = 96 - 72 = 24\text{ units}
$$

**Step 4: Days B worked before leaving**

$$
\Large
T_B = \frac{W_B}{\eta_B} = \frac{24}{3} = \boxed{\mathbf{8\text{ days}}}
$$

*(Therefore, $B$ worked for $8\text{ days}$ and left).*

---

## 4. Pipes and Cisterns

### Analogies Between Time & Work and Tank Problems

Pipes and Cisterns problems are mathematically identical to Time & Work, with one critical distinction: **filling** corresponds to positive work, whereas **emptying/leaks** corresponds to negative work.

| Time & Work Concept | Pipes & Cisterns Counterpart | Sign Convention |
|---|---|:---:|
| Worker / Person | Pipe / Tap / Leak | — |
| Total Work ($W$) | Tank Capacity ($C = \text{LCM of times}$) | Positive ($+$) |
| Worker building work | Inlet Pipe (Fills the tank) | **Positive Efficiency ($+\eta$)** |
| Worker destroying work | Outlet Pipe / Leak (Empties the tank) | **Negative Efficiency ($-\eta$)** |
| Combined completion time | Net filling / emptying time | $T = \frac{C}{\sum \eta}$ |

$$
\Large
\boxed{\eta_{\text{net}} = \sum \eta_{\text{inlets}} - \sum \eta_{\text{outlets}}}
$$

- If $\eta_{\text{net}} > 0$: The cistern is **filling**.
- If $\eta_{\text{net}} < 0$: The cistern is **emptying**.

---

### Type 1: One Inlet and One Outlet

**Problem:** Tap $A$ can fill a cistern in $8\text{ hours}$, while Tap $B$ can empty it in $16\text{ hours}$. If both taps are opened simultaneously, how long will it take to fill the empty cistern?

**Step 1: Total Tank Capacity**

$$
\Large
C = \text{LCM}(8, 16) = 16\text{ units}
$$

**Step 2: Individual Efficiencies with Signs**

$$
\Large
\eta_A = +\frac{16}{8} = +2\text{ u/hr} \quad \text{(Inlet)}
$$

$$
\Large
\eta_B = -\frac{16}{16} = -1\text{ u/hr} \quad \text{(Outlet)}
$$

**Step 3: Net filling rate & time**

$$
\Large
\eta_{\text{net}} = \eta_A + \eta_B = +2 - 1 = +1\text{ u/hr}
$$

$$
\Large
T = \frac{C}{\eta_{\text{net}}} = \frac{16}{1} = \boxed{\mathbf{16\text{ hours}}}
$$

---

### Type 2: Two Inlets and One Unknown Waste Pipe

**Problem:** Taps $A$ and $B$ can fill a cistern in $12\text{ minutes}$ and $15\text{ minutes}$, respectively. A waste pipe $C$ is also opened. When all three pipes operate together, the full cistern is filled in $20\text{ minutes}$. How long will the waste pipe $C$ alone take to empty the full cistern?

**Step 1: Tank Capacity**

$$
\Large
C = \text{LCM}(12, 15, 20) = 60\text{ units}
$$

**Step 2: Efficiencies of known inlet pipes**

$$
\Large
\eta_A = +\frac{60}{12} = +5\text{ u/min}
$$

$$
\Large
\eta_B = +\frac{60}{15} = +4\text{ u/min}
$$

**Step 3: Combined net efficiency**

Since the problem states the tank **fills** in $20\text{ minutes}$:

$$
\Large
\eta_{\text{net}} = \eta_{A+B+C} = +\frac{60}{20} = +3\text{ u/min}
$$

**Step 4: Solve for waste pipe efficiency ($\eta_C$)**

$$
\Large
\eta_A + \eta_B + \eta_C = \eta_{\text{net}}
$$

$$
\Large
5 + 4 + \eta_C = +3
$$

$$
\Large
9 + \eta_C = 3 \implies \eta_C = 3 - 9 = \mathbf{-6\text{ u/min}}
$$

The negative sign confirms $C$ is an emptying/waste pipe with an emptying rate of $6\text{ units/min}$.

**Step 5: Time for C alone to empty the full tank**

$$
\Large
T_C = \frac{C}{|\eta_C|} = \frac{60}{6} = \boxed{\mathbf{10\text{ minutes}}}
$$

> [!WARNING]
> **Placement Exam Trap (Fills vs Empties):**
> Read the final outcome carefully! If the problem had stated that all three pipes **empty** the tank in $20\text{ minutes}$, the net rate would be $\mathbf{-3\text{ u/min}}$:
> $$9 + \eta_C = -3 \implies \eta_C = -12\text{ u/min} \implies T_C = \frac{60}{12} = 5\text{ minutes}$$

---

## 5. Placement Strategy and Common Mistakes

### Why this matters for your placement

Quantitative aptitude in exams like **TCS NQT (Foundation & Advanced)**, **Cognizant GenC/Next**, **Wipro Elite**, and **Infosys** heavily features Time & Work, Pipes & Cisterns, and LCM/HCF. 

The traditional algebraic approach using fractions ($\frac{1}{x} + \frac{1}{y} = \frac{1}{t}$) wastes critical time finding common denominators on scratch paper. The **LCM Efficiency Model converts every problem into simple mental whole numbers**, reducing average solution time from 90 seconds to under 30 seconds.

### What you should do (Golden Execution Rules)

1. **Normalize Fractional Work Immediately:** If someone completes $\frac{p}{q}$ of work in $d$ days, write down $T_{\text{full}} = d \times \frac{q}{p}$ before calculating the LCM.
2. **Isolate the Continuous Worker First:** In worker-leaving problems where person $A$ stays from start to finish, compute $W_A = \eta_A \times T_{\text{total}}$ immediately. The remaining work belongs exclusively to the departing worker.
3. **Equalize Decimal Places for LCM/HCF:** Always pad with trailing zeros ($3.600, 1.800, 0.144$) to match the maximum number of decimal places before setting denominators to $10^k$.
4. **Leverage HCF in Ratios:** When numbers are in ratio $a : b$, remember the common scalar multiplier is their $\text{HCF}$. Sum $= (a + b) \times \text{HCF}$, $\text{LCM} = a \times b \times \text{HCF}$.
5. **Assign Explicit Signs for Pipes:** Write $+ \eta$ for inlets and $- \eta$ for outlets immediately to avoid accidental sign flips.

### What you should avoid (Avoidable Traps)

- ❌ **Never add days directly:** $10\text{ days} + 20\text{ days} \neq 30\text{ days}$. Add efficiencies, not time.
- ❌ **Never reduce decimal fractions independently:** Simplifying $3.6 \to \frac{18}{5}$ and $0.144 \to \frac{18}{125}$ before finding fraction LCM produces the wrong decimal place value!
- ❌ **Do not confuse "Fills in $T$ min" with "Empties in $T$ min":** The sign of net efficiency changes from positive to negative.
- ❌ **Don't ignore the difference between "Time worked by B" vs "Time work was left to A alone":** Always re-read whether the question asks "After how many days did B leave?" or "How many more days did A take to finish?".

---

## 6. Practice Problem: End-of-Video Homework Problem

### Problem Statement

> **Question:** Pipe $A$ can fill a tank in $12\text{ hours}$ and Pipe $B$ can fill it in $18\text{ hours}$. If both pipes are opened simultaneously, after how many hours should Pipe $B$ be closed so that the tank is completely full in $8\text{ hours}$?

---

### Step-by-Step Rigorous Solution

#### Step 1: Find Tank Capacity and Efficiencies

$$
\Large
C = \text{LCM}(12, 18) = 36\text{ units}
$$

$$
\Large
\eta_A = +\frac{36}{12} = +3\text{ units/hour}
$$

$$
\Large
\eta_B = +\frac{36}{18} = +2\text{ units/hour}
$$

---

#### Step 2: Identify the Continuous Pipe

- Both pipes are opened at time $t = 0$.
- Pipe $B$ is turned off after some unknown time $t$.
- The tank is completely filled in exactly $8\text{ hours}$.
- Therefore, **Pipe $A$ remained open for the entire duration of $8\text{ hours}$ without interruption.**

---

#### Step 3: Calculate Work Done by Pipe A

$$
\Large
W_A = \eta_A \times 8\text{ hours} = 3\text{ u/hr} \times 8\text{ hr} = 24\text{ units}
$$

---

#### Step 4: Calculate Remaining Volume Filled by Pipe B

The remaining volume must have been supplied exclusively by Pipe $B$ before it was closed:

$$
\Large
W_B = C - W_A = 36 - 24 = 12\text{ units}
$$

---

#### Step 5: Find the Time Pipe B Was Active

$$
\Large
t_B = \frac{W_B}{\eta_B} = \frac{12\text{ units}}{2\text{ u/hr}} = \boxed{\mathbf{6\text{ hours}}}
$$

---

### Alternative Method: Algebraic Formulation

Let $t$ be the number of hours Pipe $B$ was open.
- During the first $t$ hours, both Pipe $A$ and Pipe $B$ are open: rate $= 3 + 2 = 5\text{ u/hr}$.
- During the remaining $(8 - t)$ hours, only Pipe $A$ is open: rate $= 3\text{ u/hr}$.
- Total capacity filled $= 36\text{ units}$.

$$
\Large
(\eta_A + \eta_B) \cdot t + \eta_A \cdot (8 - t) = 36
$$

$$
\Large
(3 + 2)t + 3(8 - t) = 36
$$

$$
\Large
5t + 24 - 3t = 36
$$

$$
\Large
2t = 36 - 24 = 12
$$

$$
\Large
\boxed{t = 6\text{ hours}}
$$

### Final Answer

Pipe $B$ should be closed after $\Large \boxed{\mathbf{6\text{ hours}}}$.

---

## Quick Formula & Concept Sheet

| Concept | Mathematical Formula / Rule | Application Note |
|---|---|---|
| **Fundamental Work Formula** | $\Large W = \eta \times T$ | Work = Efficiency $\times$ Time |
| **Combined Efficiency** | $\Large \eta_{\text{total}} = \eta_A + \eta_B + \dots$ | Add rates of work, never days |
| **Time for Combined Work** | $\Large \displaystyle T = \frac{\text{LCM of days}}{\sum \eta}$ | Guarantees whole-number rates |
| **Two Workers Shortcut** | $\Large \displaystyle T = \frac{A \times B}{A + B}$ | Valid only for two cooperating workers |
| **Fractional Work Normalization** | $\Large \displaystyle T_{\text{full}} = d \times \frac{q}{p}$ | If $\frac{p}{q}$ work is done in $d$ days |
| **Prime Distribution (1–100)** | $\mathbf{25\text{ primes}}$ ($15$ in 1–50, $10$ in 51–100) | $1$ to $200$ has $46$ primes |
| **Two Numbers Product Rule** | $\Large A \times B = \text{LCM} \times \text{HCF}$ | Strictly for two numbers |
| **LCM of Fractions** | $\Large \displaystyle \frac{\text{LCM}(a, c, e)}{\text{HCF}(b, d, f)}$ | Fractions must be in lowest terms |
| **HCF of Fractions** | $\Large \displaystyle \frac{\text{HCF}(a, c, e)}{\text{LCM}(b, d, f)}$ | Fractions must be in lowest terms |
| **Decimal LCM / HCF** | Equalize decimal digits $\to \frac{\text{Integer}}{10^k}$ | **Never** reduce fractions individually |
| **Numbers in Ratio $a : b$** | $\text{Sum} = (a + b) \times H, \quad \text{LCM} = a \cdot b \cdot H$ | Scalar divided out is strictly their HCF ($H$) |
| **Periodic Coincidence** | $\Large T_{\text{next}} = \text{LCM}(\text{intervals})$ | Traffic lights, tolling bells, race track laps |
| **Inlet Pipe Rate** | $\Large +\eta = +\frac{\text{Capacity}}{\text{Filling Time}}$ | Fills the tank (positive work) |
| **Outlet / Leak Pipe Rate** | $\Large -\eta = -\frac{\text{Capacity}}{\text{Emptying Time}}$ | Empties the tank (negative work) |
| **Net Cistern Rate** | $\Large \eta_{\text{net}} = \sum \eta_{\text{inlets}} - \sum \eta_{\text{outlets}}$ | If $\eta_{\text{net}} > 0 \implies$ filling; if $< 0 \implies$ emptying |
| **Continuous Worker Rule** | $\Large W_{\text{other}} = W_{\text{total}} - (\eta_{\text{continuous}} \times T_{\text{total}})$ | Isolate uninterrupted worker first |

---

*Revision tip: In any Time & Work or Cistern problem, write down the LCM on line 1, individual efficiencies on line 2, and the timeline/breakdown on line 3. That structured approach eliminates mistakes under timed test conditions.*
