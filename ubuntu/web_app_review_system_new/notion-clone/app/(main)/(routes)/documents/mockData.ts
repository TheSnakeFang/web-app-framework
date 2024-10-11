import { mockTasks, Id } from "@/src/mockBackend/mockDatabase";
export type Task = typeof mockTasks[number];

export const mockDocuments: Task[] = [
  {
    id: 'placeholder-id-1' as Id<"documents">,
    createdBy: 'user-1',
    title: "Sample Document 1",
    content: "This is the content of sample document 1.",
    coverImage: "https://example.com/cover1.jpg",
    icon: "📄",
    isArchived: false,
    isPublished: true,
    parentDocument: undefined,
    comments: [
      {
        id: "comment-1",
        taskId: 'placeholder-id-1' as Id<"documents">,
        userId: "user-2",
        content: "Great work!",
        createdAt: new Date(),
      }
    ],
    role: "Programmer",
    files: ["file1.js", "file2.js"],
    codeChanges: "// Some code changes",
    status: "pending"
  },
  {
    id: 'placeholder-id-2' as Id<"documents">,
    createdBy: 'user-2',
    title: "Sample Document 2",
    content: "This is the content of sample document 2.",
    coverImage: undefined,
    icon: "📝",
    isArchived: false,
    isPublished: false,
    parentDocument: undefined,
    comments: [],
    role: "Reviewer",
    files: ["file3.js"],
    codeChanges: "// Some other code changes",
    status: "approved"
  },
];

export function getMockDocument(id: Id<"documents">): Task | undefined {
  return mockDocuments.find(doc => doc.id === id);
}
