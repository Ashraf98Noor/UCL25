import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const Header: React.FC = () => {
  const { stats } = usePlayerStore();

  return (
    <header className="ucl-header bg-primary py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-bounce-slow">
              UEFA Champions League
            </h1>
            <p className="text-primary-foreground/80">
              2024/25 Season Statistics
            </p>
          </div>
          
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-muted rounded-lg p-4 text-center animate-pulse-subtle">
                <div className="text-2xl font-bold text-white">
                  {stats.totalPlayers}
                </div>
                <div className="text-sm text-primary-foreground/80">Players</div>
              </div>
              
              <div className="bg-primary-muted rounded-lg p-4 text-center animate-pulse-subtle">
                <div className="text-2xl font-bold text-white">
                  {stats.totalGoals}
                </div>
                <div className="text-sm text-primary-foreground/80">Goals</div>
              </div>
              
              <div className="bg-primary-muted rounded-lg p-4 text-center animate-pulse-subtle">
                <div className="text-2xl font-bold text-white">
                  {stats.totalAssists}
                </div>
                <div className="text-sm text-primary-foreground/80">Assists</div>
              </div>
              
              <div className="bg-primary-muted rounded-lg p-4 text-center animate-pulse-subtle">
                <div className="text-2xl font-bold text-white">
                  {Math.round(stats.averageAge)}
                </div>
                <div className="text-sm text-primary-foreground/80">Avg Age</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* UCL Stars Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="stars-pattern animate-pulse-subtle"></div>
      </div>
    </header>
  );
};

export default Header; 