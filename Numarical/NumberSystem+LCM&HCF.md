# Number System, Prime Numbers & LCM-HCF

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, Infosys, Wipro, Accenture, and other campus aptitude rounds. Formulas and step-by-step models are written in GitHub-compatible Markdown/LaTeX.

---

## Table of Contents
1. [Number Theory Fundamentals & Classification](#1-number-theory-fundamentals--classification)
   - [Natural & Whole Numbers](#natural--whole-numbers)
   - [Prime & Composite Numbers](#prime--composite-numbers)
   - [Prime Distribution Intervals (Direct Exam Memory Counts)](#prime-distribution-intervals-direct-exam-memory-counts)
   - [Testing if a Number is Prime](#testing-if-a-number-is-prime)
2. [Prime Factorization, LCM & HCF Framework](#2-prime-factorization-lcm--hcf-framework)
   - [Fundamental Theorem of Arithmetic](#fundamental-theorem-of-arithmetic)
   - [LCM (Least Common Multiple)](#lcm-least-common-multiple)
   - [HCF / GCD (Highest Common Factor)](#hcf--gcd-highest-common-factor)
   - [Two-Number Product Identity](#two-number-product-identity)
   - [Worked Example: LCM & HCF of 24 and 45](#worked-example-lcm--hcf-of-24-and-45)
3. [LCM & HCF of Fractions & Decimals](#3-lcm--hcf-of-fractions--decimals)
   - [Fractions Rule](#fractions-rule)
   - [Decimals (The Golden Rule)](#decimals-the-golden-rule)
   - [Worked Example: Decimal LCM (TCS NQT PYQ)](#worked-example-decimal-lcm-tcs-nqt-pyq)
4. [Ratio & HCF Relationships](#4-ratio--hcf-relationships)
   - [Scalar Factor Representation](#scalar-factor-representation)
   - [Sum, Difference & Product Properties](#sum-difference--product-properties)
   - [Worked Example: Ratio and HCF](#worked-example-ratio-and-hcf)
5. [Divisibility Rules & Digital Root Tests](#5-divisibility-rules--digital-root-tests)
   - [Core Divisibility Tests (2 through 13)](#core-divisibility-tests-2-through-13)
   - [Co-prime Composite Factorization Rule](#co-prime-composite-factorization-rule)
   - [Option Elimination Shortcuts for Placement MCQs](#option-elimination-shortcuts-for-placement-mcqs)
6. [Periodic Simultaneous Events (Traffic Lights, Bells & Laps)](#6-periodic-simultaneous-events-traffic-lights-bells--laps)
   - [The Simultaneous Event Theorem](#the-simultaneous-event-theorem)
   - [Worked Example: Traffic Lights](#worked-example-traffic-lights)
7. [Placement Strategy and Common Mistakes](#7-placement-strategy-and-common-mistakes)
   - [Why this matters for your placement](#why-this-matters-for-your-placement)
   - [What you should do (Golden Execution Rules)](#what-you-should-do-golden-execution-rules)
   - [What you should avoid (Avoidable Traps)](#what-you-should-avoid-avoidable-traps)
8. [Practice Problems: End-of-Topic Homework](#8-practice-problems-end-of-topic-homework)
9. [Quick Formula & Concept Sheet](#9-quick-formula--concept-sheet)

---

## 1. Number Theory Fundamentals & Classification

Number System questions form the bedrock of the Numerical Ability section in TCS NQT. Understanding integer sets and prime properties allows you to solve multiple-choice questions in under 30 seconds.

### Natural & Whole Numbers

- **Natural Numbers ($\mathbb{N}$):** Counting integers strictly positive:
  $$
  \Large
  \mathbb{N} = \{1, 2, 3, 4, 5, \dots\}
  $$
- **Whole Numbers ($\mathbb{W}$):** Natural numbers including zero:
  $$
  \Large
  \mathbb{W} = \{0, 1, 2, 3, 4, \dots\}
  $$
- **Integers ($\mathbb{Z}$):** Positive, negative numbers and zero:
  $$
  \Large
  \mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}
  $$

### Prime & Composite Numbers

- **Prime Numbers:** Integers $P > 1$ that possess **strictly two distinct positive factors**: $1$ and itself.
- **The Number $1$:** Neither prime nor composite, because it has only a single positive divisor ($1$).
- **The Number $2$:** The smallest prime number and the **only even prime number** in mathematics. Every other even number is divisible by 2 and therefore composite.
- **Co-Prime Numbers:** Any two positive integers $a$ and $b$ whose $\text{HCF}(a, b) = 1$. They do not need to be individual prime numbers (e.g., $8$ and $9$ are co-prime).

### Prime Distribution Intervals (Direct Exam Memory Counts)

Memorizing these prime intervals prevents costly manual counting in exam conditions:

| Number Range | Total Prime Numbers | Exact List of Primes |
|---|:---:|---|
| **$1$ to $50$** | **15** | $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47$ |
| **$51$ to $100$** | **10** | $53, 59, 61, 67, 71, 73, 79, 83, 89, 97$ |
| **$1$ to $100$** | **25** | Combined total ($15 + 10$) |
| **$101$ to $200$** | **21** | $101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199$ |
| **$1$ to $200$** | **46** | Combined total ($25 + 21$) |

> [!TIP]
> **Total primes from $1$ to $100$ is exactly $25$**, and from **$1$ to $200$ is exactly $46$**. Direct TCS NQT questions frequently ask for the count or average of primes between two thresholds.

### Testing if a Number is Prime

To test if a large number $N$ is prime:
1. Find the largest integer $k$ such that $k \le \sqrt{N}$.
2. Test divisibility of $N$ by all prime numbers $p \le k$.
3. If $N$ is not divisible by any prime $p \le \sqrt{N}$, then $N$ is strictly prime.

---

## 2. Prime Factorization, LCM & HCF Framework

### Fundamental Theorem of Arithmetic

Every integer $N > 1$ can be uniquely factored into powers of prime numbers:

$$
\Large
N = p_1^{a_1} \cdot p_2^{a_2} \cdot p_3^{a_3} \cdots p_k^{a_k}
$$

### LCM (Least Common Multiple)

The smallest positive integer divisible by all numbers in the set.

$$
\Large
\boxed{\text{LCM} = \prod p_i^{\max(a_i, b_i, \dots)}}
$$

*Rule:* Take the **highest power** of every prime that appears in any of the factorizations.

### HCF / GCD (Highest Common Factor)

The largest positive integer that divides all numbers in the set without remainder.

$$
\Large
\boxed{\text{HCF} = \prod p_i^{\min(a_i, b_i, \dots)}}
$$

*Rule:* Take the **lowest power** of only the **common** prime bases.

### Two-Number Product Identity

For any two positive integers $A$ and $B$:

$$
\Large
\boxed{A \times B = \text{LCM}(A, B) \times \text{HCF}(A, B)}
$$

> [!WARNING]
> This product identity holds strictly for **two** numbers. It does **not** apply to three or more numbers ($A \times B \times C \neq \text{LCM} \times \text{HCF}$).

### Worked Example: LCM & HCF of 24 and 45

**Problem Statement:**
Find the LCM and HCF of $24$ and $45$.

**Step 1: Prime factorization**
$$
\Large
24 = 2^3 \times 3^1 \times 5^0
$$
$$
\Large
45 = 2^0 \times 3^2 \times 5^1
$$

**Step 2: Calculate LCM**
$$
\Large
\text{LCM} = 2^{\max(3,0)} \times 3^{\max(1,2)} \times 5^{\max(0,1)} = 2^3 \times 3^2 \times 5^1 = 8 \times 9 \times 5 = \boxed{\mathbf{360}}
$$

**Step 3: Calculate HCF**
$$
\Large
\text{HCF} = 2^{\min(3,0)} \times 3^{\min(1,2)} \times 5^{\min(0,1)} = 2^0 \times 3^1 \times 5^0 = 1 \times 3 \times 1 = \boxed{\mathbf{3}}
$$

**Final Answer:**
The LCM is $\Large \boxed{\mathbf{360}}$ and the HCF is $\Large \boxed{\mathbf{3}}$.

---

## 3. LCM & HCF of Fractions & Decimals

### Fractions Rule

For reduced fractions $\frac{a}{b}, \frac{c}{d}, \frac{e}{f}$:

$$
\Large
\boxed{\text{LCM}\left(\frac{a}{b}, \frac{c}{d}, \frac{e}{f}\right) = \frac{\text{LCM of Numerators }(a, c, e)}{\text{HCF of Denominators }(b, d, f)}}
$$

$$
\Large
\boxed{\text{HCF}\left(\frac{a}{b}, \frac{c}{d}, \frac{e}{f}\right) = \frac{\text{HCF of Numerators }(a, c, e)}{\text{LCM of Denominators }(b, d, f)}}
$$

> [!IMPORTANT]
> All fractions must be reduced to their lowest coprime terms before applying the formula.

### Decimals (The Golden Rule)

> [!CAUTION]
> **The Golden Rule for Decimals:**
> Make the number of decimal digits identical across **all** numbers by appending trailing zeros before applying the fractional formula over a common power of 10.
> **NEVER** reduce individual fractions before computing decimal LCM/HCF.

### Worked Example: Decimal LCM (TCS NQT PYQ)

**Problem Statement:**
Find the LCM of $3.6$, $1.8$, and $0.144$.

**Step 1: Equalize decimal places**
Maximum decimal places $= 3$.
$$
\Large
3.600, \quad 1.800, \quad 0.144
$$

**Step 2: Express over common denominator 1000**
$$
\Large
\frac{3600}{1000}, \quad \frac{1800}{1000}, \quad \frac{144}{1000}
$$

**Step 3: Apply LCM formula**
$$
\Large
\text{LCM} = \frac{\text{LCM}(3600, 1800, 144)}{\text{HCF}(1000, 1000, 1000)} = \frac{3600}{1000} = \boxed{\mathbf{3.6}}
$$

**Final Answer:**
The decimal LCM is $\Large \boxed{\mathbf{3.6}}$.

---

## 4. Ratio & HCF Relationships

When numbers are reduced to their simplest ratio form $a : b$, the scalar factor removed is strictly their **HCF**:

$$
\Large
\boxed{\text{First Number} = a \times \text{HCF}}
\qquad
\boxed{\text{Second Number} = b \times \text{HCF}}
$$

$$
\Large
\boxed{\text{Sum} = (a + b) \times \text{HCF}}
\qquad
\boxed{\text{Difference} = |a - b| \times \text{HCF}}
$$

$$
\Large
\boxed{\text{LCM} = a \times b \times \text{HCF}}
$$

*(Valid because $\gcd(a, b) = 1$.)*

### Worked Example: Ratio and HCF

**Problem Statement:**
Two numbers are in the ratio $7 : 11$ and their $\text{HCF} = 28$. Find their sum.

**Step 1: Apply sum formula**
$$
\Large
\text{Sum} = (7 + 11) \times 28 = 18 \times 28
$$

**Step 2: Fast mental calculation**
$$
\Large
18 \times (30 - 2) = 540 - 36 = \boxed{\mathbf{504}}
$$

**Final Answer:**
The sum of the two numbers is $\Large \boxed{\mathbf{504}}$.

---

## 5. Divisibility Rules & Digital Root Tests

### Core Divisibility Tests

- **Divisible by 2:** Last digit is even ($0, 2, 4, 6, 8$).
- **Divisible by 3:** Sum of digits is divisible by 3.
- **Divisible by 4:** Last two digits form a number divisible by 4.
- **Divisible by 5:** Last digit is 0 or 5.
- **Divisible by 6:** Divisible by both 2 and 3.
- **Divisible by 8:** Last three digits form a number divisible by 8.
- **Divisible by 9:** Sum of digits is divisible by 9.
- **Divisible by 11:** Difference between the sum of odd-position digits and even-position digits is $0$ or a multiple of 11.

### Co-prime Composite Factorization Rule

If a composite number $C = p \times q$ where $\gcd(p, q) = 1$, then a number is divisible by $C$ if and only if it is divisible by both $p$ and $q$.
- $12 \implies$ divisible by $3$ and $4$ (since $\gcd(3,4) = 1$).
- $72 \implies$ divisible by $8$ and $9$ (since $\gcd(8,9) = 1$).
- $88 \implies$ divisible by $8$ and $11$ (since $\gcd(8,11) = 1$).

### Option Elimination Shortcuts for Placement MCQs

1. **Power of 2 check:** If any number in the LCM input contains $16 = 2^4$, the LCM must be a multiple of 16. Eliminate all odd options or numbers not divisible by 16.
2. **Power of 3 check:** If any number contains $27 = 3^3$, eliminate options whose digit sum is not divisible by 9 and 27.
3. **Ending digit clues:** An LCM of numbers containing 5 and any even number must end in $0$.

---

## 6. Periodic Simultaneous Events (Traffic Lights, Bells & Laps)

When physical events occur periodically and the question asks when they will occur **together again**:

$$
\Large
\boxed{\text{Time to next simultaneous occurrence} = \text{LCM of individual event periods}}
$$

### Worked Example: Traffic Lights

**Problem Statement:**
Three traffic lights change every $48\text{ s}$, $72\text{ s}$, and $108\text{ s}$, respectively. If they change simultaneously at $8:20\text{ AM}$, at what time will they change together next?

**Step 1: Compute LCM**
$$
\Large
48 = 2^4 \times 3^1, \quad 72 = 2^3 \times 3^2, \quad 108 = 2^2 \times 3^3
$$
$$
\Large
\text{LCM} = 2^4 \times 3^3 = 16 \times 27 = 432\text{ seconds}
$$

**Step 2: Convert to minutes and seconds**
$$
\Large
\frac{432}{60} = 7\text{ min } 12\text{ s}
$$

**Step 3: Add to base time**
$$
\Large
8:20:00\text{ AM} + 7\text{ min } 12\text{ s} = \boxed{\mathbf{8:27:12\text{ AM}}}
$$

**Final Answer:**
The traffic lights will change together next at $\Large \boxed{\mathbf{8:27:12\text{ AM}}}$.

---

## 7. Placement Strategy and Common Mistakes

### Why this matters for your placement
TCS NQT and top IT recruiters (Cognizant, Infosys, Accenture) feature 3-5 questions on Number Systems, primes, and LCM-HCF in the Foundation Cognitive section. These are high-speed scoring questions that should take under 45 seconds each.

### What you should do (Golden Execution Rules)
- Memorize key prime counts: **15 primes in 1-50**, **25 in 1-100**, **46 in 1-200**.
- Always equalize decimal places with trailing zeros before finding decimal LCM/HCF.
- Check co-prime factors when testing divisibility by large composite divisors like 72 or 88.
- Use unit digits and digital roots to eliminate wrong options immediately without long division.

### What you should avoid (Avoidable Traps)
- **Trap 1:** Never use $A \times B \times C = \text{LCM} \times \text{HCF}$. This formula is strictly valid for two numbers only.
- **Trap 2:** Do not simplify individual decimals before computing LCM. Reducing $\frac{18}{10}$ to $\frac{9}{5}$ alters the base-10 positional value and yields a wrong result.
- **Trap 3:** Never assume 1 is prime. 1 has only one positive factor and is neither prime nor composite.

---

## 8. Practice Problems: End-of-Topic Homework

### Problem 1: Co-prime Numbers
**Problem Statement:**
The LCM of two co-prime numbers is $117$. If one number is $13$, what is the other number?

**Step 1: Use co-prime definition**
For co-prime numbers, $\text{HCF} = 1$.
$$
\Large
A \times B = \text{LCM} \times \text{HCF} = 117 \times 1 = 117
$$

**Step 2: Solve for B**
$$
\Large
13 \times B = 117 \implies B = \frac{117}{13} = \boxed{\mathbf{9}}
$$

**Final Answer:**
The other number is $\Large \boxed{\mathbf{9}}$.

---

### Problem 2: Church Bells Toll
**Problem Statement:**
Five bells begin tolling together and toll at intervals of $4, 6, 8, 10,$ and $12$ seconds, respectively. In $60$ minutes, how many times will they toll together (including the first toll)?

**Step 1: Find LCM of intervals**
$$
\Large
\text{LCM}(4, 6, 8, 10, 12) = 120\text{ seconds} = 2\text{ minutes}
$$

**Step 2: Calculate total tolls in 60 minutes**
$$
\Large
\text{Total tolls} = \frac{60}{2} + 1 = 30 + 1 = \boxed{\mathbf{31}}
$$

**Final Answer:**
The bells toll together $\Large \boxed{\mathbf{31}}$ times.

---

## 9. Quick Formula & Concept Sheet

| Concept | Mathematical Formula / Rule | Application Note |
|---|---|---|
| **Two-Number Product** | $A \times B = \text{LCM}(A, B) \times \text{HCF}(A, B)$ | Valid strictly for pairs of numbers |
| **LCM of Fractions** | $\text{LCM} = \frac{\text{LCM}(\text{numerators})}{\text{HCF}(\text{denominators})}$ | Reduce fractions to lowest terms first |
| **HCF of Fractions** | $\text{HCF} = \frac{\text{HCF}(\text{numerators})}{\text{LCM}(\text{denominators})}$ | Reduce fractions to lowest terms first |
| **Decimal LCM/HCF** | Equalize decimals $\to$ convert to common base-10 | Never reduce individual fractions |
| **Ratio & HCF** | Numbers are $a \cdot H$ and $b \cdot H$; $\text{LCM} = a \cdot b \cdot H$ | Where $\gcd(a, b) = 1$ |
| **Prime Count 1-100** | Exactly $25$ prime numbers | $15$ in $1-50$; $10$ in $51-100$ |
| **Prime Count 1-200** | Exactly $46$ prime numbers | $25$ in $1-100$; $21$ in $101-200$ |
| **Simultaneous Events** | Next event time $= \text{LCM}(\text{intervals})$ | Bells, traffic lights, race laps |

*Revision tip: When dealing with divisibility by 72, test divisibility by 8 (last 3 digits) and 9 (sum of digits) independently.*
