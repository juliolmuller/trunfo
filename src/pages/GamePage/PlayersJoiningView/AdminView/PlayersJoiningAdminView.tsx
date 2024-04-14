import { Grid } from '@mui/material'

import { Section } from '~/components'
import { Game } from '~/models'

import { PlayersList } from './PlayersList'
import { QRCode } from './QRCode'

export interface PlayersJoiningAdminViewProps {
  game: Game
}

export function PlayersJoiningAdminView({ game: { key, players } }: PlayersJoiningAdminViewProps) {
  return (
    <Section fullWidth maxWidth="inherit">
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <QRCode gameKey={key} />
        </Grid>

        <Grid item xs={12} md={7}>
          <PlayersList players={players} />
        </Grid>
      </Grid>
    </Section>
  )
}
