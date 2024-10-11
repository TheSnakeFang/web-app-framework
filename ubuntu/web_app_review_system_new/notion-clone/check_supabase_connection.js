const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uiddrgvgibhfziepmzji.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZGRyZ3ZnaWJoZnppZXBtemppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTUzNjg4NCwiZXhwIjoyMDM1MTEyODg0fQ.ruTOSxYi1K3Ig4DZiRriy65CFLB6S_LMBwMlsVtTAKw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTablePermissions() {
  console.log('Checking table permissions...');

  // Check SELECT permission
  const { data: selectData, error: selectError } = await supabase
    .from('tasks')
    .select('*')
    .limit(1);

  if (selectError) {
    console.error('Error checking SELECT permission:', selectError);
  } else {
    console.log('SELECT permission: OK');
  }

  // Check INSERT permission
  const { data: insertData, error: insertError } = await supabase
    .from('tasks')
    .insert([
      {
        title: 'Test Task',
        content: 'This is a test task',
        status: 'pending',
        files: ['test.js'],
        created_by: '00000000-0000-0000-0000-000000000000',
        role: 'Programmer',
        code_changes: 'console.log("Hello, World!");',
        comments: [{ text: 'Initial comment', user: 'System' }]
      }
    ])
    .select();

  if (insertError) {
    console.error('Error checking INSERT permission:', insertError);
  } else {
    console.log('INSERT permission: OK');
    console.log('Inserted task:', insertData);
  }

  // Check UPDATE permission
  if (insertData && insertData.length > 0) {
    const { data: updateData, error: updateError } = await supabase
      .from('tasks')
      .update({ content: 'Updated test task' })
      .eq('id', insertData[0].id)
      .select();

    if (updateError) {
      console.error('Error checking UPDATE permission:', updateError);
    } else {
      console.log('UPDATE permission: OK');
      console.log('Updated task:', updateData);
    }

    // Check DELETE permission
    const { data: deleteData, error: deleteError } = await supabase
      .from('tasks')
      .delete()
      .eq('id', insertData[0].id);

    if (deleteError) {
      console.error('Error checking DELETE permission:', deleteError);
    } else {
      console.log('DELETE permission: OK');
    }
  }
}

async function checkSupabaseConnection() {
  try {
    console.log('Checking Supabase connection...');
    const { data, error } = await supabase.from('tasks').select('*').limit(1);

    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }

    console.log('Successfully connected to Supabase');
    console.log('Sample data:', data);

    await checkTablePermissions();

    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    return false;
  }
}

checkSupabaseConnection().then((result) => {
  console.log('Connection check result:', result ? 'PASSED' : 'FAILED');
  process.exit(result ? 0 : 1);
});
