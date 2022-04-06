import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Paper from '~/components/Paper'
import { useAuth } from '~/hooks'

function LoginPage() {
  const { signInWithGoogle, signInWithFacebook } = useAuth()

  function handleFacebookSignIn() {
    signInWithFacebook()
  }

  function handleGoogleSignIn() {
    signInWithGoogle()
  }

  return (
    <Paper fullWidth maxWidth="sm">
      <Stack alignItems="center" gap={3}>
        <Button
          fullWidth
          startIcon={<img src="/img/google-logo.svg" alt="Google" height="20" />}
          onClick={handleGoogleSignIn}
          sx={{ color: 'white' }}
        >
          Entrar com conta Google
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
    </Paper>
  )
}

export default LoginPage
