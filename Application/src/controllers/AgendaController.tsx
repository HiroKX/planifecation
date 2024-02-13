import {
  CreateEvent,
  GetAllEventsFromUser,
  GetEventById,
  DeleteEventById,
  UpdateEventById,
} from '../services/AgendaService';
import { ApolloClient } from '@apollo/client';
import { AgendaEvent } from '../models/AgendaEvent';
import { GetLoggedUserUsername } from './AuthenticationController';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { theme } from '../components/organisms/OwnPaperProvider';

export async function CreateAgendaEvent(
  client: Readonly<ApolloClient<Object>>,
  title: Readonly<string>,
  content: Readonly<string>,
  start: Readonly<string>,
  end: Readonly<string>,
  color: Readonly<string>
): Promise<string> {
  console.debug('AgendaController.CreateAgendaEvent');
  const id = await CreateEvent(client, title, content, start, end, color);
  console.debug('AgendaController: Returning id ' + id);
  return id;
}

export async function GetAllAgendaEvents(
  client: Readonly<ApolloClient<Object>>
): Promise<AgendaEvent[]> {
  console.debug('AgendaController.GetAllAgendaEvents');
  const username = await GetLoggedUserUsername();
  const events = await GetAllEventsFromUser(client, username);
  if(events)
    events.forEach(event => {
      console.debug(
        'Evenement : ' +
          event.title +
          ' ' +
          event.content +
          ' ' +
          event.startDate +
          ' ' +
          event.endDate +
          ' ' +
          event.color
      );
    });
  return events;
}

export async function GetAgendaEvent(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>
): Promise<AgendaEvent> {
  console.debug('AgendaController.GetAgendaEvent');
  const event = await GetEventById(client, id);
  console.debug('AgendaController: Returning event ' + event.title);
  return event;
}

export async function UpdateAgendaEvent(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>,
  title: Readonly<string>,
  content: Readonly<string>,
  startDate: Readonly<string>,
  endDate: Readonly<string>,
  color: Readonly<string>
): Promise<AgendaEvent> {
  console.debug('AgendaController.UpdateAgendaEvent');
  const event = await UpdateEventById(
    client,
    id,
    title,
    content,
    startDate,
    endDate,
    color
  );
  console.debug('AgendaController: Returning event ' + event.title);
  return event;
}

export async function DeleteAgendaEvent(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>
): Promise<void> {
  console.debug('AgendaController.DeleteAgendaEvent');
  await DeleteEventById(client, id)
    .then(async res => {
      console.debug(`AgendaEvent ${res} successfuly deleted`);
    })
    .catch(error =>
      console.debug(`Error while deleting AgendaEvent with id ${id} : `, error)
    );
}

export function agendaEventToEvent(agendaEvent: AgendaEvent): Event {
  return {
    id: agendaEvent.id,
    title: agendaEvent.title,
    summary: agendaEvent.content,
    start: agendaEvent.startDate,
    end: agendaEvent.endDate,
    color: agendaEvent.color,
  };
}

export function eventToAgendaEvent(event: Event): AgendaEvent {
  return {
    id: event.id ?? '',
    title: event.title,
    content: event.summary ?? '',
    startDate: event.start,
    endDate: event.end,
    color: event.color ?? theme.colors.primary,
  };
}
