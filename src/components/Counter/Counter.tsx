import { Add as PlusIcon, Remove as MinusIcon } from '@mui/icons-material'
import { Box, Input, Paper, Typography } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useRef } from 'react'

import { CircleButton } from './CircleButton'

export interface CounterProps {
  value: number
  id?: string
  max?: number
  min?: number
  name?: string
  size?: 'small' | 'big'
  onChange: (newValue: number, oldValue: number) => void
  onPressEnter?: (value: number) => void
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
}: CounterProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const actualValue = Math.max(min, Math.min(max, value))

  function handleFocus() {
    inputRef.current?.focus()
  }

  function handleDecrement() {
    const newValue = Math.max(min, actualValue - 1)

    if (newValue === value || !inputRef.current) {
      return
    }

    inputRef.current.value = newValue.toString()
    onChange(newValue, value)
    handleFocus()
  }

  function handleIncrement() {
    const newValue = Math.min(max, actualValue + 1)

    if (newValue === value || !inputRef.current) {
      return
    }

    inputRef.current.value = newValue.toString()
    onChange(newValue, value)
    handleFocus()
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const valueAsString = event.target.value
    const valueAsNumber = Number(valueAsString) || 0
    const valueNormalized = Math.max(min, Math.min(max, valueAsNumber))
    onChange(valueNormalized, value)
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (['ArrowUp', 'ArrowRight', '+', '='].includes(event.key)) {
      handleIncrement()
    } else if (['ArrowDown', 'ArrowLeft', '-', '_'].includes(event.key)) {
      handleDecrement()
    } else if (event.key === 'Enter') {
      onPressEnter?.(actualValue)
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: size === 'small' ? 0.5 : 2,
        '&:focus-within > .MuiPaper-root:not([role="button"])': {
          outlineColor: (theme) => theme.palette.primary.main,
          outlineStyle: 'solid',
          outlineWidth: 2,
        },
      }}
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
  )
}
