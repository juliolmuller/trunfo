import MatchScoreBoard from '~/components/MatchScoreBoard'
import Section from '~/components/Section'
import { useGame } from '~/helpers'

function PlayersBettingView() {
  const { activeGame, activeMatch } = useGame()
  const playerTurn = activeMatch?.playerTurn
  const roundsCount = activeMatch?.roundsCount ?? 0
  const logs = activeMatch?.logs ?? []
  const players = activeGame?.players ?? []

  function handleChange() {}

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
        onChange={handleChange}
        onDone={handleDone}
      />
    </Section>
  )
}

export default PlayersBettingView
