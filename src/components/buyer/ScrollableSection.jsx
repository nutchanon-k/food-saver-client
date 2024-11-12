import React from 'react';
import { ChevronRight } from 'lucide-react';

const ScrollableSection = ({ 
  title, 
  children,
  showMoreLink,
  onShowMore 
}) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.1),0_2px_4px_-1px_rgba(22,163,74,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(22,163,74,0.2),0_4px_6px_-2px_rgba(22,163,74,0.1)] transform hover:-translate-y-0.5 transition-all duration-300 p-4 py-6 mb-6">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <ChevronRight color="#b5bbc5" />
        </div>
        {showMoreLink && (
          <button 
            onClick={onShowMore}
            className="text-green-600 hover:text-green-700"
          >
            ดูทั้งหมด
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default ScrollableSection