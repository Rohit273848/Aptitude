export interface DSATopicMetadata {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: 'Easy' | 'Easy-Medium' | 'Medium' | 'Medium-Hard' | 'Hard';
  estimatedTime?: string;
  problemsCovered?: number;
  tags?: string[];
  noteFile?: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface DryRunStep {
  step: number;
  label: string;
  currentIndex?: number;
  currentValue?: number | string;
  condition?: string;
  state?: Record<string, string | number | boolean>;
  explanation: string;
  isSuccess?: boolean;
  isFailure?: boolean;
}

export interface DryRunScenario {
  id: string;
  title: string;
  description: string;
  inputDescription: string;
  target?: string | number;
  steps: DryRunStep[];
  finalResult: string;
  isSuccess: boolean;
}

export interface ComplexityInfo {
  timeComplexity: string;
  spaceComplexity: string;
  timeExplanation: string;
  spaceExplanation: string;
  bestCase?: string;
  averageCase?: string;
  worstCase?: string;
}

export interface ProblemData {
  id: string;
  title: string;
  platform?: string;
  problemNumber?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  statement?: string;
  intuition?: string;
  steps?: string[];
  pseudocode?: string;
  javaCode?: string;
  cppCode?: string;
  pythonCode?: string;
  dryRun?: DryRunScenario;
  complexity?: ComplexityInfo;
  observations?: string[];
}
