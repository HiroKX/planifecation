import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `
  type User {
    id: Int
    login: String
    password: String
  }

  type Query {
    user: User
    users: [User]
  }

  type Mutation {
    createUser(id: Int, login: String, password: String): User
 }
`;

const resolvers = {
  Query: {
    user: () => {
      return prisma.user.findFirstOrThrow();
    },
    users: () => {
        return prisma.user.findMany();
      }
  },
  Mutation: {
    createUser: (parent, args) => {
        return prisma.user.create({
          data: {
            id: args.id,
            login: args.login,
            password: args.password,
          },
        });
      },
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000},
});

console.log(`🚀  Server ready at: ${url}`);