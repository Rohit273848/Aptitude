---
id: "dsa-trees-09-path-sum"
title: "Trees 09: Path Sum Problems"
slug: "trees-09-path-sum"
category: "Binary Trees"
difficulty: "Medium"
estimatedTime: "45 mins"
problemCount: 3
topicsCovered:
  - "The 3-Tier Path Sum Framework (Decision, Collection & Arbitrary Paths)"
  - "Path Sum I (LeetCode 112) [Target Subtraction Invariant]"
  - "Path Sum II (LeetCode 113) [Backtracking Path State Invariant]"
  - "Path Sum III (LeetCode 437) [Prefix Sum Hash Map O(N) Mastery]"
  - "Binary Tree Maximum Path Sum (LeetCode 124 Preview)"
  - "Step-by-Step Backtracking State Transitions & Prefix Sum Trace"
  - "Complexity Analysis & Space Allocation Pitfalls"
summary: "Episode 11 of the Master Tree Series by Padho with Pratyush: Master the complete Path Sum progression—LeetCode 112 (Boolean Decision), LeetCode 113 (Backtracking Path Collection), and LeetCode 437 (Linear O(N) Prefix Sum Map)."
---

# Trees 09: Path Sum Problems (Mastering Root-to-Leaf & Subpath Patterns)

