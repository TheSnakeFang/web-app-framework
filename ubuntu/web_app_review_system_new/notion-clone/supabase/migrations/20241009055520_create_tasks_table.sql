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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);

-- Add a comment to the table
COMMENT ON TABLE tasks IS 'Stores task information for the code review system';
