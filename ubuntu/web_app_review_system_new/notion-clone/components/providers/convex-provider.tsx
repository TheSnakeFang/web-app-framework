"use client";

import { ReactNode } from "react";
import { useMockAuth, MockClerkProvider } from "@/lib/mockAuthClient";

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated } = useMockAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please sign in to access the application.</div>;
  }

  return (
    <MockClerkProvider>
      {children}
    </MockClerkProvider>
  );
};
