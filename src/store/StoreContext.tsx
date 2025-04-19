
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createStore, Store } from 'tinybase';

// Define the shape of our store context
interface StoreContextType {
  store: Store;
}

// Create context with a placeholder value
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Provider component that wraps app
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storeInstance] = useState(() => {
    // Initialize store
    const store = createStore();
    
    // Create tables
    store.setTablesSchema({
      expenses: {
        id: { type: 'string' },
        date: { type: 'string' },
        category: { type: 'string' },
        description: { type: 'string' },
        amount: { type: 'number' },
      }
    });
    
    // Load data from localStorage if available
    try {
      const savedData = localStorage.getItem('moneyTrackerData');
      if (savedData) {
        store.setJson(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
    
    return store;
  });
  
  // Save to localStorage when store changes
  useEffect(() => {
    const listener = storeInstance.addListener(() => {
      try {
        localStorage.setItem('moneyTrackerData', JSON.stringify(storeInstance.getJson()));
      } catch (error) {
        console.error('Failed to save data to localStorage:', error);
      }
    });
    
  }, [storeInstance]);
  
  return (
    <StoreContext.Provider value={{ store: storeInstance }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store
export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};