import { Match, Sport } from './types';

const INITIAL_MATCHES: Match[] = [
  {
    id: 'm1',
    sport: 'cricket',
    league: 'Indian Premier League',
    homeTeam: 'Mumbai Indians',
    awayTeam: 'Chennai Super Kings',
    startTime: new Date().toISOString(),
    status: 'live',
    score: { home: 184, away: 120, extra: { overs: '14.2', wickets: 3 } },
    markets: [
      {
        id: 'mk1',
        name: 'Match Winner',
        type: 'winner',
        status: 'open',
        selections: [
          { id: 's1', name: 'Mumbai Indians', odds: 1.45 },
          { id: 's2', name: 'Chennai Super Kings', odds: 2.80 }
        ]
      },
      {
        id: 'mk2',
        name: 'Total Runs (Over 16.5)',
        type: 'over_under',
        status: 'open',
        selections: [
          { id: 's3', name: 'Over 210.5', odds: 1.90 },
          { id: 's4', name: 'Under 210.5', odds: 1.90 }
        ]
      }
    ]
  },
  {
    id: 'm2',
    sport: 'football',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    startTime: new Date().toISOString(),
    status: 'live',
    score: { home: 2, away: 1 },
    markets: [
      {
        id: 'mk3',
        name: 'Full Time Result',
        type: 'winner',
        status: 'open',
        selections: [
          { id: 's5', name: 'Man City', odds: 1.25 },
          { id: 's6', name: 'Draw', odds: 4.50 },
          { id: 's7', name: 'Liverpool', odds: 7.00 }
        ]
      }
    ]
  },
  {
    id: 'm3',
    sport: 'tennis',
    league: 'Wimbledon',
    homeTeam: 'Carlos Alcaraz',
    awayTeam: 'Novak Djokovic',
    startTime: new Date().toISOString(),
    status: 'live',
    score: { home: 2, away: 1, extra: { currentSet: '4-3' } },
    markets: [
      {
        id: 'mk4',
        name: 'Match Winner',
        type: 'winner',
        status: 'open',
        selections: [
          { id: 's8', name: 'Alcaraz', odds: 1.60 },
          { id: 's9', name: 'Djokovic', odds: 2.30 }
        ]
      }
    ]
  }
];

export const getMatches = (): Match[] => {
  const stored = localStorage.getItem('wg_matches');
  const matches: Match[] = stored ? JSON.parse(stored) : INITIAL_MATCHES;
  
  // Dynamic Simulation
  const updated = matches.map(m => {
    if (m.status === 'live') {
      // Small chance to update score
      if (Math.random() > 0.8) {
        if (m.sport === 'cricket') {
          m.score!.home += Math.floor(Math.random() * 5);
          const currentOvers = parseFloat(m.score!.extra!.overs);
          m.score!.extra!.overs = (currentOvers + 0.1).toFixed(1);
          if (m.score!.extra!.overs.endsWith('.6')) {
            m.score!.extra!.overs = (Math.floor(currentOvers) + 1).toFixed(1);
          }
        } else if (m.sport === 'football') {
          if (Math.random() > 0.5) m.score!.home += 1;
          else m.score!.away += 1;
        }
      }

      // Small chance for odds to shift
      m.markets = m.markets.map(mk => ({
        ...mk,
        selections: mk.selections.map(sel => ({
          ...sel,
          odds: Math.max(1.01, +(sel.odds + (Math.random() * 0.1 - 0.05)).toFixed(2))
        }))
      }));
    }
    return m;
  });

  localStorage.setItem('wg_matches', JSON.stringify(updated));
  return updated;
};

export const updateMatch = (match: Match) => {
  const matches = getMatches();
  const index = matches.findIndex(m => m.id === match.id);
  if (index !== -1) {
    matches[index] = match;
    localStorage.setItem('wg_matches', JSON.stringify(matches));
  }
};
