import { View } from 'react-native';
import TabScreenTemplate from '../molecules/TabScreenTemplate';
import TabsTemplate from '../organisms/TabsTemplate';
import { ReactElement, useState } from 'react';
import CalendarTemplate from '../organisms/CalendarTemplate';
import TimelineTemplate from '../organisms/TimelineTemplate';
import { CalendarProvider, CalendarUtils, DateData } from 'react-native-calendars';
import TextTemplate from '../atoms/styles/TextTemplate';
import EventDetails from '../organisms/EventDetails';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { useTabNavigation } from 'react-native-paper-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { luxon } from '../../environment/locale';
import { store } from '../../store/EventsSlice';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';

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

export default function Agenda() {

  const events = store.getState().events;

  const [selectDay, setSelectDay] = useState(true); // will be used for disabling the day view if no day is selected
  const [selectEvent, setSelectEvent] = useState(true); // will be used for disabling the details view if no appointment is selected
  const [selectDate, setSelectDate] = useState<DateData>();
  const [marked, setMarked] = useState<MarkedDates>(getMarkedDates());
  const [timelineEvents, setTimelineEvents] = useState<Event[]>(events);


   function getMarkedDates() {
    let response : MarkedDates = {};
    events?.forEach((element) =>  {
      response[element.start.substring(0,10)] = {marked: true, selected: true, selectedColor: element.color}
      });
      return response; 
  }

  const onDateChange = (date: DateData) => {
    setSelectDate(date);
    setSelectDay(false);
    setSelectEvent(true);
  };

  const onEventChange = () => {
    setSelectEvent(false);
  };

  return (
    <CalendarProvider date={'now'}>
      <TabsTemplate defaultIndex={0}>
        <TabScreenTemplate label="Mois" icon="calendar">
          <View>
            <CalendarTemplate
              markedDates={marked}
              onDayPress={onDateChange}
            />
            <Explore index={2} placeholder="Créer un évènement" />
          </View>
        </TabScreenTemplate>
        <TabScreenTemplate label="Jour" icon="view-day" disabled={selectDay}>
          <View>
            <TextTemplate>
              Jour sélectionné :
              {selectDate
                ? luxon
                    .fromFormat(selectDate.dateString, 'yyyy-MM-dd')
                    .setLocale('fr')
                    .toFormat('dd MMMM yyyy')
                : null}{' '}
            </TextTemplate>
            <Explore index={2} placeholder="Créer un évènement" />
            <TimelineTemplate
              date={selectDate?.dateString ?? 'now'}
              onEventPress={onEventChange}
              events={timelineEvents}
            ></TimelineTemplate>
          </View>
        </TabScreenTemplate>
        <TabScreenTemplate
          label="Détails"
          icon="account-details"
          disabled={selectEvent}
        >
          <EventDetails />
        </TabScreenTemplate>
      </TabsTemplate>
    </CalendarProvider>
  );
}
