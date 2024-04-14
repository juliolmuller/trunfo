import { ContentCopy as CopyIcon } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export interface QRCodeProps {
  gameKey: string
}

export function QRCode({ gameKey }: QRCodeProps) {
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
        height: 1,
      }}
    >
      <Box
        component="img"
        src={qrCode}
        alt="código QR"
        sx={{
          width: '100%',
          maxWidth: 280,
          aspectRatio: 1 / 1,
        }}
      />

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
          bgcolor: 'grey',
          p: [0.5, 1],
          color: 'black',
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        <code>{gameKey}</code>

        <IconButton
          disabled={isCopying}
          size="small"
          onClick={() => setCopying(true)}
          sx={{ color: 'black' }}
        >
          {isCopying ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            <Tooltip placement="right" title="Copiar URL">
              <CopyIcon />
            </Tooltip>
          )}
        </IconButton>
      </Typography>
    </Box>
  )
}
