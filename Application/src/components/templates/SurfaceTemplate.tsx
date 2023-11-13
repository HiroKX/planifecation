import { Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type ContainerProps = {
    children:React.ReactNode;
  };


export default function SurfaceTemplate(props: Readonly<ContainerProps>) {
    return (
        <Surface 
            style={styles.surface}
            mode='elevated'
            elevation={4}>
                {props.children}
        </Surface>
    );
} 


const styles = StyleSheet.create({
    surface: {
        padding: 10,
        marginLeft: 20, 
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})