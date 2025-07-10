import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const Dashboard: React.FC = () => {
  const { stats } = usePlayerStore();

  if (!stats) {
    return null;
  }

  // Helper function to safely format numbers
  const formatNumber = (value: number | undefined | null, decimals: number = 1) => {
    if (value === undefined || value === null) return '0.0';
    return value.toFixed(decimals);
  };

  return (
    <div className="space-y-8">
      <h1 className="ucl-title text-2xl mb-8">UEFA Champions League Overview</h1>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="ucl-stats-card">
          <h3 className="text-white/70 text-sm">Total Players</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalPlayers}</p>
        </div>
        
        <div className="ucl-stats-card">
          <h3 className="text-white/70 text-sm">Total Goals</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalGoals}</p>
        </div>
        
        <div className="ucl-stats-card">
          <h3 className="text-white/70 text-sm">Total Assists</h3>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalAssists}</p>
        </div>
        
        <div className="ucl-stats-card">
          <h3 className="text-white/70 text-sm">Average Age</h3>
          <p className="text-3xl font-bold text-white mt-2">{formatNumber(stats.averageAge)}</p>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Scorers */}
        <div className="ucl-card p-8">
          <h2 className="ucl-section-title mb-8">Top Scorers</h2>
          <div className="space-y-6">
            {stats.topScorers.slice(0, 5).map((player, index) => (
              <div key={player.Player} className="flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                <div className="flex items-center space-x-6">
                  <div className="ucl-rank-badge">{index + 1}</div>
                  <div>
                    <p className="font-medium text-white">{player.Player}</p>
                    <p className="text-sm text-white/70">{player.Squad}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{player.Gls} goals</p>
                  <p className="text-sm text-white/70">
                    {formatNumber(player['Gls.1'], 2)} per 90
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Assisters */}
        <div className="ucl-card p-8">
          <h2 className="ucl-section-title mb-8">Top Assisters</h2>
          <div className="space-y-6">
            {stats.topAssisters.slice(0, 5).map((player, index) => (
              <div key={player.Player} className="flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                <div className="flex items-center space-x-6">
                  <div className="ucl-rank-badge">{index + 1}</div>
                  <div>
                    <p className="font-medium text-white">{player.Player}</p>
                    <p className="text-sm text-white/70">{player.Squad}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{player.Ast} assists</p>
                  <p className="text-sm text-white/70">
                    {formatNumber(player['Ast.1'], 2)} per 90
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competition Stats */}
      <div className="ucl-card p-8">
        <h2 className="ucl-section-title mb-8">Competition Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.teams.length}</div>
            <div className="text-sm text-white/70 mt-2">Teams</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.positions.length}</div>
            <div className="text-sm text-white/70 mt-2">Positions</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.nations.length}</div>
            <div className="text-sm text-white/70 mt-2">Nations</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.totalPlayers}</div>
            <div className="text-sm text-white/70 mt-2">Players</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 