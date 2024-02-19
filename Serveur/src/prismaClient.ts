import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:@localhost:5432/postgres?schema=public",
      },
    },
  });
}

prisma = global.prisma;

export default prisma;
