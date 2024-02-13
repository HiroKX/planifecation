import {ApolloClient, ApolloError, gql} from '@apollo/client';
import {RelogUser} from "../controllers/AuthenticationController";

const CREATE_NOTE = gql`
  mutation Mutation($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      content
    }
  }
`;

export async function CreateNote(
  client: Readonly<ApolloClient<Object>>,
  title: Readonly<string>,
  content: Readonly<string>
): Promise<number> {
  console.debug('NoteService.CreateNote');
  return client
    .mutate({
      mutation: CREATE_NOTE,
      variables: {
        title: title,
        content: content,
      },
    })
    .then((response: any) => {
      let createdNote = response.data.createNote;
      console.debug('Created note : ', createdNote);
      return createdNote.id;
    })
    .catch((error: any) => {
      console.error('CreateNote error:', error);
      return 0;
    });
}

const GET_ALL_NOTES = gql`
  query Query($username: String!) {
    getAllNotesByUsername(username: $username) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export async function GetAllNotesFromUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>
): Promise<Note[]|null> {
  console.debug('NoteService.GetAllNotesFromUser');
  console.log("rappel")
  return client
    .query({
      query: GET_ALL_NOTES,
      variables: {
        username: username,
      },
    })
    .then((response: any) => {
      console.log("response")
      return response.data.getAllNotesByUsername.map((note: Note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    })
      .catch(async (error: ApolloError) => {
        if(error.message.includes("UNAUTHENTICATED")){
          if( await RelogUser(client))
            return GetAllNotesFromUser(client,username)
        }
        return null;
      });
}

const GET_NOTE_BY_ID = gql`
  query Query($id: Int!) {
    getNoteById(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export async function GetNoteById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>
): Promise<Note> {
  console.debug('NoteService.GetNoteById');
  return client
    .query({
      query: GET_NOTE_BY_ID,
      variables: {
        id: id,
      },
    })
    .then((response: any) => {
      let note = response.data.getNoteById;
      console.debug('Retrieved note : ', note);
      return note;
    })
    .catch((error: any) => {
      console.error('GetNoteById error:', error);
      return null;
    });
}

const UPDATE_NOTE_BY_ID = gql`
  mutation Mutation($id: Int!, $title: String!, $content: String!) {
    updateNoteById(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export async function UpdateNoteById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>,
  title: Readonly<string>,
  content: Readonly<string>
): Promise<Note> {
  console.debug('NoteService.UpdateNoteById');
  return client
    .mutate({
      mutation: UPDATE_NOTE_BY_ID,
      variables: {
        id: id,
        title: title,
        content: content,
        updatedAt: new Date(),
      },
    })
    .then((response: any) => {
      let note = response.data.updateNoteById;
      console.debug('Updated note : ', note);
      return note;
    })
    .catch((error: any) => {
      console.error('UpdateNoteById error:', error);
      return null;
    });
}

const DELETE_NOTE_BY_ID = gql`
  mutation DeleteNoteById($id: Int!) {
    deleteNoteById(id: $id) {
      id
    }
  }
`;

export async function DeleteNoteById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<number>
): Promise<boolean> {
  console.debug('NoteService.DeleteNoteById');

  return client
    .mutate({
      mutation: DELETE_NOTE_BY_ID,
      variables: {
        id: id,
      },
    })
    .then(() => {
      console.debug('Deleted note', id);
      return true;
    })
    .catch((error: any) => {
      console.error('DeleteNoteById error', error);
      return false;
    });
}
