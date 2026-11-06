import React, { useState, useEffect } from 'react';
import {
  ListFilter,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Sparkles,
  Calculator,
  BookOpen,
  Award,
  PanelRightClose,
  PanelRightOpen,
  ArrowUp
} from 'lucide-react';

export interface TocSection {
  id: string;
  label: string;
  icon?: string;
}

interface NotesContextRailProps {
  topicTitle: string;
  sections?: TocSection[];
  isCompleted: boolean;
  onToggleComplete: () => void;
  expandAll?: boolean;
  onToggleExpandAll?: () => void;
}

const DEFAULT_SECTIONS: TocSection[] = [
  { id: 'interactive-tool', label: 'Interactive Tool', icon: '⚡' },
  { id: 'core-modules', label: 'Core Modules & Examples', icon: '📚' },
  { id: 'formula-sheet', label: 'Master Formulas', icon: '📐' },
  { id: 'homework-section', label: 'Homework Solutions', icon: '✍️' },
  { id: 'placement-quiz', label: 'Placement Quiz', icon: '🎯' },
  { id: 'corrections-audit', label: 'Takeaways & Strategy', icon: '🔍' }
];

export const NotesContextRail: React.FC<NotesContextRailProps> = ({
  topicTitle,
  sections = DEFAULT_SECTIONS,
  isCompleted,
  onToggleComplete,
  expandAll,
  onToggleExpandAll
}) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Track scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollProgress(currentProgress);
      }

      // Check which section is in view
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileDrawerOpen(false);
    }
  };

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileDrawerOpen]);

  // Lock background scroll when mobile reading drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  const renderContentItems = () => (
    <>
      {/* Reading Progress Indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--text-secondary)' }}>Reading Progress</span>
          <span style={{ color: 'var(--primary-action)' }}>{scrollProgress}%</span>
        </div>
        <div className="progress-widget-track" style={{ height: '5px' }}>
          <div className="progress-widget-fill" style={{ width: `${scrollProgress}%` }} />
        </div>
      </div>

      {/* Table of Contents Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {sections.map(sec => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'var(--primary-action-light)' : 'transparent',
                border: '1px solid',
                borderColor: isActive ? 'var(--status-ready-border)' : 'transparent',
                color: isActive ? 'var(--primary-action)' : 'var(--text-body)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                minHeight: '38px'
              }}
            >
              {sec.icon && <span style={{ fontSize: '0.9rem' }}>{sec.icon}</span>}
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {sec.label}
              </span>
              {isActive && <ChevronRight size={14} />}
            </button>
          );
        })}
      </div>

      {/* Quick Action Tools */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {onToggleExpandAll && (
          <button
            type="button"
            className="lesson-control-btn"
            onClick={onToggleExpandAll}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {expandAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span>{expandAll ? 'Collapse Solutions' : 'Expand Solutions'}</span>
          </button>
        )}

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.55rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            background: isCompleted ? 'var(--status-ready-bg)' : 'var(--bg-secondary)',
            border: '1px solid',
            borderColor: isCompleted ? 'var(--status-ready-border)' : 'transparent',
            cursor: 'pointer',
            fontSize: '0.84rem',
            fontWeight: 600,
            color: isCompleted ? 'var(--primary-action)' : 'var(--text-main)',
            transition: 'all 0.15s ease'
          }}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggleComplete}
            style={{ width: '17px', height: '17px', accentColor: 'var(--primary-action)', cursor: 'pointer' }}
          />
          <span>{isCompleted ? 'Marked Completed ✓' : 'Mark as Done'}</span>
        </label>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sticky Rail (Visible on >= 1180px screens) */}
      {!isCollapsed ? (
        <aside
          className="notes-context-rail desktop-only"
          aria-label="Table of Contents and Reading Tools"
          style={{
            width: '260px',
            flexShrink: 0,
            position: 'sticky',
            top: 'calc(var(--header-height) + 1.25rem)',
            maxHeight: 'calc(100vh - var(--header-height) - 2.5rem)',
            overflowY: 'auto',
            background: 'var(--bg-surface-translucent)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transition: 'all 0.2s ease'
          }}
        >
          {/* Header with collapse button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ListFilter size={15} color="var(--primary-action)" />
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                On-Page Contents
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              title="Minimize contextual tools"
              aria-label="Minimize contextual tools"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.2rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <PanelRightClose size={15} />
            </button>
          </div>

          {renderContentItems()}
        </aside>
      ) : (
        /* Collapsed Floating Trigger for Desktop */
        <div
          className="notes-context-rail-collapsed desktop-only"
          style={{
            position: 'fixed',
            right: '1.25rem',
            bottom: '2rem',
            zIndex: 45,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            title="Open reading tools & table of contents"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-card)',
              color: 'var(--primary-action)',
              boxShadow: 'var(--shadow-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <PanelRightOpen size={18} />
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            title="Back to top"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              boxShadow: 'var(--shadow-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowUp size={15} />
          </button>
        </div>
      )}

      {/* Floating Reading Tools Button & Back-to-Top for Tablet & Mobile (<= 1180px) */}
      <div className="mobile-reading-fab-container">
        <button
          type="button"
          className="mobile-reading-fab"
          onClick={() => setIsMobileDrawerOpen(true)}
          title="Open On-Page Contents"
          aria-label="Open On-Page Table of Contents"
        >
          <ListFilter size={16} />
          <span>Contents</span>
          <span className="mobile-fab-badge">{scrollProgress}%</span>
        </button>

        <button
          type="button"
          className="mobile-back-to-top-fab"
          onClick={scrollToTop}
          title="Scroll back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>

      {/* Mobile/Tablet Slide-Up Bottom Sheet Drawer */}
      {isMobileDrawerOpen && (
        <>
          <div
            className="mobile-toc-backdrop"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-toc-bottom-sheet" role="dialog" aria-modal="true">
            <div className="mobile-toc-sheet-handle" />
            <div className="mobile-toc-sheet-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ListFilter size={18} color="var(--primary-action)" />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                  On-Page Contents
                </h4>
              </div>
              <button
                type="button"
                className="sidebar-collapse-toggle-btn"
                onClick={() => setIsMobileDrawerOpen(false)}
                aria-label="Close contents"
              >
                ✕
              </button>
            </div>
            <div className="mobile-toc-sheet-body">
              {renderContentItems()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

