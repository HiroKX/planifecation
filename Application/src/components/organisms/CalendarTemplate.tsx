import { Calendar, CalendarProps } from "react-native-calendars";

export default function CalendarTemplate(props : Readonly<CalendarProps>) {
    return (
        <Calendar
        firstDay={1}
        markedDates={{
            '2023-12-31': {selected: true, marked: true, selectedColor: 'red'},
        }}
        />
    );
}