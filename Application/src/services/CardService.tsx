import { StyleSheet } from 'react-native';
import { Surface } from '@react-native-material/core'

type ContainerProps = {
    children: React.ReactNode;
}

export default function CardService(props: ContainerProps) {
    return (
        <Surface style={styles.card}
            elevation={16}
            category='medium'
            >
            {props.children}
        </Surface>
    )

}
    const styles = StyleSheet.create({
        card: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            height: 'auto',
            margin: 10,
            padding: 10,
        }
    });