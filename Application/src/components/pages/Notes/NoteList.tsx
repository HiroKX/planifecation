import React, { ReactNode, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import {
  DeleteNote,
  GetAllNotes,
  GetNote,
} from '../../../controllers/NoteController';
import { ApolloClient, useApolloClient } from '@apollo/client';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { useIsFocused } from '@react-navigation/native';

type Props = NativeStackScreenProps<StackParamList>;

type RenderNoteProps = {
  item: Note;
};

export default function NoteList(props: Readonly<Props>): ReactNode {
  const [notes, setNotes] = useState<Note[]>([]);
  const [updatedNotes, setUpdatedNotes] = useState(false);
  const client: ApolloClient<Object> = useApolloClient();
  const isFocused: boolean = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  useEffect((): void => {
    async function fetchNotes(): Promise<void> {
      await client.resetStore();
      await GetAllNotes(client).then(notes => {
        let sortedNotes: Note[] = [...notes];
        sortedNotes = sortedNotes.sort((a: Note, b: Note): number => {
          return a.updatedAt > b.updatedAt ? -1 : 1;
        });
        setNotes(sortedNotes);
      });
      setUpdatedNotes(false);
    }
    setIsLoading(true);
    fetchNotes().then();
    // timeout pour montrer que ça marche
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [updatedNotes, isFocused]);

  const confirmDelete = async (id: number): Promise<void> => {
    await DeleteNote(client, id);
    //setUpdatedNotes(true);
  };

  const renderNotes = (renderNoteProps: RenderNoteProps) => {
    return (
      <View>
        <SurfaceTemplate
          style={{ flexDirection: 'row', flex: 1, borderWidth: 1 }}
        >
          <View
            style={{
              alignContent: 'center',
              flexDirection: 'row',
              alignSelf: 'stretch',
              flex: 1,
              display: 'flex',
            }}
          >
            <ButtonTemplate
              style={{ flex: 1, alignSelf: 'flex-start', position: 'relative' }}
              onPress={(): void => {
                GetNote(client, renderNoteProps.item.id).then(currentNote => {
                  return props.navigation.navigate('Bloc-Notes', {
                    currentNote,
                  });
                });
              }}
              mode="text"
            >
              {renderNoteProps.item.title}
            </ButtonTemplate>
            <TextInput.Icon
              icon={'trash-can'}
              color={theme.colors.primary}
              style={{ alignSelf: 'flex-start', position: 'relative' }}
              onPress={(): void => {
                Alert.alert(
                  `Suppression de ${renderNoteProps.item.title}`,
                  'Confirmez-vous la suppression de cette note ?',
                  [
                    { text: 'Non' },
                    {
                      text: 'Oui',
                      onPress: (): void => {
                        confirmDelete(renderNoteProps.item.id).then();
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
  if (isLoading) {
    return <View><ActivityIndicator size="large" color="#0000ff" /></View>
  } else {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        <SurfaceTemplate>
          <ButtonTemplate
            onPress={(): void => {
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
  };
}
