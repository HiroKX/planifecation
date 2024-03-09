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
import {
  StyleSheet,
  Alert,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../organisms/OwnPaperProvider';
import { useIsFocused } from '@react-navigation/native';
import TextTemplate from '../../atoms/styles/TextTemplate';
import ActivityIndicatorTemplate from '../../atoms/styles/ActivityIndicatorTemplate';
import { lag } from '../../../services/utils/utils';
import AppTemplate from '../../atoms/AppTemplate';

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
      const notes: null | Note[] = await GetAllNotes(client);
      if (notes == null) {
        return;
      }
      let sortedNotes: Note[] = [...notes];
      sortedNotes = sortedNotes.sort((a: Note, b: Note): number => {
        return a.updatedAt > b.updatedAt ? -1 : 1;
      });
      setNotes(sortedNotes);
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
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.item}
          onPress={(): void => {
            GetNote(client, renderNoteProps.item.id).then(currentNote => {
              return props.navigation.navigate('Bloc-Notes', {
                currentNote,
              });
            });
          }}
        >
          <TextTemplate variant="titleLarge" style={styles.text}>
            {renderNoteProps.item.title}
          </TextTemplate>
          <AppTemplate
            icon="lead-pencil"
            variant="tertiary"
            color={theme.colors.surfaceVariant}
            style={styles.edit}
          />
        </TouchableOpacity>
        <AppTemplate
          icon="trash-can"
          color={theme.colors.surfaceVariant}
          style={styles.delete}
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
                    setUpdatedNotes(true)
                  },
                },
              ]
            );
          }}
        />
      </View>
    );
  };
  if (isLoading) {
    return <ActivityIndicatorTemplate />;
  } else {
    return (
      <View style={styles.mainContainer}>
        <AppTemplate
          icon="plus"
          onPress={(): void => {
            props.navigation.navigate('Bloc-Notes');
          }}
        />
        <SurfaceTemplate style={styles.surfaces}>
          {notes.length != 0 &&
            <FlatList data={notes} renderItem={renderNotes} style={styles.list} />
          }
        </SurfaceTemplate>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  surfaces: {
    flex: 1,
    borderRadius: 18,
    alignSelf: 'stretch',
    margin: 25,
    marginTop: 0,
  },
  list: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  itemContainer: {
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    marginVertical: 5,
    flexDirection: 'row',
  },
  item: {
    flexGrow: 1,
    marginLeft: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlignVertical: 'center',
    color: theme.colors.tertiary,
    flex: 1,
  },
  edit: {
    margin: 5,
  },
  delete: {
    margin: 5,
  },
});
