import { View } from 'react-native';
import TabScreenTemplate from '../molecules/TabScreenTemplate';
import TabsTemplate from '../organisms/TabsTemplate';
import { useState } from 'react';
import CalendarTemplate from '../organisms/CalendarTemplate';
import TimelineTemplate from '../organisms/TimelineTemplate';
import {groupBy} from 'lodash';
import {
    TimelineEventProps,
    CalendarUtils,
    CalendarProvider
  } from 'react-native-calendars';

export default function Agenda() {

    const today =  new Date();
    const getDate = CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate()));
    const INITIAL_TIME = {hour : today.getHours(), minutes : today.getMinutes()};

    const events: TimelineEventProps[] = [
        {
            start : `${getDate} 01:15:00`,
            end : `${getDate} 12:00:00`,
            title : 'Test',
            summary : 'Test d\'un évènement'
        }, {
            start : `${getDate} 01:15:00`,
            end : `${getDate} 12:00:00`,
            title : 'Test',
            summary : 'Test d\'un évènement'
        }
    ];

    const eventsByDate = groupBy(events, e => CalendarUtils.getCalendarDateString(e.start)) as { [key: string]: TimelineEventProps[];}

    const [selectDay, setSelectDay] = useState(true); // will be used for disabling the day view if no day is selected
    const [selectEvent, setSelectEvent] = useState(true); // will be used for disabling the details view if no appointment is selected
    
    return (
        <CalendarProvider
        date={'now'}
        >
        <TabsTemplate>
            <TabScreenTemplate label='Mois' icon='calendar'>
                <View>
                    <CalendarTemplate/>
                </View>
            </TabScreenTemplate>
            <TabScreenTemplate label='Jour' icon='view-day' disabled={false}>
                <TimelineTemplate
                    events={eventsByDate}
                    initialTime={INITIAL_TIME}
                    />
            </TabScreenTemplate>
            <TabScreenTemplate label='Details' icon='account-details' disabled={selectEvent}>
            <View></View>
                </TabScreenTemplate>
            </TabsTemplate>
            </CalendarProvider>
    );
  }
