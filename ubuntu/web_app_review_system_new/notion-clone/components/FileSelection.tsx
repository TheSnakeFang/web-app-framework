import React, { useState } from 'react';
import { Button } from "./ui/button";

interface File {
  id: string;
  name: string;
  content: string;
}

interface FileSelectionProps {
  files: File[];
  onFileSelect: (file: File) => void;
}

export function FileSelection({ files, onFileSelect }: FileSelectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select a file to view:</h3>
      <div className="space-y-2">
        {files.map((file) => (
          <Button
            key={file.id}
            onClick={() => handleFileSelect(file)}
            variant={selectedFile?.id === file.id ? "default" : "outline"}
          >
            {file.name}
          </Button>
        ))}
      </div>
      {selectedFile && (
        <div className="mt-4">
          <h4 className="text-md font-semibold">{selectedFile.name}</h4>
          <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-x-auto">
            {selectedFile.content}
          </pre>
        </div>
      )}
    </div>
  );
}
