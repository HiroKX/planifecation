import { Button as PaperButton } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { Animated, ColorValue, GestureResponderEvent, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ButtonOptions {
  mode?: 'contained' | 'outlined' | 'text' | 'elevated' | 'contained-tonal';
  dark? : boolean;
  compact?: boolean;
  buttonColor?: string;
  textColor?: string;
  rippleColor?: ColorValue;
  loading?: boolean;
  icon?: IconSource;
  disabled?: boolean;
  children?: React.ReactNode;
  uppercase?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  onPress?: (e : GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  delayLongPress?: number;
  contentStyle?: StyleProp<ViewStyle>;
  maxFontSizeMultiplier?: number;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
}

export default function ButtonTemplate(props: Readonly<ButtonOptions>) {
    return (
        <PaperButton
        style={styles.button}
        mode={props.mode ?? 'contained'}
        dark= {props.dark}
        compact= {props.compact}
        buttonColor= {props.buttonColor}
        textColor={props.textColor}
        rippleColor={props.rippleColor}
        loading={props.loading}
        icon={props.icon}
        disabled={props.disabled}
        uppercase={props.uppercase}
        accessibilityLabel={props.accessibilityLabel}
        accessibilityHint= {props.accessibilityHint}
        onPress={props.onPress}
        onPressIn={props.onPressIn}
        onPressOut={props.onPressOut}
        onLongPress={props.onLongPress}
        delayLongPress={props.delayLongPress}
        contentStyle={props.contentStyle}
        maxFontSizeMultiplier={props.maxFontSizeMultiplier}
        labelStyle= {props.labelStyle}
        testID={props.testID}
        >
          {props.children}
      </PaperButton>
    );
} 

const styles = StyleSheet.create({
    button : {
      margin: 5,
    }});

    