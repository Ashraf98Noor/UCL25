export interface Player {
  Player: string;
  Nation: string;
  Pos: string;
  Squad: string;
  Age: number;
  Born: number;
  MP: number;
  Starts: number;
  Min: number;
  '90s': number;
  Gls: number;
  Ast: number;
  'G+A': number;
  'G-PK': number;
  PK: number;
  PKatt: number;
  CrdY: number;
  CrdR: number;
  'Gls.1': number;
  'Ast.1': number;
  'G+A.1': number;
  'G-PK.1': number;
  xG: number;
  npxG: number;
  xAG: number;
  'xG.1': number;
  'xAG.1': number;
  PrgC: number;
  PrgP: number;
  // Additional stats
  Sh: number;
  SoT: number;
  Cmp: number;
  Att: number;
  Tkl: number;
  Int: number;
  Blocks: number;
  Fls: number;
}

export interface FilterState {
  search: string;
  position: string;
  team: string;
  nation: string;
  minGoals: number;
  minAssists: number;
  minMinutes: number;
}

export interface SortState {
  field: keyof Player;
  direction: 'asc' | 'desc';
}

export interface PlayerStats {
  totalPlayers: number;
  totalGoals: number;
  totalAssists: number;
  averageAge: number;
  topScorers: Player[];
  topAssisters: Player[];
  teams: string[];
  positions: string[];
  nations: string[];
} 