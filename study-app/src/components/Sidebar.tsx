import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SubjectArea, Topic, TopicGroup } from '../types/syllabus';
import {
  GraduationCap,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
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
  FileCheck,
  FileText,
  Clock,
  Layers,
  PlusCircle,
  AlertCircle,
  User,
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
const getSubjectIcon = (subjectId: string, size = 18) => {
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
  onCloseMobile,
  onOpenAddNotesGuide
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Responsive desktop detection for collapsed rail vs mobile drawer
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 960;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 960);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Expanded subject groups state
  const [expandedSubjects, setExpandedSubjects] = useState<{ [key: string]: boolean }>({
    'foundation-numerical-ability': true,
    'foundation-reasoning-ability': false,
    'foundation-verbal-ability': false,
    'advance-quantitative-ability': false,
    'advance-reasoning-ability': false,
    'advance-coding-ability': false
  });

  // Section level expansion (Foundation vs Advance)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    Foundation: true,
    Advance: true
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

  const toggleSection = (sectionName: 'Foundation' | 'Advance') => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
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

  const handleRailSearchClick = () => {
    onToggleCollapse();
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 150);
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
          {/* Checkbox for completion */}
          <button
            type="button"
            className="sidebar-topic-check-btn"
            onClick={e => onToggleCompleteTopic(topic.id, e)}
            title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
            aria-label={`Mark ${topic.title} as ${isDone ? 'incomplete' : 'completed'}`}
          >
            {isDone ? (
              <CheckCircle2
                size={16}
                className="sidebar-check-icon done"
                color={isSelected ? 'var(--color-key-lime-pie)' : 'var(--primary-action)'}
              />
            ) : (
              <Circle
                size={16}
                className="sidebar-check-icon not-done"
                color={isSelected ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-stack-gray)'}
              />
            )}
          </button>

          {/* Topic title */}
          <span className="sidebar-topic-name" title={topic.title}>
            {topic.title}
          </span>

          {/* Non-color-alone status indicator */}
          <div className="sidebar-status-container">
            {topic.tag ? (
              <span className="sidebar-status-pill tag-not-recent" title={topic.tag}>
                <Clock size={11} aria-hidden="true" />
                <span>Not in 2 yrs</span>
              </span>
            ) : isReady ? (
              <span className="sidebar-status-pill status-ready" title="Ready to study complete notes">
                <FileCheck size={11} aria-hidden="true" />
                <span>Ready</span>
              </span>
            ) : (
              <span className="sidebar-status-pill status-needed" title="Awaiting notes contribution">
                <FileText size={11} aria-hidden="true" />
                <span>Notes needed</span>
              </span>
            )}
          </div>
        </div>
      </li>
    );
  };

  // Render a subject area with nested groups/topics
  const renderSubject = (subject: SubjectArea) => {
    // If searching, force expanded to show matching topics
    const isExpanded = isSearching ? true : !!expandedSubjects[subject.id];
    const totalTopics = subject.groups.reduce((acc, g) => acc + g.topics.length, 0);
    const readyTopics = subject.groups.reduce(
      (acc, g) => acc + g.topics.filter(t => t.status === 'ready').length,
      0
    );

    const hasSelectedChild = subject.groups.some(g =>
      g.topics.some(t => t.id === selectedTopicId)
    );

    return (
      <div key={subject.id} className={`sidebar-subject-block ${hasSelectedChild ? 'has-active-child' : ''}`}>
        <button
          type="button"
          className={`sidebar-subject-btn ${isExpanded ? 'expanded' : ''} ${hasSelectedChild ? 'active-parent' : ''}`}
          onClick={() => toggleSubject(subject.id)}
          aria-expanded={isExpanded}
          aria-controls={`subject-content-${subject.id}`}
        >
          <div className="sidebar-subject-left">
            <span className="sidebar-subject-icon">
              {getSubjectIcon(subject.id)}
            </span>
            <span className="sidebar-subject-title">{subject.title}</span>
          </div>

          <div className="sidebar-subject-right">
            {readyTopics > 0 && (
              <span className="sidebar-ready-count-badge" title={`${readyTopics} topics ready to study`}>
                {readyTopics} ready
              </span>
            )}
            <span className="sidebar-chevron-wrap">
              {isExpanded ? (
                <ChevronDown size={16} aria-hidden="true" />
              ) : (
                <ChevronRight size={16} aria-hidden="true" />
              )}
            </span>
          </div>
        </button>

        {isExpanded && (
          <div id={`subject-content-${subject.id}`} className="sidebar-subject-nested-content">
            {subject.groups.length === 0 ? (
              <div className="sidebar-subject-empty-box">
                <p className="sidebar-subject-empty-text">
                  No topic notes have been added for {subject.title} yet.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                  <span className="sidebar-status-pill status-needed">
                    <FileText size={11} aria-hidden="true" />
                    <span>Notes needed</span>
                  </span>
                  {onOpenAddNotesGuide && (
                    <button
                      type="button"
                      className="sidebar-quick-add-btn"
                      onClick={onOpenAddNotesGuide}
                    >
                      <PlusCircle size={12} />
                      <span>Add notes</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              subject.groups.map(group => {
                const showGroupHeader = subject.groups.length > 1;
                return (
                  <div key={group.id} className="sidebar-group-container">
                    {showGroupHeader && (
                      <div className="sidebar-group-header">
                        <span className="sidebar-group-bullet" aria-hidden="true" />
                        <span className="sidebar-group-title">{group.title}</span>
                      </div>
                    )}
                    <ul className="sidebar-topics-list">
                      {group.topics.map(topic => renderTopicItem(topic))}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  };

  // Render a top-level section (Foundation or Advance)
  const renderSection = (
    title: 'Foundation' | 'Advance',
    subtitle: string,
    subjects: SubjectArea[]
  ) => {
    if (subjects.length === 0 && isSearching) {
      return null;
    }

    const isSectionOpen = isSearching ? true : !!expandedSections[title];
    const totalSectionTopics = subjects.reduce(
      (sum, s) => sum + s.groups.reduce((gSum, g) => gSum + g.topics.length, 0),
      0
    );

    return (
      <div className="sidebar-section-container">
        <button
          type="button"
          className="sidebar-section-header-btn"
          onClick={() => toggleSection(title)}
          aria-expanded={isSectionOpen}
          aria-label={`${title} section. Contains ${subjects.length} subjects.`}
        >
          <div className="sidebar-section-header-left">
            <span className="sidebar-section-title">{title}</span>
            <span className="sidebar-section-badge">{subtitle}</span>
          </div>

          <div className="sidebar-section-header-right">
            <span className="sidebar-section-topic-count">
              {totalSectionTopics} {totalSectionTopics === 1 ? 'topic' : 'topics'}
            </span>
            <span className="sidebar-section-chevron">
              {isSectionOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </div>
        </button>

        {isSectionOpen && (
          <div className="sidebar-section-body">
            {subjects.map(renderSubject)}
          </div>
        )}
      </div>
    );
  };

  // If in desktop collapsed mode, render compact icon rail (desktop only)
  if (isDesktop && isCollapsed && !isMobileOpen) {
    return (
      <aside
        className="app-sidebar collapsed desktop-only"
        role="navigation"
        aria-label="TCS NQT Syllabus Navigation (Collapsed)"
      >
        <div className="sidebar-rail-header">
          <button
            type="button"
            className="sidebar-rail-brand-btn"
            onClick={onGoHome}
            title="TCS NQT Study Portal - Return to Dashboard"
            aria-label="Return to Dashboard"
          >
            <div className="sidebar-rail-logo-badge">
              <GraduationCap size={20} />
            </div>
          </button>

          <button
            type="button"
            className="sidebar-rail-expand-btn"
            onClick={onToggleCollapse}
            title="Expand sidebar navigation"
            aria-label="Expand sidebar navigation"
          >
            <PanelLeftOpen size={18} />
          </button>
        </div>

        <div className="sidebar-rail-scroll">
          {/* Quick Dashboard link */}
          <button
            type="button"
            className={`sidebar-rail-icon-btn ${!selectedTopicId ? 'active' : ''}`}
            onClick={onGoHome}
            title="Syllabus Dashboard"
            aria-label="Syllabus Dashboard"
          >
            <Layers size={18} />
          </button>

          {/* Quick Search trigger */}
          <button
            type="button"
            className="sidebar-rail-icon-btn"
            onClick={handleRailSearchClick}
            title="Search syllabus topics"
            aria-label="Search syllabus topics"
          >
            <Search size={18} />
          </button>

          <div className="sidebar-rail-divider" aria-hidden="true" />

          {/* Subject icons */}
          {syllabus.map(subject => {
            const hasSelected = subject.groups.some(g =>
              g.topics.some(t => t.id === selectedTopicId)
            );
            const readyCount = subject.groups.reduce(
              (acc, g) => acc + g.topics.filter(t => t.status === 'ready').length,
              0
            );

            return (
              <button
                key={subject.id}
                type="button"
                className={`sidebar-rail-icon-btn ${hasSelected ? 'active' : ''}`}
                onClick={() => handleRailSubjectClick(subject.id)}
                title={`${subject.title} (${readyCount} ready)`}
                aria-label={`${subject.title} (${readyCount} ready)`}
              >
                {getSubjectIcon(subject.id, 18)}
                {readyCount > 0 && (
                  <span className="sidebar-rail-dot" aria-label={`${readyCount} ready topics`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Rail Footer */}
        <div className="sidebar-rail-footer">
          <button
            type="button"
            className="sidebar-rail-icon-btn"
            onClick={onOpenAddNotesGuide}
            title="Add Notes Guide"
            aria-label="Add Notes Guide"
          >
            <PlusCircle size={18} />
          </button>
        </div>
      </aside>
    );
  }

  // Full Expanded Sidebar View (Desktop & Mobile Drawer)
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`app-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
        role="navigation"
        aria-label="TCS NQT Syllabus Navigation"
        aria-modal={isMobileOpen ? 'true' : undefined}
      >
        {/* Top Header: Brand Name + Study Icon + Collapse/Close controls */}
        <div className="sidebar-header">
          <button
            type="button"
            className="sidebar-brand-btn"
            onClick={handleGoHomeWrapper}
            title="TCS NQT Study Hub - Return to Dashboard"
            aria-label="TCS NQT Study Hub Dashboard"
          >
            <div className="sidebar-brand-icon-box" aria-hidden="true">
              <GraduationCap size={20} />
            </div>
            <div className="sidebar-brand-info">
              <span className="sidebar-brand-title">TCS NQT Prep</span>
              <span className="sidebar-brand-subtitle">Aptitude Learning Hub</span>
            </div>
          </button>

          <div className="sidebar-header-controls">
            {/* Desktop Collapse Button */}
            <button
              type="button"
              className="sidebar-collapse-toggle-btn desktop-only"
              onClick={onToggleCollapse}
              title="Collapse sidebar (icons only)"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>

            {/* Mobile Drawer Close Button */}
            <button
              type="button"
              className="sidebar-close-btn mobile-only"
              onClick={onCloseMobile}
              title="Close navigation drawer"
              aria-label="Close navigation drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search Field directly below header */}
        <div className="sidebar-search-area">
          <div className="sidebar-search-box">
            <label htmlFor="sidebar-search-input" className="visually-hidden">
              Search syllabus subjects and topics
            </label>
            <Search size={15} className="sidebar-search-icon" aria-hidden="true" />
            <input
              ref={searchInputRef}
              id="sidebar-search-input"
              type="search"
              className="sidebar-search-input"
              placeholder="Search subjects & topics..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              aria-label="Filter syllabus subjects and topics"
            />
            {searchFilter && (
              <button
                type="button"
                className="sidebar-search-clear-btn"
                onClick={() => {
                  setSearchFilter('');
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search query"
              >
                <X size={14} />
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
        </div>

        {/* Fast Dashboard Action */}
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

        {/* Main Independently Scrollable Navigation Area */}
        <div className="sidebar-scroll-area">
          {isSearching && totalMatches === 0 ? (
            /* No Matches Useful State */
            <div className="sidebar-no-results-box" role="status">
              <div className="sidebar-no-results-icon" aria-hidden="true">
                <AlertCircle size={24} />
              </div>
              <h4 className="sidebar-no-results-title">No syllabus topics found</h4>
              <p className="sidebar-no-results-desc">
                No topics matched "<strong>{searchFilter}</strong>". Try another keyword or clear search.
              </p>
              <div className="sidebar-no-results-actions">
                <button
                  type="button"
                  className="sidebar-no-results-btn"
                  onClick={() => setSearchFilter('')}
                >
                  Reset Filter
                </button>
                {onOpenAddNotesGuide && (
                  <button
                    type="button"
                    className="sidebar-no-results-add-btn"
                    onClick={() => {
                      if (isMobileOpen) onCloseMobile();
                      onOpenAddNotesGuide();
                    }}
                  >
                    <PlusCircle size={14} />
                    <span>Suggest Adding Notes</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Foundation Section */}
              {renderSection('Foundation', 'Easy–Medium', foundationSubjects)}

              {/* Advance Section */}
              {renderSection('Advance', 'Hard', advanceSubjects)}
            </>
          )}
        </div>

        {/* Persistent Sidebar Footer (Inspired by reference footer) */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-card">
            <div className="sidebar-footer-avatar" aria-hidden="true">
              <User size={16} />
            </div>
            <div className="sidebar-footer-meta">
              <span className="sidebar-footer-title">Aptitude Learner</span>
              <span className="sidebar-footer-subtitle">
                {completedTopics.filter(id => ['percentages', 'speed-time-and-distance'].includes(id)).length}/2 Ready Done
              </span>
            </div>
            {onOpenAddNotesGuide && (
              <button
                type="button"
                className="sidebar-footer-action-btn"
                onClick={() => {
                  if (isMobileOpen) onCloseMobile();
                  onOpenAddNotesGuide();
                }}
                title="Contribute notes"
                aria-label="Add or contribute study notes"
              >
                <PlusCircle size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
