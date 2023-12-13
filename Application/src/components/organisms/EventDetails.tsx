import ColorPicker from 'react-native-wheel-color-picker';
import SurfaceTemplate from './SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { useState } from 'react';
import { theme } from './OwnPaperProvider';
import { ModalTemplate } from './ModalTemplate';
import { Alert, View } from 'react-native';
import { getColorForBackground } from './../../services/utils/utils';
import { luxon } from '../../environment/locale';
import { Portal } from 'react-native-paper';
import { addEvent } from '../../store/EventsSlice';
import { useSelector, useDispatch } from 'react-redux';

const sample = luxon.fromFormat('2023-12-31', 'yyyy-MM-dd');

export default function EventDetails(props?: Readonly<Event>) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [color, setColor] = useState(theme.colors.primary);
  const [textColor, setTextColor] = useState(theme.colors.onPrimary);
  const [event, setEvent] = useState<Event>({
    start: '',
    end: '',
    title: '',
    summary: '',
    color: '',
  });

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
  }

  const changeColor = (color: string) => {
    setColor(color);
    setTextColor(getColorForBackground(color));
  };

  function openColorModal() {
    setVisibleModal(true);
  }

  function ColorModal() {
    return (
      <Portal>
        <ModalTemplate
          visible={visibleModal}
          onDismiss={() => setVisibleModal(false)}
        >
          <SurfaceTemplate style={{ backgroundColor: theme.colors.onPrimary }}>
            <TextInputTemplate> Couleur choisie : {color}</TextInputTemplate>
            <ColorPicker
              color={color}
              onColorChangeComplete={color => {
                changeColor(color);
              }}
            ></ColorPicker>
          </SurfaceTemplate>
        </ModalTemplate>
      </Portal>
    );
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
      <ColorModal />
    </View>
  );
}
