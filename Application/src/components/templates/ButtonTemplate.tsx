import { Button } from 'react-native-paper';
import { GestureResponderEvent, StyleSheet } from 'react-native';

type ContainerProps = {
    children:React.ReactNode;
    mode?: 'contained' | 'outlined' | 'text' | 'elevated' | 'contained-tonal';
    textColor?: string;
    handleClick?: (e : GestureResponderEvent) => void;
  };

export default function ButtonTemplate(props: Readonly<ContainerProps>) {
    return (
        <Button
        style={styles.button}
        mode={props.mode ?? 'contained'}
        textColor={props.textColor }
        onPress={props.handleClick}
        >
          {props.children}
      </Button>
    );
} 

const styles = StyleSheet.create({
    button : {
      margin: 5,
    }});

    