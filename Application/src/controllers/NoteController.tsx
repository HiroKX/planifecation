import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/RootStack';
import { ApolloClient } from '@apollo/client';
import { GetAllNotesFromUser } from '../services/NoteService';
import { GetLoggedUserUsername } from './AuthenticationController';

type Props = NativeStackScreenProps<StackParamList>;

export async function GetAllNotes(
  client: Readonly<ApolloClient<Object>>
): Promise<Note[]> {
  console.debug('NoteController.GetAllNotes');
  const username = await GetLoggedUserUsername();
  return await GetAllNotesFromUser(client, username);
}

export async function AddNote(
  client: Readonly<ApolloClient<Object>>,
  props: Readonly<Props>
): Promise<void> {
  console.debug('NoteController.AddNote');
}

export async function UpdateNote(
  client: Readonly<ApolloClient<Object>>,
  props: Readonly<Props>
): Promise<void> {
  console.debug('NoteController.UpdateNote');
}

export async function DeleteNote(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>,
  password: Readonly<string>,
  props: Readonly<Props>
): Promise<void> {
  console.debug('NoteController.DeleteNote');
}
