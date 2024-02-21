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
      <TextInputTemplate
        style={styles.title}
        onChangeText={newTitle => setTitle(newTitle)}
        value={title}
        placeholder="Titre"
        maxLength={40}
        right={
          <TextInput.Icon
            icon="content-save"
            onPress={async (): Promise<void> => {
              await saveNote(title, text).then((): void => {
                props.navigation.goBack();
              });
            }}
          />
        }
      />
      <TextInputTemplate
        style={styles.textInput}
        onChangeText={newText => setText(newText)}
        value={text}
        multiline
        placeholder="Tapez votre texte ici"
      />
      <View style={styles.keyboard}>
        <VirtualRandomKeyboard text={text} setText={setText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  save: {
    margin: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 3,
    borderColor: theme.colors.primary,
  },
  textInput: {
    flex: 9,
    borderColor: theme.colors.primary,
    pointerEvents: 'none',
  },
  keyboard: {
    flex: 4,
    padding: 0,
    backgroundColor: theme.colors.secondary,
  },
});
