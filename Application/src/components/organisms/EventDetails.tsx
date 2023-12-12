import ColorPicker from 'react-native-wheel-color-picker';
import SurfaceTemplate from './SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { useState } from 'react';
import { theme } from './OwnPaperProvider';
import { ModalTemplate } from './ModalTemplate';
import { View } from 'react-native';
import { getColorForBackground } from './../../services/utils/utils'
import { luxon } from '../../environment/locale';
import { Portal } from 'react-native-paper';

const date = luxon.fromFormat("2023-12-31", "yyyy-MM-dd");

export default function EventDetails(props? : Readonly<Event>) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [color, setColor] = useState(theme.colors.primary);
  const [textColor, setTextColor] = useState(theme.colors.onPrimary)
  const [event, setEvent] = useState<Event>({
    id:undefined,
    start: "",
    end:"",
    title:"",
    summary:"",
    color:""

  });

  const changeColor = (color : string) => {
    setColor(color);
    setTextColor(getColorForBackground(color));
  }


  function openColorModal() {
    setVisibleModal(true);
  }

  function ColorModal() {
    return (
      <Portal>
      <ModalTemplate visible={visibleModal} onDismiss={() => setVisibleModal(false)}>
        <SurfaceTemplate style={{backgroundColor : theme.colors.onPrimary}}>
        <TextInputTemplate> Couleur choisie : {color}</TextInputTemplate>
        <ColorPicker color={color} onColorChangeComplete={(color) => {changeColor(color)}}></ColorPicker>
        </SurfaceTemplate>
      </ModalTemplate>
      </Portal>
    );
  }

  return (
    <View>
    <SurfaceTemplate>
      <TextInputTemplate label={"Date"} value={date.setLocale('fr').toFormat("dd MMMM yyyy")}></TextInputTemplate>
      <TextInputTemplate label={"Heure de début"} value={event.start}></TextInputTemplate>
      <TextInputTemplate label={"Heure de fin"} value={event.end}></TextInputTemplate>
      <TextInputTemplate label={"Titre"} value={event.title}></TextInputTemplate>
      <TextInputTemplate label={"Message"} value={event.summary} multiline={true}></TextInputTemplate>
      <ButtonTemplate textColor={textColor} style={{backgroundColor: color}} onPress={openColorModal}>Couleur</ButtonTemplate>
      <ButtonTemplate onPress={verifFields}>Enregistrer la notification</ButtonTemplate>
    </SurfaceTemplate>
    <ColorModal/>
    </View>
  )
}
