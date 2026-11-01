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
  const suggestedFileName = `${topic.title.replace(/[^a-zA-Z0-9]+/g, '_')}.md`;
  const suggestedPath = `Aptitude/Numarical/${suggestedFileName}`;

  const boilerplateMarkdown = `# ${topic.title}

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
\\text{Math expression}
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
              2. Math Formulas
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Center with <code>$$ \Large \boxed{'{...}'} $$</code>
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
