#!/bin/bash

SUPABASE_URL="https://uiddrgvgibhfziepmzji.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZGRyZ3ZnaWJoZnppZXBtemppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTUzNjg4NCwiZXhwIjoyMDM1MTEyODg0fQ.ruTOSxYi1K3Ig4DZiRriy65CFLB6S_LMBwMlsVtTAKw"

echo "Creating tasks table..."
CREATE_TABLE_QUERY="CREATE TABLE IF NOT EXISTS tasks (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), title TEXT NOT NULL, content TEXT, status TEXT NOT NULL, files TEXT[], created_by UUID NOT NULL, is_archived BOOLEAN DEFAULT FALSE, is_published BOOLEAN DEFAULT FALSE, role TEXT NOT NULL, code_changes TEXT, comments JSONB[])"

curl -X POST "${SUPABASE_URL}/rest/v1/rpc/execute_sql" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${CREATE_TABLE_QUERY}\"}"

echo -e "\n\nInserting test task..."
INSERT_TASK_QUERY='{
  "title": "Test Task",
  "content": "This is a test task",
  "status": "pending",
  "files": ["test.js"],
  "created_by": "00000000-0000-0000-0000-000000000000",
  "is_archived": false,
  "is_published": false,
  "role": "Programmer",
  "code_changes": "console.log(\"Hello, World!\");",
  "comments": [{"text": "Initial comment", "user": "System"}]
}'

curl -X POST "${SUPABASE_URL}/rest/v1/tasks" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d "${INSERT_TASK_QUERY}"

echo -e "\n\nFetching tasks..."
curl -X GET "${SUPABASE_URL}/rest/v1/tasks?select=*" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}"

echo -e "\n\nDone."
