import { ChangeEvent, MatchScoreBoard, Section } from '~/components'
import { useGame } from '~/helpers'

export function PlayersBettingView() {
  const { activeGame, activeMatch, abortMatch, updateLog } = useGame()
  const playerTurn = activeMatch?.playerTurn
  const roundsCount = activeMatch?.roundsCount ?? 0
  const logs = activeMatch?.logs ?? []
  const players = activeGame?.players ?? []

  function handleCancel() {
    abortMatch()
  }

  function handleChange({ log }: ChangeEvent) {
    updateLog(log.id, log)
  }

  function handleDone() {}

  return (
    <Section fullWidth maxWidth="md">
      <MatchScoreBoard
        logs={logs}
        players={players}
        playerTurn={playerTurn}
        roundsCount={roundsCount}
        status="betting"
        title="Registrando Apostas"
        onCancel={handleCancel}
        onChange={handleChange}
        onDone={handleDone}
      />
    </Section>
  )
}
