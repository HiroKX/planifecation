import SurfaceTemplate from '../molecules/SurfaceTemplate';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import AppTemplate from '../atoms/AppTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import { View, StyleSheet } from 'react-native';
import TextTemplate from '../atoms/styles/TextTemplate';
import { ReactNode } from 'react';

// Pour le moment pour tester les composants du thème : import { secondary, tertiary, error } from '../organisms/OwnPaperProvider';

// Implémentation pour le moment
// undefined pour primary
const switchVariant = undefined;

export default function ThemeSandbox(): ReactNode {
  return (
    <View>
      <TextTemplate style={styles.title} variant="titleLarge">
        Thème :{' '}
      </TextTemplate>
      <SurfaceTemplate elevation={2} style={{ margin: 10 }}>
        <ButtonTemplate theme={switchVariant}>Primary</ButtonTemplate>
        <ButtonTemplate theme={switchVariant} mode="outlined">
          Primary outlined
        </ButtonTemplate>
        <ButtonTemplate theme={switchVariant} mode="elevated">
          Primary Elevated
        </ButtonTemplate>
        <ButtonTemplate theme={switchVariant} mode="text">
          Primary text
        </ButtonTemplate>
        <ButtonTemplate theme={switchVariant} mode="contained-tonal">
          Primary Contained-tonal
        </ButtonTemplate>
      </SurfaceTemplate>
      <SurfaceTemplate elevation={4}>
        <TextInputTemplate theme={switchVariant} mode="flat">
          Primary flat
        </TextInputTemplate>
        <TextInputTemplate theme={switchVariant} mode="outlined">
          Primary outlined
        </TextInputTemplate>
        <AppTemplate theme={switchVariant} label="Primary"></AppTemplate>
      </SurfaceTemplate>
      <ButtonTemplate> LATER </ButtonTemplate>
      <ButtonTemplate> LATER </ButtonTemplate>
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
  title: {
    margin: 20,
    padding: 15,
    alignContent: 'center',
  },
});
