import PlusIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect } from 'react'

import CircleButton from './CircleButton'

export interface CounterProps {
  value: number
  max?: number
  min?: number
  onChange: (newValue: number, oldValue: number) => void
  onPressEnter?: (value: number) => void
}

function Counter({
  max = 40,
  min = 0,
  value,
  onChange,
  onPressEnter,
}: CounterProps) {
  const actualValue = Math.max(min, Math.min(max, value))

  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, actualValue - 1)
    newValue !== value && onChange(newValue, value)
  }, [actualValue, min, onChange, value])

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, actualValue + 1)
    newValue !== value && onChange(newValue, value)
  }, [actualValue, max, onChange, value])

  const handlePressEnter = useCallback(() => {
    onPressEnter?.(actualValue)
  }, [actualValue, onPressEnter])

  useEffect(() => {
    function handleHotKeys(event: KeyboardEvent) {
      if (['ArrowUp', 'ArrowRight', '+', '='].includes(event.key)) {
        handleIncrement()
      } else if (['ArrowDown', 'ArrowLeft', '-', '_'].includes(event.key)) {
        handleDecrement()
      } else if (event.key === 'Enter') {
        handlePressEnter()
      }
    }

    document.addEventListener('keyup', handleHotKeys)
    return () => document.removeEventListener('keyup', handleHotKeys)
  }, [handleDecrement, handleIncrement, handlePressEnter])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: 1,
      }}
    >
      <CircleButton color="error" onClick={handleDecrement}>
        <MinusIcon fontSize="inherit" />
      </CircleButton>
      <Paper
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 240,
          width: 240,
          borderRadius: 8,
          bgcolor: 'gray.200',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '10rem',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {actualValue}
        </Typography>
      </Paper>
      <CircleButton color="success" onClick={handleIncrement}>
        <PlusIcon fontSize="inherit" />
      </CircleButton>
    </Box>
  )
}

export default Counter
