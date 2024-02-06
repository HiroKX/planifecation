import { StyleSheet, View } from 'react-native';
import { ReactNode, useEffect, useState } from 'react';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { AddNote, UpdateNote } from '../../../controllers/NoteController';
import { TextInput } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { getColorForBackground } from '../../../services/utils/utils';

type Props = NativeStackScreenProps<StackParamList>;
export type NotepadParams = {
  currentNote: Note;
};

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", ".", ",", "⏎", "⇧", "←"];

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
      <View
        style={styles.keyboard}>
          {alphabet.map((button) => {
            return <TouchableOpacity
              style={styles.keyboardButton}
              key={button}>
                <TextTemplate
                  variant='headlineSmall'
                  style={styles.keyboardText}>
                  {button}
                </TextTemplate>
            </TouchableOpacity>
          })}
          <TouchableOpacity
            style={styles.spacebar}>
            
          </TouchableOpacity>
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
    flex: 10,
    borderColor: theme.colors.primary,
    pointerEvents: "none",
  },
  keyboard: {
    flex:6,
    flexWrap:"wrap",
    flexDirection:'row',
    alignItems:"stretch",
    justifyContent:'space-around',
    alignContent:'stretch',
    margin:5,
  },
  keyboardButton: {
    marginVertical:1,
    width: 45,
    height:65,
    backgroundColor: theme.colors.secondary,
  },
  keyboardText: {

    alignSelf:'center',
    color: getColorForBackground(theme.colors.secondary),
  },
  spacebar: {
    position: 'absolute',
    backgroundColor:theme.colors.secondary,
    width:200,
    height:65,
  }
});
