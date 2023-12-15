import SurfaceTemplate from '../molecules/SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { theme } from './OwnPaperProvider';
import { ModalTemplate } from './ModalTemplate';
import { Alert, View } from 'react-native';
import { getColorForBackground } from './../../services/utils/utils';
import { Portal } from 'react-native-paper';
import { addEvent } from '../../store/EventsSlice';
import { useDispatch } from 'react-redux';
import ColorPickerTemplate from '../molecules/ColorPickerTemplate';
import { useState } from 'react';

interface Props {
  updateFunction: (event: Event) => void;
  event?: Event;
}

export default function EventDetails(props: Readonly<Props>) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [date, setDate] = useState(props?.event?.start.substring(0, 10) ?? '');
  const [start, setStart] = useState(props?.event?.start.substring(11) ?? '');
  const [end, setEnd] = useState(props?.event?.end.substring(11) ?? '');
  const [title, setTitle] = useState(props?.event?.title ?? '');
  const [summary, setSummary] = useState(props?.event?.summary ?? '');
  const [color, setColor] = useState(
    props?.event?.color ?? theme.colors.primary
  );
  const [textColor, setTextColor] = useState(
    getColorForBackground(props?.event?.color ?? theme.colors.primary)
  );

  const dispatch = useDispatch();

  const verifFields = () => {
    if (date == '') alert('La date doit correspondre au format YYYY-MM-JJ');
    else if (start == '')
      Alert.alert(
        'Format incorrect',
        "L'heure de début doit correspondre au format HH:MM"
      );
    else if (end == '')
      Alert.alert(
        'Format incorrect',
        "L'heure de fin doit correspondre au format HH:MM",
        [{ text: 'Fermer' }]
      );
    else if (title == '')
      Alert.alert(
        'Le titre ne peut pas être vide',
        'Votre titre doit comporter des caractères'
      );
    else {
      Alert.alert(
        "Création d'un évènement",
        'Confirmez-vous la création / édition de cet évènement ?',
        [
          { text: 'Non' },
          {
            text: 'Oui',
            onPress: () => {
              onSave();
            },
          },
        ]
      );
    }
  };

  function onSave() {
    dispatch(
      addEvent({
        start: date + ' ' + start,
        end: date + ' ' + end,
        title: title,
        summary: summary,
        color: color,
      })
    );
    props?.updateFunction({ start, end, title, summary, color });
  }

  const changeColor = (color: string) => {
    setColor(color);
    setTextColor(getColorForBackground(color));
  };

  function openColorModal() {
    setVisibleModal(true);
  }

  return (
    <View>
      <SurfaceTemplate>
        <TextInputTemplate
          label={'Date'}
          value={date}
          onChangeText={text => setDate(text)}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de début'}
          value={start}
          onChangeText={text => setStart(text)}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Heure de fin'}
          value={end}
          onChangeText={text => setEnd(text)}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Titre'}
          value={title}
          onChangeText={text => setTitle(text)}
        ></TextInputTemplate>
        <TextInputTemplate
          label={'Message'}
          value={summary}
          onChangeText={text => setSummary(text)}
          multiline={true}
        ></TextInputTemplate>
        <ButtonTemplate
          textColor={textColor}
          style={{ backgroundColor: color }}
          onPress={openColorModal}
        >
          Couleur
        </ButtonTemplate>
        <ButtonTemplate onPress={verifFields}>
          Enregistrer la notification
        </ButtonTemplate>
      </SurfaceTemplate>
      <Portal>
        <ModalTemplate
          visible={visibleModal}
          onDismiss={() => setVisibleModal(false)}
        >
          <ColorPickerTemplate
            color={color}
            onColorChangeComplete={color => changeColor(color)}
          />
        </ModalTemplate>
      </Portal>
    </View>
  );
}
