"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { getTaskById, updateTask } from "@/src/mockBackend/mockApi";
import { Task } from "@/src/mockBackend/mockDatabase";

interface DocumentIdPageClientProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPageClient = ({ params }: DocumentIdPageClientProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    [],
  );

  const [document, setDocument] = useState<Task | null | undefined>(undefined);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const fetchedDocument = await getTaskById(params.documentId);
        setDocument(fetchedDocument);
      } catch (error) {
        console.error("Failed to fetch document:", error);
        setDocument(null);
      }
    };

    fetchDocument();
  }, [params.documentId]);

  const onChange = async (content: string) => {
    if (document) {
      try {
        await updateTask(params.documentId, { content });
        setDocument({ ...document, content });
      } catch (error) {
        console.error("Failed to update document:", error);
      }
    }
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdPageClient;
