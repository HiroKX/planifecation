import ColorPicker, { ColorPickerProps } from 'react-native-wheel-color-picker';
import { theme } from '../organisms/OwnPaperProvider';
import SurfaceTemplate from './SurfaceTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import { ReactNode } from 'react';

export default function ColorPickerTemplate(
  props: Readonly<ColorPickerProps>
): ReactNode {
  return (
    <SurfaceTemplate style={{ backgroundColor: theme.colors.onPrimary }}>
      <TextInputTemplate> Couleur choisie : {props.color}</TextInputTemplate>
      <ColorPicker
        color={props.color}
        onColorChangeComplete={props.onColorChangeComplete}
      ></ColorPicker>
    </SurfaceTemplate>
  );
}
