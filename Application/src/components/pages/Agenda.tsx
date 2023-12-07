import { View } from 'react-native';
import TabScreenTemplate from '../molecules/TabScreenTemplate';
import TabsTemplate from '../organisms/TabsTemplate';
import CalendarTemplate from '../molecules/CalendarTemplate';
import { useState } from 'react';

export default function Agenda() {

    const [selected, setSelected] = useState('');
    
    return (
        <TabsTemplate>
            <TabScreenTemplate label='Mois' icon='calendar'>
                <View>
                <CalendarTemplate
                onDayPress={day => {
                    setSelected(day.dateString);
                  }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
                  }}/>
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