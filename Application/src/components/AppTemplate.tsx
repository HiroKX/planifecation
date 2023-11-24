import {GestureResponderEvent, StyleSheet} from 'react-native';
import { FAB as PaperFab } from 'react-native-paper';


interface FabOptions {
    icon?: string;
    label?: string;
    onPress?: (e : GestureResponderEvent) => void;
}

export default function AppTemplate(props: Readonly<FabOptions>) {
    return (
        <PaperFab
            icon={props.icon ?? "plus"}
            label={props.label ?? undefined}
            style={ styles.fab}
            onPress={props.onPress}
            />
    )

}
    const styles = StyleSheet.create({
        fab: {
            display:'flex',
            margin: 16,
          },
    });