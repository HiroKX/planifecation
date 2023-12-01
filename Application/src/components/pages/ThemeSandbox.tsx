import SurfaceTemplate from '../organisms/SurfaceTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import AppTemplate from '../atoms/AppTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import { View, StyleSheet } from 'react-native';

export default function ThemeSandbox() {
  return (
    <View>
      <SurfaceTemplate elevation={2} style={{ margin: 10 }}>
        <ButtonTemplate>Primary</ButtonTemplate>
        <ButtonTemplate mode="outlined">Primary outlined</ButtonTemplate>
        <ButtonTemplate mode="elevated">Primary Elevated</ButtonTemplate>
        <ButtonTemplate mode="text">Primary text</ButtonTemplate>
        <ButtonTemplate mode="contained-tonal">
          Primary Contained-tonal
        </ButtonTemplate>
      </SurfaceTemplate>
      <SurfaceTemplate elevation={4}>
        <TextInputTemplate mode="flat">Primary flat</TextInputTemplate>
        <TextInputTemplate mode="outlined">Primary outlined</TextInputTemplate>
        <AppTemplate label="Primary"></AppTemplate>
      </SurfaceTemplate>
      <ButtonTemplate> FOR LATER </ButtonTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
  container: {
    alignItems: 'center',
  },
});
