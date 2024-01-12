import { Calendar } from "react-native-calendars";  
import {View} from 'react-native'
import { signal, useSignal } from "@preact/signals-react";
import TextTemplate from "../../atoms/styles/TextTemplate";

export const simple = signal("Test simple");

export default function CalendarTemplate() {
    const localSimple = useSignal(simple);

    return(
        <View>
        <TextTemplate>{localSimple}</TextTemplate>
            </View>
    )
}
