import { StyleSheet, View } from 'react-native';
import { ReactNode, useEffect, useState } from 'react';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { useApolloClient } from '@apollo/client';
import {
  AddNote,
  GetAllNotes,
  UpdateNote,
} from '../../../controllers/NoteController';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';

type Props = NativeStackScreenProps<StackParamList>;
export type NotepadParams = {
  currentNote: Note;
};

export default function Notepad(props: Readonly<Props>): ReactNode {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  let params = props.route.params as NotepadParams;

  useEffect(() => {
    async function setFields() {
      if (params != undefined) {
        setTitle(params.currentNote.title);
        setText(params.currentNote.content);
      }
    }
    setFields().then();
  }, []);

  const client = useApolloClient();

  const saveNote = async (
    title: Readonly<string>,
    content: Readonly<string>
  ) => {
    if (params != undefined) {
      let currentNote = params.currentNote;
      currentNote.title = title;
      currentNote.content = content;
      await UpdateNote(client, currentNote);
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
            onPress={async () => {
              await saveNote(title, text);
              props.navigation.navigate('Liste des notes');
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
    flex: 10,
    borderColor: theme.colors.primary,
  },
});
