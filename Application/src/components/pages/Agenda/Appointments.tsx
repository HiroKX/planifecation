import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Calendar } from "react-native-calendars";
import { theme } from "../../organisms/OwnPaperProvider";

const Tab = createMaterialBottomTabNavigator();

export default function Appointments() {

    return (
        <Tab.Navigator
            initialRouteName="Calendrier"
            activeColor={theme.colors.onPrimary}
            inactiveColor={theme.colors.outlineVariant}
            barStyle={{backgroundColor : theme.colors.primary}}>
                <Tab.Screen name="Calendrier" component={Calendar}
                    options={{ tabBarLabel: 'Calendrier',
                                tabBarIcon: 'calendar'}}/>
                <Tab.Screen name="Agendeux" component={View}
                    options={{ tabBarLabel: 'Agenda',
                                tabBarIcon: 'view-day'}}/>
        </Tab.Navigator>        
    );
}