import MatchScoreBoard, { ChangeEvent, DoneEvent } from '~/components/MatchScoreBoard'
import Section from '~/components/Section'
import { useGame } from '~/helpers'

function ReportingHitsView() {
  const { activeGame, activeMatch, updateMatch } = useGame()
  const playerTurn = activeMatch?.playerTurn
  const roundsCount = activeMatch?.roundsCount ?? 0
  const logs = activeMatch?.logs ?? []
  const players = activeGame?.players ?? []

  function handleChange({ log, player }: ChangeEvent) {
    console.log('change', { log, player })
    updateMatch({ logs })
  }

  function handleDone({ log, player, nextPlayer }: DoneEvent) {
    console.log('done', { log, player, nextPlayer })
  }

  return (
    <Section fullWidth maxWidth="md">
      <MatchScoreBoard
        logs={logs}
        players={players}
        playerTurn={playerTurn}
        roundsCount={roundsCount}
        status="scoring"
        title="Registrando Acertos e Erros"
        onChange={handleChange}
        onDone={handleDone}
      />
    </Section>
  )
}

export default ReportingHitsView
