import { View } from 'react-native';
import { selectDate } from './Appointments';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { computed } from '@preact/signals-react';

export default function AgendaTemplate() {
    return (
        <View>
            <TextTemplate>{selectDate.value}</TextTemplate>
        </View>

    );
}