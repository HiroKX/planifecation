import { TextInput } from "react-native-paper";
import SurfaceTemplate from "../organisms/SurfaceTemplate";
import TextInputTemplate from "../atoms/styles/TextInputTemplate";
import { View } from "react-native";
import { StyleSheet } from 'react-native';
import { useState } from "react";



export default function Notepad(){
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    return (
      <SurfaceTemplate style={styles.container}>
        <TextInput
      style={styles.title}
      onChangeText={(newTitle) => setTitle(newTitle)}
      value={title}
      placeholder="Titre"
    />
        <TextInput
      style={styles.textInput}
      onChangeText={(newText) => setText(newText)}
      value={text}
      multiline
      placeholder="Tapez votre texte ici"
    />
  </SurfaceTemplate>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 10,
},
title: {
    fontSize: 25,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
},
textInput: {
  flex: 1,
  borderColor: 'gray',
  borderWidth: 1,
  padding: 10,
  textAlignVertical:'top',
},
});

