import { ReactNode } from 'react';
import { Calendar, CalendarProps } from 'react-native-calendars';

export default function CalendarTemplate(
  props: Readonly<CalendarProps>
): ReactNode {
  return <Calendar firstDay={1} {...props} />; // first day of the calendar = monday(1)
}
