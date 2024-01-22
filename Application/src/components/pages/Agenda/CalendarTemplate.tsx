import { Calendar } from "react-native-calendars";  
import { Icon } from "react-native-paper";
import { currentDate, currentDateDisplay, markedDates } from "./handlingEvents";
import { View } from "react-native";

export default function CalendarTemplate() {


    return(
        <View style={{flex:1}}>
            <Calendar
                markingType="multi-dot"
                current={currentDateDisplay.value}
                markedDates={markedDates.value}
                firstDay={1}
                onDayPress={(date) => {currentDate.value = date} }
                renderArrow={direction => <Icon size={40} source={direction==="left" ? "arrow-left-circle" : "arrow-right-circle" }/>}
                />
        </View>
    )
}
