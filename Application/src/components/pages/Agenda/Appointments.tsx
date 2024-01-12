import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native-paper";
import AgendaTemplate from "./AgendaTemplate";
import CalendarTemplate, {simple} from "./CalendarTemplate";
import { useSignal } from "@preact/signals-react";

const Tab = createMaterialTopTabNavigator();

export default function Appointments() {

    const displaySimple = useSignal(simple);

    const firstTabLabel = () => {
        return <Text>{displaySimple.value}</Text>
    }

    return (
            <Tab.Navigator
                initialRouteName="Calendrier">
                    <Tab.Screen name="Calendrier" component={CalendarTemplate}
                        options={{tabBarLabel : firstTabLabel}}/>
                    
                    <Tab.Screen name="Agendeux" component={AgendaTemplate}
                        options={{tabBarLabel : "Non"}}/>
            </Tab.Navigator>
    );

}