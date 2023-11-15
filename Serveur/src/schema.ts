const { gql } = require("apollo-server")

export const typeDefs = gql `

 type Student {
    id: ID!
    login: String!
    password: String!
  }
`

module.exports = {
    typeDefs,
  }