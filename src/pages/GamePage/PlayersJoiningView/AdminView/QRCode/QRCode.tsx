import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { type ReactNode, useEffect, useState } from 'react';

export interface QRCodeProps {
  gameKey: string;
}

export function QRCode({ gameKey }: QRCodeProps): ReactNode {
  const [isCopying, setCopying] = useState(false);
  const gameURL = `${window.location.href}#${gameKey}`;
  const qrCode = `https://api.qrserver.com/v1/create-qr-code?size=400x400&data=${gameURL}`;

  useEffect(() => {
    if (!isCopying) {
      return;
    }

    navigator.clipboard.writeText(gameURL);
    const timeout = setTimeout(() => {
      setCopying(false);
    }, 1000);

    return (): void => clearTimeout(timeout);
  }, [gameURL, isCopying]);

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
        sx={{
          width: '100%',
          maxWidth: 280,
          aspectRatio: 1 / 1,
        }}
        component="img"
        src={qrCode}
        alt="código QR"
      />

      <Typography sx={{ mt: 4 }} variant="subtitle1">
        Chave do Jogo:
      </Typography>

      <Typography
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
        component="span"
        variant="h4"
      >
        <code>{gameKey}</code>

        <IconButton
          sx={{ color: 'black' }}
          disabled={isCopying}
          size="small"
          onClick={() => setCopying(true)}
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
  );
}
