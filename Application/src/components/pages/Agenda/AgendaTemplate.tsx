import { INITIAL_TIME } from '../../../services/utils/utils';
import { Timeline } from 'react-native-calendars';
import { theme } from '../../organisms/OwnPaperProvider';
import { currentDate, currentDateDisplay } from './CalendarTemplate';
import { View, Text } from 'react-native';
import { effect } from '@preact/signals-react';
import { useState } from 'react';

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
            <Timeline
            date={currentDateDisplay.value}
            initialTime={INITIAL_TIME}
            showNowIndicator
            events={sampleEvents}
            />
        </View>
    );
}