# Searching and Sorting

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Searching Algorithms & Binary Search](#1-searching-algorithms--binary-search)
2. [Binary Search on Answer Space](#2-binary-search-on-answer-space)
3. [Comparison-Based Sorting Algorithms](#3-comparison-based-sorting-algorithms)
4. [Non-Comparison Sorting: Counting & Radix Sort](#4-non-comparison-sorting-counting--radix-sort)
5. [Complexity Summary Table](#5-complexity-summary-table)
6. [Placement Practice Problems](#6-placement-practice-problems)
7. [Traps & Edge Cases](#7-traps--edge-cases)

---

## 1. Searching Algorithms & Binary Search

$$
\Large
\boxed{\text{Binary Search: } \text{mid} = \text{low} + \frac{\text{high} - \text{low}}{2}}
$$

> [!IMPORTANT]
> Always use `low + (high - low) / 2` instead of `(low + high) / 2` to prevent 32-bit signed integer overflow!

---

## 2. Binary Search on Answer Space

- Monotonic condition: predicate $P(x)$ transitions from `false` to `true` (or vice-versa).
- Examples: Aggressive cows, Book allocation problem, Painter's partition problem, Koko eating bananas.

---

## 3. Complexity Summary Table

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $\mathcal{O}(N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | Yes |
| **Selection Sort** | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | No |
| **Insertion Sort** | $\mathcal{O}(N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | Yes |
| **Merge Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N)$ | Yes |
| **Quick Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(\log N)$ | No |
| **Counting Sort** | $\mathcal{O}(N + K)$ | $\mathcal{O}(N + K)$ | $\mathcal{O}(N + K)$ | $\mathcal{O}(K)$ | Yes |

---

## 4. Placement Practice Problems

### Problem 1: Search in Rotated Sorted Array
- Check which half is sorted (`nums[low] <= nums[mid]`) and adjust pointers accordingly.
- **Complexity:** $\mathcal{O}(\log N)$ Time, $\mathcal{O}(1)$ Space.
