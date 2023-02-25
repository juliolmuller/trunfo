import CancelIcon from '@mui/icons-material/Close'
import NextIcon from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState } from 'react'

import Counter from '~/components/Counter'
import Section from '~/components/Section'
import { useGame } from '~/helpers'

function SettingUpTurnView() {
  const [cardsCount, setCardsCount] = useState(0)
  const { cancelTurn, startTurnAndBet } = useGame()

  function handleStartBets() {
    startTurnAndBet(cardsCount)
  }

  return (
    <Section
      fullWidth
      maxWidth="sm"
      title="Defina quantas cartas serão dadas a cada jogador nesta próxima rodada:"
    >
      <Stack gap={4}>
        <Counter
          min={1}
          value={cardsCount}
          onChange={setCardsCount}
          onPressEnter={handleStartBets}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row-reverse'],
            alignItems: 'center',
            justifyContent: 'space-evenly',
            gap: 2,
            width: 1,
          }}
        >
          <Button
            color="secondary"
            size="large"
            endIcon={<NextIcon />}
            onClick={handleStartBets}
          >
            Iniciar Apostas
          </Button>
          <Button
            size="large"
            startIcon={<CancelIcon />}
            variant="text"
            onClick={cancelTurn}
          >
            Cancelar
          </Button>
        </Box>
      </Stack>
    </Section>
  )
}

export default SettingUpTurnView
