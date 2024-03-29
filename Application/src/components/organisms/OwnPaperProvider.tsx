import {
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
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
    onPrimary: 'rgb(242,241,239)',
    primaryContainer: 'rgb(6, 35, 51)',
    onPrimaryContainer: 'rgb(242,241,239)',
    secondary: 'rgb(121,169,245)',
    onSecondary: 'rgb(4,24,37)',
    secondaryContainer: 'rgb(121,169,245)',
    onSecondaryContainer: 'rgb(19, 4, 99)',
    tertiary: 'rgb(75,123,245)',
    onTertiary: 'rgb(242,241,239)',
    tertiaryContainer: 'rgb(75,123,245)',
    onTertiaryContainer: 'rgb(237,247,253)',
    error: '#5B9B61',
    onError: 'rgb(6, 35, 51)',
    errorContainer: '#5B9B61',
    onErrorContainer: 'rgb(6, 35, 51)',
    background: 'rgb(194,226,245)',
    onBackground: 'rgb(25, 28, 30)',
    surface: 'rgb(194,226,245)',
    onSurface: 'rgb(25, 28, 30)',
    surfaceVariant: 'rgb(242,241,239)',
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
      level3: 'rgb(242,241,239)',
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

export const baseFont = 'Fredoka';

export const navigationTheme: Theme = {
  dark: theme.dark,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.outline,
    text: theme.colors.surfaceVariant,
    border: theme.colors.outlineVariant,
    notification: theme.colors.secondary,
  },
};

export default function OwnPaperProvider(
  props: Readonly<PaperProviderProps>
): ReactNode {
  const [loaded] = useFonts({
    Pattaya: require('../../assets/fonts/Pattaya.ttf'),
    Lexend: require('../../assets/fonts/Lexend.ttf'),
    Raleway: require('../../assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Bold': require('../../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Italic': require('../../assets/fonts/Raleway-Italic.ttf'),
    Fredoka: require('../../assets/fonts/Fredoka-Regular.ttf'),
  });

  const baseConf: Partial<MD3Type> = {
    fontFamily: baseFont,
  } as const;

  const baseVariants: MD3Typescale = configureFonts({ config: baseConf });

  const fonts: MD3Typescale = configureFonts({
    config: {
      ...baseVariants,
    },
  });

  if (!loaded) {
    return null;
  }

  return <PaperProvider theme={{ ...theme, fonts }} {...props} />;
}
