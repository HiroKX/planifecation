import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import { noteMutation } from "./mutation/NoteMutation.js";
import { toDoMutation } from "./mutation/ToDoMutation.js";
import { userMutation } from "./mutation/UserMutation.js";
import { toDoQueries } from "./queries/ToDoQueries.js";
import { userQueries } from "./queries/UserQueries.js";
import { noteQueries } from "./queries/NoteQueries.js";
import { DateScalar } from "./types/DateScalar.js";
import { typeDefs } from "./types/TypeDefs.js";

//Création du prisma client
const SECRET_KEY = process.env.SECRET_KEY; // Replace with your secret key

const queryResolvers = {
  ...userQueries,
  ...noteQueries,
  ...toDoQueries,
};

const mutationResolvers = {
  ...userMutation,
  ...noteMutation,
  ...toDoMutation,
};

const resolvers = {
  DateScalar: DateScalar,
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
});

let port: number = +process.env.PORT;
const { url } = await startStandaloneServer(server, {
  // Your async context function should async and
  // return an object
  listen: { port: port },
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    // Verify the token and then return the user associated.
    let userInfo;
    if (token) {
      try {
        userInfo = jwt.verify(token, SECRET_KEY);
      } catch (err) {
        return { msg: "Verification failed." };
      }
    }
    return { userInfo };
  },
});

console.log(`🚀  Server ready at: ${url}`);
