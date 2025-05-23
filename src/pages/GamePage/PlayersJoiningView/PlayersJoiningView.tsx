import { type ReactNode } from 'react';

import { useAuth } from '~/helpers';
import { type Game } from '~/models';

import { AwaitingView as PlayersJoiningGeneralView } from '../AwaitingView';
import { PlayersJoiningAdminView } from './AdminView';

export interface PlayersJoiningViewProps {
  game: Game;
}

export function PlayersJoiningView({ game }: PlayersJoiningViewProps): ReactNode {
  const { user } = useAuth();

  return game.createdBy === user?.id ? (
    <PlayersJoiningAdminView game={game} />
  ) : (
    <PlayersJoiningGeneralView game={game} />
  );
}
