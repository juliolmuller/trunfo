import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { FormEvent, HTMLInputTypeAttribute } from 'react'

export interface PromptModalProps {
  open: boolean
  title: string
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value?: string
  onClose: () => void
  onSave: (newValue: string) => void
}

export function PromptModal({
  open,
  label,
  placeholder,
  title,
  type,
  value = '',
  onClose,
  onSave,
}: PromptModalProps) {
  const inputName = 'dialog-input'

  function handleClose() {
    onClose()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fieldValue = formData.get(inputName)?.toString() ?? ''

    onSave(fieldValue)
    handleClose()
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          defaultValue={value}
          fullWidth
          label={label}
          name={inputName}
          placeholder={placeholder}
          required
          size="small"
          type={type}
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-evenly',
        }}
      >
        <Button type="submit" variant="text">
          Salvar
        </Button>

        <Button onClick={handleClose} variant="text">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
