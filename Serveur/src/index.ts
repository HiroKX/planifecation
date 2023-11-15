import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'votre_secret_très_sécurisé'; // Remplacez ceci par votre clé secrète

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
    user: (parent,args,context) => {
      console.log(context)
      if (!context.userInfo) {
        throw new Error("Non autorisé");
      }
      return prisma.user.findFirstOrThrow();
    },
    users: (parent,args,context) => {
      console.log(context)
      if (!context.userInfo) {
        throw new Error("Non autorisé");
      }
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
      login: async (_, { username, password }) => {
        // Ici, vous devriez vérifier les informations d'identification.
        // Par exemple, vérifier dans une base de données.
        // Pour cet exemple, nous allons simuler une vérification réussie.
        const user = await prisma.user.findUnique({where: {login: username, password: password}});
        
        // Générer un JWT
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
        return token; // Retourner le token JWT
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
    // Vérifier le token et extraire les informations de l'utilisateur
    let userInfo;
    if (token) {
      try {
        userInfo = jwt.verify(token, SECRET_KEY);
      } catch (err) {
        // Gérer l'erreur de vérification du token
      }
    }
    return { userInfo };
  },
});


console.log(`🚀  Server ready at: ${url}`);