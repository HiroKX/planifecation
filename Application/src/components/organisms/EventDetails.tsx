import ColorPicker from 'react-native-wheel-color-picker';
import SurfaceTemplate from './SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { theme } from './OwnPaperProvider';
import { ModalTemplate } from './ModalTemplate';
import { View } from 'react-native';
import Button from 'react-native-paper/src/components/Button/Button';
import TextTemplate from '../atoms/styles/TextTemplate';

let date: DateTime = DateTime.fromFormat("2023-12-31", "yyyy-MM-dd");

export default function EventDetails(props? : Readonly<Event>) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [color, setColor] = useState(theme.colors.primary);

  const changeColor = (color : string) => {
    setColor(color);
  }

  function openColorModal() {
    setVisibleModal(true);
  }

  function ColorModal() {
    return (
      <ModalTemplate visible={visibleModal}>
        <ColorPicker color={color} onColorChangeComplete={(color) => {setColor(color)}}></ColorPicker>
        <ButtonTemplate onPress={() => setVisibleModal(false)}>Fermer</ButtonTemplate>
      </ModalTemplate>
    );
  }

  return (
    <View>
    <SurfaceTemplate>
      <TextInputTemplate label={"Date"} value={date.setLocale('fr').toFormat("dd MMMM yyyy")}></TextInputTemplate>
      <TextInputTemplate label={"Heure de début"} value={date.setLocale('fr').toFormat("hh 'h' mm 'mins")}></TextInputTemplate>
      <TextInputTemplate label={"Heure de fin"}></TextInputTemplate>
      <TextInputTemplate label={"Titre"}></TextInputTemplate>
      <TextInputTemplate label={"Message"} multiline={true}></TextInputTemplate>
      <ButtonTemplate style={{backgroundColor: color}} onPress={openColorModal}>Couleur</ButtonTemplate>
      <ButtonTemplate>Enregistrer</ButtonTemplate>
    </SurfaceTemplate>
    <ColorModal/>
    </View>
  )
}
