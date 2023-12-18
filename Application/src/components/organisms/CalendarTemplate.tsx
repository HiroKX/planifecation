import { ReactNode } from 'react';
import { Calendar, CalendarProps } from 'react-native-calendars';

export default function CalendarTemplate(
  props: Readonly<CalendarProps>
): ReactNode {
  console.log("rendering CalendarTemplate")
  return <Calendar firstDay={1} {...props} />; // first day of the calendar = monday(1)
}
