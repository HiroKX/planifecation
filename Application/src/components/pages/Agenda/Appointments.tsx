import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Calendar, DateData } from "react-native-calendars";
import { theme } from "../../organisms/OwnPaperProvider";
import { LuxonDate, todayData } from "../../../services/utils/utils";
import { createContext, useState } from "react";

const Tab = createMaterialTopTabNavigator();

export const DateContext = createContext({
    date : todayData
})

type RenderCalendarProps = {
    date : DateData;
    setDate : (newDate :DateData) => void;
}

const firstTabLabel = () => {
    return (<Text> {selectDate.dateString}</Text>);
}

function RenderCalendar() {
    return (
                <Calendar
                current={selectDate.dateString}
                onDayPress={(date) => setSelectDate(date)}/>
    );
}

export default function Appointments() {


    return (
        <DateContext.Consumer>
            {({})}
            <Tab.Navigator
                initialRouteName="Calendrier">
                    <Tab.Screen name="Calendrier" component={RenderCalendar}
                        options={{tabBarLabel : firstTabLabel}}/>
                    
                    <Tab.Screen name="Agendeux" component={View}/>
            </Tab.Navigator>        
        </DateContext.Consumer>
    );

}