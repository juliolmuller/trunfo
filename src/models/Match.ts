import { type MatchLog, type Player } from '~/models';

export interface Match {
  createdAt: Date; // stored as ISO date string

  firstPlayer: Player['id'];
  id: string;
  logs: MatchLog[];

  playerTurn?: Player['id'];
  roundsCount: number;
}
