import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Icon, Text} from 'react-native-paper';
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
  useComputed, effect,
} from '@preact/signals-react';
import {baseFont, theme} from '../../organisms/OwnPaperProvider';
import EventTemplate from './EventTemplate';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { MarkedDates } from 'react-native-calendars/src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ActivityIndicatorTemplate from '../../atoms/styles/ActivityIndicatorTemplate';
import CalendarTemplate from "./CalendarTemplate";
import AgendaTemplate from "./AgendaTemplate";
import {Calendar} from "react-native-calendars";
import {View} from "react-native";
import React from "react";
import {agendaEventToEvent, GetAllAgendaEvents} from "../../../controllers/AgendaController";
import {AgendaEvent} from "../../../models/AgendaEvent";
import {ApolloClient, useApolloClient} from "@apollo/client";

const Tab = createMaterialTopTabNavigator();

loadLocale('fr');

type Props = NativeStackScreenProps<StackParamListAgenda>;
export type StackParamListAgenda = {
  CalendrierTemplate: undefined;
  AgendaTemplate: undefined;
  EvenementTemplate: undefined;
};

export type AgendaParams = {
  events: Event[]
};

declare type Dot = {
  [key: string]: { color: string }[];
};

const currentDate = signal(todayData);
const currentDateDisplay = computed(() => {
  return currentDate.value.dateString;
});

const markedDates = signal<MarkedDates>({});
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

export async function getAgendaEvents(client: ApolloClient<Object>) {
  return await GetAllAgendaEvents(client).then((agendaEvents: AgendaEvent[]) => {
    let response: Event[] = [];
    agendaEvents.forEach((event: AgendaEvent) => {
      response = [...response, agendaEventToEvent(event)];
    });
    return response;
  });
}

export function getMarkedDates(events: Event[]) {
  // Typically the situation where you would put a "DON'T TOUCH, NO ONE KNOWS HOW IT WORKS BUT IT WORKS"
  // Dots must be a map where that template ["yyyy-mm-dd"]: {color, color, color} is respected in order to load the dots for the proper days
  // The dots are setted for a date every forEach iteration but I had no clue how to do it otherwise
  // the date comes from the start of an event, so it has to be substringed to lose the hh:mm
  const response: MarkedDates = {};
  let dots: Dot = {};
  if (events != null) {
    events.forEach((element: Event) => {
      if (!dots[element.start.substring(0, 10)])
        dots[element.start.substring(0, 10)] = [];
      dots[element.start.substring(0, 10)].push({
        color: theme.colors.primary,
      });
      console.debug("DOT = ", dots[element.start.substring(0, 10)])
      response[element.start.substring(0, 10)] = {
        dots: dots[element.start.substring(0, 10)],
        marked: true,
        selected: true,
      };
    });
  }
  return response;
}

export default function Appointments(props: Readonly<Props>) {
  const client = useApolloClient();

  const monthDisplay = useComputed(() => {
    return LuxonDate.to_MMMMyyyy(currentDateDisplay.value).toUpperCase();
  });
  const dayDisplay = useComputed(() => {
    return LuxonDate.to_jourdd(currentDateDisplay.value);
  });

  let params: AgendaParams = props.route.params as AgendaParams;

  const events = signal<Event[]>(params.events);

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

  /*
  effect(async () => {
    console.debug("IN EFFECT")
    events.value =  await getAgendaEvents(client);
    markedDates.value = getMarkedDates(events.value);
    console.debug("END OF EFFECT")
  });

   */

  const RenderCalendar = () => {
    console.debug("IN RENDER CALENDAR")
    console.debug("Events = ", events.value)
    markedDates.value = getMarkedDates(events.value);
    let dot:Dot = {}
    dot["2024-02-29"] = []
    dot["2024-02-29"].push({color: theme.colors.primary})
    markedDates.value["2024-02-29"] = {
      dots: dot["2024-02-29"],
      marked: true,
      selected: true,
    }
    console.debug("MarkedDates = ", markedDates.value)


    if (isLoading.value) {
      console.debug("Agenda loading")
      return <ActivityIndicatorTemplate />;
    } else {
      console.debug("Agenda loaded")
      return (<View style={{ flex: 1 }}>
        <Calendar
            theme={{
              textDayFontFamily: baseFont,
              textMonthFontFamily: baseFont,
              todayButtonFontFamily: baseFont,
              textDayHeaderFontFamily: baseFont,
            }}
            markingType="multi-dot"
            current={currentDateDisplay.value}
            markedDates={markedDates.value}
            firstDay={1}
            onDayPress={date => {
              currentDate.value = date;
              props.navigation.navigate('AgendaTemplate');
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
      </View>);
    }
  };

  const RenderAgenda = () => {
    return (<AgendaTemplate
        events={events}
        selectedEvent={selectedEvent}
        edit={edit}
        currentDateDisplay={currentDateDisplay}
        navigation={props.navigation}
    />);
  };

  const RenderEventDetails = () => {
    return (
      <EventTemplate
        localEvent={selectedEvent.value}
        navigation={props.navigation}
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

