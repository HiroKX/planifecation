import { MD3LightTheme, MD3Theme, PaperProvider, configureFonts, useTheme } from 'react-native-paper';
import { Props as PaperProviderProps } from 'react-native-paper/src/core/PaperProvider';
import { Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ReactNode } from 'react';
import { MD3Type } from 'react-native-paper/src/types';
import { MD3Typescale } from 'react-native-paper/lib/typescript/types';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    primary: 'rgb(6, 35, 51)',
    onPrimary: 'rgb(237, 246, 253)',
    primaryContainer: 'rgb(6, 35, 51)',
    onPrimaryContainer: 'rgb(237, 246, 253)',
    secondary: 'rgb(91, 185, 236)',
    onSecondary: 'rgb(4,24,37)',
    secondaryContainer: 'rgb(227, 223, 255)',
    onSecondaryContainer: 'rgb(19, 4, 99)',
    tertiary: 'rgb(197,33,132)',
    onTertiary: 'rgb(237,247,253)',
    tertiaryContainer: 'rgb(197, 33, 132)',
    onTertiaryContainer: 'rgb(237,247,253)',
    error: 'rgb(138, 174, 30)',
    onError: 'rgb(6, 35, 51)',
    errorContainer: 'rgb(138, 174, 30)',
    onErrorContainer: 'rgb(6, 35, 51)',
    background: 'rgb(237, 246, 253)',
    onBackground: 'rgb(25, 28, 30)',
    surface: 'rgb(237, 246, 253)',
    onSurface: 'rgb(25, 28, 30)',
    surfaceVariant: 'rgb(221, 227, 234)',
    onSurfaceVariant: 'rgb(65, 72, 77)',
    outline: 'rgb(113, 120, 126)',
    outlineVariant: 'rgb(193, 199, 206)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(18, 8, 2)',
    inverseOnSurface: 'rgb(230, 230, 225)',
    inversePrimary: 'rgb(249, 220, 204)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(237, 246, 253)',
      level2: 'rgb(232, 240, 246)',
      level3: 'rgb(224, 235, 243)',
      level4: 'rgb(222, 234, 242)',
      level5: 'rgb(217, 231, 239)',
    },
    surfaceDisabled: 'rgba(25, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 30, 0.38)',
    backdrop: 'rgba(43, 49, 54, 0.4)',
  },
};

// POUR LE MOMENT, CHANGER LE THEME ICI
export const theme = lightTheme;

export const baseFont = "Raleway";

export let navigationTheme: Theme = {
  dark: theme.dark,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.outline,
    text: theme.colors.onPrimary,
    border: theme.colors.outlineVariant,
    notification: theme.colors.secondary,
  },
};

export default function OwnPaperProvider(
  props: Readonly<PaperProviderProps>
): ReactNode {
  const [loaded] = useFonts({
    "Pattaya" : require('../../assets/fonts/Pattaya.ttf'),
    "Lexend" : require('../../assets/fonts/Lexend.ttf'),
    "Raleway" : require('../../assets/fonts/Raleway-Regular.ttf'),
    "Raleway-bold" : require('../../assets/fonts/Raleway-Bold.ttf'),
    "Raleway-italic" : require('../../assets/fonts/Raleway-Italic.ttf'),
  });

  const baseFont : Partial<MD3Type> = {
    fontFamily: 'Raleway',
  } as const;
  
  const baseVariants = configureFonts({config: baseFont});
  
  const customVariants = {} as const;
  
  const fonts : MD3Typescale = configureFonts({
    config:{
      ...baseVariants,
      ...customVariants,
    }
  })

  if (!loaded) { return null;}

  return <PaperProvider theme={{...theme, fonts}} {...props}/>
}