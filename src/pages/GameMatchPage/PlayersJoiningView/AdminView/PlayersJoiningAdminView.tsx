import Grid from '@mui/material/Grid'

import Paper from '~/components/Paper'
import { Game } from '~/models'

import PlayersList from './PlayersList'
import QrCode from './QRCode'

export interface PlayersJoiningAdminViewProps {
  game: Game
}

function PlayersJoiningAdminView({
  game: { key, players },
}: PlayersJoiningAdminViewProps) {
  return (
    <Paper fullWidth maxWidth="inherit">
      <Grid container>
        <Grid item xs={12} md={5}>
          <QrCode gameKey={key} />
        </Grid>
        <Grid item xs={12} md={7}>
          <PlayersList players={players} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PlayersJoiningAdminView
