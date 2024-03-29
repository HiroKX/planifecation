import { ApolloClient } from '@apollo/client';
import {
  GetAllNotesFromUser,
  DeleteNoteById,
  CreateNote,
  GetNoteById,
  UpdateNoteById,
} from '../services/NoteService';
import { GetLoggedUserUsername } from './AuthenticationController';

export async function GetAllNotes(
  client: Readonly<ApolloClient<Object>>
): Promise<Note[] | null> {
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
  return await CreateNote(client, title, content);
}

export async function UpdateNote(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>,
  title: Readonly<string>,
  content: Readonly<string>
): Promise<Note> {
  console.debug('NoteController.UpdateNote');
  let updatedNote = await UpdateNoteById(client, id, title, content);
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
