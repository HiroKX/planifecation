import { Surface as PaperCard } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface SurfaceOptions {
    children:React.ReactNode;
  };


export default function SurfaceTemplate(props: Readonly<SurfaceOptions>) {
    return (
        <PaperCard 
            style={styles.surface}
            mode='elevated'
            elevation={4}>
                {props.children}
        </PaperCard>
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