"use client";

import { useMemo } from "react";
import { useMockAuth } from "@/lib/mockAuthClient";
import dynamic from "next/dynamic";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Task } from "@/src/mockBackend/mockDatabase";

interface ClientSideContentProps {
  document: Task;
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({ document }) => {
  const { user } = useMockAuth();
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );

  const onChange = (content: string) => {
    console.log("Content updated:", content);
    // In a real app, you would update the document here
  };

  const onApprove = () => {
    console.log("Document approved");
    // In a real app, you would update the document status here
  };

  const onDisapprove = () => {
    console.log("Document disapproved");
    // In a real app, you would update the document status here
  };

  const isReviewer = user?.publicMetadata.role === 'Reviewer';

  return (
    <div className="pb-40">
      {document.coverImage && <Cover url={document.coverImage} />}
      <Card className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <Toolbar initialData={document} />
        </CardHeader>
        <CardContent>
          {isReviewer && (
            <div className="flex justify-end space-x-2 mb-4">
              <Button onClick={onApprove} variant="outline" className="bg-green-500 text-white">Approve</Button>
              <Button onClick={onDisapprove} variant="outline" className="bg-red-500 text-white">Disapprove</Button>
            </div>
          )}
          <Editor onChange={onChange} initialContent={document.content} />
          {/* TODO: Add comment section component here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSideContent;
