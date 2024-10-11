import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Button, Collapse, Textarea, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast, List, ListItem } from '@chakra-ui/react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabase';

interface Task {
  id: string;
  title: string;
  files: string[];
  status: string;
  code_changes?: string;
  comments?: string[];
}

const ProgrammerDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [codeChanges, setCodeChanges] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskFiles, setNewTaskFiles] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: 'Error fetching tasks',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
    setSelectedFile(null);
  };

  const selectFile = (file: string) => {
    setSelectedFile(file);
  };

  const handleSubmitTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ code_changes: codeChanges, comments: [comments], status: 'submitted' })
        .eq('id', taskId);

      if (error) throw error;

      toast({
        title: 'Task submitted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setCodeChanges('');
      setComments('');
      setExpandedTask(null);
      setSelectedFile(null);
      fetchTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
      toast({
        title: 'Error submitting task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateTask = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title: newTaskTitle,
            files: newTaskFiles.split(',').map(file => file.trim()),
            status: 'pending',
            role: 'Programmer',
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: 'Task created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setNewTaskTitle('');
      setNewTaskFiles('');
      onClose();
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: 'Error creating task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <HStack align="flex-start" spacing={8}>
      <Box flex={1}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Programmer Dashboard</Text>
        <Button onClick={onOpen} colorScheme="green" mb={4}>Create New Task</Button>
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
                    <Text fontWeight="semibold">Files:</Text>
                    <List spacing={1}>
                      {task.files.map((file) => (
                        <ListItem key={file}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => selectFile(file)}
                            colorScheme={selectedFile === file ? "blue" : "gray"}
                          >
                            {file}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </VStack>
      </Box>
      <Box flex={1}>
        <Card>
          <CardContent>
            <VStack spacing={4} align="stretch">
              {selectedFile && (
                <Text>Selected File: {selectedFile}</Text>
              )}
              <Label htmlFor="codeChanges">Code Changes</Label>
              <Textarea
                id="codeChanges"
                value={codeChanges}
                onChange={(e) => setCodeChanges(e.target.value)}
                placeholder="Enter your code changes here..."
                rows={10}
              />
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter your comments here..."
                rows={5}
              />
            </VStack>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSubmitTask(expandedTask!)} colorScheme="blue" isDisabled={!expandedTask}>
              Submit Task
            </Button>
          </CardFooter>
        </Card>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <Input
                placeholder="Files (comma-separated)"
                value={newTaskFiles}
                onChange={(e) => setNewTaskFiles(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateTask}>
              Create Task
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default ProgrammerDashboard;
