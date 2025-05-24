import { type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { GameProvider } from '~/contexts';
import { useAuth } from '~/helpers';
import { AppLayout } from '~/layouts';
import { GameFormPage, GamePage, HomePage, LoginPage } from '~/pages';

function PublicRouter(): ReactNode {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="*" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

function AuthRoutes(): ReactNode {
  return (
    <GameProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<GameFormPage />} />
          <Route path="/game/:gameId" element={<GamePage />} />
        </Route>
      </Routes>
    </GameProvider>
  );
}

export function Router(): ReactNode {
  const { isAuthenticated } = useAuth();

  return <BrowserRouter>{isAuthenticated ? <AuthRoutes /> : <PublicRouter />}</BrowserRouter>;
}
