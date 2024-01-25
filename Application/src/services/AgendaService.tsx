import { ApolloClient, gql } from '@apollo/client';
import { AgendaEvent } from '../models/AgendaEvent';

const CREATE_EVENT = gql`
  mutation CreateAgendaEvent(
    $title: String!
    $content: String!
    $startDate: String!
    $endDate: String!
    $color: String!
  ) {
    createAgendaEvent(
      title: $title
      content: $content
      startDate: $startDate
      endDate: $endDate
      color: $color
    ) {
      id
      title
      content
      startDate
      endDate
      color
    }
  }
`;

export async function CreateEvent(
  client: Readonly<ApolloClient<Object>>,
  title: Readonly<string>,
  content: Readonly<string>,
  startDate: Readonly<Date>,
  endDate: Readonly<Date>,
  color: Readonly<string>
): Promise<string> {
  console.debug('AgendaService.CreateAgendaEvent');

  return client
    .mutate({
      mutation: CREATE_EVENT,
      variables: {
        title: title,
        content: content,
        startDate: startDate,
        endDate: endDate,
        color: color,
      },
    })
    .then((response: any) => {
      const event = response.data.createAgendaEvent;
      console.debug(
        'AgendaService: Event successfully created with id ' + event.id
      );
      return event.id;
    })
    .catch((error: any) => {
      console.error('CreateEvent error:', error);
      return null;
    });
}

const GET_ALL_EVENTS_BY_USERNAME = gql`
  query GetAllAgendaEventsByUsername($username: String!) {
    getAllAgendaEventsByUsername(username: $username) {
      id
      title
      content
      startDate
      endDate
      color
    }
  }
`;

export async function GetAllEventsFromUser(
  client: Readonly<ApolloClient<Object>>,
  username: Readonly<string>
): Promise<AgendaEvent[]> {
  console.debug('AgendaService.GetAllEventsFromUser');
  return client
    .query({
      query: GET_ALL_EVENTS_BY_USERNAME,
      variables: {
        username: username,
      },
    })
    .then((response: any) => {
      const events = response.data.getAllAgendaEventsByUsername;
      console.debug('AgendaService: Events successfully retrieved :' + events);
      return events;
    })
    .catch((error: any) => {
      console.error('GetAllEventsFromUser error:', error);
      return null;
    });
}

const GET_EVENT_BY_ID = gql`
  query GetAgendaEventById($getAgendaEventByIdId: Int!) {
    getAgendaEventById(id: $getAgendaEventByIdId) {
      id
      title
      content
      startDate
      endDate
      color
    }
  }
`;

export async function GetEventById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>
): Promise<AgendaEvent> {
  console.debug('AgendaService.GetEventById');
  return client
    .query({
      query: GET_EVENT_BY_ID,
      variables: {
        getAgendaEventByIdId: id,
      },
    })
    .then((response: any) => {
      const event = response.data.getAgendaEventById;
      console.debug(
        'AgendaService: Event ' +
          event.id +
          ' successfully  retrieved : ' +
          event
      );
      return event;
    })
    .catch((error: any) => {
      console.error('GetEventById error:', error);
      return null;
    });
}

const UPDATE_EVENT_BY_ID = gql`
  mutation UpdateAgendaEventById(
    $updateAgendaEventByIdId: Int!
    $content: String!
    $title: String!
    $startDate: String!
    $endDate: String!
    $color: String!
  ) {
    updateAgendaEventById(
      id: $updateAgendaEventByIdId
      content: $content
      title: $title
      startDate: $startDate
      endDate: $endDate
      color: $color
    ) {
      id
      title
      content
      startDate
      endDate
      color
    }
  }
`;

export async function UpdateEventById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>,
  title: Readonly<string>,
  content: Readonly<string>,
  startDate: Readonly<Date>,
  endDate: Readonly<Date>,
  color: Readonly<string>
): Promise<AgendaEvent> {
  console.debug('AgendaService.UpdateEventById');
  return client
    .mutate({
      mutation: UPDATE_EVENT_BY_ID,
      variables: {
        updateAgendaEventByIdId: id,
        title: title,
        content: content,
        startDate: startDate,
        endDate: endDate,
        color: color,
      },
    })
    .then((response: any) => {
      const event = response.data.updateAgendaEventById;
      console.debug(
        'AgendaService: Event ' + event.id + ' successfully updated'
      );
      return event;
    })
    .catch((error: any) => {
      console.error('UpdateEventById error:', error);
    });
}

const DELETE_EVENT_BY_ID = gql`
  mutation Mutation($deleteAgendaEventByIdId: Int!) {
    deleteAgendaEventById(id: $deleteAgendaEventByIdId) {
      id
    }
  }
`;

export async function DeleteEventById(
  client: Readonly<ApolloClient<Object>>,
  id: Readonly<string>
): Promise<void> {
  console.debug('AgendaService.DeleteEventById');

  return client
    .mutate({
      mutation: DELETE_EVENT_BY_ID,
      variables: {
        deleteAgendaEventByIdId: id,
      },
    })
    .then((response: any) => {
      const event = response.data.deleteAgendaEventById;
      console.debug(
        'AgendaService: Event ' + event.id + ' successfully deleted'
      );
    })
    .catch((error: any) => {
      console.error('DeleteEventById error:', error);
    });
}
