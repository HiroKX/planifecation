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
import { Signal } from '@preact/signals-react';
import { isDataUpdated } from './CalendarTemplate';

declare type Props = {
  localEvent: Event;
  events: Signal<Event[]>;
  navigation: any;
};

export default function EventTemplate(props: Readonly<Props>) {
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
        .then(async () => {
          await client.resetStore();
          isDataUpdated.value = true;
          props.navigation.navigate('CalendrierTemplate');
        })
        .catch(() => {
          console.debug('Une erreur est survenue à la mise à jour');
        });
    }
    CreateEvent(
      client,
      title,
      summary,
      date + ' ' + start,
      dateEnd + ' ' + end,
      color
    )
      .then(async () => {
        await client.resetStore();
        isDataUpdated.value = true;
        props.navigation.navigate('CalendrierTemplate');
      })
      .catch(() => {
        console.debug('Une erreur est survenue à la création');
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
        <TextInputTemplate
          label={'Date'}
          value={date}
          onChangeText={input => setDate(input)}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de début'}
          value={start}
          onChangeText={input => setStart(input)}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Date de fin'}
          value={dateEnd}
          onChangeText={input => setDateEnd(input)}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de fin'}
          value={end}
          onChangeText={input => setEnd(input)}
        ></TextInputTemplate>
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
    </View>
  );
}
