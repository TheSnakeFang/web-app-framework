import { mutation } from "./_generated/server";

export const seed = mutation({
  handler: async (ctx) => {
    // Mock user IDs
    const programmerUserId = "programmer123";
    const reviewerUserId = "reviewer456";

    // Create mock tasks
    const task1 = await ctx.db.insert("documents", {
      title: "Implement login functionality",
      userId: programmerUserId,
      isArchived: false,
      isPublished: true,
      role: "programmer",
      files: ["login.js", "auth.js"],
      codeChanges: "Added login form and authentication logic",
      status: "pending",
      comments: [],
    });

    const task2 = await ctx.db.insert("documents", {
      title: "Refactor database queries",
      userId: programmerUserId,
      isArchived: false,
      isPublished: true,
      role: "programmer",
      files: ["database.js", "queries.js"],
      codeChanges: "Optimized database queries for better performance",
      status: "pending",
      comments: [],
    });

    // Add comments to tasks
    await ctx.db.patch(task1, {
      comments: [
        {
          id: "comment1",
          userId: reviewerUserId,
          text: "Please add input validation",
          lineNumber: 15,
          createdAt: new Date().toISOString(),
        },
      ],
    });

    await ctx.db.patch(task2, {
      comments: [
        {
          id: "comment2",
          userId: reviewerUserId,
          text: "Consider using prepared statements",
          lineNumber: 7,
          createdAt: new Date().toISOString(),
        },
      ],
    });

    console.log("Seed data inserted successfully");
  },
});
