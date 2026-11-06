---
id: "dsa-trees-08-diameter-complete-tree"
title: "Trees 08: Diameter & Complete Binary Tree"
slug: "trees-08-diameter-complete-tree"
category: "Binary Trees"
difficulty: "Medium"
estimatedTime: "40 mins"
problemCount: 2
topicsCovered:
  - "Longest Path / Diameter Invariant (leftHeight + rightHeight)"
  - "Diameter of Binary Tree (LeetCode 543) [Optimal O(N) Bottom-Up DFS]"
  - "The Complete Binary Tree (CBT) Structural Definition"
  - "Check Completeness of a Binary Tree (LeetCode 958) [BFS Null-Marker Pattern]"
  - "Dry-Run Traces: Complete vs. Incomplete Trees"
  - "The Edge Count vs. Node Count Diameter Definition Trap"
summary: "Episode 12 of the Master Tree Series by Padho with Pratyush: Master LeetCode 543 (Diameter of Binary Tree) in single-pass O(N) time and LeetCode 958 (Check Complete Binary Tree) using the BFS null-marker queue invariant."
---

# Trees 08: Diameter & Complete Binary Tree

> **DSA Master Revision Notes** for campus placements and technical interviews (TCS NQT Hands-on Coding / Digital / Prime, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Based on Episode 12 of the Tree Series by **Padho with Pratyush**. Formatted with GitHub-compatible Markdown, KaTeX mathematics, visual diameter paths, and verified Java implementations.

---

## Table of Contents
1. [Problem 1: Diameter of Binary Tree (LeetCode 543)](#1-problem-1-diameter-of-binary-tree-leetcode-543)
   - [Definition & The "Does Not Need to Pass Through Root" Invariant](#definition--the-does-not-need-to-pass-through-root-invariant)
   - [The Local Path Formula: `leftHeight + rightHeight`](#the-local-path-formula-leftheight--rightheight)
   - [The Naive $\mathcal{O}(N^2)$ Trap vs. Optimal $\mathcal{O}(N)$ Bottom-Up DFS](#the-naive-mathcalon2-trap-vs-optimal-mathcalon-bottom-up-dfs)
   - [Complete Java Implementation](#complete-java-implementation-diameter)
   - [Complexity Analysis](#complexity-analysis-diameter)
2. [Problem 2: Check Completeness of a Binary Tree (LeetCode 958)](#2-problem-2-check-completeness-of-a-binary-tree-leetcode-958)
   - [What is a Complete Binary Tree?](#what-is-a-complete-binary-tree)
   - [The BFS Null-Marker Invariant](#the-bfs-null-marker-invariant)
   - [Complete Java Implementation](#complete-java-implementation-cbt)
   - [Complexity Analysis](#complexity-analysis-cbt)
3. [Comprehensive Dry Runs](#3-comprehensive-dry-runs)
   - [Diameter Calculation Trace](#diameter-calculation-trace)
   - [CBT Validation: Valid vs. Gap Detected](#cbt-validation-valid-vs-gap-detected)
4. [Placement Strategy, Interview Traps & Heuristics](#4-placement-strategy-interview-traps--heuristics)
   - [Diameter: Edges vs. Nodes Trap](#diameter-edges-vs-nodes-trap)
   - [Array Representation Invariance of CBT](#array-representation-invariance-of-cbt)
5. [Quick Formula & Concept Cheat Sheet](#5-quick-formula--concept-cheat-sheet)

---

## 1. Problem 1: Diameter of Binary Tree (LeetCode 543)

### Definition & The "Does Not Need to Pass Through Root" Invariant
The **diameter** of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root!

```text
               1
              /
             2
            / \
           3   4
          /     \
         5       6

Longest Path: 5 -> 3 -> 2 -> 4 -> 6 (Length = 4 edges)
Notice: The diameter NEVER passes through Root (1)!
```

### The Local Path Formula: `leftHeight + rightHeight`
For any arbitrary node $X$ in the tree, the longest path that has node $X$ as its highest turning point is:

$$
\Large
\boxed{\text{Diameter through } X = \text{Height}(X.\text{left}) + \text{Height}(X.\text{right})}
$$

Where height is measured as the number of edges from node to deepest leaf.

### The Naive $\mathcal{O}(N^2)$ Trap vs. Optimal $\mathcal{O}(N)$ Bottom-Up DFS
- **Naive approach:** For every node, calculate `height(left)` and `height(right)`, then take the max. This recalculates heights repeatedly, resulting in $\mathcal{O}(N^2)$ runtime.
- **Optimal approach:** Compute heights bottom-up in a single postorder DFS pass. While computing the height of the current node, calculate `leftHeight + rightHeight` and update a running global maximum!

### Complete Java Implementation: Diameter

```java
class Solution {
    private int maxDiameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        calculateHeight(root);
        return maxDiameter;
    }

    private int calculateHeight(TreeNode node) {
        if (node == null) {
            return 0; // Height of null is 0
        }

        // Postorder DFS: calculate subtree heights
        int leftH = calculateHeight(node.left);
        int rightH = calculateHeight(node.right);

        // Update global diameter tracker: path passing through current node
        maxDiameter = Math.max(maxDiameter, leftH + rightH);

        // Return height of current node to its parent
        return 1 + Math.max(leftH, rightH);
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(N)$ — Every node is visited exactly once.
- **Space Complexity:** $\mathcal{O}(H)$ — Recursion call stack space.

---

## 2. Problem 2: Check Completeness of a Binary Tree (LeetCode 958)

### What is a Complete Binary Tree?
A binary tree of depth $H$ is complete if:
1. All levels from $0$ to $H-1$ are completely filled.
2. In the last level $H$, all nodes are packed as far to the left as possible with **no gaps**.

### The BFS Null-Marker Invariant
If you traverse a complete binary tree using Level Order (BFS) from left to right, you will encounter all real nodes first, followed only by nulls:

$$
\Large
\boxed{\text{Once a null node is encountered in BFS, NO non-null node can ever appear afterwards!}}
$$

```text
Valid CBT Level Order:   [1, 2, 3, 4, 5, 6, null, null, null, null]  <-- All nulls clustered at end
Invalid CBT Level Order: [1, 2, 3, 4, null, 6, ...]                   <-- Non-null (6) found after null!
```

### Complete Java Implementation: CBT

```java
import java.util.*;

class Solution {
    public boolean isCompleteTree(TreeNode root) {
        if (root == null) return true;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean seenNull = false;

        while (!queue.isEmpty()) {
            TreeNode curr = queue.poll();

            if (curr == null) {
                // First null encountered: flag that all remaining nodes must be null
                seenNull = true;
            } else {
                // If we see a real node after having already seen a null, it's NOT complete!
                if (seenNull) {
                    return false;
                }
                // Enqueue children (even if they are null!)
                queue.offer(curr.left);
                queue.offer(curr.right);
            }
        }

        return true;
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(N)$ — Traverses each node and null pointer once.
- **Space Complexity:** $\mathcal{O}(N)$ — Queue width at the leaf level.

---

## 3. Comprehensive Dry Runs

### CBT Validation: Valid vs. Gap Detected

**Tree A: `[1, 2, 3, 4, 5, 6]` (Valid CBT)**
- Queue states:
  - Enqueue `1` $\implies$ poll `1`, enqueue `2, 3`
  - Poll `2`, enqueue `4, 5`
  - Poll `3`, enqueue `6, null`
  - Poll `4`, enqueue `null, null`
  - Poll `5`, enqueue `null, null`
  - Poll `6`, enqueue `null, null`
  - Poll `null` $\implies$ `seenNull = true`.
  - All subsequent polled elements are `null`.
  - **Result:** `true`.

**Tree B: `[1, 2, 3, 4, null, 6]` (Invalid CBT - Gap at 2's right)**
- Queue pops `1` $\implies$ enqueues `2, 3`.
- Queue pops `2` $\implies$ enqueues `4, null`.
- Queue pops `3` $\implies$ enqueues `6, null`.
- Queue pops `4` $\implies$ enqueues `null, null`.
- Queue pops `null` $\implies$ `seenNull = true`.
- Next in queue is `3`'s left child: Node `6`!
- Node `6 != null` while `seenNull == true` $\implies$ **Immediate return `false`!**

---

## 4. Placement Strategy, Interview Traps & Heuristics

### Diameter: Edges vs. Nodes Trap
Clarify whether the interviewer defines diameter as:
- **Number of Edges:** LeetCode standard (edges $= \text{nodes} - 1$). The above solution returns edges.
- **Number of Nodes:** GeeksforGeeks / TCS standard (nodes $= \text{edges} + 1$). If node count is required, return `maxDiameter + 1`.

---

## 5. Quick Formula & Concept Cheat Sheet

| Problem | Core Invariant | Method | Time | Space |
| :--- | :--- | :--- | :--- | :--- |
| **Diameter (LC 543)** | `max(leftH + rightH)` | Bottom-Up DFS | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ |
| **Complete Tree (LC 958)** | No non-null after first null | BFS with nulls | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ |
