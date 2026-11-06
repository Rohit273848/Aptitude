import React from 'react';
import { KaTeXMath } from '../KaTeXMath';
import { Clock, HardDrive, Info, Zap } from 'lucide-react';

interface ComplexityCardProps {
  timeComplexity: string;
  spaceComplexity: string;
  timeExplanation?: string;
  spaceExplanation?: string;
  bestCase?: string;
  worstCase?: string;
}

export const ComplexityCard: React.FC<ComplexityCardProps> = ({
  timeComplexity,
  spaceComplexity,
  timeExplanation,
  spaceExplanation,
  bestCase,
  worstCase
}) => {
  return (
    <div className="dsa-complexity-container">
      <div className="dsa-complexity-card time-card">
        <div className="dsa-complexity-top">
          <div className="dsa-complexity-icon-wrap time">
            <Clock size={16} />
          </div>
          <div className="dsa-complexity-label">Time Complexity</div>
        </div>
        <div className="dsa-complexity-value">
          <KaTeXMath math={timeComplexity} />
        </div>
        {timeExplanation && <p className="dsa-complexity-desc">{timeExplanation}</p>}
        {(bestCase || worstCase) && (
          <div className="dsa-complexity-cases">
            {bestCase && (
              <span className="case-pill">
                Best: <KaTeXMath math={bestCase} />
              </span>
            )}
            {worstCase && (
              <span className="case-pill">
                Worst: <KaTeXMath math={worstCase} />
              </span>
            )}
          </div>
        )}
      </div>

      <div className="dsa-complexity-card space-card">
        <div className="dsa-complexity-top">
          <div className="dsa-complexity-icon-wrap space">
            <HardDrive size={16} />
          </div>
          <div className="dsa-complexity-label">Auxiliary Space</div>
        </div>
        <div className="dsa-complexity-value">
          <KaTeXMath math={spaceComplexity} />
        </div>
        {spaceExplanation && <p className="dsa-complexity-desc">{spaceExplanation}</p>}
        <div className="dsa-complexity-cases">
          <span className="case-pill in-place">
            <Zap size={11} /> {spaceComplexity.includes('1') ? 'In-Place Invariant' : 'Standard Memory'}
          </span>
        </div>
      </div>
    </div>
  );
};
