import { computed, signal } from '@preact/signals-react';
import { MarkedDates } from 'react-native-calendars/src/types';
import { todayData } from '../../../services/utils/utils';
import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { GetAllAgendaEvents } from '../../../controllers/AgendaController';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';

declare type Dot = {
  [key: string]: { color: string }[];
};

const client = useApolloClient();
export const events = signal<Event[]>([]);

useEffect(() => {
  async function getAgendaEvents() {
    await GetAllAgendaEvents(client).then(agendaEvents => {
      events.value = agendaEvents;
    })
  }
})

export const currentDate = signal(todayData);
export const currentDateDisplay = computed(() => {
  return currentDate.value.dateString;
});
export const currentDateToEdit = signal(currentDate.value);

function getEvents() {
  return [
    {
      start: '2024-01-21 08:30',
      end: '2024-01-21 12:30',
      title: 'Esquiver la belle-mère',
      summary: 'Chez le coiffeur',
      color: '#25f288',
    },
    {
      start: '2024-01-23 08:30',
      end: '2024-01-23 12:30',
      title: 'Rendez-vous chez le coiffeur du coin',
      summary: 'Chez le coiffeur',
      color: '#335478',
    },
    {
      start: '2024-01-22 08:30',
      end: '2024-01-22 12:30',
      title: 'Rendez-vous chez le coiffeur du coin',
      summary: 'Chez le coiffeur',
      color: '#359741',
    },
    {
      start: '2024-01-21 12:30',
      end: '2024-01-21 13:30',
      title: 'Manger chez mamie Jeanne',
      summary: 'Des bonnes lasagnes',
      color: '#88f544',
    },
  ];
}

export const markedDates = computed(() => {
  // Typically the situation where you would put a "DON'T TOUCH, NO ONE KNOWS HOW IT WORKS BUT IT WORKS"
  // Dots must be a map where like that template ["yyyy-mm-dd"]: {color, color, color} in order to load the dots for the proper days
  // The dots are re-calculated every forEach iteration but I had no clue how to do it otherwise
  // the date comes from the start of an event, so it has to be substringed to lose the hh:mm
  const response: MarkedDates = {};
  let dots: Dot = {};
  events.value.forEach(element => {
    if (!dots[element.start.substring(0, 10)])
      dots[element.start.substring(0, 10)] = [];
    dots[element.start.substring(0, 10)].push({ color: element.color });
    response[element.start.substring(0, 10)] = {
      dots: dots[element.start.substring(0, 10)],
      marked: true,
      selected: true,
    };
  });
  return response;
});
