import { Calendar } from "react-native-calendars";  
import { selectDate } from "./Appointments";
import { computed } from "@preact/signals-react";
import TextTemplate from "../../atoms/styles/TextTemplate";
import {View} from 'react-native'



export default function CalendarTemplate() {

    return(
        <View>
        <Calendar
           onDayPress={(date) => {selectDate.value = date.dateString}}
            />
            <TextTemplate> {selectDate.value} </TextTemplate>
            </View>
    )
}
