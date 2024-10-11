import React, { useState } from 'react';
import { Box, VStack, Text, Textarea, Button, HStack, Input } from '@chakra-ui/react';

interface Comment {
  id: string;
  text: string;
  lineNumber?: number;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Omit<Comment, 'id'>) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [lineNumber, setLineNumber] = useState<number | undefined>(undefined);

  console.log("CommentSection rendered with comments:", comments);

  const handleAddComment = () => {
    console.log("handleAddComment called with:", newComment, lineNumber);
    if (newComment.trim()) {
      onAddComment({ text: newComment.trim(), lineNumber });
      setNewComment('');
      setLineNumber(undefined);
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Comments</Text>
      <VStack align="stretch" spacing={4} mb={4}>
        {comments.map((comment) => (
          <Box key={comment.id} p={2} borderWidth={1} borderRadius="md">
            {comment.lineNumber && (
              <Text fontSize="sm" color="gray.500">Line {comment.lineNumber}</Text>
            )}
            <Text>{comment.text}</Text>
          </Box>
        ))}
      </VStack>
      <VStack align="stretch" spacing={2}>
        <HStack>
          <Input
            placeholder="Line number (optional)"
            type="number"
            value={lineNumber || ''}
            onChange={(e) => setLineNumber(e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </HStack>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button onClick={handleAddComment} colorScheme="blue">
          Add Comment
        </Button>
      </VStack>
    </Box>
  );
};

export default CommentSection;
