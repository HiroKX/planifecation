import { Calendar } from "react-native-calendars";  
import { computed, signal } from "@preact/signals-react";
import { todayData } from "../../../services/utils/utils";
import { Icon } from "react-native-paper";
import { upDate } from "./AgendaTemplate";

export const currentDate = signal(todayData);
export const currentDateDisplay = computed(() => { return currentDate.value.dateString});

export default function CalendarTemplate() {

    return(
        <Calendar
                current={currentDateDisplay.value}
                firstDay={1}
                onDayPress={(date) => {currentDate.value = date; upDate();} }
                renderArrow={direction => <Icon size={40} source={direction==="left" ? "arrow-left-circle" : "arrow-right-circle" }/>}
                />
    )
}
