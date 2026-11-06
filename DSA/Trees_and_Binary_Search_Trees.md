# Trees and Binary Search Trees

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Tree Hierarchies & Node Definitions](#1-tree-hierarchies--node-definitions)
2. [Traversals: DFS vs. BFS Level Order](#2-traversals-dfs-vs-bfs-level-order)
3. [Binary Search Tree (BST) Invariants](#3-binary-search-tree-bst-invariants)
4. [Lowest Common Ancestor (LCA)](#4-lowest-common-ancestor-lca)
5. [Tree Height, Diameter & Balance Checks](#5-tree-height-diameter--balance-checks)
6. [Placement Practice Problems](#6-placement-practice-problems)
7. [Traps & Edge Cases](#7-traps--edge-cases)

---

## 1. Tree Hierarchies & Node Definitions

```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

---

## 2. Traversals: DFS vs. BFS Level Order

- **Inorder (L-Root-R):** Produces elements in strictly sorted order for BST!
- **Preorder (Root-L-R):** Useful for cloning or serializing trees.
- **Postorder (L-R-Root):** Useful for deleting trees or calculating subtree metrics.
- **Level Order (BFS):** Implemented using a Queue.

---

## 3. Binary Search Tree (BST) Invariants

$$
\Large
\boxed{\text{For any node } X: \quad \text{All}(\text{leftSubtree}) < X.\text{val} < \text{All}(\text{rightSubtree})}
$$

- Search, Insertion, Deletion in BST:
  - Average: $\mathcal{O}(\log N)$
  - Worst (skewed tree): $\mathcal{O}(N)$

---

## 4. Placement Practice Problems

### Problem 1: Validate Binary Search Tree
- Pass valid range `(low, high)` down recursive calls.
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(H)$ Stack Space.

