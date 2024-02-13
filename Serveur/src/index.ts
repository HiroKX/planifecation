import { ApolloServer } from "@apollo/server";
import jwt from "jsonwebtoken";
import { noteMutations } from "./mutation/NoteMutations.js";
import { toDoMutations } from "./mutation/ToDoMutations.js";
import { userMutations } from "./mutation/UserMutations.js";
import { toDoQueries } from "./queries/ToDoQueries.js";
import { userQueries } from "./queries/UserQueries.js";
import { noteQueries } from "./queries/NoteQueries.js";
import { DateScalar } from "./types/DateScalar.js";
import { typeDefs } from "./types/TypeDefs.js";
import { agendaQueries } from "./queries/AgendaQueries.js";
import { agendaMutations } from "./mutation/AgendaMutations.js";
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import prisma from "./prismaClient.js";
import bodyParser from "body-parser";

const app = express();
//Création du prisma client
const SECRET_KEY = process.env.SECRET_KEY; // Replace with your secret key

const queryResolvers = {
  ...userQueries,
  ...noteQueries,
  ...toDoQueries,
  ...agendaQueries,
};

const mutationResolvers = {
  ...userMutations,
  ...noteMutations,
  ...toDoMutations,
  ...agendaMutations,
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

await server.start();

// Specify the path where we'd like to mount our server
app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server,{
  // Your async context function should async and
  // return an object
  context: async ({ req,res }) => {
    const token = req.headers.authorization || "";
    // Verify the token and then return the user associated.
    let userInfo;
    if (token) {
      try {
        userInfo = jwt.verify(token, SECRET_KEY);
        console.log(userInfo);
      } catch (err) {
        console.log(err);
        return { msg: "Verification failed." };
      }
    }
    return { userInfo, res };
  },
} ));

app.post('/login',bodyParser.json(), async(req, res) => {
  console.log(req.body)
  // Destructuring username & password from body
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
      password: password,
    },
  });
  if (user) {

    //creating a access token
    const accessToken = jwt.sign({
      id: user.id,
      username: user.username,
    }, SECRET_KEY, {
      expiresIn: '50s'
    });


    const refreshToken = jwt.sign({
      id: user.id,
      username: user.username,
    }, SECRET_KEY, { expiresIn: '1y' });

    return res.json({accessToken, refreshToken});
  }
  else {
    // Return unauthorized error if credentials don't match
    return res.status(406).json({
      message: 'Invalid credentials'
    });
  }
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.headers.authorization || "";
  console.log("j'viens referesh")
  if (refreshToken) {
    // Verifying refresh token
    jwt.verify(refreshToken, SECRET_KEY,
        (err, decoded) => {
          if (err) {
            // Wrong Refesh Token
            console.log("j'ai pas pu refresh unauthorized")

            return res.status(406).json({ message: 'Unauthorized' });
          }
          else {

            const accessToken = jwt.sign({
              id: decoded.id,
              username: decoded.username,
            }, SECRET_KEY, {
              expiresIn: '50s'
            });

            const refreshToken = jwt.sign({
              id: decoded.id,
              username: decoded.username,
            }, SECRET_KEY, { expiresIn: '1y' });
            console.log("j'ai refresh referesh")
            return res.json({ accessToken, refreshToken });
          }
        })
  } else {
    console.log("j'ai pas pu refresh unauthorized2")
    return res.status(406).json({ message: 'Unauthorized' });
  }
})

app.listen(port, function(){
  console.log(`🚀  Server ready`);
})

