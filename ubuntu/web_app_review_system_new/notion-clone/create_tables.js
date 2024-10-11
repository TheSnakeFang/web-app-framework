const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uiddrgvgibhfziepmzji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZGRyZ3ZnaWJoZnppZXBtemppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTUzNjg4NCwiZXhwIjoyMDM1MTEyODg0fQ.ruTOSxYi1K3Ig4DZiRriy65CFLB6S_LMBwMlsVtTAKw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  const { error } = await supabase
    .from('tasks')
    .insert([
      {
        title: 'Sample Task',
        content: 'This is a sample task to create the table structure.',
        status: 'pending',
        files: ['sample.js'],
        created_by: '00000000-0000-0000-0000-000000000000',
        is_archived: false,
        is_published: false,
        role: 'Programmer',
        code_changes: 'console.log("Hello, World!");',
        comments: [{ text: 'Initial comment', user: 'System' }]
      }
    ]);

  if (error) {
    console.error('Error creating tasks table:', error);
  } else {
    console.log('Tasks table created successfully');
  }

  // Verify table creation
  const { data: tasks, error: fetchError } = await supabase
    .from('tasks')
    .select('*')
    .limit(1);

  if (fetchError) {
    console.error('Error fetching tasks:', fetchError);
  } else {
    console.log('Tasks table is accessible:', tasks);
  }
}

createTables();
