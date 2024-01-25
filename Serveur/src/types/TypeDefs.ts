export const typeDefs = `
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
  user: User
  createdAt: DateScalar
  updatedAt: DateScalar
}

type ToDoItem {
  id: Int
  content: String!
  isDone: Boolean
  user: User
  createdAt: DateScalar
  updatedAt: DateScalar
}

type AgendaEvent {
  id: Int
  title : String!
  content : String
  startDate : String!
  endDate : String!
  color : String!
  user: User
}

type Query {
  getUserByUsername(username: String!): User
  getNoteById(id: Int!): Note
  getAllNotesByUsername(username: String!): [Note]
  getTodoItemById(id: Int!): ToDoItem
  getAllTodoItemsByUsername(username: String!): [ToDoItem]
  getAgendaEventById(id: Int!): AgendaEvent
  getAllAgendaEventsByUsername(username: String!): [AgendaEvent]
}

type Mutation {
  createUser(username: String!, password: String!): User
  updateUser(username: String!, password: String!): User
  deleteUser(username: String!): User
  logUser(username: String!, password: String!): String
  createNote(title: String!, content: String!): Note
  updateNoteById(id: Int!, title: String!, content: String!): Note
  deleteNoteById(id: Int!): Note
  createTodoItem(content: String!, isDone: Boolean): ToDoItem
  updateTodoItemById(id: Int!, content: String!, isDone: Boolean): ToDoItem
  deleteTodoItemById(id: Int!): ToDoItem
  createAgendaEvent(title: String!, content: String!, startDate: String!, 
    endDate: String!, color: String!): AgendaEvent
  updateAgendaEventById(id: Int!, title: String!, content: String!, startDate: String!, 
    endDate: String!, color: String!): AgendaEvent
  deleteAgendaEventById(id: Int!): AgendaEvent
}
`;
