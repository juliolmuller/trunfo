import { type Match, type Player, type User } from '~/models';

export enum ScoringMode {
  SIMPLIFIED = 'simplified',
  STANDARD = 'standard',
}

export enum GameStatus {
  AWAITING = 'awaiting',
  CLOSED = 'closed',
  PLAYERS_BETTING = 'players betting',
  PLAYERS_JOINING = 'players joining',
  PLAYING = 'playing',
  REPORTING_HITS = 'reporting hits',
}

export interface Game {
  betsEqualRounds: boolean;

  betsUnequalRounds: boolean;
  createdAt: Date; // stored as ISO date string
  createdBy: User['id'];
  id: string;
  key: string;

  matches: Match[];
  name: string;
  players: Player[];
  scoreOnZeroBets: boolean;

  scoringMode: ScoringMode;
  status: GameStatus;
}
