# Stack and Queue

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Principles: LIFO vs FIFO](#1-core-principles-lifo-vs-fifo)
2. [Stack Applications & Balanced Parentheses](#2-stack-applications--balanced-parentheses)
3. [Monotonic Stack Paradigm](#3-monotonic-stack-paradigm)
4. [Queue Variations: Circular Queue & Deque](#4-queue-variations-circular-queue--deque)
5. [Placement Practice Problems](#5-placement-practice-problems)
6. [Traps & Edge Cases](#6-traps--edge-cases)

---

## 1. Core Principles: LIFO vs FIFO

- **Stack (Last-In, First-Out):** `push()`, `pop()`, `top()` in $\mathcal{O}(1)$.
- **Queue (First-In, First-Out):** `push()`, `pop()`, `front()` in $\mathcal{O}(1)$.
- **Deque (Double-Ended Queue):** Push and pop from both ends in $\mathcal{O}(1)$.

---

## 2. Monotonic Stack Paradigm

$$
\Large
\boxed{\text{Monotonic Stack: Elements maintained strictly increasing or decreasing}}
$$

- Essential for: Next Greater Element, Next Smaller Element, Largest Rectangle in Histogram, Trapping Rain Water, Stock Span.

```cpp
vector<int> nextGreaterElement(vector<int>& arr) {
    int n = arr.size();
    vector<int> nge(n, -1);
    stack<int> st; // stores indices
    for (int i = 2 * n - 1; i >= 0; i--) {
        while (!st.empty() && arr[st.top()] <= arr[i % n])
            st.pop();
        if (i < n && !st.empty())
            nge[i] = arr[st.top()];
        st.push(i % n);
    }
    return nge;
}
```

---

## 3. Placement Practice Problems

### Problem 1: Valid Parentheses
- Push open brackets `(`, `{`, `[` onto stack. On closing bracket, check for non-empty stack and matching top.
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(N)$ Auxiliary Space.
