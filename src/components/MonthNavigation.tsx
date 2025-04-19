import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthNavigationProps {
  formattedMonth: string;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  isNextMonthDisabled: boolean;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({
  formattedMonth,
  goToPreviousMonth,
  goToNextMonth,
  isNextMonthDisabled
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
        {formattedMonth}
      </h2>
      <div className="flex space-x-2">
        <button
          onClick={goToPreviousMonth}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        <button
          onClick={goToNextMonth}
          disabled={isNextMonthDisabled}
          className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white transition duration-150 ease-in-out ${
            isNextMonthDisabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
          aria-label="Next month"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};