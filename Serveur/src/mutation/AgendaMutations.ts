import { exclude, protectFromUsername } from "../tools/tools.js";
import prisma from "../prismaClient.js";

export const agendaMutations = {
  createAgendaEvent: (parent, args, context) => {
    // Create an Agenda Event in the db
    if (!context.userInfo) {
      throw new Error("UNAUTHENTICATED" + context.msg);
    }

    return prisma.agendaEvent.create({
      data: {
        title: args.title,
        content: args.content,
        startDate: args.startDate,
        endDate: args.endDate,
        color: args.color,
        user: {
          connect: {
            id: context.userInfo.id,
          },
        },
      },
    });
  },

  updateAgendaEventById: async (parent, args, context) => {
    // Update an Agenda Event in the db
    const agendaTest = await prisma.agendaEvent.findFirstOrThrow({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    protectFromUsername(context, agendaTest.user.username);
    const agendaEvent = await prisma.agendaEvent.update({
      where: {
        id: args.id,
      },
      data: {
        title: args.title,
        content: args.content,
        startDate: args.startDate,
        endDate: args.endDate,
        color: args.color,
      },
      include: {
        user: true,
      },
    });
    const userWithoutPassword = exclude(agendaEvent.user, ["password"]);
    return { ...agendaEvent, user: userWithoutPassword };
  },

  deleteAgendaEventById: async (parent, args, context) => {
    // Delete an Agenda Event in the db
    const agendaTest = await prisma.agendaEvent.findFirstOrThrow({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    protectFromUsername(context, agendaTest.user.username);
    const agendaEvent = await prisma.agendaEvent.delete({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    const userWithoutPassword = exclude(agendaEvent.user, ["password"]);
    return { ...agendaEvent, user: userWithoutPassword };
  },
};
