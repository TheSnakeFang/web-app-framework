import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export async function generateStaticParams() {
  const documentIds = ["doc1", "doc2", "doc3"];

  return documentIds.map((id) => ({
    documentId: id,
  }));
}

export { default } from './page';
