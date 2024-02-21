import { ReactNode } from 'react';
import { Slider } from 'react-native-awesome-slider';
import { SliderProps } from 'reanimated-color-picker';

export default function ButtonTemplate(
    props: Readonly<SliderProps>
  ): ReactNode {
    return (
      <Slider progress={{
            value: 0
        }} minimumValue={{
            value: 0
        }} maximumValue={{
            value: 0
        }}        
      />
    );
  }
  
  