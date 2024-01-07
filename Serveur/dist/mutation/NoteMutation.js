import prisma from "../prismaClient.js";
import { exclude, protectFromUsername } from "../tools/tools.js";
export const noteMutation = {
    createNote: (parent, args, context) => {
        // Create a note in the db
        if (!context.userInfo) {
            throw new Error("UNAUTHENTICATED" + context.msg);
        }
        return prisma.note.create({
            data: {
                title: args.title,
                content: args.content,
                user: {
                    connect: {
                        id: context.userInfo.id,
                    },
                },
            },
        });
    },
    updateNoteById: async (parent, args, context) => {
        const noteTest = await prisma.note.findFirstOrThrow({
            where: {
                id: args.id,
            },
            include: {
                user: true
            }
        });
        protectFromUsername(context, noteTest.user.username);
        const note = await prisma.note.update({
            where: {
                id: args.id,
            },
            data: {
                title: args.title,
                content: args.content,
                updatedAt: new Date(),
            },
            include: {
                user: true
            }
        });
        const userWithoutPassword = exclude(note.user, ['password']);
        return { ...note, user: userWithoutPassword };
    },
    deleteNoteById: async (parent, args, context) => {
        const noteTest = await prisma.note.findFirstOrThrow({
            where: {
                id: args.id,
            },
            include: {
                user: true
            }
        });
        protectFromUsername(context, noteTest.user.username);
        const note = await prisma.note.delete({
            where: {
                id: args.id,
            },
            include: {
                user: true
            }
        });
        const userWithoutPassword = exclude(note.user, ['password']);
        return { ...note, user: userWithoutPassword };
    },
};
