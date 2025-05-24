import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

import { calculateSimplifiedScore, calculateStandardScore, useAuth } from '~/helpers';
import {
  type Game,
  GameStatus,
  type Match,
  type MatchLog,
  type Player,
  ScoringMode,
} from '~/models';
import { gameService } from '~/services';

export interface GameContextProps {
  abortMatch: () => Promise<void>;
  activeGame: Game | undefined;
  activeGameMatches: Match[];
  activeGamePlayers: Player[];
  activeMatch: Match | undefined;
  addCurrentUser: () => Promise<void>;
  addOfflinePlayer: (playerName: string) => Promise<void>;
  calculateMatchScore: (betsCount: number, hitsCount: number) => number;
  connectToGame: (gameId: Game['id']) => void;
  createGame: (game: Partial<Game>) => Promise<void>;
  createMatch: (matchData: Pick<Match, 'firstPlayer' | 'roundsCount'>) => Promise<void>;
  endGame: () => Promise<void>;
  findGameByKey: (gameKey: Game['key']) => Promise<void>;
  isLoading: boolean;
  recentGames: Game[];
  removePlayer: (playerId: Player['id']) => Promise<void>;
  reorderPlayers: (playersIds: Player['id'][]) => Promise<void>;
  startGame: () => Promise<void>;
  startMatch: () => Promise<void>;
  updateGame: (data: Partial<Game>) => Promise<void>;
  updateLog: (logId: MatchLog['id'], data: Partial<MatchLog>) => Promise<void>;
  updateMatch: (data: Partial<Match>) => Promise<void>;
  updatePlayer: (playerId: Player['id'], data: Partial<Player>) => Promise<void>;
  userGames: Game[];
}

export interface GameProviderProps {
  children: ReactNode;
}

export const GameContext = createContext({} as GameContextProps);

