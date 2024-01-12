import { INITIAL_TIME, todayData } from '../../../services/utils/utils';
import { CalendarProvider, CalendarUtils, Timeline, TimelineEventProps } from 'react-native-calendars';
import { theme } from '../../organisms/OwnPaperProvider';

const today = new Date();
const testDate = CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate()));

const sampleEvents : TimelineEventProps[] = [
    {
        start: '2024-1-12 01:00:00',
        end: '2024-1-12 22:00:00',
        title: "Sample Event",
        summary: "Simple test",
        color: theme.colors.primary,
    },
    {
        start : '2024-1-12 01:00:00',
        end : '2024-1-12 01:30:00',
        title: 'COIFFEUR',
        summary: "",
        color: theme.colors.error,
    }
]


export default function AgendaTemplate() {

    return (
        <Timeline
        date={todayData.dateString}
        start={0}
        end={23}
        initialTime={INITIAL_TIME}
        showNowIndicator
        events={sampleEvents}
        />
    );
}