import { ReactNode, useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { GetAllNotes } from '../../../controllers/NoteController';
import { useApolloClient } from '@apollo/client';
import { GetLoggedUserUsername } from '../../../controllers/AuthenticationController';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
type Props = NativeStackScreenProps<StackParamList>;

export default function NoteList(props : Props): ReactNode{
    const [notes, setNotes] = useState<Note[]>([]);
    const client = useApolloClient();

    useEffect(() => {
        async function getNotes(){
            await GetAllNotes(client).then(Notes => {
                setNotes(Notes);
            });
        }
        getNotes();
    }, [])
    if(notes.length<0){
        return 
    }
    return (true);
}
