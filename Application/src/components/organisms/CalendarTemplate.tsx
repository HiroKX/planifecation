import { Calendar, CalendarProps } from 'react-native-calendars';

export default function CalendarTemplate(props: Readonly<CalendarProps>) {
  return <Calendar firstDay={1} {...props} />;
}
