import { Id } from "@/convex/_generated/dataModel";

export async function generateStaticParams() {
  const documentIds = ["doc1", "doc2", "doc3"];

  return documentIds.map((id) => ({
    documentId: id,
  }));
}

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

import DocumentIdPageClient from './DocumentIdPageClient';

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  return <DocumentIdPageClient params={params} />;
};

export default DocumentIdPage;
