"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FileIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TaskReview from "@/src/components/reviewer/TaskReview";
import CommentSection from "@/src/components/programmer/CommentSection";
import { useMockAuth } from "@/lib/mockAuthClient";
import { supabase } from "@/lib/supabase";
import { Task, Comment } from "@/src/mockBackend/mockDatabase";
import { CodeSubmission } from "@/components/CodeSubmission";

interface UpdateTaskInput {
  title?: string;
  content?: string;
  status?: 'pending' | 'approved' | 'disapproved';
  files?: string[];
  comments?: Comment[];
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [codeChanges, setCodeChanges] = useState<string>('');
  const { user } = useMockAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } else {
      console.log('Tasks fetched successfully:', data);
      setTasks(data);
    }
  };

  const isProgrammer = user?.publicMetadata.role === 'Programmer';
  const isReviewer = user?.publicMetadata.role === 'Reviewer';

  const onCreate = async () => {
    try {
      const newTask = {
        title: `New Task ${tasks.length + 1}`,
        status: 'pending',
        files: ['example.js', 'example.css'],
        created_by: user?.id,
        role: 'Programmer',
        code_changes: '',
        comments: [],
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();

      if (error) throw error;
      setTasks([data, ...tasks]);
      toast.success('New task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  const toggleTask = (taskId: string) => {
    console.log('Toggling task:', taskId);
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const selectFile = (fileName: string) => {
    setSelectedFile(fileName);
    setCodeChanges(`// Mock content for ${fileName}\n\nfunction exampleFunction() {\n  console.log("This is a mock file content for ${fileName}");\n}\n`);
  };

  const submitTask = async (taskId: string, code: string) => {
    console.log('Submitting task:', taskId, 'with code:', code);
    const { data, error } = await supabase
      .from('tasks')
      .update({ content: code, status: 'submitted' })
      .eq('id', taskId)
      .select();

    if (error) {
      console.error('Error submitting task:', error);
      toast.error('Failed to submit task');
    } else {
      console.log('Task submitted successfully:', data[0]);
      toast.success('Task submitted successfully');
      fetchTasks(); // Refresh the task list
    }
  };

  const approveTaskHandler = async (taskId: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ status: 'approved' })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      setTasks(tasks.map(task => task.id === taskId ? data : task));
      toast.success("Task approved successfully.");
    } catch (error) {
      console.error("Error approving task:", error);
      toast.error("Failed to approve task.");
    }
  };

  const disapproveTaskHandler = async (taskId: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ status: 'disapproved' })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      setTasks(tasks.map(task => task.id === taskId ? data : task));
      toast.success("Task disapproved and sent back to programmer.");
    } catch (error) {
      console.error("Error disapproving task:", error);
      toast.error("Failed to disapprove task.");
    }
  };

  const addCommentHandler = async (taskId: string, comment: { text: string; lineNumber?: number }) => {
    try {
      const { data: task, error: taskError } = await supabase
        .from('tasks')
        .select('comments')
        .eq('id', taskId)
        .single();

      if (taskError) throw taskError;

      const updatedComments = [...(task.comments || []), {
        id: Date.now().toString(),
        content: comment.text,
        userId: user?.id || "",
        lineNumber: comment.lineNumber
      }];

      const { data, error } = await supabase
        .from('tasks')
        .update({ comments: updatedComments })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? data : task));
      toast.success("Comment added successfully.");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/2 p-4 overflow-auto">
        <Button onClick={onCreate}>Create New Task</Button>
        {tasks?.map((task) => (
          <Card key={task.id} className="mb-4">
            <CardContent>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <Button onClick={() => toggleTask(task.id)}>
                  {expandedTask === task.id ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              {expandedTask === task.id && (
                <>
                  <p>Status: {task.status}</p>
                  {isProgrammer ? (
                    <>
                      {task.files.map((file) => (
                        <Button
                          key={file}
                          variant="outline"
                          className="mr-2 mb-2"
                          onClick={() => selectFile(file)}
                        >
                          <FileIcon className="mr-2 h-4 w-4" />
                          {file}
                        </Button>
                      ))}
                      {selectedFile && (
                        <div className="mb-2">
                          <h4 className="font-bold">Selected File: {selectedFile}</h4>
                          <pre className="bg-gray-100 p-2 rounded">
                            {codeChanges}
                          </pre>
                        </div>
                      )}
                      <CodeSubmission
                        onSubmit={(code) => {
                          setCodeChanges(code);
                          submitTask(task.id, code);
                        }}
                      />
                    </>
                  ) : (
                    <TaskReview
                      task={task}
                      onApprove={() => approveTaskHandler(task.id)}
                      onDisapprove={() => disapproveTaskHandler(task.id)}
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <CommentSection
        taskId={expandedTask}
        comments={tasks.find(t => t.id === expandedTask)?.comments || []}
        onAddComment={addCommentHandler}
      />
    </div>
  );
};

export default Dashboard;
