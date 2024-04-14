import Grid from '@mui/material/Grid'

import Section from '~/components/Section'
import { Game } from '~/models'

import PlayersList from './PlayersList'
import QrCode from './QRCode'

export interface PlayersJoiningAdminViewProps {
  game: Game
}

function PlayersJoiningAdminView({ game: { key, players } }: PlayersJoiningAdminViewProps) {
  return (
    <Section fullWidth maxWidth="inherit">
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <QrCode gameKey={key} />
        </Grid>

        <Grid item xs={12} md={7}>
          <PlayersList players={players} />
        </Grid>
      </Grid>
    </Section>
  )
}

export default PlayersJoiningAdminView
