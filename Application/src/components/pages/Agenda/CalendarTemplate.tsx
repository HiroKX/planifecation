import { Calendar } from "react-native-calendars";  
import { computed, signal } from "@preact/signals-react";
import { todayData } from "../../../services/utils/utils";

export const currentDate = signal(todayData);
export const currentDateDisplay = computed(() => { return currentDate.value.dateString});

export default function CalendarTemplate() {

    return(
        <Calendar
        current={todayData.dateString}
        firstDay={1}
        onDayPress={(date) => currentDate.value = date}
        />
    )
}
