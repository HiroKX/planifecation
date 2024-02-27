import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { getColorForBackground } from '../../../services/utils/utils';
import { useState, useMemo } from 'react';
import ModalTemplate from '../../organisms/ModalTemplate';
import ColorPicker, {
  HueCircular,
  Panel1,
  Preview,
  returnedResults,
} from 'reanimated-color-picker';
import Animated from 'react-native-reanimated';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { baseFont, theme } from '../../organisms/OwnPaperProvider';
import { CreateEvent } from '../../../services/AgendaService';
import { useApolloClient } from '@apollo/client';
import { UpdateAgendaEvent } from '../../../controllers/AgendaController';
import { View } from 'react-native';
import IconButtonTemplate from '../../molecules/IconButtonTemplate';
import DateTimePicker from '@react-native-community/datetimepicker';

declare type Props = { localEvent: Event; navigation: any };

export default function AgendaEventDetails(props: Readonly<Props>) {
  const client = useApolloClient();

  const addAgendaEvent = () => {
    if (id != undefined) {
      UpdateAgendaEvent(
        client,
        id,
        title,
        summary,
        date + ' ' + start,
        dateEnd + ' ' + end,
        color
      )
        .then(() => {
          console.log('Évènement ' + id + ' mis à jour');
          props.navigation.goBack();
        })
        .catch(() => console.log('Une erreur est survenue à la mise à jour'));
    }
    CreateEvent(
      client,
      title,
      summary,
      date + ' ' + start,
      dateEnd + ' ' + end,
      color
    )
      .then(() => console.log('Nouvel évènement créé'))
      .catch(() => {
        console.log('Une erreur est survenue à la création');
        props.navigation.goBack();
      });
  };

  const id = useMemo(() => props.localEvent.id ?? undefined, []);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(
    props.localEvent.color ?? theme.colors.primary
  );
  const [title, setTitle] = useState(props.localEvent.title);
  const [date, setDate] = useState(props.localEvent.start.substring(0, 10));
  const [summary, setSummary] = useState(props.localEvent.summary ?? '');
  const [start, setStart] = useState(props.localEvent.start.substring(11));
  const [end, setEnd] = useState(props.localEvent.end.substring(11));
  const [dateEnd, setDateEnd] = useState(props.localEvent.end.substring(0, 10));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const showMode = (currentMode : 'date' | 'time') => {
    setMode(currentMode)
    setShow(true);
  }

  const showDatePicker = () => {
    showMode('date');
  }
  const showTimePicker = () => {
    showMode('time');
  }

  const changeColor = ({ hex }: returnedResults) => {
    setColor(hex);
  };

  function renderColorPicker() {
    return (
      <Animated.View style={{ justifyContent: 'center' }}>
        <ColorPicker value={color} onChange={changeColor}>
          <Preview
            hideInitialColor
            style={{ height: 75 }}
            textStyle={{
              fontFamily: baseFont,
              fontWeight: '400',
              fontSize: 22,
            }}
          />
          <HueCircular>
            <Panel1 />
          </HueCircular>
        </ColorPicker>
        <ButtonTemplate
          onPress={() => {
            setVisible(false);
          }}
        >
          Valider
        </ButtonTemplate>
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SurfaceTemplate>
        <TextInputTemplate
          label={'Titre'}
          value={title}
          onChangeText={input => setTitle(input)}
        ></TextInputTemplate>
        <View style={{flexDirection: 'row'}}>
          <TextInputTemplate
            style={{flex:2}}
            label={'Date de début'}
            disabled
            value={date}
            onChangeText={input => setDate(input)}
          ></TextInputTemplate>
          <IconButtonTemplate
            style={{flexShrink:1}}
            icon={"calendar-outline"}/>
          <TextInputTemplate
            style={{flex:1}}
            label={'Heure de début'}
            disabled
            value={start}
            onChangeText={input => setStart(input)}
          ></TextInputTemplate>
          <IconButtonTemplate
            style={{flexShrink:1}}
            icon={"clock-outline"}/>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInputTemplate
            style={{flex:2}}
            label={'Date de fin'}
            value={date}
            disabled
            onChangeText={input => setDate(input)}
          ></TextInputTemplate>
          <IconButtonTemplate
            style={{flexShrink:1}}
            icon={"calendar-outline"}/>
          <TextInputTemplate
            style={{flex:1}}
            label={'Heure de fin'}
            disabled
            value={start}
            onChangeText={input => setStart(input)}
          ></TextInputTemplate>
            <IconButtonTemplate
              icon={"clock-outline"}/>
        </View>
        <TextInputTemplate
          multiline
          label={'Message'}
          value={summary}
          onChangeText={input => setSummary(input)}
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
        <ButtonTemplate onPress={() => addAgendaEvent()}>
          Enregistrer l'évènement
        </ButtonTemplate>
      </SurfaceTemplate>
      <ModalTemplate visible={visible} onDismiss={() => setVisible(false)}>
        {renderColorPicker()}
      </ModalTemplate>
      {show && (
        <DateTimePicker
          value={new Date(date)}
          is24Hour
          ></DateTimePicker>

      )}
    </View>
  );
}
