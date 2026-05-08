import { Match, Sport } from '../types';

const API_BASE = (globalThis as any).__WG_API__ ?? '/api';

async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...init
  });
  return res.json();
}

export const bettingService = {
  async getMatches(_sport?: Sport | 'all'): Promise<Match[]> {
    const data = await api('/v1/markets');
    if (!data?.ok || !Array.isArray(data.markets)) return [];
    return data.markets.map((m: any) => ({
      id: m.id,
      sport: m.sport,
      tournament: 'Default',
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      startTime: new Date().toISOString(),
      status: 'live',
      score: { home: 0, away: 0 },
      markets: []
    }));
  },

  async getMatchById(id: string): Promise<Match | undefined> {
    const matches = await this.getMatches();
    return matches.find(m => m.id === id);
  },

  async updateMatch(_match: Match): Promise<void> {},

  async placeBet(betData: any): Promise<{ success: boolean; betId?: string; error?: string }> {
    const data = await api('/v1/bets/place', { method: 'POST', body: JSON.stringify(betData) });
    if (!data?.ok) return { success: false, error: data?.reason ?? 'FAILED' };
    return { success: true, betId: data.betId };
  },

  async getBetHistory(_filter: 'all' | 'open' | 'settled' = 'all'): Promise<any[]> {
    return [];
  },

  async getStatement(): Promise<any[]> {
    return [];
  }
};
