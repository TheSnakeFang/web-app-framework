"use client";

import { useEffect } from 'react';
import { initializeDatabase, testSupabaseConnection, createTestTask } from '../lib/supabase';

export function DatabaseInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initDb = async () => {
      try {
        console.log('Starting database initialization...');
        await initializeDatabase();
        console.log('Database initialization completed.');

        console.log('Testing Supabase connection...');
        const isConnected = await testSupabaseConnection();
        console.log('Supabase connection test result:', isConnected);

        if (isConnected) {
          console.log('Attempting to create test task...');
          const testTaskCreated = await createTestTask();
          console.log('Test task creation result:', testTaskCreated);
        } else {
          console.error('Failed to connect to Supabase. Skipping test task creation.');
        }
      } catch (error) {
        console.error('Error during database initialization:', error);
      }
    };
    initDb();
  }, []);

  return <>{children}</>;
}
