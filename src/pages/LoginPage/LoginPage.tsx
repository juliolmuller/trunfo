import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Section from '~/components/Section'
import { useAuth } from '~/helpers'

function LoginPage() {
  const { signInWithGoogle, signInWithFacebook } = useAuth()

  function handleFacebookSignIn() {
    signInWithFacebook()
  }

  function handleGoogleSignIn() {
    signInWithGoogle()
  }

  return (
    <Section fullWidth maxWidth="sm">
      <Stack alignItems="center" gap={3}>
        <Button
          fullWidth
          startIcon={<img src="/img/google-logo.svg" alt="Google" height="20" />}
          onClick={handleGoogleSignIn}
          sx={{ color: 'white' }}
        >
          Entrar com Google
        </Button>

        <Button
          color="info"
          fullWidth
          startIcon={<img src="/img/facebook-logo.svg" alt="Facebook" height="20" />}
          variant="contained"
          onClick={handleFacebookSignIn}
          sx={{ color: 'white' }}
        >
          Entrar com Facebook
        </Button>
      </Stack>
    </Section>
  )
}

export default LoginPage
