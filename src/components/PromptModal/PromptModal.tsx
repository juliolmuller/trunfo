import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { type FormEvent, type HTMLInputTypeAttribute, type ReactNode } from 'react';

export interface PromptModalProps {
  label?: string;
  onClose: () => void;
  onSave: (newValue: string) => void;
  open: boolean;
  placeholder?: string;
  title: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
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
}: PromptModalProps): ReactNode {
  const inputName = 'dialog-input';

  function handleClose(): void {
    onClose();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fieldValue = formData.get(inputName)?.toString() ?? '';

    onSave(fieldValue);
    handleClose();
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
  );
}
