import Paper from '@mui/material/Paper'

import Button from '~/components/Button'
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
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        maxWidth: 600,
        m: 2,
        p: 3,
      }}
    >
      <Button
        fullWidth
        startIcon={<img src="/img/google-logo.svg" alt="Google" height="20" />}
        variant="contained"
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
    </Paper>
  )
}

export default LoginPage
