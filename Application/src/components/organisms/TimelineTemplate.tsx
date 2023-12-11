import {
  Timeline,
  TimelineProps,
  CalendarUtils,
  TimelineEventProps,
} from 'react-native-calendars';

export const today = new Date();
export const getDate = CalendarUtils.getCalendarDateString(
  new Date().setDate(today.getDate())
);
export const INITIAL_TIME = {
  hour: today.getHours(),
  minutes: today.getMinutes(),
};

export const exampleEvent: TimelineEventProps[] = [
  {
    start: '2023-12-31 01:00:00',
    end: '2023-12-31 23:59:00',
    title: 'ANNIVERSAIRE TIM',
    summary: 'IMPORTANT',
    color: 'orange',
  },
  {
    start: '2023-12-31 08:00:00',
    end: '2023-12-31 10:00:00',
    title: 'RDV coiffeur',
    summary: 'IMPORTANT',
    color: 'green',
  },
];

export default function TimelineTemplate(props: Readonly<TimelineProps>) {
  return <Timeline start={0} end={24} initialTime={INITIAL_TIME} {...props} />;
}
