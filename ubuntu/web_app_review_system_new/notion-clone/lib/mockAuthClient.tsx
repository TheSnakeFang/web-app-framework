'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  publicMetadata: {
    role: 'Programmer' | 'Reviewer';
  };
  imageUrl?: string;
  email?: string;
}

const mockUsers: User[] = [
  {
    id: 'mock-programmer-id',
    publicMetadata: {
      role: 'Programmer',
    },
    imageUrl: 'https://via.placeholder.com/150',
    email: 'programmer@example.com',
  },
  {
    id: 'mock-reviewer-id',
    publicMetadata: {
      role: 'Reviewer',
    },
    imageUrl: 'https://via.placeholder.com/150',
    email: 'reviewer@example.com',
  },
];

const ClerkInstanceContext = createContext<any>(null);

export const useMockAuth = (): {
  user: User | null;
  userId: string | undefined;
  getToken: () => Promise<string>;
  userRole: 'Programmer' | 'Reviewer' | undefined;
  isSignedIn: boolean;
  isLoaded: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (role: 'Programmer' | 'Reviewer') => void;
  signOut: () => void;
  switchRole: () => void;
} => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay in user authentication
    const timer = setTimeout(() => {
      setUser(mockUsers[0]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = (role: 'Programmer' | 'Reviewer') => {
    const selectedUser = mockUsers.find(u => u.publicMetadata.role === role) || mockUsers[0];
    setUser(selectedUser);
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    setIsLoading(false);
  };

  const switchRole = () => {
    if (user) {
      const newRole = user.publicMetadata.role === 'Programmer' ? 'Reviewer' : 'Programmer';
      const newUser = mockUsers.find(u => u.publicMetadata.role === newRole);
      if (newUser) {
        setUser(newUser);
      }
    }
  };

  return {
    user,
    userId: user?.id,
    getToken: async () => 'mock-token',
    userRole: user?.publicMetadata.role,
    isSignedIn: !!user,
    isLoaded: !isLoading,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
    switchRole,
  };
};

export const MockClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mockClerkInstance = {
    // Add any necessary Clerk instance properties here
    // For example:
    session: null,
    user: mockUsers[0],
  };

  return (
    <ClerkInstanceContext.Provider value={mockClerkInstance}>
      {children}
    </ClerkInstanceContext.Provider>
  );
};

export const useClerk = () => {
  const context = useContext(ClerkInstanceContext);
  if (!context) {
    throw new Error('useClerk must be used within a ClerkProvider');
  }
  return context;
};
