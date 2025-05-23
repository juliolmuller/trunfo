import { useContext } from 'react';

import { AuthContext, type AuthContextProps } from '~/contexts';

export function useAuth(): AuthContextProps {
  return useContext(AuthContext);
}
