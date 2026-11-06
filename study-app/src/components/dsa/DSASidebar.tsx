import React from 'react';
import { TableOfContents, TOCItem } from './TableOfContents';

interface DSASidebarProps {
  items: TOCItem[];
  activeId: string;
  onSelectItem: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DSASidebar: React.FC<DSASidebarProps> = props => {
  return <TableOfContents {...props} />;
};
