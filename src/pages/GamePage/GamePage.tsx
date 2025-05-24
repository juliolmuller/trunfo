import { Container, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { type ChangeEvent, type FC, type ReactNode, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { Loading } from '~/components/Loading';
import { useAuth, useGame } from '~/helpers';
import { type Game, GameStatus } from '~/models';

import { AwaitingView } from './AwaitingView';
import { ClosedView } from './ClosedView';
import { PlayersBettingView } from './PlayersBettingView';
import { PlayersJoiningView } from './PlayersJoiningView';
import { PlayingView } from './PlayingView';
import { ReportingHitsView } from './ReportingHitsView';

const viewByStatusMap: Record<GameStatus, FC<{ game: Game }>> = {
  [GameStatus.AWAITING]: AwaitingView,
  [GameStatus.CLOSED]: ClosedView,
  [GameStatus.PLAYERS_BETTING]: PlayersBettingView,
  [GameStatus.PLAYERS_JOINING]: PlayersJoiningView,
  [GameStatus.PLAYING]: PlayingView,
  [GameStatus.REPORTING_HITS]: ReportingHitsView,
};

export function GamePage(): ReactNode {
  const isAddingUserRef = useRef(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const gameId = useParams().gameId || undefined;
  const gameKey = location.hash?.slice?.(1) || undefined;
  const { activeGame, addCurrentUser, connectToGame, updateGame } = useGame();
  const ActiveView = useMemo(() => {
    return activeGame?.status ? viewByStatusMap[activeGame.status] : (): null => null;
  }, [activeGame?.status]);
  const smallViews = [GameStatus.AWAITING, GameStatus.CLOSED, GameStatus.PLAYERS_BETTING];

  function handleChangeStatus(event: ChangeEvent<HTMLInputElement>): void {
    updateGame({ status: event.target.value as GameStatus });
  }

  useEffect(() => {
    if (gameId) {
      connectToGame(gameId);
    }
  }, [connectToGame, gameId]);

  useEffect(() => {
    if (
      gameKey &&
      gameKey === activeGame?.key &&
      activeGame.status === GameStatus.PLAYERS_JOINING &&
      !isAddingUserRef.current
    ) {
      isAddingUserRef.current = true;
      addCurrentUser();
      navigate(location.pathname, { replace: true });
    }
  }, [activeGame?.key, addCurrentUser, gameKey, location.pathname, navigate]);

  return (
    <Container maxWidth={smallViews.includes(activeGame?.status as GameStatus) ? 'sm' : 'md'}>
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        direction="row"
      >
        <Typography sx={{ fontWeight: 700 }} variant="h4">
          {activeGame?.name}
        </Typography>

        {user?.id === activeGame?.createdBy && (
          <TextField
            label="Status do jogo"
            select
            size="small"
            value={activeGame?.status}
            onChange={handleChangeStatus}
          >
            <MenuItem value={GameStatus.PLAYERS_JOINING}>Adicionar jogadores</MenuItem>
            <MenuItem value={GameStatus.AWAITING}>Aguardando</MenuItem>
            <MenuItem value={GameStatus.PLAYERS_BETTING}>Registrar apostas</MenuItem>
            <MenuItem value={GameStatus.PLAYING}>Em jogo</MenuItem>
            <MenuItem value={GameStatus.REPORTING_HITS}>Registrar resultados</MenuItem>
            <MenuItem value={GameStatus.CLOSED}>Encerrado</MenuItem>
          </TextField>
        )}
      </Stack>

      {activeGame ? <ActiveView game={activeGame} /> : <Loading />}
    </Container>
  );
}
