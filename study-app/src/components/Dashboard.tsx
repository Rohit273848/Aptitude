import React, { useMemo } from 'react';
import { SubjectArea } from '../types/syllabus';
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  FilePlus,
  Sparkles,
  Zap,
  Target,
  Clock,
  Award,
  Layers,
  HelpCircle,
  TrendingUp,
  Calculator,
  Brain,
  Code
} from 'lucide-react';

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
  // Aggregate statistics across syllabus
  const stats = useMemo(() => {
    let totalTopics = 0;
    let readyTopics = 0;
    const readyList: { id: string; title: string; summary?: string }[] = [];

    syllabus.forEach(subject => {
      subject.groups.forEach(group => {
        totalTopics += group.topics.length;
        group.topics.forEach(t => {
          if (t.status === 'ready') {
            readyTopics++;
            readyList.push({ id: t.id, title: t.title, summary: t.summary });
          }
        });
      });
    });

    const neededTopics = totalTopics - readyTopics;
    const completedCount = completedTopics.length;
    const completionPct = readyTopics > 0 ? Math.round((completedCount / readyTopics) * 100) : 0;

    return {
      totalTopics,
      readyTopics,
      neededTopics,
      completedCount,
      completionPct,
      readyList
    };
  }, [syllabus, completedTopics]);

  // Featured lessons data mapping
  const featuredLessons = [
    {
      id: 'percentages',
      title: 'Percentages Formula Cheat Sheet',
      difficulty: 'Easy–Medium',
      section: 'Foundation',
      desc: '27 master formulas covering basic percentage triad, increase/decrease, successive change shortcuts, reciprocal ratio comparisons, and commercial math discounts.',
      stats: '27 Formulas • 16 Examples'
    },
    {
      id: 'speed-time-and-distance',
      title: 'Speed, Time & Distance + Boats & Streams',
      difficulty: 'Easy–Medium',
      section: 'Foundation',
      desc: '12 complete modules with trains crossing stationary & moving objects, relative motion framework, logical differential shortcut, ratio lateness methods, and placement quiz.',
      stats: '16 Formulas • 14 Solutions • Quiz'
    },
    {
      id: 'profit-and-loss',
      title: 'Profit, Loss & Discount + Retail Schemes',
      difficulty: 'Easy–Medium',
      section: 'Foundation',
      desc: '7 complete modules covering the Golden Ratio MP/CP equation, column cross-simplification for successive discounts, Buy X Get Y Free schemes, and price-quantity inversion.',
      stats: '13 Formulas • 13 Solutions • Quiz'
    },
    {
      id: 'work-and-time',
      title: 'Work & Time + Pipes & Cisterns',
      difficulty: 'Medium',
      section: 'Foundation',
      desc: 'Efficiency model, 3-step LCM workflow, fractional work, continuous worker deduction, and inlet-outlet cistern mechanics.',
      stats: '16 Formulas • 12 Solutions'
    },
    {
      id: 'ratios-proportion',
      title: 'Ratios, Proportion & Mixtures',
      difficulty: 'Easy–Medium',
      section: 'Foundation',
      desc: 'Ratio combination grid, unit scalers, mean/third/fourth proportions, coin problems, partnership profit splits, and dilution formulas.',
      stats: '16 Formulas • 12 Solutions'
    }
  ];

  // Pick first uncompleted ready topic to resume
  const nextUpTopic = useMemo(() => {
    const uncompleted = stats.readyList.find(t => !completedTopics.includes(t.id));
    return uncompleted || stats.readyList[0];
  }, [stats.readyList, completedTopics]);

  return (
    <div className="dashboard-container">
      {/* Section 1: Welcome Header Banner */}
      <div className="dashboard-welcome-header">
        <div className="welcome-header-content">
          <div className="welcome-badge-row">
            <span className="subject-section-tag">TCS National Qualifier Test (NQT)</span>
            <span className="subject-difficulty-tag">Placement Cycle 2027</span>
          </div>
          <h2 className="welcome-headline">Welcome back, Scholar 👋</h2>
          <p className="welcome-subtext">
            Your centralized, interactive study environment for quantitative aptitude, logical reasoning, and placement tests. Verified notes feature KaTeX mathematics, interactive tools, and quiz simulation.
          </p>
        </div>

        <div className="welcome-quick-actions">
          {nextUpTopic && (
            <button
              type="button"
              className="dark-hero-action-btn"
              onClick={() => onSelectTopic(nextUpTopic.id)}
            >
              <Zap size={16} />
              <span>Resume Study</span>
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Dashboard Grid: Main Content + Right Priorities Rail (Inspired by Nextstep) */}
      <div className="dashboard-layout-grid">
        {/* Main Left/Center Column */}
        <div className="dashboard-main-col">
          {/* Section 2: Metric Stat Cards */}
          <div className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">Syllabus Topics</span>
                <div className="stat-icon-wrap slate">
                  <Layers size={18} />
                </div>
              </div>
              <div className="stat-card-number">{stats.totalTopics}</div>
              <div className="stat-card-footer">
                <span>Across 6 subjects</span>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">Ready to Study</span>
                <div className="stat-icon-wrap emerald">
                  <CheckCircle size={18} />
                </div>
              </div>
              <div className="stat-card-number" style={{ color: 'var(--primary-action)' }}>
                {stats.readyTopics}
              </div>
              <div className="stat-card-footer">
                <span>Verified notes live</span>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">Completed</span>
                <div className="stat-icon-wrap emerald">
                  <Award size={18} />
                </div>
              </div>
              <div className="stat-card-number" style={{ color: 'var(--primary-action)' }}>
                {stats.completedCount}
              </div>
              <div className="stat-card-footer">
                <span>{stats.completionPct}% of ready topics</span>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-card-header">
                <span className="stat-card-label">Notes Needed</span>
                <div className="stat-icon-wrap orange">
                  <Clock size={18} />
                </div>
              </div>
              <div className="stat-card-number" style={{ color: 'var(--secondary-accent)' }}>
                {stats.neededTopics}
              </div>
              <div className="stat-card-footer">
                <span>Ready for contribution</span>
              </div>
            </div>
          </div>

          {/* Section 3: Nextstep-Inspired Dark Hero Roadmap Card */}
          <div className="dashboard-dark-hero">
            <div className="dark-hero-glow" aria-hidden="true" />
            <div className="dark-hero-header">
              <div className="dark-hero-title-group">
                <h3>Placement Learning Roadmap</h3>
                <p>Track your modular preparation milestone by milestone</p>
              </div>

              {nextUpTopic && (
                <button
                  type="button"
                  className="dark-hero-action-btn"
                  onClick={() => onSelectTopic(nextUpTopic.id)}
                >
                  <span>Continue: {nextUpTopic.title}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>

            {/* Stylized Visual Pipeline */}
            <div className="pipeline-stages-container">
              <div className="pipeline-stage-item">
                <span className="pipeline-stage-label">Foundation Active</span>
                <span className="pipeline-stage-count">03 Subjects</span>
                <div className="pipeline-stage-bar">
                  <div className="pipeline-stage-fill emerald" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="pipeline-stage-item">
                <span className="pipeline-stage-label">Verified Lessons</span>
                <span className="pipeline-stage-count">{stats.readyTopics} Ready</span>
                <div className="pipeline-stage-bar">
                  <div className="pipeline-stage-fill emerald" style={{ width: `${Math.min(100, (stats.readyTopics / 10) * 100)}%` }} />
                </div>
              </div>

              <div className="pipeline-stage-item">
                <span className="pipeline-stage-label">Topics Mastered</span>
                <span className="pipeline-stage-count">{stats.completedCount} Done</span>
                <div className="pipeline-stage-bar">
                  <div className="pipeline-stage-fill orange" style={{ width: `${stats.completionPct}%` }} />
                </div>
              </div>

              <div className="pipeline-stage-item">
                <span className="pipeline-stage-label">Advance Modules</span>
                <span className="pipeline-stage-count">03 Modules</span>
                <div className="pipeline-stage-bar">
                  <div className="pipeline-stage-fill gray" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Featured Ready-to-Study Lessons */}
          <div>
            <div className="dashboard-section-header">
              <div>
                <h3 className="dashboard-section-title">Ready to Study Now</h3>
                <p className="dashboard-section-desc">
                  Curated lessons with verified notes, worked derivations, formulas, and placement quizzes.
                </p>
              </div>
            </div>

            <div className="featured-lessons-grid">
              {featuredLessons.map(lesson => (
                <div
                  key={lesson.id}
                  className="featured-lesson-card"
                  onClick={() => onSelectTopic(lesson.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter') onSelectTopic(lesson.id);
                  }}
                >
                  <div>
                    <div className="subject-card-header">
                      <span className="topic-status-pill ready">Notes Available</span>
                      <span className="subject-difficulty-tag">{lesson.difficulty}</span>
                    </div>
                    <h4 className="subject-card-title">{lesson.title}</h4>
                    <p className="subject-card-desc">{lesson.desc}</p>
                  </div>

                  <div className="subject-progress-footer">
                    <span style={{ fontWeight: 600, color: 'var(--primary-action)' }}>
                      {lesson.stats}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-action)', fontWeight: 700 }}>
                      Open Lesson <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Explore Subjects Grid */}
          <div>
            <div className="dashboard-section-header">
              <div>
                <h3 className="dashboard-section-title">Syllabus Subject Overview</h3>
                <p className="dashboard-section-desc">
                  Browse all six TCS NQT testing modules across Foundation and Advance sections.
                </p>
              </div>
            </div>

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
                          `${subjectTopics} Topics • ${readyCount} Available`
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
        </div>

        {/* Right Side Priorities Column (Inspired by Nextstep Priorities Rail) */}
        <aside className="dashboard-side-rail" aria-label="Study priorities and quick tools">
          {/* Next Priorities Stack */}
          <div className="side-rail-card">
            <div className="side-rail-header">
              <span className="side-rail-title">Next Priorities</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-action)' }}>HIGH YIELD</span>
            </div>

            <div
              className="priority-item-card"
              onClick={() => onSelectTopic('percentages')}
            >
              <div className="priority-item-tag">
                <Target size={12} />
                <span>Foundational Rule</span>
              </div>
              <div className="priority-item-title">Master Percentage Reciprocals</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Memorize 1/7, 1/13, 1/17 and 1/19 fractions for 3x faster mental calculations.
              </p>
              <span className="priority-item-action">
                Review Table <ArrowRight size={12} />
              </span>
            </div>

            <div
              className="priority-item-card"
              onClick={() => onSelectTopic('speed-time-and-distance')}
            >
              <div className="priority-item-tag">
                <Zap size={12} />
                <span>Frequently Tested</span>
              </div>
              <div className="priority-item-title">Relative Speed Traps in Trains</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Practice crossing platform vs man on train length additions.
              </p>
              <span className="priority-item-action">
                Open TSD Lesson <ArrowRight size={12} />
              </span>
            </div>

            <div
              className="priority-item-card"
              onClick={() => onSelectTopic('profit-and-loss')}
            >
              <div className="priority-item-tag">
                <Sparkles size={12} />
                <span>Shortcut Formula</span>
              </div>
              <div className="priority-item-title">Golden Ratio MP/CP Equation</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Solve complex mark-up and discount questions in under 45 seconds.
              </p>
              <span className="priority-item-action">
                View Golden Ratio <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Exam Strategy Heuristic Card */}
          <div className="side-rail-dark-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Sparkles size={18} color="var(--secondary-accent)" />
              <span className="dark-card-title">Placement Heuristic</span>
            </div>
            <p className="dark-card-desc">
              TCS NQT Foundation questions carry uniform sectional weighting. Focus first on Arithmetic (Percentages, TSD, Profit & Loss) to secure cutoff threshold in the first 25 minutes.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
