import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon, Text } from "react-native-paper";
import AgendaTemplate from "./AgendaTemplate";
import CalendarTemplate, {currentDateDisplay} from "./CalendarTemplate";
import { LuxonDate, getColorForBackground, loadLocale } from "../../../services/utils/utils";
import { Signal, useComputed } from "@preact/signals-react";
import { theme } from "../../organisms/OwnPaperProvider";
import AgendaEventDetails from "./AgendaEventDetails";

const Tab = createMaterialTopTabNavigator();
loadLocale('fr');

export default function Appointments() {

    const monthDisplay = useComputed(() => {
        return LuxonDate.to_MMMMyyyy(currentDateDisplay.value).toUpperCase();
    })
    const dayDisplay = useComputed(() => {
        return LuxonDate.to_jourdd((currentDateDisplay.value));
    })

    const tabLabel = (label: string | Signal<string>) => {
        return <Text style={{color : getColorForBackground(theme.colors.primary)}}>{label}</Text>
    }

    const firstTabLabel = () => {
        return tabLabel(monthDisplay);
    }
    const secondTabLabel = () => {
        return tabLabel(dayDisplay);
    }
    
    const thirdTabLabel = () => {
        return tabLabel("Créer un évènement");
    }

    const RenderAgenda = () => {
        return <AgendaTemplate/>;
    }

    return (
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle : {
                        backgroundColor: theme.colors.primary
                    },
                    tabBarActiveTintColor: theme.colors.primary
                }}
                initialRouteName="Calendrier">
                    <Tab.Screen name="Calendrier" component={CalendarTemplate}
                        options={{tabBarLabel : firstTabLabel,
                    }}
                        />
                    <Tab.Screen name="Agendeux" component={RenderAgenda}
                        options={{
                            tabBarLabel : secondTabLabel,
                            }}/>
                    <Tab.Screen name = "Agentrois" component={AgendaEventDetails}
                    options={{
                        tabBarLabel : thirdTabLabel,
                    }}
                        />
            </Tab.Navigator>
    );
}