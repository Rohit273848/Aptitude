import React, { useRef, useEffect } from 'react';
import {
  Search,
  PlusCircle,
  Menu,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  X
} from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  onOpenAddNotes: () => void;
  completedCount: number;
  totalAvailable: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
  onToggleCollapse?: () => void;
  isSidebarCollapsed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenAddNotes,
  completedCount,
  totalAvailable,
  searchQuery,
  onSearchChange,
  onToggleMobileSidebar,
  isMobileSidebarOpen
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut ('/' or 'Cmd/Ctrl + K' to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if ((e.key === '/' && !isInput) || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round((completedCount / Math.max(1, totalAvailable)) * 100)
  );

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        {/* Left Section: Mobile Drawer Toggle & Brand */}
        <div className="header-brand-group">
          {onToggleMobileSidebar && (
            <button
              type="button"
              className="header-icon-action-btn mobile-only"
              onClick={onToggleMobileSidebar}
              aria-label={isMobileSidebarOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={isMobileSidebarOpen}
              title="Toggle mobile navigation"
            >
              <Menu size={18} strokeWidth={2.2} />
            </button>
          )}

          <button
            type="button"
            className="brand-button"
            onClick={onGoHome}
            aria-label="Return to TCS NQT Syllabus Dashboard"
            title="TCS NQT Prep Hub Dashboard"
          >
            <div className="brand-logo-emblem" aria-hidden="true">
              <GraduationCap size={18} strokeWidth={2.2} />
            </div>
            <div className="brand-text-group">
              <div className="brand-title-row">
                <span className="brand-title-main">TCS NQT</span>
                <span className="brand-status-tag">
                  <span className="status-dot-pulse" aria-hidden="true" />
                  Prep Hub
                </span>
              </div>
              <div className="brand-subtext desktop-only">
                Numerical &bull; Reasoning &bull; Verbal &bull; Advance
              </div>
            </div>
          </button>
        </div>

        {/* Center: Command-Style Search Bar (Desktop / Tablet) */}
        <div className="header-search-box desktop-search">
          <label htmlFor="header-global-search" className="visually-hidden">
            Search syllabus topics, formulas, and shortcuts
          </label>
          <Search size={14} className="search-icon-left" aria-hidden="true" />
          <input
            ref={searchInputRef}
            id="header-global-search"
            type="search"
            className="header-search-input"
            placeholder="Search topics, formulas, shortcuts... (Ctrl+K)"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search syllabus topics and available notes"
          />
          {searchQuery ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
            >
              <X size={13} />
            </button>
          ) : (
            <span className="search-kbd-hint desktop-only" title="Press / or Ctrl+K to search">
              <kbd>/</kbd>
            </span>
          )}
        </div>

        {/* Right: Modern Actions & Progress Widget */}
        <div className="header-nav-actions">
          <button
            type="button"
            className="header-nav-pill desktop-only"
            onClick={onGoHome}
            title="View complete syllabus overview"
          >
            <BookOpen size={13} className="nav-pill-icon" />
            <span className="nav-pill-label">Syllabus</span>
          </button>

          <button
            type="button"
            className="header-cta-btn"
            onClick={onOpenAddNotes}
            title="Guide to contributing and adding notes"
          >
            <PlusCircle size={13} />
            <span className="btn-text-full">Add Notes</span>
            <span className="btn-text-short">Notes</span>
          </button>

          {/* Sleek Progress Indicator Card */}
          <div
            className="header-progress-widget"
            title={`${completedCount} of ${totalAvailable} available topics completed (${progressPercent}%)`}
          >
            <div className="progress-widget-icon" aria-hidden="true">
              <CheckCircle2 size={15} color="#4ade80" />
            </div>
            <div className="progress-widget-info">
              <div className="progress-widget-stats">
                <span className="progress-widget-count">{completedCount}/{totalAvailable}</span>
                <span className="progress-widget-pct">{progressPercent}%</span>
              </div>
              <div className="progress-widget-track" aria-hidden="true">
                <div
                  className="progress-widget-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Row (Full width underneath on mobile screens) */}
      <div className="header-mobile-search-bar mobile-only">
        <div className="header-search-box mobile-search-box">
          <Search size={14} className="search-icon-left" aria-hidden="true" />
          <input
            type="search"
            className="header-search-input"
            placeholder="Search syllabus & notes..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search syllabus topics and available notes"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
