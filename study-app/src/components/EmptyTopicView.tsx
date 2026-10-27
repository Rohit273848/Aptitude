import React, { useState } from 'react';
import { Topic, TopicGroup, SubjectArea } from '../types/syllabus';
import { FileText, PlusCircle, Copy, Check, ExternalLink } from 'lucide-react';

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
  const [scratchpadOpen, setScratchpadOpen] = useState(false);
  const [customMarkdown, setCustomMarkdown] = useState('');

  // Recommended file convention
  const suggestedFileName = `${topic.title.replace(/[^a-zA-Z0-9]+/g, '_')}.md`;
  const suggestedPath = `Aptitude/Numarical/${suggestedFileName}`;

  const boilerplateMarkdown = `# ${topic.title}

> **Aptitude revision notes** for TCS NQT and campus placement exams.

## 1. Key Concepts and Definitions
- Core definitions and rules for ${topic.title}.

## 2. Core Formulas
$$
\\boxed{\\text{Result} = \\text{Formula}}
$$

## 3. Worked Examples

### Example 1
**Question:** Problem statement goes here.

$$
\\text{Step 1: } \\dots
$$

**Final Answer:** \\boxed{\\dots}
`;

  const copyBoilerplate = () => {
    navigator.clipboard.writeText(boilerplateMarkdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="empty-topic-container">
      <div className="empty-topic-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <span className="topic-status-pill needed">
            Notes needed
          </span>
          {topic.tag && (
            <span className="topic-status-pill not-recent">
              {topic.tag}
            </span>
          )}
          <span style={{ fontSize: '0.8rem', color: 'var(--color-stack-gray)' }}>
            {subject.section} &bull; {subject.title} &bull; {group.title}
          </span>
        </div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>
          {topic.title}
        </h2>
      </div>

      <div className="empty-topic-banner">
        <div className="empty-topic-icon">
          <FileText size={48} strokeWidth={1.5} />
        </div>
        <h3 className="empty-topic-headline">
          Notes for this topic haven’t been added yet.
        </h3>
        <p className="empty-topic-subtext">
          This syllabus area is ready for study materials. You can contribute your notes in GitHub Markdown format to make this lesson instantly accessible.
        </p>

        <button
          type="button"
          className="add-notes-btn"
          onClick={onOpenAddNotesGuide}
        >
          <PlusCircle size={18} />
          <span>How to Add Notes for this Topic</span>
        </button>
      </div>

      <div className="add-notes-guide-box">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-action)' }}>
            Quick Setup: Adding Markdown Notes
          </h3>
          <button
            type="button"
            className="lesson-control-btn"
            onClick={copyBoilerplate}
            style={{ fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} color="var(--primary-action)" /> : <Copy size={14} />}
            <span>{copied ? 'Template Copied!' : 'Copy Template Markdown'}</span>
          </button>
        </div>

        <div className="guide-step-row">
          <div className="guide-step-number">1</div>
          <div className="guide-step-body">
            <h4>Create the Markdown File</h4>
            <p>Save your notes in the repository under a predictable filename, such as:</p>
            <div className="code-snippet-box">
              {suggestedPath}
            </div>
          </div>
        </div>

        <div className="guide-step-row">
          <div className="guide-step-number">2</div>
          <div className="guide-step-body">
            <h4>Map the File in <code>src/data/syllabusData.ts</code></h4>
            <p>Locate the topic ID <code>"{topic.id}"</code> and update its status:</p>
            <div className="code-snippet-box">
{`{
  id: "${topic.id}",
  title: "${topic.title}",
  status: "ready", // change from "needed" to "ready"
  noteFile: "${suggestedPath}"
}`}
            </div>
          </div>
        </div>

        <div className="guide-step-row" style={{ marginBottom: 0 }}>
          <div className="guide-step-number">3</div>
          <div className="guide-step-body">
            <h4>Instant Rendering</h4>
            <p>The app will immediately mark this topic as <strong>Notes available / Ready to study</strong> and render all LaTeX formulas, examples, and practice sections.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
