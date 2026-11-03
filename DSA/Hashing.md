# Hashing

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Principles & Hash Functions](#1-core-principles--hash-functions)
2. [Collision Resolution Techniques](#2-collision-resolution-techniques)
3. [Hash Maps vs Hash Sets & Ordered Structures](#3-hash-maps-vs-hash-sets--ordered-structures)
4. [Master Placement Patterns](#4-master-placement-patterns)
5. [Placement Practice Problems](#5-placement-practice-problems)
6. [Traps & Edge Cases](#6-traps--edge-cases)

---

## 1. Core Principles & Hash Functions

- Maps keys of arbitrary size to fixed-size indices in a hash table.
- Ideal hash function: uniform distribution, deterministic, low collision probability.

---

## 2. Collision Resolution Techniques

- **Chaining (Open Hashing):** Each bucket is a linked list or balanced red-black tree (e.g. Java 8+ `HashMap` treeifies buckets when length $\ge 8$).
- **Open Addressing (Closed Hashing):** Linear probing, Quadratic probing, Double hashing.

---

## 3. Hash Maps vs Ordered Maps

| Feature | `unordered_map` (C++) / `HashMap` (Java) | `map` (C++) / `TreeMap` (Java) |
| :--- | :--- | :--- |
| **Underlying Data Structure** | Hash Table | Self-balancing BST (Red-Black Tree) |
| **Average Lookup Time** | $\mathcal{O}(1)$ | $\mathcal{O}(\log N)$ |
| **Worst-Case Lookup Time** | $\mathcal{O}(N)$ (hash collision attack) | $\mathcal{O}(\log N)$ |
| **Order of Keys** | Arbitrary / Unordered | Sorted by Key |

---

## 4. Master Placement Patterns

- **Pattern 1: Frequency Counter:** Track occurrences of elements.
- **Pattern 2: Subarray Sum Equals $K$ (Prefix Sum + Hash Map):**
$$
\Large
\boxed{\text{prefixSum}[i] - \text{prefixSum}[j] = K \implies \text{Find } (\text{prefixSum}[i] - K) \text{ in map}}
$$

---

## 5. Placement Practice Problems

### Problem 1: Longest Consecutive Sequence
- Insert all elements into an unordered set. Only initiate streak counting from `x` if `x - 1` is not in the set.
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(N)$ Space.
