import React from 'react';
import { usePlayerStore } from '../store/playerStore';

const Charts: React.FC = () => {
  const { stats } = usePlayerStore();

  if (!stats) {
    return null;
  }

  // Prepare data for charts
  const topScorersData = stats.topScorers.slice(0, 10).map(player => ({
    name: player.Player,
    value: player.Gls || 0,
    team: player.Squad,
    subValue: player['Gls.1'] || 0,
    subLabel: 'Goals per 90'
  }));

  const topAssistersData = stats.topAssisters.slice(0, 10).map(player => ({
    name: player.Player,
    value: player.Ast || 0,
    team: player.Squad,
    subValue: player['Ast.1'] || 0,
    subLabel: 'Assists per 90'
  }));

  const renderChart = (data: typeof topScorersData, title: string) => (
    <div className="ucl-card p-6">
      <h2 className="ucl-section-title mb-6">{title}</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-white/70 text-sm ml-2">({item.team})</span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">{item.value}</span>
                <span className="text-white/70 text-sm ml-2">
                  {item.subValue.toFixed(2)} {item.subLabel}
                </span>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/30 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="ucl-title text-2xl mb-8">Charts & Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderChart(topScorersData, "Top Scorers")}
        {renderChart(topAssistersData, "Top Assisters")}
      </div>

      {/* Additional Statistics */}
      <div className="ucl-card p-6">
        <h2 className="ucl-section-title mb-6">Competition Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.teams.length}</div>
            <div className="text-sm text-white/70">Teams</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.positions.length}</div>
            <div className="text-sm text-white/70">Positions</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.nations.length}</div>
            <div className="text-sm text-white/70">Nations</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.totalPlayers}</div>
            <div className="text-sm text-white/70">Players</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts; 