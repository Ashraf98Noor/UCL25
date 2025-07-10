import { create } from 'zustand';
import { Player, FilterState, SortState, PlayerStats } from '../types/player';

interface PlayerStore {
  players: Player[];
  filteredPlayers: Player[];
  filters: FilterState;
  sort: SortState;
  stats: PlayerStats | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPlayers: (players: Player[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSort: (sort: SortState) => void;
  resetFilters: () => void;
  calculateStats: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  applyFiltersAndSort: () => void;
}

const initialFilters: FilterState = {
  search: '',
  position: '',
  team: '',
  nation: '',
  minGoals: 0,
  minAssists: 0,
  minMinutes: 0,
};

const initialSort: SortState = {
  field: 'Gls',
  direction: 'desc',
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  players: [],
  filteredPlayers: [],
  filters: initialFilters,
  sort: initialSort,
  stats: null,
  isLoading: false,
  error: null,

  setPlayers: (players) => {
    console.log('Setting players:', players.length);
    // Log Raphinha's data if present
    const raphinha = players.find(p => p.Player === 'Raphinha');
    if (raphinha) {
      console.log('Raphinha data in store:', raphinha);
    }
    set({ players });
    get().calculateStats();
    get().applyFiltersAndSort();
  },

  setFilters: (newFilters) => {
    console.log('Setting filters - Current:', get().filters, 'New:', newFilters);
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFiltersAndSort();
  },

  setSort: (newSort) => {
    console.log('Setting sort - Current:', get().sort, 'New:', newSort);
    set({ sort: newSort });
    get().applyFiltersAndSort();
  },

  resetFilters: () => {
    console.log('Resetting filters and sort to initial state');
    set({ 
      filters: initialFilters,
      sort: initialSort
    });
    get().applyFiltersAndSort();
  },

  applyFiltersAndSort: () => {
    const { players, filters, sort } = get();
    console.log('Applying filters and sort:', { filters, sort });
    
    let filtered = [...players].filter(player => {
      const searchTerm = filters.search.toLowerCase().trim();
      const playerName = player.Player.toLowerCase();
      const squad = player.Squad.toLowerCase();
      const nation = player.Nation.toLowerCase();
      const position = player.Pos.toLowerCase();

      // Search filter
      const matchesSearch = !searchTerm || 
        playerName.includes(searchTerm) ||
        squad.includes(searchTerm) ||
        nation.includes(searchTerm) ||
        position.includes(searchTerm);

      // Position filter
      const matchesPosition = !filters.position || player.Pos === filters.position;

      // Team filter
      const matchesTeam = !filters.team || player.Squad === filters.team;

      // Nation filter
      const matchesNation = !filters.nation || player.Nation === filters.nation;

      // Numeric filters
      const matchesMinGoals = (player.Gls || 0) >= filters.minGoals;
      const matchesMinAssists = (player.Ast || 0) >= filters.minAssists;
      const matchesMinMinutes = (player.Min || 0) >= filters.minMinutes;

      const matches = matchesSearch && 
                     matchesPosition && 
                     matchesTeam && 
                     matchesNation && 
                     matchesMinGoals && 
                     matchesMinAssists && 
                     matchesMinMinutes;

      if (!matches) {
        console.log('Player filtered out:', player.Player, {
          searchTerm,
          matchesSearch,
          matchesPosition,
          matchesTeam,
          matchesNation,
          matchesMinGoals,
          matchesMinAssists,
          matchesMinMinutes
        });
      }

      return matches;
    });

    // Sort the filtered results
    console.log('Sorting by field:', sort.field, 'direction:', sort.direction);
    filtered.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      // Special handling for age sorting (Born field)
      if (sort.field === 'Born') {
        const aAge = 2024 - (aValue as number);
        const bAge = 2024 - (bValue as number);
        return sort.direction === 'asc' ? aAge - bAge : bAge - aAge;
      }
      
      // Handle string values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle numeric values
      const aNum = typeof aValue === 'number' ? aValue : parseFloat(aValue as string) || 0;
      const bNum = typeof bValue === 'number' ? bValue : parseFloat(bValue as string) || 0;
      
      return sort.direction === 'asc' ? aNum - bNum : bNum - aNum;
    });

    console.log('Filtered players count:', filtered.length);
    set({ filteredPlayers: filtered });
  },

  calculateStats: () => {
    const { players } = get();
    
    if (players.length === 0) {
      set({ stats: null });
      return;
    }

    const totalPlayers = players.length;
    const totalGoals = players.reduce((sum, player) => sum + (player.Gls || 0), 0);
    const totalAssists = players.reduce((sum, player) => sum + (player.Ast || 0), 0);
    const averageAge = players.reduce((sum, player) => sum + (2024 - player.Born), 0) / totalPlayers;
    
    const topScorers = [...players]
      .sort((a, b) => (b.Gls || 0) - (a.Gls || 0))
      .slice(0, 10);
    
    const topAssisters = [...players]
      .sort((a, b) => (b.Ast || 0) - (a.Ast || 0))
      .slice(0, 10);
    
    const teams = [...new Set(players.map(p => p.Squad))].sort();
    const positions = [...new Set(players.map(p => p.Pos))].sort();
    const nations = [...new Set(players.map(p => p.Nation))].sort();

    const stats: PlayerStats = {
      totalPlayers,
      totalGoals,
      totalAssists,
      averageAge,
      topScorers,
      topAssisters,
      teams,
      positions,
      nations,
    };

    set({ stats });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})); 