import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import {
  LuxonDate,
  getColorForBackground,
  todayData,
} from '../../../services/utils/utils';
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
import TextTemplate from '../../atoms/styles/TextTemplate';

declare type DateTimePickerOptions = {
  date: string;
  setter: (date: string) => void;
};
declare type Props = { localEvent: Event; navigation: any };

export default function AgendaEventDetails(props: Readonly<Props>) {
  const client = useApolloClient();

  const addAgendaEvent = () => {
    if (id != undefined) {
      UpdateAgendaEvent(client, id, title, summary, date, dateEnd, color)
        .then(() => {
          console.log('Évènement ' + id + ' mis à jour');
          props.navigation.goBack();
        })
        .catch(() => console.log('Une erreur est survenue à la mise à jour'));
    }
    CreateEvent(client, title, summary, date, dateEnd, color)
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
  const [summary, setSummary] = useState(props.localEvent.summary ?? '');
  const [date, setDate] = useState(
    props.localEvent.start ?? todayData.dateString
  );
  const [dateEnd, setDateEnd] = useState(
    props.localEvent.end ?? todayData.dateString
  );
  const [show, setShow] = useState(false);

  const [dateTimeProps, setDateTimeProps] = useState<DateTimePickerOptions>({
    date: date,
    setter: setDate,
  });

  const changeColor = ({ hex }: returnedResults) => {
    setColor(hex);
  };

  function setDateToString(timestamp: number) {
    return LuxonDate.fromMillis(timestamp, 'yyyy-MM-dd HH:mm');
  }

  function renderDatePicker() {
    let localDate: Date;
    let localTime: Date;

    return (
      <View>
        <DateTimePicker
          mode="time"
          minimumDate={
            dateTimeProps.date === dateEnd ? new Date(date) : undefined
          }
          value={new Date(dateTimeProps.date)}
          onChange={time => {
            localTime = new Date(
              time.nativeEvent.timestamp ?? new Date().getTime()
            );
            localDate.setHours(
              localTime.getHours(),
              localTime.getMinutes(),
              localTime.getSeconds(),
              localTime.getMilliseconds()
            );
            dateTimeProps.setter(setDateToString(localDate.getTime()));
            if (date > dateEnd) {
              setDateEnd(date);
            }
            setShow(false);
          }}
        />
        <DateTimePicker
          value={new Date(dateTimeProps.date)}
          minimumDate={
            dateTimeProps.date === dateEnd ? new Date(date) : undefined
          }
          onChange={date => {
            localDate = new Date(
              date.nativeEvent.timestamp ?? new Date().getTime()
            );
            localDate.setHours(0, 0, 0, 0);
          }}
        />
      </View>
    );
  }

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
        <View style={{ flexDirection: 'row' }}>
          <TextTemplate
            style={{ flex: 1, textAlign: 'left', alignSelf: 'center' }}
          >
            Date de début : {date}
          </TextTemplate>
          <IconButtonTemplate
            style={{ flexShrink: 1 }}
            icon={'calendar-outline'}
            onPress={() => {
              setDateTimeProps({ date: date, setter: setDate });
              setShow(true);
            }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextTemplate
            style={{ flex: 1, textAlign: 'left', alignSelf: 'center' }}
          >
            Date de fin : {dateEnd}
          </TextTemplate>
          <IconButtonTemplate
            style={{ flexShrink: 1 }}
            icon={'calendar-outline'}
            onPress={() => {
              setDateTimeProps({ date: dateEnd, setter: setDateEnd });
              setShow(true);
            }}
          />
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
      {show && renderDatePicker()}
    </View>
  );
}
