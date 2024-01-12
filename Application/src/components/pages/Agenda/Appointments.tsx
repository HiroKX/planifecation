import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native-paper";
import AgendaTemplate from "./AgendaTemplate";
import CalendarTemplate, {currentDateDisplay} from "./CalendarTemplate";
import { LuxonDate, loadLocale } from "../../../services/utils/utils";
import { useComputed } from "@preact/signals-react";

const Tab = createMaterialTopTabNavigator();
loadLocale('fr');

export default function Appointments() {

    const monthDisplay = useComputed(() => {
        return LuxonDate.to_MMMMyyyy(currentDateDisplay.value).toUpperCase();
    })
    const dayDisplay = useComputed(() => {
        return LuxonDate.to_jourdd((currentDateDisplay.value));
    })

    const firstTabLabel = () => {
        return <Text>{monthDisplay}</Text>
    }
    const secondTabLabel = () => {
        return <Text>{dayDisplay}</Text>
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