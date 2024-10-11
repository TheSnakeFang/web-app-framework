// This file now only contains types and non-React logic

export interface User {
  id: string;
  publicMetadata: {
    role: string;
  };
  imageUrl?: string;
  email?: string;
}

export const mockUser: User = {
  id: 'mock-user-id',
  publicMetadata: {
    role: 'Programmer',
  },
  imageUrl: 'https://via.placeholder.com/150',
  email: 'mock@example.com',
};

export const getToken = async (): Promise<string> => 'mock-token';

// Export types and non-React functions as needed
