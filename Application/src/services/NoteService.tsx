import { ApolloClient, gql } from '@apollo/client';
import { GetLoggedUserUsername } from '../controllers/AuthenticationController';


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
  ): Promise<Note[]> {
    console.debug('NoteService.GetAllNotesFromUser');
    console.log(username);
    return client
      .query({
        query: GET_ALL_NOTES,
        variables: {
            username: username,
        },
      })
      .then((response: any) => {
        return response.data.getAllNotesByUsername.map((note: Note) => ({
            id: note.id,
            title: note.title,
            content: note.content,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt)
        }));
      })
      .catch((error: any) => {
        console.error('GetAllNotesFromUser error:', error);
        return null;
      });
  }


const CREATE_NOTE = gql`
mutation Mutation($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      content
    }
  }
`;

export async function CreateNote(
    client: Readonly<ApolloClient<Object>>,
    content: Readonly<string>,
    title: Readonly<string>
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
        console.debug('id:', response.data.createUser.id);
        return response.data.createUser.id;
      })
      .catch((error: any) => {
        console.error('CreateNote error:', error);
        return 0;
      });
  }