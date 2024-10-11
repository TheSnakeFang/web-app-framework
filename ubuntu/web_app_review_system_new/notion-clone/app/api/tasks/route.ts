import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_FILE_PATH = path.join(process.cwd(), 'mockDatabase.json');

type Task = {
  id: string;
  title: string;
  content: string;
  status: string;
  files: string[];
  created_by: string;
  role: string;
  code_changes: string;
  comments: any[];
};

export async function GET() {
  try {
    let tasks: Task[] = [];
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, 'utf8');
      tasks = JSON.parse(data);
    }
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newTask: Task = await request.json();

    let tasks: Task[] = [];
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = fs.readFileSync(DB_FILE_PATH, 'utf8');
      tasks = JSON.parse(data);
    }

    tasks.push(newTask);
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(tasks, null, 2));

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
}
