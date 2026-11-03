# Programming Fundamentals

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Concepts & Language Primitives](#1-core-concepts--language-primitives)
2. [Memory Architecture: Stack vs. Heap](#2-memory-architecture-stack-vs-heap)
3. [Pointers, References & Memory Management](#3-pointers-references--memory-management)
4. [Asymptotic Analysis & Big-O Notation](#4-asymptotic-analysis--big-o-notation)
5. [Standard Templates & Syntax Peculiarities](#5-standard-templates--syntax-peculiarities)
6. [Placement Practice Problems](#6-placement-practice-problems)
7. [Common Pitfalls & Traps](#7-common-pitfalls--traps)

---

## 1. Core Concepts & Language Primitives

- **Data Types & Ranges:** Primitive integer types (`short`, `int`, `long long`), floating-point precision issues (`float` vs `double`), char ASCII mappings (`'a'` = 97, `'A'` = 65, `'0'` = 48).
- **Control Flow:** Branching, short-circuit evaluation (`&&`, `||`), loops, switch-case fallthrough.
- **Functions & Scope:** Call-by-value vs. call-by-reference, variable lifetime, static variables.

---

## 2. Memory Architecture: Stack vs. Heap

| Memory Segment | Allocation Method | Speed | Lifetime | Typical Errors |
| :--- | :--- | :--- | :--- | :--- |
| **Stack Memory** | Static / Automatic | Very Fast | Scope of function | Stack Overflow (deep recursion) |
| **Heap Memory** | Dynamic (`new` / `malloc`) | Slower | Manual deallocation / GC | Memory Leak, Dangling Pointer |

---

## 3. Pointers, References & Memory Management

$$
\Large
\boxed{\text{Address: } \&x \quad \longleftrightarrow \quad \text{Dereference: } *ptr}
$$

- In C/C++, a pointer holds the address of a memory location.
- Passing by reference avoids expensive copies of large data structures (e.g. `vector<int>& arr`).

---

## 4. Asymptotic Analysis & Big-O Notation

- **Big-O ($\mathcal{O}$):** Upper bound, worst-case scenario.
- **Big-Omega ($\Omega$):** Lower bound, best-case scenario.
- **Big-Theta ($\Theta$):** Tight bound.

$$
\Large
\boxed{\mathcal{O}(1) < \mathcal{O}(\log N) < \mathcal{O}(\sqrt{N}) < \mathcal{O}(N) < \mathcal{O}(N \log N) < \mathcal{O}(N^2) < \mathcal{O}(2^N) < \mathcal{O}(N!)}
$$

---

## 5. Standard Templates & Syntax Peculiarities

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Fast I/O for competitive programming and placement rounds
void fastIO() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
}

int main() {
    fastIO();
    // Implementation
    return 0;
}
```

---

## 6. Placement Practice Problems

### Example 1: 32-bit Integer Overflow Check
- **Problem Statement:** Check if multiplying two integers $a$ and $b$ will cause an overflow in a 32-bit signed integer.
- **Solution:** Check before multiplying: `if (a > INT_MAX / b) ...`

---

## 7. Common Pitfalls & Traps

> [!WARNING]
> - Integer overflow when $N \ge 10^5$ and computing products or prefix sums. Use `long long` (C++) / `long` (Java).
> - Forgetting fast I/O when processing $\ge 10^5$ test cases or inputs.
