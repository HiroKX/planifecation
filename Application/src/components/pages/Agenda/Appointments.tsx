import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { LuxonDate } from "../../../services/utils/utils";
import CalendarTemplate from "./CalendarTemplate";

const Tab = createMaterialTopTabNavigator();

export default function Appointments() {
    const selectDate = useSelector((state : RootState) => state.selectDate.date.dateString);
    const firstTabLabel = () => {
        return (<Text> {LuxonDate.to_MMMMyyyy(selectDate).toUpperCase()}</Text>);
    }
    const secondTabLabel = () => {
        return (<Text> {LuxonDate.to_jourdd(selectDate)} </Text>)
    }
    return (
            <Tab.Navigator
                initialRouteName="Calendrier">
                    <Tab.Screen name="Calendrier" component={CalendarTemplate}
                        options={{tabBarLabel : firstTabLabel}}/>
                    
                    <Tab.Screen name="Agendeux" component={View}
                        options={{tabBarLabel : secondTabLabel}}/>
            </Tab.Navigator>
    );

}