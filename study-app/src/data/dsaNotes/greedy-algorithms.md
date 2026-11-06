---
id: "dsa-greedy-algorithms"
title: "Greedy Algorithms"
slug: "greedy-algorithms"
category: "Algorithmic Paradigms"
difficulty: "Medium"
estimatedTime: "45 mins"
problemCount: 4
topicsCovered:
  - "The Core Rule of Greedy & The Chaiwala Analogy"
  - "The Regret (Pachtawa) Test: Greedy vs Dynamic Programming"
  - "Problem 1: Lemonade Change (LeetCode 860)"
  - "Problem 2: Assign Cookies (LeetCode 455)"
  - "Problem 3: Jump Game (LeetCode 55)"
  - "Problem 4: Fractional Knapsack (Standard Interview Problem)"
  - "Interview Heuristics & Next Step: Jump Game II (LeetCode 45)"
summary: "Master the Greedy algorithmic paradigm from first principles: the Chaiwala cash register analogy, the Buffet regret test, decision matrices, and 4 complete LeetCode & placement interview problems with step-by-step logic, dry-run traces, and production Java implementations."
---

# Greedy Algorithms: Core Intuition, Patterns & Placement Problems

> **DSA Master Revision Notes** for campus placement coding rounds and technical interviews (TCS NQT Hands-on Coding / Digital / Prime, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX with analogies, invariants, step-by-step dry runs, and clean Java implementations.

---

## Table of Contents
1. [Core Intuition & The Greedy Philosophy](#1-core-intuition--the-greedy-philosophy)
   - [The Core Rule of Greedy](#the-core-rule-of-greedy)
   - [The Chaiwala Analogy (Why Greedy Works)](#the-chaiwala-analogy-why-greedy-works)
2. [Greedy vs. Dynamic Programming: The Regret (Pachtawa) Test](#2-greedy-vs-dynamic-programming-the-regret-pachtawa-test)
   - [The Buffet Analogy (When Greedy Fails)](#the-buffet-analogy-when-greedy-fails)
   - [The Twist: When Sorting Enables Greedy](#the-twist-when-sorting-enables-greedy)
   - [The Packing Bags Analogy](#the-packing-bags-analogy)
   - [Decision Matrix: Greedy vs. DP vs. Backtracking](#decision-matrix-greedy-vs-dp-vs-backtracking)
3. [Problem 1: Lemonade Change (LeetCode 860)](#3-problem-1-lemonade-change-leetcode-860)
   - [Problem Definition & Mathematical Invariant](#problem-definition--mathematical-invariant)
   - [Step-by-Step State Transitions](#step-by-step-state-transitions)
   - [Dry-Run Trace: Greedy Priority vs. Bad Choice](#dry-run-trace-greedy-priority-vs-bad-choice)
   - [Complete Java Implementation](#complete-java-implementation-lemonade-change)
   - [Complexity Analysis](#complexity-analysis-lemonade-change)
4. [Problem 2: Assign Cookies (LeetCode 455)](#4-problem-2-assign-cookies-leetcode-455)
   - [Problem Definition & The Task Analogy](#problem-definition--the-task-analogy)
   - [Two-Pointer Greedy Matching Strategy](#two-pointer-greedy-matching-strategy)
   - [Step-by-Step Dry Run](#step-by-step-dry-run-assign-cookies)
   - [Complete Java Implementation](#complete-java-implementation-assign-cookies)
   - [Complexity Analysis](#complexity-analysis-assign-cookies)
5. [Problem 3: Jump Game (LeetCode 55)](#5-problem-3-jump-game-leetcode-55)
   - [The Town Guide Analogy & Reach Framework](#the-town-guide-analogy--reach-framework)
   - [Step-by-Step Reach Invariant](#step-by-step-reach-invariant)
   - [Trace Dry Runs: Success vs. Dead End](#trace-dry-runs-success-vs-dead-end)
   - [Complete Java Implementation](#complete-java-implementation-jump-game)
   - [Complexity Analysis](#complexity-analysis-jump-game)
6. [Problem 4: Fractional Knapsack (Standard Interview Problem)](#6-problem-4-fractional-knapsack-standard-interview-problem)
   - [0/1 Knapsack (DP) vs. Fractional Knapsack (Greedy)](#01-knapsack-dp-vs-fractional-knapsack-greedy)
   - [Unitary Ratio Heuristic: Price per Kilogram](#unitary-ratio-heuristic-price-per-kilogram)
   - [Step-by-Step Mathematical Derivation & Trace](#step-by-step-mathematical-derivation--trace)
   - [Complete Java Implementation](#complete-java-implementation-fractional-knapsack)
   - [Complexity Analysis](#complexity-analysis-fractional-knapsack)
7. [Placement Strategy, Interview Heuristics & Common Traps](#7-placement-strategy-interview-heuristics--common-traps)
   - [Why Greedy Matters for Campus Placements](#why-greedy-matters-for-campus-placements)
   - [What You Should Do in an Interview](#what-you-should-do-in-an-interview)
   - [What You Should Avoid](#what-you-should-avoid)
   - [The Next Practical Step: Jump Game II (LeetCode 45)](#the-next-practical-step-jump-game-ii-leetcode-45)
8. [Practice Problems: Homework Solutions](#8-practice-problems-homework-solutions)
9. [Quick Formula & Concept Cheat Sheet](#9-quick-formula--concept-cheat-sheet)

---

## 1. Core Intuition & The Greedy Philosophy

### The Core Rule of Greedy

$$
\Large
\boxed{\text{"Abhi jo sabse accha choice lag raha hai wo karo, aur ant mein sab kuch theek ho jayega"}}
$$

A **Greedy Algorithm** builds up a solution step by step, always choosing the option that provides the most immediate local benefit. This paradigm yields the globally optimum outcome when two rigorous mathematical conditions hold:

1. **Greedy-Choice Property:** A globally optimal solution can always be arrived at by making locally optimal (greedy) choices without reconsidering earlier choices.
2. **Zero Regret (No Pachtawa):** Choosing the current best option never compromises, penalizes, or eliminates a superior future choice.

> [!IMPORTANT]
> **The Golden Invariant:** If choosing an option today can cause you to regret your choice tomorrow, the problem **CANNOT** be solved greedily. Such problems require exhaustive exploration via Dynamic Programming (DP) or Backtracking.

---

### The Chaiwala Analogy (Why Greedy Works)

**Scenario:** A train chaiwala sells hot tea for $\mathbf{\text{₹}10}$ per cup. In his cash bag, he carries chillar (change) across standard denominations:

$$
\Large
\text{Denominations} = \{\text{₹}5, \text{₹}10, \text{₹}20, \text{₹}50, \text{₹}100\}
$$

A customer buys one $\text{₹}10$ tea and hands over a $\text{₹}100$ note. The chaiwala must return $\mathbf{\text{₹}90}$ in change.

**Three Possible Ways to Return ₹90:**
1. **Nine ₹10 notes:**
   $$
   9 \times 10 = \text{₹}90
   $$
2. **Four ₹20 notes + One ₹10 note:**
   $$
   (4 \times 20) + (1 \times 10) = 80 + 10 = \text{₹}90
   $$
3. **One ₹50 note + Two ₹20 notes:**
   $$
   (1 \times 50) + (2 \times 20) = 50 + 40 = \text{₹}90
   $$

#### Why Choice 3 is the Mathematically Optimal Greedy Choice:
- The chaiwala gets rid of the **largest denomination notes ($\text{₹}50, \text{₹}20$) first** and preserves his small chillar ($\text{₹}5, \text{₹}10$).
- **Flexibility Invariant:** A $\text{₹}10$ note can do everything a single $\text{₹}10$ note does, but it can also be combined to make $\text{₹}20, \text{₹}30, \text{₹}40$. Conversely, a $\text{₹}50$ note is rigid: if the next customer pays with $\text{₹}20$ for a $\text{₹}10$ tea and requires $\text{₹}10$ change, a $\text{₹}50$ note is completely useless!
- **Greedy Rule:** Always dispense the least flexible (largest) resources first, saving the most versatile (smallest) resources for the unknown future.

---

## 2. Greedy vs. Dynamic Programming: The Regret (Pachtawa) Test

### The Buffet Analogy (When Greedy Fails)

Imagine you enter a wedding buffet where the host enforces a strict rule: **You may consume exactly ONE dish for free**, and the manager walks you forward along a one-way corridor without allowing you to see what lies ahead:

```text
[Stall 1: Veg Pulao] ──> [Stall 2: Mutton Biryani] ──> [Stall 3: Royal Shahi Paneer]
       │
   You get greedy
   and eat Pulao!
       │
       ▼
  Arrival at Stall 2: Pachtawa (Regret)! 
  Mutton Biryani was far superior, but your past choice is irreversible.
```

> [!WARNING]
> **The Regret Heuristic:**
> Jahan **pachtawa (regret)** hone ka $1\%$ bhi chance ho, wahan Greedy **kabhi mat lagana**—wahan **Dynamic Programming (DP)** lagega (such as the *House Robber* or *0/1 Knapsack* problem).

---

### The Twist: When Sorting Enables Greedy

What happens if the manager alters the buffet rule?
> *"Pehle poora buffet ghoom aao (inspect the entire array), sort all items by value, and then make your pick."*

Now, with global visibility obtained via **Sorting ($\mathcal{O}(N \log N)$)**:
1. You inspect every available dish.
2. You pick the item of maximum value (Mutton Biryani).
3. **Pachtawa = Zero.**

> [!TIP]
> In coding interviews, **90% of Greedy problems require sorting the input first**. Sorting converts an uncertain future into a known, monotonic sequence, eliminating future regret!

---

### The Packing Bags Analogy

When packing suitcases for a flight with strict baggage limits:
- A father picks the **largest bag first** and packs it to maximum density before opening a second bag.
- Why? Filling the biggest container first minimizes the total number of bags carried and leaves smaller, versatile bags for quick-access items. Greedily exhausting the largest container first never impairs future choices.

---

### Decision Matrix: Greedy vs. DP vs. Backtracking

| Paradigm | When to Use | State Guarantee | Time Complexity | Auxiliary Space |
| :--- | :--- | :--- | :--- | :--- |
| **Greedy** | Local choice is globally optimal; Zero regret | Irreversible forward steps | $\mathcal{O}(N)$ or $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$ |
| **Dynamic Programming (DP)** | Overlapping subproblems; Future choices depend on past states | Stores optimal sub-results in cache / table | $\mathcal{O}(N^2)$ or $\mathcal{O}(N \times W)$ | $\mathcal{O}(N)$ or $\mathcal{O}(N \times W)$ |
| **Backtracking** | Need to discover ALL valid configurations (permutations, subsets) | Reversible trial-and-error | $\mathcal{O}(2^N)$ or $\mathcal{O}(N!)$ | $\mathcal{O}(N)$ (call stack) |

---

## 3. Problem 1: Lemonade Change (LeetCode 860)

### Problem Definition & Mathematical Invariant

- **Cost of Lemonade:** $\text{₹}5$ per glass.
- **Bill Denominations Received:** $\text{₹}5$, $\text{₹}10$, or $\text{₹}20$.
- **Starting Cash in Register:** $\text{₹}0$.
- **Goal:** Return `true` if exact change can be provided to every customer in the queue, or `false` the instant change cannot be returned.

$$
\Large
\boxed{\text{Change Needed} = \text{Bill Received} - 5}
$$

- Customer pays $\text{₹}5 \implies \text{Change} = 0$.
- Customer pays $\text{₹}10 \implies \text{Change} = 5$.
- Customer pays $\text{₹}20 \implies \text{Change} = 15$.

> [!NOTE]
> **Why we NEVER track ₹20 bills:**
> A $\text{₹}20$ bill cannot be used to return change for $\text{₹}5$ or $\text{₹}15$. It is a dead asset in our cash register:
> *"₹20 kisi kaam ka nahi hai change dene ke liye."*
> Hence, we only maintain two integer registers: `five` and `ten`.

---

### Step-by-Step State Transitions

1. **Customer pays ₹5:**
   Keep it in the register: `five++`.
2. **Customer pays ₹10:**
   Must return $\text{₹}5$.
   - If `five == 0`, immediately return `false`.
   - Otherwise: `five--` and `ten++`.
3. **Customer pays ₹20 (Change needed = ₹15):**
   - **Choice 1 (Greedy Priority):** Give one $\text{₹}10$ and one $\text{₹}5$ note (`ten--`, `five--`). Always attempt this first!
   - **Choice 2 (Fallback):** Give three $\text{₹}5$ notes (`five -= 3`) only if `ten == 0`.
   - If neither condition can be met: return `false`.

---

### Dry-Run Trace: Greedy Priority vs. Bad Choice

Suppose the register currently holds:
$$
\text{ten} = 1, \quad \text{five} = 3
$$

Customer 1 pays $\mathbf{\text{₹}20}$ (requires $\text{₹}15$ change):

| Strategy | Action Taken | Resulting Pocket State | Next Customer 2 Pays ₹10 (Needs ₹5) | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **Bad Choice (Wasting ₹5s)** | Return three $\text{₹}5$ notes | $\text{ten} = 1, \;\; \mathbf{\text{five} = 0}$ | Needs $\text{₹}5$, but $\text{five} == 0$ | ❌ **FAIL (`false`)** |
| **Greedy Choice (Save ₹5s)** | Return one $\text{₹}10$ + one $\text{₹}5$ | $\text{ten} = 0, \;\; \mathbf{\text{five} = 2}$ | Needs $\text{₹}5$, gives one $\text{₹}5$ ($\text{five} = 1$) | ✅ **SUCCESS (`true`)** |

---

### Complete Java Implementation (Lemonade Change)

```java
class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0; // Tracks count of ₹5 notes
        int ten = 0;  // Tracks count of ₹10 notes (₹20 track karne ki zarurat nahi hai)

        for (int i = 0; i < bills.length; i++) {
            int money = bills[i];

            if (money == 5) {
                five++; // ₹5 mila, seedha jeb mein rakho
            } else if (money == 10) {
                if (five == 0) {
                    return false; // ₹5 wapas karne ke liye chillar nahi hai
                }
                five--;
                ten++;
            } else { // money == 20 (Need to return ₹15 change)
                // Choice 1 (Greedy): Try giving one ₹10 and one ₹5 first
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } 
                // Choice 2 (Fallback): Give three ₹5 notes
                else if (five >= 3) {
                    five -= 3;
                } 
                // Neither choice possible
                else {
                    return false;
                }
            }
        }
        return true;
    }
}
```

### Complexity Analysis (Lemonade Change)

- **Time Complexity:** $\mathcal{O}(N)$ where $N$ is the number of customers in `bills`. Single linear scan.
- **Auxiliary Space:** $\mathcal{O}(1)$ because we only use two integer registers (`five`, `ten`).

---

## 4. Problem 2: Assign Cookies (LeetCode 455)

### Problem Definition & The Task Analogy

**The Task Analogy:**
> If your goal is to finish the maximum number of daily tasks, you don't start with a heavy 2.5-hour workout and collapse from fatigue. You complete small, quick tasks first: take a bath, eat breakfast, take a 10-minute walk ($3 \text{ tasks} > 1 \text{ task}$).

**Problem Statement:**
You are given two arrays:
- `child[i]`: The greed factor of child $i$ (the minimum cookie size that will satisfy them).
- `cookie[j]`: The size of cookie $j$.

Each child can receive at most one cookie. Your goal is to **maximize the number of content children**.

---

### Two-Pointer Greedy Matching Strategy

$$
\Large
\boxed{\text{Sort Both Arrays Ascending: Match Smallest Viable Cookie with Least Greedy Child}}
$$

1. **Why Sort?**
   - *Jis bacche ka lalach (greed) sabse kam hai, usko khush karna sabse aasan hai.*
   - Giving a massive $4\text{ kg}$ cookie to a child who only demanded $1\text{ kg}$ wastes valuable cookie capacity that could have satisfied a hungrier child later.
2. **Two-Pointer Mechanics:**
   - Pointer `i` traverses `child[]`.
   - Pointer `j` traverses `cookie[]`.
   - If `cookie[j] >= child[i]`: Child is content! Increment `result++`, advance `i++`, and advance `j++`.
   - If `cookie[j] < child[i]`: This cookie cannot satisfy child `i`. Since `child[]` is sorted, this cookie cannot satisfy *any* child to the right either! Thus, discard this cookie and advance `j++`.

---

### Step-by-Step Dry Run (Assign Cookies)

- **Children Greed:** `child = [1, 3, 5]`
- **Cookies Available:** `cookie = [2, 4]`

| Step | Child Pointer `i` | Cookie Pointer `j` | Comparison (`cookie[j] >= child[i]`) | Action Taken | State (`result`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `i = 0` (Wants 1) | `j = 0` (Size 2) | $2 \ge 1 \implies \mathbf{True}$ | Give $2\text{kg}$ to Child 0. Advance `i++`, `j++`. | `result = 1` |
| **2** | `i = 1` (Wants 3) | `j = 1` (Size 4) | $4 \ge 3 \implies \mathbf{True}$ | Give $4\text{kg}$ to Child 1. Advance `i++`, `j++`. | `result = 2` |
| **3** | `i = 2` (Wants 5) | `j = 2` (Out of Bounds) | Loop terminates (`j == cookie.length`) | No more cookies available. | **Final: 2** |

---

### Complete Java Implementation (Assign Cookies)

```java
import java.util.Arrays;

class Solution {
    public int findContentChildren(int[] child, int[] cookie) {
        // Step 1: Sort both arrays in ascending order
        Arrays.sort(child);
        Arrays.sort(cookie);

        int i = 0; // Pointer for children
        int j = 0; // Pointer for cookies
        int result = 0;

        // Step 2: Two-pointer traversal
        while (i < child.length && j < cookie.length) {
            if (cookie[j] >= child[i]) {
                result++; // Child is satisfied
                i++;      // Move to next child
                j++;      // Cookie consumed, move to next cookie
            } else {
                // Cookie too small for current child; try a larger cookie
                j++;
            }
        }
        return result;
    }
}
```

### Complexity Analysis (Assign Cookies)

- **Time Complexity:** $\mathcal{O}(N \log N + M \log M)$ dominated by sorting the two arrays of sizes $N$ and $M$. The two-pointer traversal takes linear time $\mathcal{O}(N + M)$.
- **Auxiliary Space:** $\mathcal{O}(1)$ or $\mathcal{O}(\log N)$ depending on the internal dual-pivot Quicksort implementation in `Arrays.sort()`.

---

## 5. Problem 3: Jump Game (LeetCode 55)

### The Town Guide Analogy & Reach Framework

**Problem Statement:**
Given an integer array `nums` where `nums[i]` represents your maximum jump length from position `i`, determine if you can reach the last index starting from index 0.

**Why beginners mistake this for DP:**
> At index 0 with `nums[0] = 2`, beginners assume they have 2 branching decisions: jump to index 1 or jump to index 2, leading them to write an exponential branching recursion or a memoized DP table.

**The Town Guide Analogy:**
- Imagine every index `i` is a **Town**, and `nums[i]` is a local resident who knows the highway routes up to `i + nums[i]` towns ahead.
- Instead of jumping blindly, walk through every single town sequentially: $i = 0, 1, 2, \dots$
- Maintain a single integer variable: `reach` (the furthest town you have verified knowledge to travel to).
- As you enter town $i$, check the **Reach Invariant:**
  $$
  \Large
  \boxed{\text{If } \mathbf{reach < i} \implies \text{DEAD END! Return } \mathbf{false}}
  $$
- If `reach >= i`, consult the town's guide and expand your horizon:
  $$
  \Large
  \boxed{\text{reach} = \max(\text{reach},\; i + \text{nums}[i])}
  $$

---

### Step-by-Step Reach Invariant

```text
Town i = 0 ──[nums[0]=2]──> Knows up to Town 2 (reach = 2)
     │
Town i = 1 ──[nums[1]=3]──> Knows up to Town 1 + 3 = 4 (reach = 4)
     │
reach >= n - 1 (Destination reached!) ──> Return true!
```

---

### Trace Dry Runs: Success vs. Dead End

#### Case 1 (Success): `nums = [2, 3, 1, 1, 4]`, $n = 5$
- Initial: `reach = 0`

| Town $i$ | `nums[i]` | Condition `reach < i` | Formula `max(reach, i + nums[i])` | Updated `reach` | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | 2 | $0 < 0 \implies \text{False}$ | $\max(0, 0 + 2)$ | **2** | Continue |
| **1** | 3 | $2 < 1 \implies \text{False}$ | $\max(2, 1 + 3)$ | **4** | Destination reached ($4 \ge 4$) $\implies$ **`true`** |

#### Case 2 (Dead End / Failure): `nums = [1, 0, 2]`, $n = 3$
- Initial: `reach = 0`

| Town $i$ | `nums[i]` | Condition `reach < i` | Formula `max(reach, i + nums[i])` | Updated `reach` | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | 1 | $0 < 0 \implies \text{False}$ | $\max(0, 0 + 1)$ | **1** | Continue |
| **1** | 0 | $1 < 1 \implies \text{False}$ | $\max(1, 1 + 0)$ | **1** | Continue |
| **2** | 2 | $1 < 2 \implies \mathbf{True}$ | Dead End! Cannot reach Town 2 | **1** | ❌ **`false`** |

---

### Complete Java Implementation (Jump Game)

```java
class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        int reach = 0; // Furthest index reachable so far

        for (int i = 0; i < n; i++) {
            // Step 1: Check if we even had the reach to arrive at Town i
            if (reach < i) {
                return false; // Dead end! No path exists to reach index i
            }

            // Step 2: Ask the person in Town i how far they can send us
            reach = Math.max(reach, i + nums[i]);

            // Step 3: Early exit if we can already reach or surpass the final town
            if (reach >= n - 1) {
                return true;
            }
        }
        return true;
    }
}
```

### Complexity Analysis (Jump Game)

- **Time Complexity:** $\mathcal{O}(N)$ single pass with early exit.
- **Auxiliary Space:** $\mathcal{O}(1)$ using a single integer variable `reach`.

---

## 6. Problem 4: Fractional Knapsack (Standard Interview Problem)

### 0/1 Knapsack (DP) vs. Fractional Knapsack (Greedy)

You have a knapsack (bag) with maximum carrying weight $W = 50\text{ kg}$.

- **In 0/1 Knapsack (Dynamic Programming):**
  Items are indivisible. You must either take the entire item ($1$) or leave it behind ($0$). Greedy heuristics (e.g. taking the highest total value first or lowest weight first) fail because an indivisible heavy item might leave unused capacity that could have accommodated multiple lighter, valuable items.
- **In Fractional Knapsack (Greedy):**
  *Aap item ko tod (break) sakte ho!* You can take any arbitrary continuous fraction of an item.

---

### Unitary Ratio Heuristic: Price per Kilogram

Just as you would compare **Kesar (Saffron: ₹1000 per gram)** vs. **Loha (Iron: ₹10 per gram)**, you calculate the unitary price per 1 kg for each item:

$$
\Large
\boxed{\text{Ratio} = \frac{\text{Value}}{\text{Weight}} = \text{Price per } 1\text{ kg}}
$$

**Greedy Choice:** Sort items in descending order of their price-per-kg ratio. Pack items with the highest density first. When remaining capacity cannot fit the next complete item, take the exact required fraction using the unitary method.

---

### Step-by-Step Mathematical Derivation & Trace

- **Knapsack Capacity:** $W = 50\text{ kg}$

| Item | Value ($\text{₹}$) | Weight ($\text{kg}$) | Unitary Ratio ($\frac{\text{Value}}{\text{Weight}}$) | Greedy Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Item 1** | $60$ | $10$ | $\frac{60}{10} = \mathbf{6.0}$ | **1st** (Highest per kg) |
| **Item 2** | $100$ | $20$ | $\frac{100}{20} = \mathbf{5.0}$ | **2nd** |
| **Item 3** | $120$ | $30$ | $\frac{120}{30} = \mathbf{4.0}$ | **3rd** |

#### Step-by-Step Execution:
1. **Take Item 1 (Ratio 6.0):**
   Weight $= 10\text{ kg} \le 50\text{ kg}$. Take fully!
   - Remaining Capacity $= 50 - 10 = \mathbf{40\text{ kg}}$
   - Accumulated Value $= \mathbf{60}$
2. **Take Item 2 (Ratio 5.0):**
   Weight $= 20\text{ kg} \le 40\text{ kg}$. Take fully!
   - Remaining Capacity $= 40 - 20 = \mathbf{20\text{ kg}}$
   - Accumulated Value $= 60 + 100 = \mathbf{160}$
3. **Take Item 3 (Ratio 4.0):**
   Weight $= 30\text{ kg} > 20\text{ kg}$ (Cannot fit completely).
   - Break Item 3 and take exactly $20\text{ kg}$ fraction:
     $$
     \text{Value Added} = \left(\frac{120}{30}\right) \times 20 = 4.0 \times 20 = \mathbf{80}
     $$
   - Remaining Capacity $= 20 - 20 = \mathbf{0\text{ kg}}$
   - **Total Maximum Value:**
     $$
     \Large
     \boxed{\text{Total Value} = 160 + 80 = \mathbf{240}}
     $$

---

### Complete Java Implementation (Fractional Knapsack)

```java
import java.util.Arrays;

class Item {
    int value, weight;
    Item(int value, int weight) {
        this.value = value;
        this.weight = weight;
    }
}

class Solution {
    public double fractionalKnapsack(int capacity, Item[] items) {
        // Step 1: Sort items descending by (value / weight) ratio
        // Use double multiplication to prevent integer truncation and precision loss
        Arrays.sort(items, (a, b) -> {
            double r1 = (double) a.value / a.weight;
            double r2 = (double) b.value / b.weight;
            return Double.compare(r2, r1);
        });

        double totalValue = 0.0;
        int remainingCapacity = capacity;

        // Step 2: Pick items greedily
        for (Item item : items) {
            if (remainingCapacity == 0) {
                break;
            }

            // If the knapsack can hold the whole item, take it entirely
            if (item.weight <= remainingCapacity) {
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } 
            // Otherwise, take only the fraction that fits and fill the knapsack
            else {
                double valuePerKg = (double) item.value / item.weight;
                totalValue += valuePerKg * remainingCapacity;
                remainingCapacity = 0; // Knapsack is full
            }
        }

        return totalValue;
    }
}
```

### Complexity Analysis (Fractional Knapsack)

- **Time Complexity:** $\mathcal{O}(N \log N)$ due to sorting items by unit ratio. The subsequent greedy selection runs in $\mathcal{O}(N)$.
- **Auxiliary Space:** $\mathcal{O}(1)$ if sorted in place, or $\mathcal{O}(N)$ for custom sorting arrays.

---

## 7. Placement Strategy, Interview Heuristics & Common Traps

### Why Greedy Matters for Campus Placements
Greedy questions are prominent in **TCS NQT Hands-on Coding (Advanced 1 & 2)**, **Infosys DSE/SP**, and **Cognizant Digital** because they measure real-time algorithmic intuition rather than rote-memorized dynamic programming templates. Greedy solutions boast $\mathcal{O}(N)$ or $\mathcal{O}(N \log N)$ execution with $\mathcal{O}(1)$ auxiliary space, beating standard time-limit checks effortlessly.

### What You Should Do in an Interview
1. **Perform the Counter-Example (Pachtawa) Test:**
   Before coding, try to construct a small input where picking the immediate local optimum creates an unsolvable bottleneck later. If no counter-example exists, proceed greedily.
2. **Inspect the Need for Sorting:**
   Ask yourself: *Does ordering the input in ascending or descending fashion remove future uncertainty?* If yes, sort first.
3. **State the Invariant Explicitly:**
   Tell the interviewer: *"I am maintaining the invariant that `reach` represents the maximum index reachable using any prior valid town."*

### What You Should Avoid
- **Never jump into recursive memoization blindly:** For problems like Jump Game, writing recursive DP indicates an inability to detect linear invariant structures.
- **Never track useless state:** In Lemonade Change, never create counters for ₹20 bills; they cannot be used as change.
- **Avoid Integer Division Precision Bugs:** When computing ratios like `item.value / item.weight`, always cast to `double` before division.

### The Next Practical Step: Jump Game II (LeetCode 45)
Extend the `reach` framework to find the **minimum number of jumps** needed to reach the end index. Instead of just tracking `reach`, maintain two pointers: `currentEnd` (boundary of current jump level) and `farthest` (maximum reach reachable from any index up to `currentEnd`). When $i$ reaches `currentEnd`, increment jumps and update `currentEnd = farthest`.

---

## 8. Practice Problems: Homework Solutions

### Practice Problem 1: Jump Game II (LeetCode 45)

**Problem Statement:**
Given an integer array `nums`, return the minimum number of jumps to reach index $N - 1$. Assume you can always reach the last index.

**Step-by-Step Logic:**
1. This is a Greedy BFS exploration disguised as an array problem.
2. Maintain `jumps = 0`, `currentEnd = 0`, and `farthest = 0`.
3. Loop from $i = 0$ to $N - 2$:
   - `farthest = Math.max(farthest, i + nums[i])`.
   - When $i == \text{currentEnd}$: We have exhausted all options in our current jump. Increment `jumps++` and update `currentEnd = farthest`.

```java
class Solution {
    public int jump(int[] nums) {
        int jumps = 0, currentEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        return jumps;
    }
}
```
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space.

---

### Practice Problem 2: Gas Station / Circular Tour (LeetCode 134)

**Problem Statement:**
There are $N$ gas stations along a circular route. You have a car with an unlimited gas tank. Return the starting gas station's index if you can travel around the circuit once clockwise, or `-1` if impossible.

**Step-by-Step Logic:**
1. Calculate `totalGas` and `totalCost`. If $\sum \text{gas} < \sum \text{cost}$, it is mathematically impossible to complete the circle $\implies$ return `-1`.
2. Greedily track `currentTank`. Whenever `currentTank < 0`, the current station (and every station before it) cannot be the starting point! Reset `start = i + 1` and `currentTank = 0`.

```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        int currentTank = 0, start = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            currentTank += gas[i] - cost[i];

            if (currentTank < 0) {
                start = i + 1; // Greedily reset starting point
                currentTank = 0;
            }
        }

        return (totalGas >= totalCost) ? start : -1;
    }
}
```
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space.

---

## 9. Quick Formula & Concept Cheat Sheet

| Problem / Concept | Core Invariant / Mathematical Rule | Time Complexity | Auxiliary Space | Placement Interview Tip |
| :--- | :--- | :--- | :--- | :--- |
| **Greedy Choice Property** | $\text{Local Optimum} \implies \text{Global Optimum}$ with zero regret | $\mathcal{O}(N)$ or $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$ | Prove no counter-example exists before coding. |
| **Sorting Invariant** | Sort to eliminate future uncertainty | $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$ | 90% of greedy OA problems require sorting first. |
| **Lemonade Change (LC 860)** | Dispense ₹10 + ₹5 first; save flexible ₹5 bills | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ | Never track ₹20 bills; they cannot be used as change. |
| **Assign Cookies (LC 455)** | Sort both; match smallest viable cookie to least greedy child | $\mathcal{O}(N \log N + M \log M)$ | $\mathcal{O}(1)$ | Two-pointer traversal advances greedily. |
| **Jump Game (LC 55)** | $\text{reach} = \max(\text{reach}, i + \text{nums}[i])$; Fail if $\text{reach} < i$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ | Do NOT use DP; single linear pass covers all towns. |
| **Jump Game II (LC 45)** | Greedy BFS: Increment jumps when $i == \text{currentEnd}$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ | Loop terminates at $N - 2$. |
| **Fractional Knapsack** | Sort descending by $\text{Ratio} = \frac{\text{Value}}{\text{Weight}}$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$ | Cast to `double` to prevent integer division truncation. |
| **Gas Station (LC 134)** | Reset `start = i + 1` whenever `currentTank < 0` | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ | If $\sum \text{gas} \ge \sum \text{cost}$, unique start always exists. |

*Revision tip: In placement coding tests, when an optimization problem (maximum profit, minimum jumps, maximum count) has simple linear constraints, always look for the Greedy Invariant before writing Dynamic Programming!*

