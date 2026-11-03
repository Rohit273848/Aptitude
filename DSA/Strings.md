# Strings

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Concepts & Representation](#1-core-concepts--representation)
2. [Frequency Arrays & ASCII Hashing](#2-frequency-arrays--ascii-hashing)
3. [Palindromes & Two Pointers](#3-palindromes--two-pointers)
4. [Sliding Window on Strings](#4-sliding-window-on-strings)
5. [Pattern Matching: KMP & Rabin-Karp](#5-pattern-matching-kmp--rabin-karp)
6. [Placement Practice Problems](#6-placement-practice-problems)
7. [Edge Cases & Traps](#7-edge-cases--traps)

---

## 1. Core Concepts & Representation

- C++ `std::string` is mutable with contiguous dynamic storage.
- Java `String` is immutable; use `StringBuilder` for $\mathcal{O}(1)$ amortized appends.
- Python strings are immutable; join list of characters to construct strings in $\mathcal{O}(N)$.

---

## 2. Frequency Arrays & ASCII Hashing

- Count array of size 26 for lowercase English letters (`c - 'a'`) or size 256 for all ASCII characters.
- Enables $\mathcal{O}(1)$ frequency check and $\mathcal{O}(N)$ anagram verification without sorting.

---

## 3. Palindromes & Two Pointers

- Check palindrome: two pointers inward from `0` and `N - 1`.
- Expand around centers: for each index $i$, expand for odd length (`i, i`) and even length (`i, i + 1`).

---

## 4. Pattern Matching: KMP & Rabin-Karp

$$
\Large
\boxed{\text{KMP Time Complexity: } \mathcal{O}(N + M), \quad \text{LPS Table (Longest Prefix Suffix)}}
$$

---

## 5. Placement Practice Problems

### Problem 1: Valid Anagram
- Compare character frequency counts across both strings.
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space (fixed 26-element array).

---

## 6. Edge Cases & Traps

> [!WARNING]
> - String concatenation inside loops in Java/Python creates $\mathcal{O}(N^2)$ overhead due to immutability. Always use string builders.
> - Empty string inputs and whitespace/punctuation edge cases.
