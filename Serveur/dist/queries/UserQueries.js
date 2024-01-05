import prisma from '../prismaClient.js';
import { exclude, protectFromUsername } from '../tools/tools.js';
export const userQueries = {
    getUserByUsername: async (parent, args, context) => {
        protectFromUsername(context, args.username);
        const user = await prisma.user.findFirstOrThrow({
            where: {
                username: args.username
            }
        });
        return exclude(user, ['password']);
    },
};
