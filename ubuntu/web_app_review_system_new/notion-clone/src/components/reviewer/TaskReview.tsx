import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseDiff, Diff, Hunk } from 'react-diff-view';
import { File as FileData, Hunk as HunkData } from 'gitdiff-parser';
import 'react-diff-view/style/index.css';
import CommentSection from '../programmer/CommentSection';
import ApprovalPanel from './ApprovalPanel';
import { Task, Comment, Id } from '@/src/mockBackend/mockDatabase';

interface TaskReviewProps {
  task: Task;
  onApprove: (taskId: Id<'documents'>) => void;
  onDisapprove: (taskId: Id<'documents'>) => void;
  onAddComment: (taskId: Id<'documents'>, comment: { content: string; lineNumber?: number }) => void;
}

const TaskReview: React.FC<TaskReviewProps> = ({ task, onApprove, onDisapprove, onAddComment }) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedFiles = parseDiff(task.codeChanges);
      setFiles(parsedFiles);
      setIsLoading(false);
    } catch (err) {
      setError('Error parsing diff: ' + (err instanceof Error ? err.message : String(err)));
      setIsLoading(false);
    }
  }, [task.codeChanges]);

  const renderFile = (file: FileData) => {
    return (
      <Diff
        key={file.oldPath + file.newPath}
        viewType="unified"
        diffType={file.type}
        hunks={file.hunks}
      >
        {(hunks: HunkData[]) => (
          <>
            {hunks.map((hunk) => (
              <Hunk key={hunk.content} hunk={hunk} />
            ))}
          </>
        )}
      </Diff>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ApprovalPanel
          onApprove={() => onApprove(task.id)}
          onDisapprove={() => onDisapprove(task.id)}
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Files:</h3>
          {task.files.map((file) => (
            <p key={file}>{file}</p>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Code Changes:</h3>
          {files.map(renderFile)}
        </div>
        <CommentSection
          comments={task.comments}
          onAddComment={(comment: Comment) => onAddComment(task.id, comment)}
        />
      </CardContent>
    </Card>
  );
};
