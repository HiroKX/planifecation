import { ApolloClient, gql } from '@apollo/client';

type Note = {
    id : number;
    title : string;
    content : string;
    createdAt : Date;
    updatedAt : Date;

}

const GET_ALL_NOTES = gql`
query getAllNotesByUsername($username : String!){
    getAllNotesByUsername(username : $username){
        id 
        title
    }
}
`

export async function LoadNoteFromClient(
    client: Readonly<ApolloClient<Object>>,
    username : Readonly<string>
): Promise<Object> {

    return client
        .query({
            query: GET_ALL_NOTES,
            variables :{
                username : username,
            },
        })
        .then((response : any) =>{
            console.debug('id:', response.data.createUser.id);
            return [response.data.getAllNotesByUsername.id,response.data.getAllNotesByUsername.title] ;
        })
        .catch((error: any) => {
            console.error('getAllNotes error:', error);
            return 0;
          });
}