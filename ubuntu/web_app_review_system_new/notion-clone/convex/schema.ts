import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    role: v.string(),
    files: v.array(v.string()),
    codeChanges: v.string(),
    status: v.string(),
    comments: v.array(v.object({
      id: v.string(),
      userId: v.string(),
      text: v.string(),
      lineNumber: v.optional(v.number()),
      createdAt: v.string(),
    })),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});
