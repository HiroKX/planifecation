import { INITIAL_TIME } from '../../../services/utils/utils';
import { CalendarProvider, Timeline, TimelineEventProps, TimelineList } from 'react-native-calendars';
import { theme } from '../../organisms/OwnPaperProvider';
import { currentDate, currentDateDisplay } from './CalendarTemplate';
import { effect, signal, useComputed, useSignal } from '@preact/signals-react';
import { View, Text } from 'react-native';
import { useMemo, useReducer, useState } from 'react';

const sampleEvents : TimeLineEventProps = 
   [
        {
            start: "2024-1-21 08:30",
            end: "2024-1-21 12:30",
            title:  "Rendez-vous",
            summary: "Chez le coiffeur",
            color: theme.colors.primary
        }
    ]

export default function AgendaTemplate() {


    return (
        <View>
            <Text>{currentDateDisplay}</Text>
            <Timeline
            date={currentDateDisplay.value}
            initialTime={INITIAL_TIME}
            showNowIndicator
            events={sampleEvents}
            />
        </View>
    );
}