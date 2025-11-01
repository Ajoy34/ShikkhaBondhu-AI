import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { POINT_DESCRIPTIONS, PointAction } from '../utils/pointsSystem';

interface PointsToastProps {
  points: number;
  action: PointAction;
  onClose: () => void;
}

const PointsToast: React.FC<PointsToastProps> = ({ points, action, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const description = POINT_DESCRIPTIONS[action];

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl p-4 min-w-[300px] border-2 border-white animate-bounce">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-7 h-7 text-yellow-600 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-white font-black text-lg">+{points} Points!</p>
            <p className="text-yellow-50 text-sm font-semibold">{description.en}</p>
            <p className="text-yellow-100 text-xs font-bangla">{description.bn}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white hover:text-yellow-100 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointsToast;
