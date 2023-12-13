import { View } from 'react-native';
import TabScreenTemplate from '../molecules/TabScreenTemplate';
import TabsTemplate from '../organisms/TabsTemplate';
import { ReactElement, useState } from 'react';
import CalendarTemplate from '../organisms/CalendarTemplate';
import TimelineTemplate, { exampleEvent } from '../organisms/TimelineTemplate';
import { CalendarProvider, DateData } from 'react-native-calendars';
import TextTemplate from '../atoms/styles/TextTemplate';
import EventDetails from '../organisms/EventDetails';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import { useTabNavigation } from 'react-native-paper-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { luxon } from '../../environment/locale';

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
  const [selectDay, setSelectDay] = useState(true); // will be used for disabling the day view if no day is selected
  const [selectEvent, setSelectEvent] = useState(true); // will be used for disabling the details view if no appointment is selected
  let [selectDate, setSelectDate] = useState<DateData>();

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
              markedDates={{
                '2023-12-31': {
                  marked: true,
                  selected: true,
                  selectedColor: 'orange',
                },
              }}
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
              events={exampleEvent}
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
