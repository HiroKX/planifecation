import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigation/RootStack';
import { ApolloClient } from '@apollo/client';
import {
  GetAllNotesFromUser,
  DeleteNoteById,
  CreateNote,
  GetNoteById,
  UpdateNoteById,
} from '../services/NoteService';
import { GetLoggedUserUsername } from './AuthenticationController';

type Props = NativeStackScreenProps<StackParamList>;

export async function GetAllNotes(
  client: Readonly<ApolloClient<Object>>
): Promise<Note[]> {
  console.debug('NoteController.GetAllNotes');
  const username = await GetLoggedUserUsername();
  return await GetAllNotesFromUser(client, username);
}

export async function GetNote(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>
): Promise<Note> {
  console.debug('NoteController.GetAllNotes');
  let note = await GetNoteById(client, id);
  console.debug('Retrieved note : ', note);
  return note;
}

export async function AddNote(
  client: Readonly<ApolloClient<Object>>,
  title: Readonly<string>,
  content: Readonly<string>
): Promise<number> {
  console.debug('NoteController.AddNote');
  const username = await GetLoggedUserUsername();
  return await CreateNote(client, title, content);
}

export async function UpdateNote(
  client: Readonly<ApolloClient<Object>>,
  Note: Readonly<Note>
): Promise<Note> {
  console.debug('NoteController.UpdateNote');
  let updatedNote = await UpdateNoteById(client, Note);
  console.debug('Updated note : ', updatedNote);
  return updatedNote;
}

export async function DeleteNote(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>
): Promise<void> {
  console.debug('NoteController.DeleteNote');
  await DeleteNoteById(client, id)
    .then(async res => {
      console.debug(`Note ${res} successfuly deleted`);
    })
    .catch(error =>
      console.debug(`Error while deleting note with id ${id}`, error)
    );
}
