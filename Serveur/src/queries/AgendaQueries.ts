import prisma from "../prismaClient.js";
import { exclude, protectFromUsername } from "../tools/tools.js";

export const agendaQueries = {
  getAgendaEventById: async (parent, args, context) => {
    // Get an Agenda Event in the db by its id
    const agendaEvent = await prisma.AgendaEvent.findFirstOrThrow({
      where: {
        id: args.id,
      },
      include: {
        user: true,
      },
    });
    protectFromUsername(context, AgendaEvent.user.username);
    const userWithoutPassword = exclude(agendaEvent.user, ["password"]);
    return { ...agendaEvent, user: userWithoutPassword };
  },

  getAllTodoItemsByUsername: async (parent, args, context) => {
    // Get all the Agenda Events by the username of the User who owns the events
    protectFromUsername(context, args.username);
    const agendaEvents = await prisma.AgendaEvent.findMany({
      where: {
        user: {
          username: args.username,
        },
      },
      include: {
        user: true,
      },
    });
    return agendaEvents.map((event) => {
      const userWithoutPassword = exclude(event.user, ["password"]);
      return { ...event, user: userWithoutPassword };
    });
  },
};