import { ReactNode, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import {
  DeleteNote,
  GetAllNotes,
  GetNote,
} from '../../../controllers/NoteController';
import { ApolloClient, useApolloClient } from '@apollo/client';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { StyleSheet, Alert, FlatList, View } from 'react-native';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { useIsFocused } from '@react-navigation/native';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';
import ActivityIndicatorTemplate from '../../atoms/styles/ActivityIndicatorTemplate';
import { lag } from '../../../services/utils/utils';

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
      await GetAllNotes(client).then((notes: null|Note[]) => {
          if(notes == null){ console.log("Lognbotes", notes); return;}
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
    setTimeout(() => {
      setIsLoading(false);
    }, lag.value);
  }, [updatedNotes, isFocused]);

  const confirmDelete = async (id: number): Promise<void> => {
    await DeleteNote(client, id);
  };

  const renderNotes = (renderNoteProps: RenderNoteProps) => {
    return (
      <View style={styles.flexContainer}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flex: 1,
            alignContent: 'space-between',
          }}
          onPress={(): void => {
            GetNote(client, renderNoteProps.item.id).then(currentNote => {
              return props.navigation.navigate('Bloc-Notes', {
                currentNote,
              });
            });
          }}
        >
          <View style={{ flexGrow: 1, width: '86%' }}>
            <TextTemplate variant="titleMedium" style={{}}>
              {renderNoteProps.item.title}
            </TextTemplate>
          </View>
          <View
            style={{ alignSelf: 'center', flexShrink: 1, flexBasis: 'auto' }}
          >
            <Icon size={25} source={'note-edit'} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{}}
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
        >
          <Icon size={25} source={'trash-can'} color={theme.colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  };
  if (isLoading) {
    return <ActivityIndicatorTemplate />;
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
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 3,
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 5,
  },
});
