import React, { useState, useEffect, useMemo } from 'react';
import { syllabusData, findTopicById, getAllTopics } from './data/syllabusData';
import { BreadcrumbItem, Topic } from './types/syllabus';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Dashboard } from './components/Dashboard';
import { PercentageView } from './components/PercentageView';
import { TSDView } from './components/TSDView';
import { EmptyTopicView } from './components/EmptyTopicView';
import { AddNotesModal } from './components/AddNotesModal';
import { ArrowRight, Check, Search } from 'lucide-react';

const STORAGE_KEY = 'tcs_nqt_completed_topics';
const SIDEBAR_COLLAPSED_KEY = 'tcs_nqt_sidebar_collapsed';

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
      return [{ label: 'Syllabus Home', type: 'home' }];
    }

    const found = findTopicById(selectedTopicId);
    if (!found) {
      return [
        { label: 'Syllabus Home', type: 'home' },
        { label: 'Topic Not Found' }
      ];
    }

    return [
      { label: 'Syllabus Home', type: 'home' },
      { label: found.subject.title, type: 'subject', id: found.subject.id },
      { label: found.group.title },
      { label: found.topic.title, type: 'topic', id: found.topic.id }
    ];
  }, [selectedTopicId]);

  // Current topic detail
  const currentTopicData = selectedTopicId ? findTopicById(selectedTopicId) : null;

  return (
    <div className="app-layout">
      {/* Header */}
      <Header
        onGoHome={handleGoHome}
        onOpenAddNotes={() => setIsAddNotesModalOpen(true)}
        completedCount={completedTopics.filter(id => ['percentages', 'speed-time-and-distance'].includes(id)).length}
        totalAvailable={2}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleMobileSidebar={handleToggleMobileSidebar}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleCollapse={handleToggleSidebarCollapse}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <div className={`app-body ${isSidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
        {/* Sidebar */}
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
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Search Results for "{searchQuery}"
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} in the syllabus.
              </p>

              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-subtle)' }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {searchResults.map(({ topic, group, subject }) => (
                    <div
                      key={topic.id}
                      style={{
                        padding: '1rem',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleSelectTopic(topic.id)}
                    >
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-stack-gray)', marginBottom: '0.2rem' }}>
                          {subject.section} &bull; {subject.title} &bull; {group.title}
                        </div>
                        <h4 style={{ fontSize: '1rem', color: 'var(--primary-action)' }}>
                          {topic.title}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            /* Home / Dashboard View */
            <Dashboard
              syllabus={syllabusData}
              onSelectTopic={handleSelectTopic}
              onOpenAddNotesGuide={() => setIsAddNotesModalOpen(true)}
              completedTopics={completedTopics}
            />
          ) : currentTopicData?.topic.id === 'percentages' ? (
            /* Percentages Study View */
            <PercentageView
              isCompleted={completedTopics.includes('percentages')}
              onToggleComplete={() => handleToggleComplete('percentages')}
            />
          ) : currentTopicData?.topic.id === 'speed-time-and-distance' ? (
            /* Speed, Time & Distance Study View */
            <TSDView
              isCompleted={completedTopics.includes('speed-time-and-distance')}
              onToggleComplete={() => handleToggleComplete('speed-time-and-distance')}
            />
          ) : currentTopicData ? (
            /* Empty State for topics without notes */
            <EmptyTopicView
              topic={currentTopicData.topic}
              group={currentTopicData.group}
              subject={currentTopicData.subject}
              onOpenAddNotesGuide={() => setIsAddNotesModalOpen(true)}
            />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Topic not found.</p>
              <button type="button" className="add-notes-btn" onClick={handleGoHome} style={{ marginTop: '1rem' }}>
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
