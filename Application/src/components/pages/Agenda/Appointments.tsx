import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native-paper';
import {
  LuxonDate,
  getColorForBackground,
  loadLocale,
  todayData,
} from '../../../services/utils/utils';
import {
  Signal,
  computed,
  signal,
  useComputed,
} from '@preact/signals-react';
import { theme } from '../../organisms/OwnPaperProvider';
import EventTemplate from './EventTemplate';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { MarkedDates } from 'react-native-calendars/src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ActivityIndicatorTemplate from '../../atoms/styles/ActivityIndicatorTemplate';
import CalendarTemplate from "./CalendarTemplate";
import AgendaTemplate from "./AgendaTemplate";

const Tab = createMaterialTopTabNavigator();

loadLocale('fr');

export type StackParamListAgenda = {
  CalendrierTemplate: undefined;
  AgendaTemplate: undefined;
  EvenementTemplate: undefined;
};

const currentDate = signal(todayData);
const currentDateDisplay = computed(() => {
  return currentDate.value.dateString;
});

const markedDates = signal<MarkedDates>({});
const events = signal<Event[]>([]);
const edit = signal(false);
const isLoading = signal(false);


const selectedEvent = signal<Event>({
  id: undefined,
  title: '',
  summary: '',
  end: '',
  start: '',
  color: theme.colors.primary,
});

export default function Appointments({
  navigation,
}: Readonly<NativeStackScreenProps<StackParamListAgenda>>) {
  const monthDisplay = useComputed(() => {
    return LuxonDate.to_MMMMyyyy(currentDateDisplay.value).toUpperCase();
  });
  const dayDisplay = useComputed(() => {
    return LuxonDate.to_jourdd(currentDateDisplay.value);
  });

  const tabLabel = (label: string | Signal<string>) => {
    return (
      <Text style={{ color: getColorForBackground(theme.colors.primary) }}>
        {label}
      </Text>
    );
  };

  const firstTabLabel = () => {
    return tabLabel(monthDisplay);
  };
  const secondTabLabel = () => {
    return tabLabel(dayDisplay);
  };
  const thirdTabLabel = () => {
    return tabLabel(
      edit.value ? "Éditer l'évènement sélectionné" : 'Créer un évènement'
    );
  };

  // Forced to have it here as it has to re-render everytime you get on that tab

  const RenderCalendar = () => {
    if (isLoading.value) {
      return <ActivityIndicatorTemplate />;
    } else {
      return (<CalendarTemplate
          events={events}
          markedDates={markedDates}
          isLoading={isLoading}
          currentDate={currentDate}
          currentDateDisplay={currentDateDisplay}
          navigation={navigation}
      />);
    }
  };

  const RenderAgenda = () => {
    return (<AgendaTemplate
        events={events}
        selectedEvent={selectedEvent}
        edit={edit}
        currentDateDisplay={currentDateDisplay}
        navigation={navigation}
    />);
  };

  const RenderEventDetails = () => {
    return (
      <EventTemplate
        localEvent={selectedEvent.value}
        navigation={navigation}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.secondary,
        },
        tabBarActiveTintColor: getColorForBackground(theme.colors.secondary),
      }}
      initialRouteName="CalendrierTemplate"
    >
      <Tab.Screen
        name="CalendrierTemplate"
        component={RenderCalendar}
        options={{
          lazy: true,
          tabBarLabel: firstTabLabel,
        }}
      />
      <Tab.Screen
        name="AgendaTemplate"
        component={RenderAgenda}
        options={{
          lazy: true,
          tabBarLabel: secondTabLabel,
        }}
      />
      <Tab.Screen
        name="EvenementTemplate"
        component={RenderEventDetails}
        options={{
          tabBarLabel: thirdTabLabel,
        }}
      />
    </Tab.Navigator>
  );
}

