---
id: "dsa-trees-06-tree-height-problems"
title: "Trees 06: 3 Tree Height Problems"
slug: "trees-06-tree-height-problems"
category: "Binary Trees"
difficulty: "Medium"
estimatedTime: "40 mins"
problemCount: 3
topicsCovered:
  - "The Fundamental Height Invariant (1 + max(left, right))"
  - "Problem 1: Maximum Depth of Binary Tree (LeetCode 104)"
  - "Problem 2: Minimum Depth of Binary Tree (LeetCode 111) [The Skewed Tree Trap]"
  - "Problem 3: Balanced Binary Tree (LeetCode 110) [The O(N) Sentinel -1 Trick]"
  - "BFS Early-Exit Optimization for Minimum Depth"
  - "Brute-Force O(N^2) vs. Optimal Bottom-Up O(N) Balance Checking"
summary: "Episode 06 of the Master Tree Series by Padho with Pratyush: Master 3 classic tree height and depth problems—LeetCode 104 (Max Depth), LeetCode 111 (Min Depth with the skewed leaf trap), and LeetCode 110 (Balanced Binary Tree with the sentinel -1 short-circuit pattern)."
---

# Trees 06: 3 Tree Height Problems (Max Depth, Min Depth, Balanced Tree)

> **DSA Master Revision Notes** for campus placements and technical interviews (TCS NQT Hands-on Coding / Digital / Prime, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Based on Episode 06 of the Tree Series by **Padho with Pratyush**. Formatted with GitHub-compatible Markdown, KaTeX mathematics, visual dry-run traces, and verified Java implementations.

---

## Table of Contents
1. [Core Mathematical Invariant of Tree Height](#1-core-mathematical-invariant-of-tree-height)
   - [Bottom-Up Height Aggregation](#bottom-up-height-aggregation)
2. [Problem 1: Maximum Depth of Binary Tree (LeetCode 104)](#2-problem-1-maximum-depth-of-binary-tree-leetcode-104)
   - [Problem Definition](#problem-definition-max-depth)
   - [Recursive DFS Implementation](#recursive-dfs-implementation-max-depth)
   - [Complexity Analysis](#complexity-analysis-max-depth)
3. [Problem 2: Minimum Depth of Binary Tree (LeetCode 111)](#3-problem-2-minimum-depth-of-binary-tree-leetcode-111)
   - [The Infamous Skewed Tree Trap!](#the-infamous-skewed-tree-trap)
   - [The Strict Leaf Definition Invariant](#the-strict-leaf-definition-invariant)
   - [Recursive DFS Implementation](#recursive-dfs-implementation-min-depth)
   - [BFS Level-Order Early-Exit Optimization](#bfs-level-order-early-exit-optimization)
   - [Complexity Comparison](#complexity-comparison-min-depth)
4. [Problem 3: Balanced Binary Tree (LeetCode 110)](#4-problem-3-balanced-binary-tree-leetcode-110)
   - [The Balance Condition: $|h_L - h_R| \le 1$](#the-balance-condition-hl---hr-le-1)
   - [Why the Naive $\mathcal{O}(N^2)$ Approach Fails](#why-the-naive-mathcalon2-approach-fails)
   - [The Optimal $\mathcal{O}(N)$ Bottom-Up Sentinel `-1` Pattern](#the-optimal-mathcalon-bottom-up-sentinel--1-pattern)
   - [Complete Java Implementation](#complete-java-implementation-balanced)
   - [Complexity Breakdown](#complexity-breakdown-balanced)
5. [Step-by-Step Dry Run of Sentinel `-1` Execution](#5-step-by-step-dry-run-of-sentinel--1-execution)
6. [Placement Strategy, Interview Traps & Heuristics](#6-placement-strategy-interview-traps--heuristics)
7. [Quick Formula & Concept Cheat Sheet](#7-quick-formula--concept-cheat-sheet)

---

## 1. Core Mathematical Invariant of Tree Height

### Bottom-Up Height Aggregation
The height of any node is strictly determined by its children:
$$
\Large
\boxed{\text{Height}(root) = 1 + \max(\text{Height}(root.\text{left}), \quad \text{Height}(root.\text{right}))}
$$
Base case: An empty node (`null`) has height `0`.

---

## 2. Problem 1: Maximum Depth of Binary Tree (LeetCode 104)

### Problem Definition
Given the `root` of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Recursive DFS Implementation: Max Depth

```java
class Solution {
    public int maxDepth(TreeNode root) {
        // Base Case: Empty node has 0 depth
        if (root == null) {
            return 0;
        }

        // Postorder DFS: Compute depths of left and right subtrees
        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        // Current node's depth is 1 + maximum of subtrees
        return 1 + Math.max(leftDepth, rightDepth);
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(N)$ — Every node is visited once.
- **Space Complexity:** $\mathcal{O}(H)$ — Where $H$ is the tree height. $\mathcal{O}(\log N)$ for balanced, $\mathcal{O}(N)$ for skewed.

---

## 3. Problem 2: Minimum Depth of Binary Tree (LeetCode 111)

### The Infamous Skewed Tree Trap!
Candidates often write this buggy solution:
```java
// FATAL FLAW:
int minDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.min(minDepth(root.left), minDepth(root.right)); // WRONG!
}
```
**Why this fails:**
Consider a right-skewed tree: `1 -> null (left), 2 (right)`.
- `minDepth(root.left)` returns `0`.
- `Math.min(0, minDepth(root.right))` returns `0`.
- The formula yields `1 + 0 = 1`.
- BUT node `1` is NOT a leaf! It has a child `2`. The only leaf is `2`, so the minimum depth is `2`, not `1`!

### The Strict Leaf Definition Invariant
$$
\Large
\boxed{\text{A leaf node is defined as a node with BOTH children null: } (\text{left} == \text{null} \ \land \ \text{right} == \text{null})}
$$
If one child is null, you **must explore the other non-null child** to reach a true leaf!

### Recursive DFS Implementation: Min Depth

```java
class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;

        // If left subtree is null, we must recurse down the right subtree
        if (root.left == null) {
            return 1 + minDepth(root.right);
        }

        // If right subtree is null, we must recurse down the left subtree
        if (root.right == null) {
            return 1 + minDepth(root.left);
        }

        // Both children exist: safe to take the minimum
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }
}
```

### BFS Level-Order Early-Exit Optimization
BFS is **far superior** to DFS for minimum depth! The moment BFS encounters the very first leaf node, it can terminate immediately without exploring the rest of the tree!

```java
import java.util.*;

class Solution {
    public int minDepthBFS(TreeNode root) {
        if (root == null) return 0;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 1;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();

            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = queue.poll();

                // First leaf encountered in BFS guarantees shortest path!
                if (curr.left == null && curr.right == null) {
                    return depth;
                }

                if (curr.left != null) queue.offer(curr.left);
                if (curr.right != null) queue.offer(curr.right);
            }
            depth++;
        }

        return depth;
    }
}
```

### Complexity Comparison
- **DFS:** $\mathcal{O}(N)$ time (must visit all nodes in skewed cases).
- **BFS:** $\mathcal{O}(K)$ time where $K$ is the number of nodes up to the first leaf. If a leaf exists at depth 2 in a tree with $10^6$ nodes, BFS finishes in $\mathcal{O}(1)$ time!

---

## 4. Problem 3: Balanced Binary Tree (LeetCode 110)

### The Balance Condition: $|h_L - h_R| \le 1$
A binary tree is height-balanced if for **every node** in the tree:
$$
\Large
\boxed{|\text{Height}(\text{left}) - \text{Height}(\text{right})| \le 1}
$$

### Why the Naive $\mathcal{O}(N^2)$ Approach Fails
```java
// NAIVE BRUTE FORCE: O(N^2)
public boolean isBalanced(TreeNode root) {
    if (root == null) return true;
    int lh = height(root.left);  // O(N)
    int rh = height(root.right); // O(N)
    return Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right);
}
```
For a skewed tree of size $N$, `height()` is called $N$ times, leading to $\mathcal{O}(N^2)$ runtime and Time Limit Exceeded (TLE).

### The Optimal $\mathcal{O}(N)$ Bottom-Up Sentinel `-1` Pattern
Instead of recomputing heights from the top, compute heights **bottom-up**:
1. If a subtree is balanced, return its actual **Height** ($\ge 0$).
2. If any subtree is unbalanced, immediately return **`-1`** (the sentinel error flag).
3. If a parent receives `-1` from either child, it immediately returns `-1` up the call stack, short-circuiting all remaining checks!

### Complete Java Implementation: Balanced Tree

```java
class Solution {
    public boolean isBalanced(TreeNode root) {
        // If checkHeight returns -1, the tree is unbalanced
        return checkHeight(root) != -1;
    }

    private int checkHeight(TreeNode node) {
        if (node == null) {
            return 0; // Empty tree has height 0
        }

        // Step 1: Check left subtree
        int leftHeight = checkHeight(node.left);
        if (leftHeight == -1) return -1; // Short-circuit early

        // Step 2: Check right subtree
        int rightHeight = checkHeight(node.right);
        if (rightHeight == -1) return -1; // Short-circuit early

        // Step 3: Check current node's balance condition
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Unbalanced!
        }

        // Step 4: Return actual height to parent
        return 1 + Math.max(leftHeight, rightHeight);
    }
}
```

### Complexity Breakdown
- **Time Complexity:** $\mathcal{O}(N)$ — Each node is visited exactly once in postorder DFS.
- **Space Complexity:** $\mathcal{O}(H)$ — Call stack memory ($\mathcal{O}(\log N)$ balanced, $\mathcal{O}(N)$ worst-case).

---

## 5. Step-by-Step Dry Run of Sentinel `-1` Execution

Consider an unbalanced tree:
```text
          1
         /
        2
       /
      3
```
1. `checkHeight(3)`: Leaves are null (`0, 0`). $|0 - 0| \le 1$. Returns height `1`.
2. `checkHeight(2)`: Left child `3` returns `1`. Right child is null (`0`). $|1 - 0| = 1 \le 1$. Returns height `2`.
3. `checkHeight(1)`: Left child `2` returns `2`. Right child is null (`0`).
4. Balance check at node `1`:
   $$
   |2 - 0| = 2 > 1 \implies \text{VIOLATION!}
   $$
5. Node `1` immediately returns `-1`.
6. `isBalanced()` evaluates `checkHeight(root) != -1` $\implies$ `false`.

---

## 6. Placement Strategy, Interview Traps & Heuristics

> [!TIP]
> **The Sentinel Trick is an Interview Favorite:**
> Whenever a problem asks to validate a property based on subtree heights or sizes, combine the calculation and validation into a single function using a sentinel value (like `-1` or `Integer.MIN_VALUE`). It reduces time complexity from $\mathcal{O}(N^2)$ to $\mathcal{O}(N)$.

---

## 7. Quick Formula & Concept Cheat Sheet

| Problem | Core Formula / Pattern | Optimal Time | Optimal Space | Key Trap |
| :--- | :--- | :--- | :--- | :--- |
| **Max Depth (LC 104)** | $1 + \max(h_L, h_R)$ | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ | Empty tree base case $= 0$ |
| **Min Depth (LC 111)** | Non-null child routing / BFS early exit | $\mathcal{O}(K)$ with BFS | $\mathcal{O}(W)$ | Skewed tree with 1 null child |
| **Balanced Tree (LC 110)** | Bottom-up sentinel `-1` return | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ | Avoid top-down $\mathcal{O}(N^2)$ calls |
