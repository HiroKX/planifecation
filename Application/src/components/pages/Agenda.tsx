import { View } from 'react-native';
import TabScreenTemplate from '../molecules/TabScreenTemplate';
import TabsTemplate from '../organisms/TabsTemplate';
import { useState } from 'react';
import CalendarTemplate from '../organisms/CalendarTemplate';

export default function Agenda() {

    const [selected, setSelected] = useState('');
    
    return (
        <TabsTemplate>
            <TabScreenTemplate label='Mois' icon='calendar'>
                <View>
                    <CalendarTemplate/>
                </View>
            </TabScreenTemplate>
            <TabScreenTemplate label='Jour' icon='view-day'>
                <View></View>
            </TabScreenTemplate>
            <TabScreenTemplate label='Details' icon='account-details' disabled={true}>
            <View></View>
                </TabScreenTemplate>
        </TabsTemplate>
    );
  }