-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  status TEXT NOT NULL,
  files TEXT[],
  created_by UUID NOT NULL,
  is_archived BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  role TEXT NOT NULL,
  code_changes TEXT,
  comments JSONB[]
);

-- Create index on status for faster queries
CREATE INDEX idx_tasks_status ON tasks(status);

-- Create index on created_by for faster user-specific queries
CREATE INDEX idx_tasks_created_by ON tasks(created_by);
