import prisma from "../prismaClient.js";
import { exclude, protectFromUsername } from "../tools/tools.js";
export const noteQueries = {
  getNoteById: async (parent, args, context) => {
    const note = await prisma.note.findFirstOrThrow({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    protectFromUsername(context, note.user.username);
    const userWithoutPassword = exclude(note.user, ["password"]);
    return { ...note, user: userWithoutPassword };
  },
  getAllNotesByUsername: async (parent, args, context) => {
    protectFromUsername(context, args.username);
    const notes = await prisma.note.findMany({
      where: {
        user: {
          username: args.username,
        },
      },
      include: {
        user: true,
      },
    });
    return notes.map((note) => {
      const userWithoutPassword = exclude(note.user, ["password"]);
      return { ...note, user: userWithoutPassword };
    });
  },
};
