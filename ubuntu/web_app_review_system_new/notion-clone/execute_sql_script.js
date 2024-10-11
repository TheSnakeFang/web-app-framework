const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uiddrgvgibhfziepmzji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZGRyZ3ZnaWJoZnppZXBtemppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTUzNjg4NCwiZXhwIjoyMDM1MTEyODg0fQ.ruTOSxYi1K3Ig4DZiRriy65CFLB6S_LMBwMlsVtTAKw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTasksTable() {
  try {
    // Create the tasks table
    const { error } = await supabase
      .from('tasks')
      .insert({
        title: 'Dummy Task',
        content: 'This is a dummy task to create the table.',
        status: 'pending',
        files: ['dummy.js'],
        created_by: '00000000-0000-0000-0000-000000000000',
        role: 'Programmer',
        code_changes: '',
        comments: []
      })
      .select();

    if (error) {
      if (error.code === '42P07') {
        console.log('Tasks table already exists');
      } else {
        throw error;
      }
    } else {
      console.log('Tasks table created successfully');
    }

    // Insert a sample task
    const { data, error: insertError } = await supabase
      .from('tasks')
      .insert([
        {
          title: 'Sample Task',
          content: 'This is a sample task to verify the table structure.',
          status: 'pending',
          files: ['sample.js'],
          created_by: '00000000-0000-0000-0000-000000000000',
          role: 'Programmer',
          code_changes: 'console.log("Hello, World!");',
          comments: [{ text: 'Initial comment', user: 'System' }]
        }
      ])
      .select();

    if (insertError) throw insertError;
    console.log('Sample task inserted successfully');

    // Verify table creation
    const { data: tasks, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .limit(1);

    if (fetchError) throw fetchError;
    console.log('Tasks table is accessible. Sample data:', tasks);
  } catch (error) {
    console.error('Error creating or accessing tasks table:', error);
    if (error.message) console.error('Error message:', error.message);
    if (error.details) console.error('Error details:', error.details);
    if (error.hint) console.error('Error hint:', error.hint);
  }
}

createTasksTable();
