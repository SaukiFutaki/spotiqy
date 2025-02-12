"use client";

import React, { createContext, useContext } from "react";

// Context untuk menyimpan token
const SpotifyTokenContext = createContext<{ accessToken: string | null }>({
  accessToken: null,
});

// Provider untuk Spotify Access Token
export function SpotifyTokenProvider({
  children,
  accessToken,
}: {
  children: React.ReactNode;
  accessToken: string | null;
}) {
  return (
    <SpotifyTokenContext.Provider value={{ accessToken }}>
      {children}
    </SpotifyTokenContext.Provider>
  );
}

// Custom hook untuk mengambil token di dalam komponen
export function useSpotifyToken() {
  return useContext(SpotifyTokenContext);
}
