import { View } from 'react-native';
import TabScreenTemplate from '../molecules/TabScreenTemplate';
import TabsTemplate from '../organisms/TabsTemplate';
import { useState } from 'react';
import CalendarTemplate from '../organisms/CalendarTemplate';
import TimelineTemplate, { exampleEvent, getDate, today } from '../organisms/TimelineTemplate';
import {
    CalendarProvider,
    DateData
  } from 'react-native-calendars';
  import moment from 'moment';
  import { DATEFORMAT } from '../../environment/locale';
import TextTemplate from '../atoms/styles/TextTemplate';

export default function Agenda() {

    const [selectDay, setSelectDay] = useState(true); // will be used for disabling the day view if no day is selected
    const [selectEvent, setSelectEvent] = useState(true); // will be used for disabling the details view if no appointment is selected
    let [selectDate, setSelectDate] = useState<DateData>();

    const onDateChange = (date: DateData) => {
        setSelectDate(date);
        setSelectDay(false);
        console.log(getDate);
    }
    
    return (
        <CalendarProvider
        date={'now'}
        >
        <TabsTemplate>
            <TabScreenTemplate label='Mois' icon='calendar'>
                <View>
                    <CalendarTemplate
                    markedDates={{'2023-12-31' : {marked:true, selected:true, selectedColor: 'orange'}}}
                    onDayPress={onDateChange}/>
                </View>
            </TabScreenTemplate>
            <TabScreenTemplate label='Jour' icon='view-day' disabled={selectDay}>
            <View>
                <TextTemplate>Jour sélectionné : {selectDate ? moment(selectDate.timestamp).format(DATEFORMAT) : null} </TextTemplate>
                <TimelineTemplate
                    date={selectDate?.dateString ?? 'now'}
                    events={exampleEvent}
                    />
            </View>
            </TabScreenTemplate>
            <TabScreenTemplate label='Détails' icon='account-details' disabled={selectEvent}>
            <View></View>
                </TabScreenTemplate>
            </TabsTemplate>
            </CalendarProvider>
    );
  }
