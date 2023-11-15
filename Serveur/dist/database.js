const { PrismaClient } = require('@prisma/client');
export const prisma = new PrismaClient();
module.exports = {
    prisma,
};
