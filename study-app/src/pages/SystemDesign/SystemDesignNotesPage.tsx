import React, { useState } from 'react';
import { getSystemDesignTopicById, SystemDesignTopicData } from '../../data/systemDesignRegistry';
import { MarkdownRenderer } from '../../components/dsa/MarkdownRenderer';
import { KaTeXMath } from '../../components/KaTeXMath';
import {
  Server,
  Layers,
  Database,
  Zap,
  Cpu,
  Activity,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Circle,
  FileText,
  Copy,
  Check,
  Sparkles,
  Clock,
  Compass,
  Scale,
  GitBranch
} from 'lucide-react';

interface SystemDesignNotesPageProps {
  topicId: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onGoHome?: () => void;
}

export const SystemDesignNotesPage: React.FC<SystemDesignNotesPageProps> = ({
  topicId,
  isCompleted,
  onToggleComplete,
  onGoHome
}) => {
  const topic = getSystemDesignTopicById(topicId);
  const [viewMode, setViewMode] = useState<'architecture' | 'markdown'>('markdown');
  const [copied, setCopied] = useState(false);

  // Dynamic capacity estimator state for interactive practice
  const [dauMillions, setDauMillions] = useState<number>(100);
  const [readWriteRatio, setReadWriteRatio] = useState<number>(100);
  const [avgPayloadBytes, setAvgPayloadBytes] = useState<number>(600);

  // Computed metrics
  const writeQps = Math.round((dauMillions * 1000000) / 86400);
  const readQps = writeQps * readWriteRatio;
  const peakReadQps = readQps * 2;
  const dailyStorageGb = ((dauMillions * 1000000 * avgPayloadBytes) / (1024 * 1024 * 1024)).toFixed(2);
  const fiveYearStorageTb = ((parseFloat(dailyStorageGb) * 365 * 5) / 1024).toFixed(2);
  const cacheMemoryGb = ((dauMillions * 1000000 * readWriteRatio * 0.2 * avgPayloadBytes) / (1024 * 1024 * 1024)).toFixed(2);

  if (!topic) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
        <Server size={42} color="var(--secondary-accent)" style={{ margin: '0 auto 1rem' }} />
        <h3>System Design Topic Not Found</h3>
        <p>No registry entry found for topic ID: <code>{topicId}</code>.</p>
        {onGoHome && (
          <button type="button" className="add-notes-btn" style={{ marginTop: '1rem' }} onClick={onGoHome}>
            Return to Dashboard
          </button>
        )}
      </div>
    );
  }

  const hasNotes = Boolean(topic.markdownContent);

  const fallbackMarkdown = `---
id: "${topic.id}"
title: "${topic.title}"
slug: "${topic.slug}"
category: "${topic.category}"
difficulty: "${topic.difficulty}"
estimatedTime: "${topic.estimatedTime}"
summary: "${topic.summary}"
---

# ${topic.title}

> **System Design Revision Notes** for technical architecture rounds (Google, Meta, Amazon, Microsoft, TCS Digital/Prime). Follows the standard 5-step interview blueprint: Requirements, Estimations, API Design, Data Modeling, High-Level Architecture, and Deep-Dive Scalability.

## 1. Requirements Clarification & System Scope
### Functional Requirements
- Core capability: High-throughput ingestion and retrieval with low latency.
- Data persistence with durability guarantees and zero message loss.

### Non-Functional Requirements
- **High Availability**: $99.99\\%$ uptime with active-active multi-region failover.
- **Latency**: Sub-$50\\text{ ms}$ response time for critical read paths.
- **Scalability**: Seamless horizontal scaling to absorb $10\\times$ peak bursts.

---

## 2. Back-of-the-Envelope Capacity Estimations
$$
\\Large
\\boxed{\\text{Write QPS} = \\frac{100\\text{ Million}}{86,400\\text{ s}} \\approx 1,160\\text{ QPS}}
$$

$$
\\Large
\\boxed{\\text{Read QPS} = 1,160 \\times 100 \\approx 116,000\\text{ QPS}}
$$

---

## 3. High-Level Architecture Flow
\`\`\`mermaid
flowchart TD
  Client([User Client]) --> DNS[Route 53 DNS]
  DNS --> CDN[Cloudflare CDN]
  CDN --> LB[Load Balancer]
  LB --> API[App Service Cluster]
  API <--> Cache[(Redis Cluster)]
  API --> DB[(Distributed Primary Database)]
\`\`\`

---

## 4. Key Trade-Off Matrix
| Approach | Pros | Cons | Decision |
| :--- | :--- | :--- | :--- |
| **SQL (RDBMS)** | ACID compliance, rich query joins | Hard to horizontally shard | Secondary / Ledger |
| **NoSQL (Key-Value)** | Sub-millisecond latency, easy horizontal scale | Eventual consistency, no joins | Primary Read/Write Tier |
`;

  const copyMarkdown = () => {
    navigator.clipboard.writeText(topic.markdownContent || fallbackMarkdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="lesson-page-container" style={{ maxWidth: '1120px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div className="lesson-page-header" style={{ marginBottom: '1.75rem' }}>
        <div className="lesson-meta-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                background: 'rgba(139, 92, 246, 0.14)',
                color: '#7c3aed'
              }}
            >
              <Server size={12} /> System Design (HLD) &bull; {topic.category}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} /> {topic.estimatedTime}
            </span>
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={onToggleComplete}
              style={{ width: '17px', height: '17px', accentColor: 'var(--primary-action)' }}
            />
            <span>{isCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
          </label>
        </div>

        <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.1rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
          {topic.title}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '850px' }}>
          {topic.summary}
        </p>
      </div>

      {/* High-Level Scale Metrics Bar (for case studies) */}
      {topic.scaleMetrics && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.85rem',
            marginBottom: '2rem'
          }}
        >
          {topic.scaleMetrics.dau && (
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Scale</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#7c3aed', marginTop: '0.25rem' }}>{topic.scaleMetrics.dau} DAU</div>
            </div>
          )}
          {topic.scaleMetrics.readWriteRatio && (
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Read/Write Ratio</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-action)', marginTop: '0.25rem' }}>{topic.scaleMetrics.readWriteRatio}</div>
            </div>
          )}
          {topic.scaleMetrics.writeQps && (
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Write QPS</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>{topic.scaleMetrics.writeQps}</div>
            </div>
          )}
          {topic.scaleMetrics.readQps && (
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Read QPS</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>{topic.scaleMetrics.readQps}</div>
            </div>
          )}
          {topic.scaleMetrics.fiveYearStorage && (
            <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>5-Year Storage</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary-accent)', marginTop: '0.25rem' }}>{topic.scaleMetrics.fiveYearStorage}</div>
            </div>
          )}
        </div>
      )}

      {/* View Mode Controls Bar */}
      <div
        className="lesson-controls-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem 1rem',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className={`lesson-control-btn ${viewMode === 'architecture' ? 'active' : ''}`}
            onClick={() => setViewMode('architecture')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          >
            <Layers size={14} />
            <span>Architecture Blueprint</span>
          </button>
          <button
            type="button"
            className={`lesson-control-btn ${viewMode === 'markdown' ? 'active' : ''}`}
            onClick={() => setViewMode('markdown')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          >
            <FileText size={14} />
            <span>Full Markdown Notes {hasNotes ? '✓' : '(Template)'}</span>
          </button>
        </div>

        <button
          type="button"
          className="lesson-control-btn"
          onClick={copyMarkdown}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}
          title="Copy markdown content to clipboard"
        >
          {copied ? <Check size={14} color="var(--primary-action)" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
        </button>
      </div>

      {/* Main View Mode Body */}
      {viewMode === 'architecture' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Key Syllabus Coverage Checklist */}
          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} color="#7c3aed" /> Core Concepts & Architecture Modules
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {topic.topicsCovered.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                    fontWeight: 500
                  }}
                >
                  <span style={{ color: '#7c3aed', fontWeight: 700, minWidth: '18px' }}>{idx + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Back-of-the-Envelope Capacity Estimator */}
          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={18} color="var(--primary-action)" /> Interactive Back-of-the-Envelope Capacity Estimator
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Adjust live parameters to test throughput, storage, and Redis caching demands.
                </p>
              </div>
            </div>

            {/* Slider Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Daily Active Users (DAU): <strong style={{ color: 'var(--text-main)' }}>{dauMillions}M</strong>
                </label>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={dauMillions}
                  onChange={e => setDauMillions(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#7c3aed' }}
                />
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Read-to-Write Ratio: <strong style={{ color: 'var(--text-main)' }}>{readWriteRatio} : 1</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  step="1"
                  value={readWriteRatio}
                  onChange={e => setReadWriteRatio(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-action)' }}
                />
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Avg Payload Size: <strong style={{ color: 'var(--text-main)' }}>{avgPayloadBytes} Bytes</strong>
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={avgPayloadBytes}
                  onChange={e => setAvgPayloadBytes(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--secondary-accent)' }}
                />
              </div>
            </div>

            {/* Live Computed Output Formula Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.85rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', borderLeft: '4px solid #7c3aed' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>WRITE QPS</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  {writeQps.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>QPS</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{dauMillions}M / 86,400s</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary-action)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>READ QPS (AVG / PEAK)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-action)', marginTop: '0.2rem' }}>
                  {readQps.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>QPS</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Peak (~2x): {peakReadQps.toLocaleString()} QPS</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--secondary-accent)' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>5-YEAR STORAGE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary-accent)', marginTop: '0.2rem' }}>
                  {fiveYearStorageTb} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>TB</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{dailyStorageGb} GB / day</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', borderLeft: '4px solid #0284c7' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>REDIS CACHE (80/20 RULE)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7', marginTop: '0.2rem' }}>
                  {cacheMemoryGb} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>GB</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>20% read volume RAM buffer</div>
              </div>
            </div>
          </div>

          {/* Standard 5-Step System Design Interview Framework Card */}
          <div style={{ background: 'var(--bg-surface)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Scale size={18} color="#7c3aed" /> The 5-Step System Design Interview Blueprint
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Step 1 (3–5 Mins)</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>Scope & Requirements</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  Clarify Functional (APIs, actions) vs Non-Functional requirements (Availability, Latency, Consistency). Define explicit boundaries.
                </p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Step 2 (5 Mins)</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>Capacity Estimations</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  Derive Write QPS, Read QPS, peak multipliers, daily & 5-year storage, network bandwidth, and Redis memory using the 80/20 rule.
                </p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Step 3 (10–12 Mins)</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>High-Level Architecture</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  Sketch client flow: DNS &rarr; CDN &rarr; Load Balancer &rarr; API Gateway &rarr; Stateless Services &rarr; Cache &rarr; Database.
                </p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Step 4 (15 Mins)</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>Deep-Dive Component Design</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  Zero in on the core challenge: Base62 vs hashing, token bucket atomicity, WebSocket state pools, spatial indexing, or idempotency.
                </p>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>Step 5 (5 Mins)</div>
                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>Bottlenecks & Scale</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  Address Single Points of Failure (SPOF), DB replication lag, cache stampede / thundering herd, partition rebalancing, and telemetry.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
          <MarkdownRenderer content={topic.markdownContent || fallbackMarkdown} />
        </div>
      )}
    </div>
  );
};

