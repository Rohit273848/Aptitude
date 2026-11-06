import React from 'react';
import { BreadcrumbItem } from '../types/syllabus';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (type: 'home' | 'subject' | 'topic', id?: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="breadcrumb-bar" aria-label="Syllabus Breadcrumb Navigation">
      <div className="breadcrumb-inner-scroll">
        {items.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === items.length - 1;

          return (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <ChevronRight size={13} className="breadcrumb-separator" aria-hidden="true" />
              )}

              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  className="breadcrumb-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (item.type === 'home') onNavigate('home');
                    else if (item.type === 'subject') onNavigate('subject', item.id);
                    else if (item.type === 'topic') onNavigate('topic', item.id);
                  }}
                >
                  {isFirst && <Home size={13} style={{ marginBottom: '1px' }} />}
                  <span>{item.label}</span>
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
