import { Calendar, CalendarProps as Props } from "react-native-calendars";

export default function CalendarTemplate(props : Readonly<Props>) {
    return (
        <Calendar
        {...props}/>
    );
}