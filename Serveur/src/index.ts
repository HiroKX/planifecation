import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'votre_secret_très_sécurisé'; // Replace with your secret key

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
    login(username: String!, password: String!): String
 }
`;

const resolvers = {
  Query: {
    user: (parent,args,context) => { // Query that return the first user.
      if (!context.userInfo) {
        throw new Error("UNAUTHENTICATED"  + context.msg);
      }
      return prisma.user.findFirstOrThrow();
    },
    users: (parent,args,context) => { // Query that return all the users.
      if (!context.userInfo) {
        throw new Error("UNAUTHENTICATED : " + context.msg);
      }
        return prisma.user.findMany();
      }
  },
  Mutation: {
    createUser: (parent, args) => { // Create a user in the db
        return prisma.user.create({
          data: {
            id: args.id,
            login: args.login,
            password: args.password,

        });
      },
      login: async (_, { username, password }) => { // Login the user and return a JWT which will be used to authenticate later.

        const user = await prisma.user.findUnique({where: {login: username, password: password}});
        
        // Generate JWT
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        return token; // Return the token
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


const { url } = await startStandaloneServer(server, {
  // Your async context function should async and
  // return an object
  listen: { port: 4000},
  context: async({ req }) => {
    const token = req.headers.authorization || '';
    // Verify the token and then return the user associated.
    let userInfo;
    if (token) {
      try {
        userInfo = jwt.verify(token, SECRET_KEY);
      } catch (err) {
          return {msg: "Verification failed."};
      }
    }
    return { userInfo };
  },
});


console.log(`🚀  Server ready at: ${url}`);