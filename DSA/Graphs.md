# Graphs

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding, Infosys DSE/SP, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Graph Representations: Adjacency List vs Matrix](#1-graph-representations-adjacency-list-vs-matrix)
2. [Graph Traversals: BFS & DFS](#2-graph-traversals-bfs--dfs)
3. [Cycle Detection (Directed & Undirected)](#3-cycle-detection-directed--undirected)
4. [Topological Sort (Kahn's Algorithm & DFS)](#4-topological-sort-kahns-algorithm--dfs)
5. [Shortest Paths: Dijkstra & Bellman-Ford](#5-shortest-paths-dijkstra--bellman-ford)
6. [Minimum Spanning Trees & Disjoint Set Union (DSU)](#6-minimum-spanning-trees--disjoint-set-union-dsu)
7. [Placement Practice Problems](#7-placement-practice-problems)

---

## 1. Graph Representations: Adjacency List vs Matrix

| Metric | Adjacency Matrix | Adjacency List |
| :--- | :--- | :--- |
| **Space Complexity** | $\mathcal{O}(V^2)$ | $\mathcal{O}(V + E)$ |
| **Check Edge $(u, v)$** | $\mathcal{O}(1)$ | $\mathcal{O}(\text{degree}(u))$ |
| **Iterate Neighbors of $u$** | $\mathcal{O}(V)$ | $\mathcal{O}(\text{degree}(u))$ |

---

## 2. Graph Traversals: BFS & DFS

$$
\Large
\boxed{\text{BFS \& DFS Time Complexity: } \mathcal{O}(V + E), \quad \text{Space: } \mathcal{O}(V)}
$$

---

## 3. Dijkstra's Shortest Path Algorithm

- Finds shortest path from single source in non-negative edge weight graphs.
- Priority queue (`min-heap`): $\mathcal{O}((V + E) \log V)$ time.

```cpp
vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first, weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

---

## 4. Placement Practice Problems

### Problem 1: Number of Connected Components / Islands
- Run BFS/DFS from unvisited land cells, marking neighbors visited.
- **Complexity:** $\mathcal{O}(R \times C)$ Time, $\mathcal{O}(R \times C)$ Space.
