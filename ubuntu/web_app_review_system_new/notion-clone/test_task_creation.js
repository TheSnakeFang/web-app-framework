const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uiddrgvgibhfziepmzji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZGRyZ3ZnaWJoZnppZXBtemppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1MzY4ODQsImV4cCI6MjAzNTExMjg4NH0.Xe11-QYSZDQHUziT_9GjsyIuXrMK_J8KU2fSHP46RNA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testTaskCreation() {
  try {
    const newTask = {
      title: `Test Task ${Date.now()}`,
      status: 'pending',
      files: ['example.js', 'example.css'],
      created_by: 'test_user',
      role: 'Programmer',
      code_changes: '',
      comments: [],
    };

    console.log('Creating new task:', newTask);

    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select()
      .single();

    if (error) {
      console.error('Error creating task:', error);
      return false;
    }

    console.log('Task created successfully:', data);

    // Verify the created task
    const { data: fetchedTask, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', data.id)
      .single();

    if (fetchError) {
      console.error('Error fetching created task:', fetchError);
      return false;
    }

    console.log('Fetched task:', fetchedTask);

    // Compare the created task with the fetched task
    const isTaskCreatedCorrectly = JSON.stringify(data) === JSON.stringify(fetchedTask);

    console.log('Task creation verified:', isTaskCreatedCorrectly);

    return isTaskCreatedCorrectly;
  } catch (error) {
    console.error('Unexpected error:', error);
    return false;
  }
}

testTaskCreation().then((result) => {
  console.log('Test result:', result ? 'PASSED' : 'FAILED');
  process.exit(result ? 0 : 1);
});
