import React, { useState } from 'react';
import { Topic, TopicGroup, SubjectArea } from '../types/syllabus';
import { FileText, PlusCircle, Copy, Check, ExternalLink, Sparkles, Code2 } from 'lucide-react';

interface EmptyTopicViewProps {
  topic: Topic;
  group: TopicGroup;
  subject: SubjectArea;
  onOpenAddNotesGuide: () => void;
}

export const EmptyTopicView: React.FC<EmptyTopicViewProps> = ({
  topic,
  group,
  subject,
  onOpenAddNotesGuide
}) => {
  const [copied, setCopied] = useState(false);

  // Recommended file convention
  const isSystemDesign = subject.section === 'System Design' || subject.id.includes('system-design') || topic.id.startsWith('hld-');
  const isDsa = !isSystemDesign && (subject.section === 'DSA' || subject.id.includes('dsa') || subject.id.includes('coding'));
  const suggestedFileName = topic.noteFile ? topic.noteFile.split('/').pop() : `${topic.title.replace(/[^a-zA-Z0-9]+/g, '_')}.md`;
  const suggestedPath = topic.noteFile || (isSystemDesign ? `SystemDesign/${suggestedFileName}` : isDsa ? `DSA/${suggestedFileName}` : `Aptitude/Numarical/${suggestedFileName}`);

  const boilerplateMarkdown = isSystemDesign
    ? `---
id: "${topic.id}"
title: "${topic.title}"
slug: "${topic.id.replace(/^hld-/, '')}"
category: "${group.title}"
difficulty: "Medium"
estimatedTime: "50 mins"
summary: "${topic.summary || 'Architecture, components, trade-offs, and scaling.'}"
---

# ${topic.title}

> **System Design Revision Notes** for technical architecture interviews (FAANG, Tier-1 Product Companies, TCS Digital/Prime Technical Interviews). Formatted with GitHub-compatible Markdown, KaTeX calculations, Mermaid architecture diagrams, and production trade-off matrices.

## Table of Contents
1. [Requirements Clarification & Scope](#1-requirements-clarification--scope)
2. [Back-of-the-Envelope Capacity Estimations](#2-back-of-the-envelope-capacity-estimations)
3. [High-Level Architecture & API Design](#3-high-level-architecture--api-design)
4. [Database Schema & Data Model](#4-database-schema--data-model)
5. [Deep-Dive Component Design & Trade-Offs](#5-deep-dive-component-design--trade-offs)
6. [Failure Modes & High-Availability Mitigation](#6-failure-modes--high-availability-mitigation)
7. [Quick Architecture Cheat Sheet](#7-quick-architecture-cheat-sheet)

---

## 1. Requirements Clarification & Scope
### Functional Requirements
- Primary system capability 1...
- Primary system capability 2...

### Non-Functional Requirements
- High availability ($99.99\\%$ uptime).
- Low latency (sub-$50\\text{ ms}$).
- Scalable to millions of daily active users.

---

## 2. Back-of-the-Envelope Capacity Estimations
$$
\\Large
\\boxed{\\text{Write QPS} = \\frac{10\\text{ Million}}{86,400} \\approx 116\\text{ QPS}}
$$

---

## 3. High-Level Architecture & API Design
\`\`\`mermaid
flowchart TD
  Client([User Client]) --> LB[Load Balancer]
  LB --> API[API Gateway / Services]
  API --> Cache[(Redis Cache)]
  API --> DB[(Primary Database)]
\`\`\`

---

## 4. Database Schema & Data Model
| Column | Type | Description |
| :--- | :--- | :--- |
| \`id\` | UUID | Primary Key |
| \`created_at\` | TIMESTAMP | Creation timestamp |

---

## 5. Deep-Dive Component Design & Trade-Offs
> [!IMPORTANT]
> Trade-off analysis, consistency vs latency, and bottleneck mitigation.
`
    : isDsa
    ? `# ${topic.title}

> **Data Structures & Algorithms revision notes** for technical campus placements (TCS NQT Hands-on Coding / Digital / Prime, Infosys, Cognizant, Wipro, Accenture, LeetCode). Written in GitHub-compatible Markdown/LaTeX.

## Table of Contents
1. [Core Concepts & Mental Model](#1-core-concepts--mental-model)
2. [Time & Space Complexity Bounds](#2-time--space-complexity-bounds)
3. [Key Algorithmic Patterns & Templates](#3-key-algorithmic-patterns--templates)
4. [Standard Placement Practice Problems](#4-standard-placement-practice-problems)
5. [Common Edge Cases & Traps](#5-common-edge-cases--traps)

---

## 1. Core Concepts & Mental Model
- Theoretical foundation, underlying memory layout, and invariants for ${topic.title}.
- When to select this data structure or algorithm over alternatives.

---

## 2. Time & Space Complexity Bounds

| Operation / Scenario | Time Complexity | Auxiliary Space | Remarks |
| :--- | :--- | :--- | :--- |
| Best Case | $\\mathcal{O}(1)$ | $\\mathcal{O}(1)$ | Optimal input scenario |
| Average Case | $\\mathcal{O}(N)$ | $\\mathcal{O}(1)$ | Standard scenario |
| Worst Case | $\\mathcal{O}(N \\log N)$ | $\\mathcal{O}(N)$ | Pathological input |

---

## 3. Key Algorithmic Patterns & Templates

### Canonical Pattern: [Pattern Name]

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

// Standard template for ${topic.title}
void solve() {
    // Implementation
}
\`\`\`

---

## 4. Standard Placement Practice Problems

### Problem 1: [Descriptive Problem Name]

**Problem Statement:**
[Description of the problem]

**Optimal Approach & Logic:**
1. Step-by-step invariant logic...
2. State transitions and edge checks...

**Complexity:**
- **Time Complexity:** $\\mathcal{O}(N)$
- **Space Complexity:** $\\mathcal{O}(1)$

---

## 5. Common Edge Cases & Traps
> [!WARNING]
> Always check: Empty or null input, single element, negative numbers, overflow on large integers, and boundary conditions.
`
    : `# ${topic.title}

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, Infosys, Wipro, Accenture, and other campus aptitude rounds. Formulas and step-by-step models are written in GitHub-compatible Markdown/LaTeX.

## 1. Key Concepts and Definitions
- Core definitions, formulas, and theorems for ${topic.title}.

## 2. Master Formulas
$$
\\Large
\\boxed{\\text{Result} = \\text{Formula}}
$$

## 3. Worked Examples

### Example 1: Standard Placement Problem
**Problem Statement:**
Question statement goes here.

**Step 1: Set up the equation**
$$
\\Large
\\text{Step equation}
$$

**Final Answer:**
The final result is $\\Large \\boxed{\\mathbf{Answer}}$.
`;

  const copyBoilerplate = () => {
    navigator.clipboard.writeText(boilerplateMarkdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="empty-topic-container">
      {/* Header */}
      <div className="empty-topic-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
          <span className="topic-status-pill needed">
            Notes needed
          </span>
          {topic.tag && (
            <span className="topic-status-pill not-recent">
              {topic.tag}
            </span>
          )}
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {subject.section} Section &bull; {subject.title} &bull; {group.title}
          </span>
        </div>

        <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          {topic.title}
        </h2>
        <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)' }}>
          {topic.summary || 'Part of the official TCS NQT placement examination syllabus.'}
        </p>
      </div>

      {/* Main Empty State Banner */}
      <div className="empty-topic-banner">
        <div className="empty-topic-icon">
          <FileText size={32} strokeWidth={1.75} />
        </div>
        <h3 className="empty-topic-headline">
          Notes for this topic are ready to be contributed.
        </h3>
        <p className="empty-topic-subtext">
          Our modular architecture makes it seamless to add markdown notes. Add your formula cheat sheet, worked examples, and quick recall tricks to empower your revision.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
          <button
            type="button"
            className="add-notes-btn"
            onClick={onOpenAddNotesGuide}
          >
            <PlusCircle size={16} />
            <span>How to Add Notes Guide</span>
          </button>

          <button
            type="button"
            className={`copy-action-btn ${copied ? 'copied' : ''}`}
            onClick={copyBoilerplate}
            title="Copy boilerplate markdown"
            aria-label="Copy boilerplate markdown"
          >
            {copied ? (
              <>
                <Check size={16} strokeWidth={2.4} color="var(--primary-action)" />
                <span>Boilerplate Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} strokeWidth={2} />
                <span>Copy Markdown Boilerplate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Integration Instructions */}
      <div className="add-notes-guide-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Code2 size={20} color="var(--primary-action)" />
          <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>
            Quick Markdown Specification
          </h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1.15rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1. Recommended File
            </div>
            <code style={{ fontSize: '0.82rem', color: 'var(--primary-action)', fontFamily: 'var(--font-mono)' }}>
              {suggestedPath}
            </code>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.15rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {isDsa ? '2. Code & Complexity' : '2. Math Formulas'}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {isDsa ? (
                <>Format code blocks &amp; KaTeX <code>$\mathcal{'{O}'}(N)$</code></>
              ) : (
                <>Center with <code>$$ \Large \boxed{'{...}'} $$</code></>
              )}
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.15rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              3. App Integration
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Change status in <code>syllabusData.ts</code> to <code>'ready'</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
