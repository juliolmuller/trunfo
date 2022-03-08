import CopyIcon from '@mui/icons-material/ContentCopy'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'

import Paper from '~/components/Paper'
import { useGame } from '~/hooks'

function PlayersJoiningView() {
  const [copying, setCopying] = useState(false)
  const { activeGame } = useGame()
  const qrCode = useMemo(() => {
    const size = 480
    const url = window.location.href

    return `https://api.qrserver.com/v1/create-qr-code?size=${size}x${size}&data=${url}`
  }, [])

  async function handleCopyKeyToClipboard() {
    if (activeGame) {
      setCopying(true)
      await navigator.clipboard.writeText(activeGame.key)
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCopying(false)
    }
  }

  return (
    <Paper fullWidth maxWidth="inherit">
      <Grid container>
        <Grid item xs={12} md={5}>
          <Stack alignItems="center">
            <img src={qrCode} height="200" alt="código QR" />
            <Typography variant="subtitle1" sx={{ mt: 4 }}>
              Chave do Jogo:
            </Typography>
            <Typography
              component="span"
              variant="h4"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                borderRadius: 2,
                background: '#888',
                px: 1,
                py: 0.5,
                fontWeight: 700,
                letterSpacing: 4,
              }}
            >
              <code>{activeGame?.key}</code>
              <IconButton size="small" onClick={handleCopyKeyToClipboard}>
                {copying ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  <CopyIcon />
                )}
              </IconButton>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PlayersJoiningView
