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
import cookies from "cookie-parser";

const app = express();
app.use(cookies())
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
      } catch (err) {
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
  // Checking if credentials match
  if (user) {

    //creating a access token
    const accessToken = jwt.sign({
      username: user.username,
    }, SECRET_KEY, {
      expiresIn: '10m'
    });
    // Creating refresh token not that expiry of refresh
    //token is greater than the access token

    const refreshToken = jwt.sign({
      username: user.username,
    }, SECRET_KEY, { expiresIn: '10m' });

    // Assigning refresh token in http-only cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    return res.json({ accessToken });
  }
  else {
    // Return unauthorized error if credentials don't match
    return res.status(406).json({
      message: 'Invalid credentials'
    });
  }
})

app.post('/refresh', (req, res) => {
  if (req.cookies?.jwt) {

    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;

    // Verifying refresh token
    jwt.verify(refreshToken, SECRET_KEY,
        (err, decoded) => {
          if (err) {
            // Wrong Refesh Token
            return res.status(406).json({ message: 'Unauthorized' });
          }
          else {

            const accessToken = jwt.sign({
              username: decoded.username,
            }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: '10m'
            });
            return res.json({ accessToken });
          }
        })
  } else {
    return res.status(406).json({ message: 'Unauthorized' });
  }
})

app.listen(port, function(){
  console.log(`🚀  Server ready`);
})

