import React, { useState, useEffect, useMemo } from 'react';
import { syllabusData, findTopicById, getAllTopics } from './data/syllabusData';
import { BreadcrumbItem, Topic } from './types/syllabus';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Dashboard } from './components/Dashboard';
import { PercentageView } from './components/PercentageView';
import { TSDView } from './components/TSDView';
import { TimeWorkView } from './components/TimeWorkView';
import { RatioView } from './components/RatioView';
import { ProfitLossView } from './components/ProfitLossView';
import { EmptyTopicView } from './components/EmptyTopicView';
import { AddNotesModal } from './components/AddNotesModal';
import { NotesContextRail } from './components/NotesContextRail';
import { ArrowRight, Check, Search, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'tcs_nqt_completed_topics';
const SIDEBAR_COLLAPSED_KEY = 'tcs_nqt_sidebar_collapsed';
const THEME_KEY = 'tcs_nqt_theme';

export const App: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddNotesModalOpen, setIsAddNotesModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Theme state ('light' | 'dark')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Sync theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme preference', e);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Load completed topics from localStorage
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopics));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }, [completedTopics]);

  const handleToggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {}
      return next;
    });
  };

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Lock background body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  const handleToggleComplete = (topicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setSearchQuery('');
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedTopicId(null);
    setSearchQuery('');
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search Results across syllabus topics & lesson content
  const allTopicItems = useMemo(() => getAllTopics(), []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allTopicItems.filter(item => {
      const matchTitle = item.topic.title.toLowerCase().includes(q);
      const matchGroup = item.group.title.toLowerCase().includes(q);
      const matchSubject = item.subject.title.toLowerCase().includes(q);
      const matchSummary = item.topic.summary?.toLowerCase().includes(q);
      return matchTitle || matchGroup || matchSubject || matchSummary;
    });
  }, [searchQuery, allTopicItems]);

  // Breadcrumbs
  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    if (!selectedTopicId) {
      return [{ label: 'Dashboard', type: 'home' }];
    }

    const found = findTopicById(selectedTopicId);
    if (!found) {
      return [
        { label: 'Dashboard', type: 'home' },
        { label: 'Topic Not Found' }
      ];
    }

    return [
      { label: 'Dashboard', type: 'home' },
      { label: found.subject.title, type: 'subject', id: found.subject.id },
      { label: found.group.title },
      { label: found.topic.title, type: 'topic', id: found.topic.id }
    ];
  }, [selectedTopicId]);

  // Current topic detail
  const currentTopicData = selectedTopicId ? findTopicById(selectedTopicId) : null;

  // Dynamically calculate ready topics across the entire syllabus
  const readyTopicsList = useMemo(() => {
    return getAllTopics().filter(item => item.topic.status === 'ready');
  }, []);

  const completedReadyCount = useMemo(() => {
    const readyIds = new Set(readyTopicsList.map(item => item.topic.id));
    return completedTopics.filter(id => readyIds.has(id)).length;
  }, [completedTopics, readyTopicsList]);

  return (
    <div className="app-layout">
      {/* Top Floating Glassmorphic Header */}
      <Header
        onGoHome={handleGoHome}
        completedCount={completedReadyCount}
        totalAvailable={readyTopicsList.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleMobileSidebar={handleToggleMobileSidebar}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleCollapse={handleToggleSidebarCollapse}
        isSidebarCollapsed={isSidebarCollapsed}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <div className={`app-body ${isSidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
        {/* Sidebar Track Wrapper to guarantee fixed sidebar with 0 movement while scrolling */}
        <div className="app-sidebar-track">
          <Sidebar
            syllabus={syllabusData}
            selectedTopicId={selectedTopicId}
            onSelectTopic={handleSelectTopic}
            completedTopics={completedTopics}
            onToggleCompleteTopic={handleToggleComplete}
            onGoHome={handleGoHome}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebarCollapse}
            isMobileOpen={isMobileSidebarOpen}
            onCloseMobile={handleCloseMobileSidebar}
            onOpenAddNotesGuide={() => setIsAddNotesModalOpen(true)}
          />
        </div>

        {/* Main Content Area */}
        <main className="app-content" role="main">
          <Breadcrumbs
            items={breadcrumbItems}
            onNavigate={(type, id) => {
              if (type === 'home') handleGoHome();
              else if (type === 'topic' && id) handleSelectTopic(id);
            }}
          />

          {/* Search Results View */}
          {searchQuery.trim() ? (
            <div className="search-results-panel">
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.4rem', fontWeight: 800 }}>
                Search Results for "{searchQuery}"
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} in the syllabus.
              </p>

              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 2rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1.5px dashed var(--border-control)' }}>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    No syllabus topics matched your query.
                  </p>
                  <button
                    type="button"
                    className="add-notes-btn"
                    onClick={() => setIsAddNotesModalOpen(true)}
                  >
                    Suggest Adding Notes for This Topic
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {searchResults.map(({ topic, group, subject }) => (
                    <div
                      key={topic.id}
                      className="search-result-item"
                      onClick={() => handleSelectTopic(topic.id)}
                    >
                      <div className="search-result-info">
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                          {subject.section} Section &bull; {subject.title} &bull; {group.title}
                        </div>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-action)', fontWeight: 700 }}>
                          {topic.title}
                        </h4>
                      </div>

                      <div className="search-result-actions">
                        {topic.status === 'ready' ? (
                          <span className="topic-status-pill ready">Ready to study</span>
                        ) : (
                          <span className="topic-status-pill needed">Notes needed</span>
                        )}
                        <ArrowRight size={16} color="var(--primary-action)" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : !selectedTopicId ? (
            /* Home / Modern Dashboard View */
            <Dashboard
              syllabus={syllabusData}
              onSelectTopic={handleSelectTopic}
              onOpenAddNotesGuide={() => setIsAddNotesModalOpen(true)}
              completedTopics={completedTopics}
            />
          ) : currentTopicData && currentTopicData.topic.status === 'ready' ? (
            /* 3-Panel Learning Experience: Main Content + Right Contextual Tools Rail */
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {currentTopicData.topic.id === 'percentages' ? (
                  <PercentageView
                    isCompleted={completedTopics.includes('percentages')}
                    onToggleComplete={() => handleToggleComplete('percentages')}
                  />
                ) : currentTopicData.topic.id === 'speed-time-and-distance' ? (
                  <TSDView
                    isCompleted={completedTopics.includes('speed-time-and-distance')}
                    onToggleComplete={() => handleToggleComplete('speed-time-and-distance')}
                  />
                ) : (currentTopicData.topic.id === 'work-and-time' || currentTopicData.topic.id === 'number-system-lcm-hcf') ? (
                  <TimeWorkView
                    isCompleted={completedTopics.includes(currentTopicData.topic.id)}
                    onToggleComplete={() => handleToggleComplete(currentTopicData.topic.id)}
                  />
                ) : (currentTopicData.topic.id === 'ratios-proportion' || currentTopicData.topic.id === 'allegations-and-mixtures') ? (
                  <RatioView
                    isCompleted={completedTopics.includes(currentTopicData.topic.id)}
                    onToggleComplete={() => handleToggleComplete(currentTopicData.topic.id)}
                  />
                ) : currentTopicData.topic.id === 'profit-and-loss' ? (
                  <ProfitLossView
                    isCompleted={completedTopics.includes('profit-and-loss')}
                    onToggleComplete={() => handleToggleComplete('profit-and-loss')}
                  />
                ) : (
                  <EmptyTopicView
                    topic={currentTopicData.topic}
                    group={currentTopicData.group}
                    subject={currentTopicData.subject}
                    onOpenAddNotesGuide={() => setIsAddNotesModalOpen(true)}
                  />
                )}
              </div>

              <NotesContextRail
                topicTitle={currentTopicData.topic.title}
                isCompleted={completedTopics.includes(currentTopicData.topic.id)}
                onToggleComplete={() => handleToggleComplete(currentTopicData.topic.id)}
              />
            </div>
          ) : currentTopicData ? (
            /* Empty State for topics without notes */
            <EmptyTopicView
              topic={currentTopicData.topic}
              group={currentTopicData.group}
              subject={currentTopicData.subject}
              onOpenAddNotesGuide={() => setIsAddNotesModalOpen(true)}
            />
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Topic not found.</p>
              <button type="button" className="add-notes-btn" onClick={handleGoHome}>
                Return to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Add Notes Modal */}
      <AddNotesModal
        isOpen={isAddNotesModalOpen}
        onClose={() => setIsAddNotesModalOpen(false)}
      />
    </div>
  );
};
