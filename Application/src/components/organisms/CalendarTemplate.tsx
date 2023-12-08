import { Calendar, CalendarProps as Props } from "react-native-calendars";

export default function CalendarTemplate(props : Props) {
    return (
        <Calendar
        {...props}/>
    );
}