import React, { useMemo } from 'react';
import { PieChart, DollarSign, ArrowDown, ArrowUp } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../utils/constants';

interface MonthSummaryProps {
  totalSpent: number;
  expenses: any[];
}

export const MonthSummary: React.FC<MonthSummaryProps> = ({ totalSpent, expenses }) => {
  // Format the total amount
  const formattedTotal = new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    currencyDisplay: 'narrowSymbol'
  }).format(totalSpent);
  
  // Calculate category totals
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    
    expenses.forEach((expense) => {
      const { category, amount } = expense;
      totals[category] = (totals[category] || 0) + Number(amount);
    });
    
    // Sort by amount (highest first)
    return Object.entries(totals)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .map(([category, amount]) => ({
        category,
        amount: amount as number,
        percentage: Math.round(((amount as number) / totalSpent) * 100) || 0,
      }));
  }, [expenses, totalSpent]);
  
  // Find the category with the highest spending
  const highestCategory = useMemo(() => {
    if (categoryTotals.length === 0) return null;
    return categoryTotals[0];
  }, [categoryTotals]);
  
  // Get category label from value
  const getCategoryLabel = (value: string) => {
    const category = EXPENSE_CATEGORIES.find(cat => cat.value === value);
    return category ? category.label : value;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <PieChart className="mr-2 h-5 w-5 text-blue-500" />
        Monthly Summary
      </h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">Total Spent</div>
        </div>
        <div className="mt-1 flex items-baseline">
          <div className="text-3xl font-semibold text-blue-600">
            {formattedTotal}
          </div>
        </div>
      </div>
      
      {highestCategory && (
        <div className="mb-6 p-3 bg-blue-50 rounded-md">
          <div className="text-sm font-medium text-gray-700">
            Highest spending:
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="font-medium">
              {getCategoryLabel(highestCategory.category)}
            </div>
            <div className="text-blue-700 font-semibold">
              {new Intl.NumberFormat('bn-BD', {
                style: 'currency',
                currency: 'BDT',
                currencyDisplay: 'narrowSymbol'
              }).format(highestCategory.amount)}
            </div>
          </div>
        </div>
      )}
      
      {categoryTotals.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Spending by Category
          </h3>
          <ul className="space-y-3">
            {categoryTotals.map(({ category, amount, percentage }) => (
              <li key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-800">
                    {getCategoryLabel(category)}
                  </span>
                  <span className="text-gray-600">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <div className="text-gray-500">Number of expenses</div>
          <div className="font-medium text-gray-900">{expenses.length}</div>
        </div>
        {expenses.length > 0 && (
          <div className="flex justify-between text-sm mt-2">
            <div className="text-gray-500">Average expense</div>
            <div className="font-medium text-gray-900">
              {new Intl.NumberFormat('bn-BD', {
                style: 'currency',
                currency: 'BDT',
                currencyDisplay: 'narrowSymbol'
              }).format(totalSpent / expenses.length)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};