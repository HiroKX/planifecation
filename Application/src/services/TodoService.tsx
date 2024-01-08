import { ApolloClient, gql } from '@apollo/client';
import {Todo} from "../models/Todo";

const GET_ALL_TODOS = gql`
  query Query($username: String!) {
      getAllTodoItemsByUsername(username: $username) {
        id
        content
        isDone
        createdAt
        updatedAt
      }
  }
`;

export async function GetAllTodosFromUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>
): Promise<Todo[]> {
  console.debug('TodoService.GetAllTodosFromUser');
  return client
    .query({
      query: GET_ALL_TODOS,
      variables: {
        username: username,
      },
    })
    .then((response: any) => {
      return response.data.getAllTodoItemsByUsername;
    })
    .catch((error: any) => {
      console.error('GetAllTodosFromUser error:', error);
      return null;
    });
}

const CREATE_TODO = gql`
  mutation Mutation($content: String!, $isDone: Boolean) {
    createTodoItem(content: $content, isDone: $isDone) {
      id
    }
  }
`;

export async function CreateTodo(
  client: Readonly<ApolloClient<Object>>,
  content: Readonly<string>,
  isDone: Readonly<boolean>
): Promise<string> {
  console.debug('TodoService.CreateTodo');

  return client
    .mutate({
      mutation: CREATE_TODO,
      variables: {
        content: content,
        isDone: isDone
      },
    })
    .then((response: any) => {
      console.debug('TodoService: Todo successfully created with id ' + response.data.createTodoItem)
      return response.data.createTodoItem.id;
    })
    .catch((error: any) => {
      console.error('CreateTodo error:', error);
      return null;
    });
}

const UPDATE_TODO = gql`
  mutation Mutation($id: Int!, $content: String!, $isDone: Boolean!) {
    updateTodoById(id: $id, content: $content, isDone: $isDone) {
      id
    }
  }
`;

export async function UpdateTodoById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>,
  content: Readonly<string>,
  isDone: Readonly<boolean>
): Promise<number> {
  console.debug('TodoService.UpdateTodo');

  return client
    .mutate({
      mutation: UPDATE_TODO,
      variables: {
        id: id,
        content: content,
        isDone: isDone
      },
    })
    .then((response: any) => {
      return response.data.id;
    })
    .catch((error: any) => {
      console.error('UpdateTodo error:', error);
      return null;
    });
}

const DELETE_TODO_BY_ID = gql`
  mutation DeleteTodoById($id: Int!) {
    deleteTodoById(id: $id) {
      id
    }
  }
`;

export async function DeleteTodoById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>
): Promise<boolean> {
  console.debug('TodoService.DeleteTodoById');

  return client
    .mutate({
      mutation: DELETE_TODO_BY_ID,
      variables: {
        id: id,
      },
    })
    .then((response: any) => {
      return response.data.id;
    })
    .catch((error: any) => {
      console.error('DeleteTodoById error:', error);
      return null;
    });
}