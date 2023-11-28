import { TextInput } from "react-native-paper";
import SurfaceTemplate from "../organisms/SurfaceTemplate";
import TextInputTemplate from "../atoms/styles/TextInputTemplate";
import { View } from "react-native";
import { StyleSheet } from 'react-native';
import { useState } from "react";



export default function Notepad(){
    const [text, setText] = useState('');

    return (
      <View style={styles.container}>
        <TextInput
      style={styles.textInput}
      onChangeText={(newText) => setText(newText)}
      value={text}
      multiline
      placeholder="Tapez votre texte ici"
    />
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 10,
},
textInput: {
  flex: 1,
  borderColor: 'gray',
  borderWidth: 1,
  padding: 10,
  textAlignVertical:'top',
},
});

