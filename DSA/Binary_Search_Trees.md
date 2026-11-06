---
id: "dsa-binary-search-trees"
title: "Binary Search Trees (BST)"
slug: "binary-search-trees"
category: "Binary Search Trees"
difficulty: "Medium"
estimatedTime: "45 mins"
problemCount: 3
topicsCovered:
  - "The Core Binary Search Tree Invariant (Strict Order Property)"
  - "The Inorder Monotonicity Theorem (BST Inorder is Strictly Sorted)"
  - "Core Operations: Search, Insertion & Deletion (3 Deletion Cases)"
  - "Problem 1: Validate Binary Search Tree (LeetCode 98) [Range Propagation]"
  - "Problem 2: Lowest Common Ancestor of a BST (LeetCode 235) [O(H) Value Branching]"
  - "Problem 3: Kth Smallest Element in a BST (LeetCode 230)"
  - "Skewed Degradation & Introduction to Self-Balancing Trees (AVL/Red-Black)"
summary: "Separate Standalone Master Notes on Binary Search Trees (BST): Master the strict BST ordering invariant, validate BSTs with range propagation (LeetCode 98), O(H) Lowest Common Ancestor (LeetCode 235), and in-order Kth smallest element extraction."
---

# Binary Search Trees (BST): Properties, Operations & Placement Algorithms

