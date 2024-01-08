import prisma from "../prismaClient.js";
import { exclude, protectFromUsername } from "../tools/tools.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY; // Replace with your secret key

export const userMutation = {
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

  logUser: async (_, { username, password }) => {
    // Login the user and return a JWT which will be used to authenticate later.
    const user = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });

    // Generate and return JWT
    return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
  },
};
