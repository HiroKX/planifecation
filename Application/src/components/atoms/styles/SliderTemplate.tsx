import { ReactNode } from 'react';
import { AwesomeSliderProps, Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';

export default function SliderTemplate(
    props: Readonly<AwesomeSliderProps>
  ): ReactNode {
    const progress = useSharedValue(30);
    const min = useSharedValue(0);
    const max = useSharedValue(100);
    return (
      <Slider {...props}/>
    );
  }
  
  