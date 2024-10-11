// Custom Id type to replace Convex's Id
export type Id<T extends string> = string & { __brand: T };

export interface User {
  id: string;
  name: string;
  role: 'Programmer' | 'Reviewer';
}

export interface Task {
  id: Id<'documents'>;
  title: string;
  parentDocument?: Id<'documents'>;
  content: string;
  coverImage?: string;
  icon?: string;
  isArchived: boolean;
  isPublished: boolean;
  createdBy: string;
  status: 'pending' | 'approved' | 'disapproved';
  comments: Comment[];
  role: 'Programmer' | 'Reviewer';
  files: string[];
  codeChanges: string;
}

export interface Comment {
  id: string;
  taskId: Id<'documents'>;
  userId: string;
  content: string;
  createdAt: Date;
  lineNumber?: number;
}

// Mock Users
export const mockUsers: User[] = [
  { id: 'user1', name: 'John Doe', role: 'Programmer' },
  { id: 'user2', name: 'Jane Smith', role: 'Reviewer' },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task1' as Id<'documents'>,
    title: 'Implement Login Feature',
    content: 'Add login functionality to the application',
    isArchived: false,
    isPublished: true,
    createdBy: 'user1',
    status: 'pending',
    comments: [],
    role: 'Programmer',
    files: ['login.js', 'auth.js'],
    codeChanges: '// Add login function\nfunction login() {\n  // Implementation\n}',
  },
  {
    id: 'task2' as Id<'documents'>,
    title: 'Fix Navigation Bug',
    content: 'Resolve issue with navigation menu not displaying correctly',
    isArchived: false,
    isPublished: true,
    createdBy: 'user1',
    status: 'pending',
    comments: [],
    role: 'Programmer',
    files: ['navigation.js'],
    codeChanges: '// Fix navigation display\nfunction fixNavigation() {\n  // Implementation\n}',
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'comment1',
    taskId: 'task1' as Id<'documents'>,
    userId: 'user2',
    content: 'Please add more details about the login process',
    createdAt: new Date(),
  },
];
