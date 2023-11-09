import { StyleSheet, View } from 'react-native';

type ContainerProps = {
    children: React.ReactNode;
}

export default function CardTemplate(props: ContainerProps) {
    return (
        <View></View>
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