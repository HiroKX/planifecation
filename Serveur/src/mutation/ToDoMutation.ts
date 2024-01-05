import prisma from "../prismaClient.js";
import { exclude, protectFromUsername } from "../tools/tools.js";

export const toDoMutation = {
    createTodoItem : (parent, args, context) => {
        // Create a todoItem in the db
        if (!context.userInfo) {
          throw new Error("UNAUTHENTICATED" + context.msg);
        }
  
        return prisma.toDoItem.create({
          data: {
            content: args.content,
            isDone: args.isDone,
            user: {
              connect: {
                id: context.userInfo.id,
              },
            },
          },
        });
      },
  
      updateTodoItemById:async (parent, args, context) => {
        const todoTest = await prisma.toDoItem.findFirstOrThrow({
          where: {
            id: args.id,
          },
          include:{
            user: true
          }
        });
        protectFromUsername(context,todoTest.user.username)
        const todoItem = await prisma.toDoItem.update({
          where: {
            id: args.id,
          },
          data: {
            content: args.content,
            isDone: args.isDone,
            updatedAt: new Date(),
          },
          include:{
            user: true
          }
        });
        const userWithoutPassword = exclude(todoItem.user, ['password']);
        return { ...todoItem, user: userWithoutPassword };
      },
  
      deleteTodoItemById:async (parent, args, context) => {
        const todoTest = await prisma.toDoItem.findFirstOrThrow({
          where: {
            id: args.id,
          },
          include:{
            user: true
          }
        });
        protectFromUsername(context,todoTest.user.username)
        const todoItem = await prisma.toDoItem.delete({
          where: {
            id: args.id,
          },
          include:{
            user: true
          }
        });
        const userWithoutPassword = exclude(todoItem.user, ['password']);
        return { ...todoItem, user: userWithoutPassword };
      },

}