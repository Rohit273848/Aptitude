import React, { useState } from 'react';
import { X, Copy, Check, FileCode, BookOpen } from 'lucide-react';

interface AddNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNotesModal: React.FC<AddNotesModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleTemplate = `# [Topic Name] Formula Cheat Sheet

For TCS NQT and campus aptitude exams, these formulas and shortcuts cover common problem types.

## Notation
Define standard variables here (e.g. $P$, $S$, $D$, $T$).

## 1. Core Formulas
$$
\\boxed{\\text{Formula} = \\text{Value}}
$$

## 2. Worked Examples
### Example 1
**Question:** Problem statement goes here.

$$
\\text{Step 1: } \\dots
$$

**Final Answer:** \\boxed{42}
`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(sampleTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-elevated)',
          padding: '2rem'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}>
              <FileCode size={22} color="var(--primary-action)" />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>
              How to Add Future Topic Notes
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-stack-gray)' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.92rem', marginBottom: '1.25rem' }}>
          This application uses a modular, predictable metadata architecture designed to grow with your study needs. You can add new notes anytime without rebuilding navigation components.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-action)', marginBottom: '0.25rem' }}>
              📁 Step 1: Save Markdown in <code>Aptitude/Numarical/</code> or <code>Aptitude/Reasoning/</code>
            </h4>
            <p style={{ fontSize: '0.85rem' }}>
              Create standard Markdown files with KaTeX math enclosed in <code>$$ ... $$</code> for display formulas and <code>$ ... $</code> for inline variables.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-action)', marginBottom: '0.25rem' }}>
              🔗 Step 2: Update <code>src/data/syllabusData.ts</code>
            </h4>
            <p style={{ fontSize: '0.85rem' }}>
              Find the corresponding topic in <code>syllabusData</code>. Change its <code>status</code> from <code>"needed"</code> to <code>"ready"</code> and link the <code>noteFile</code> path.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-action)', marginBottom: '0.25rem' }}>
              ⚡ Step 3: Instant Interactive Study Page
            </h4>
            <p style={{ fontSize: '0.85rem' }}>
              The topic immediately switches to "Ready to study" in the navigation and presents collapsible worked examples, formula reference cards, and practice questions.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Sample Markdown Template
          </span>
          <button
            type="button"
            className="lesson-control-btn"
            onClick={copyTemplate}
            style={{ fontSize: '0.78rem' }}
          >
            {copied ? <Check size={14} color="var(--primary-action)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Template'}</span>
          </button>
        </div>

        <pre
          style={{
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
            overflowX: 'auto',
            maxHeight: '180px'
          }}
        >
          {sampleTemplate}
        </pre>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button
            type="button"
            className="add-notes-btn"
            onClick={onClose}
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
