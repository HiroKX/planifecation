import prisma from "../prismaClient.js";
import { exclude, protectFromUsername } from "../tools/tools.js";
export const toDoQueries = {
  getTodoItemById: async (parent, args, context) => {
    const todoItem = await prisma.toDoItem.findFirstOrThrow({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    protectFromUsername(context, todoItem.user.username);
    const userWithoutPassword = exclude(todoItem.user, ["password"]);
    return { ...todoItem, user: userWithoutPassword };
  },
  getAllTodoItemsByUsername: async (parent, args, context) => {
    protectFromUsername(context, args.username);
    const todoItems = await prisma.toDoItem.findMany({
      where: {
        user: {
          username: args.username,
        },
      },
      include: {
        user: true,
      },
    });
    return todoItems.map((todoItem) => {
      const userWithoutPassword = exclude(todoItem.user, ["password"]);
      return { ...todoItem, user: userWithoutPassword };
    });
  },
};
