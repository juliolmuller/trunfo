import { type AuthProvider, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { createContext, type ReactNode, useEffect, useState } from 'react';

import { type User } from '~/models';
import { auth, type firebase } from '~/services/firebase';

export interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithFacebook: () => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signOut: () => Promise<void>;
  user: undefined | User;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps): ReactNode {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const isAuthenticated = Boolean(user);

  function setUserFromRaw(rawUser: firebase.User): void {
    const { displayName: name, photoURL: avatar, uid: id } = rawUser;

    if (!name || !avatar) {
      throw new Error('Missing information from Google account.');
    }

    setUser({ id, name, avatar });
  }

  async function handleSignIn(provider: AuthProvider): Promise<boolean> {
    if (user) {
      return true;
    }

    try {
      setLoading(true);

      const response = await auth.signInWithPopup(provider);

      if (!response.user) {
        throw new Error('Failed to get data from Google Account.');
      }

      setUserFromRaw(response.user);

      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return false;
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }

  function signInWithFacebook(): Promise<boolean> {
    const facebookAuthProvider = new FacebookAuthProvider();

    return handleSignIn(facebookAuthProvider);
  }

  function signInWithGoogle(): Promise<boolean> {
    const googleAuthProvider = new GoogleAuthProvider();

    return handleSignIn(googleAuthProvider);
  }

  async function signOut(): Promise<void> {
    setLoading(true);
    await auth.signOut();
    setUser(undefined);
    setLoading(false);
  }

  useEffect(() => {
    // Return of function ("unregister") will be called when component unmounts
    setLoading(true);
    return auth.onAuthStateChanged((rawUser) => {
      if (rawUser) {
        setUserFromRaw(rawUser);
      }

      setLoading(false);
    });
  }, []);

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
  );
}
