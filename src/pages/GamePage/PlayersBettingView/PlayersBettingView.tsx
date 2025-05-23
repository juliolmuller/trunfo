import { type ReactNode, useMemo } from 'react';

import { type ChangeEvent, MatchScoreBoard, Section } from '~/components';
import { useGame } from '~/helpers';

export function PlayersBettingView(): ReactNode {
  const { activeGame, activeMatch, abortMatch, updateLog, startMatch } = useGame();
  const playerTurn = activeMatch?.playerTurn;
  const roundsCount = activeMatch?.roundsCount ?? 0;
  const logs = useMemo(() => activeMatch?.logs ?? [], [activeMatch?.logs]);
  const players = useMemo(() => activeGame?.players ?? [], [activeGame?.players]);
  const betsCount = logs.reduce((total, log) => total + log.betsCount, 0);
  const error = useMemo(() => {
    if (!activeGame?.betsEqualRounds && !activeGame?.betsUnequalRounds) {
      return undefined;
    }

    if (activeGame.betsEqualRounds && betsCount !== roundsCount)
      return 'O número de apostas deve ser equivalente ao número de rodadas';
    if (activeGame.betsUnequalRounds && betsCount === roundsCount)
      return 'O número de apostas deve ser diferente do número de rodadas';
  }, [activeGame?.betsEqualRounds, activeGame?.betsUnequalRounds, betsCount, roundsCount]);

  function handleStartMatch(): void {
    startMatch();
  }

  function handleCancel(): void {
    abortMatch();
  }

  function handleChange({ log }: ChangeEvent): void {
    updateLog(log.id, log);
  }

  function handleDone(): void {}

  return (
    <Section fullWidth maxWidth="md">
      <MatchScoreBoard
        error={error}
        betsCount={betsCount}
        logs={logs}
        players={players}
        playerTurn={playerTurn}
        roundsCount={roundsCount}
        status="betting"
        title="Registrando Apostas"
        onCancel={handleCancel}
        onChange={handleChange}
        onDone={handleDone}
        onFinish={handleStartMatch}
      />
    </Section>
  );
}
