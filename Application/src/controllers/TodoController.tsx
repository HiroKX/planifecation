import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/RootStack';
import { ApolloClient } from '@apollo/client';
import { CreateTodo, GetAllTodosFromUser, UpdateTodoById, DeleteTodoById } from "../services/TodoService";
import { GetLoggedUserUsername } from './AuthenticationController';
import {Todo} from "../models/Todo";

type Props = NativeStackScreenProps<StackParamList>;

export async function GetAllTodos(
  client: Readonly<ApolloClient<Object>>
): Promise<Todo[]> {
  console.debug('TodoController.GetAllTodos');
  const username = await GetLoggedUserUsername();
  return await GetAllTodosFromUser(client, username);
}

export async function AddTodo(
  client: Readonly<ApolloClient<Object>>,
  content: Readonly<string>,
  isDone: Readonly<boolean>
): Promise<string> {
  console.debug('TodoController.AddTodo');
  const id = await CreateTodo(client, content, isDone);
  console.debug('TodoController: Returning id ' + id);
  return id;
}

export async function UpdateTodo(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>,
  content: Readonly<string>,
  isDone: Readonly<boolean>
): Promise<void> {
  console.debug('TodoController.UpdateTodo');
  await UpdateTodoById(client, id, content, isDone);
}

export async function DeleteTodo(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>
): Promise<void> {
  console.debug('TodoController.DeleteTodo');
  await DeleteTodoById(client, id)
    .then(async res => {
      console.debug(`Todo ${res} successfuly deleted`);
    })
    .catch(error =>
      console.debug(`Error while deleting todo with id ${id}`, error)
    );
}