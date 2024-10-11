import React, { useState } from 'react';
import { Box, Button, Textarea, VStack } from '@chakra-ui/react';

interface CodeSubmissionProps {
  onSubmit: (code: string) => void;
}

const CodeSubmission: React.FC<CodeSubmissionProps> = ({ onSubmit }) => {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    onSubmit(code);
    setCode('');
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code changes here..."
          minHeight="200px"
        />
        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default CodeSubmission;
