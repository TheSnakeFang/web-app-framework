import React, { useState } from 'react';
import { Box, VStack, Text, Button, Collapse, Textarea, HStack } from '@chakra-ui/react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactDiffViewer from 'react-diff-viewer-continued';

interface Task {
  id: string;
  title: string;
  files: string[];
  status: 'pending' | 'approved' | 'disapproved';
  originalCode: string;
  updatedCode: string;
}

const ReviewerDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Task 1',
      files: ['file1.js', 'file2.js'],
      status: 'pending',
      originalCode: 'console.log("Hello World");',
      updatedCode: 'console.log("Hello, World!");'
    },
    {
      id: '2',
      title: 'Task 2',
      files: ['file3.js', 'file4.js'],
      status: 'pending',
      originalCode: 'function add(a, b) { return a + b; }',
      updatedCode: 'const add = (a, b) => a + b;'
    },
  ]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [comments, setComments] = useState<string>('');

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleApprove = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'approved' } : task
    ));
  };

  const handleDisapprove = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'disapproved' } : task
    ));
  };

  const handleCommentSubmit = (taskId: string) => {
    console.log(`Submitting comment for task ${taskId}:`, comments);
    // TODO: Implement comment submission logic
    setComments('');
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Reviewer Dashboard</Text>
      <VStack align="stretch" spacing={4}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent>
              <Button
                onClick={() => toggleTask(task.id)}
                variant="ghost"
                justifyContent="space-between"
                width="100%"
              >
                <Text>{task.title}</Text>
                <Text>{expandedTask === task.id ? '▲' : '▼'}</Text>
              </Button>
              <Collapse in={expandedTask === task.id}>
                <VStack align="stretch" mt={2}>
                  {task.files.map((file) => (
                    <Button key={file} variant="outline" size="sm">
                      {file}
                    </Button>
                  ))}
                  <Text>Status: {task.status}</Text>
                  <ReactDiffViewer
                    oldValue={task.originalCode}
                    newValue={task.updatedCode}
                    splitView={true}
                  />
                  <Label htmlFor={`comments-${task.id}`}>Comments</Label>
                  <Textarea
                    id={`comments-${task.id}`}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Enter your comments here..."
                    rows={5}
                  />
                  <HStack spacing={4}>
                    <Button onClick={() => handleApprove(task.id)} colorScheme="green">
                      Approve
                    </Button>
                    <Button onClick={() => handleDisapprove(task.id)} colorScheme="red">
                      Disapprove
                    </Button>
                    <Button onClick={() => handleCommentSubmit(task.id)} colorScheme="blue">
                      Submit Comment
                    </Button>
                  </HStack>
                </VStack>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default ReviewerDashboard;
