export type Sport = 'cricket' | 'football' | 'tennis' | 'volleyball';

export type UserRole = 'user' | 'superadmin' | 'senior_admin' | 'agent' | 'readonly_admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  balance: number;
  bettingEnabled: boolean;
  status: 'active' | 'suspended' | 'banned';
}

export interface Selection {
  id: string;
  name: string;
  odds: number;
}

export interface Market {
  id: string;
  name: string;
  type: string;
  status: 'open' | 'suspended' | 'settled';
  selections: Selection[];
}

export interface Match {
  id: string;
  sport: Sport;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'completed';
  score?: {
    home: number;
    away: number;
    extra?: any; // Cricket overs, etc.
  };
  markets: Market[];
}

export interface Bet {
  id: string;
  userId: string;
  type: 'single' | 'accumulator';
  status: 'open' | 'settled' | 'void' | 'pending_settlement';
  outcome?: 'win' | 'loss' | 'cashout' | 'push' | 'void';
  stake: number;
  potentialPayout: number;
  odds: number;
  placedAt: string;
  selections: Array<{
    matchId: string;
    marketId: string;
    selectionId: string;
    selectionName: string;
    oddsAtPlacement: number;
  }>;
}

export interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  timestamp: string;
  note?: string;
}
