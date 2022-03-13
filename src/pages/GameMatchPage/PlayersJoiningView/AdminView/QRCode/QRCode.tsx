import CopyIcon from '@mui/icons-material/ContentCopy'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

export interface QRCodeProps {
  gameKey: string
}

function QRCode({ gameKey }: QRCodeProps) {
  const [isCopying, setCopying] = useState(false)
  const gameURL = `${window.location.href}#${gameKey}`
  const qrCode = `https://api.qrserver.com/v1/create-qr-code?size=400x400&data=${gameURL}`

  useEffect(() => {
    if (!isCopying) {
      return
    }

    navigator.clipboard.writeText(gameURL)
    const timeout = setTimeout(() => {
      setCopying(false)
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout)
  }, [gameURL, isCopying])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
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
          background: '#acacac',
          p: [0.5, 1],
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        <code>{gameKey}</code>
        <IconButton
          disabled={isCopying}
          size="small"
          onClick={() => setCopying(true)}
        >
          {isCopying ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            <CopyIcon />
          )}
        </IconButton>
      </Typography>
    </Box>
  )
}

export default QRCode
