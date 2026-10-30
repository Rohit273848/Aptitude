import React from 'react';
import { Search, PlusCircle, CheckSquare, Layers, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

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
  isMobileSidebarOpen,
  onToggleCollapse,
  isSidebarCollapsed
}) => {
  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <div className="header-brand-group">
          {/* Mobile hamburger menu button */}
          {onToggleMobileSidebar && (
            <button
              type="button"
              className="header-mobile-toggle-btn mobile-only"
              onClick={onToggleMobileSidebar}
              aria-label={isMobileSidebarOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
              aria-expanded={isMobileSidebarOpen}
            >
              <Menu size={22} />
            </button>
          )}

         

          <button
            type="button"
            className="brand-button"
            onClick={onGoHome}
            aria-label="Return to TCS NQT Syllabus Dashboard"
          >
            <div className="brand-logo-badge" aria-hidden="true">
              TCS
            </div>
            <div className="brand-text-group">
              <h1>NQT Aptitude Prep</h1>
              <div className="brand-subtext desktop-only">Quantitative &bull; Reasoning &bull; Verbal &bull; Advance</div>
            </div>
          </button>
        </div>

        {/* Global Search across syllabus (Desktop / Tablet view) */}
        <div className="header-search-box desktop-search">
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
              ✕
            </button>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="header-nav-actions">
          <button
            type="button"
            className="header-pill-btn desktop-only"
            onClick={onGoHome}
            title="View complete syllabus overview"
          >
            <Layers size={14} />
            <span>Syllabus Home</span>
          </button>

          <button
            type="button"
            className="header-pill-btn header-add-notes-btn"
            onClick={onOpenAddNotes}
            title="Guide to adding more topic notes"
          >
            <PlusCircle size={14} />
            <span className="btn-text-full">Add Notes</span>
            <span className="btn-text-short">Notes</span>
          </button>

          <div
            className="header-pill-btn header-progress-pill"
            style={{ cursor: 'default', backgroundColor: 'var(--bg-nav-darker)', borderColor: 'var(--color-stack-gray)' }}
            title="Completed topics"
          >
            <CheckSquare size={14} color="var(--color-key-lime-pie)" />
            <span className="btn-text-full">{completedCount}/{totalAvailable} Ready Done</span>
            <span className="btn-text-short">{completedCount}/{totalAvailable} Done</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Row (Spans full width on small screens) */}
      <div className="header-mobile-search-bar mobile-only">
        <div className="header-search-box mobile-search-box">
          <Search size={15} className="search-icon-left" aria-hidden="true" />
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
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
