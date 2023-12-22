import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LuxonDate, todayData } from "../../../services/utils/utils";
import CalendarTemplate from "./CalendarTemplate";
import AgendaTemplate from "./AgendaTemplate";
import { computed, signal } from "@preact/signals-react";

const Tab = createMaterialTopTabNavigator();
export const selectDate = signal(todayData.dateString);


export default function Appointments() {
    const firstTabLabel = () => {
        return (<Text> {LuxonDate.to_MMMMyyyy(selectDate.value).toUpperCase()}</Text>);
    }
    const secondTabLabel = () => {
        return (<Text> {LuxonDate.to_jourdd(selectDate.value)} </Text>)
    }
    return (
            <Tab.Navigator
                initialRouteName="Calendrier">
                    <Tab.Screen name="Calendrier" component={CalendarTemplate}
                        options={{tabBarLabel : firstTabLabel}}/>
                    
                    <Tab.Screen name="Agendeux" component={AgendaTemplate}
                        options={{tabBarLabel : secondTabLabel}}/>
            </Tab.Navigator>
    );

}