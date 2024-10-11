import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uiddrgvgibhfziepmzji.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZGRyZ3ZnaWJoZnppZXBtemppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1MzY4ODQsImV4cCI6MjAzNTExMjg4NH0.Xe11-QYSZDQHUziT_9GjsyIuXrMK_J8KU2fSHP46RNA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');

    // Check if the tasks table exists
    console.log('Checking if tasks table exists...');
    const { data, error } = await supabase.from('tasks').select('*').limit(1);

    console.log('Check tasks table result:', { data, error });

    if (error && error.code === '42P01') {
      console.log('Tasks table does not exist. Attempting to create...');
      try {
        const { data: createData, error: createError } = await supabase
          .rpc('create_tasks_table');

        console.log('Create tasks table result:', { createData, createError });

        if (createError) {
          console.error('Error creating tasks table:', createError);
          throw createError;
        } else {
          console.log('Tasks table created successfully');
        }
      } catch (sqlError) {
        console.error('Error executing SQL to create tasks table:', sqlError);
        throw sqlError;
      }
    } else if (error) {
      console.error('Error checking for tasks table:', error);
      throw error;
    } else {
      console.log('Tasks table already exists');
    }

    // Verify table creation
    console.log('Verifying tasks table creation...');
    const { data: verifyData, error: verifyError } = await supabase.from('tasks').select('*').limit(1);

    if (verifyError) {
      console.error('Error verifying tasks table:', verifyError);
      throw verifyError;
    } else {
      console.log('Tasks table verified successfully');
      console.log('Verify data:', verifyData);
    }

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').limit(1);
    if (error) throw error;
    console.log('Supabase connection test successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return false;
  }
};

export const createTestTask = async () => {
  try {
    const { data, error } = await supabase.from('tasks').insert([
      {
        title: 'Test Task',
        content: 'This is a test task.',
        status: 'pending',
        files: [],
        created_by: null,
        is_archived: false,
        is_published: false,
        role: 'Programmer',
        code_changes: '',
        comments: [],
        created_at: new Date().toISOString()
      }
    ]);

    if (error) throw error;
    console.log('Test task created successfully');
    return true;
  } catch (error) {
    console.error('Error creating test task:', error);
    return false;
  }
};
