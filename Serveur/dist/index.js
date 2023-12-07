import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { GraphQLScalarType } from "graphql/type/index.js";
import { Kind } from "graphql/language/index.js";
//Création du prisma client
const prisma = new PrismaClient();
const SECRET_KEY = 'votre_secret_très_sécurisé'; // Replace with your secret key
const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            return value.getTime(); // Convert outgoing Date to integer for JSON
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
        if (typeof value === 'number') {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});
const typeDefs = `
  scalar DateScalar
  
  type User {
    id: Int
    username: String!
    password: String
  }
  
  type Note {
    id: Int
    title: String!
    content: String!
    user: User!
    createdAt: DateScalar
    updatedAt: DateScalar
  }

  type Query {
    getUserByUsername(username: String!): User
    getAllUsers: [User]
    getNoteById(id: Int): Note
    getAllNotesByUsername(username: String!): [Note]
  }

  type Mutation {
    createUser(username: String!, password: String!): User
    updateUser(username: String!, password: String!): User
    deleteUser(username: String!): User
    logUser(username: String!, password: String!): String
    createNote(title: String!, content: String!): Note
    updateNoteById(id: Int!, title: String!, content: String!): Note
    deleteNoteById(id: Int!): Note
 }
`;
function exclude(user, keys) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
const resolvers = {
    DateScalar: DateScalar,
    Query: {
        getUserByUsername: async (parent, args, context) => {
            // Query that return the first user.
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    username: args.username
                }
            });
            return exclude(user, ['password']);
        },
        getAllUsers: async (parent, args, context) => {
            // Query that return all the users.
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED : " + context.msg);
            }
            const users = await prisma.user.findMany();
            return users.map(user => exclude(user, ['password']));
        },
        getNoteById: async (parent, args, context) => {
            // Query that returns the first note.
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            return prisma.note.findFirstOrThrow({
                where: {
                    id: args.id
                }
            });
        },
        getAllNotesByUsername: (parent, args, context) => {
            // Query that returns all the notes of a user.
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            return prisma.note.findMany({
                where: {
                    user: {
                        username: args.username
                    }
                }
            });
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            // Create a user in the db
            const user = await prisma.user.create({
                data: {
                    username: args.username,
                    password: args.password,
                }
            });
            return exclude(user, ['password']);
        },
        updateUser: async (parent, args, context) => {
            // Update a user in the db
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            const user = await prisma.user.update({
                where: {
                    username: args.username,
                },
                data: {
                    password: args.password,
                },
            });
            return exclude(user, ['password']);
        },
        deleteUser: async (parent, args, context) => {
            // Delete a user in the db
            if (!context.userInfo || args.username !== context.userInfo.username) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            const user = await prisma.user.delete({
                where: {
                    username: args.username,
                },
            });
            return exclude(user, ['password']);
        },
        logUser: async (_, { username, password }) => {
            // Login the user and return a JWT which will be used to authenticate later.
            const user = await prisma.user.findUnique({
                where: {
                    username: username,
                    password: password
                }
            });
            // Generate and return JWT
            return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        },
        createNote: (parent, args, context) => {
            // Create a note in the db
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            return prisma.note.create({
                data: {
                    title: args.title,
                    content: args.content,
                    user: {
                        connect: {
                            id: context.userInfo.id,
                        },
                    },
                },
            });
        },
        updateNoteById: (parent, args, context) => {
            // Update a note in the db
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            return prisma.note.update({
                where: {
                    id: args.id,
                },
                data: {
                    title: args.title,
                    content: args.content,
                    updatedAt: new Date(),
                },
            });
        },
        deleteNoteById: (parent, args, context) => {
            // Delete a note in the db
            if (!context.userInfo) {
                throw new Error("UNAUTHENTICATED" + context.msg);
            }
            return prisma.note.delete({
                where: {
                    id: args.id,
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
const { url } = await startStandaloneServer(server, {
    // Your async context function should async and
    // return an object
    listen: { port: 4000 },
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        // Verify the token and then return the user associated.
        let userInfo;
        if (token) {
            try {
                userInfo = jwt.verify(token, SECRET_KEY);
            }
            catch (err) {
                return { msg: "Verification failed." };
            }
        }
        return { userInfo };
    },
});
console.log(`🚀  Server ready at: ${url}`);
