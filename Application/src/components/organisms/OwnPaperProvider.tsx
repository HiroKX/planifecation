import { MD3LightTheme, MD3Theme, PaperProvider } from 'react-native-paper';
import { Props as PaperProviderProps } from 'react-native-paper/src/core/PaperProvider';
import { lightTheme } from '../../environment/lightTheme';
import { Theme } from '@react-navigation/native';
import { useState } from 'react';
import { darkTheme } from '../../environment/darktheme';


// POUR LE MOMENT, CHANGER LE THEME ICI
export const theme = lightTheme;

// Constantes pour créer des composants variants
// Premier jet, pourrait être implémenté plus proprement
export const secondary = {
  ...MD3LightTheme,
  colors: {
    primary: theme.colors.secondary,
    onPrimary: theme.colors.onSecondary,
    primaryContainer: theme.colors.secondaryContainer,
    onPrimaryContainer: theme.colors.onSecondaryContainer,
    ...theme,
  },
};

export const tertiary = {
  ...MD3LightTheme,
  colors: {
    primary: theme.colors.tertiary,
    onPrimary: theme.colors.onTertiary,
    primaryContainer: theme.colors.tertiaryContainer,
    onPrimaryContainer: theme.colors.onTertiaryContainer,
  },
};

export const error = {
  ...MD3LightTheme,
  colors: {
    primary: theme.colors.error,
    onPrimary: theme.colors.onError,
    primaryContainer: theme.colors.errorContainer,
    onPrimaryContainer: theme.colors.onErrorContainer,
  },
};

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

export type AppTheme = typeof theme;

function updateNavigationTheme(theme: MD3Theme) {
  navigationTheme = {
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
}

export default function OwnPaperProvider(props: Readonly<PaperProviderProps>) {
  return <PaperProvider theme={theme} {...props} />;
}
