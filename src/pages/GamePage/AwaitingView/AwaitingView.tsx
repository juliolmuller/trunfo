import { AddCircleOutline as AddIcon, CancelPresentation as EndIcon } from '@mui/icons-material';
import { Box, Button, Divider, Stack } from '@mui/material';
import { type ReactNode, useState } from 'react';

import { OverallScoreBoard, Section } from '~/components';
import { useAuth, useGame } from '~/helpers';
import { type Game } from '~/models';

import { PrepareMatchDialog } from './PrepareMatchDialog';

export interface AwaitingViewProps {
  game: Game;
}

export function AwaitingView({ game }: AwaitingViewProps): ReactNode {
  const [isPreparingMatch, setPreparingMatch] = useState(false);
  const { user } = useAuth();
  const { endGame } = useGame();
  const isGameOwner = user?.id === game.createdBy;

  function handleEndGame(): void {
    endGame();
  }

  function handlePrepareMatch(): void {
    setPreparingMatch(true);
  }

  return (
    <Section fullWidth maxWidth="sm">
      <Stack sx={{ gap: 3 }}>
        <OverallScoreBoard players={game.players} />

        {isGameOwner && (
          <>
            <Divider />

            <Box
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: 2,
                [theme.breakpoints.up('sm')]: {
                  flexDirection: 'row-reverse',
                },
              })}
            >
              <Button
                sx={(theme) => ({
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                  },
                })}
                startIcon={<AddIcon />}
                onClick={handlePrepareMatch}
              >
                Nova Partida
              </Button>

              <Button
                sx={(theme) => ({
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                  },
                })}
                startIcon={<EndIcon />}
                variant="text"
                onClick={handleEndGame}
              >
                Encerrar Jogo
              </Button>
            </Box>
          </>
        )}
      </Stack>

      <PrepareMatchDialog open={isPreparingMatch} onClose={() => setPreparingMatch(false)} />
    </Section>
  );
}