export function GameProvider({ children }: GameProviderProps): ReactNode {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading] = useState(true);
  const [activeGameId, setActiveGameId] = useState<Game['id']>();
  const [activeGame, setActiveGame] = useState<Game>();
  const [recentGames] = useState<Game[]>([]);
  const [userGames] = useState<Game[]>([]);
  const activeMatch = useMemo(() => {
    if (!activeGame?.matches.length) {
      return undefined;
    }

    return activeGame.matches.reduce((latest, match) => {
      return latest.createdAt > match.createdAt ? latest : match;
    });
  }, [activeGame]);

  const findGameByKey = useCallback(
    async (gameKey: Game['key']) => {
      try {
        const gameId = await gameService.findGameByKey(gameKey);

        navigate({
          pathname: `/game/${gameId}`,
          hash: gameKey,
        });
      } catch {
        setActiveGameId(undefined);
        alert('Nenhum jogo encontrado!');
      }
    },
    [navigate],
  );

  const connectToGame = useCallback((gameId: Game['id']) => {
    setActiveGameId(gameId);
  }, []);

  const createGame = useCallback(
    async (game: Partial<Game>) => {
      const gameId = await gameService.createGame(game);

      navigate(`/game/${gameId}`, { replace: true });
    },
    [navigate],
  );

  const updateGame = useCallback(
    async (data: Partial<Game>) => {
      if (activeGameId) {
        await gameService.updateGame(activeGameId, { ...data });
      }
    },
    [activeGameId],
  );

  const addOfflinePlayer = useCallback(
    async (playerName: string) => {
      if (activeGameId) {
        await gameService.addOfflinePlayer(activeGameId, playerName);
      }
    },
    [activeGameId],
  );

  const addCurrentUser = useCallback(async () => {
    if (!user || !activeGame) {
      return;
    }

    if (activeGame.players.find((player) => player.userId === user.id)) {
      return;
    }

    await gameService.addSignedUser(activeGame.id, user);
  }, [activeGame, user]);

  const updatePlayer = useCallback(
    async (playerId: Player['id'], data: Partial<Player>) => {
      if (activeGameId) {
        await gameService.updatePlayer(activeGameId, playerId, { ...data });
      }
    },
    [activeGameId],
  );

  const removePlayer = useCallback(
    async (playerId: Player['id']) => {
      if (activeGameId) {
        await gameService.removePlayer(activeGameId, playerId);
      }
    },
    [activeGameId],
  );

  const reorderPlayers = useCallback(
    async (playersIds: Player['id'][]) => {
      if (activeGameId) {
        await gameService.reorderPlayers(activeGameId, playersIds);
      }
    },
    [activeGameId],
  );

  const startGame = useCallback(async () => {
    await updateGame({ status: GameStatus.AWAITING });
  }, [updateGame]);

  const endGame = useCallback(async () => {
    if (window.confirm(`Você realmente deseja encerrar o jogo "${activeGame?.name}"?`)) {
      await updateGame({ status: GameStatus.CLOSED });
    }
  }, [activeGame?.name, updateGame]);

  const createMatch = useCallback(
    async (matchData: Pick<Match, 'firstPlayer' | 'roundsCount'>) => {
      if (activeGameId) {
        await gameService.createMatch(activeGameId, matchData);
        await updateGame({ status: GameStatus.PLAYERS_BETTING });
      }
    },
    [activeGameId, updateGame],
  );

  const updateMatch = useCallback(
    async (matchData: Partial<Match>) => {
      if (activeGameId && activeMatch?.id) {
        await gameService.updateMatch(activeGameId, activeMatch?.id, matchData);
      }
    },
    [activeGameId, activeMatch?.id],
  );

  const startMatch = useCallback(async () => {
    if (activeGameId && activeMatch?.id) {
      await updateGame({ status: GameStatus.PLAYING });
    }
  }, [activeGameId, activeMatch?.id, updateGame]);

  const abortMatch = useCallback(async () => {
    if (
      activeGameId &&
      activeMatch?.id &&
      window.confirm('Você realmente deseja cancelar essa partida?')
    ) {
      await updateGame({ status: GameStatus.AWAITING });
      await gameService.destroyMatch(activeGameId, activeMatch?.id);
    }
  }, [activeGameId, activeMatch?.id, updateGame]);

  const updateLog = useCallback(
    async (logId: MatchLog['id'], data: Partial<MatchLog>) => {
      if (activeGameId && activeMatch?.id) {
        await gameService.updateMatchLog(activeGameId, activeMatch.id, logId, data);
      }
    },
    [activeGameId, activeMatch?.id],
  );

  const calculateMatchScore = useCallback(
    (betsCount: number, hitsCount: number) => {
      if (!activeGame) {
        console.error('Method "calculateMatchScore" called without a game.');
        return 0;
      }

      return activeGame.scoringMode === ScoringMode.STANDARD
        ? calculateStandardScore(betsCount, hitsCount, activeGame.scoreOnZeroBets)
        : calculateSimplifiedScore(betsCount, hitsCount, activeGame.scoreOnZeroBets);
    },
    [activeGame],
  );

  useEffect(() => {
    try {
      const unsubscribe = activeGameId
        ? gameService.connectToGame(activeGameId, setActiveGame)
        : undefined;

      return unsubscribe;
    } catch {
      setActiveGameId(undefined);
      alert('Nenhum jogo encontrado!');
    }
  }, [activeGameId]);

  return (
    <GameContext.Provider
      value={{
        isLoading,
        activeGame,
        activeGameMatches: activeGame?.matches ?? [],
        activeGamePlayers: activeGame?.players ?? [],
        activeMatch,
        recentGames,
        userGames,
        findGameByKey,
        connectToGame,
        createGame,
        updateGame,
        addOfflinePlayer,
        addCurrentUser,
        updatePlayer,
        removePlayer,
        reorderPlayers,
        startGame,
        endGame,
        createMatch,
        updateMatch,
        startMatch,
        abortMatch,
        updateLog,
        calculateMatchScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextProps {
  return useContext(GameContext);
}
