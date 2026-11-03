# Dynamic Programming

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Principles: Overlapping Subproblems & Optimal Substructure](#1-core-principles-overlapping-subproblems--optimal-substructure)
2. [Memoization (Top-Down) vs. Tabulation (Bottom-Up)](#2-memoization-top-down-vs-tabulation-bottom-up)
3. [Master DP Paradigms](#3-master-dp-paradigms)
   - [0/1 Knapsack & Unbounded Knapsack](#paradigm-1-01-knapsack)
   - [Longest Common Subsequence (LCS)](#paradigm-2-longest-common-subsequence-lcs)
   - [Longest Increasing Subsequence (LIS)](#paradigm-3-longest-increasing-subsequence-lis)
   - [Matrix Chain Multiplication (MCM) / Partition DP](#paradigm-4-mcm--partition-dp)
   - [DP on Grids](#paradigm-5-dp-on-grids)
4. [Space Optimization Techniques](#4-space-optimization-techniques)
5. [Placement Practice Problems](#5-placement-practice-problems)
6. [Traps & Edge Cases](#6-traps--edge-cases)

---

## 1. Core Principles

Dynamic Programming is applicable when a problem exhibits:
1. **Overlapping Subproblems:** Subproblems are computed repeatedly rather than generating new subproblems at each step.
2. **Optimal Substructure:** Optimal solution can be constructed from optimal solutions to subproblems.

---

## 2. Memoization vs. Tabulation

| Metric | Top-Down (Memoization) | Bottom-Up (Tabulation) |
| :--- | :--- | :--- |
| **Approach** | Recursion + Cache | Iteration + Table |
| **Call Stack Overhead** | $\mathcal{O}(N)$ recursion depth | $\mathcal{O}(1)$ call stack |
| **Subproblem Evaluation** | Only computes required states | Computes all states in table |

---

## 3. Paradigm 1: 0/1 Knapsack

$$
\Large
\boxed{dp[i][w] = \max(dp[i-1][w], \text{val}[i-1] + dp[i-1][w - \text{wt}[i-1]])}
$$

```cpp
int knapSack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        // Traverse backwards to prevent using the same item multiple times
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}
```

---

## 4. Placement Practice Problems

### Problem 1: Coin Change (Minimum Coins)
- Transition: $dp[a] = \min_{c \in \text{coins}} (dp[a - c] + 1)$.
- **Complexity:** $\mathcal{O}(\text{Amount} \times N)$ Time, $\mathcal{O}(\text{Amount})$ Space.
