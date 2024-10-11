import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TaskCreationProps {
  onTaskCreated: (task: any) => void;
}

const TaskCreation: React.FC<TaskCreationProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [codeChanges, setCodeChanges] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      title,
      content,
      status: 'pending',
      files,
      created_by: 'current-user-id', // This should be replaced with actual user ID
      role: 'Programmer',
      code_changes: codeChanges,
      comments: []
    };
    try {
      const fs = require('fs');
      const path = require('path');
      const dbFilePath = path.join(process.cwd(), 'mockDatabase.json');

      let mockDatabase = { tasks: [] };
      if (fs.existsSync(dbFilePath)) {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        mockDatabase = JSON.parse(data);
      }

      mockDatabase.tasks.push(newTask);
      fs.writeFileSync(dbFilePath, JSON.stringify(mockDatabase, null, 2));

      onTaskCreated(newTask);
      // Reset form
      setTitle('');
      setContent('');
      setFiles([]);
      setCodeChanges('');
      console.log('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleFileAdd = () => {
    setFiles([...files, '']);
  };

  const handleFileChange = (index: number, value: string) => {
    const newFiles = [...files];
    newFiles[index] = value;
    setFiles(newFiles);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Task Description"
        required
      />
      <div>
        <Button type="button" onClick={handleFileAdd}>Add File</Button>
        {files.map((file, index) => (
          <Input
            key={index}
            type="text"
            value={file}
            onChange={(e) => handleFileChange(index, e.target.value)}
            placeholder="File name"
            className="mt-2"
          />
        ))}
      </div>
      <Textarea
        value={codeChanges}
        onChange={(e) => setCodeChanges(e.target.value)}
        placeholder="Code Changes"
        required
      />
      <Button type="submit">Create Task</Button>
    </form>
  );
};

export default TaskCreation;
