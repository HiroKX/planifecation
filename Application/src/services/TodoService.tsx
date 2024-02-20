import { ApolloClient, ApolloError, gql } from '@apollo/client';
import { Todo } from '../models/Todo';
import { RelogUser } from '../controllers/AuthenticationController';
import { UpdateTodo } from '../controllers/TodoController';

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
    .catch(async (error: ApolloError) => {
      console.error('GetAllTodosFromUser error:', error);
      if (error.message.includes('UNAUTHENTICATED')) {
        let res = await RelogUser(client);
        if (res) return GetAllTodosFromUser(client, username);
      }
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
        isDone: isDone,
      },
    })
    .then((response: any) => {
      var item = response.data.createTodoItem;
      console.debug(
        'TodoService: Todo successfully created with id ' + item.id
      );
      return item.id;
    })
    .catch(async (error: ApolloError) => {
      console.error('CreateTodo error:', error);
      if (error.message.includes('UNAUTHENTICATED')) {
        let res = await RelogUser(client);
        if (res) return CreateTodo(client, content, isDone);
      }
      return null;
    });
}

const UPDATE_TODO = gql`
  mutation UpdateTodoItemById(
    $updateTodoItemByIdId: Int!
    $content: String!
    $isDone: Boolean
  ) {
    updateTodoItemById(
      id: $updateTodoItemByIdId
      content: $content
      isDone: $isDone
    ) {
      id
    }
  }
`;

export async function UpdateTodoById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>,
  content: Readonly<string>,
  isDone: Readonly<boolean>
): Promise<number> {
  console.debug('TodoService.UpdateTodo');

  return client
    .mutate({
      mutation: UPDATE_TODO,
      variables: {
        updateTodoItemByIdId: parseInt(id),
        content: content,
        isDone: isDone,
      },
    })
    .then((response: any) => {
      return response.data.id;
    })
    .catch(async (error: ApolloError) => {
      console.error('UpdateTodoById error:', error);
      if (error.message.includes('UNAUTHENTICATED')) {
        let res = await RelogUser(client);
        if (res) return UpdateTodoById(client, id, content, isDone);
      }
      return null;
    });
}

const DELETE_TODO_BY_ID = gql`
  mutation DeleteTodoItemById($deleteTodoItemByIdId: Int!) {
    deleteTodoItemById(id: $deleteTodoItemByIdId) {
      id
    }
  }
`;

export async function DeleteTodoById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>
): Promise<boolean> {
  console.debug('TodoService.DeleteTodoById');
  console.debug('id = ' + id);
  return client
    .mutate({
      mutation: DELETE_TODO_BY_ID,
      variables: {
        deleteTodoItemByIdId: parseInt(id),
      },
    })
    .then((response: any) => {
      return response.data.deleteTodoItemById.id;
    })
    .catch(async (error: ApolloError) => {
      console.error('DeleteTodoById error:', error);
      if (error.message.includes('UNAUTHENTICATED')) {
        let res = await RelogUser(client);
        if (res) return DeleteTodoById(client, id);
      }
      return null;
    });
}
