import ColorPicker, { ColorPickerProps } from 'react-native-wheel-color-picker';
import { theme } from '../organisms/OwnPaperProvider';
import SurfaceTemplate from './SurfaceTemplate';
import { ReactNode } from 'react';
import { View } from 'react-native';

export default function ColorPickerTemplate(
  props: Readonly<ColorPickerProps>
): ReactNode {
  return (
    <SurfaceTemplate style={{ backgroundColor: theme.colors.onPrimary }}>
      <ColorPicker
        color={props.color}
        onColorChangeComplete={props.onColorChangeComplete}
      />
      <View
        style={{
          flex: 1,
          height: 200,
          width: 200,
          alignContent: 'center',
          backgroundColor: props.color,
        }}
      />
    </SurfaceTemplate>
  );
}
