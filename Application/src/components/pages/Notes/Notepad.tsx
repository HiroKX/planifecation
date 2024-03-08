import { StyleSheet, View } from 'react-native';
import { ReactNode, useEffect, useState } from 'react';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { AddNote, UpdateNote } from '../../../controllers/NoteController';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import VirtualRandomKeyboard from './keyboard/VirtualRandomKeyboard';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import TextTemplate from '../../atoms/styles/TextTemplate';

type Props = NativeStackScreenProps<StackParamList>;
export type NotepadParams = {
  currentNote: Note;
};

export default function Notepad(props: Readonly<Props>): ReactNode {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  let params: NotepadParams = props.route.params as NotepadParams;

  useEffect((): void => {
    async function setFields(): Promise<void> {
      if (params != undefined) {
        setTitle(params.currentNote.title);
        setText(params.currentNote.content);
      }
    }
    setFields().then();
  }, []);

  const client: ApolloClient<Object> = useApolloClient();

  const saveNote = async (
    title: Readonly<string>,
    content: Readonly<string>
  ): Promise<void> => {
    if (params != undefined) {
      await UpdateNote(client, params.currentNote.id, title, content);
    } else {
      await AddNote(client, title, content);
    }
  };

  return (
    <View style={styles.container}>
      <SurfaceTemplate style={styles.surface}>
      <TextInputTemplate
        style={styles.title}
        mode='flat'
        onChangeText={newTitle => setTitle(newTitle)}
        value={title}
        placeholder="Titre"
        underlineColor={theme.colors.surfaceVariant}
        maxLength={40}
        right={
          <TextInput.Icon
            icon="content-save"
            color={theme.colors.surfaceVariant}
            style={styles.icon}
            onPress={async (): Promise<void> => {
              await saveNote(title, text).then((): void => {
                props.navigation.goBack();
              });
            }}
          />
        }
      />
      <TextInputTemplate
        mode='flat'
        style={styles.textInput}
        onChangeText={newText => setText(newText)}
        value={text}
        multiline
        placeholder="Tapez votre texte ici"
        underlineColor={theme.colors.surfaceVariant}
      />
      <View style={styles.keyboard}>
        <VirtualRandomKeyboard text={text} setText={setText} />
      </View>
      </SurfaceTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  surface: {
    flex:1,
    margin:15,
    padding: 15,
    borderRadius:18,
  },
  save: {
    margin: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    borderRadius:18,
    backgroundColor: theme.colors.surface
  },
  textInput: {
    flex: 8,
    pointerEvents: 'none',
    backgroundColor: theme.colors.surface,
    borderRadius:18,
    marginBottom: 10,
    paddingLeft:10,
  },
  keyboard: {
    flex: 4,
    padding: 0,
    backgroundColor: theme.colors.surfaceVariant,
  },
  icon:{
    backgroundColor: theme.colors.tertiary,
    borderRadius:12,
  },
});
