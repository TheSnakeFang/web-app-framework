import React from 'react';
import { VStack, Button, Text } from '@chakra-ui/react';

interface FileSelectionProps {
  files: string[];
  onFileSelect: (file: string) => void;
}

const FileSelection: React.FC<FileSelectionProps> = ({ files, onFileSelect }) => {
  return (
    <VStack align="stretch" spacing={2}>
      <Text fontWeight="bold" mb={2}>Files to modify:</Text>
      {files.map((file) => (
        <Button
          key={file}
          onClick={() => onFileSelect(file)}
          variant="outline"
          justifyContent="flex-start"
          width="100%"
        >
          {file}
        </Button>
      ))}
    </VStack>
  );
};

export default FileSelection;
