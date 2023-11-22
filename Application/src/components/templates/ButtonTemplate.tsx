import { Button as PaperButton } from 'react-native-paper';
import { GestureResponderEvent, StyleSheet } from 'react-native';

interface ButtonOptions {
  children: React.ReactNode;
  mode?: 'contained' | 'outlined' | 'text' | 'elevated' | 'contained-tonal';
  textColor?: string;
  onPress?: (e : GestureResponderEvent) => void;
}

export default function ButtonTemplate(props: Readonly<ButtonOptions>) {
    return (
        <PaperButton
        style={styles.button}
        mode={props.mode ?? 'contained'}
        textColor={props.textColor}
        onPress={props.onPress}
        >
          {props.children}
      </PaperButton>
    );
} 

const styles = StyleSheet.create({
    button : {
      margin: 5,
    }});

    