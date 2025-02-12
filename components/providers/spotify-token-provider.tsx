// lib/providers.tsx
'use client';

import { createContext } from 'react';

type AuthContextType = {
  accessToken: string | undefined;
};

export const AuthContext = createContext<AuthContextType>({ accessToken: undefined });

export function AuthProvider({
  children,
  accessToken,
}: {
  children: React.ReactNode;
  accessToken: string | undefined;
}) {
  return (
    <AuthContext.Provider value={{ accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}