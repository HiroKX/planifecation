import { ReactNode } from 'react';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { SliderProps } from 'reanimated-color-picker';

export default function ButtonTemplate(
    props: Readonly<SliderProps>
  ): ReactNode {

    const progress = useSharedValue(30);
    const min = useSharedValue(0);
    const max = useSharedValue(100);
  
    return (
      <Slider 
       progress={progress}
       minimumValue={min} 
       maximumValue={max}        
      />
    );
  }
  
  