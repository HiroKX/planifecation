import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import {
  getColorForBackground,
  rgbColorToHex,
} from '../../../services/utils/utils';
import { useState } from 'react';
import { View } from 'react-native';
import ModalTemplate from '../../organisms/ModalTemplate';
import ColorPicker, {
  HueCircular,
  Panel1,
  Preview,
  returnedResults,
} from 'reanimated-color-picker';
import Animated from 'react-native-reanimated';
import { effect, useComputed } from '@preact/signals-react';
import { selectedEvent } from './AgendaTemplate';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';

export default function AgendaEventDetails() {

  const [myEvent, setMyEvent] = useState<Event>();
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(rgbColorToHex(theme.colors.primary));
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const changeColor = ({ hex }: returnedResults) => {
    setColor(hex);
  };

  const localEvent = useComputed(() => selectedEvent.value);

  effect(() => {
    setMyEvent(localEvent.value);
  })


  function renderColorPicker() {
    return (
      <Animated.View style={{ justifyContent: 'center' }}>
        <ColorPicker value={color} onChange={changeColor}>
          <Preview hideInitialColor />
          <HueCircular>
            <Panel1 />
          </HueCircular>
        </ColorPicker>
        <ButtonTemplate
          onPress={() => {
            setVisible(false);
          }}>
          Valider
        </ButtonTemplate>
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SurfaceTemplate>
        <TextInputTemplate label={'Titre'} value={title}></TextInputTemplate>
        <TextInputTemplate label={'Date'} value={date}></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de début'}
          value={start}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de fin'}
          value={end}
        ></TextInputTemplate>
        <TextInputTemplate
          multiline
          label={'Message'}
          value={summary}
        ></TextInputTemplate>
        <ButtonTemplate
          textColor={getColorForBackground(color)}
          style={{ backgroundColor: color }}
          onPress={() => {
            setVisible(true);
          }}
        >
          Couleur
        </ButtonTemplate>
        <ButtonTemplate>Enregistrer l'évènement</ButtonTemplate>
      </SurfaceTemplate>
      <ModalTemplate visible={visible} onDismiss={() => setVisible(false)}>
        {renderColorPicker()}
      </ModalTemplate>
    </View>
  );
}
