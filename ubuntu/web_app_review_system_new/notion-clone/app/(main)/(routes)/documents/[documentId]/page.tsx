import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from "next/dynamic";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Task, Id } from "@/src/mockBackend/mockDatabase";
import { getMockDocument, mockDocuments } from "../mockData";

export async function generateStaticParams() {
  return mockDocuments.map((doc) => ({
    documentId: doc.id,
  }));
}

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

export default function CodeReviewTaskPage({ params }: DocumentIdPageProps) {
  const document = getMockDocument(params.documentId);

  if (!document) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientSideContent document={document} />
    </Suspense>
  );
}

const ClientSideContent = dynamic(() => import('./ClientSideContent'), { ssr: false });
