export type SportType = 'cricket' | 'football' | 'tennis' | 'volleyball';

export interface UserRiskProfile {
  userId: string;
  maxBet: number;
  maxBetPerDay: number;
  maxWinPerDay: number;
  allowedSports: SportType[];
}
