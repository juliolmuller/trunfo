import { Remove as MinusIcon, Add as PlusIcon } from '@mui/icons-material';
import { Box, Input, Paper, Typography } from '@mui/material';
import { type ChangeEvent, type KeyboardEvent, type ReactNode, useRef } from 'react';

import { CircleButton } from './CircleButton';

export interface CounterProps {
  id?: string;
  max?: number;
  min?: number;
  name?: string;
  onChange: (newValue: number, oldValue: number) => void;
  onPressEnter?: (value: number) => void;
  size?: 'big' | 'small';
  value: number;
}

export function Counter({
  id,
  max = 40,
  min = 0,
  name,
  size = 'small',
  value,
  onChange,
  onPressEnter,
}: CounterProps): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);
  const actualValue = Math.max(min, Math.min(max, value));
  const canDecrement = actualValue - 1 >= min;
  const canIncrement = actualValue + 1 <= max;

  function handleFocus(): void {
    inputRef.current?.focus();
  }

  function handleDecrement(): void {
    if (!canDecrement || !inputRef.current) {
      return;
    }

    const newValue = actualValue - 1;

    inputRef.current.value = newValue.toString();
    onChange(newValue, value);
    handleFocus();
  }

  function handleIncrement(): void {
    if (!canIncrement || !inputRef.current) {
      return;
    }

    const newValue = actualValue + 1;

    inputRef.current.value = newValue.toString();
    onChange(newValue, value);
    handleFocus();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const valueAsString = event.target.value;
    const valueAsNumber = Number(valueAsString) || 0;
    const valueNormalized = Math.max(min, Math.min(max, valueAsNumber));
    onChange(valueNormalized, value);
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>): void {
    if (['ArrowUp', 'ArrowRight', '+', '='].includes(event.key)) {
      handleIncrement();
    } else if (['ArrowDown', 'ArrowLeft', '-', '_'].includes(event.key)) {
      handleDecrement();
    } else if (event.key === 'Enter') {
      onPressEnter?.(actualValue);
    }
  }

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: size === 'small' ? 0.5 : 2,
        '&:focus-within > .MuiPaper-root:not([role="button"])': {
          outlineColor: theme.palette.primary.main,
          outlineStyle: 'solid',
          outlineWidth: 2,
        },
      })}
    >
      <Input
        inputRef={inputRef}
        sx={{
          position: 'absolute',
          left: -10000,
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
        id={id}
        name={name}
        type="tel"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />

      <CircleButton color="error" size={size} onClick={handleDecrement}>
        <MinusIcon fontSize="inherit" />
      </CircleButton>

      <Paper
        sx={{
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: size === 'small' ? 40 : 240,
          width: size === 'small' ? 40 : 240,
          borderRadius: size === 'small' ? 2 : 8,
          bgcolor: 'gray.200',
        }}
        onClick={handleFocus}
      >
        <Typography
          sx={{
            userSelect: 'none',
            fontFamily: 'monospace',
            fontSize: size === 'small' ? '1.5rem' : '10rem',
            fontWeight: 'bold',
          }}
        >
          {actualValue}
        </Typography>
      </Paper>

      <CircleButton color="success" size={size} onClick={handleIncrement}>
        <PlusIcon fontSize="inherit" />
      </CircleButton>
    </Box>
  );
}
