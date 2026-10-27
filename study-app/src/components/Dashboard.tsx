import React from 'react';
import { SubjectArea } from '../types/syllabus';
import { BookOpen, CheckCircle, ArrowRight, FilePlus, Sparkles, AlertCircle } from 'lucide-react';

interface DashboardProps {
  syllabus: SubjectArea[];
  onSelectTopic: (topicId: string) => void;
  onOpenAddNotesGuide: () => void;
  completedTopics: string[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  syllabus,
  onSelectTopic,
  onOpenAddNotesGuide,
  completedTopics
}) => {
  // Aggregate statistics
  let totalTopics = 0;
  let readyTopics = 0;

  syllabus.forEach(subject => {
    subject.groups.forEach(group => {
      totalTopics += group.topics.length;
      readyTopics += group.topics.filter(t => t.status === 'ready').length;
    });
  });

  const neededTopics = totalTopics - readyTopics;
  const completedCount = completedTopics.length;

  return (
    <div className="dashboard-container">
      {/* Hero Banner */}
      <div className="dashboard-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="subject-section-tag">TCS National Qualifier Test (NQT)</span>
          <span className="subject-difficulty-tag">Placement Syllabus 2026</span>
        </div>

        <h2>TCS NQT Aptitude Learning Platform</h2>
        <p style={{ maxWidth: '780px', fontSize: '1rem', color: 'var(--text-muted)' }}>
          A structured, modular revision environment organizing the official TCS NQT Foundation and Advance syllabus. Topics with verified notes are fully interactive with KaTeX mathematics, collapsible solutions, and active recall practice.
        </p>

        <div className="dashboard-stats-row">
          <div className="stat-metric-card">
            <div className="stat-metric-number">{totalTopics}</div>
            <div className="stat-metric-label">Syllabus Topics</div>
          </div>
          <div className="stat-metric-card">
            <div className="stat-metric-number" style={{ color: 'var(--primary-action)' }}>{readyTopics}</div>
            <div className="stat-metric-label">Ready to Study</div>
          </div>
          <div className="stat-metric-card">
            <div className="stat-metric-number" style={{ color: 'var(--color-stack-gray)' }}>{neededTopics}</div>
            <div className="stat-metric-label">Notes Needed</div>
          </div>
          <div className="stat-metric-card">
            <div className="stat-metric-number" style={{ color: 'var(--primary-action)' }}>{completedCount}</div>
            <div className="stat-metric-label">Topics Completed</div>
          </div>
        </div>
      </div>

      {/* Featured Ready-to-Study Lessons */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>
              Ready to Study Now
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Topics with verified notes, worked examples, and formula cheat sheets.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {/* Percentages Card */}
          <div
            className="subject-card"
            style={{ borderLeft: '4px solid var(--primary-action)', cursor: 'pointer' }}
            onClick={() => onSelectTopic('percentages')}
          >
            <div>
              <div className="subject-card-header">
                <span className="topic-status-pill ready">Notes Available</span>
                <span className="subject-difficulty-tag">Easy–Medium</span>
              </div>
              <h4 className="subject-card-title">Percentages Formula Cheat Sheet</h4>
              <p className="subject-card-desc">
                27 master formulas covering basic percentage triad, increase/decrease, successive change shortcuts, reciprocal ratio comparisons, and commercial math discounts. Includes fraction table and mental math tricks.
              </p>
            </div>
            <div className="subject-progress-footer">
              <span style={{ fontWeight: 600, color: 'var(--primary-action)' }}>
                27 Formulas &bull; 16 Examples
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-action)', fontWeight: 700 }}>
                Open Lesson <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* Speed, Time & Distance Card */}
          <div
            className="subject-card"
            style={{ borderLeft: '4px solid var(--primary-action)', cursor: 'pointer' }}
            onClick={() => onSelectTopic('speed-time-and-distance')}
          >
            <div>
              <div className="subject-card-header">
                <span className="topic-status-pill ready">Notes Available</span>
                <span className="subject-difficulty-tag">Easy–Medium</span>
              </div>
              <h4 className="subject-card-title">Speed, Time & Distance + Boats & Streams</h4>
              <p className="subject-card-desc">
                12 complete modules with trains crossing stationary and moving objects, relative motion framework, logical differential shortcut, ratio lateness methods, harmonic average speed, and a 10-question placement quiz simulator.
              </p>
            </div>
            <div className="subject-progress-footer">
              <span style={{ fontWeight: 600, color: 'var(--primary-action)' }}>
                16 Formulas &bull; 14 Solutions &bull; Quiz
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-action)', fontWeight: 700 }}>
                Open Lesson <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Six Subject Areas Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Syllabus Subject Overview
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Browse all six TCS NQT testing modules across Foundation and Advance sections.
        </p>

        <div className="subjects-grid">
          {syllabus.map(subject => {
            const subjectTopics = subject.groups.reduce((acc, g) => acc + g.topics.length, 0);
            const readyCount = subject.groups.reduce(
              (acc, g) => acc + g.topics.filter(t => t.status === 'ready').length,
              0
            );

            return (
              <div key={subject.id} className="subject-card">
                <div>
                  <div className="subject-card-header">
                    <span className="subject-section-tag">{subject.section}</span>
                    <span className="subject-difficulty-tag">{subject.difficulty}</span>
                  </div>
                  <h4 className="subject-card-title">{subject.title}</h4>
                  <p className="subject-card-desc">{subject.description}</p>
                </div>

                <div className="subject-progress-footer">
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {subject.groups.length === 0 ? (
                      <em>Awaiting syllabus breakdown</em>
                    ) : (
                      `${subjectTopics} Topics &bull; ${readyCount} Available`
                    )}
                  </span>
                  {readyCount > 0 ? (
                    <span className="topic-status-pill ready">Ready to study</span>
                  ) : (
                    <span className="topic-status-pill needed">Notes needed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adding Notes Callout Banner */}
      <div style={{ padding: '1.75rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Want to add notes for another topic?
          </h4>
          <p style={{ fontSize: '0.9rem', maxWidth: '620px' }}>
            This application is designed to ingest future Markdown notes cleanly. Learn how to map notes to any topic in the syllabus.
          </p>
        </div>

        <button
          type="button"
          className="add-notes-btn"
          onClick={onOpenAddNotesGuide}
        >
          <FilePlus size={16} />
          <span>View Add Notes Guide</span>
        </button>
      </div>
    </div>
  );
};
