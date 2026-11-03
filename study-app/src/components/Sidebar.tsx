import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SubjectArea, Topic, TopicGroup } from '../types/syllabus';
import {
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Calculator,
  Brain,
  BookOpen,
  TrendingUp,
  Sparkles,
  Code,
  CheckCircle2,
  Circle,
  Layers,
  AlertCircle,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  syllabus: SubjectArea[];
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string) => void;
  completedTopics: string[];
  onToggleCompleteTopic: (topicId: string, e: React.MouseEvent) => void;
  onGoHome: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenAddNotesGuide?: () => void;
}

// Icon helper per subject ID
const getSubjectIcon = (subjectId: string, size = 17) => {
  switch (subjectId) {
    case 'foundation-numerical-ability':
      return <Calculator size={size} aria-hidden="true" />;
    case 'foundation-reasoning-ability':
      return <Brain size={size} aria-hidden="true" />;
    case 'foundation-verbal-ability':
      return <BookOpen size={size} aria-hidden="true" />;
    case 'advance-quantitative-ability':
      return <TrendingUp size={size} aria-hidden="true" />;
    case 'advance-reasoning-ability':
      return <Sparkles size={size} aria-hidden="true" />;
    case 'advance-coding-ability':
    case 'dsa-data-structures-algorithms':
      return <Code size={size} aria-hidden="true" />;
    default:
      return <BookOpen size={size} aria-hidden="true" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  syllabus,
  selectedTopicId,
  onSelectTopic,
  completedTopics,
  onToggleCompleteTopic,
  onGoHome,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Expanded subject groups state (Foundation Numerical Ability open by default)
  const [expandedSubjects, setExpandedSubjects] = useState<{ [key: string]: boolean }>({
    'foundation-numerical-ability': true,
    'foundation-reasoning-ability': false,
    'foundation-verbal-ability': false,
    'advance-quantitative-ability': false,
    'advance-reasoning-ability': false,
    'dsa-data-structures-algorithms': true
  });

  // When a topic is selected, automatically expand its parent subject
  useEffect(() => {
    if (!selectedTopicId) return;

    for (const subject of syllabus) {
      for (const group of subject.groups) {
        if (group.topics.some(t => t.id === selectedTopicId)) {
          setExpandedSubjects(prev => ({
            ...prev,
            [subject.id]: true
          }));
          return;
        }
      }
    }
  }, [selectedTopicId, syllabus]);

  // Handle escape key to close mobile drawer or clear search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobileOpen) {
          onCloseMobile();
        } else if (searchFilter) {
          setSearchFilter('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, onCloseMobile, searchFilter]);

  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  // Filter syllabus based on search term
  const { filteredSyllabus, totalMatches, isSearching } = useMemo(() => {
    const trimmed = searchFilter.trim().toLowerCase();
    if (!trimmed) {
      return {
        filteredSyllabus: syllabus,
        totalMatches: 0,
        isSearching: false
      };
    }

    let matchCount = 0;
    const filtered: SubjectArea[] = syllabus.map(subject => {
      const subjectMatches = subject.title.toLowerCase().includes(trimmed);

      const filteredGroups = subject.groups.map(group => {
        const groupMatches = group.title.toLowerCase().includes(trimmed);
        const matchingTopics = group.topics.filter(topic => {
          const titleMatches = topic.title.toLowerCase().includes(trimmed);
          const summaryMatches = topic.summary?.toLowerCase().includes(trimmed) || false;
          return titleMatches || summaryMatches || groupMatches || subjectMatches;
        });

        matchCount += matchingTopics.length;
        return {
          ...group,
          topics: matchingTopics
        };
      }).filter(group => group.topics.length > 0 || (subjectMatches && group.topics.length > 0));

      return {
        ...subject,
        groups: filteredGroups
      };
    }).filter(subject => subject.groups.length > 0 || subject.title.toLowerCase().includes(trimmed));

    return {
      filteredSyllabus: filtered,
      totalMatches: matchCount,
      isSearching: true
    };
  }, [syllabus, searchFilter]);

  const foundationSubjects = filteredSyllabus.filter(s => s.section === 'Foundation');
  const advanceSubjects = filteredSyllabus.filter(s => s.section === 'Advance');
  const dsaSubjects = filteredSyllabus.filter(s => s.section === 'DSA');

  const handleSelectTopicWrapper = (topicId: string) => {
    onSelectTopic(topicId);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const handleGoHomeWrapper = () => {
    onGoHome();
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const handleRailSubjectClick = (subjectId: string) => {
    onToggleCollapse();
    setExpandedSubjects(prev => ({ ...prev, [subjectId]: true }));
  };

  // Render a topic item
  const renderTopicItem = (topic: Topic) => {
    const isSelected = selectedTopicId === topic.id;
    const isDone = completedTopics.includes(topic.id);
    const isReady = topic.status === 'ready';

    return (
      <li key={topic.id} className="sidebar-topic-row">
        <div
          className={`sidebar-topic-item ${isSelected ? 'active' : ''}`}
          onClick={() => handleSelectTopicWrapper(topic.id)}
          role="button"
          tabIndex={0}
          aria-current={isSelected ? 'page' : undefined}
          aria-label={`${topic.title}. Status: ${isReady ? 'Ready to study' : 'Notes needed'}. ${isDone ? 'Completed' : 'Not completed'}.`}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSelectTopicWrapper(topic.id);
            }
          }}
        >
          <span className="sidebar-topic-name" title={topic.title}>
            {topic.title}
          </span>

          <div className="sidebar-topic-meta">
            {isReady ? (
              <span className="topic-status-pill ready" title="Verified notes available">
                Ready
              </span>
            ) : (
              <span className="topic-status-pill needed" title="Notes needed">
                Needed
              </span>
            )}

            <button
              type="button"
              className={`sidebar-complete-btn ${isDone ? 'checked' : ''}`}
              onClick={e => onToggleCompleteTopic(topic.id, e)}
              title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
              aria-label={isDone ? `Mark ${topic.title} as incomplete` : `Mark ${topic.title} as completed`}
            >
              {isDone ? (
                <CheckCircle2 size={15} color="var(--primary-action)" />
              ) : (
                <Circle size={15} color="var(--border-control)" />
              )}
            </button>
          </div>
        </div>
      </li>
    );
  };

  // Render a topic group
  const renderGroup = (group: TopicGroup) => {
    return (
      <div key={group.id} className="sidebar-group-wrap" style={{ marginBottom: '0.4rem' }}>
        {group.title !== 'General Overview' && (
          <div className="sidebar-group-title">
            {group.title}
          </div>
        )}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {group.topics.map(topic => renderTopicItem(topic))}
        </ul>
      </div>
    );
  };

  // Render a subject accordion item
  const renderSubject = (subject: SubjectArea) => {
    const isExpanded = expandedSubjects[subject.id] || isSearching;
    const readyCount = subject.groups.reduce(
      (acc, g) => acc + g.topics.filter(t => t.status === 'ready').length,
      0
    );

    return (
      <div key={subject.id} className="sidebar-subject-group">
        <button
          type="button"
          className={`sidebar-subject-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={() => toggleSubject(subject.id)}
          aria-expanded={isExpanded}
        >
          <div className="sidebar-subject-icon-wrap">
            {getSubjectIcon(subject.id, 16)}
            <span className="sidebar-subject-title">{subject.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            {readyCount > 0 && (
              <span className="sidebar-subject-ready-badge" title={`${readyCount} ready topics`}>
                {readyCount} Ready
              </span>
            )}
            {isExpanded ? (
              <ChevronDown size={14} color="var(--text-muted)" />
            ) : (
              <ChevronRight size={14} color="var(--text-muted)" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="sidebar-subject-content">
            {subject.groups.length === 0 ? (
              <div style={{ padding: '0.5rem 0.75rem 0.5rem 1.85rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <em>No topics listed yet</em>
              </div>
            ) : (
              subject.groups.map(group => renderGroup(group))
            )}
          </div>
        )}
      </div>
    );
  };

  // Render Collapsed Rail Mode (Inspired by Nextstep Icon Rail)
  if (isCollapsed) {
    return (
      <aside className="app-sidebar collapsed desktop-only" aria-label="Collapsed Syllabus Navigation Rail">
        <div className="sidebar-rail-header">
          <button
            type="button"
            className="sidebar-rail-expand-btn"
            onClick={onToggleCollapse}
            title="Expand sidebar (Ctrl+\)"
            aria-label="Expand sidebar navigation"
          >
            <PanelLeftOpen size={16} />
          </button>
        </div>

        <div className="sidebar-rail-scroll">
          <button
            type="button"
            className={`sidebar-rail-btn ${!selectedTopicId ? 'active' : ''}`}
            onClick={handleGoHomeWrapper}
            title="Syllabus Dashboard Overview"
            aria-label="Syllabus Dashboard Overview"
          >
            <Layers size={18} />
          </button>

          <div style={{ width: '28px', height: '1px', background: 'var(--border-subtle)', margin: '0.35rem 0' }} />

          {syllabus.map(subject => {
            const hasReady = subject.groups.some(g => g.topics.some(t => t.status === 'ready'));
            return (
              <button
                key={subject.id}
                type="button"
                className="sidebar-rail-btn"
                onClick={() => handleRailSubjectClick(subject.id)}
                title={`${subject.title} (${subject.section})`}
                aria-label={`Open ${subject.title}`}
              >
                {getSubjectIcon(subject.id, 18)}
                {hasReady && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--primary-action)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop mobile-only"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Floating Rounded Sidebar Panel */}
      <aside
        className={`app-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Syllabus Navigation Tree"
      >
        {/* Top Header Row */}
        <div className="sidebar-header">
          <div className="sidebar-title-badge">
            <GraduationCap size={18} color="var(--primary-action)" />
            <span>Syllabus Index</span>
          </div>

          <button
            type="button"
            className="sidebar-collapse-toggle-btn desktop-only"
            onClick={onToggleCollapse}
            title="Collapse sidebar (Ctrl+\)"
            aria-label="Collapse sidebar navigation"
          >
            <PanelLeftClose size={15} />
          </button>

          <button
            type="button"
            className="sidebar-collapse-toggle-btn mobile-only"
            onClick={onCloseMobile}
            title="Close navigation drawer"
            aria-label="Close navigation drawer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Quick Search Filter Box */}
        <div className="sidebar-search-box">
          <Search size={14} className="sidebar-search-icon" aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="search"
            className="sidebar-search-input"
            placeholder="Filter topics..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            aria-label="Filter syllabus topics"
          />
          {searchFilter && (
            <button
              type="button"
              className="sidebar-search-clear"
              onClick={() => setSearchFilter('')}
              aria-label="Clear filter"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {isSearching && (
          <div className="sidebar-search-meta" aria-live="polite">
            <span>Found {totalMatches} {totalMatches === 1 ? 'topic' : 'topics'}</span>
            <button
              type="button"
              className="sidebar-search-reset-link"
              onClick={() => setSearchFilter('')}
            >
              Clear
            </button>
          </div>
        )}

        {/* Dashboard Link Row */}
        <div className="sidebar-home-link-row">
          <button
            type="button"
            className={`sidebar-dashboard-nav-btn ${!selectedTopicId ? 'active' : ''}`}
            onClick={handleGoHomeWrapper}
          >
            <Layers size={16} />
            <span>Syllabus Overview</span>
          </button>
        </div>

        {/* Independently Scrollable Navigation Area */}
        <div className="sidebar-scroll-area">
          {isSearching && totalMatches === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              <AlertCircle size={28} style={{ margin: '0 auto 0.5rem', color: 'var(--secondary-accent)' }} />
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>No topics found</div>
              <div style={{ fontSize: '0.78rem', marginTop: '0.25rem' }}>No matches for "{searchFilter}"</div>
              <button
                type="button"
                className="add-notes-btn"
                style={{ marginTop: '0.85rem', fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
                onClick={() => setSearchFilter('')}
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              {/* Foundation Section Heading (Clean visual divider without awkward collapsing) */}
              <div className="sidebar-section-divider">
                <span className="sidebar-section-label">Foundation Section</span>
                <span className="sidebar-section-badge">Easy–Med</span>
              </div>
              <div className="sidebar-section-list">
                {foundationSubjects.map(subject => renderSubject(subject))}
              </div>

              {/* Advance Section Heading */}
              {advanceSubjects.length > 0 && (
                <>
                  <div className="sidebar-section-divider" style={{ marginTop: '1.25rem' }}>
                    <span className="sidebar-section-label">Advance Section</span>
                    <span className="sidebar-section-badge advance">Hard</span>
                  </div>
                  <div className="sidebar-section-list">
                    {advanceSubjects.map(subject => renderSubject(subject))}
                  </div>
                </>
              )}

              {/* Data Structures & Algorithms (DSA) Section Heading */}
              {dsaSubjects.length > 0 && (
                <>
                  <div className="sidebar-section-divider" style={{ marginTop: '1.25rem' }}>
                    <span className="sidebar-section-label">DSA & Coding Section</span>
                    <span className="sidebar-section-badge dsa">Core</span>
                  </div>
                  <div className="sidebar-section-list">
                    {dsaSubjects.map(subject => renderSubject(subject))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
};
