import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface FileListProps {
  files: string[];
  onFileClick: (file: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4">
      <Button
        onClick={toggleExpand}
        variant="ghost"
        className="flex items-center"
      >
        {isExpanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
        Files to be modified
      </Button>
      {isExpanded && (
        <ul className="ml-6 mt-2">
          {files.map((file, index) => (
            <li key={index} className="mb-1">
              <Button
                onClick={() => onFileClick(file)}
                variant="ghost"
                className="text-blue-500 hover:underline"
              >
                {file}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
