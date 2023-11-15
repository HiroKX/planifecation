import { prisma } from '../../database';
const Query = {
    student: (parent, args) => {
        return prisma.student.findFirst({
            where: { id: Number(args.id) },
        });
    },
};
export const resolvers = {
    Query,
};
module.exports = {
    resolvers,
};
