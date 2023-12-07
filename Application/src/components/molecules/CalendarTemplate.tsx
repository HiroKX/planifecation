import {Calendar} from 'react-native-calendars';
import { CalendarProps } from 'react-native-calendars/src/calendar/index'
import { theme } from '../organisms/OwnPaperProvider';

const calendarTheme = {
    backgroundColor: '#ffffff',
        calendarBackground: '#000',
        textSectionTitleColor: theme.colors.primary,
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e'
}


export default function CalendarTemplate (props : Readonly<CalendarProps>) {
    
    
    return (
        <Calendar
        theme={calendarTheme}
            {...props}
            ></Calendar>
    );
}
