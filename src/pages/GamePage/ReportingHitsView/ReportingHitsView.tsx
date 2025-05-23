import { type ReactNode } from 'react';

import { type ChangeEvent, type DoneEvent, MatchScoreBoard, Section } from '~/components';
import { useGame } from '~/helpers';

export function ReportingHitsView(): ReactNode {
  const { activeGame, activeMatch, updateMatch } = useGame();
  const playerTurn = activeMatch?.playerTurn;
  const roundsCount = activeMatch?.roundsCount ?? 0;
  const logs = activeMatch?.logs ?? [];
  const players = activeGame?.players ?? [];

  function handleChange({ log, player }: ChangeEvent): void {
    // TODO: remove logging after proper implementation
    console.info('change', { log, player });
    updateMatch({ logs });
  }

  function handleDone({ log, player, nextPlayer }: DoneEvent): void {
    // TODO: implement
    console.info('done', { log, player, nextPlayer });
  }

  return (
    <Section fullWidth maxWidth="md">
      <MatchScoreBoard
        betsCount={0} // FIXME: update prop for this context
        logs={logs}
        players={players}
        playerTurn={playerTurn}
        roundsCount={roundsCount}
        status="scoring"
        title="Registrando Acertos e Erros"
        onCancel={() => {
          // TODO: implement
        }}
        onChange={handleChange}
        onDone={handleDone}
        onFinish={() => {
          // TODO: implement
        }}
      />
    </Section>
  );
}
