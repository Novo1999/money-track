import React from 'react';
import { MoneyTracker } from './components/MoneyTracker';
import { StoreProvider } from './store/StoreContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
            <span className="text-blue-500 mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-wallet"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 7v13a2 2 0 0 0 2 2h16v-5" />
                <path d="M16 16h6" />
                <path d="M19 19v-6" />
              </svg>
            </span>
            MoneyTrack
          </h1>
        </div>
      </header>
      
      <StoreProvider>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MoneyTracker />
        </main>
      </StoreProvider>
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} MoneyTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;