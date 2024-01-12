import { View } from 'react-native';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import { simple } from './CalendarTemplate';
import { useSignal } from '@preact/signals-react';

export default function AgendaTemplate() {
    const displaySimple = useSignal(simple);

    return (
        <View>
            <ButtonTemplate onPress={() => { simple.value = Math.random().toString()}}  >test</ButtonTemplate>
            <ButtonTemplate>{displaySimple.value}</ButtonTemplate>
        </View>

    );
}