> **DSA Master Revision Notes** for campus placements and technical interviews (TCS NQT Hands-on Coding / Digital / Prime, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Based on Episode 11 of the Tree Series by **Padho with Pratyush**. Formatted with GitHub-compatible Markdown, KaTeX mathematics, visual backtracking traces, and verified Java implementations.

---

## Table of Contents
1. [The 3-Tier Path Sum Architecture](#1-the-3-tier-path-sum-architecture)
   - [Taxonomy of Path Sum Questions](#taxonomy-of-path-sum-questions)
2. [Problem 1: Path Sum I (LeetCode 112)](#2-problem-1-path-sum-i-leetcode-112)
   - [Problem Definition & The Target Subtraction Invariant](#problem-definition--the-target-subtraction-invariant)
   - [Complete Java Implementation](#complete-java-implementation-path-sum-1)
   - [Complexity Analysis](#complexity-analysis-path-sum-1)
3. [Problem 2: Path Sum II (LeetCode 113)](#3-problem-2-path-sum-ii-leetcode-113)
   - [Problem Definition](#problem-definition-path-sum-2)
   - [The Backtracking Pattern: `add()` $\to$ `recurse()` $\to$ `remove()`](#the-backtracking-pattern-add-to-recurse-to-remove)
   - [Complete Java Implementation](#complete-java-implementation-path-sum-2)
   - [Complexity Analysis](#complexity-analysis-path-sum-2)
4. [Problem 3: Path Sum III (LeetCode 437)](#4-problem-3-path-sum-iii-leetcode-437)
   - [Why Any-Downward-Path is Challenging](#why-any-downward-path-is-challenging)
   - [The Prefix Sum Map Optimization ($\mathcal{O}(N)$ vs. $\mathcal{O}(N^2)$)](#the-prefix-sum-map-optimization-mathcalon-vs-mathcalon2)
   - [Complete Java Implementation](#complete-java-implementation-path-sum-3)
   - [Complexity Breakdown](#complexity-breakdown-path-sum-3)
5. [Bonus Hard: Binary Tree Maximum Path Sum (LeetCode 124)](#5-bonus-hard-binary-tree-maximum-path-sum-leetcode-124)
   - [The Negative Subtree Abandonment Invariant](#the-negative-subtree-abandonment-invariant)
   - [Java Implementation](#java-implementation-max-path-sum)
6. [Comprehensive Step-by-Step Dry Runs](#6-comprehensive-step-by-step-dry-runs)
   - [Prefix Sum Map State Evolution Trace](#prefix-sum-map-state-evolution-trace)
7. [Placement Strategy, Interview Traps & Heuristics](#7-placement-strategy-interview-traps--heuristics)
   - [The Non-Leaf Zero Remainder Trap](#the-non-leaf-zero-remainder-trap)
   - [Deep Copying in Backtracking (`new ArrayList<>(path)`)](#deep-copying-in-backtracking-new-arraylistpath)
8. [Quick Formula & Concept Cheat Sheet](#8-quick-formula--concept-cheat-sheet)

---

## 1. The 3-Tier Path Sum Architecture

### Taxonomy of Path Sum Questions
Tree path problems are among the most frequent patterns asked by Amazon, TCS Digital, and Microsoft:

| Tier | Problem | Path Scope | Return Type | Algorithmic Paradigm |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Path Sum I (LC 112)** | Root $\to$ Leaf | `boolean` | Target Subtraction DFS |
| **Tier 2** | **Path Sum II (LC 113)** | Root $\to$ Leaf | `List<List<Integer>>` | Backtracking DFS |
| **Tier 3** | **Path Sum III (LC 437)** | Any node $\to$ any downward descendant | `int` (path count) | Prefix Sum Hash Map |

---

## 2. Problem 1: Path Sum I (LeetCode 112)

### Problem Definition & The Target Subtraction Invariant
Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf path** such that adding up all the values along the path equals `targetSum`.

**Target Subtraction Technique:**
Instead of accumulating a running sum, subtract the current node's value from `targetSum`:

$$
\Large
\boxed{\text{At a leaf node: } \quad (\text{targetSum} == root.\text{val}) \iff \text{Valid Path Exists}}
$$

### Complete Java Implementation: Path Sum I

```java
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        // Base Case 1: Empty tree has no root-to-leaf paths
        if (root == null) {
            return false;
        }

        // Base Case 2: Leaf node reached! Check if remaining sum matches node value
        if (root.left == null && root.right == null) {
            return targetSum == root.val;
        }

        // Recursive Step: Subtract current node's value and search child subtrees
        int remaining = targetSum - root.val;
        return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(N)$ — Visits each node once.
- **Space Complexity:** $\mathcal{O}(H)$ — Recursion call stack space.

---

## 3. Problem 2: Path Sum II (LeetCode 113)

### Problem Definition
Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf paths** where the sum of the node values equals `targetSum`.

### The Backtracking Pattern: `add()` $\to$ `recurse()` $\to$ `remove()`
When collecting paths:
1. Maintain a single shared mutable `List<Integer> currentPath`.
2. Add current node: `currentPath.add(root.val)`.
3. If at leaf and `remaining == root.val`, add a snapshot: `result.add(new ArrayList<>(currentPath))`.
4. Recurse down left and right children.
5. **Backtrack step:** Remove the last added element before returning: `currentPath.remove(currentPath.size() - 1)`.

### Complete Java Implementation: Path Sum II

```java
import java.util.*;

class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> currentPath = new ArrayList<>();
        backtrack(root, targetSum, currentPath, result);
        return result;
    }

    private void backtrack(TreeNode node, int remaining, List<Integer> currentPath, List<List<Integer>> result) {
        if (node == null) return;

        // Choose: include current node
        currentPath.add(node.val);

        // Check if valid leaf
        if (node.left == null && node.right == null && remaining == node.val) {
            result.add(new ArrayList<>(currentPath)); // Deep copy snapshot
        } else {
            // Explore children
            backtrack(node.left, remaining - node.val, currentPath, result);
            backtrack(node.right, remaining - node.val, currentPath, result);
        }

        // Unchoose: backtrack so sibling branches aren't polluted
        currentPath.remove(currentPath.size() - 1);
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(N^2)$ in worst case (copying paths of length $N$ at each leaf). $\mathcal{O}(N \log N)$ for balanced trees.
- **Space Complexity:** $\mathcal{O}(H)$ — Path array and recursion stack.

---

## 4. Problem 3: Path Sum III (LeetCode 437)

### Why Any-Downward-Path is Challenging
Paths do **not** need to start at the root and do **not** need to end at a leaf; they only need to travel downwards (from parent to child).
- A naive brute force calls `hasPathFromNode()` from every node $\implies \mathcal{O}(N^2)$ time.

### The Prefix Sum Map Optimization ($\mathcal{O}(N)$ vs. $\mathcal{O}(N^2)$)
Just like Subarray Sum Equals K in arrays:

$$
\Large
\boxed{\text{CurrentPathSum} - \text{TargetSum} = \text{AncestorPrefixSum}}
$$

If `currentPathSum - targetSum` exists in our prefix sum map, then there are valid paths ending at the current node!
- Key requirement: Because this is a tree, when exiting a node back up to the parent, **you must decrement the prefix sum frequency** in the map to prevent sibling subtrees from accessing it!

### Complete Java Implementation: Path Sum III

```java
import java.util.*;

class Solution {
    public int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> prefixMap = new HashMap<>();
        // Base case: a prefix sum of 0 has occurred 1 time (empty path)
        prefixMap.put(0L, 1);
        return dfs(root, 0L, targetSum, prefixMap);
    }

    private int dfs(TreeNode node, long currentSum, int target, Map<Long, Integer> prefixMap) {
        if (node == null) return 0;

        currentSum += node.val;
        // Check if there is an ancestor prefix sum such that: currentSum - ancestor = target
        int pathsEndingHere = prefixMap.getOrDefault(currentSum - target, 0);

        // Record current prefix sum
        prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);

        // Recurse into left and right subtrees
        int totalPaths = pathsEndingHere 
                       + dfs(node.left, currentSum, target, prefixMap) 
                       + dfs(node.right, currentSum, target, prefixMap);

        // Backtrack: Remove current sum frequency before ascending
        prefixMap.put(currentSum, prefixMap.get(currentSum) - 1);

        return totalPaths;
    }
}
```

### Complexity Breakdown
- **Time Complexity:** $\mathcal{O}(N)$ — Each node visited once; hash map lookups are $\mathcal{O}(1)$.
- **Space Complexity:** $\mathcal{O}(H)$ — Map contains at most $H$ entries corresponding to the current root-to-node path.

---

## 5. Bonus Hard: Binary Tree Maximum Path Sum (LeetCode 124)

### The Negative Subtree Abandonment Invariant
A path can start and end anywhere in the tree.
At any node $X$:
1. Compute max gain from left: `leftGain = Math.max(0, maxPathDown(node.left))`.
2. Compute max gain from right: `rightGain = Math.max(0, maxPathDown(node.right))`.
3. If a subtree sum is negative, **abandon it** (`Math.max(0, ...)`).
4. Update global answer: `maxSum = Math.max(maxSum, node.val + leftGain + rightGain)`.
5. Return single branch to parent: `node.val + Math.max(leftGain, rightGain)`.

### Java Implementation: Max Path Sum

```java
class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        maxSum = Integer.MIN_VALUE;
        maxGain(root);
        return maxSum;
    }

    private int maxGain(TreeNode node) {
        if (node == null) return 0;

        // Ignore negative branches
        int leftGain = Math.max(0, maxGain(node.left));
        int rightGain = Math.max(0, maxGain(node.right));

        // Path passing through node as turning point
        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);

        // Return max contribution down one branch
        return node.val + Math.max(leftGain, rightGain);
    }
}
```

---

## 6. Comprehensive Step-by-Step Dry Runs

### Prefix Sum Map State Evolution Trace
Target = `8`, Tree: `[10, 5, -3, 3, 2, null, 11]`

| Node | `currentSum` | Look For (`curr - 8`) | Paths Found | Map Action |
| :--- | :--- | :--- | :--- | :--- |
| **Root (10)** | `10` | `10 - 8 = 2` | `0` | Put `(10: 1)` |
| **Node (5)** | `15` | `15 - 8 = 7` | `0` | Put `(15: 1)` |
| **Node (3)** | `18` | `18 - 8 = 10` | `1` (from Root!) | Put `(18: 1)` |
| Backtrack 3 | — | — | — | Decr `18` |
| **Node (2)** | `17` | `17 - 8 = 9` | `0` | Put `(17: 1)` |
| Backtrack 2 | — | — | — | Decr `17` |
| Backtrack 5 | — | — | — | Decr `15` |
| **Node (-3)** | `7` | `7 - 8 = -1` | `0` | Put `(7: 1)` |
| **Node (11)** | `18` | `18 - 8 = 10` | `1` (from Root!) | Put `(18: 1)` |
| **Total** | — | — | **`2` Valid Paths** | Finished |

---

## 7. Placement Strategy, Interview Traps & Heuristics

### The Non-Leaf Zero Remainder Trap
In Path Sum I, never check `targetSum == 0` without also checking `root.left == null && root.right == null`!
If an internal node reduces `remaining` to `0`, but has children, it is **not** a valid root-to-leaf path.

### Deep Copying in Backtracking (`new ArrayList<>(path)`)
In Path Sum II:
```java
// FATAL BUG:
result.add(currentPath); // Adds reference! When currentPath is cleared, result gets empty lists!

// CORRECT:
result.add(new ArrayList<>(currentPath)); // Deep copies the contents
```

---

## 8. Quick Formula & Concept Cheat Sheet

| Problem | Core Trick | Invariant Formula | Time | Space |
| :--- | :--- | :--- | :--- | :--- |
| **Path Sum I (LC 112)** | Target subtraction | `targetSum == root.val && isLeaf` | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ |
| **Path Sum II (LC 113)** | Backtracking DFS | `add()` $\to$ recurse $\to$ `remove()` | $\mathcal{O}(N^2)$ | $\mathcal{O}(H)$ |
| **Path Sum III (LC 437)** | Prefix sum map | `currSum - target` lookup with backtrack | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ |
| **Max Path Sum (LC 124)** | Drop negative gains | `node.val + max(0, left) + max(0, right)` | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ |
