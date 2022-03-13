import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/TaskAlt'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { ChangeEvent, FormEvent, useState } from 'react'

import Button from '~/components/Button'
import { useGame } from '~/hooks'

function AddNewPlayerControl() {
  const { addOfflinePlayer } = useGame()
  const [isAddingPlayer, setAddingPlayer] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  function handleBlur() {
    setAddingPlayer(false)
    setNewUserName('')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewUserName(event.target.value)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    await addOfflinePlayer(newUserName)
    setSubmitting(false)
    handleBlur()
  }

  return (
    <>
      {isAddingPlayer ? (
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            color="error"
            disabled={isSubmitting}
            fullWidth
            label="Nome do jogador"
            InputProps={{
              endAdornment: newUserName.length === 0 ? undefined : (
                <InputAdornment position="end">
                  <IconButton color="success" type="submit">
                    <DoneIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            size="small"
            value={newUserName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </form>
      ) : (
        <Button
          fullWidth
          size="large"
          startIcon={<AddIcon />}
          onClick={() => setAddingPlayer(true)}
        >
          Adicionar novo jogador
        </Button>
      )}
    </>
  )
}

export default AddNewPlayerControl
