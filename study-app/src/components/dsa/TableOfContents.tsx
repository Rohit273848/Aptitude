import React, { useState, useEffect } from 'react';
import {
  ListTree,
  Search,
  ChevronRight,
  Hash,
  X,
  SlidersHorizontal,
  ArrowUp
} from 'lucide-react';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId: string;
  onSelectItem: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId,
  onSelectItem,
  isOpen,
  onClose
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  // By default, do NOT show detail table content (level 3 sub-items)
  const [showSubsections, setShowSubsections] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredItems = items.filter(item => {
    if (filterQuery.trim()) {
      return item.title.toLowerCase().includes(filterQuery.toLowerCase());
    }
    // In default, only show main sections (level <= 2), hide detailed sub-items
    if (!showSubsections && item.level > 2) {
      return false;
    }
    return true;
  });

  const hasSubsections = items.some(item => item.level > 2);

  return (
    <div className="dsa-toc-drawer-wrapper">
      {/* Dimmed backdrop overlay */}
      <div
        className="dsa-toc-backdrop"
        onClick={onClose}
        aria-label="Close Table of Contents overlay"
      />

      {/* Slide-out Drawer Panel */}
      <aside className="dsa-toc-drawer-panel" role="dialog" aria-modal="true">
        <div className="dsa-toc-header">
          <div className="dsa-toc-title">
            <ListTree size={18} color="var(--primary-action)" />
            <span>Table of Contents</span>
          </div>

          <div className="dsa-toc-header-actions">
            {hasSubsections && (
              <button
                type="button"
                className={`dsa-toc-subsections-toggle ${showSubsections ? 'active' : ''}`}
                onClick={() => setShowSubsections(prev => !prev)}
                title={showSubsections ? 'Hide detailed sub-headings' : 'Show detailed sub-headings'}
              >
                <SlidersHorizontal size={12} />
                <span>{showSubsections ? 'Details: On' : 'Details: Off'}</span>
              </button>
            )}

            <button
              type="button"
              className="dsa-toc-close-btn"
              onClick={onClose}
              aria-label="Close Table of Contents"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="dsa-toc-search-wrap">
          <Search size={14} className="dsa-toc-search-icon" />
          <input
            type="text"
            className="dsa-toc-search-input"
            placeholder="Search headings..."
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            autoFocus
          />
        </div>

        <nav className="dsa-toc-nav" aria-label="Table of Contents">
          {filteredItems.length === 0 ? (
            <div className="dsa-toc-empty">No matching headings found.</div>
          ) : (
            <ul className="dsa-toc-list">
              {filteredItems.map(item => {
                const isActive = activeId === item.id;
                return (
                  <li
                    key={item.id}
                    className={`dsa-toc-item level-${item.level} ${isActive ? 'active' : ''}`}
                  >
                    <button
                      type="button"
                      className="dsa-toc-link-btn"
                      onClick={() => {
                        onSelectItem(item.id);
                        onClose();
                      }}
                    >
                      <span className="dsa-toc-marker">
                        {item.level === 2 ? <Hash size={12} /> : <ChevronRight size={11} />}
                      </span>
                      <span className="dsa-toc-text">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        <div className="dsa-toc-footer">
          <button
            type="button"
            className="dsa-toc-top-btn"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onClose();
            }}
          >
            <ArrowUp size={14} />
            <span>Back to Top of Page</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
