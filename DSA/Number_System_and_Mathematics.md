# Number System and Mathematics

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Mathematical Foundations](#1-core-mathematical-foundations)
2. [Bit Manipulation Tricks & Bitmasks](#2-bit-manipulation-tricks--bitmasks)
3. [Prime Numbers & Sieve of Eratosthenes](#3-prime-numbers--sieve-of-eratosthenes)
4. [GCD, LCM & Euclidean Algorithm](#4-gcd-lcm--euclidean-algorithm)
5. [Modular Arithmetic & Fast Exponentiation](#5-modular-arithmetic--fast-exponentiation)
6. [Placement Practice Problems](#6-placement-practice-problems)
7. [Edge Cases & Traps](#7-edge-cases--traps)

---

## 1. Core Mathematical Foundations

- Prime factorizations, divisors count, and properties of integers.
- Any integer $N$ can have at most one prime factor greater than $\sqrt{N}$.

---

## 2. Bit Manipulation Tricks & Bitmasks

| Operation | Bitwise Syntax | Effect |
| :--- | :--- | :--- |
| Check if $k$-th bit is set | `(n & (1 << k)) != 0` | Evaluates to true if $k$-th bit is 1 |
| Set $k$-th bit | `n = n | (1 << k)` | Turns $k$-th bit to 1 |
| Clear $k$-th bit | `n = n & ~(1 << k)` | Turns $k$-th bit to 0 |
| Toggle $k$-th bit | `n = n ^ (1 << k)` | Inverts $k$-th bit |
| Check power of 2 | `(n > 0) && (n & (n - 1)) == 0` | True if $n = 2^x$ |
| Clear lowest set bit | `n = n & (n - 1)` | Removes rightmost set bit |
| Isolate lowest set bit | `lowBit = n & (-n)` | Leaves only lowest set bit |

---

## 3. Prime Numbers & Sieve of Eratosthenes

$$
\Large
\boxed{\text{Sieve Time Complexity: } \mathcal{O}(N \log \log N), \quad \text{Auxiliary Space: } \mathcal{O}(N)}
$$

```cpp
vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p)
                isPrime[i] = false;
        }
    }
    return isPrime;
}
```

---

## 4. GCD, LCM & Euclidean Algorithm

$$
\Large
\boxed{\gcd(a, b) = \gcd(b, a \pmod b), \qquad \text{lcm}(a, b) = \frac{a \times b}{\gcd(a, b)}}
$$

```cpp
long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

---

## 5. Modular Arithmetic & Fast Exponentiation

$$
\Large
\boxed{(a + b) \pmod M = ((a \bmod M) + (b \bmod M)) \pmod M}
$$

$$
\Large
\boxed{(a \times b) \pmod M = ((a \bmod M) \times (b \bmod M)) \pmod M}
$$

```cpp
long long powerMod(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}
```

---

## 6. Placement Practice Problems

### Problem 1: Single Number (XOR Invariant)
- **Problem Statement:** Every element appears twice except for one. Find that single one.
- **Logic:** $x \oplus x = 0$ and $x \oplus 0 = x$. XOR all elements.
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space.

---

## 7. Edge Cases & Traps

> [!WARNING]
> - Negative numbers in modular arithmetic: in C++, `(-7) % 5 = -2`. Always normalize: `(x % M + M) % M`.
> - Multiplication overflow during LCM: compute `(a / gcd(a, b)) * b` rather than `(a * b) / gcd(a, b)`.
