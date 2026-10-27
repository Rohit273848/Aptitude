import React from 'react';
import { BreadcrumbItem } from '../types/syllabus';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (type: 'home' | 'subject' | 'topic', id?: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="breadcrumb-bar" aria-label="Syllabus Breadcrumb Navigation">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
            {isLast ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                className="breadcrumb-link"
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
                onClick={() => {
                  if (item.type === 'home') onNavigate('home');
                  else if (item.type === 'subject') onNavigate('subject', item.id);
                  else if (item.type === 'topic') onNavigate('topic', item.id);
                }}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
