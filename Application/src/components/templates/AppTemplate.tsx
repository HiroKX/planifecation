import {GestureResponderEvent, StyleSheet} from 'react-native';
import { FAB } from 'react-native-paper';


type ContainerProps = {
    icon?: string;
    label?: string;
    handleClick?: (e : GestureResponderEvent) => void;
}

export default function AppTemplate(props: Readonly<ContainerProps>) {
    return (
        <FAB
            icon={props.icon ?? "plus"}
            label={props.label ?? undefined}
            style={ styles.fab}
            onPress={props.handleClick}
            />
    )

}
    const styles = StyleSheet.create({
        fab: {
            display:'flex',
            margin: 16,
          },
    });