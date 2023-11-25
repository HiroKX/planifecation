import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const mainTheme: Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    text: 'rgb(255,255,255)',
    primary: 'rgb(97,57,20)',
  },
};

export const darkTheme: Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#rgb(97,57,20)',
  },
};
