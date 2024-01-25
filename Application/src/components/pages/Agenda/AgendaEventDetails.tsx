import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import {
  getColorForBackground,
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
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { theme } from '../../organisms/OwnPaperProvider';

declare type Props = { event : Event};

export default function AgendaEventDetails( {event} : Readonly<Props>) {

  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(event.color ?? theme.colors.primary);
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.start.substring(0,10));
  const [summary, setSummary] = useState(event.summary);
  const [start, setStart] = useState(event.start.substring(11));
  const [end, setEnd] = useState(event.end.substring(11));
  const [dateEnd, setDateEnd] = useState(event.end.substring(0,10));

  const changeColor = ({ hex }: returnedResults) => {
    setColor(hex);
  };


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
        <TextInputTemplate label={'Titre'} value={title} onChangeText={(input) => setTitle(input)}></TextInputTemplate>
        <TextInputTemplate label={'Date'} value={date} onChangeText={(input) => setDate(input)}></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de début'}
          value={start}
          onChangeText={(input) => setStart(input)}
        ></TextInputTemplate>
        <TextInputTemplate label={'Date de fin'} value={dateEnd} onChangeText={(input) => setDateEnd(input)}></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de fin'}
          value={end}
          onChangeText={(input) => setEnd(input)}
        ></TextInputTemplate>
        <TextInputTemplate
          multiline
          label={'Message'}
          value={summary}
          onChangeText={(input) => setSummary(input)}
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