> **DSA Master Revision Notes** for campus placements and technical interviews (TCS NQT Hands-on Coding / Digital / Prime, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Separate standalone module dedicated to Binary Search Trees. Formatted with GitHub-compatible Markdown, KaTeX mathematics, visual BST state transitions, and verified Java implementations.

---

## Table of Contents
1. [Core Intuition & The Strict BST Invariant](#1-core-intuition--the-strict-bst-invariant)
   - [Why Separate BST from General Binary Trees?](#why-separate-bst-from-general-binary-trees)
   - [The Fundamental BST Inequality Invariant](#the-fundamental-bst-inequality-invariant)
   - [The Inorder Monotonicity Theorem](#the-inorder-monotonicity-theorem)
2. [Core Operations on BST](#2-core-operations-on-bst)
   - [Search in BST ($\mathcal{O}(H)$)](#search-in-bst-mathcaloh)
   - [Insertion in BST ($\mathcal{O}(H)$)](#insertion-in-bst-mathcaloh)
   - [Deletion in BST: The 3 Structural Cases](#deletion-in-bst-the-3-structural-cases)
3. [Problem 1: Validate Binary Search Tree (LeetCode 98)](#3-problem-1-validate-binary-search-tree-leetcode-98)
   - [The Local Range Flaw (Why Checking Only Immediate Children Fails)](#the-local-range-flaw-why-checking-only-immediate-children-fails)
   - [Range Propagation Technique: `(minVal, maxVal)`](#range-propagation-technique-minval-maxval)
   - [Complete Java Implementation](#complete-java-implementation-validate-bst)
   - [Complexity Analysis](#complexity-analysis-validate-bst)
4. [Problem 2: Lowest Common Ancestor in BST (LeetCode 235)](#4-problem-2-lowest-common-ancestor-in-bst-leetcode-235)
   - [Why BST LCA is $\mathcal{O}(H)$ instead of $\mathcal{O}(N)$](#why-bst-lca-is-mathcaloh-instead-of-mathcalon)
   - [Complete Java Implementation (Iterative $\mathcal{O}(1)$ Space)](#complete-java-implementation-bst-lca)
   - [Complexity Analysis](#complexity-analysis-bst-lca)
5. [Problem 3: Kth Smallest Element in a BST (LeetCode 230)](#5-problem-3-kth-smallest-element-in-a-bst-leetcode-230)
   - [Inorder Counting Strategy](#inorder-counting-strategy)
   - [Complete Java Implementation](#complete-java-implementation-kth-smallest)
   - [Complexity Analysis](#complexity-analysis-kth-smallest)
6. [Placement Strategy, Interview Traps & Heuristics](#6-placement-strategy-interview-traps--heuristics)
   - [Integer Overflow Trap with `Integer.MIN_VALUE`](#integer-overflow-trap-with-integermin_value)
   - [Skewed BST Worst-Case Performance ($\mathcal{O}(N)$)](#skewed-bst-worst-case-performance-mathcalon)
7. [Quick Formula & Concept Cheat Sheet](#7-quick-formula--concept-cheat-sheet)

---

## 1. Core Intuition & The Strict BST Invariant

### Why Separate BST from General Binary Trees?
In a general Binary Tree, node values have no ordering relationship; locating an element requires an exhaustive search through all $N$ nodes ($\mathcal{O}(N)$).
A **Binary Search Tree (BST)** imposes a strict ordering invariant that eliminates half of the remaining subtrees at every decision step—mirroring Binary Search on sorted arrays!

### The Fundamental BST Inequality Invariant
For every node $X$ in a valid Binary Search Tree:

$$
\Large
\boxed{\forall \ u \in \text{LeftSubtree}(X): \ u.\text{val} < X.\text{val} \quad \text{AND} \quad \forall \ v \in \text{RightSubtree}(X): \ v.\text{val} > X.\text{val}}
$$

> [!CAUTION]
> It is **not enough** for `root.left.val < root.val < root.right.val`. **EVERY single descendant** in the left subtree must be strictly less than the root, and **EVERY single descendant** in the right subtree must be strictly greater than the root!

```text
       ( 5 )
      /     \
    ( 3 )   ( 7 )
   /   \   /   \
 ( 2 ) ( 4) ( 6 ) ( 8 )
 [VALID BST: Strictly Ordered]
```

### The Inorder Monotonicity Theorem
$$
\Large
\boxed{\text{The Inorder Traversal of any valid BST produces a strictly ascending sequence!}}
$$

If an in-order traversal of a tree yields:
`[2, 3, 4, 5, 6, 7, 8]` $\implies$ Valid BST.
If any element $A[i] \ge A[i+1]$ $\implies$ Invalid BST!

---

## 2. Core Operations on BST

### Search in BST ($\mathcal{O}(H)$)

```java
public TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    if (val < root.val) return searchBST(root.left, val);
    return searchBST(root.right, val);
}
```

### Insertion in BST ($\mathcal{O}(H)$)

```java
public TreeNode insertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insertIntoBST(root.left, val);
    else root.right = insertIntoBST(root.right, val);
    return root;
}
```

### Deletion in BST: The 3 Structural Cases
1. **Case 1 (Leaf Node):** Simply delete the node (set parent's pointer to `null`).
2. **Case 2 (Single Child):** Bypass the node (link parent directly to the single child).
3. **Case 3 (Two Children):** Replace the node's value with its **Inorder Successor** (the smallest value in its right subtree), then recursively delete the inorder successor from the right subtree.

---

## 3. Problem 1: Validate Binary Search Tree (LeetCode 98)

### The Local Range Flaw (Why Checking Only Immediate Children Fails)
Consider this deceptive tree:
```text
       10
      /  \
     5    15
         /  \
        6    20   <-- 6 is in 10's right subtree! 6 < 10 violates BST rule!
```
If you only check `node.left.val < node.val < node.right.val`, node `15` looks valid ($6 < 15 < 20$)! But node `6` violates root `10`'s invariant ($6 < 10$).

### Range Propagation Technique: `(minVal, maxVal)`
Pass down a valid bounding interval `(min, max)` through recursion:
- When moving **Left**: The upper bound tightens $\implies (\text{min}, \text{root.val})$.
- When moving **Right**: The lower bound tightens $\implies (\text{root.val}, \text{max})$.

### Complete Java Implementation: Validate BST

```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        // Use Long to avoid integer overflow when root.val == Integer.MAX_VALUE or MIN_VALUE
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) {
            return true;
        }

        // Must satisfy strict inequality
        if (node.val <= min || node.val >= max) {
            return false;
        }

        // Recurse left with upper bound = node.val; right with lower bound = node.val
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(N)$ — Visits every node once.
- **Space Complexity:** $\mathcal{O}(H)$ — Recursion call stack space ($\mathcal{O}(\log N)$ balanced, $\mathcal{O}(N)$ skewed).

---

## 4. Problem 2: Lowest Common Ancestor in BST (LeetCode 235)

### Why BST LCA is $\mathcal{O}(H)$ instead of $\mathcal{O}(N)$
In a BST, we do not need to search both left and right subtrees! The values of $p$ and $q$ guide us directly:
1. If both $p.\text{val} < \text{curr}.\text{val}$ and $q.\text{val} < \text{curr}.\text{val}$ $\implies$ LCA must be in the **left subtree**.
2. If both $p.\text{val} > \text{curr}.\text{val}$ and $q.\text{val} > \text{curr}.\text{val}$ $\implies$ LCA must be in the **right subtree**.
3. If $p$ and $q$ lie on opposite sides of $\text{curr}$ (or one equals $\text{curr}$) $\implies$ **`curr` is the LCA fork!**

### Complete Java Implementation: BST LCA

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;

        while (curr != null) {
            // Both nodes lie in the left subtree
            if (p.val < curr.val && q.val < curr.val) {
                curr = curr.left;
            }
            // Both nodes lie in the right subtree
            else if (p.val > curr.val && q.val > curr.val) {
                curr = curr.right;
            }
            // Fork split point! Current node is the LCA
            else {
                return curr;
            }
        }

        return null;
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(H)$ — Traverses a single path from root to LCA. $\mathcal{O}(\log N)$ for balanced trees.
- **Space Complexity:** $\mathcal{O}(1)$ — Pure iterative pointer traversal; zero auxiliary memory.

---

## 5. Problem 3: Kth Smallest Element in a BST (LeetCode 230)

### Inorder Counting Strategy
Since an Inorder traversal visits elements in strictly ascending order, the $K$-th visited element is guaranteed to be the $K$-th smallest!

### Complete Java Implementation: Kth Smallest

```java
class Solution {
    private int count = 0;
    private int result = -1;

    public int kthSmallest(TreeNode root, int k) {
        count = 0;
        result = -1;
        inorder(root, k);
        return result;
    }

    private void inorder(TreeNode node, int k) {
        if (node == null || count >= k) return;

        inorder(node.left, k);

        count++;
        if (count == k) {
            result = node.val;
            return;
        }

        inorder(node.right, k);
    }
}
```

### Complexity Analysis
- **Time Complexity:** $\mathcal{O}(H + K)$ — Stops immediately upon reaching the $K$-th element.
- **Space Complexity:** $\mathcal{O}(H)$ — Stack depth.

---

## 6. Placement Strategy, Interview Traps & Heuristics

### Integer Overflow Trap with `Integer.MIN_VALUE`
In LeetCode 98, node values can be `Integer.MIN_VALUE` or `Integer.MAX_VALUE`.
If you initialize bounds with:
```java
validate(root, Integer.MIN_VALUE, Integer.MAX_VALUE);
```
A valid root with value `Integer.MIN_VALUE` will fail `node.val <= min`!
**Solution:** Always use `long min = Long.MIN_VALUE` and `long max = Long.MAX_VALUE` or `TreeNode minNode, TreeNode maxNode` pointers.

---

## 7. Quick Formula & Concept Cheat Sheet

| Operation / Problem | Core Invariant | Time (Balanced) | Time (Skewed) | Auxiliary Space |
| :--- | :--- | :--- | :--- | :--- |
| **Search / Insert** | Binary navigation by value | $\mathcal{O}(\log N)$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ iterative |
| **Validate BST (LC 98)** | Range propagation `(min, max)` | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ |
| **LCA in BST (LC 235)** | Branch divergence fork point | $\mathcal{O}(\log N)$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ |
| **Kth Smallest (LC 230)** | Inorder stop at counter $K$ | $\mathcal{O}(H + K)$ | $\mathcal{O}(N)$ | $\mathcal{O}(H)$ |
