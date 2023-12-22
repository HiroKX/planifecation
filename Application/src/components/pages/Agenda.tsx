import { View } from 'react-native';
import TabScreenTemplate from '../molecules/TabScreenTemplate';
import TabsTemplate from '../organisms/TabsTemplate';
import { ReactElement, ReactNode, useState } from 'react';
import CalendarTemplate from '../organisms/CalendarTemplate';
import TimelineTemplate from '../organisms/TimelineTemplate';
import { CalendarProvider, DateData } from 'react-native-calendars';
import EventDetails from '../organisms/EventDetails';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { useTabNavigation } from 'react-native-paper-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { luxon } from '../../environment/locale';
import { store } from '../../store/slices/EventsSlice';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { todayData } from '../../services/utils/utils';

// required to go from tab to tab
const Explore = (props: {
  index: number;
  placeholder: string;
}): ReactElement<typeof SafeAreaView> => {
  const goTo = useTabNavigation();
  return (
    <ButtonTemplate onPress={() => goTo(props.index)}>
      {props.placeholder}
    </ButtonTemplate>
  );
};

export default function Agenda(): ReactNode {
  const [events, setEvents] = useState(store.getState().events);
  const [selectEvent, setSelectEvent] = useState<Event>(); // will be used for disabling the details view if no appointment is selected
  const [selectDate, setSelectDate] = useState<DateData>(todayData); // will be used for disabling the day view if no day is selected
  const [marked, setMarked] = useState<MarkedDates>(getMarkedDates());
  const [timelineEvents, setTimelineEvents] = useState<Event[]>(events);

  const updateList = (event: Event) => {
    setEvents(store.getState().events);
    setMarked(getMarkedDates());
    setTimelineEvents([...timelineEvents, event]);
  };

  function getMarkedDates() {
    let response: MarkedDates = {};
    events?.forEach(element => {
      response[element.start.substring(0, 10)] = {
        marked: true,
        selected: true,
        selectedColor: element.color,
      };
    });
    return response;
  }

  const onDateChange = (date: DateData) => {
    setSelectDate(date);
    setSelectEvent(undefined);
  };

  const onEventChange = (event: Event) => {
    setSelectEvent(event);
  };

  return (
    <CalendarProvider date={'now'}>
      <TabsTemplate defaultIndex={0}>
        <TabScreenTemplate
          label={luxon
            .fromFormat(selectDate.dateString, 'yyyy-MM-dd')
            .setLocale('fr')
            .toFormat('MMMM yyyy')}
          icon="calendar"
        >
          <View>
            <CalendarTemplate markedDates={marked} onDayPress={onDateChange} current={selectDate.dateString}/>
            <Explore index={2} placeholder="Créer un évènement" />
          </View>
        </TabScreenTemplate>
        <TabScreenTemplate
          label={luxon
            .fromFormat(selectDate.dateString, 'yyyy-MM-dd')
            .setLocale('fr')
            .toFormat("'Jour:' dd")}
          icon="view-day"
          disabled={selectDate == undefined}
        >
          <View>
            <Explore index={2} placeholder="Créer un évènement" />
            <TimelineTemplate
              date={selectDate?.dateString ?? 'now'}
              onEventPress={event => onEventChange(event)}
              events={timelineEvents}
            ></TimelineTemplate>
          </View>
        </TabScreenTemplate>
        <TabScreenTemplate
          label={selectEvent == undefined ? 'Ajouter' : 'Détails'}
          icon="account-details"
        >
          <EventDetails updateFunction={updateList} event={selectEvent} />
        </TabScreenTemplate>
      </TabsTemplate>
    </CalendarProvider>
  );
}