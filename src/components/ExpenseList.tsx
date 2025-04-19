import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Store } from 'tinybase';
import { Edit2, Trash2, Info } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';
import { getCategoryIcon } from '../utils/categoryIcons';

interface ExpenseListProps {
  expenses: any[];
  store: Store;
  currentMonth: Date;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, store, currentMonth }) => {
  const [editingExpense, setEditingExpense] = useState<any>(null);
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      store.delRow('expenses', id);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      currencyDisplay: 'narrowSymbol'
    }).format(amount);
  };
  
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
        <Info className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No expenses</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start adding expenses to track your spending.
        </p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        This Month's Expenses
      </h2>
      
      {editingExpense && (
        <div className="mb-6">
          <ExpenseForm
            store={store}
            currentMonth={currentMonth}
            expenseToEdit={editingExpense}
            onCancel={() => setEditingExpense(null)}
          />
        </div>
      )}
      
      <div className="bg-white shadow-sm overflow-hidden sm:rounded-md border border-gray-100">
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li 
              key={expense.id}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {expense.description}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="mr-2">
                        {format(parseISO(expense.date), 'MMM d, yyyy')}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-6 text-sm font-semibold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingExpense(expense)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Edit expense"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete expense"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};