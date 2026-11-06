import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  parseMarkdownTimeline,
  TimelineNavSection
} from '../../utils/markdownNavParser';
import { ArrowUpRight } from 'lucide-react';

interface VerticalTimelineNavProps {
  markdownContent: string;
  topicTitle?: string;
  className?: string;
}

export const VerticalTimelineNav: React.FC<VerticalTimelineNavProps> = ({
  markdownContent,
  topicTitle = 'DSA Learning Notes',
  className = ''
}) => {
  // Parse ONLY major H2 sections
  const sections = useMemo<TimelineNavSection[]>(() => {
    return parseMarkdownTimeline(markdownContent, topicTitle);
  }, [markdownContent, topicTitle]);

  const [activeId, setActiveId] = useState<string>('');
  const [hoveredSection, setHoveredSection] = useState<TimelineNavSection | null>(null);
  const [cardTop, setCardTop] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const dashRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Detect mobile & touch devices
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Initialize activeId with first section if empty
  useEffect(() => {
    if (sections.length > 0 && !activeId) {
      setActiveId(sections[0].id);
    }
  }, [sections, activeId]);

  // Helper to find matching DOM element for an H2 section
  const findElementForSection = useCallback((item: TimelineNavSection): HTMLElement | null => {
    // 1. Direct ID match
    let el = document.getElementById(item.id);
    if (el) return el;

    // 2. Keyword heuristic mapping for interactive mode components
    const idLower = item.id.toLowerCase();
    if (idLower.includes('lemonade')) {
      el = document.getElementById('problem-lemonade-change') || document.getElementById('lemonade-change');
      if (el) return el;
    }
    if (idLower.includes('cookie')) {
      el = document.getElementById('problem-assign-cookies') || document.getElementById('assign-cookies');
      if (el) return el;
    }
    if (idLower.includes('jump')) {
      el = document.getElementById('problem-jump-game') || document.getElementById('jump-game');
      if (el) return el;
    }
    if (idLower.includes('knapsack')) {
      el = document.getElementById('problem-fractional-knapsack') || document.getElementById('fractional-knapsack');
      if (el) return el;
    }
    if (idLower.includes('intuition') || idLower.includes('philosophy')) {
      el = document.getElementById('core-intuition');
      if (el) return el;
    }
    if (idLower.includes('regret') || idLower.includes('dynamic-programming')) {
      el = document.getElementById('regret-test') || document.getElementById('core-intuition');
      if (el) return el;
    }
    if (idLower.includes('strategy') || idLower.includes('interview') || idLower.includes('traps')) {
      el = document.getElementById('revision-panel');
      if (el) return el;
    }
    if (idLower.includes('homework') || idLower.includes('practice')) {
      el = document.getElementById('practice-homework') || document.getElementById('revision-panel');
      if (el) return el;
    }
    if (idLower.includes('cheat-sheet') || idLower.includes('formula')) {
      el = document.getElementById('cheat-sheet') || document.getElementById('revision-panel');
      if (el) return el;
    }

    // 3. Match heading text
    const allH2s = Array.from(document.querySelectorAll('h2, .section-title-bar h2'));
    for (const h of allH2s) {
      if (h.textContent && h.textContent.toLowerCase().includes(item.title.toLowerCase().slice(0, 16))) {
        return h as HTMLElement;
      }
    }

    return null;
  }, []);

  // Set up IntersectionObserver on H2 headings / sections
  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0) return;

    const sectionElements: { id: string; element: HTMLElement }[] = [];
    sections.forEach(sec => {
      const el = findElementForSection(sec);
      if (el) {
        sectionElements.push({ id: sec.id, element: el });
      }
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const matched = sectionElements.find(s => s.element === entry.target);
            if (matched) {
              setActiveId(matched.id);
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
      }
    );

    sectionElements.forEach(s => observer.observe(s.element));

    // Scroll listener fallback for rapid scrolling
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.element && item.element.offsetTop <= scrollPos) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  // Sliding window calculations: Maximum 8 markers on desktop, 6 on mobile
  const maxVisible = isMobile ? 6 : 8;
  const totalSections = sections.length;

  const { visibleSections, hasTopMore, hasBottomMore, startIndex } = useMemo(() => {
    if (totalSections <= maxVisible) {
      return {
        visibleSections: sections,
        hasTopMore: false,
        hasBottomMore: false,
        startIndex: 0
      };
    }

    const activeIndex = Math.max(0, sections.findIndex(s => s.id === activeId));
    let start = activeIndex - Math.floor(maxVisible / 2);

    if (start < 0) {
      start = 0;
    } else if (start + maxVisible > totalSections) {
      start = totalSections - maxVisible;
    }

    const end = start + maxVisible;
    return {
      visibleSections: sections.slice(start, end),
      hasTopMore: start > 0,
      hasBottomMore: end < totalSections,
      startIndex: start
    };
  }, [sections, activeId, totalSections, maxVisible]);

  // Position the floating preview card beside hovered dash
  const updateCardPosition = useCallback((visibleIndex: number) => {
    const dashEl = dashRefs.current[visibleIndex];
    if (!dashEl) return;

    const rect = dashEl.getBoundingClientRect();
    const dashCenterY = rect.top + rect.height / 2;

    const cardHeight = cardRef.current ? cardRef.current.offsetHeight : 230;
    const viewportHeight = window.innerHeight;

    // Center card with dash, clamping inside viewport with safe header buffer
    const targetTop = dashCenterY - cardHeight / 2;
    const clampedTop = Math.max(76, Math.min(viewportHeight - cardHeight - 20, targetTop));

    setCardTop(clampedTop);
  }, []);

  const handleMouseEnterDash = (section: TimelineNavSection, visibleIndex: number) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHoveredSection(section);
    updateCardPosition(visibleIndex);
  };

  const handleMouseLeaveDash = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setHoveredSection(null);
    }, 140);
  };

  const handleMouseEnterCard = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseLeaveCard = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setHoveredSection(null);
    }, 140);
  };

  // Click to navigate to H2 section
  const handleNavigateToSection = (section: TimelineNavSection) => {
    setActiveId(section.id);
    setHoveredSection(null);

    const targetEl = findElementForSection(section);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
      window.history.replaceState(null, '', '#' + section.id);
    } catch {
      // Ignored in sandboxed environments
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, section: TimelineNavSection, visibleIdx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigateToSection(section);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = Math.min(visibleSections.length - 1, visibleIdx + 1);
      dashRefs.current[nextIdx]?.focus();
      handleMouseEnterDash(visibleSections[nextIdx], nextIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = Math.max(0, visibleIdx - 1);
      dashRefs.current[prevIdx]?.focus();
      handleMouseEnterDash(visibleSections[prevIdx], prevIdx);
    } else if (e.key === 'Escape') {
      setHoveredSection(null);
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav
      className={`dsa-vertical-timeline-nav ${className}`}
      aria-label="Table of Contents Navigation"
      ref={containerRef}
    >
      {/* Top Continuation Indicator when sections exist above visible window */}
      {hasTopMore && (
        <div
          className="timeline-continuation-dot top"
          title={`${startIndex} previous sections above`}
          aria-hidden="true"
        />
      )}

      {/* Fixed-Height Vertical Markers Container */}
      {visibleSections.map((section, idx) => {
        const isActive = activeId === section.id;
        const isHovered = hoveredSection?.id === section.id;

        return (
          <div key={section.id} className="timeline-marker-slot">
            <button
              type="button"
              ref={el => (dashRefs.current[idx] = el)}
              className={`timeline-marker-btn ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
              onClick={() => {
                if (isTouchDevice && hoveredSection?.id !== section.id) {
                  // On touch, tap reveals preview; second tap navigates
                  handleMouseEnterDash(section, idx);
                } else {
                  handleNavigateToSection(section);
                }
              }}
              onMouseEnter={() => handleMouseEnterDash(section, idx)}
              onMouseLeave={handleMouseLeaveDash}
              onFocus={() => handleMouseEnterDash(section, idx)}
              onBlur={handleMouseLeaveDash}
              onKeyDown={e => handleKeyDown(e, section, idx)}
              aria-label={`Section: ${section.title}`}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={0}
            >
              {/* Thin horizontal marker line */}
              <span className="timeline-marker-line" />
            </button>
          </div>
        );
      })}

      {/* Bottom Continuation Indicator when sections exist below visible window */}
      {hasBottomMore && (
        <div
          className="timeline-continuation-dot bottom"
          title={`${totalSections - (startIndex + maxVisible)} more sections below`}
          aria-hidden="true"
        />
      )}

      {/* Floating Context Preview Card (Preserves existing layout & density) */}
      {hoveredSection && (
        <aside
          ref={cardRef}
          className="timeline-preview-card"
          style={{ top: `${cardTop}px` }}
          onMouseEnter={handleMouseEnterCard}
          onMouseLeave={handleMouseLeaveCard}
          role="tooltip"
          aria-live="polite"
        >
          {/* Top Parent Context */}
          <div className="preview-card-meta">
            <span className="preview-card-parent">{hoveredSection.parentTitle}</span>
            {hoveredSection.badge && (
              <span className="preview-card-badge">{hoveredSection.badge}</span>
            )}
          </div>

          {/* Accent Tag / Category */}
          <div className="preview-card-tag-row">
            <span className="preview-card-tag">{hoveredSection.tag}</span>
          </div>

          {/* Section Heading Title */}
          <h4 className="preview-card-title">{hoveredSection.title}</h4>

          {/* Highlighted Observation Card Box */}
          {hoveredSection.highlightItem && (
            <div className="preview-card-highlight-box">
              <span className="highlight-text">{hoveredSection.highlightItem}</span>
            </div>
          )}

          {/* Key Observations / Subtopics List */}
          {hoveredSection.keyPoints.length > 0 && (
            <ul className="preview-card-points-list">
              {hoveredSection.keyPoints.map((point, pIdx) => (
                <li key={pIdx} className="preview-card-point-item">
                  <span className="point-number">{pIdx + 1}.</span>
                  <span className="point-text">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Card Footer Action: Jump Link */}
          <div
            className="preview-card-footer"
            onClick={() => handleNavigateToSection(hoveredSection)}
          >
            <span>Jump to Section</span>
            <ArrowUpRight size={13} className="footer-arrow-icon" />
          </div>
        </aside>
      )}
    </nav>
  );
};
