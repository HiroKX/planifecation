import prisma from "../prismaClient.js";
import { exclude, protectFromUsername } from "../tools/tools.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY; // Replace with your secret key

export const userMutations = {
  createUser: async (parent, args) => {
    // Create a user in the db
    const user = await prisma.user.create({
      data: {
        username: args.username,
        password: args.password,
      },
    });
    return exclude(user, ["password"]);
  },

  updateUser: async (parent, args, context) => {
    // Update a user in the db
    if (!context.userInfo) {
      throw new Error("UNAUTHENTICATED" + context.msg);
    }
    const user = await prisma.user.update({
      where: {
        username: args.username,
      },
      data: {
        password: args.password,
      },
    });
    return exclude(user, ["password"]);
  },

  deleteUser: async (parent, args, context) => {
    // Delete a user in the db
    protectFromUsername(context, args.username);
    const user = await prisma.user.delete({
      where: {
        username: args.username,
      },
    });
    return exclude(user, ["password"]);
  },
};
