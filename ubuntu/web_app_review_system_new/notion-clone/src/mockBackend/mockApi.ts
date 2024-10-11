import { Task, Comment, Id, User } from "./mockDatabase";
import { mockTasks, mockComments, mockUsers } from "./mockDatabase";
import { v4 as uuidv4 } from 'uuid';

// User API
export const getCurrentUser = (): User | undefined => {
  return mockUsers[0]; // For simplicity, always return the first user
};

// Task API
export const getTasks = (): Task[] => {
  return mockTasks;
};

export const getTask = (id: string): Task | undefined => {
  return mockTasks.find(task => task.id === id);
};

export const createTask = (task: Partial<Task>): Promise<Task> => {
  return new Promise((resolve) => {
    const newTask: Task = {
      id: `task-${mockTasks.length + 1}` as Id<"documents">,
      title: task.title || 'Untitled',
      content: task.content || '',
      coverImage: task.coverImage || '',
      icon: task.icon || '',
      isArchived: false,
      parentDocument: task.parentDocument || undefined,
      status: 'pending',
      codeChanges: task.codeChanges || '',
      isPublished: false,
      createdBy: task.createdBy || getCurrentUser()?.id || '',
      comments: [],
      role: task.role || 'Programmer',
      files: task.files || []
    };
    mockTasks.push(newTask);
    resolve(newTask);
  });
};

export const updateTask = (id: string, updates: Partial<Task>): Promise<Task | undefined> => {
  return new Promise((resolve) => {
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...updates };
      resolve(mockTasks[taskIndex]);
    } else {
      resolve(undefined);
    }
  });
};

export const deleteTask = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      mockTasks.splice(taskIndex, 1);
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

// Comment API
export const getComments = (taskId: string): Comment[] => {
  return mockComments.filter(comment => comment.taskId === taskId);
};

export const addComment = (taskId: Id<"documents">, comment: Omit<Comment, 'id' | 'createdAt' | 'taskId'>): Task | undefined => {
  const newComment: Comment = {
    ...comment,
    id: uuidv4() as Id<"documents">, // Cast the UUID to Id<"documents">
    createdAt: new Date(),
    taskId,
  };
  mockComments.push(newComment);
  const task = getTask(taskId);
  if (task) {
    task.comments = [...(task.comments || []), newComment];
    return task;
  }
  return undefined;
};

// Approval API
export const approveTask = (taskId: string): Task | undefined => {
  const task = getTask(taskId);
  if (task) {
    task.status = 'approved';
    return task;
  }
  return undefined;
};

export const disapproveTask = (taskId: string): Task | undefined => {
  const task = getTask(taskId);
  if (task) {
    task.status = 'disapproved';
    return task;
  }
  return undefined;
};

// Authentication API (mock)
export const login = (username: string, password: string): User | null => {
  // In a real app, you'd check credentials. Here, we'll just return the first user.
  return mockUsers[0];
};

export const logout = (): void => {
  // In a real app, you'd clear session data. Here, we'll do nothing.
  console.log('User logged out');
};

// Additional functions to resolve build errors
export const getTaskById = (id: string): Task | undefined => {
  return getTask(id);
};

export const getTrash = (): Task[] => {
  return mockTasks.filter(task => task.isArchived);
};

export const restoreTask = (id: string): Task | undefined => {
  const task = getTask(id);
  if (task) {
    task.isArchived = false;
    task.status = 'pending';
    return task;
  }
  return undefined;
};

export const removeTask = (id: string): boolean => {
  const index = mockTasks.findIndex(task => task.id === id);
  if (index !== -1) {
    mockTasks.splice(index, 1);
    return true;
  }
  return false;
};

export const removeIcon = (id: string): Task | undefined => {
  const task = getTask(id);
  if (task) {
    task.icon = undefined;
    return task;
  }
  return undefined;
};

export const getSearchResults = (query: string): Task[] => {
  return mockTasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
};

export const uploadFile = async (file: File): Promise<{ url: string }> => {
  // In a real app, you'd upload the file to a server. Here, we'll just return a mock URL.
  return { url: `https://mock-file-upload.com/${file.name}` };
};
