import {
  CreateEvent,
  GetAllEventsFromUser,
  GetEventById,
  DeleteEventById,
} from '../services/AgendaService';
import { ApolloClient } from '@apollo/client';
import { AgendaEvent } from '../models/AgendaEvent';
import { GetLoggedUserUsername } from './AuthenticationController';

export async function CreateAgendaEvent(
  client: Readonly<ApolloClient<Object>>,
  title: Readonly<string>,
  content: Readonly<string>,
  startDate: Readonly<Date>,
  endDate: Readonly<Date>,
  color: Readonly<string>
): Promise<string> {
  console.debug('AgendaController.CreateAgendaEvent');
  const id = await CreateEvent(
    client,
    title,
    content,
    startDate,
    endDate,
    color
  );
  console.debug('AgendaController: Returning id ' + id);
  return id;
}

export async function GetAllAgendaEvents(
  client: Readonly<ApolloClient<Object>>
): Promise<AgendaEvent[]> {
  console.debug('AgendaController.GetAllAgendaEvents');
  const username = await GetLoggedUserUsername();
  const events = await GetAllEventsFromUser(client, username);
  console.debug('AgendaController: Returning events ' + events);
  return events;
}

export async function GetAgendaEvent(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>
): Promise<AgendaEvent> {
  console.debug('AgendaController.GetAgendaEvent');
  const event = await GetEventById(client, id);
  console.debug('AgendaController: Returning event ' + event);
  return event;
}

export async function UpdateAgendaEvent(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>,
  title: Readonly<string>,
  content: Readonly<string>,
  startDate: Readonly<Date>,
  endDate: Readonly<Date>,
  color: Readonly<string>
): Promise<void> {
  console.debug('AgendaController.UpdateAgendaEvent');
  // TODO
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
