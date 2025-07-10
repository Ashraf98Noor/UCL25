import React from 'react';
import { useState, useCallback } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Player } from '../types/player';

const PlayerTable: React.FC = () => {
  const { 
    filteredPlayers, 
    stats, 
    filters, 
    sort, 
    setFilters, 
    setSort, 
    resetFilters 
  } = usePlayerStore();
  
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Helper function to safely format numbers
  const formatNumber = (value: number | undefined | null, decimals: number = 2) => {
    if (value === undefined || value === null) return '0.00';
    return value.toFixed(decimals);
  };

  const toggleRow = useCallback((playerName: string) => {
    console.log('Before toggle - Expanded rows:', Array.from(expandedRows));
    setExpandedRows(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(playerName)) {
        newExpanded.delete(playerName);
      } else {
        newExpanded.add(playerName);
      }
      console.log('After toggle - New expanded rows:', Array.from(newExpanded));
      return newExpanded;
    });
  }, [expandedRows]);

  const handleSort = useCallback((field: keyof Player) => {
    console.log('Sorting by:', field, 'Current sort:', sort);
    const newDirection = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    console.log('New sort direction:', newDirection);
    setSort({ field, direction: newDirection });
  }, [sort, setSort]);

  const handleFilterChange = useCallback((key: keyof typeof filters, value: string | number) => {
    console.log('Filter change - Key:', key, 'Value:', value, 'Current filters:', filters);
    const newFilters = { ...filters, [key]: value };
    console.log('New filters:', newFilters);
    setFilters(newFilters);
  }, [filters, setFilters]);

  const handleReset = useCallback(() => {
    console.log('Resetting filters');
    resetFilters();
    setExpandedRows(new Set());
  }, [resetFilters]);

  const getSortIcon = useCallback((field: keyof Player) => {
    if (sort.field !== field) return '↕️';
    return sort.direction === 'asc' ? '↑' : '↓';
  }, [sort]);

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-xl font-semibold text-foreground mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search players, teams, nations..."
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Position
            </label>
            <select
              value={filters.position}
              onChange={(e) => handleFilterChange('position', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">All Positions</option>
              {stats.positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Team
            </label>
            <select
              value={filters.team}
              onChange={(e) => handleFilterChange('team', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">All Teams</option>
              {stats.teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nation
            </label>
            <select
              value={filters.nation}
              onChange={(e) => handleFilterChange('nation', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">All Nations</option>
              {stats.nations.map(nation => (
                <option key={nation} value={nation}>{nation}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Min Goals
            </label>
            <input
              type="number"
              value={filters.minGoals}
              onChange={(e) => handleFilterChange('minGoals', parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Min Assists
            </label>
            <input
              type="number"
              value={filters.minAssists}
              onChange={(e) => handleFilterChange('minAssists', parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Min Minutes
            </label>
            <input
              type="number"
              value={filters.minMinutes}
              onChange={(e) => handleFilterChange('minMinutes', parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-primary p-4 rounded-lg border border-primary-muted">
        <p className="text-primary-foreground">
          Showing {filteredPlayers.length} of {stats.totalPlayers} players
        </p>
      </div>

      {/* Player Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-foreground">
                  Actions
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary-muted"
                  onClick={() => handleSort('Player')}
                >
                  Player {getSortIcon('Player')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary-muted"
                  onClick={() => handleSort('Squad')}
                >
                  Team {getSortIcon('Squad')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary-muted"
                  onClick={() => handleSort('Pos')}
                >
                  Position {getSortIcon('Pos')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary-muted"
                  onClick={() => handleSort('Born')}
                >
                  Age {getSortIcon('Born')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary-muted"
                  onClick={() => handleSort('Min')}
                >
                  Minutes {getSortIcon('Min')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary-muted"
                  onClick={() => handleSort('Gls')}
                >
                  Goals {getSortIcon('Gls')}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary-muted"
                  onClick={() => handleSort('Ast')}
                >
                  Assists {getSortIcon('Ast')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <React.Fragment key={`${player.Player}-${player.Squad}`}>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleRow(player.Player)}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm"
                      >
                        {expandedRows.has(player.Player) ? 'Hide' : 'Details'}
                      </button>
                    </td>
                    <td className="px-4 py-3">{player.Player}</td>
                    <td className="px-4 py-3">{player.Squad}</td>
                    <td className="px-4 py-3">{player.Pos}</td>
                    <td className="px-4 py-3">{2024 - player.Born}</td>
                    <td className="px-4 py-3">{player.Min || 0}</td>
                    <td className="px-4 py-3">{player.Gls || 0}</td>
                    <td className="px-4 py-3">{player.Ast || 0}</td>
                  </tr>
                  {expandedRows.has(player.Player) && (
                    <tr className="bg-muted/30">
                      <td colSpan={8} className="px-4 py-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <h4 className="font-medium">Basic Info</h4>
                            <p>Matches: {player.MP || 0}</p>
                            <p>Starts: {player.Starts || 0}</p>
                            <p>Minutes per Match: {(() => {
                              const minutes = player.Min || 0;
                              const matches = player.MP || 1;
                              const result = minutes / matches;
                              if (player.Player === 'Raphinha') {
                                console.log('Raphinha stats:', {
                                  minutes,
                                  matches,
                                  result,
                                  rawMin: player.Min,
                                  rawMP: player.MP,
                                  player
                                });
                              }
                              return formatNumber(result);
                            })()}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Goals & Assists</h4>
                            <p>Goals: {player.Gls || 0}</p>
                            <p>Assists: {player.Ast || 0}</p>
                            <p>G+A: {player['G+A'] || 0}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Per 90 Stats</h4>
                            <p>Goals/90: {(() => {
                              const goals90 = player.Gls / (player['90s'] || 1);
                              if (player.Player === 'Raphinha') {
                                console.log('Raphinha per 90 stats:', {
                                  goals: player.Gls,
                                  minutes90: player['90s'],
                                  goals90
                                });
                              }
                              return formatNumber(goals90);
                            })()}</p>
                            <p>Assists/90: {formatNumber(player.Ast / (player['90s'] || 1))}</p>
                            <p>G+A/90: {formatNumber((player.Gls + player.Ast) / (player['90s'] || 1))}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Expected Stats</h4>
                            <p>xG: {formatNumber(player.xG || 0)}</p>
                            <p>xAG: {formatNumber(player.xAG || 0)}</p>
                            <p>npxG: {formatNumber(player.npxG || 0)}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerTable; 