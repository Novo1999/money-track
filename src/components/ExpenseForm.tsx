import React, { useState } from 'react';
import { format } from 'date-fns';
import { Store } from 'tinybase';
import { PlusCircle } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../utils/constants';

interface ExpenseFormProps {
  store: Store;
  currentMonth: Date;
  expenseToEdit?: {
    id: string;
    date: string;
    category: string;
    description: string;
    amount: number;
  } | null;
  onCancel?: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  store, 
  currentMonth,
  expenseToEdit = null,
  onCancel
}) => {
  const [date, setDate] = useState(
    expenseToEdit ? expenseToEdit.date : format(currentMonth, 'yyyy-MM-dd')
  );
  const [category, setCategory] = useState(expenseToEdit?.category || 'other');
  const [description, setDescription] = useState(expenseToEdit?.description || '');
  const [amount, setAmount] = useState(expenseToEdit?.amount.toString() || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const parsedAmount = parseFloat(amount);
      
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert('Please enter a valid amount');
        setIsSubmitting(false);
        return;
      }
      
      if (!description.trim()) {
        alert('Please enter a description');
        setIsSubmitting(false);
        return;
      }
      
      if (expenseToEdit) {
        // Update existing expense
        store.setRow('expenses', expenseToEdit.id, {
          date,
          category,
          description,
          amount: parsedAmount
        });
      } else {
        // Add new expense
        const id = crypto.randomUUID();
        store.setRow('expenses', id, {
          date,
          category,
          description,
          amount: parsedAmount
        });
      }
      
      // Reset form
      if (!expenseToEdit) {
        setDescription('');
        setAmount('');
        setCategory('other');
      }
      
      // Call onCancel if editing
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      alert('Failed to save expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="What did you spend on?"
              required
            />
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (৳)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">৳</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            disabled={isSubmitting}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {expenseToEdit ? 'Update' : 'Add'} Expense
          </button>
        </div>
      </form>
    </div>
  );
};