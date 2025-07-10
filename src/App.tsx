import React, { useState, useEffect } from 'react';
import { usePlayerStore } from './store/playerStore';
import { loadCSVData } from './services/csvService';
import Dashboard from './components/Dashboard';
import PlayerTable from './components/PlayerTable';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Charts from './components/Charts';
import './index.css';

type ViewType = 'dashboard' | 'charts' | 'table';

const App: React.FC = () => {
  const { setPlayers, setLoading, setError, isLoading, error } = usePlayerStore();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const players = await loadCSVData();
        setPlayers(players);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setPlayers, setLoading, setError]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="ucl-loading mx-auto"></div>
          <p className="mt-4 text-lg text-white">Loading UCL statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error Loading Data</h1>
          <p className="text-white/70">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="ucl-button mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'charts' && <Charts />}
        {currentView === 'table' && <PlayerTable />}
      </main>
    </div>
  );
};

export default App; 