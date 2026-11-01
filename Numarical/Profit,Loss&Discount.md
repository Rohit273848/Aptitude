# Profit, Loss & Discount

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, Infosys, Wipro, Accenture, and other campus aptitude rounds. Formulas and step-by-step models are written in GitHub-compatible Markdown/LaTeX.

## Table of Contents

1. [Fundamentals & Base Formulas](#1-fundamentals--base-formulas)
   - [Core Terminology: CP, SP, MP](#core-terminology-cp-sp-mp)
   - [Scenario Comparison Matrix](#scenario-comparison-matrix)
   - [Profit % vs. Margin % Divergence](#profit--vs-margin--divergence)
   - [The Golden MP to CP Formula](#the-golden-mp-to-cp-formula)
2. [Successive Discounts](#2-successive-discounts)
   - [Initial-to-Final Ratio Method](#initial-to-final-ratio-method)
   - [Successive Discount Sequence ($50\%, 30\%, 20\%$)](#successive-discount-sequence-50-30-20)
   - [Two Successive Discounts with MRP Valuation (TCS NQT PYQ)](#two-successive-discounts-with-mrp-valuation-tcs-nqt-pyq)
   - [Mixed Fraction Discounts](#mixed-fraction-discounts)
3. ["Buy X, Get Y Free" Retail Schemes](#3-buy-x-get-y-free-retail-schemes)
   - [The Total Articles Rule](#the-total-articles-rule)
   - [Standard Retail Promotions](#standard-retail-promotions)
   - [Hybrid Promotions (Free Articles + Cash Discount + Target Profit)](#hybrid-promotions-free-articles--cash-discount--target-profit)
4. [Direct Scaling, Shifts & Multi-Hand Sales](#4-direct-scaling-shifts--multi-hand-sales)
   - [Direct Marked Price from CP, Discount & Profit](#direct-marked-price-from-cp-discount--profit)
   - [Two-Stage Selling Price Shift ($\text{SP}_1 \to \text{SP}_2$)](#two-stage-selling-price-shift-sp_1-to-sp_2)
   - [Chain / Successive Hand Transfers ($A \to B \to C$)](#chain--successive-hand-transfers-a-to-b-to-c)
5. [Quantity Equating & Article Parity (LCM Method)](#5-quantity-equating--article-parity-lcm-method)
   - [The Cardinal Article Parity Law](#the-cardinal-article-parity-law)
   - [CP of $x$ Articles = SP of $y$ Articles](#cp-of-x-articles--sp-of-y-articles)
   - [Different Rates for Buying and Selling (LCM Parity)](#different-rates-for-buying-and-selling-lcm-parity)
   - [Algebraic Pricing per Group vs. Unit Rate](#algebraic-pricing-per-group-vs-unit-rate)
   - [Damaged / Broken Inventory](#damaged--broken-inventory)
6. [Inverse Price-Quantity Relation ($\text{Amount} = P \times Q$)](#6-inverse-price-quantity-relation-amount--p-times-q)
   - [The Constant Budget Inversion Law](#the-constant-budget-inversion-law)
   - [Constant Rupee Budget Problems](#constant-rupee-budget-problems)
   - [Linear Budget Scaling Across Different Rupee Amounts](#linear-budget-scaling-across-different-rupee-amounts)
7. [Fractional Stock & Weighted Average Method](#7-fractional-stock--weighted-average-method)
   - [The Frequency-Weighting Principle](#the-frequency-weighting-principle)
   - [Split Inventory with Total Profit Given](#split-inventory-with-total-profit-given)
   - [Split Inventory with Total Loss Given](#split-inventory-with-total-loss-given)
   - [Target Break-Even Allocation (Zero Overall Profit/Loss)](#target-break-even-allocation-zero-overall-profitloss)
8. [Placement Strategy and Common Mistakes](#8-placement-strategy-and-common-mistakes)
   - [Why this matters for your placement](#why-this-matters-for-your-placement)
   - [What you should do (Golden Execution Rules)](#what-you-should-do-golden-execution-rules)
   - [What you should avoid (Avoidable Traps)](#what-you-should-avoid-avoidable-traps)
9. [Practice Problems: End-of-Video Homework](#9-practice-problems-end-of-video-homework)
   - [Homework 1: Split Stock with Net Rupee Profit](#homework-1-split-stock-with-net-rupee-profit)
   - [Homework 2: Dishonest Dealer False Weight Gain %](#homework-2-dishonest-dealer-false-weight-gain-)
10. [Quick Formula & Concept Sheet](#10-quick-formula--concept-sheet)

---

## 1. Fundamentals & Base Formulas

Commercial arithmetic is built on three price reference points: Cost Price ($\text{CP}$), Selling Price ($\text{SP}$), and Marked Price ($\text{MP}$).

### Core Terminology: CP, SP, MP

- **Cost Price ($\text{CP}$):** The net expenditure incurred to produce, acquire, or purchase an article (including overhead, freight, or taxes).
- **Selling Price ($\text{SP}$):** The revenue realized when an article is sold to a customer.
- **Marked Price ($\text{MP}$ / $\text{MRP}$):** The list price printed on the label, tag, or catalog of the article. Discounts are calculated exclusively with respect to this price.

---

### Scenario Comparison Matrix

| Scenario | Condition | Absolute Rupee Formula | Percentage Formulation ($\text{Base} = \text{CP}$) |
| :--- | :---: | :--- | :--- |
| **Profit ($P$)** | $\text{SP} > \text{CP}$ | $\Large P = \text{SP} - \text{CP}$ | $\Large \text{Profit } \% = \left(\dfrac{\text{Profit}}{\text{CP}}\right) \times 100$ |
| **Loss ($L$)** | $\text{CP} > \text{SP}$ | $\Large L = \text{CP} - \text{SP}$ | $\Large \text{Loss } \% = \left(\dfrac{\text{Loss}}{\text{CP}}\right) \times 100$ |
| **Break-Even** | $\text{SP} = \text{CP}$ | $\Large \text{No Profit, No Loss}$ | $\Large 0\%$ |

---

### Profit % vs. Margin % Divergence

> [!IMPORTANT]
> **Profit %** is always calculated on **Cost Price ($\text{CP}$)**, whereas **Margin %** is calculated on **Selling Price ($\text{SP}$)**.

$$
\Large
\text{Profit } \% = \left(\frac{\text{Profit}}{\text{CP}}\right) \times 100
\qquad\Longleftrightarrow\qquad
\text{Margin } \% = \left(\frac{\text{Profit}}{\text{SP}}\right) \times 100
$$

#### Worked Example: Profit % vs. Margin %

A shirt is purchased for $\text{CP} = ₹100$ and sold for $\text{SP} = ₹200$.

**Step 1: Calculate absolute profit**

$$
\Large
\text{Profit} = \text{SP} - \text{CP} = 200 - 100 = ₹100
$$

**Step 2: Calculate Profit %**

$$
\Large
\text{Profit } \% = \frac{100}{100} \times 100 = \boxed{\mathbf{100\%}}
$$

**Step 3: Calculate Margin %**

$$
\Large
\text{Margin } \% = \frac{100}{200} \times 100 = \boxed{\mathbf{50\%}}
$$

---

### The Golden MP to CP Formula

Discount ($D$) is the price reduction granted on the Marked Price:

$$
\Large
D = \text{MP} - \text{SP}
\qquad\text{and}\qquad
\text{Discount } \% = \left(\frac{\text{Discount}}{\text{MP}}\right) \times 100
$$

Expressing $\text{SP}$ through both $\text{CP}$ and $\text{MP}$:

$$
\Large
\text{SP} = \text{CP} \times \left(\frac{100 + P\%}{100}\right)
\qquad\text{and}\qquad
\text{SP} = \text{MP} \times \left(\frac{100 - D\%}{100}\right)
$$

Equating both expressions eliminates intermediate $\text{SP}$ entirely, establishing the **Golden Ratio Identity**:

$$
\Large
\boxed{\frac{\text{MP}}{\text{CP}} = \frac{100 + P\%}{100 - D\%}}
\qquad\Longleftrightarrow\qquad
\boxed{\frac{\text{CP}}{\text{MP}} = \frac{100 - D\%}{100 + P\%}}
$$

> [!TIP]
> If the transaction yields a loss ($L\%$) instead of a profit, simply substitute $-L\%$ in place of $+P\%$:
> $$\Large \frac{\text{MP}}{\text{CP}} = \frac{100 - L\%}{100 - D\%}$$

---

## 2. Successive Discounts

### Initial-to-Final Ratio Method

When successive discounts $d_1\%, d_2\%, d_3\%$ are granted, each discount operates on the progressively reduced balance. **Discounts can never be added directly** ($50\% + 30\% + 20\% \neq 100\%$).

#### The 3-Step Ratio Pipeline:

1. Convert each discount percentage to its irreducible fraction:
   $$d\% = \frac{a}{b} \implies \text{Initial (MP)} : \text{Final (SP)} = b : (b - a)$$
2. Align all ratios in two columns: Left ($\text{MP}$) and Right ($\text{SP}$).
3. **Cross-cancel** common factors between the left and right columns, then multiply column-wise to get the net ratio $\text{MP} : \text{SP}$.

---

### Successive Discount Sequence ($50\%, 30\%, 20\%$)

Find the single equivalent discount percentage for successive discounts of $50\%$, $30\%$, and $20\%$.

**Step 1: Convert to fractional reductions**

- $50\% = \frac{1}{2} \implies 2 \longrightarrow 1$
- $30\% = \frac{3}{10} \implies 10 \longrightarrow 7$
- $20\% = \frac{1}{5} \implies 5 \longrightarrow 4$

**Step 2: Cross-cancel across columns**

```text
 Initial (MP)   |   Final (SP)
----------------|--------------
    2 (÷2 -> 1) |       1
   10 (÷2 -> 5) |       7
    5           |       4 (÷4 -> 1)
----------------|--------------
  1 * 5 * 5     |   1 * 7 * 1
     25         :       7
```

$$
\Large
\text{MP} : \text{SP} = 25 : 7
$$

**Step 3: Calculate effective discount %**

$$
\Large
\text{Discount Units} = 25 - 7 = 18\text{ units}
$$

$$
\Large
\text{Effective Discount } \% = \frac{18}{25} \times 100 = \boxed{\mathbf{72\%}}
$$

---

### Two Successive Discounts with MRP Valuation (TCS NQT PYQ)

A retailer grants two successive discounts of $10\%$ and $20\%$ on MRP.
1. Find the effective discount percentage.
2. If $\text{MP} = ₹500$, compute the customer's actual Selling Price ($\text{SP}$).

**Step 1: Fractional ratio setup**

- $10\% = \frac{1}{10} \implies 10 \longrightarrow 9$
- $20\% = \frac{1}{5} \implies 5 \longrightarrow 4$

Cross-cancel $10$ and $4$ by factor $2$:

$$
\Large
\text{MP} = 5 \times 5 = 25\text{ units}
\qquad
\text{SP} = 9 \times 2 = 18\text{ units}
$$

**Step 2: Effective discount %**

$$
\Large
\text{Discount } \% = \frac{25 - 18}{25} \times 100 = \frac{7}{25} \times 100 = \boxed{\mathbf{28\%}}
$$

**Step 3: Calculate Selling Price on $₹500$ MRP**

$$
\Large
25\text{ units} = ₹500 \implies 1\text{ unit} = \frac{500}{25} = ₹20
$$

$$
\Large
\text{SP} = 18\text{ units} \times ₹20 = \boxed{\mathbf{₹360}}
$$

---

### Mixed Fraction Discounts

#### Case A: $14\frac{2}{7}\%$ and $12\frac{1}{2}\%$

- $14\frac{2}{7}\% = \frac{1}{7} \implies 7 \longrightarrow 6$
- $12\frac{1}{2}\% = \frac{1}{8} \implies 8 \longrightarrow 7$

Cancel $7$ from both columns; reduce $8 : 6 \to 4 : 3$:

$$
\Large
\text{MP} : \text{SP} = 4 : 3
$$

$$
\Large
\text{Effective Discount } \% = \frac{4 - 3}{4} \times 100 = \frac{1}{4} \times 100 = \boxed{\mathbf{25\%}}
$$

#### Case B: $16\frac{2}{3}\%, 12\frac{1}{2}\%$, and $11\frac{1}{9}\%$

- $16\frac{2}{3}\% = \frac{1}{6} \implies 6 \longrightarrow 5$
- $12\frac{1}{2}\% = \frac{1}{8} \implies 8 \longrightarrow 7$
- $11\frac{1}{9}\% = \frac{1}{9} \implies 9 \longrightarrow 8$

Cancel $8$ from both columns:

$$
\Large
\text{MP} = 6 \times 9 = 54\text{ units}
\qquad
\text{SP} = 5 \times 7 = 35\text{ units}
$$

$$
\Large
\text{Discount Units} = 54 - 35 = 19\text{ units}
$$

$$
\Large
\text{Effective Discount } \% = \frac{19}{54} \times 100 = \boxed{\mathbf{35.18\%}}
$$

---

## 3. "Buy X, Get Y Free" Retail Schemes

### The Total Articles Rule

When a store offers *"Buy $X$, Get $Y$ Free"*, the customer receives a total of $(X + Y)$ articles from stock. The Marked Price corresponds to all $(X + Y)$ items, while the customer pays for only $X$ items.

$$
\Large
\boxed{\text{Discount } \% = \left(\frac{\text{Free Articles } (Y)}{\text{Total Articles Delivered } (X + Y)}\right) \times 100}
$$

> [!WARNING]
> **Common Trap:** Never divide the free items by the paid items ($Y / X$). Always divide by the total articles surrendered by the shopkeeper $(X + Y)$.

---

### Standard Retail Promotions

#### Example 1: Buy 3, Get 2 Free

$$
\Large
Y = 2, \quad X + Y = 3 + 2 = 5
$$

$$
\Large
\text{Discount } \% = \frac{2}{5} \times 100 = \boxed{\mathbf{40\%}}
$$

#### Example 2: Buy 4, Get 3 Free

$$
\Large
Y = 3, \quad X + Y = 4 + 3 = 7
$$

$$
\Large
\text{Discount } \% = \frac{3}{7} \times 100 = \frac{300}{7}\% = \boxed{\mathbf{42\frac{6}{7}\% \approx 42.86\%}}
$$

---

### Hybrid Promotions (Free Articles + Cash Discount + Target Profit)

A shopkeeper gives $3$ articles free on the purchase of $5$ articles, provides an additional cash discount of $20\%$, and still makes a profit of $25\%$. Calculate the exact ratio of Cost Price to Marked Price ($\text{CP} : \text{MP}$).

**Step 1: Compute net effective discount ($D\%$)**

- Free Article Scheme ($5$ paid $+ 3$ free $= 8$ total): $\text{Initial} = 8 \longrightarrow \text{Final} = 5$
- Cash Discount ($20\% = \frac{1}{5}$): $\text{Initial} = 5 \longrightarrow \text{Final} = 4$

Cross-cancel factor $5$ and simplify $8 : 4 \implies 2 : 1$:

$$
\Large
\text{Net Discount } D\% = \frac{2 - 1}{2} \times 100 = 50\%
$$

**Step 2: Apply the Golden Ratio Formula**

$$
\Large
\frac{\text{CP}}{\text{MP}} = \frac{100 - D\%}{100 + P\%} = \frac{100 - 50}{100 + 25} = \frac{50}{125}
$$

$$
\Large
\boxed{\mathbf{\text{CP} : \text{MP} = 2 : 5}}
$$

---

## 4. Direct Scaling, Shifts & Multi-Hand Sales

### Direct Marked Price from CP, Discount & Profit

A merchant purchases a gift article for $₹150$. What price must he mark on the article so that after offering a discount of $10\%$, he still registers a profit of $10\%$?

**Step 1: Set up the Golden Ratio Formula**

$$
\Large
\frac{\text{MP}}{\text{CP}} = \frac{100 + P\%}{100 - D\%}
$$

$$
\Large
\frac{\text{MP}}{150} = \frac{100 + 10}{100 - 10} = \frac{110}{90} = \frac{11}{9}
$$

**Step 2: Solve for MP**

$$
\Large
\text{MP} = 150 \times \frac{11}{9} = \frac{550}{3} = \boxed{\mathbf{₹183.33}}
$$

---

### Two-Stage Selling Price Shift ($\text{SP}_1 \to \text{SP}_2$)

When an article is sold for $₹355$, the seller incurs a loss of $29\%$. At what selling price should it be sold to realize a gain of $21\%$?

**Step 1: Benchmark using Base-$100$ units**

- Let $\text{CP} = 100\text{ units}$.
- $\text{SP}_1$ (Loss of $29\%$) $= 100 - 29 = 71\text{ units}$.
- $\text{SP}_2$ (Gain of $21\%$) $= 100 + 21 = 121\text{ units}$.

**Step 2: Scale unit value to known rupee price**

$$
\Large
71\text{ units} = ₹355 \implies 1\text{ unit} = \frac{355}{71} = ₹5
$$

**Step 3: Compute target Selling Price**

$$
\Large
\text{SP}_2 = 121\text{ units} \times ₹5 = \boxed{\mathbf{₹605}}
$$

---

### Chain / Successive Hand Transfers ($A \to B \to C$)

$A$ sells a cycle to $B$ at $5\%$ profit. $B$ sells it to $C$ at $10\%$ profit. If $C$ pays $₹2310$, determine $A$'s original purchase cost.

**Step 1: Express multiplier fractions**

- $A \to B$ ($+5\% = +\frac{1}{20}$): $20 \longrightarrow 21$
- $B \to C$ ($+10\% = +\frac{1}{10}$): $10 \longrightarrow 11$

**Step 2: Column-wise multiplication**

$$
\Large
\text{Purchase Price of } A = 20 \times 10 = 200\text{ units}
$$

$$
\Large
\text{Final Price paid by } C = 21 \times 11 = 231\text{ units}
$$

**Step 3: Solve for A's Cost Price**

$$
\Large
231\text{ units} = ₹2310 \implies 1\text{ unit} = ₹10
$$

$$
\Large
\text{Cost Price of } A = 200 \times ₹10 = \boxed{\mathbf{₹2000}}
$$

---

## 5. Quantity Equating & Article Parity (LCM Method)

### The Cardinal Article Parity Law

> [!NOTE]
> You cannot compute overall profit or loss percentage until the quantity of articles bought equals the quantity of articles sold:
> $$\Large \boxed{\text{Quantity Bought} = \text{Quantity Sold}}$$

---

### CP of $x$ Articles = SP of $y$ Articles

The Cost Price of $15$ articles equals the Selling Price of $10$ articles. Compute the profit percentage.

**Step 1: Set up the parity equation**

$$
\Large
15 \times \text{CP} = 10 \times \text{SP} \implies \frac{\text{CP}}{\text{SP}} = \frac{10}{15} = \frac{2}{3}
$$

**Step 2: Calculate Profit %**

- $\text{CP} = 2\text{ units}$, $\text{SP} = 3\text{ units}$
- $\text{Profit} = 3 - 2 = 1\text{ unit on CP of } 2$

$$
\Large
\text{Profit } \% = \frac{1}{2} \times 100 = \boxed{\mathbf{50\%}}
$$

---

### Different Rates for Buying and Selling (LCM Parity)

A merchant buys $8$ oranges for $₹15$ and sells $10$ oranges for $₹18$. Calculate the overall profit or loss percentage.

**Step 1: Equalize quantities using $\text{LCM}(8, 10) = 40\text{ oranges}$**

- **Buying ($\text{CP}$):**
  $$8\text{ oranges} = ₹15 \xrightarrow{\times 5} 40\text{ oranges} = ₹75$$
- **Selling ($\text{SP}$):**
  $$10\text{ oranges} = ₹18 \xrightarrow{\times 4} 40\text{ oranges} = ₹72$$

**Step 2: Calculate Loss % on equal stock ($40$ oranges)**

$$
\Large
\text{Loss} = \text{CP} - \text{SP} = 75 - 72 = ₹3
$$

$$
\Large
\text{Loss } \% = \frac{3}{75} \times 100 = \boxed{\mathbf{4\%\text{ Loss}}}
$$

---

### Algebraic Pricing per Group vs. Unit Rate

A vendor purchases items at $₹P$ per dozen ($12$ items) and retails them at $₹\frac{P}{8}$ per individual item. Determine his profit %.

**Step 1: Equalize quantity to $12$ items**

$$
\Large
\text{CP of } 12\text{ items} = ₹P
$$

$$
\Large
\text{SP of } 12\text{ items} = 12 \times \frac{P}{8} = 1.5P
$$

**Step 2: Compute Profit %**

$$
\Large
\text{Profit} = 1.5P - P = 0.5P
$$

$$
\Large
\text{Profit } \% = \frac{0.5P}{P} \times 100 = \boxed{\mathbf{50\%}}
$$

---

### Damaged / Broken Inventory

A vendor buys $100$ porcelain cups at $₹10$ each. During transit, $10$ cups break. He sells the remaining $90$ cups at $₹11$ each. Find net gain or loss %.

**Step 1: Calculate total Cost Price and Selling Price**

$$
\Large
\text{Total CP} = 100 \times 10 = ₹1000
$$

$$
\Large
\text{Total SP} = 90 \times 11 = ₹990
$$

**Step 2: Calculate net result**

$$
\Large
\text{Loss} = 1000 - 990 = ₹10
$$

$$
\Large
\text{Loss } \% = \frac{10}{1000} \times 100 = \boxed{\mathbf{1\%\text{ Loss}}}
$$

---

## 6. Inverse Price-Quantity Relation ($\text{Amount} = P \times Q$)

### The Constant Budget Inversion Law

$$
\Large
\text{Total Rupee Value } (A) = \text{Unit Price } (P) \times \text{Quantity } (Q)
$$

When Total Rupee Value ($A$) remains constant across two transactions, **Unit Price is strictly inversely proportional to Quantity**:

$$
\Large
\boxed{P_1 : P_2 = a : b \iff Q_1 : Q_2 = b : a}
$$

---

### Constant Rupee Budget Problems

#### Example 1: Toffees at constant Re 1

A vendor buys $11$ toffees for $₹1$. How many toffees must he sell for $₹1$ to gain $10\%$?

**Step 1: Price ratio**

$$
\Large
P_1 : P_2 = 100 : 110 = 10 : 11
$$

**Step 2: Invert for quantity ratio**

$$
\Large
Q_1 : Q_2 = 11 : 10
$$

Since $Q_1 = 11\text{ toffees}$, he must sell $\Large \boxed{\mathbf{10\text{ toffees}}}$ for $₹1$.

#### Example 2: Eggs at constant $₹90.75$ (TCS NQT Question)

A man purchases $56$ eggs for $₹90.75$. How many eggs should he sell for the identical amount of $₹90.75$ to make a profit of $14\frac{2}{7}\%$?

> [!TIP]
> Discard $₹90.75$ immediately because the rupee amount is identical in both transactions!

**Step 1: Price ratio**

$$
\Large
\text{Profit} = 14\frac{2}{7}\% = +\frac{1}{7} \implies P_1 : P_2 = 7 : 8
$$

**Step 2: Quantity ratio**

$$
\Large
Q_1 : Q_2 = 8 : 7
$$

**Step 3: Unit scaling**

$$
\Large
8\text{ units} = 56\text{ eggs} \implies 1\text{ unit} = 7\text{ eggs}
$$

$$
\Large
Q_2 = 7 \times 7 = \boxed{\mathbf{49\text{ eggs}}}
$$

---

### Linear Budget Scaling Across Different Rupee Amounts

By selling $12$ oranges for $₹60$, a person loses $25\%$. How many oranges should he sell for $₹100$ to gain $25\%$?

**Step 1: Determine quantity for the constant baseline ($₹60$)**

$$
\Large
P_1 : P_2 = (100 - 25) : (100 + 25) = 75 : 125 = 3 : 5
$$

$$
\Large
Q_1 : Q_2 = 5 : 3
$$

Given $Q_1 = 12\text{ oranges}$:

$$
\Large
5\text{ units} = 12 \implies 1\text{ unit} = \frac{12}{5} \implies Q_2 = 3 \times \frac{12}{5} = \frac{36}{5}\text{ oranges for } ₹60
$$

**Step 2: Linear budget scaling from $₹60$ to $₹100$**

$$
\Large
\text{Oranges for } ₹100 = \left(\frac{36}{5}\right) \times \left(\frac{100}{60}\right) = \frac{36}{5} \times \frac{5}{3} = \boxed{\mathbf{12\text{ oranges}}}
$$

---

## 7. Fractional Stock & Weighted Average Method

### The Frequency-Weighting Principle

When parts of total inventory are sold at varying profit or loss percentages, avoid computing absolute rupee values. Treat the stock components as frequencies ($f_i$) and the rate percentages as observations ($x_i$), with positive for profit and negative for loss:

$$
\Large
\boxed{\text{Overall Net } \% = \frac{\sum f_i x_i}{\sum f_i} = \frac{f_1 x_1 + f_2 x_2 + f_3 x_3}{f_1 + f_2 + f_3}}
$$

---

### Split Inventory with Total Profit Given

$\frac{2}{3}$ of an inventory is sold at $30\%$ profit, $\frac{1}{4}$ part at $16\%$ profit, and the remaining part at $12\%$ profit. If net profit is $₹75$, find total Cost Price.

**Step 1: Equalize parts via $\text{LCM}(3, 4) = 12\text{ total parts}$**

- Part 1: $\frac{2}{3} \times 12 = 8\text{ parts}$ at $+30\%$
- Part 2: $\frac{1}{4} \times 12 = 3\text{ parts}$ at $+16\%$
- Part 3: $12 - (8 + 3) = 1\text{ part}$ at $+12\%$

**Step 2: Weighted average profit %**

$$
\Large
\text{Avg } P\% = \frac{(8 \times 30) + (3 \times 16) + (1 \times 12)}{12} = \frac{240 + 48 + 12}{12} = \frac{300}{12} = 25\%
$$

**Step 3: Total CP valuation**

$$
\Large
25\%\text{ of } \text{CP} = ₹75 \implies 1\% = ₹3 \implies \text{CP } (100\%) = \boxed{\mathbf{₹300}}
$$

---

### Split Inventory with Total Loss Given

$\frac{2}{3}$ part of goods is sold at $15\%$ loss, $\frac{1}{6}$ part at $12\%$ loss, and the rest at $18\%$ loss. Net loss is $₹45$. Find total $\text{CP}$.

**Step 1: Total parts $= \text{LCM}(3, 6) = 6\text{ parts}$**

- Part 1: $\frac{2}{3} \times 6 = 4\text{ parts}$ at $-15\%$
- Part 2: $1\text{ part}$ at $-12\%$
- Part 3: $6 - (4 + 1) = 1\text{ part}$ at $-18\%$

**Step 2: Weighted average loss %**

$$
\Large
\text{Avg Loss } \% = \frac{(4 \times -15) + (1 \times -12) + (1 \times -18)}{6} = \frac{-60 - 12 - 18}{6} = \frac{-90}{6} = -15\%
$$

**Step 3: Total CP valuation**

$$
\Large
15\%\text{ of } \text{CP} = ₹45 \implies 1\% = ₹3 \implies \text{CP } (100\%) = \boxed{\mathbf{₹300}}
$$

---

### Target Break-Even Allocation (Zero Overall Profit/Loss)

A distributor buys books for $₹8000$. He sells $\frac{1}{4}$ part at a loss of $20\%$. At what percentage profit must he sell the remaining stock to break even overall (neither profit nor loss)?

**Step 1: Set up frequencies**

- Total parts $= 4$. *(Ignore $₹8000$ constant).*
- First part ($1\text{ part}$) at $-20\%$.
- Remaining parts ($3\text{ parts}$) at $+P\%$.

**Step 2: Equate net weighted sum to zero**

$$
\Large
(1 \times -20) + (3 \times P) = 0 \implies 3P = 20
$$

$$
\Large
P = \frac{20}{3}\% = \boxed{\mathbf{6\frac{2}{3}\% \approx 6.67\%}}
$$

---

## 8. Placement Strategy and Common Mistakes

### Why this matters for your placement

Profit, Loss & Discount constitutes over $20\%$ of the Numerical Ability section in TCS NQT, Cognizant, Infosys, and Accenture assessments. Traditional multi-variable algebra wastes $60$ to $90$ seconds per question, whereas the ratio and parity frameworks solve each archetype in $20$ to $30$ seconds.

---

### What you should do (Golden Execution Rules)

1. **Bypass $\text{SP}$ with the Golden Ratio:** Whenever marked price, cost price, discount %, and profit % are tied together, immediately deploy:
   $$\Large \frac{\text{MP}}{\text{CP}} = \frac{100 + P\%}{100 - D\%}$$
2. **Column Cross-Simplification:** Always write successive discounts as initial-to-final fractions and cross-cancel common factors across columns prior to multiplying.
3. **Price-Quantity Inversion:** Under constant expenditure, flip the unit price ratio to immediately obtain the article quantity ratio ($P_1:P_2 = a:b \implies Q_1:Q_2 = b:a$).
4. **Denominator Equalization:** Before executing weighted averages on split stock, compute the $\text{LCM}$ of all fraction denominators to operate purely with small whole numbers.

---

### What you should avoid (Avoidable Traps)

1. **Never Calculate Profit on Unequal Article Counts:** Attempting to deduce profit % by comparing purchase cost of $10$ items with sales revenue of $8$ items leads to guaranteed errors. Always equalize quantities first.
2. **Never Carry Redundant Rupee Constants:** If a problem asks solely for a percentage or ratio and includes an arbitrary budget figure ($₹90.75$, $₹8000$), omit the rupee value completely from calculations.
3. **Never Add Successive Discounts Directly:** A sequence of $50\% + 30\% + 20\%$ is $72\%$, not $100\%$.

---

## 9. Practice Problems: End-of-Video Homework

### Homework 1: Split Stock with Net Rupee Profit

#### Problem Statement

> **Question:** $\frac{1}{3}$ of goods are sold at $15\%$ profit, $25\%$ of the goods at $20\%$ profit, and the rest at $20\%$ loss. If the total profit realized is $₹138.50$, find the total cost value of the goods.

---

#### Step-by-Step Rigorous Solution

**Step 1: Express fractions and fractions remaining**

- Portion 1: $\frac{1}{3}$ at $+15\%$
- Portion 2: $25\% = \frac{1}{4}$ at $+20\%$
- Portion 3 (Rest):
  $$1 - \left(\frac{1}{3} + \frac{1}{4}\right) = 1 - \frac{7}{12} = \frac{5}{12}\text{ at } -20\%$$

**Step 2: Equalize total parts using $\text{LCM}(3, 4, 12) = 12\text{ parts}$**

- Portion 1: $\frac{1}{3} \times 12 = 4\text{ parts}$
- Portion 2: $\frac{1}{4} \times 12 = 3\text{ parts}$
- Portion 3: $5\text{ parts}$

**Step 3: Compute Net Weighted Profit %**

$$
\Large
\text{Net } \% = \frac{(4 \times 15) + (3 \times 20) + (5 \times -20)}{12}
$$

$$
\Large
\text{Net } \% = \frac{60 + 60 - 100}{12} = \frac{20}{12}\% = \frac{5}{3}\%
$$

**Step 4: Calculate Total Cost Price ($\text{CP}$)**

$$
\Large
\frac{5}{3}\%\text{ of } \text{CP} = 138.50
$$

$$
\Large
\text{CP} = 138.50 \times \frac{3}{5} \times 100 = 138.50 \times 60 = \boxed{\mathbf{₹8310}}
$$

#### Final Answer

The total cost value of the goods is $\Large \boxed{\mathbf{₹8,310}}$.

---

### Homework 2: Dishonest Dealer False Weight Gain %

#### Problem Statement

> **Question:** A dishonest dealer professes to sell his goods at cost price but uses a weight of $960\text{ grams}$ in place of a $1\text{ kg}$ ($1000\text{ grams}$) weight. Find his actual gain percentage.

---

#### Step-by-Step Rigorous Solution

**Step 1: Analyze Article / Weight Parity**

- Goods delivered from inventory to customer $= 960\text{ grams} \implies \text{Dealer's Effective Cost Basis } (\text{CP})$.
- Price charged to customer corresponds to $1000\text{ grams} \implies \text{Dealer's Revenue Basis } (\text{SP})$.

**Step 2: Ratio Setup**

$$
\Large
\frac{\text{SP}}{\text{CP}} = \frac{1000}{960} = \frac{25}{24}
$$

**Step 3: Gain Percentage Calculation**

$$
\Large
\text{Profit Units} = 25 - 24 = 1\text{ unit on CP of } 24
$$

$$
\Large
\text{Gain } \% = \frac{\text{Error Weight}}{\text{True Weight} - \text{Error Weight}} \times 100 = \frac{40}{960} \times 100
$$

$$
\Large
\text{Gain } \% = \frac{1}{24} \times 100 = \frac{25}{6}\% = \boxed{\mathbf{4\frac{1}{6}\% \approx 4.17\%}}
$$

#### Final Answer

The dealer's actual gain percentage is $\Large \boxed{\mathbf{4\frac{1}{6}\% \approx 4.17\%}}$.

---

## 10. Quick Formula & Concept Sheet

| Concept | Mathematical Formula / Rule | Application Note |
|---|---|---|
| **Profit %** | $\Large \text{Profit } \% = \left(\frac{\text{SP} - \text{CP}}{\text{CP}}\right) \times 100$ | Always calculated on Cost Price ($\text{CP}$) |
| **Margin %** | $\Large \text{Margin } \% = \left(\frac{\text{SP} - \text{CP}}{\text{SP}}\right) \times 100$ | Always calculated on Selling Price ($\text{SP}$) |
| **The Golden Ratio** | $\Large \frac{\text{MP}}{\text{CP}} = \frac{100 + P\%}{100 - D\%}$ | Directly connects MP to CP, bypassing SP |
| **Successive Discounts** | $\Large \text{MP} : \text{SP} = \prod b_i : \prod (b_i - a_i)$ | Write fractions and cross-cancel columns |
| **Free Article Discount** | $\Large \text{Discount } \% = \left(\frac{Y}{X + Y}\right) \times 100$ | In "Buy $X$, Get $Y$ Free", divide by $(X + Y)$ |
| **Article Parity Law** | $\Large \frac{\text{CP}}{\text{SP}} = \frac{y}{x} \quad (\text{if } x\text{CP} = y\text{SP})$ | Equate quantity bought to quantity sold |
| **Price-Quantity Inverse** | $\Large P_1 : P_2 = a : b \iff Q_1 : Q_2 = b : a$ | Valid when total rupee expenditure is constant |
| **Weighted Average Profit** | $\Large \text{Avg } \% = \frac{\sum f_i x_i}{\sum f_i}$ | Convert stock fractions to integer parts via LCM |
| **Dishonest Weight Gain** | $\Large \text{Gain } \% = \left(\frac{\text{Error}}{\text{True} - \text{Error}}\right) \times 100$ | False measure / fraudulent scale problems |

---

*Revision tip: Whenever a problem links Marked Price, Cost Price, Discount %, and Profit %, avoid finding SP as an intermediate step. Write down $\frac{\text{MP}}{\text{CP}} = \frac{100+P}{100-D}$ on line 1 to solve the problem in a single fraction multiplication step.*
