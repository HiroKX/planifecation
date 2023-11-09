import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";

export const mainTheme : Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(97,57,20)'
    }
}

export const darkTheme : Theme= {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#rgb(97,57,20)'
    }
}

