import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface CodeSubmissionProps {
  onSubmit: (code: string) => void;
}

export function CodeSubmission({ onSubmit }: CodeSubmissionProps) {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    onSubmit(code);
    setCode('');
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your code changes here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
      />
      <Button onClick={handleSubmit}>Submit Code Changes</Button>
    </div>
  );
}
