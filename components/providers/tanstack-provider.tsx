'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function TanstackProviders({ children }: { children: React.ReactNode }) {
  // Buat QueryClient di dalam component untuk menghindari sharing state antar requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Konfigurasi default untuk queries
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}