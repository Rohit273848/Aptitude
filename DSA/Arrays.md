# Arrays

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Concepts & Memory Model](#1-core-concepts--memory-model)
2. [Time & Space Complexity Reference](#2-time--space-complexity-reference)
3. [Master Patterns for Placement Rounds](#3-master-patterns-for-placement-rounds)
   - [Prefix Sums & Difference Arrays](#pattern-1-prefix-sums--difference-arrays)
   - [Two-Pointer Technique](#pattern-2-two-pointer-technique)
   - [Sliding Window](#pattern-3-sliding-window)
   - [Kadane's Algorithm for Maximum Subarray](#pattern-4-kadanes-algorithm-for-maximum-subarray)
   - [Dutch National Flag (3-Way Partitioning)](#pattern-5-dutch-national-flag-3-way-partitioning)
4. [2D Matrix Manipulations](#4-2d-matrix-manipulations)
5. [Placement Practice Problems](#5-placement-practice-problems)
6. [Common Traps & Edge Cases](#6-common-traps--edge-cases)

---

## 1. Core Concepts & Memory Model

- **Contiguous Memory:** Elements stored in adjacent memory blocks. Random access via index is $\mathcal{O}(1)$:
$$
\Large
\text{Address}(A[i]) = \text{Base Address} + i \times \text{Size of Element}
$$

---

## 2. Time & Space Complexity Reference

| Operation | Unsorted Array | Sorted Array | Dynamic Array (Vector) |
| :--- | :--- | :--- | :--- |
| Access by index | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| Search value | $\mathcal{O}(N)$ | $\mathcal{O}(\log N)$ (Binary Search) | $\mathcal{O}(N)$ |
| Insert at end | $\mathcal{O}(1)$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ amortized |
| Insert at beginning/middle | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ |
| Delete at index | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ |

---

## 3. Master Patterns for Placement Rounds

### Pattern 1: Prefix Sums & Difference Arrays
- **Prefix Sum:** `prefix[i] = prefix[i - 1] + arr[i]`. Query sum in range $[L, R]$ in $\mathcal{O}(1)$:
$$
\Large
\boxed{\text{Sum}(L, R) = \text{prefix}[R] - \text{prefix}[L - 1]}
$$

### Pattern 2: Two-Pointer Technique
- Useful when the array is sorted or monotonic (e.g., Two Sum II, Trapping Rain Water, Container with Most Water).

### Pattern 3: Sliding Window
- Fixed size window: slide by adding incoming and subtracting outgoing element.
- Variable size window: expand `right` until condition breaks, then shrink `left`.

### Pattern 4: Kadane's Algorithm for Maximum Subarray
$$
\Large
\boxed{\text{currMax} = \max(\text{arr}[i], \text{currMax} + \text{arr}[i])}
$$

```cpp
int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0], currMax = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        currMax = max(nums[i], currMax + nums[i]);
        maxSoFar = max(maxSoFar, currMax);
    }
    return maxSoFar;
}
```

---

## 4. 2D Matrix Manipulations

- **Row-major traversal:** `arr[r][c]` iterates through contiguous memory.
- **Matrix rotation $90^\circ$ clockwise:** Transpose matrix, then reverse each row.
- **Spiral order traversal:** Maintain boundaries `top`, `bottom`, `left`, `right`.

---

## 5. Placement Practice Problems

### Problem 1: Two Sum (Optimal 1-Pass Hash Map)
- **Problem Statement:** Find two numbers that sum up to `target`.
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(N)$ Auxiliary Space.

---

## 6. Common Traps & Edge Cases

> [!WARNING]
> - Index Out of Bounds: Always verify $0 \le i < N$.
> - Integer overflow on sum of large elements in subarray: Cast sum to `long long`.
