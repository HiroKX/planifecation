import React, { ReactNode, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { DeleteNote, GetAllNotes } from '../../../controllers/NoteController';
import { useApolloClient } from '@apollo/client';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { Alert, FlatList, View } from 'react-native';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { TextInput } from 'react-native-paper';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import {GetNoteById} from "../../../services/NoteService";
import Notepad from "./Notepad";
import TextProps from "react-native-paper/src/components/Typography/Text";

type Props = NativeStackScreenProps<StackParamList>;
type RenderNoteProps = {
  item: Note;
};


export default function NoteList(props: Readonly<Props>): ReactNode {
  const [notes, setNotes] = useState<Note[]>([]);

  const client = useApolloClient();

  const confirmDelete = (id: number) => {
    DeleteNote(client, id);
    setNotes(notes.filter(note => note.id !== id));
    client.resetStore();
  };

  useEffect(() => {
    async function getNotes() {
      await GetAllNotes(client).then(Notes => {
        setNotes(Notes);
      });
    }
    getNotes();
  }, []);



  const renderNotes = ({ item }: RenderNoteProps) => {
    return (
      <View>
        <SurfaceTemplate
          style={{ flexDirection: 'row', flex: 1, borderWidth:1}}
        >
            <View style={{ alignContent:"center", flexDirection: 'row', alignSelf:"stretch", flex:1 , display:"flex"}}>
                <ButtonTemplate
                    style={{ flex: 1, alignSelf:"flex-start", position:"relative" }}
                    onPress={() => {
                        GetNoteById(client, item.id).then(Note => {
                            Notepad(props);
                            props.navigation.navigate('Bloc-Notes');
                        });
                    }}
                    mode="text"
                >{item.title}</ButtonTemplate>
                <TextInput.Icon
                    icon={'trash-can'}
                    color={theme.colors.primary}
                    style={{ alignSelf:"flex-start", position:"relative"}}
                    onPress={() => {
                        Alert.alert(
                            `Suppression de ${item.title}`,
                            'Confirmez-vous la suppression de cette note ?',
                            [
                                { text: 'Non' },
                                {
                                    text: 'Oui',
                                    onPress: () => {
                                        confirmDelete(item.id);
                                    },
                                },
                            ]
                        );
                    }}
                />
            </View>
        </SurfaceTemplate>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <SurfaceTemplate>
        <ButtonTemplate
          onPress={() => {
            props.navigation.navigate('Bloc-Notes');
          }}
        >
          Ajouter
        </ButtonTemplate>
      </SurfaceTemplate>
      <SurfaceTemplate style={{ flex: 5 }}>
        <FlatList data={notes} renderItem={renderNotes} />
      </SurfaceTemplate>
    </View>
  );
}
