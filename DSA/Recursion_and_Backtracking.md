# Recursion and Backtracking

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Recursion Anatomy & Call Stack](#1-recursion-anatomy--call-stack)
2. [Recurrence Relations & Master Theorem](#2-recurrence-relations--master-theorem)
3. [Backtracking Blueprint & State Space Tree](#3-backtracking-blueprint--state-space-tree)
4. [Standard Placement Archetypes](#4-standard-placement-archetypes)
5. [Placement Practice Problems](#5-placement-practice-problems)
6. [Traps & Edge Cases](#6-traps--edge-cases)

---

## 1. Recursion Anatomy & Call Stack

Every recursive function requires:
1. **Base Case:** Stopping condition that terminates recursion without further calls.
2. **Recursive Transition:** Reduction of the problem towards the base case.
3. **Return / Combine Step:** Formulating final answer from subproblem responses.

---

## 2. Backtracking Blueprint & State Space Tree

```cpp
void backtrack(State state, vector<Choice>& choices) {
    if (isGoal(state)) {
        recordSolution(state);
        return;
    }

    for (auto& choice : choices) {
        if (isValid(choice, state)) {
            apply(choice, state);       // 1. Make choice
            backtrack(state, choices);  // 2. Explore
            undo(choice, state);        // 3. Backtrack (Undo choice)
        }
    }
}
```

---

## 3. Standard Placement Archetypes

- **Subsets / Power Set:** $\mathcal{O}(2^N)$ possibilities.
- **Permutations:** $\mathcal{O}(N!)$ possibilities.
- **Combinations Sum:** Knapsack exploration with branch pruning.
- **Grid Pathfinding:** N-Queens, Sudoku Solver, Word Search, Rat in a Maze.

---

## 4. Placement Practice Problems

### Problem 1: Subsets Generation
- At each index $i$, branch into two decisions: include `nums[i]` or exclude `nums[i]`.
- **Complexity:** $\mathcal{O}(N \cdot 2^N)$ Time, $\mathcal{O}(N)$ Recursion Stack Space.
