import { exclude, protectFromUsername } from "../tools/tools.js";
import prisma from "../prismaClient";

export const agendaMutations = {
  createAgendaEvent: (parent, args, context) => {
    // Create an Agenda Event in the db
    if (!context.userInfo) {
      throw new Error("UNAUTHENTICATED" + context.msg);
    }

    return prisma.AgendaEvent.create({
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
    const agendaTest = await prisma.AgendaEvent.findFirstOrThrow({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    protectFromUsername(context, agendaTest.user.username);
    const agendaEvent = await prisma.AgendaEvent.update({
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
    const agendaTest = await prisma.AgendaEvent.findFirstOrThrow({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    protectFromUsername(context, agendaTest.user.username);
    const agendaEvent = await prisma.AgendaEvent.delete({
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
