import React from 'react';
import { Dispatch, SetStateAction } from 'react';

type ViewType = 'dashboard' | 'charts' | 'table';

interface NavigationProps {
  currentView: ViewType;
  setCurrentView: Dispatch<SetStateAction<ViewType>>;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-[#00235F]/60 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              currentView === 'dashboard'
                ? 'text-white border-b-2 border-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('charts')}
            className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              currentView === 'charts'
                ? 'text-white border-b-2 border-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Charts
          </button>
          <button
            onClick={() => setCurrentView('table')}
            className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              currentView === 'table'
                ? 'text-white border-b-2 border-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Players
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 