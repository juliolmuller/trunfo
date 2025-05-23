import { Button, Stack } from '@mui/material';
import { type ReactNode } from 'react';

import { Section } from '~/components';
import { useAuth } from '~/helpers';

export function LoginPage(): ReactNode {
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  function handleFacebookSignIn(): void {
    signInWithFacebook();
  }

  function handleGoogleSignIn(): void {
    signInWithGoogle();
  }

  return (
    <Section fullWidth maxWidth="sm">
      <Stack
        sx={{
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Button
          sx={{ color: 'white' }}
          fullWidth
          startIcon={<img src="/img/google-logo.svg" alt="Google" height="20" />}
          onClick={handleGoogleSignIn}
        >
          Entrar com Google
        </Button>

        <Button
          sx={{ color: 'white' }}
          color="info"
          fullWidth
          startIcon={<img src="/img/facebook-logo.svg" alt="Facebook" height="20" />}
          variant="contained"
          onClick={handleFacebookSignIn}
        >
          Entrar com Facebook
        </Button>
      </Stack>
    </Section>
  );
}
