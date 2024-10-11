const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uiddrgvgibhfziepmzji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZGRyZ3ZnaWJoZnppZXBtemppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTUzNjg4NCwiZXhwIjoyMDM1MTEyODg0fQ.ruTOSxYi1K3Ig4DZiRriy65CFLB6S_LMBwMlsVtTAKw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTasksTable() {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title: 'Sample Task',
          content: 'This is a sample task to test table creation',
          status: 'pending',
          files: ['sample.js'],
          created_by: '00000000-0000-0000-0000-000000000000',
          role: 'Programmer',
          code_changes: 'console.log("Hello, World!");',
          comments: [{ text: 'Initial comment', user: 'system' }]
        }
      ]);

    if (error) {
      if (error.code === '42P01') {
        console.log('Tasks table does not exist. Creating it now...');
        // If the table doesn't exist, create it
        const { error: createError } = await supabase.rpc('create_tasks_table');
        if (createError) {
          console.error('Error creating tasks table:', createError);
        } else {
          console.log('Tasks table created successfully');
          // Try inserting the sample task again
          return createTasksTable();
        }
      } else {
        console.error('Error inserting sample task:', error);
      }
    } else {
      console.log('Sample task inserted successfully');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

async function verifyTableAccess() {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error verifying table access:', error);
    } else {
      console.log('Successfully accessed tasks table. Sample data:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

async function main() {
  await createTasksTable();
  await verifyTableAccess();
}

main().catch(console.error);
