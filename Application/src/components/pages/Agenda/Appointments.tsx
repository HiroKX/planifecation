import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Divider, Icon, Text } from 'react-native-paper';
import {
  LuxonDate,
  getColorForBackground,
  loadLocale,
  todayData,
} from '../../../services/utils/utils';
import {
  Signal,
  computed,
  effect,
  signal,
  useComputed,
} from '@preact/signals-react';
import { theme } from '../../organisms/OwnPaperProvider';
import AgendaEventDetails from './AgendaEventDetails';
import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import {
  GetAllAgendaEvents,
  agendaEventToEvent,
} from '../../../controllers/AgendaController';
import { TouchableOpacity, View } from 'react-native';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { Calendar, Timeline, TimelineEventProps } from 'react-native-calendars';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { MarkedDates } from 'react-native-calendars/src/types';
import { AgendaEvent } from '../../../models/AgendaEvent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useIsFocused} from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
loadLocale('fr');

export type StackParamListAgenda = {
  Calendrier: undefined;
  Agendeux: undefined;
  Agentrois: undefined;
};

export const currentDate = signal(todayData);
export const currentDateDisplay = computed(() => {
  return currentDate.value.dateString;
});

const markedDates = signal<MarkedDates>({});
const edit = signal(false);
const events = signal<Event[]>([]);

effect(() => {
  getMarkedDates();
});

function getMarkedDates() {
  // Typically the situation where you would put a "DON'T TOUCH, NO ONE KNOWS HOW IT WORKS BUT IT WORKS"
  // Dots must be a map where that template ["yyyy-mm-dd"]: {color, color, color} is respected in order to load the dots for the proper days
  // The dots are setted for a date every forEach iteration but I had no clue how to do it otherwise
  // the date comes from the start of an event, so it has to be substringed to lose the hh:mm
  const response: MarkedDates = {};
  let dots: Dot = {};
  if (events.value != null) {
    events.value.forEach((element: Event) => {
      if (!dots[element.start.substring(0, 10)])
        dots[element.start.substring(0, 10)] = [];
      dots[element.start.substring(0, 10)].push({
        color: element.color ?? theme.colors.primary,
      });
      response[element.start.substring(0, 10)] = {
        dots: dots[element.start.substring(0, 10)],
        marked: true,
        selected: true,
      };
    });
  }
  markedDates.value = response;
}

const selectedEvent = signal<Event>({
  id: undefined,
  title: '',
  summary: '',
  end: '',
  start: '',
  color: theme.colors.primary,
});

declare type Dot = {
  [key: string]: { color: string }[];
};

export default function Appointments({
  navigation,
}: Readonly<NativeStackScreenProps<StackParamListAgenda>>) {
  const client = useApolloClient();
  const isFocused: boolean = useIsFocused();

  useEffect(() => {
    async function getAgendaEvents() {
      await GetAllAgendaEvents(client).then((agendaEvents: AgendaEvent[]) => {
        let response: Event[] = [];
        agendaEvents.forEach((event: AgendaEvent) => {
          response = [...response, agendaEventToEvent(event)];
        });
        events.value = response;
      });
    }
    getAgendaEvents().then();
  }, [isFocused]);

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
    return <CalendarTemplate navigation={navigation} />;
  };

  const RenderAgenda = () => {
    return <AgendaTemplate navigation={navigation} />;
  };

  const RenderEventDetails = () => {
    return (
      <AgendaEventDetails
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
      initialRouteName="Calendrier"
    >
      <Tab.Screen
        name="Calendrier"
        component={RenderCalendar}
        options={{
          lazy: true,
          tabBarLabel: firstTabLabel,
        }}
      />
      <Tab.Screen
        name="Agendeux"
        component={RenderAgenda}
        options={{
          lazy: true,
          tabBarLabel: secondTabLabel,
        }}
      />
      <Tab.Screen
        name="Agentrois"
        component={RenderEventDetails}
        options={{
          tabBarLabel: thirdTabLabel,
        }}
      />
    </Tab.Navigator>
  );
}

function AgendaTemplate({ navigation }) {
  function selectEvent(event: Event) {
    selectedEvent.value = {
      id: event.id,
      title: event.title,
      summary: event.summary,
      end: event.end,
      color: event.color,
      start: event.start,
    };
    edit.value = true;
    navigation.navigate('Agentrois');
  }

  const renderEvents = (event: TimelineEventProps) => {
    return (
      <View>
        <TouchableOpacity>
          <TextTemplate
            variant="bodyMedium"
            style={{
              color: getColorForBackground(event.color ?? theme.colors.primary),
            }}
          >
            {event.title}
          </TextTemplate>
          <Divider
            style={{
              borderWidth: 1,
              borderColor: getColorForBackground(
                event.color ?? theme.colors.primary
              ),
              borderRadius: 100,
            }}
          />
          <TextTemplate
            variant="labelMedium"
            style={{
              color: getColorForBackground(event.color ?? theme.colors.primary),
            }}
          >
            {event.summary}
          </TextTemplate>
          <TextTemplate
            variant="labelSmall"
            style={{
              color: getColorForBackground(event.color ?? theme.colors.primary),
            }}
          >
            {LuxonDate.to_hhmm(event.start, 'yyyy-MM-dd HH:mm')} -{' '}
            {LuxonDate.to_hhmm(event.end, 'yyyy-MM-dd HH:mm')}
          </TextTemplate>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Timeline
        start={0}
        end={24}
        date={currentDateDisplay.value}
        events={events.value}
        renderEvent={renderEvents}
        onEventPress={event => {
          selectEvent(event);
        }}
      />
    </View>
  );
}

function CalendarTemplate({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markingType="multi-dot"
        current={currentDateDisplay.value}
        markedDates={markedDates.value}
        firstDay={1}
        onDayPress={date => {
          currentDate.value = date;
          navigation.navigate('Agendeux');
        }}
        onMonthChange={month => {
          currentDate.value = month;
        }}
        renderArrow={direction => (
          <Icon
            size={40}
            source={
              direction === 'left' ? 'arrow-left-circle' : 'arrow-right-circle'
            }
          />
        )}
      />
    </View>
  );
}
