import { PaperProvider, useTheme } from "react-native-paper";
import { Props as PaperProviderProps } from "react-native-paper/src/core/PaperProvider" 
import { darkTheme, lightTheme } from "../../environment/themes";
import { Theme } from "@react-navigation/native";

// POUR LE MOMENT, CHANGER LE THEME ICI
const theme = lightTheme;

export const navigationTheme : Theme = {
    dark: theme.dark,
    colors: {
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.outline,
        text: theme.colors.onPrimary,
        border: theme.colors.outlineVariant,
        notification: theme.colors.secondary
    }
}

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

export default function OwnPaperProvider(props: Readonly<PaperProviderProps>) {
    return (
        <PaperProvider theme={theme}{...props}/>
    );
}