import { ReactNode } from 'react';
import { AwesomeSliderProps, Slider, HapticModeEnum } from 'react-native-awesome-slider';
import { theme } from '../../organisms/OwnPaperProvider';
import * as Haptics from 'expo-haptics';

export default function SliderTemplate(
    props: Readonly<AwesomeSliderProps>
  ): ReactNode {
    return (
      <Slider
      onHapticFeedback={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      }} 
      hapticMode={HapticModeEnum.STEP}
      style={{margin: 10}}
      theme={{
        disableMinTrackTintColor: theme.colors.backdrop,
        maximumTrackTintColor: theme.colors.primary,
        minimumTrackTintColor: theme.colors.secondary,
        cacheTrackTintColor: theme.colors.secondary,
        bubbleBackgroundColor: theme.colors.primary,
        heartbeatColor: theme.colors.error
      }}
      {...props}
      />
    );
  }
  
  