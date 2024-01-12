import { Calendar } from "react-native-calendars";  
import {View} from 'react-native'
import { simple } from "./Appointments";
import { useSignal } from "@preact/signals-react";
import TextTemplate from "../../atoms/styles/TextTemplate";

export default function CalendarTemplate() {
    const localSimple = useSignal(simple);

    return(
        <View>
        <TextTemplate>{localSimple}</TextTemplate>
            </View>
    )
}
