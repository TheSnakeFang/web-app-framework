"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useMockAuth } from "@/lib/mockAuthClient";

export default function Home() {
  const { isAuthenticated, isLoading } = useMockAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      redirect("/documents");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Code Review System</h1>
      <p>Please sign in to continue.</p>
    </div>
  );
}
