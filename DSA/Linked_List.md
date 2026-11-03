# Linked List

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Node Architecture & Pointers](#1-node-architecture--pointers)
2. [Singly, Doubly, & Circular Linked Lists](#2-singly-doubly--circular-linked-lists)
3. [Reversal Techniques & In-Place Pointer Manipulation](#3-reversal-techniques--in-place-pointer-manipulation)
4. [Fast & Slow Pointers (Floyd's Tortoise & Hare)](#4-fast--slow-pointers-floyds-tortoise--hare)
5. [Placement Practice Problems](#5-placement-practice-problems)
6. [Traps & Edge Cases](#6-traps--edge-cases)

---

## 1. Node Architecture & Pointers

```cpp
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};
```

---

## 2. In-Place Reversal of Singly Linked List

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}
```

---

## 3. Fast & Slow Pointers (Floyd's Cycle Detection)

$$
\Large
\boxed{\text{Cycle Detection: } \text{slow moves 1 step}, \quad \text{fast moves 2 steps}}
$$

- If `slow == fast`, a cycle exists.
- Reset `slow` to `head`; advance both 1 step at a time to find cycle entry point!

---

## 4. Placement Practice Problems

### Problem 1: Middle of the Linked List
- Advance `fast` by 2 steps and `slow` by 1 step. When `fast == nullptr || fast->next == nullptr`, `slow` is at middle.
- **Complexity:** $\mathcal{O}(N)$ Time, $\mathcal{O}(1)$ Space.
