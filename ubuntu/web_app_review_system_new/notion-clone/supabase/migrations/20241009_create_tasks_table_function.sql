-- Create a function to create the tasks table
CREATE OR REPLACE FUNCTION create_tasks_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    status TEXT NOT NULL,
    files TEXT[],
    created_by UUID,
    role TEXT NOT NULL,
    code_changes TEXT,
    comments JSONB[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
  CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);

  COMMENT ON TABLE tasks IS 'Stores task information for the code review system';
END;
$$ LANGUAGE plpgsql;
