export type AppleTone = 'red' | 'gold' | 'green';

export type Apple = {
  id: string;
  name: string;
  aliases: string[];
  origin: string;
  season: string;
  traits: string[];
  description: string;
  tone: AppleTone;
  globalScore: number;
  ratingCount: number;
  globalRank: number;
};

export type PersonalRanking = {
  appleId: string;
  rank: number;
  score: number;
  rankedAt: string;
};

export type Activity = {
  id: string;
  person: string;
  initials: string;
  appleId: string;
  action: string;
  caption?: string;
  happenedAt: string;
};
