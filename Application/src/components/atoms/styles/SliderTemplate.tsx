import { AwesomeSliderProps, Slider } from 'react-native-awesome-slider';
import { Props as PaperButtonProps } from 'react-native-paper/src/components/Button/Button';
import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export default function SliderTemplate(
  props: Readonly<AwesomeSliderProps>
): ReactNode {
  return (
    <Slider
      {...props}
    />
  );
}
