import { Add as AddIcon, Login as EnterIcon } from '@mui/icons-material';
import { Button, Collapse, Stack, TextField } from '@mui/material';
import { type ChangeEvent, type FormEvent, type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Section } from '~/components';
import { useGame } from '~/helpers';

export function HomePage(): ReactNode {
  const GAME_KEY_LENGTH = 6;
  const navigate = useNavigate();
  const { findGameByKey } = useGame();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function handleChangeInputValue(event: ChangeEvent<HTMLInputElement>): void {
    const newValue = event.target.value;
    const transformedValue = newValue.trim().toUpperCase();

    if (transformedValue.length <= GAME_KEY_LENGTH) {
      setInputValue(transformedValue);
    }
  }

  async function handleSearchGame(event: FormEvent): Promise<void> {
    event.preventDefault();

    await findGameByKey(inputValue);
  }

  return (
    <Section fullWidth maxWidth="sm">
      <Stack sx={{ gap: 3 }}>
        <Collapse in={inputVisible} unmountOnExit>
          <form id="access-game" noValidate onSubmit={handleSearchGame}>
            <TextField
              autoFocus
              fullWidth
              hiddenLabel
              placeholder="Difite a Chave de acesso"
              size="medium"
              value={inputValue}
              slotProps={{
                input: {
                  sx: {
                    textAlign: 'center',
                  },
                },
              }}
              onChange={handleChangeInputValue}
            />
          </form>
        </Collapse>

        <Button
          sx={{ color: 'white' }}
          color="secondary"
          disabled={inputVisible && inputValue.length < GAME_KEY_LENGTH}
          form="access-game"
          fullWidth
          startIcon={<EnterIcon />}
          type={inputVisible ? 'submit' : undefined}
          onClick={inputVisible ? undefined : (): void => setInputVisible(true)}
        >
          {inputVisible ? 'Entrar' : 'Acessar um jogo'}
        </Button>

        <Button
          sx={{ color: 'white' }}
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => navigate('/new')}
        >
          Criar um novo jogo
        </Button>
      </Stack>
    </Section>
  );
}
