import { StyleSheet, View } from 'react-native';
import { ReactNode, useState } from 'react';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { theme } from '../../organisms/OwnPaperProvider';

export default function Notepad(): ReactNode {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInputTemplate
        style={styles.title}
        onChangeText={newTitle => setTitle(newTitle)}
        value={title}
        placeholder="Titre"
        maxLength={40}
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
  title: {
    fontSize: 25,
    marginBottom: 3,
    borderColor: theme.colors.primary,
  },
  textInput: {
    flex: 1,
    borderColor: theme.colors.primary,
  },
});
