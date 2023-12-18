import React, { ReactNode, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { GetAllNotes } from '../../../controllers/NoteController';
import { useApolloClient } from '@apollo/client';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { FlatList, View } from 'react-native';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { TextInput } from 'react-native-paper';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';

type Props = NativeStackScreenProps<StackParamList>;
type RenderNoteProps = {
  item: Note;
};

export default function NoteList(): ReactNode {
  const [notes, setNotes] = useState<Note[]>([]);
  const client = useApolloClient();

  useEffect(() => {
    async function getNotes() {
      await GetAllNotes(client).then(Notes => {
        setNotes(Notes);
      });
    }
    getNotes();
  }, []);
  console.log(notes); // Add button to redirect to notepad
  return (
    <View style={{flex:1, padding:10}}>
      <SurfaceTemplate>
        <ButtonTemplate>Ajouter</ButtonTemplate>
      </SurfaceTemplate>
      <SurfaceTemplate style={{flex: 5}}>
        <FlatList data={notes} renderItem={renderNotes} />
      </SurfaceTemplate>
    </View>
  );
}

const renderNotes = ({ item }: RenderNoteProps) => {
  return (
    <View>
      <SurfaceTemplate
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
      >
        <TextInputTemplate
          right={<TextInput.Icon icon={'trash-can'} />}
          mode="outlined"
          style={{ flex: 1 }}
          multiline={false}
          editable={false}
          value={item.title}
          outlineStyle={{
            display: 'none',
          }}
        ></TextInputTemplate>
      </SurfaceTemplate>
    </View>
  );
};
