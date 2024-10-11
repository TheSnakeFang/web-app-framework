-- Function to create a table if it doesn't exist
CREATE OR REPLACE FUNCTION create_table_if_not_exists(
  table_name TEXT,
  table_definition TEXT
) RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1) THEN
    EXECUTE format('CREATE TABLE %I (%s)', $1, $2);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create an index if it doesn't exist
CREATE OR REPLACE FUNCTION create_index_if_not_exists(
  index_name TEXT,
  table_name TEXT,
  column_name TEXT
) RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = $1) THEN
    EXECUTE format('CREATE INDEX %I ON %I (%I)', $1, $2, $3);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create the tasks table and its indexes
CREATE OR REPLACE FUNCTION create_tasks_table() RETURNS void AS $$
BEGIN
  PERFORM create_table_if_not_exists('tasks', '
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
  ');

  PERFORM create_index_if_not_exists('idx_tasks_status', 'tasks', 'status');
  PERFORM create_index_if_not_exists('idx_tasks_created_by', 'tasks', 'created_by');

  -- Insert a test task
  INSERT INTO tasks (title, content, status, files, created_by, role, code_changes, comments)
  VALUES (
    'Test Task',
    'This is a test task',
    'pending',
    ARRAY['test.js'],
    '00000000-0000-0000-0000-000000000000',
    'Programmer',
    'console.log("Hello, World!");',
    '[{"text": "Initial comment", "user": "System"}]'::jsonb[]
  );
END;
$$ LANGUAGE plpgsql;

-- Execute the function to create the table and insert the test task
SELECT create_tasks_table();
