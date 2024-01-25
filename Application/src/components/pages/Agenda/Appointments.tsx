import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native-paper';
import AgendaTemplate from './AgendaTemplate';
import CalendarTemplate from './CalendarTemplate';
import {
  LuxonDate,
  emptyEvent,
  getColorForBackground,
  loadLocale,
} from '../../../services/utils/utils';
import { Signal, useComputed } from '@preact/signals-react';
import { theme } from '../../organisms/OwnPaperProvider';
import AgendaEventDetails from './AgendaEventDetails';
import { currentDateDisplay } from './handlingEvents';

const Tab = createMaterialTopTabNavigator();
loadLocale('fr');


export default function Appointments( { navigation } ) {
  const monthDisplay = useComputed(() => {
    return LuxonDate.to_MMMMyyyy(currentDateDisplay.value).toUpperCase();
  });
  const dayDisplay = useComputed(() => {
    return LuxonDate.to_jourdd(currentDateDisplay.value);
  });

  const tabLabel = (label: string | Signal<string>) => {
    return (
      <Text style={{ color: getColorForBackground(theme.colors.primary) }}>
        {label}
      </Text>
    );
  };

  const firstTabLabel = () => {
    return tabLabel(monthDisplay);
  };
  const secondTabLabel = () => {
    return tabLabel(dayDisplay);
  };
  const thirdTabLabel = () => {
    return tabLabel('Créer un évènement');
  };

  // Forced to have it here as it has to re-render everytime you get on that tab
  const RenderAgenda = () => {
    return <AgendaTemplate navigation={navigation}/>;
  };

  const RenderEventDetails = () => {
    return <AgendaEventDetails event={emptyEvent}/>
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.secondary,
        },
        tabBarActiveTintColor: getColorForBackground(theme.colors.secondary),
      }}
      initialRouteName="Calendrier"
    >
      <Tab.Screen
        name="Calendrier"
        component={CalendarTemplate}
        options={{ tabBarLabel: firstTabLabel }}
      />
      <Tab.Screen
        name="Agendeux"
        component={RenderAgenda}
        options={{
          tabBarLabel: secondTabLabel,
        }}
      />
      <Tab.Screen
        name="Agentrois"
        component={RenderEventDetails}
        options={{
          lazy:true,
          tabBarLabel: thirdTabLabel,
        }}
      />
    </Tab.Navigator>
  );
}
