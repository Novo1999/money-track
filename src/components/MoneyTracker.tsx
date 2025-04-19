import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, parseISO, isAfter } from 'date-fns';
import { useStore } from '../store/StoreContext';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { MonthNavigation } from './MonthNavigation';
import { MonthSummary } from './MonthSummary';

export const MoneyTracker: React.FC = () => {
  const { store } = useStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [expenses, setExpenses] = useState<any[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  
  // Get the start and end dates for the current month
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  
  // Format the current month for display
  const formattedMonth = format(currentMonth, 'MMMM yyyy');
  
  // Check if next month navigation should be disabled
  const isNextMonthDisabled = isAfter(endDate, new Date());
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };
  
  // Navigate to next month (only if not beyond current month)
  const goToNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (!isAfter(nextMonth, new Date())) {
      setCurrentMonth(nextMonth);
    }
  };
  
  // Load expenses for the current month
  useEffect(() => {
    const handleStoreChange = () => {
      const allExpenses = store.getTable('expenses');
      if (!allExpenses) return;
      
      // Filter expenses for the current month
      const filteredExpenses = Object.entries(allExpenses)
        .map(([id, expense]) => ({ id, ...expense }))
        .filter(expense => {
          const expenseDate = parseISO(expense.date);
          return expenseDate >= startDate && expenseDate <= endDate;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setExpenses(filteredExpenses);
      
      // Calculate total spent
      const total = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
      setTotalSpent(total);
    };
    
    // Initial load
    handleStoreChange();
    
    // Listen for changes
    const listener = store.addTableListener('expenses', handleStoreChange);

  }, [store, startDate, endDate]);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <MonthNavigation 
        formattedMonth={formattedMonth} 
        goToPreviousMonth={goToPreviousMonth} 
        goToNextMonth={goToNextMonth}
        isNextMonthDisabled={isNextMonthDisabled}
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ExpenseForm store={store} currentMonth={currentMonth} />
          <ExpenseList 
            expenses={expenses} 
            store={store} 
            currentMonth={currentMonth} 
          />
        </div>
        
        <div className="md:col-span-1">
          <MonthSummary 
            totalSpent={totalSpent} 
            expenses={expenses} 
          />
        </div>
      </div>
    </div>
  );
};