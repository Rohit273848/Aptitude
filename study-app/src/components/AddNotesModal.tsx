import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Sparkles, CheckCircle2 } from 'lucide-react';

interface AddNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNotesModal: React.FC<AddNotesModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'steps' | 'template'>('steps');

  if (!isOpen) return null;

  const sampleTemplate = `# [Topic Name]

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, Infosys, Wipro, Accenture, and other campus aptitude rounds. Formulas and step-by-step models are written in GitHub-compatible Markdown/LaTeX.

## 1. Key Concepts and Definitions
- Core definitions, rules, and theorems.

## 2. Core Formulas
$$
\\Large
\\boxed{\\text{Result} = \\text{Formula}}
$$

## 3. Worked Examples

### Example 1: Standard Question
**Problem Statement:**
Question statement goes here.

**Step 1: Formula Setup**
$$
\\Large
\\text{Step equation}
$$

**Final Answer:**
The answer is $\\Large \\boxed{\\mathbf{Result}}$.
`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(sampleTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-container"
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: 'var(--primary-action-light)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: 'var(--primary-action)' }}>
              <FileCode size={22} />
            </div>
            <div>
              <h3 id="modal-title" style={{ fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: 700 }}>
                How to Add Study Notes
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Modular architecture for ingesting future syllabus topics
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="sidebar-collapse-toggle-btn"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          <button
            type="button"
            className={`lesson-control-btn ${activeTab === 'steps' ? 'active' : ''}`}
            onClick={() => setActiveTab('steps')}
          >
            <span>📋 Step-by-Step Blueprint</span>
          </button>
          <button
            type="button"
            className={`lesson-control-btn ${activeTab === 'template' ? 'active' : ''}`}
            onClick={() => setActiveTab('template')}
          >
            <span>📝 Markdown Template</span>
          </button>
        </div>

        {activeTab === 'steps' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.15rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-action)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>Create Markdown File</strong>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginLeft: '1.9rem' }}>
                Save your notes in <code>Aptitude/Numarical/[TopicName].md</code> following standard GitHub-compatible markdown and LaTeX math syntax.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.15rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-action)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>Create TypeScript Data Model</strong>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginLeft: '1.9rem' }}>
                Create <code>study-app/src/data/[topic]Content.ts</code> with formula sheets, modules, and quiz questions.
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.15rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-action)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>Connect View & Syllabus Registry</strong>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginLeft: '1.9rem' }}>
                Update status to <code>'ready'</code> in <code>syllabusData.ts</code>, create view in <code>src/components/</code>, and connect route in <code>App.tsx</code>.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Template ready to copy</span>
              <button
                type="button"
                className={`copy-formula-pill-btn ${copied ? 'copied' : ''}`}
                onClick={copyTemplate}
                title="Copy markdown template"
                aria-label="Copy markdown template"
              >
                {copied ? (
                  <>
                    <Check size={13} strokeWidth={2.4} />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} strokeWidth={2} />
                    <span>Copy Template</span>
                  </>
                )}
              </button>
            </div>
            <pre
              style={{
                background: 'var(--bg-muted)',
                padding: '1.15rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-body)',
                overflowX: 'auto',
                maxHeight: '320px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {sampleTemplate}
            </pre>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="add-notes-btn"
            onClick={onClose}
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
