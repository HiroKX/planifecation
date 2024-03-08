import { ReactNode } from 'react';
import {
  AwesomeSliderProps,
  Slider,
  HapticModeEnum,
} from 'react-native-awesome-slider';
import { theme } from '../../organisms/OwnPaperProvider';
import * as Haptics from 'expo-haptics';

export default function SliderTemplate(
  props: Readonly<AwesomeSliderProps>
): ReactNode {
  return (
    <Slider
      onHapticFeedback={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }}
      hapticMode={HapticModeEnum.STEP}
      renderBubble={undefined}
      style={{ margin: 10 }}
      theme={{
        maximumTrackTintColor: theme.colors.primary,
        minimumTrackTintColor: theme.colors.tertiary,
        cacheTrackTintColor: theme.colors.tertiary,
        bubbleBackgroundColor: theme.colors.tertiary,
        heartbeatColor: theme.colors.error,
      }}
      {...props}
    />
  );
}
