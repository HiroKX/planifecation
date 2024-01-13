import { StyleSheet, View } from 'react-native';
import { ReactNode, useState } from 'react';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { useApolloClient } from '@apollo/client';
import { AddNote } from '../../../controllers/NoteController';
import { TextInput } from 'react-native-paper';
import { GetAllNotesFromUser } from '../../../services/NoteService';
import { RawButton } from 'react-native-gesture-handler';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import AppTemplate from '../../atoms/AppTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';

type Props = NativeStackScreenProps<StackParamList>;

export default function Notepad(props: Readonly<Props>): ReactNode {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const client = useApolloClient();

  const saveNote = (title: Readonly<string>, content: Readonly<string>) => {
    AddNote(client, title, content);
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
            onPress={() => {
              saveNote(title, text);
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
