import { type Player } from '~/models';

export interface MatchLog {
  betsCount: number;

  hitsCount: number;
  id: string;
  player: Player['id'];
}
