import { LuxonDate, getColorForBackground } from '../../../services/utils/utils';
import { Timeline, TimelineEventProps } from 'react-native-calendars';
import { theme, } from '../../organisms/OwnPaperProvider';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { currentDateDisplay, events } from './handlingEvents';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { signal } from '@preact/signals-react';

export const selectedEvent = signal<Event>({
    title: "",
    summary: "",
    end: "",
    start: "",
    color: theme.colors.primary
});


export default function AgendaTemplate() {

   function selectEvent(event : Event) {
        selectedEvent.value = event;
    }

    const renderEvents = (event: TimelineEventProps) => {
        return (
            <View>
                <TouchableOpacity>
                    <TextTemplate
                        variant='bodyMedium'
                        style={{color : getColorForBackground(event.color ?? theme.colors.primary)}}>
                        {event.title}
                    </TextTemplate>
                    <Divider
                        style={{borderWidth: 1, borderColor: getColorForBackground(event.color ?? theme.colors.primary), borderRadius: 100}}/>
                    <TextTemplate
                        variant='labelMedium'
                        style={{color: getColorForBackground(event.color ?? theme.colors.primary)}}>
                            {event.summary}
                    </TextTemplate>
                    <TextTemplate
                        variant='labelSmall'
                        style={{color: getColorForBackground(event.color ?? theme.colors.primary)}}>
                        {LuxonDate.to_hhmm(event.start, "yyyy-MM-dd HH:mm")} - {LuxonDate.to_hhmm(event.end, "yyyy-MM-dd HH:mm")}
                    </TextTemplate>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <Timeline
            start={0}
            end={24}
            date={currentDateDisplay.value}
            events={events.value}
            renderEvent={renderEvents}
            onEventPress={(event) => selectEvent}
            />
        </View>
    );
}