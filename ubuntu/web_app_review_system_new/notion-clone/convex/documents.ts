import { Task, Comment, Id } from "../src/mockBackend/mockDatabase";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  approveTask,
  disapproveTask,
  addComment,
} from "../src/mockBackend/mockApi";

export const archive = async (id: Id<"documents">) => {
  const task = await getTask(id);
  if (!task) {
    throw new Error("Task not found");
  }
  return updateTask(id, { isArchived: true });
};

export const getSidebar = async (parentDocument: Id<"documents"> | null) => {
  const tasks = await getTasks();
  return tasks.filter(
    (task) =>
      task.parentDocument === parentDocument && !task.isArchived
  );
};

export const create = async (title: string, parentDocument: Id<"documents"> | undefined) => {
  return createTask({
    title,
    parentDocument,
    content: "",
    coverImage: "",
    icon: "",
    isArchived: false,
    isPublished: false,
    createdBy: "default_user", // We need to implement proper user management
    status: "pending",
    role: "Programmer",
    files: [],
    codeChanges: "",
  });
};

export const getTrash = async () => {
  const tasks = await getTasks();
  return tasks.filter((task) => task.isArchived);
};

export const restore = async (id: Id<"documents">) => {
  return updateTask(id, { isArchived: false });
};

export const remove = async (id: Id<"documents">) => {
  return deleteTask(id);
};

export const getSearch = async (query: string) => {
  const tasks = await getTasks();
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const getById = async (id: Id<"documents">) => {
  return getTask(id);
};

export const update = async (id: Id<"documents">, updates: Partial<Task>) => {
  return updateTask(id, updates);
};

export const removeIcon = async (id: Id<"documents">) => {
  return updateTask(id, { icon: "" });
};

export const removeCoverImage = async (id: Id<"documents">) => {
  return updateTask(id, { coverImage: "" });
};

export const approve = async (id: Id<"documents">) => {
  return approveTask(id);
};

export const disapprove = async (id: Id<"documents">) => {
  return disapproveTask(id);
};

export const addCommentToTask = async (id: Id<"documents">, comment: Omit<Comment, "id" | "createdAt" | "taskId">) => {
  return addComment(id, comment);
};
