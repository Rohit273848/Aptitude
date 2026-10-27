export type TopicStatus = 'ready' | 'needed';

export interface Topic {
  id: string;
  title: string;
  status: TopicStatus;
  noteFile?: string;
  tag?: string; // e.g. "Not asked in past two years"
  summary?: string;
  formulaCount?: number;
  exampleCount?: number;
}

export interface TopicGroup {
  id: string;
  title: string;
  topics: Topic[];
}

export interface SubjectArea {
  id: string;
  title: string;
  section: 'Foundation' | 'Advance';
  difficulty: 'Easy–Medium' | 'Medium' | 'Hard';
  description: string;
  groups: TopicGroup[];
}

export interface BreadcrumbItem {
  label: string;
  id?: string;
  type?: 'home' | 'subject' | 'group' | 'topic';
}
