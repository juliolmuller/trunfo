import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { User } from '~/models'
import firebase, { auth } from '~/services/firebase'

export type AuthContextProps = {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | undefined
  signInWithFacebook: () => Promise<boolean>
  signInWithGoogle: () => Promise<boolean>
  signOut: () => Promise<void>
}

export type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const isAuthenticated = Boolean(user)

  function setUserFromRaw(rawUser: firebase.User) {
    const {
      displayName: name,
      photoURL: avatar,
      uid: id,
    } = rawUser

    if (!name || !avatar) {
      throw new Error('Missing information from Google account.')
    }

    setUser({ id, name, avatar })
  }

  async function handleSignIn(provider: AuthProvider) {
    if (user) {
      return true
    }

    try {
      setLoading(true)
      const response = await auth.signInWithPopup(provider)
      console.log(response.user) // DEBUG:

      if (!response.user) {
        throw new Error('Failed to get data from Google Account.')
      }

      setUserFromRaw(response.user)
      return true
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return false
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  function signInWithFacebook() {
    const facebookAuthProvider = new FacebookAuthProvider()

    return handleSignIn(facebookAuthProvider)
  }

  function signInWithGoogle() {
    const googleAuthProvider = new GoogleAuthProvider()

    return handleSignIn(googleAuthProvider)
  }

  async function signOut() {
    setLoading(true)
    await auth.signOut()
    setUser(undefined)
    setLoading(false)
  }

  useEffect(() => {
    // Return of function ("unregister") will be called when component unmounts
    setLoading(true)
    return auth.onAuthStateChanged((rawUser) => {
      rawUser && setUserFromRaw(rawUser)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signInWithGoogle,
        signInWithFacebook,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
